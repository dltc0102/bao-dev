import Settings from '../settings.js';
import Audio from '../utils/audio.js';
import PogObject from 'PogData';

import { sendMessage } from '../utils/party.js';
import { getInSkyblock } from '../utils/functions.js'; // sb, area
import { baoUtils, renderWhen, showAlert } from '../utils/utils.js';
import { createGuiCommand, renderGuiPosition } from '../utils/functions.js'; // gui
import { constrainX, constrainY } from '../utils/functions.js' // padding
import { filterSeparators } from '../utils/functions.js';
import { getInEnd } from '../utils/functions.js';
import { showAlert } from '../utils/utils.js';
import { drawDragonHitBox } from '../utils/functions.js';


////////////////////////////////////////////////////////////////////////////////
// SETUP CONSTS
////////////////////////////////////////////////////////////////////////////////
const endAudio = new Audio();

// drag consts
const moveDragonCounter = new Gui();
createGuiCommand(moveDragonCounter, 'movedragoncounter', 'mdrag');
const dragonDraggable = `&7||| Dragons |||\n&7${baoUtils.thickSep}\n&7||| Old: 0\n&7||| Protector: 0\n&7||| Strong: 0\n&7||| Unstable: 0\n&7||| Wise: 0\n&7||| Young: 0\n&7||| Superior: 0\n&7${baoUtils.thinSep}\n&7||| Drags Since Sup: 0\n&7||| Crystals Broken: 0`;

// damage consts
const moveDamageCounter = new Gui();
createGuiCommand(moveDamageCounter, 'movedamagecounter', 'mdmg');
let damagers = [];
let damagersText = '';
const damagersDraggable = 'Top Damagers: \n${baoUtils.thickSep}\nName1: 00❤\nName2: 00❤\nName3: 00❤'
const endProtTitle = '&8End Protector'

// render dragon hitbox
const entityDrag = Java.type("net.minecraft.entity.boss.EntityDragon");

// pogobject
// export const baoDragons = new PogObject("bao-dev", {
export const baoDragons = {
    "spawned": false,
    "eyesPlaced": 0,
    "crystalsBroken": 0, 
    // "supWeight": 0, 
    "counter": {
        "old": 0, 
        "protector": 0, 
        "strong": 0,
        "unstable": 0, 
        "wise": 0, 
        "young": 0, 
        "superior": 0,
        "dragsSinceSuperior": 0,
        "x": 3, 
        "y": 100,
    },
    "damage": {
        "x": 3, 
        "y": 50, 
    }, 
    "displayText": '',
};
// }, '/data/baoDragons.json');
// baoDragons.autosave(5);


////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function shouldHandleEndMsgs() {
    return getInEnd() && Settings.betterEndMessages;
}

function handleEndMessage(event, givenSetting, message, alert) {
    if (!shouldHandleEndMsgs()) return;
    cancel(event);
    if (givenSetting && message) sendMessage(message);
    if (alert) showAlert(alert);
}

function getTopDragDamagers() {
    let names = [];
    TabList.getNames().forEach(line => {
        let damagerMatch = line.removeFormatting().match(/^ (\w+): ([\d.]+[k|M]❤)$/)
        if (damagerMatch) {
            let damagerName = damagerMatch[1];
            let damagerDmg = damagerMatch[2];
            names.push(`&f${damagerName}: &b${damagerDmg}`);
        }
    })
    return names;
}

////////////////////////////////////////////////////////////////////////////////
// BETTER END MESSAGES
////////////////////////////////////////////////////////////////////////////////
const someEndMessages = [
    /Your Sleeping Eyes have been awoken by the magic of the Dragon\. They are now Remnants of the Eye!/, 
    /☬ The .+ Dragon has spawned!/, 
    /☬ The Dragon's Gate is .+!/, 
    /☬ .+ Dragon used .+ on you for .+ damage\./, 
    /☬ .+ destroyed an Ender Crystal!/, 
    / ☠ .+ was killed by .+ Dragon./, 
];

someEndMessages.forEach(msg => {{
    register('chat', (event) => {
        handleEndMessage(event, Settings.betterEndMessages);
    }).setCriteria(msg);
}});

register('chat', (playerName, numEyes, event) => {
    if (playerName === Player.getName()) baoDragons.eyesPlaced++;
    // baoDragons.save();
}).setCriteria('☬ ${playerName} placed a Summoning Eye! (${numEyes}/8)');

register('chat', (drag, event) => {
    endAudio.playDefaultSound();
    baoDragons.eyesPlaced = 0;
    baoDragons.spawned = false;
    damagers = [];
    // baoDragons.save();
}).setCriteria('☬ The Dragon Egg has spawned!');

register('chat', (dragName, event) => {
    if (Settings.betterEndMessages) {
        let dragNameLower = dragName.toLowerCase();
        if (dragNameLower !== 'superior') {
            baoDragons.counter[dragNameLower] += 1;
            baoDragons.counter.dragsSinceSuperior += 1;
        } else if (dragNameLower === 'superior') {
            baoDragons.counter[dragNameLower] += 1;
            baoDragons.counter.dragsSinceSuperior = 0;
        }
        baoDragons.counter.dragsSinceSuperior += 1;
    };
    baoDragons.spawned = true;
    damagers = [];
    // baoDragons.save();
}).setCriteria('☬ The ${dragName} Dragon has spawned!');

register('chat', (player, event) => {
    if (player === Player.getName()) baoDragons.crystalsBroken += 1;
}).setCriteria('☬ ${player} destroyed an Ender Crystal!');


register('chat', (dragType, event) => {
    baoDragons.spawned = false;
}).setCriteria('${dragType} DRAGON DOWN!').setContains();

register('chat', (event) => {
    endAudio.playDefaultSound();
    handleEndMessage(event, Settings.end_protector_ping, 'Endstone Protector Spawning', endProtTitle);
}).setCriteria('The ground begins to shake as an Endstone Protector rises from below!');



////////////////////////////////////////////////////////////////////////////////
// DRAGON WEIGHT
////////////////////////////////////////////////////////////////////////////////
function getQuality(pbq, pDamage, fDamage, pEyes) {
    let quality = pbq + (100 * (pDamage/fDamage)) + (100 * pEyes);
    return quality;
}

let dragonDamage = 0;
let firstDragDamage = 0;
let damagePos = 0;
let playerBaseQuality = 0;
let playerResultQuality = 0;
let canDropPet = false;
register('chat', (playerName, damage, event) => {
    firstDragDamage = parseInt(damage.replace(/,/g, ''));
}).setCriteria('1st Damager - ${playerName} - ${damage}').setContains();

register('command', () => {
    setTimeout(() => {
        ChatLib.chat(`☬ oBiscuit placed a Summoning Eye! (1/8)`);
        setTimeout(() => {
            ChatLib.chat(`☬ oBiscuit placed a Summoning Eye! (2/8)`);
            setTimeout(() => {
                ChatLib.chat(`☬ oBiscuit placed a Summoning Eye! (3/8)`);
                setTimeout(() => {
                    ChatLib.chat(`☬ oBiscuit placed a Summoning Eye! (4/8)`)
                    setTimeout(() => {
                        ChatLib.chat(`UNSTABLE DRAGON DOWN!`);
                        setTimeout(() => {
                            ChatLib.chat(`1st Damager - [MVP+] oBiscuit - 4,804,251`);
                            setTimeout(() => {
                                ChatLib.chat(`Your Damage: 4,804,251 (Position #1)`);
                            }, 1000)
                        }, 1000)
                    }, 1000)
                }, 1000)
            }, 1000)
        }, 1000)
    }, 1000)
    // code goes here
}).setName('fakedrag');

register('chat', (damage, pos, event) => {
    if (baoDragons.spawned) return;
    playerResultQuality = 0;
    dragonDamage = parseInt(damage.replace(/,/g, ''));
    damagePos = parseInt(pos);
    const qualityLookup = {
        1: 200,
        2: 175,
        3: 150,
        4: 125,
        5: 110,
        6: 100,
        7: 100,
        8: 100,
        9: 90,
        10: 90,
        11: 80,
        12: 80
    };
    
    if (damagePos <= 25) {
        playerBaseQuality = qualityLookup[damagePos] || 70;
    } else {
        playerBaseQuality = dragonDamage > 1 ? 70 : 10;
    }
}).setCriteria('Your Damage: ${damage} (Position #${pos})').setContains();


// WIP
register('command', () => {
    playerResultQuality = getQuality(playerBaseQuality, dragonDamage, firstDragDamage, baoDragons.eyesPlaced);
    console.log(`eyesplaced: ${baoDragons.eyesPlaced}`)
    console.log(`input: ${playerBaseQuality}`)
    console.log(`output: ${playerResultQuality}`)

    canDropPet = playerResultQuality >= 450;
    if (canDropPet) {
        console.log(`pet possible? YES`)
        let chanceEpic = 0.05 * baoDragons.eyesPlaced;
        let chanceLeg = 0.01 * baoDragons.eyesPlaced;
        console.log(`epic edrag chance: ${chanceEpic}`);
        console.log(`leg edrag chance: ${chanceLeg}`)
    }
}).setName('calcquality');


////////////////////////////////////////////////////////////////////////////////
// DRAGON COUNTER
////////////////////////////////////////////////////////////////////////////////
renderWhen(register('step', () => {
    const dragThick = `&9${baoUtils.thickSep}`;
    const dragThin = `&9${baoUtils.thinSep}`

    const dragTitle = Settings.dragCounterSpawns || Settings.dragCounterTrackers ? `&5|&d|&5| &6Dragons &5|&d|&5|\n${dragThick}` : '';

    // spawns
    let protectorDragLine = `&5|&d|&5| &7Protector: &b${baoDragons.counter.protector}`;
    let oldDragLine = `&5|&d|&5| &7Old: &b${baoDragons.counter.old}`;
    let strongDragLine = `&5|&d|&5| &7Strong: &b${baoDragons.counter.strong}`;
    let unstableDragLine = `&5|&d|&5| &7Unstable: &b${baoDragons.counter.unstable}`;
    let wiseDragLine = `&5|&d|&5| &7Wise: &b${baoDragons.counter.wise}`;
    let youngDragLine = `&5|&d|&5| &7Young: &b${baoDragons.counter.young}`;
    let superiorDragLine = `&5|&d|&5| &6Superior: &b${baoDragons.counter.superior}`;

    // trackers
    let dragsSinceSupLine = `&5|&d|&5| &7Drags Since Sup: &b${baoDragons.counter.dragsSinceSuperior}`;
    let crystalsBrokenLine = `&5|&d|&5| &7Crystals Broken: &b${baoDragons.crystalsBroken}`;

    const showDragSpawns = Settings.dragCounterSpawns ? [protectorDragLine, oldDragLine, strongDragLine, unstableDragLine, wiseDragLine, youngDragLine, superiorDragLine, dragThin].join('\n') : '';

    const showDragTrackers = Settings.dragCounterTrackers ? [dragsSinceSupLine, crystalsBrokenLine, dragThin].join('\n') : '';

    const dragDisplayRaw = [dragTitle, showDragSpawns, showDragTrackers].join('\n').replace(/\n{6,}/g, '\n');
    
    baoDragons.displayText = filterSeparators(dragDisplayRaw, dragThin);
}).setFps(1), () => Settings.showDragonCounter && getInSkyblock() && World.isLoaded());

register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (moveDragonCounter.isOpen()) {
        baoDragons.counter.x = constrainX(x, 3, dragonDraggable);
        baoDragons.counter.y = constrainY(y, 3, dragonDraggable);
    };
    if (moveDamageCounter.isOpen()) {
        baoDragons.damage.x = constrainX(x, 3, damagersDraggable);
        baoDragons.damage.y = constrainY(y, 3, damagersDraggable);
    };
    // baoDragons.save();
}); 


////////////////////////////////////////////////////////////////////////////////
// TOP DAMAGE FOR DRAGONS
////////////////////////////////////////////////////////////////////////////////
renderWhen(register('step', () => {
    damagers = getTopDragDamagers().join('\n');
    damagersText =  baoDragons.spawned ? `&bTop Damagers: \n&9${baoUtils.thickSep}\n${damagers}` : '';
}).setFps(3), () => Settings.showDragonDamageDisplay && getInEnd() && getInSkyblock() && World.isLoaded());

////////////////////////////////////////////////////////////////////////////////
// RENDER TRIGGERS
////////////////////////////////////////////////////////////////////////////////
renderWhen(register('renderOverlay', () => {
    Renderer.drawStringWithShadow(baoDragons.displayText, baoDragons.counter.x, baoDragons.counter.y);
}), () => Settings.showDragonCounter && getInEnd() && getInSkyblock() && World.isLoaded())

renderWhen(register('renderOverlay', () => {
    Renderer.drawStringWithShadow(damagersText, baoDragons.damage.x, baoDragons.damage.y);
}), () => Settings.showDragonDamageDisplay && getInEnd() && getInSkyblock() && World.isLoaded());

renderWhen(register('renderOverlay', () => {
    renderGuiPosition(moveDragonCounter, baoDragons.counter, dragonDraggable);
    renderGuiPosition(moveDamageCounter, baoDragons.damage, damagersDraggable);
}), () => getInSkyblock() && World.isLoaded());

// box for dragon hitbox
renderWhen(register('renderWorld', () => {
    World.getAllEntitiesOfType(entityDrag).forEach(dragon => {
        drawDragonHitBox(dragon.getX(), dragon.getY(), dragon.getZ(), 'white');
    });
}), () => getInEnd() && getInSkyblock() && World.isLoaded());
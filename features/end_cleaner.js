import Settings from '../settings.js';
import Audio from '../utils/audio.js';
import PogObject from 'PogData';

import { sendMessage } from '../utils/party.js';
import { getInSkyblock } from '../utils/functions.js'; // sb, area
import { baoUtils, showAlert } from '../utils/utils.js';
import { createGuiCommand, renderGuiPosition } from '../utils/functions.js'; // gui
import { constrainX, constrainY } from '../utils/functions.js' // padding
import { filterSeparators } from '../utils/functions.js';
import { getInEnd } from '../utils/functions.js';
import { showAlert } from '../utils/utils.js';

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

// pogobject
export const baoDragons = new PogObject("bao-dev", {
    "spawned": false,
    "eyesPlaced": 0,
    "crystalsBroken": 0, 
    "supWeight": 0, 
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
}, '/data/baoDragons.json');
baoDragons.autosave(5);


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
register('chat', (playerName, numEyes, event) => {
    if (!shouldHandleEndMsgs()) return;
    if (playerName === Player.getName()) baoDragons.eyesPlaced++;
    baoDragons.save();
}).setCriteria('☬ ${playerName} placed a Summoning Eye! (${numEyes}/8)');

register('chat', (drag, event) => {
    if (!shouldHandleEndMsgs()) return;
    baoDragons.eyesPlaced = 0;
    baoDragons.spawned = false;
    damagers = [];
    baoDragons.save();
}).setCriteria('☬ The Dragon Egg has spawned!');

register('chat', (event) => {
    handleEndMessage(event);
}).setCriteria('Your Sleeping Eyes have been awoken by the magic of the Dragon. They are now Remnants of the Eye!');

register('chat', (dragName, event) => {
    handleEndMessage(event);
    if (Settings.betterEndMessages) {
        if (dragName === 'Old') baoDragons.counter.old += 1; baoDragons.counterdragsSinceSuperior += 1;
        if (dragName === 'Protector') baoDragons.counter.protector += 1; baoDragons.counterdragsSinceSuperior += 1;
        if (dragName === 'Strong') baoDragons.counter.strong += 1; baoDragons.counterdragsSinceSuperior += 1;
        if (dragName === 'Unstable') baoDragons.counter.unstable += 1; baoDragons.counterdragsSinceSuperior += 1;
        if (dragName === 'Wise') baoDragons.counter.wise += 1; baoDragons.counterdragsSinceSuperior += 1;
        if (dragName === 'Young') baoDragons.counter.young += 1; baoDragons.counterdragsSinceSuperior += 1;
        if (dragName === 'Superior') baoDragons.counter.superior += 1; baoDragons.counterdragsSinceSuperior = 0;
        baoDragons.counter.dragsSinceSuperior += 1;
    };
    baoDragons.spawned = true;
    damagers = [];
    baoDragons.save();
}).setCriteria('☬ The ${dragName} Dragon has spawned!');

register('chat', (player, event) => {
    handleEndMessage(event);
    if (player === Player.getName()) baoDragons.crystalsBroken += 1;
}).setCriteria('☬ ${player} destroyed an Ender Crystal!');

register('chat', (phase, event) => {
    handleEndMessage(event);
}).setCriteria("☬ The Dragon's Gate is ${phase}!");

register('chat', (dragType, ability, damage, event) => {
    handleEndMessage(event);
}).setCriteria('☬ ${dragType} Dragon used ${ability} on you for ${damage} damage.');

register('chat', (player, dragType, event) => {
    handleEndMessage(event);
}).setCriteria(' ☠ ${player} was killed by ${dragType} Dragon.');

register('chat', (dragType, event) => {
    baoDragons.spawned = false;
}).setCriteria('${dragType} DRAGON DOWN!').setContains();


// dragon counter
register('step', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.showDragonCounter) return;
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
    baoDragons.save();
}).setFps(1);

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
    baoDragons.save();
}); 


////////////////////////////////////////////////////////////////////////////////
// TOP DAMAGE FOR DRAGONS
////////////////////////////////////////////////////////////////////////////////
register('step', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!getInEnd() || !Settings.showDragonDamageDisplay) return;
    damagers = getTopDragDamagers().join('\n');
    damagersText =  baoDragons.spawned ? `&bTop Damagers: \n&9${baoUtils.thickSep}\n${damagers}` : '';
}).setFps(3);



register('renderOverlay', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (getInEnd()) {
        if (Settings.showDragonCounter) {
            Renderer.drawStringWithShadow(baoDragons.displayText, baoDragons.counter.x, baoDragons.counter.y);
        }
        if (Settings.showDragonDamageDisplay && baoDragons.spawned) {
            Renderer.drawStringWithShadow(damagersText, baoDragons.damage.x, baoDragons.damage.y);
        }
    }
    renderGuiPosition(moveDragonCounter, baoDragons.counter, dragonDraggable);
    renderGuiPosition(moveDamageCounter, baoDragons.damage, damagersDraggable);
});

////////////////////////////////////////////////////////////////////////////////
// OTHERS
////////////////////////////////////////////////////////////////////////////////
// end protector ping
register('chat', (event) => {
    endAudio.playDefaultSound();
    handleEndMessage(event, Settings.end_protector_ping, 'Endstone Protector Spawning', endProtTitle);
}).setCriteria('The ground begins to shake as an Endstone Protector rises from below!');

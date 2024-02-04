import Settings from '../settings.js';
import Audio from '../utils/audio.js';
import PogObject from 'PogData';

import { showAlert } from '../utils/utils.js';
import { constrainX, constrainY } from '../utils/functions.js' // padding
import { createGuiCommand, renderGuiPosition } from '../utils/functions.js'; // gui
import { detectDH, displayEntityHP, getPlayerCount, getThunderBottle } from '../utils/functions.js'; // detecting DH
import { getInSkyblock } from '../utils/functions.js'; // sb, area
import { baoDisplayHP } from '../features/displayHP.js';
import { getInCI, getInGarden } from '../utils/functions.js';

////////////////////////////////////////////////////////////////////////////////
// SETUP CONSTS
////////////////////////////////////////////////////////////////////////////////
const fishOverlayAudio = new Audio();

const entityHook = Java.type("net.minecraft.entity.projectile.EntityFishHook");
const entityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");
const entityPlayer = Java.type("net.minecraft.entity.player.EntityPlayer");

const moveBobberCounter = new Gui(); // bobber count
const movePlayerCounter = new Gui(); // player count
const moveNearbyJawbusCounter = new Gui(); // nearby jawbus
const moveNearbyThunderCounter = new Gui(); // nearby thunder
const moveChargesCounter = new Gui(); // charges
const movedaycounter = new Gui();

createGuiCommand(moveBobberCounter, 'movebobber', 'mbc');
createGuiCommand(movePlayerCounter, 'moveplayer', 'mpc');
createGuiCommand(moveNearbyJawbusCounter, 'movejawbus', 'mj');
createGuiCommand(moveNearbyThunderCounter, 'movethunder', 'mt');
createGuiCommand(moveChargesCounter, 'movecharge', 'mcc');
createGuiCommand(movedaycounter, 'movedaycount', 'mdc');

const bobberDraggable = '&7Bobbers: 0';
const playerDraggable = '&7Players: 0';
const jawbusDraggable = '&7Nearby Jawbus: NO [x0]'
const thunderDraggable = '&7Nearby Thunder: NO [x0]'
const chargesDraggable = '&7Thunder Bottle: 0'
const dayDraggable = '&7Day: 0.00'

export const baoFishOverlay = new PogObject("bao-dev", {
    "bobber": {
        "count": 0,
        "text": '', 
        "x": 3, 
        "y": 14
    }, 
    "player": {
        "count": 0, 
        "text": '', 
        "x": 3, 
        "y": 24,
    }, 
    "nbJawbus": {
        "info": null, 
        "text": '', 
        "x": 3, 
        "y": 34,
    },
    "nbThunder": {
        "info": null, 
        "text": '', 
        "x": 3, 
        "y": 44,
    },
    "charges": {
        "sentFullMsg": false,
        "text": '', 
        "x": 3, 
        "y": 54, 
    }, 
    "lobbyDay": {
        "text": '',
        "x": 3, 
        "y": 34
    }
}, '/data/baoFishOverlay.json');
baoFishOverlay.autosave(5);


////////////////////////////////////////////////////////////////////////////////
// create info object for jawbus and thunder
////////////////////////////////////////////////////////////////////////////////
function createInfoObject() {
    let resultObj = {
        found: false,
        foundNearby: false, 
        names: [], 
        titleShown: false, 
        numNearby: 0, 
        currHealth: 0,
        totalHealth: 0,   
    }
    return resultObj;
}

baoFishOverlay.nbJawbus.info = createInfoObject();
baoFishOverlay.nbThunder.info = createInfoObject();

////////////////////////////////////////////////////////////////////////////////
// REG DRAGGED
////////////////////////////////////////////////////////////////////////////////
register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (moveBobberCounter.isOpen()){
        baoFishOverlay.bobber.x = constrainX(x, 3, bobberDraggable);
        baoFishOverlay.bobber.y = constrainY(y, 3, bobberDraggable);
    }
    if (movePlayerCounter.isOpen()) {
        baoFishOverlay.player.x = constrainX(x, 3, playerDraggable);
        baoFishOverlay.player.y = constrainY(y, 3, playerDraggable);
    }
    if (moveNearbyJawbusCounter.isOpen()) {
        baoFishOverlay.nbJawbus.x = constrainX(x, 3, jawbusDraggable);
        baoFishOverlay.nbJawbus.y = constrainY(y, 3, jawbusDraggable);
    }
    if (moveNearbyThunderCounter.isOpen()) {
        baoFishOverlay.nbThunder.x = constrainX(x, 3, thunderDraggable);
        baoFishOverlay.nbThunder.y = constrainY(y, 3, thunderDraggable);
    }
    if (moveChargesCounter.isOpen()) {
        baoFishOverlay.charges.x = constrainX(x, 3, chargesDraggable);
        baoFishOverlay.charges.y = constrainY(y, 3, chargesDraggable);
    }
    if (movedaycounter.isOpen()) {
        baoFishOverlay.lobbyDay.x = constrainX(x, 3, dayDraggable);
        baoFishOverlay.lobbyDay.y = constrainY(y, 3, dayDraggable);
    }
    baoFishOverlay.save();
})

////////////////////////////////////////////////////////////////////////////////
// FUNCS FOR UPDATING LOGIC
////////////////////////////////////////////////////////////////////////////////
function updateBobberCount(hook) {
    return World.getAllEntitiesOfType(hook).filter(dist => dist.distanceTo(Player.getPlayer()) < 31).length;
}

function updateEntityText(name, count) {
    let colorF = count > 6 ? '&b&l' : '&b'
    let nbEntitiesText = count > 0 ? Math.round(count) : '0';
    return `&r${name}: ${colorF}${nbEntitiesText}`;
}

function updateNearbyText(name, givObject) {
    let isNBFound = givObject.foundNearby ? 'YES' : 'NO';
    let numNB = givObject.numNearby > 0 ? ` [x${givObject.numNearby}]` : '';
    return `&rNearby ${name}: &b${isNBFound}  &6${numNB}`;
}

function updateChargeText(charges) {
    let res = '';
    if (charges === 50000) res = 'Thunder Bottle: &b&lFULL';
    if (charges === null) res = 'Thunder Bottle: &cNo Bottle Available';
    if (charges !== null && charges !== 50000) res = `Thunder Bottle: &b${charges}⚡`; 
    return res;
}

function handleFullyCharged(alert, audioInst, flag) {
    if (alert) showAlert(alert);
    if (audioInst) audioInst.playDefaultSound();
    flag = true;
}

function getLobbyDay() {
    let lobbyTicks = World.getTime();
    let day = (lobbyTicks / 24000).toFixed(2);
    return `Day: &b${day}`;
}

////////////////////////////////////////////////////////////////////////////////
// STEP
////////////////////////////////////////////////////////////////////////////////
register("step", () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    
    // bobber counter
    if (Settings.bobberCount) { 
        baoFishOverlay.bobber.count = updateBobberCount(entityHook);
        baoFishOverlay.bobber.text = updateEntityText('Bobbers', baoFishOverlay.bobber.count);
    }
    
    // player counter
    if (Settings.playersNearbyCount) {
        baoFishOverlay.player.count = getPlayerCount(entityPlayer);
        baoFishOverlay.player.text = updateEntityText('Players', baoFishOverlay.player.count);
    }
    
    // lobby day counter
    if (Settings.lobbyDayCount) {
        baoFishOverlay.lobbyDay.text = getLobbyDay();
    }

    // ONLY IF IN CRIMSON ISLE
    if (getInCI())  {
        // detect doublehook jawbus
        if (Settings.detectDoubleJawbus) {
            detectDH(entityArmorStand, 'Jawbus', '&4', 'Follower', baoFishOverlay.nbJawbus.info);
            baoFishOverlay.nbJawbus.text = updateNearbyText('Jawbus', baoFishOverlay.nbJawbus.info);
        }
        
        // detect doublehook thunder
        if (Settings.detectDoubleThunder) {
            detectDH(entityArmorStand, 'Thunder', '&b', null, baoFishOverlay.nbThunder.info);
            baoFishOverlay.nbThunder.text = updateNearbyText('Thunder', baoFishOverlay.nbThunder.info);
        }
        
        // thunder bottle display
        if (Settings.full_bottle_ping) {
            let bottleCharge = getThunderBottle();
    
            if (bottleCharge === 50000 && !baoFishOverlay.charges.sentFullMsg) {
                handleFullyCharged('&b&lTHUNDER BOTTLE FULL', fishOverlayAudio, baoFishOverlay.charges.sentFullMsg)
            }
            baoFishOverlay.charges.text = updateChargeText(bottleCharge);
            baoFishOverlay.charges.sentFullMsg = bottleCharge === 50000;
        }
    }

    baoFishOverlay.save();
}).setFps(5);


////////////////////////////////////////////////////////////////////////////////
/* RENDER OVERLAY --------------------------------------------------------------
* Purpose: renderOverlays for bobber count, players nearby, 
* nearby jawbus and nearby thunder
 ------------------------------------------------------------------------------*/
////////////////////////////////////////////////////////////////////////////////
register('renderOverlay', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!getInGarden()) {
        // bobber count
        if (Settings.bobberCount) {
            Renderer.drawStringWithShadow(baoFishOverlay.bobber.text, baoFishOverlay.bobber.x, baoFishOverlay.bobber.y)
        }
    
        // nearby players
        if (Settings.playersNearbyCount) {
            Renderer.drawStringWithShadow(baoFishOverlay.player.text, baoFishOverlay.player.x, baoFishOverlay.player.y);
        }
        
        // lobby day counter
        if (Settings.lobbyDayCount) {
            Renderer.drawStringWithShadow(baoFishOverlay.lobbyDay.text, baoFishOverlay.lobbyDay.x, baoFishOverlay.lobbyDay.y);
        }
    }
    
    if (getInCI()) {
        // detect double/nearby jawbus
        if (Settings.detectDoubleJawbus) {
            Renderer.drawStringWithShadow(baoFishOverlay.nbJawbus.text, baoFishOverlay.nbJawbus.x, baoFishOverlay.nbJawbus.y);
            if (Settings.jawbus_hp) displayEntityHP(baoFishOverlay.nbJawbus.names, baoFishOverlay.nbJawbus.found, baoDisplayHP.x, baoDisplayHP.y)
        }
        
        // detect double/nearby thunder
        if (Settings.detectDoubleThunder) {
            Renderer.drawStringWithShadow(baoFishOverlay.nbThunder.text, baoFishOverlay.nbThunder.x, baoFishOverlay.nbThunder.y);
            if (Settings.thunder_hp) displayEntityHP(baoFishOverlay.nbThunder.info.names, baoFishOverlay.nbThunder.info.found, baoDisplayHP.x, baoDisplayHP.y)
        }
        
        // charge counter
        if (Settings.chargeCounter) {
            Renderer.drawStringWithShadow(baoFishOverlay.charges.text, baoFishOverlay.charges.x, baoFishOverlay.charges.y)
        }
    }

    // gui open
    renderGuiPosition(moveBobberCounter, baoFishOverlay.bobber, bobberDraggable);
    renderGuiPosition(movePlayerCounter, baoFishOverlay.player, playerDraggable);
    renderGuiPosition(moveNearbyJawbusCounter, baoFishOverlay.nbJawbus, jawbusDraggable);
    renderGuiPosition(moveNearbyThunderCounter, baoFishOverlay.nbThunder, thunderDraggable);
    renderGuiPosition(moveChargesCounter, baoFishOverlay.charges, chargesDraggable);
    renderGuiPosition(movedaycounter, baoFishOverlay.lobbyDay, dayDraggable);
    baoFishOverlay.save();
})


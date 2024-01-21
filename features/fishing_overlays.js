import Settings from '../settings.js';
import Audio from '../utils/audio.js';
import PogObject from 'PogData';

import { showAlert } from '../utils/utils.js';
import { constrainX, constrainY } from '../utils/functions.js' // padding
import { createGuiCommand, renderGuiPosition } from '../utils/functions.js'; // gui
import { detectDH, displayEntityHP, getPlayerCount, getThunderBottle } from '../utils/functions.js'; // detecting DH
import { getInSkyblock, getCurrArea } from '../utils/functions.js'; // sb, area
import { baoDisplayHP } from '../features/displayHP.js';

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
createGuiCommand(moveBobberCounter, 'movebobber', 'mbc');
createGuiCommand(movePlayerCounter, 'moveplayer', 'mpc');
createGuiCommand(moveNearbyJawbusCounter, 'movejawbus', 'mj');
createGuiCommand(moveNearbyThunderCounter, 'movethunder', 'mt');
createGuiCommand(moveChargesCounter, 'movecharge', 'mcc');

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
}, '/data/baoFishOverlay.json');
baoFishOverlay.autosave(5);


////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
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


////////////////////////////////////////////////////////////////////////////////
// CODE
////////////////////////////////////////////////////////////////////////////////
baoFishOverlay.nbJawbus.info = createInfoObject();
baoFishOverlay.nbThunder.info = createInfoObject();

// dragged events
register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (moveBobberCounter.isOpen()){
        baoFishOverlay.bobber.x = constrainX(x, 3, baoFishOverlay.bobber.text);
        baoFishOverlay.bobber.y = constrainY(y, 3, baoFishOverlay.bobber.text);
    }
    if (movePlayerCounter.isOpen()) {
        baoFishOverlay.player.x = constrainX(x, 3, baoFishOverlay.player.text);
        baoFishOverlay.player.y = constrainY(y, 3, baoFishOverlay.player.text);
    }
    if (moveNearbyJawbusCounter.isOpen()) {
        baoFishOverlay.nbJawbus.x = constrainX(x, 3, baoFishOverlay.nbJawbus.text);
        baoFishOverlay.nbJawbus.y = constrainY(y, 3, baoFishOverlay.nbJawbus.text);
    }
    if (moveNearbyThunderCounter.isOpen()) {
        baoFishOverlay.nbThunder.x = constrainX(x, 3, baoFishOverlay.nbThunder.text);
        baoFishOverlay.nbThunder.y = constrainY(y, 3, baoFishOverlay.nbThunder.text);
    }
    if (moveChargesCounter.isOpen()) {
        baoFishOverlay.charges.x = constrainX(x, 3, baoFishOverlay.charges.text);
        baoFishOverlay.charges.y = constrainY(y, 3, baoFishOverlay.charges.text);
    }
    baoFishOverlay.save();
})

register("step", () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    
    // bobber counter
    baoFishOverlay.bobber.count = World.getAllEntitiesOfType(entityHook).filter(dist => dist.distanceTo(Player.getPlayer()) < 31).length;
    let nearbyBobbers = baoFishOverlay.bobber.count > 0 ? Math.round(baoFishOverlay.bobber.count) : '0';
    baoFishOverlay.bobber.text = `&rBobbers: &b${nearbyBobbers}`
    

    // player counter
    baoFishOverlay.player.count = getPlayerCount(entityPlayer);
    let playerCountColor = baoFishOverlay.player.count > 6 ? '&b&l' : '&b'
    let nearbyPlayersText = baoFishOverlay.player.count > 0 ? baoFishOverlay.player.count : '0';
    baoFishOverlay.player.text = `&rPlayers: ${playerCountColor}${nearbyPlayersText}`
    
    if (getCurrArea() === 'Crimson Isle')  {
        // detect doublehook jawbus
        detectDH(entityArmorStand, 'Jawbus', '&4', 'Follower', baoFishOverlay.nbJawbus);
        let isNBJawbusFound = baoFishOverlay.nbJawbus.foundNearby ? 'YES' : 'NO';
        let numNBJawbus = baoFishOverlay.nbJawbus.numNearby > 0 ? ` [x${baoFishOverlay.nbJawbus.numNearby}]` : '';
        baoFishOverlay.nbJawbus.text = `&rNearby Jawbus: &b${isNBJawbusFound}  &6${numNBJawbus}`
        
        // detect doublehook thunder
        detectDH(entityArmorStand, 'Thunder', '&b', null, baoFishOverlay.nbThunder.info);
        let isNBThunderFound = baoFishOverlay.nbThunder.info.foundNearby ? 'YES' : 'NO';
        let numNBThunder = baoFishOverlay.nbThunder.info.numNearby > 0 ? `[x${baoFishOverlay.nbThunder.info.numNearby}]` : '';
        baoFishOverlay.nbThunder.text = `&rNearby Thunder: &b${isNBThunderFound}  &6${numNBThunder}`
        
        // thunder bottle display
        let charge = getThunderBottle();
        if (charge === '50000') {
            if (Settings.full_bottle_ping && !baoFishOverlay.charges.sentFullMsg) {
                showAlert('&b&lTHUNDER BOTTLE FULL');
                fishOverlayAudio.playDefaultSound();
                baoFishOverlay.charges.sentFullMsg = true;
            }
            baoFishOverlay.charges.text = `Thunder Bottle: &b&lFULL`
        } else if (charge === 'No Bottle Available') {
            baoFishOverlay.charges.text = `Thunder Bottle: &c${charge}`;
            baoFishOverlay.charges.sentFullMsg = false;
        } else {
            baoFishOverlay.charges.text = `Thunder Bottle: &b${charge}`;
            baoFishOverlay.charges.sentFullMsg = false;
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
    // bobber count
    if (Settings.bobberCount && getCurrArea() !== 'Garden') {
        Renderer.drawString(baoFishOverlay.bobber.text, baoFishOverlay.bobber.x, baoFishOverlay.bobber.y)
    }

    // nearby players
    if (Settings.playersNearbyCount && getCurrArea() !== 'Garden') {
        Renderer.drawString(baoFishOverlay.player.text, baoFishOverlay.player.x, baoFishOverlay.player.y);
    }
    
    // detect double/nearby jawbus
    if (Settings.detectDoubleJawbus && getCurrArea() === 'Crimson Isle') {
        Renderer.drawString(baoFishOverlay.nbJawbus.text, baoFishOverlay.nbJawbus.x, baoFishOverlay.nbJawbus.y);
        if (Settings.jawbus_hp) displayEntityHP(baoFishOverlay.nbJawbus.names, baoFishOverlay.nbJawbus.found, baoDisplayHP.x, baoDisplayHP.y)
    }
    
    // detect double/nearby thunder
    if (Settings.detectDoubleThunder && getCurrArea() === 'Crimson Isle') {
        Renderer.drawString(baoFishOverlay.nbThunder.text, baoFishOverlay.nbThunder.x, baoFishOverlay.nbThunder.y);
        if (Settings.thunder_hp) displayEntityHP(baoFishOverlay.nbThunder.info.names, baoFishOverlay.nbThunder.info.found, baoDisplayHP.x, baoDisplayHP.y)
    }
    
    // charge counter
    if (Settings.chargeCounter && getCurrArea() === 'Crimson Isle') {
        Renderer.drawString(baoFishOverlay.charges.text, baoFishOverlay.charges.x, baoFishOverlay.charges.y)
    }


    // gui open
    renderGuiPosition(moveBobberCounter, baoFishOverlay.bobber, '&7Bobbers: 0');
    renderGuiPosition(movePlayerCounter, baoFishOverlay.player, '&7Players: 0');
    renderGuiPosition(moveNearbyJawbusCounter, baoFishOverlay.nbJawbus, '&7Nearby Jawbus: NO [x0]');
    renderGuiPosition(moveNearbyThunderCounter, baoFishOverlay.nbThunder, '&7Nearby Thunder: NO [x0]');
    renderGuiPosition(moveChargesCounter, baoFishOverlay.charges, '&7Thunder Bottle: 0');
    baoFishOverlay.save();
})


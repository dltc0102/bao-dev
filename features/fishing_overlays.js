import Settings from '../settings.js'
import Audio from '../utils/audio.js'
import { data } from '../utils/data.js'
import { showAlert } from '../utils/utils.js'
import { detectDH } from '../utils/functions.js' // functions for detecting
import { createGuiCommand, getTabArea } from '../utils/functions.js' // functions for general use
import { getFilteredPlayerTabNames, getNearbyPlayers, filterBotNames } from '../utils/functions.js' // functions for player count
import { getThunderBottle } from '../utils/functions.js' // functions for charge counter
import { renderGuiPosition, displayEntityHP } from '../utils/functions.js' // functions for overlays

let currArea = '';
register('step', () => { if (!data.inSkyblock) return; currArea = getTabArea(); }).setFps(1);

const overlayAudio = new Audio();
////////////////////////////////////////////////////////////////////////////////
// ENTITY GLOBALS --------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
const EntityFishHook = Java.type("net.minecraft.entity.projectile.EntityFishHook")
const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");


var movebobber = new Gui(); // bobber count
var moveplayers = new Gui(); // player count
var movenearbyjawbus = new Gui(); // nearby jawbus
var movenearbythunder = new Gui(); // nearby thunder
var movecharges = new Gui(); // charges
var movehp = new Gui(); // display hp of mobs

// maybe save jawbus/thunder info to pogdata
let jawbusInfo = {
    found: false,
    foundNearby: false, 
    names: [],
    titleShown: false,
    numNearby: 0,
    currHealth: 0,
    totalHealth: 0,
};

let thunderInfo = {
    found: false,
    foundNearby: false, 
    names: [],
    titleShown: false,
    numNearby: 0,
    currHealth: 0,
    totalHealth: 0,
};

// dragged events
register('dragged', (dx, dy, x, y) => {
    if (!data.inSkyblock) return;
    if (movebobber.isOpen()){
        data.BCount.x = x;
        data.BCount.y = y;
    }
    if (moveplayers.isOpen()) {
        data.PCount.x = x;
        data.PCount.y = y;
    }
    if (movenearbyjawbus.isOpen()) {
        data.nbJawbus.x = x;
        data.nbJawbus.y = y;
    }
    if (movenearbythunder.isOpen()) {
        data.nbThunder.x = x;
        data.nbThunder.y = y;
    }
    if (movecharges.isOpen()) {
        data.CCount.x = x;
        data.CCount.y = y;
    }
    if (movehp.isOpen()) {
        data.HPCount.x = x;
        data.HPCount.y = y;
    }
})

// manual commands for gui events
createGuiCommand(movebobber, 'movebobber', 'mbc')
createGuiCommand(moveplayers, 'moveplayer', 'mpc')
createGuiCommand(movenearbyjawbus, 'movejawbus', 'mj')
createGuiCommand(movenearbythunder, 'movethunder', 'mt')
createGuiCommand(movecharges, 'movecharge', 'mcc')
createGuiCommand(movehp, 'movehp', 'mhp')


let bobberCount = 0;
let playerCount = 0;
let filteredNames = [];
let bobberCountText = '';
let playerCountText = '';
let nbJawbusDisplayText = '';
let nbThunderDisplayText = '';
let thunderBottleDisplayText = '';
let hpDisplayText = '';

register("step", () => {
    if (!data.inSkyblock) return;
    // bobber counter
    bobberCount = World.getAllEntitiesOfType(EntityFishHook).filter(dist => dist.distanceTo(Player.getPlayer()) < 31).length
    // bobber counter display
    nearbyBobbers = bobberCount > 0 ? Math.round(bobberCount) : '0';
    bobberCountText = `&rBobbers: &b${nearbyBobbers}`
    

    // player counter
    const playerTabNames = getFilteredPlayerTabNames();
    const nearbyPlayers = getNearbyPlayers(31);
    filteredNames = filterBotNames(nearbyPlayers, playerTabNames)
    playerCount = filteredNames.length;
    // player counter display
    const playerCountColor = playerCount > 6 ? '&b&l' : '&b'
    const nearbyPlayersText = playerCount > 0 ? playerCount : '0';
    playerCountText = `&rPlayers: ${playerCountColor}${nearbyPlayersText}`
    
    // detect doublehook jawbus
    detectDH(EntityArmorStand, 'Jawbus', '&4', 'Follower', jawbusInfo);
    const nearbyJawbusText = jawbusInfo.foundNearby ? 'YES' : 'NO';
    const nearbyJawbusCount = jawbusInfo.numNearby > 0 ? ` [x${jawbusInfo.numNearby}]` : '';
    nbJawbusDisplayText = `&rNearby Jawbus: &b${nearbyJawbusText}  &6${nearbyJawbusCount}`
    
    // detect doublehook thunder
    detectDH(EntityArmorStand, 'Thunder', '&b', null, thunderInfo);
    const nearbyThunderText = thunderInfo.foundNearby ? 'YES' : 'NO';
    const nearbyThunderCount = thunderInfo.numNearby > 0 ? `[x${thunderInfo.numNearby}]` : '';
    nbThunderDisplayText = `&rNearby Thunder: &b${nearbyThunderText}  &6${nearbyThunderCount}`

    // thunder bottle display
    const charge = getThunderBottle()
    if (charge === '50000') {
        thunderBottleDisplayText = `Thunder Bottle: &b&lFULL`
    } else if (charge === 'No Bottle Available') {
        thunderBottleDisplayText = `Thunder Bottle: &c${charge}`
    } else {
        thunderBottleDisplayText = `Thunder Bottle: &b${charge}`
    }

    // hp display text
}).setFps(5);

register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.full_bottle_ping) return;
    showAlert('&b&lTHUNDER BOTTLE FULL');
    overlayAudio.playDefaultSound();
}).setCriteria('> Your bottle of thunder has fully charged!');


////////////////////////////////////////////////////////////////////////////////
/* RENDER OVERLAY --------------------------------------------------------------
* Purpose: renderOverlays for bobber count, players nearby, 
* nearby jawbus and nearby thunder
 ------------------------------------------------------------------------------*/
////////////////////////////////////////////////////////////////////////////////
register('renderOverlay', () => {
    if (!data.inSkyblock) return;
    // bobber count
    if (Settings.bobberCount && currArea !== 'Garden') {
        Renderer.drawString(bobberCountText, data.BCount.x, data.BCount.y)
    }

    // nearby players
    if (Settings.playersNearbyCount && currArea !== 'Garden') {
        Renderer.drawString(playerCountText, data.PCount.x, data.PCount.y);
    }
    
    // detect double/nearby jawbus
    if (Settings.detectDoubleJawbus && currArea === 'Crimson Isle') {
        Renderer.drawString(nbJawbusDisplayText, data.nbJawbus.x, data.nbJawbus.y);
        if (Settings.jawbus_hp) displayEntityHP(jawbusInfo.names, jawbusInfo.found, data.snapTop.x, data.snapTop.y)
    }
    
    // detect double/nearby thunder
    if (Settings.detectDoubleThunder && currArea === 'Crimson Isle') {
        Renderer.drawString(nbThunderDisplayText, data.nbThunder.x, data.nbThunder.y);
        if (Settings.thunder_hp) displayEntityHP(thunderInfo.names, thunderInfo.found, data.snapTop.x, data.snapTop.y)
    }
    
    // charge counter
    if (Settings.chargeCounter && currArea === 'Crimson Isle') {
        Renderer.drawString(thunderBottleDisplayText, data.CCount.x, data.CCount.y)
    }


    // gui open
    renderGuiPosition(movebobber, data.BCount, 'Bobbers: 0');
    renderGuiPosition(moveplayers, data.PCount, 'Players: 0 [...]');
    renderGuiPosition(movenearbyjawbus, data.nbJawbus, 'Nearby Jawbus: NO [x0]');
    renderGuiPosition(movenearbythunder, data.nbThunder, 'Nearby Thunder: NO [x0]');
    renderGuiPosition(movecharges, data.CCount, 'Thunder Bottle: 0');
})


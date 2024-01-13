import Settings from '../settings.js'
import { data } from '../utils/data.js'
import { constrainX, constrainY, createGuiCommand, detectDH, displayEntityHP, filterBotNames, getFilteredPlayerTabNames, getNearbyPlayers, getThunderBottle, renderGuiPosition } from '../utils/functions.js'; // detecting DH
import { showAlert } from '../utils/utils.js'

////////////////////////////////////////////////////////////////////////////////
// ENTITY GLOBALS --------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
data.fishingOverlays.movebobber = new Gui(); // bobber count
data.fishingOverlays.moveplayers = new Gui(); // player count
data.fishingOverlays.movenearbyjawbus = new Gui(); // nearby jawbus
data.fishingOverlays.movenearbythunder = new Gui(); // nearby thunder
data.fishingOverlays.movecharges = new Gui(); // charges

// maybe save jawbus/thunder info to pogdata
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

data.fishingOverlays.jawbusInfo = createInfoObject();
data.fishingOverlays.thunderInfo = createInfoObject();

// dragged events
register('dragged', (dx, dy, x, y) => {
    if (!data.inSkyblock) return;
    if (data.fishingOverlays.movebobber.isOpen()){
        data.fishingOverlays.bobberCounter.x = constrainX(x, 3, data.fishingOverlays.bobberCountText);
        data.fishingOverlays.bobberCounter.y = constrainY(y, 3, data.fishingOverlays.bobberCountText);
    }
    if (data.fishingOverlays.moveplayers.isOpen()) {
        data.fishingOverlays.playerCounter.x = constrainX(x, 3, data.fishingOverlays.playerCountText);
        data.fishingOverlays.playerCounter.y = constrainY(y, 3, data.fishingOverlays.playerCountText);
    }
    if (data.fishingOverlays.movenearbyjawbus.isOpen()) {
        data.fishingOverlays.jawbusCounter.x = constrainX(x, 3, data.fishingOverlays.nbJawbusText);
        data.fishingOverlays.jawbusCounter.y = constrainY(y, 3, data.fishingOverlays.nbJawbusText);
    }
    if (data.fishingOverlays.movenearbythunder.isOpen()) {
        data.fishingOverlays.thunderCounter.x = constrainX(x, 3, data.fishingOverlays.nbThunderText);
        data.fishingOverlays.thunderCounter.y = constrainY(y, 3, data.fishingOverlays.nbThunderText);
    }
    if (data.fishingOverlays.movecharges.isOpen()) {
        data.fishingOverlays.chargeCounter.x = constrainX(x, 3, data.fishingOverlays.thunderBottleText);
        data.fishingOverlays.chargeCounter.y = constrainY(y, 3, data.fishingOverlays.thunderBottleText);
    }
})

// manual commands for gui events
createGuiCommand(data.fishingOverlays.movebobber, 'movebobber', 'mbc')
createGuiCommand(data.fishingOverlays.moveplayers, 'moveplayer', 'mpc')
createGuiCommand(data.fishingOverlays.movenearbyjawbus, 'movejawbus', 'mj')
createGuiCommand(data.fishingOverlays.movenearbythunder, 'movethunder', 'mt')
createGuiCommand(data.fishingOverlays.movecharges, 'movecharge', 'mcc')

register("step", () => {
    if (!data.inSkyblock) return;
    
    // bobber counter
    data.fishingOverlays.bobberCount = World.getAllEntitiesOfType(data.entities.entityFishHook).filter(dist => dist.distanceTo(Player.getPlayer()) < 31).length
    nearbyBobbers = data.fishingOverlays.bobberCount > 0 ? Math.round(data.fishingOverlays.bobberCount) : '0';
    data.fishingOverlays.bobberCountText = `&rBobbers: &b${nearbyBobbers}`
    

    // player counter
    playerTabNames = getFilteredPlayerTabNames();
    nearbyPlayers = getNearbyPlayers(31);
    data.fishingOverlays.filteredNames = filterBotNames(nearbyPlayers, playerTabNames)
    data.fishingOverlays.playerCount = data.fishingOverlays.filteredNames.length;

    // player counter display
    playerCountColor = data.fishingOverlays.playerCount > 6 ? '&b&l' : '&b'
    nearbyPlayersText = data.fishingOverlays.playerCount > 0 ? data.fishingOverlays.playerCount : '0';
    data.fishingOverlays.playerCountText = `&rPlayers: ${playerCountColor}${nearbyPlayersText}`
    
    // detect doublehook jawbus
    detectDH(data.entities.entityArmorStand, 'Jawbus', '&4', 'Follower', data.fishingOverlays.jawbusInfo);
    nearbyJawbusText = data.fishingOverlays.jawbusInfo.foundNearby ? 'YES' : 'NO';
    nearbyJawbusCount = data.fishingOverlays.jawbusInfo.numNearby > 0 ? ` [x${data.fishingOverlays.jawbusInfo.numNearby}]` : '';
    data.fishingOverlays.nbJawbusText = `&rNearby Jawbus: &b${nearbyJawbusText}  &6${nearbyJawbusCount}`
    
    // detect doublehook thunder
    detectDH(data.entities.entityArmorStand, 'Thunder', '&b', null, data.fishingOverlays.thunderInfo);
    nearbyThunderText = data.fishingOverlays.thunderInfo.foundNearby ? 'YES' : 'NO';
    nearbyThunderCount = data.fishingOverlays.thunderInfo.numNearby > 0 ? `[x${data.fishingOverlays.thunderInfo.numNearby}]` : '';
    data.fishingOverlays.nbThunderText = `&rNearby Thunder: &b${nearbyThunderText}  &6${nearbyThunderCount}`

    // thunder bottle display
    charge = getThunderBottle();
    // console.log(charge);
    if (charge === '50000') {
        if (Settings.full_bottle_ping && !data.fishingOverlays.fullBottleMsgSent) {
            showAlert('&b&lTHUNDER BOTTLE FULL');
            data.audioInst.playDefaultSound();
            data.fishingOverlays.fullBottleMsgSent = true;
        }
        data.fishingOverlays.thunderBottleText = `Thunder Bottle: &b&lFULL`
    } else if (charge === 'No Bottle Available') {
        data.fishingOverlays.thunderBottleText = `Thunder Bottle: &c${charge}`;
        data.fishingOverlays.fullBottleMsgSent = false;
    } else {
        data.fishingOverlays.thunderBottleText = `Thunder Bottle: &b${charge}`;
        data.fishingOverlays.fullBottleMsgSent = false;
    }
}).setFps(5);


////////////////////////////////////////////////////////////////////////////////
/* RENDER OVERLAY --------------------------------------------------------------
* Purpose: renderOverlays for bobber count, players nearby, 
* nearby jawbus and nearby thunder
 ------------------------------------------------------------------------------*/
////////////////////////////////////////////////////////////////////////////////
register('renderOverlay', () => {
    if (!data.inSkyblock) return;
    // bobber count
    if (Settings.bobberCount && data.currArea !== 'Garden') {
        Renderer.drawString(data.fishingOverlays.bobberCountText, data.fishingOverlays.bobberCounter.x, data.fishingOverlays.bobberCounter.y)
    }

    // nearby players
    if (Settings.playersNearbyCount && data.currArea !== 'Garden') {
        Renderer.drawString(data.fishingOverlays.playerCountText, data.fishingOverlays.playerCounter.x, data.fishingOverlays.playerCounter.y);
    }
    
    // detect double/nearby jawbus
    if (Settings.detectDoubleJawbus && data.currArea === 'Crimson Isle') {
        Renderer.drawString(data.fishingOverlays.nbJawbusText, data.fishingOverlays.jawbusCounter.x, data.fishingOverlays.jawbusCounter.y);
        if (Settings.jawbus_hp) displayEntityHP(data.fishingOverlays.jawbusInfo.names, data.fishingOverlays.jawbusInfo.found, data.snapTop.x, data.snapTop.y)
    }
    
    // detect double/nearby thunder
    if (Settings.detectDoubleThunder && data.currArea === 'Crimson Isle') {
        Renderer.drawString(data.fishingOverlays.nbThunderText, data.fishingOverlays.thunderCounter.x, data.fishingOverlays.thunderCounter.y);
        if (Settings.thunder_hp) displayEntityHP(data.fishingOverlays.thunderInfo.names, data.fishingOverlays.thunderInfo.found, data.snapTop.x, data.snapTop.y)
    }
    
    // charge counter
    if (Settings.chargeCounter && data.currArea === 'Crimson Isle') {
        Renderer.drawString(data.fishingOverlays.thunderBottleText, data.fishingOverlays.chargeCounter.x, data.fishingOverlays.chargeCounter.y)
    }


    // gui open
    renderGuiPosition(data.fishingOverlays.movebobber, data.fishingOverlays.bobberCounter, 'Bobbers: 0');
    renderGuiPosition(data.fishingOverlays.moveplayers, data.fishingOverlays.playerCounter, 'Players: 0');
    renderGuiPosition(data.fishingOverlays.movenearbyjawbus, data.fishingOverlays.jawbusCounter, 'Nearby Jawbus: NO [x0]');
    renderGuiPosition(data.fishingOverlays.movenearbythunder, data.fishingOverlays.thunderCounter, 'Nearby Thunder: NO [x0]');
    renderGuiPosition(data.fishingOverlays.movecharges, data.fishingOverlays.chargeCounter, 'Thunder Bottle: 0');
})


import Settings from './config1/settings.js';
import ExtraSettings from './config2/extraSettings.js';

import { baoUtils, baoFirstTime } from './utils/utils.js';

// bao main
// import './features/dungeons.js'
import './features/generalQOL.js' // 1
// import './features/fishing_overlays.js' // 1
// import './features/displayHP.js' // 1
import './features/fishing_pings.js' // 1
// import './features/garden.js'
import './features/timers.js' // 1
import './features/mainSCStats.js' // 1
import './features/waterSCStats.js' // 1
import './features/lavaSCStats.js' // 1
// // import './features/detections.js'
// import './features/kuudra.js'
import './features/slayers.js' // 1

// // bao extras
// import './features/end.js'
// import './features/mythos.js'
// import './features/misc.js'

// import './features/dev.js'
import './features/tempDetections.js' // 1
import './utils/ignore.js' // 1
import './utils/waypoints.js' // 1
import './features/partyLines.js' // 1

// import './utils/cake.js';
// import './utils/inventoryLog.js'

register("gameLoad", () => {
    ChatLib.chat(`${baoUtils.modPrefix} &rUpdated!`)
    ChatLib.command('pl');
    console.log(`------------------------------------------------------------------------------------`);
    console.log(`[Bao] Updated!`);
    // ChatLib.command('baoeverything', true);
});

// firstTime
if (baoFirstTime.firstTime) {
    baoFirstTime.firstTime = false;
    baoFirstTime.save();

    const messages = [
        `${baoUtils.modPrefix} has been installed!`, 
        `&fThank you for downloading. This is Bao by oBiscuit.`, 
        `&eThis version is v1.0.4 -- &bStart by doing /bao`
    ]

    ChatLib.chat(`&b&m${ChatLib.getChatBreak(" ")}`);
    messages.forEach(idx => ChatLib.chat(ChatLib.getCenteredText(idx)));
    ChatLib.chat(`&b&m${ChatLib.getChatBreak(" ")}`);
}

// open main gui
register("command", () => 
    Settings.openGUI()
).setName("biscuitaddons").setAliases('bao');

register('command', () => {
    ExtraSettings.openGUI()
}).setName('biscuitextras').setAliases('baox');

register('command', (args) => {
    Client.showTitle(args, '', 1, 30,   1);
}).setName('titlesim').setAliases('tsim');


register('command', () => {
    // general qol
    Settings.autoWarp = true;
    Settings.autoNotifyWarp = true;
    Settings.warpExcept = true;
    Settings.paiCommand = true;
    Settings.koCommand = true;
    Settings.ptaCommand = true;
    Settings.pingCommands = true;
    Settings.tpsCommands = true;
    Settings.notifyKicked = true;
    Settings.getBakerCake = true;
    Settings.hideAutopetMessages = true;
    Settings.hide_snow_cannon_messages = true;
    Settings.betterStashMessages = true;
    Settings.hideClickStashMessages = true;
    Settings.aotvHider = true;
    Settings.grandma_hider = true;
    Settings.betterWDA = true;

    // gui
    Settings.bobberCount = true;
    Settings.playersNearbyCount = true;
    Settings.detectDoubleJawbus = true;
    Settings.detectDoubleThunder = true;
    Settings.chargeCounter = true;
    Settings.lobbyDayCount = true;
    Settings.showPingDisplay = true;
    Settings.showTpsDisplay = true;

    // display hp
    Settings.master_displayHP = true;
    Settings.vanq_hp = true;
    Settings.mythosMobHP = true;
    Settings.rein_hp = true;
    Settings.yeti_hp = true;
    Settings.jawbus_hp = true;
    Settings.thunder_hp = true;
    Settings.gwshark_hp = true;
    Settings.carrotking_hp = true;
    Settings.waterhydra_hp = true;
    Settings.sea_emp_hp = true;
    Settings.reaper_hp = true;
    Settings.phantom_fisher_hp = true;

    // timers
    Settings.rekindleAlert = true;
    Settings.secondWindAlert = true;
    Settings.mushyTimer = true;
    Settings.flux_timer = true;
    Settings.kingScentTimer = true;
    Settings.gummyTimer = true;
    Settings.wispTimer = true;

    // detections
    Settings.detectJawbusEntities = true;
    Settings.detectThunderEntities = true;
    Settings.detectVanqEntities = true;

    // fishing qol
    Settings.hide_sc_msgs = true;
    Settings.betterFishingMessages = true;
    Settings.full_bottle_ping = true;

    // fishing pings
    // trophy
    Settings.toggleTrophyFishMsgs = true;

    // ci
    Settings.jawbusPing = true;
    Settings.rvialPing = true;
    Settings.thunderPing = true;
    Settings.vanqPing = true;
    Settings.phleg_ping = true;

    // winter
    Settings.yetiPing = true;
    Settings.babyYetiPing = true;
    Settings.nutcrackerPing = true;
    Settings.reinPing = true;

    // shark fest
    Settings.gwPing = true;
    Settings.megPetPing = true;

    // spooky
    Settings.phantomFisherPing = true;
    Settings.grimReaperPing = true;
    Settings.deepSeaOrbPing = true;
    Settings.phantomRodPing = true;
    Settings.luckyHoofPing = true;

    // general
    Settings.seaEmpPing = true;
    Settings.flyingFishPing = true;
    Settings.carrotKingPing = true;
    Settings.luckyCloverCorePing = true;
    Settings.waterHydraPing = true;
    Settings.guardianPetPing = true;
    Settings.dolphinMSPetPing = true;
    Settings.squidPetPing = true;

    // crystal hollows
    Settings.zombieMinerPing = true;

    // fawe
    Settings.fawePings = true;

    // counter
    Settings.fishing_counter = true;
    Settings.kills_fishingcounter = true;
    Settings.mob_since_fishingcounter = true;
    Settings.drops_fishingcounter = true;
    Settings.tracker_fishingcounter = true;
    Settings.avgs_fishingcounter = true;
    Settings.elapsed_sincefishingcounter = true;
    Settings.specials_fishingcounter = true;
    
    // garden

    // kuudra
    Settings.betterKuudraMessages = true;
    
    // dungeons
    Settings.bonzo_cd_timer = true;
    Settings.alert_melody = true;
    Settings.secretsPerSession = true;
    Settings.showBlessingsDisplay = true;
    Settings.betterDungeonMsgs = true;
    Settings.dungeonPlayerActions = true;
    Settings.dungeonMessageQOL = true;
    Settings.dungeonSysNotifications = true;
    Settings.dungeonInteractiveElements = true;
    Settings.showClassSpecificPings = true;
    Settings.enableJoinDungeonShortcuts = true;
    Settings.showFFTimers = true;
    Settings.betterPFMessages = true;
    Settings.fullInventoryAlert = true;
}).setName('baoeverything');
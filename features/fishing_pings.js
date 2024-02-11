import './fishingPings/betterFishingMsgs.js'
import './fishingPings/trophyFish.js'
import './fishingPings/fawePings.js'
import './fishingPings/crimsonFishingPings.js'
import './fishingPings/jerryIslandPings.js'
import './fishingPings/generalHubPings.js'
import './fishingPings/sharkFestPings.js'
import './fishingPings/spookyFestPings.js'
import './fishingPings/crystalHollowFishingPings.js'



// toggle all fishing pings command
register('command', () => {
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
}).setName('togglefishingpings');


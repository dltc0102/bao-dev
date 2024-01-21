import Settings from '../settings.js';
import PogObject from 'PogData';

import { createGuiCommand, formatMoney, renderGuiPosition, updateCDText } from '../utils/functions.js';
import { getInSkyblock, getCurrArea } from '../utils/functions.js'; // sb, area
import { baoUtils } from '../utils/utils.js';
import { baoWaterSCStats } from './water_fishingStats.js';
import { baoLavaSCStats } from './lava_fishingStats.js';


////////////////////////////////////////////////////////////////////////////////
// SETUP CONSTS
////////////////////////////////////////////////////////////////////////////////
const movefishcounter = new Gui();
createGuiCommand(movefishcounter, 'movefishcounter', 'mfc')

export const baoFishStats = new PogObject("bao-dev", {
    "x": 5, 
    "y": 100, 
    "CIDisplay": '', 
    "WIDisplay": '', 
    "HUBDisplay": '', 
    "overallDisplay": '',
}, '/data/baoFishStats.json');
baoFishStats.autosave(5);

const fishCounterDraggable = '&7<><FISHING AREA><>\n&7==================\n&7Kills #1: &b...\n&7Kills #2: &b...: &b...\n&7Kills #3: &b...\n&7-----------------\n&7Drops #1: &b...\n&7Drops #2: &b...\n&7Drops #3: &b...\n&7-----------------\n&7SC since Mob #1: &b...\n&7 SC since Mob #2: &b...\n&7-----------------\n&7Mob since Drop #1: &b...\n&7 Mob since Drop #2: &b...\n&7-----------------\nAverage SC per Mob #1: &b...\n&7Average SC per Mob #2: &b...\n&7Average SC per Mob #3: &b...\n&7-----------------\n&7Time Since Mob #1: &b...\n&7Time Since Mob #2: &b...\n&7-----------------\n&7Time Since Drop #1: &b...\n&7Time Since Drop #2';

////////////////////////////////////////////////////////////////////////////
// RENDER OVERLAY COUNTER --------------------------------------------------
////////////////////////////////////////////////////////////////////////////
register('step', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    const crimsonSepThick = `&3${baoUtils.thickSep}`
    const crimsonSepThin = `&3${baoUtils.thinSep}`

    const winterSepThick = `&7${baoUtils.thickSep}`
    const winterSepThin = `&7${baoUtils.thinSep}`

    const hubSepThick = `&5${baoUtils.thickSep}`
    const hubSepThin = `&5${baoUtils.thinSep}`

    // CRIMSON ISLE COUNTER
    if (getCurrArea() === 'Crimson Isle') {
        const crimsonTitle = Settings.kills_fishingcounter || Settings.tracker_fishingcounter || Settings.avgs_fishingcounter ? `&8|&7|&b|&7|&8| &cCrimson Isle &8|&7|&b|&7|&8|\n${crimsonSepThick}` : '';
        
        // kills
        let phlegLine = `&8||&b| &6Phlegblast: &b${baoLavaSCStats.phlegblastCatches}`
        let magmaSlugLine = `&8||&b| &6Magma Slug: &b${baoLavaSCStats.magmaSlugCatches}`
        let moogmaLine = `&8||&b| &6Moogma: &b${baoLavaSCStats.moogmaCatches}`
        let lavaLeechLine = `&8||&b| &6Lava Leech: &b${baoLavaSCStats.lavaLeechCatches}`
        let pyroWormLine = `&8||&b| &6Pyroclasic Worm: &b${baoLavaSCStats.pyroclasticWormCatches}`
        let lavaFlameLine = `&8||&b| &6Lava Flame: &b${baoLavaSCStats.lavaFlameCatches}`
        let fireEelLine = `&8||&b| &6Fire Eel: &b${baoLavaSCStats.fireEelsCatches}`
        let taurusLine = `&8||&b| &6Taurus: &b${baoLavaSCStats.taurusCatches}`
        let thunderLine = `&8||&b| &6Thunder: &b${baoLavaSCStats.thunderCatches}`
        let jawbusLine = `&8||&b| &6Jawbus: &b${baoLavaSCStats.lordJawbusCatches}`

        // trackers
        let scSinceThunderLine = `&8||&b| &rSC Since Thunder: &b${baoLavaSCStats.catchesSinceThunder}`
        let scSinceJawbusLine = `&8||&b| &rSC Since Jawbus: &b${baoLavaSCStats.catchesSinceJawbus}`

        let jawbusSinceVialLine = `&8||&b| &rJawbus Since Vial: &b${baoLavaSCStats.jawbusSinceLastVial === null ? 0 :baoLavaSCStats.jawbusSinceLastVial}`

        // probabilities
        const thunderChance = 0.0087;
        const jawbusChance = 0.0017;
        let probabilityThunder = (((baoLavaSCStats.thunderCatches /baoLavaSCStats.totalCrimsonSCCatches) + thunderChance) * 100).toFixed(2);
        let probabilityJawbus = (((baoLavaSCStats.lordJawbusCatches /baoLavaSCStats.totalCrimsonSCCatches) + jawbusChance) * 100).toFixed(2);

        // averages
        let averageSCPerThunder = (baoLavaSCStats.totalCrimsonSCCatches /baoLavaSCStats.thunderCatches).toFixed(2);
        let averageSCPerJawbus = (baoLavaSCStats.totalCrimsonSCCatches /baoLavaSCStats.lordJawbusCatches).toFixed(2);
        let avgThunderLine = `&8||&b| &rAvg SC/Thunder: &b${averageSCPerThunder} &8|| &9&oP(%): ${probabilityThunder}%`
        let avgJawbusLine = `&8||&b| &rAvg SC/Jawbus: &b${averageSCPerJawbus} &8|| &9&oP(%): ${probabilityJawbus}%`


        const showCIKills = Settings.kills_fishingcounter ? [phlegLine, magmaSlugLine, moogmaLine, lavaLeechLine, pyroWormLine, lavaFlameLine, fireEelLine, taurusLine, thunderLine, jawbusLine, crimsonSepThin].join('\n') : '';

        const showCITrackers = Settings.tracker_fishingcounter ? [scSinceThunderLine, scSinceJawbusLine, jawbusSinceVialLine, crimsonSepThin].join('\n') : '';

        const showCIAverages = Settings.avgs_fishingcounter ? [avgThunderLine, avgJawbusLine, crimsonSepThin].join('\n') : '';

        const CIDisplayRaw = [crimsonTitle, showCIKills, showCITrackers, showCIAverages].join('\n').replace(/\n{6,}/g, '\n');
        let CIDisplayFilter = CIDisplayRaw.replace(/\n{2,}/g, '\n');

        let phraseArray = CIDisplayFilter.split('\n');
        let lastIdx = -1;
        for (let i = phraseArray.length - 1; i >= 0; i--) {
            if (phraseArray[i].includes(crimsonSepThin)) {
                lastIdx = i;
                break;
            }
        }

        if (lastIdx !== -1) {
            phraseArray.splice(lastIdx, 1);
        }
        baoFishStats.CIDisplay = phraseArray.join('\n');
        baoFishStats.save();
    }

    // WINTER ISLAND COUNTER
    if (getCurrArea() === "Jerry's Workshop") {
        const winterTitle = Settings.kills_fishingcounter || Settings.mob_since_fishingcounter || Settings.drops_fishingcounter || Settings.tracker_fishingcounter || Settings.avgs_fishingcounter || Settings.elapsed_sincefishingcounter || Settings.specials_fishingcounter ? `&8|&1|&9|&3|&b| &rWinter Island &b|&3|&9|&1|&8|\n${winterSepThick}` : '';

        // winter kills
        let frozenSteveLine = `&9|&3|&b| &rFrozen Steve: &b${baoWaterSCStats.frozenSteveCatches}`
        let frostySnowmanLine = `&9|&3|&b| &rFrosty Snowman: &b${baoWaterSCStats.frostySnowmanCatches}`
        let grinchLine = `&9|&3|&b| &rGrinch: &b${baoWaterSCStats.grinchCatches}`
        let nutcrackerLine = `&9|&3|&b| &rNutcracker: &b${baoWaterSCStats.nutcrackerCatches}`
        let yetiLine = `&9|&3|&b| &rYeti: &b${baoWaterSCStats.yetiCatches}`
        let reindrakeLine = `&9|&3|&b| &rReindrake: &b${baoWaterSCStats.reindrakeCatches}`

        // winter trackers
        let scSinceYetiLine = `&9|&3|&b| &rSC Since Yeti: &b${baoWaterSCStats.catchesSinceYeti}`
        let scSinceReindrakeLine = `&9|&3|&b| &rSC Since Reindrake: &b${baoWaterSCStats.catchesSinceReindrake}`;

        // yeti since drops
        let yetiSinceEpicPetLine = `&9|&3|&b| &rYeti Since &5Epic &rPet: &b${baoWaterSCStats.yetiSinceEpicPet}`
        let yetiSinceLegPetLine = `&9|&3|&b| &rYeti Since &6Leg &rPet: &b${baoWaterSCStats.yetiSinceLegPet}`
        let yetiSincePetLine = `${yetiSinceEpicPetLine}\n${yetiSinceLegPetLine}`

        // drops
        let yetiPetLine = `&9|&3|&b| &rBaby Yeti Pet: &5${baoWaterSCStats.epicBabyYeti == null || isNaN(baoWaterSCStats.epicBabyYeti) ? 0 : baoWaterSCStats.epicBabyYeti}&r | &6${baoWaterSCStats.legBabyYeti == null || isNaN(baoWaterSCStats.legBabyYeti) ? 0 : baoWaterSCStats.legBabyYeti}&r`;
        let prosperityLine = `&9|&3|&b| &rProsperity I Book: &6${baoWaterSCStats.prosperityBook == null || isNaN(baoWaterSCStats.prosperityBook) ? 0 : baoWaterSCStats.prosperityBook}&r`;
        
        // winter time
        baoWaterSCStats.timeSinceEpicPet += 1;
        baoWaterSCStats.timeSinceLegPet += 1;
        baoWaterSCStats.timeSinceReindrake += 1;
        timeSinceEpicPetLine = updateCDText('', '&9|&3|&b| &rTime Since Epic Pet', baoWaterSCStats.timeSinceEpicPet);
        timeSinceLegPetLine = updateCDText('', '&9|&3|&b| &rTime Since Leg Pet', baoWaterSCStats.timeSinceLegPet);
        timeSinceReinLine = updateCDText('', '&9|&3|&b| &rTime Since Reindrake', baoWaterSCStats.timeSinceReindrake);

        
        // ice rod counts
        let iceRodsLine = `&9|&3|&b| &rIce Rods: ${baoWaterSCStats.iceRods == null || isNaN(baoWaterSCStats.iceRods) ? 0 : baoWaterSCStats.iceRods} &7(${baoWaterSCStats.iceRods == null || isNaN(baoWaterSCStats.iceRods) ? 0 : formatMoney(baoWaterSCStats.iceRods * 20000)})`;
        
        // winter averages
        let averageSCPerYeti = (baoWaterSCStats.totalWinterWaterSCCatches / baoWaterSCStats.yetiCatches).toFixed(2);
        let averageSCPerReindrake = (baoWaterSCStats.totalWinterWaterSCCatches / baoWaterSCStats.reindrakeCatches).toFixed(2);
        let avgYetiLine = `&9|&3|&b| &rAvg SC/Yeti: &b${averageSCPerYeti == null || isNaN(averageSCPerYeti) ? 0 : averageSCPerYeti}`;
        let avgReindrakeLine = `&9|&3|&b| &rAvg SC/Reindrake: &b${averageSCPerReindrake == null || isNaN(averageSCPerReindrake) ? 0 : averageSCPerReindrake}`;

        const showWIKills = Settings.kills_fishingcounter ? [frozenSteveLine, frostySnowmanLine, grinchLine, nutcrackerLine, yetiLine, reindrakeLine, winterSepThin].join('\n') : '';

        const showWITrackers = Settings.tracker_fishingcounter ? [scSinceYetiLine, scSinceReindrakeLine, winterSepThin].join('\n') : '';

        const showMobSinceTrackers = Settings.mob_since_fishingcounter ? [yetiSincePetLine, winterSepThin].join('\n') : '';

        const showWIDrops = Settings.drops_fishingcounter ? [yetiPetLine, prosperityLine, winterSepThin].join('\n') : '';

        const showWIAverages = Settings.avgs_fishingcounter ? [avgYetiLine, avgReindrakeLine, winterSepThin].join('\n') : '';

        const timeSincePetLine = Settings.elapsed_sincefishingcounter ? [`${timeSinceEpicPetLine}${timeSinceLegPetLine}${timeSinceReinLine}`, winterSepThin].join('\n') : '';

        const showIceRodCounter = Settings.specials_fishingcounter ? [iceRodsLine, winterSepThin].join('\n') : ''

        const WIDisplayRaw = [winterTitle, showWIKills, showWITrackers, showMobSinceTrackers, showWIDrops, showWIAverages, timeSincePetLine, showIceRodCounter].join('\n').replace(/\n{6,}/g, '\n');
        let WIDisplayFilter = WIDisplayRaw.replace(/\n{2,}/g, '\n');

        let phraseArray = WIDisplayFilter.split('\n');
        let lastIdx = -1;
        for (let i = phraseArray.length - 1; i >= 0; i--) {
            if (phraseArray[i].includes(winterSepThin)) {
                lastIdx = i;
                break;
            }
        }

        if (lastIdx !== -1) {
            phraseArray.splice(lastIdx, 1);
        }
        baoFishStats.WIDisplay = phraseArray.join('\n');
        baoFishStats.save();
    }

    // HUB GENERAL COUNTER
    if (getCurrArea() === 'Hub') {
        const generalTitle = Settings.kills_fishingcounter || Settings.drops_fishingcounter || Settings.tracker_fishingcounter || Settings.avgs_fishingcounter || Settings.mob_since_fishingcounter ? `&r  <--]|| &fGENERAL &r||[-->  \n${hubSepThick}` : '';

        // kills
        let squidLine = `&8||| &7Squid: &b${baoWaterSCStats.squidCatches}`
        let seaWalkerLine = `&8||| &7Sea Walker: &b${baoWaterSCStats.seaWalkerCatches}`
        let seaGuardianLine = `&8||| &7Sea Guardian: &b${baoWaterSCStats.seaGuardianCatches}`
        let seaWitchLine = `&8||| &7Sea Witch: &b${baoWaterSCStats.seaWitchCatches}`
        let seaArcherLine = `&8||| &7Sea Archer: &b${baoWaterSCStats.seaArcherCatches}`
        let rotdLine = `&8||| &7Rider of the Deep: &b${baoWaterSCStats.rotdCatches}`
        let catfishLine = `&8||| &7Catfish: &b${baoWaterSCStats.catfishCatches}`
        let seaLeechLine = `&8||| &7Sea Leech: &b${baoWaterSCStats.seaLeechCatches}`
        let guardianDefenderLine = `&8||| &7Guardian Defender: &b${baoWaterSCStats.guardianDefenderCatches}`
        let dspLine = `&8||| &7Deep Sea Protector: &b${baoWaterSCStats.deepSeaProtectorCatches}`
        let agarimooLine = `&8||| &7Agarimoo: &b${baoWaterSCStats.agarimooCatches}`
        let carrotKingLine = `&8||| &6Carrot King: &b${baoWaterSCStats.carrotKingCatches}`
        let waterHydraLine = `&8||| &6Water Hydra: &b${baoWaterSCStats.waterHydraCatches}`
        let seaEmpLine = `&8||| &6Sea Emperor: &b${baoWaterSCStats.seaEmperorCatches}`

        // trackers
        let scSinceCarrotKing = `&8||&r| SC Since Carrot King: &b${baoWaterSCStats.catchesSinceCarrotKing}`;
        let scSinceWaterHydra = `&8||&r| SC Since Water Hydra: &b${baoWaterSCStats.catchesSinceWaterHydra}`;
        let scSinceSeaEmperor = `&8||&r| SC Since Sea Emperor: &b${baoWaterSCStats.catchesSinceSeaEmperor}`;

        // averages
        let averageSCPerCarrotKing = (baoWaterSCStats.totalRegularWaterSCCatches / baoWaterSCStats.carrotKingCatches).toFixed(2);
        let averageSCPerWaterHydra = (baoWaterSCStats.totalRegularWaterSCCatches / baoWaterSCStats.waterHydraCatches).toFixed(2);
        let averageSCPerSeaEmperor = (baoWaterSCStats.totalRegularWaterSCCatches / baoWaterSCStats.seaEmperorCatches).toFixed(2);
        let avgCarrotKingLine = `&8||&r| Avg SC/Carrot King: &b${averageSCPerCarrotKing == null || isNaN(averageSCPerCarrotKing) ? '0.00' : averageSCPerCarrotKing}`;
        let avgWaterHydraLine = `&8||&r| Avg SC/Water Hydra: &b${averageSCPerWaterHydra == null || isNaN(averageSCPerWaterHydra) ? '0.00' : averageSCPerWaterHydra}`;
        let avgSeaEmperorLine = `&8||&r| Avg SC/Sea Emperor: &b${averageSCPerSeaEmperor == null || isNaN(averageSCPerSeaEmperor) ? '0.00' : averageSCPerSeaEmperor}`;

        // mobs since last rng
        let carrotKingSinceLastCloverLine = `&8||&r| CK(s) since last Clover: &3${baoWaterSCStats.carrotKingSinceLastClover == null ? 0 : baoWaterSCStats.carrotKingSinceLastClover}`;

        // drops
        let cloverDropsLine = baoWaterSCStats.clover == null ? "&8||&d| &rLucky Clover: &a0" : `&8||&d| &rLucky Clover: &a${baoWaterSCStats.clover}`;
        let flyingFishDropsLine = `&8||&d| &rFlying Fish: &r${baoWaterSCStats.commonFF == null ? 0 : baoWaterSCStats.commonFF}&8|&a${baoWaterSCStats.uncommonFF == null ? 0 : baoWaterSCStats.uncommonFF}&8|&9${baoWaterSCStats.rareFF == null ? 0 : baoWaterSCStats.rareFF}&8|&5${baoWaterSCStats.epicFF == null ? 0 : baoWaterSCStats.epicFF}&8|&6${baoWaterSCStats.legFF == null ? 0 : baoWaterSCStats.legFF}`;
        let guardianDropsLine = `&8||&d| &rGuardian: &r${baoWaterSCStats.commonGD == null ? 0 : baoWaterSCStats.commonGD}&8|&a${baoWaterSCStats.uncommonGD == null ? 0 : baoWaterSCStats.uncommonGD}&8|&9${baoWaterSCStats.rareGD == null ? 0 : baoWaterSCStats.rareGD}&8|&5${baoWaterSCStats.epicGD == null ? 0 : baoWaterSCStats.epicGD}&8|&6${baoWaterSCStats.legGD == null ? 0 : baoWaterSCStats.legGD}`;


        const showHubKills =  Settings.kills_fishingcounter ? [squidLine, seaWalkerLine, seaGuardianLine, seaWitchLine, seaArcherLine, rotdLine, catfishLine, seaLeechLine, guardianDefenderLine, dspLine, agarimooLine, carrotKingLine, waterHydraLine, seaEmpLine, hubSepThin].join('\n') : '';

        const showHubTrackers = Settings.tracker_fishingcounter ? [scSinceCarrotKing, scSinceWaterHydra, scSinceSeaEmperor, hubSepThin].join('\n') : '';

        const showHubAverages = Settings.avgs_fishingcounter ? [avgCarrotKingLine, avgWaterHydraLine, avgSeaEmperorLine, hubSepThin].join('\n') : '';

        const showMobSinceTrackers = Settings.mob_since_fishingcounter ? [carrotKingSinceLastCloverLine, hubSepThin].join('\n') : '';

        const showHubDrops = Settings.drops_fishingcounter ? [cloverDropsLine, flyingFishDropsLine, guardianDropsLine, hubSepThin].join('\n') : '';

        const HUBDisplayRaw = [generalTitle, showHubKills, showHubDrops, showMobSinceTrackers, showHubTrackers, showHubAverages].join('\n').replace(/\n{6,}/g, '\n');
        let HUBDisplayFilter = HUBDisplayRaw.replace(/\n{2,}/g, '\n');
        let phraseArray = HUBDisplayFilter.split('\n');
        let lastIdx = -1;
        for (let i = phraseArray.length - 1; i >= 0; i--) {
            if (phraseArray[i].includes(hubSepThin)) {
                lastIdx = i;
                break;
            }
        }

        if (lastIdx !== -1) {
            phraseArray.splice(lastIdx, 1);
        }
        baoFishStats.HUBDisplay = phraseArray.join('\n');
        baoFishStats.save();
    }
}).setFps(1);

register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (movefishcounter.isOpen()) {
        baoFishStats.x = constrainX(x, 3, fishCounterDraggable);
        baoFishStats.y = constrainY(y, 3, fishCounterDraggable);
    }
    baoFishStats.save();
})
register('renderOverlay', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.fishing_counter) return;
    if (getCurrArea() === 'Crimson Isle') { baoFishStats.overallDisplay = baoFishStats.CIDisplay; baoFishStats.save(); }
    if (getCurrArea() === "Jerry's Workshop") { baoFishStats.overallDisplay = baoFishStats.WIDisplay; baoFishStats.save(); }
    if (getCurrArea() === 'Hub') { baoFishStats.overallDisplay = baoFishStats.HUBDisplay; baoFishStats.save(); }
    Renderer.drawStringWithShadow(baoFishStats.overallDisplay, baoFishStats.x, baoFishStats.y);
    
    renderGuiPosition(movefishcounter, baoFishStats, fishCounterDraggable);
});

////////////////////////////////////////////////////////////////////////////
// SOME NEW SEA CREATURES I GUESS LOL --------------------------------------
////////////////////////////////////////////////////////////////////////////

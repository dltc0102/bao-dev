import Settings from '../settings.js';
import PogObject from 'PogData';

import { getInSkyblock } from '../utils/functions.js'; // sb, area
import { baoUtils } from '../utils/utils.js';
import { filterSeparators } from '../utils/functions.js';
import { getInCI, getInCH } from '../utils/functions.js';
import { registerWhen, timeThis } from '../utils/utils.js';


////////////////////////////////////////////////////////////////////////////////
// SETUP CONSTS
////////////////////////////////////////////////////////////////////////////////
export const baoLavaSCStats = new PogObject("bao-dev", {
    "CIDisplay": '',
    // LAVA SEA CREATURES (CRIMSON ISLE)
    "phlegblastCatches": 0, 
    "magmaSlugCatches": 0, 
    "moogmaCatches": 0, 
    "lavaLeechCatches": 0, 
    "pyroclasticWormCatches": 0, 
    "lavaFlameCatches": 0, 
    "fireEelsCatches": 0, 
    "taurusCatches": 0,
    "thunderCatches": 0, 
    "lordJawbusCatches": 0,
    "vanquisherCatches": 0,

    // crimson mob drops
    "flashBook": 0, 
    "magmaLordFragment": 0, 
    "radioactiveVial": 0,

    // LAVA SEA CREATURES (CRYSTAL HOLLOWS)
    "flamingWormCatches": 0, 
    "lavaBlazeCatches": 0, 
    "lavaPigmanCatches": 0,

    // TOTAL LAVA SEA CREATURE CATCHES
    "totalCrimsonSCCatches": 0, 
    "totalLavaCHSCCatches": 0, 

    // AVERAGE LAVA SEA CATCHES SINCE ...
    // CRIMSON ISLE AVGS
    "catchesSinceThunder": 0, 
    "catchesSinceJawbus": 0, 
    "jawbusSinceLastVial": 0,
    "catchesSinceVanq": 0,

    // CRYSTAL HOLLOWS AVGS
    "catchesSinceFlamingWorm": 0, 
}, '/data/baoLavaSCStats.json');
baoLavaSCStats.autosave(5);


////////////////////////////////////////////////////////////////////////////
// LAVA SEA CREATURES (CRIMSON ISLE) 
///////////////////////////////////////////////////////////////////////////
const lavaSCMessages = [
    /A Vanquisher is spawning nearby!/, 
    /WOAH! A Plhlegblast appeared./, 
    /From beneath the lava appears a Magma Slug./, 
    /You hear a faint Moo from the lava... A moogma appears./, 
    /A small but fearsome Lava Leech emerges./, 
    /You feel the heat raidating as a Pyroclastic Worm surfaces/, 
    /A Lava Flame flies out from beneath the lava./, 
    /A Fire Eel slithers out from the depths./, 
    /Taurus and his steed emerge./, 
    /You hear a massive rumble as Thunder emerges./, 
    /You have angered a legendary creature... Lord Jawbus has arrived./, 
    /A flaming worm surfaces from the depths!/, 
    /A Lava Blaze has surfaced from the depths!/, 
    /A Lava Pigman arose from the depths!/, 
]

lavaSCMessages.forEach(msg => {
    registerWhen('chat', timeThis('registerChat cancel lavaSCMessages', (event) => {
        cancel(event);
    }), () => getInSkyblock() && World.isLoaded()).setCriteria(msg);
})
// vanqs
registerWhen('chat', timeThis('registerChat vanquisher spawned', (event) => {
    baoLavaSCStats.phlegblastCatches += 1;
    baoLavaSCStats.totalCrimsonSCCatches += 1;
    baoLavaSCStats.catchesSinceThunder += 1;
    baoLavaSCStats.catchesSinceJawbus += 1;
    setTimeout(() => { baoLavaSCStats.catchesSinceVanq = 0; }, 250);
}), () => getInCI() && getInSkyblock() && World.isLoaded()).setCriteria('A Vanquisher is spawning nearby!');

// Phlegblast
registerWhen('chat', timeThis('registerChat plhlegblast spawned', (event) => {
    baoLavaSCStats.phlegblastCatches += 1;
    baoLavaSCStats.totalCrimsonSCCatches += 1;
    baoLavaSCStats.catchesSinceThunder += 1;
    baoLavaSCStats.catchesSinceJawbus += 1;
    baoLavaSCStats.catchesSinceVanq += 1;
}), () => getInCI() && getInSkyblock() && World.isLoaded()).setCriteria("WOAH! A Plhlegblast appeared.");


// Magma Slug
registerWhen('chat', timeThis('registerChat magma slug spawned', (event) => {
    baoLavaSCStats.magmaSlugCatches += 1;
    baoLavaSCStats.totalCrimsonSCCatches += 1;
    baoLavaSCStats.catchesSinceThunder += 1;
    baoLavaSCStats.catchesSinceJawbus += 1;
    baoLavaSCStats.catchesSinceVanq += 1;
}), () => getInCI() && getInSkyblock() && World.isLoaded()).setCriteria("From beneath the lava appears a Magma Slug.");


// Moogma
registerWhen('chat', timeThis('registerChat moogma spawned', (event) => {
    baoLavaSCStats.moogmaCatches += 1;
    baoLavaSCStats.totalCrimsonSCCatches += 1;
    baoLavaSCStats.catchesSinceThunder += 1;
    baoLavaSCStats.catchesSinceJawbus += 1;
    baoLavaSCStats.catchesSinceVanq += 1;
}), () => getInCI() && getInSkyblock() && World.isLoaded()).setCriteria("You hear a faint Moo from the lava... A Moogma appears.");

// Lava Leech
registerWhen('chat', timeThis('registerChat lava leech spawned', (event) => {
    baoLavaSCStats.lavaLeechCatches += 1;
    baoLavaSCStats.totalCrimsonSCCatches += 1;
    baoLavaSCStats.catchesSinceThunder += 1;
    baoLavaSCStats.catchesSinceJawbus += 1;
    baoLavaSCStats.catchesSinceVanq += 1;
}), () => getInCI() && getInSkyblock() && World.isLoaded()).setCriteria("A small but fearsome Lava Leech emerges.");

// Pyroclastic Worm
registerWhen('chat', timeThis('registerChat pyroclastic worm spawned', (event) => {
    baoLavaSCStats.pyroclasticWormCatches += 1;
    baoLavaSCStats.totalCrimsonSCCatches += 1;
    baoLavaSCStats.catchesSinceThunder += 1;
    baoLavaSCStats.catchesSinceJawbus += 1;
    baoLavaSCStats.catchesSinceVanq += 1;
}), () => getInCI() && getInSkyblock() && World.isLoaded()).setCriteria("You feel the heat radiating as a Pyroclastic Worm surfaces.");

// Lava Flame
registerWhen('chat', timeThis('registerChat lava flame spawned', (event) => {
    baoLavaSCStats.lavaFlameCatches += 1;
    baoLavaSCStats.totalCrimsonSCCatches += 1;
    baoLavaSCStats.catchesSinceThunder += 1;
    baoLavaSCStats.catchesSinceJawbus += 1;
    baoLavaSCStats.catchesSinceVanq += 1;
}), () => getInCI() && getInSkyblock() && World.isLoaded()).setCriteria("A Lava Flame flies out from beneath the lava.");

// Fire Eels
registerWhen('chat', timeThis('registerChat fire eel spawned', (event) => {
    baoLavaSCStats.fireEelsCatches += 1;
    baoLavaSCStats.totalCrimsonSCCatches += 1;
    baoLavaSCStats.catchesSinceThunder += 1;
    baoLavaSCStats.catchesSinceJawbus += 1;
    baoLavaSCStats.catchesSinceVanq += 1;
}), () => getInCI() && getInSkyblock() && World.isLoaded()).setCriteria("A Fire Eel slithers out from the depths.");

// Taurus
registerWhen('chat', timeThis('registerChat taurus spawned', (event) => {
    baoLavaSCStats.taurusCatches += 1;
    baoLavaSCStats.totalCrimsonSCCatches += 1;
    baoLavaSCStats.catchesSinceThunder += 1;
    baoLavaSCStats.catchesSinceJawbus += 1;
    baoLavaSCStats.catchesSinceVanq += 1;
}), () => getInCI() && getInSkyblock() && World.isLoaded()).setCriteria("Taurus and his steed emerge.");


// Thunder
registerWhen('chat', timeThis('registerChat thunder spawned', (event) => {
    baoLavaSCStats.thunderCatches += 1;
    baoLavaSCStats.totalCrimsonSCCatches += 1;
    baoLavaSCStats.catchesSinceThunder = 0;
    baoLavaSCStats.catchesSinceJawbus += 1;
    baoLavaSCStats.catchesSinceVanq += 1;
}), () => getInCI() && getInSkyblock() && World.isLoaded()).setCriteria("You hear a massive rumble as Thunder emerges.");

// Lord Jawbus
registerWhen('chat', timeThis('registerChat jawbus spawned', (event) => {
    baoLavaSCStats.lordJawbusCatches += 1;
    baoLavaSCStats.totalCrimsonSCCatches += 1;
    baoLavaSCStats.catchesSinceThunder += 1;
    baoLavaSCStats.catchesSinceJawbus = 0;
    baoLavaSCStats.jawbusSinceLastVial += 1;
    baoLavaSCStats.catchesSinceVanq += 1;
}), () => getInCI() && getInSkyblock() && World.isLoaded()).setCriteria("You have angered a legendary creature... Lord Jawbus has arrived.");

// Radioactive Vial [Jawbus]
registerWhen('chat', timeThis('registerChat vial message', (mf, event) => {
    baoLavaSCStats.jawbusSinceLastVial = 0;
}), () => getInCI() && getInSkyblock() && World.isLoaded()).setCriteria("RARE DROP! Radioactive Vial (+${mf}% ✯ Magic Find)");


////////////////////////////////////////////////////////////////////////////
// LAVA SEA CREATURES (CRYSTAL HOLLOWS) ------------------------------------
////////////////////////////////////////////////////////////////////////////
// Flaming Worm
registerWhen('chat', timeThis('registerChat flaming worm spawned', (event) => {
    baoLavaSCStats.flamingWormCatches += 1;
    baoLavaSCStats.totalLavaCHSCCatches += 1;
    baoLavaSCStats.catchesSinceFlamingWorm = 0;
}), () => getInCH() && getInSkyblock() && World.isLoaded()).setCriteria("A flaming worm surfaces from the depths!");

// Lava Blaze
registerWhen('chat', timeThis('registerChat lava blaze spawned', (event) => {
    baoLavaSCStats.lavaBlazeCatches += 1;
    baoLavaSCStats.totalLavaCHSCCatches += 1;
    baoLavaSCStats.catchesSinceFlamingWorm += 1;
}), () => getInCH() && getInSkyblock() && World.isLoaded()).setCriteria("A Lava Blaze has surfaced from the depths!");

// Lava Pigman
registerWhen('chat', timeThis('registerChat lava pigman spawned', (event) => {
    baoLavaSCStats.lavaPigmanCatches += 1;
    baoLavaSCStats.totalLavaCHSCCatches += 1;
    baoLavaSCStats.catchesSinceFlamingWorm += 1;
}), () => getInCH() && getInSkyblock() && World.isLoaded()).setCriteria("A Lava Pigman arose from the depths!");


////////////////////////////////////////////////////////////////
// step 
////////////////////////////////////////////////////////////////
register('step', timeThis("registerStep update CI DisplayText", () => {
    if (!getInSkyblock() || !World.isLoaded() || !getInCI()) return;
    const crimsonSepThick = `&3${baoUtils.thickSep}`;
    const crimsonSepThin = `&3${baoUtils.thinSep}`;

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
    
    baoLavaSCStats.CIDisplay = filterSeparators(CIDisplayRaw, crimsonSepThin);
})).setFps(1);
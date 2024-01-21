import Settings from '../settings.js';
import PogObject from 'PogData';
import { getCurrArea } from '../utils/functions.js'; // sb, area


////////////////////////////////////////////////////////////////////////////////
// SETUP CONSTS
////////////////////////////////////////////////////////////////////////////////
export const baoLavaSCStats = new PogObject("bao-dev", {
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

    // CRYSTAL HOLLOWS AVGS
    "catchesSinceFlamingWorm": 0, 
}, '/data/baoLavaSCStats.json');
baoLavaSCStats.autosave(5);


////////////////////////////////////////////////////////////////////////////
// LAVA SEA CREATURES (CRIMSON ISLE) ---------------------------------------
////////////////////////////////////////////////////////////////////////////
// Phlegblast
register('chat', (event) => {
    if (getCurrArea() !== 'Crimson Isle') return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoLavaSCStats.phlegblastCatches += 1;
    baoLavaSCStats.totalCrimsonSCCatches += 1;
    baoLavaSCStats.catchesSinceThunder += 1;
    baoLavaSCStats.catchesSinceJawbus += 1;
    baoLavaSCStats.save();
}).setCriteria("WOAH! A Plhlegblast appeared.");

// Magma Slug
register('chat', (event) => {
    if (getCurrArea() !== 'Crimson Isle') return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoLavaSCStats.magmaSlugCatches += 1;
    baoLavaSCStats.totalCrimsonSCCatches += 1;
    baoLavaSCStats.catchesSinceThunder += 1;
    baoLavaSCStats.catchesSinceJawbus += 1;
    baoLavaSCStats.save();
}).setCriteria("From beneath the lava appears a Magma Slug.");

// Moogma
register('chat', (event) => {
    if (getCurrArea() !== 'Crimson Isle') return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoLavaSCStats.moogmaCatches += 1;
    baoLavaSCStats.totalCrimsonSCCatches += 1;
    baoLavaSCStats.catchesSinceThunder += 1;
    baoLavaSCStats.catchesSinceJawbus += 1;
    baoLavaSCStats.save();
}).setCriteria("You hear a faint Moo from the lava... A Moogma appears.");

// Lava Leech
register('chat', (event) => {
    if (getCurrArea() !== 'Crimson Isle') return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoLavaSCStats.lavaLeechCatches += 1;
    baoLavaSCStats.totalCrimsonSCCatches += 1;
    baoLavaSCStats.catchesSinceThunder += 1;
    baoLavaSCStats.catchesSinceJawbus += 1;
    baoLavaSCStats.save();
}).setCriteria("A small but fearsome Lava Leech emerges.");

// Pyroclastic Worm
register('chat', (event) => {
    if (getCurrArea() !== 'Crimson Isle') return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoLavaSCStats.pyroclasticWormCatches += 1;
    baoLavaSCStats.totalCrimsonSCCatches += 1;
    baoLavaSCStats.catchesSinceThunder += 1;
    baoLavaSCStats.catchesSinceJawbus += 1;
    baoLavaSCStats.save();
}).setCriteria("You feel the heat radiating as a Pyroclastic Worm surfaces.");

// Lava Flame
register('chat', (event) => {
    if (getCurrArea() !== 'Crimson Isle') return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoLavaSCStats.lavaFlameCatches += 1;
    baoLavaSCStats.totalCrimsonSCCatches += 1;
    baoLavaSCStats.catchesSinceThunder += 1;
    baoLavaSCStats.catchesSinceJawbus += 1;
    baoLavaSCStats.save();
}).setCriteria("A Lava Flame flies out from beneath the lava.");

// Fire Eels
register('chat', (event) => {
    if (getCurrArea() !== 'Crimson Isle') return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoLavaSCStats.fireEelsCatches += 1;
    baoLavaSCStats.totalCrimsonSCCatches += 1;
    baoLavaSCStats.catchesSinceThunder += 1;
    baoLavaSCStats.catchesSinceJawbus += 1;
    baoLavaSCStats.save();
}).setCriteria("A Fire Eel slithers out from the depths.");

// Taurus
register('chat', (event) => {
    if (getCurrArea() !== 'Crimson Isle') return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoLavaSCStats.taurusCatches += 1;
    baoLavaSCStats.totalCrimsonSCCatches += 1;
    baoLavaSCStats.catchesSinceThunder += 1;
    baoLavaSCStats.catchesSinceJawbus += 1;
    baoLavaSCStats.save();
}).setCriteria("Taurus and his steed emerge.");

// Thunder
register('chat', (event) => {
    if (getCurrArea() !== 'Crimson Isle') return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoLavaSCStats.thunderCatches += 1;
    baoLavaSCStats.totalCrimsonSCCatches += 1;
    baoLavaSCStats.catchesSinceThunder = 0;
    baoLavaSCStats.catchesSinceJawbus += 1;
    baoLavaSCStats.save();
}).setCriteria("You hear a massive rumble as Thunder emerges.");

// Lord Jawbus
register('chat', (event) => {
    if (getCurrArea() !== 'Crimson Isle') return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoLavaSCStats.lordJawbusCatches += 1;
    baoLavaSCStats.totalCrimsonSCCatches += 1;
    baoLavaSCStats.catchesSinceThunder += 1;
    baoLavaSCStats.catchesSinceJawbus = 0;
    baoLavaSCStats.jawbusSinceLastVial += 1;
    baoLavaSCStats.save();
}).setCriteria("You have angered a legendary creature... Lord Jawbus has arrived.");

// Radioactive Vial [Jawbus]
register('chat', (mf, event) => {
    if (getCurrArea() !== 'Crimson Isle') return;
    baoLavaSCStats.jawbusSinceLastVial = 0;
    baoLavaSCStats.save();
}).setCriteria("RARE DROP! Radioactive Vial (+${mf}% ✯ Magic Find)")

////////////////////////////////////////////////////////////////////////////
// LAVA SEA CREATURES (CRYSTAL HOLLOWS) ------------------------------------
////////////////////////////////////////////////////////////////////////////
// Flaming Worm
register('chat', (event) => {
    if (getCurrArea() !== 'Crystal Hollows') return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoLavaSCStats.flamingWormCatches += 1;
    baoLavaSCStats.totalLavaCHSCCatches += 1;
    baoLavaSCStats.catchesSinceFlamingWorm = 0;
    baoLavaSCStats.save();
}).setCriteria("A flaming worm surfaces from the depths!");

// Lava Blaze
register('chat', (event) => {
    if (getCurrArea() !== 'Crystal Hollows') return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoLavaSCStats.lavaBlazeCatches += 1;
    baoLavaSCStats.totalLavaCHSCCatches += 1;
    baoLavaSCStats.catchesSinceFlamingWorm += 1;
    baoLavaSCStats.save();
}).setCriteria("A Lava Blaze has surfaced from the depths!");

// Lava Pigman
register('chat', (event) => {
    if (getCurrArea() !== 'Crystal Hollows') return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoLavaSCStats.lavaPigmanCatches += 1;
    baoLavaSCStats.totalLavaCHSCCatches += 1;
    baoLavaSCStats.catchesSinceFlamingWorm += 1;
    baoLavaSCStats.save();
}).setCriteria("A Lava Pigman arose from the depths!");
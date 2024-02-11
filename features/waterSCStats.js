import Settings from '../settings.js';
import PogObject from 'PogData';

import { getInSkyblock } from '../utils/functions.js'; // sb, area
import { baoUtils } from '../utils/utils.js';
import { formatMoney } from '../utils/functions.js';
import { filterSeparators } from '../utils/functions.js';
import { updateCDText } from '../utils/functions.js';
import { filterSeparators } from '../utils/functions.js';
import { getInJerry, getInHub, getInCH, getInDesert } from '../utils/functions.js';

////////////////////////////////////////////////////////////////////////////////
// SETUP CONSTS
////////////////////////////////////////////////////////////////////////////////
// export const baoWaterSCStats = new PogObject("bao-dev", {
export const baoWaterSCStats = {
    "HUBDisplay": '',
    "WIDisplay": '',

    // WATER SEA CREATURES (REGULAR)
    "squidCatches": 0, 
    "seaWalkerCatches": 0, 
    "nightSquidCatches": 0, 
    "seaGuardianCatches": 0, 
    "seaWitchCatches": 0, 
    "seaArcherCatches": 0, 
    "rotdCatches": 0, 
    "catfishCatches": 0, 
    "carrotKingCatches": 0, 
    "seaLeechCatches": 0, 
    "guardianDefenderCatches": 0, 
    "deepSeaProtectorCatches": 0, 
    "waterHydraCatches": 0, 
    "seaEmperorCatches": 0, 
    "agarimooCatches": 0, 

    "clover": 0, 
    "commonFF": 0, 
    "uncommonFF": 0, 
    "rareFF": 0, 
    "epicFF": 0, 
    "legFF": 0,
    "commonGD": 0, 
    "uncommonGD": 0, 
    "rareGD": 0, 
    "epicGD": 0, 
    "legGD": 0,
    "hydraHead": 0,
    "shredder": 0, 

    // WATER SEA CREATURES (OASIS)
    "oasisRabbitCatches": 0, 
    "oasisSheepCatches": 0, 

    // WATER SEA CREATURES (CRYSTAL HOLLOWS)
    "waterWormCatches": 0, 
    "poisonedWaterWormCatches": 0, 
    "abyssalMinerCatches": 0, 

    // WATER SEA CREATURES (SPOOKY FESTIVAL)
    "scarecrowCatches": 0, 
    "nightmareCatches": 0, 
    "werewolfCatches": 0, 
    "phantomFisherCatches": 0, 
    "grimReaperCatches": 0, 
    "DSO": 0, 
    "phantomRod": 0, 
    "soulFragment": 0,

    // WATER SEA CREATURES (WINTER FESTIVAL)
    "frozenSteveCatches": 0, 
    "frostySnowmanCatches": 0, 
    "grinchCatches": 0, 
    "nutcrackerCatches": 0, 
    "yetiCatches": 0, 
    "reindrakeCatches": 0,

    // WATER SEA CREATURES (FISHING FESTIVAL)
    "nurseSharkCatches": 0, 
    "blueSharkCatches": 0, 
    "tigerSharkCatches": 0, 
    "gwSharkCatches": 0,
    "gwSharkToof": 0,

    // TOTAL WATER SEA CREATURE CATCHES
    "totalRegularWaterSCCatches": 0, 
    "totalOasisWaterSCCatches": 0, 
    "totalCHWaterSCCatches": 0, 
    "totalSpookyWaterSCCatches": 0, 
    "totalWinterWaterSCCatches": 0, 
    "totalSharkWaterSCCatches": 0, 


    // AVERAGE WATER SEA CATCHES SINCE ...
    // REGULAR AVGS
    "catchesSinceCarrotKing": 0, 
    "carrotKingSinceLastClover": 0,
    "catchesSinceWaterHydra": 0,
    "catchesSinceSeaEmperor": 0,

    // CRYSTAL HOLLOWS AVGS
    "catchesSinceAbyssalMiner": 0, 

    // SPOOKY FESTIVAL AVGS
    "catchesSincePhantomFisher": 0, 
    "catchesSinceGrimReaper": 0, 

    // WINTER FESTIVAL AVGS
    "catchesSinceYeti": 0, 
    "catchesSinceReindrake": 0, 

    "yetiSinceEpicPet": 0, 
    "yetiSinceLegPet": 0,

    "timeSinceEpicPet": 0,
    "timeSinceLegPet": 0,
    "timeSinceReindrake": 0,
    
    "epicBabyYeti": 0, 
    "legBabyYeti": 0,
    "prosperityBook": 0, 
    "iceRods": 0,

    // FISHING FESTIVAL AVGS
    "catchesSinceGWShark": 0,
};
// }, '/data/baoWaterSCStats.json');
// baoWaterSCStats.autosave(5);


////////////////////////////////////////////////////////////////////////////
// WATER SEA CREATURES (REGULAR) -------------------------------------------
////////////////////////////////////////////////////////////////////////////
// Squid
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.squidCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    // baoWaterSCStats.save();
}).setCriteria('A Squid appeared.');

// Sea Walker
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.seaWalkerCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    // baoWaterSCStats.save();
}).setCriteria('You caught a Sea Walker.');

// Night Squid
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.nightSquidCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    // baoWaterSCStats.save();
}).setCriteria('Pitch darkness reveals a Night Squid.');

// Sea Guardian
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.seaGuardianCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    // baoWaterSCStats.save();
}).setCriteria('You stumbled upon a Sea Guardian.');

// guardian pet drop
register('chat', (event) => {
    const message = ChatLib.getChatMessage(event, true);
    if (message.includes('&rGuardian') || message.includes('&fGuardian')) baoWaterSCStats.commonGD += 1;
    if (message.includes('&aGuardian')) baoWaterSCStats.uncommonGD += 1;
    if (message.includes('&9Guardian')) baoWaterSCStats.rareGD += 1;
    if (message.includes('&5Guardian')) baoWaterSCStats.epicGD += 1;
    if (message.includes('&6Guardian')) baoWaterSCStats.legGD += 1;
    // baoWaterSCStats.save();
}).setCriteria('GREAT CATCH! You found a [Lvl 1] Guardian.')


// Sea Witch
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.seaWitchCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    // baoWaterSCStats.save();
}).setCriteria("It looks like you've disrupted the Sea Witch's brewing session. Watch out, she's furious!");

// Sea Archer
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.seaArcherCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    // baoWaterSCStats.save();
}).setCriteria('You reeled in a Sea Archer.');

// Rider of the Deep
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.rotdCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    // baoWaterSCStats.save();
}).setCriteria('The Rider of the Deep has emerged.');

// Catfish
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.catfishCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    // baoWaterSCStats.save();
}).setCriteria('Huh? A Catfish!');

// Carrot King
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.carrotKingCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing = 0;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.carrotKingSinceLastClover += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    // baoWaterSCStats.save();
}).setCriteria("Is this even a fish? It's the Carrot King!");

// lucky Clovert Core [Carrot King]
register('chat', (mf, event) => {
    baoWaterSCStats.carrotKingSinceLastClover = 0;
    baoWaterSCStats.clover += 1;
    // baoWaterSCStats.save();
}).setCriteria("RARE DROP! Lucky Clover Core (+${mf}% ✯ Magic Find)")


// Sea Leech
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.seaLeechCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    // baoWaterSCStats.save();
}).setCriteria('Gross! A Sea Leech!');
 
// Guardian Defender
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.guardianDefenderCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    // baoWaterSCStats.save();
}).setCriteria("You've discovered a Guardian Defender of the sea.");
 
// Deep Sea Protector
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.deepSeaProtectorCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    // baoWaterSCStats.save();
}).setCriteria('You have awoken the Deep Sea Protector, prepare for a battle!');
 
// Water Hydra
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.waterHydraCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra = 0;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    // baoWaterSCStats.save();
}).setCriteria('The Water Hydra has come to test your strength.');
 
// Sea Emperor
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.seaEmperorCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor = 0;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    // baoWaterSCStats.save();
}).setCriteria('Sea Emperor arises from the depths.');

// Flying Fish Pet [Sea Emperor]
register('chat', (mf, event) => {
    const message = ChatLib.getChatMessage(event, true);
    if (message.includes('&rFlying Fish') || message.includes('&fFlying Fish')) baoWaterSCStats.commonFF += 1;
    if (message.includes('&aFlying Fish')) baoWaterSCStats.uncommonFF += 1;
    if (message.includes('&9Flying Fish')) baoWaterSCStats.rareFF += 1;
    if (message.includes('&5Flying Fish')) baoWaterSCStats.epicFF += 1;
    if (message.includes('&6Flying Fish')) baoWaterSCStats.legFF += 1;
    // baoWaterSCStats.save();
}).setCriteria('PET DROP! Flying Fish (+${mf}% ✯ Magic Find)')


// Agarimoo
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
}).setCriteria("Your Chumcap Bucket trembles, it's an Agarimoo.");

register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
}).setCriteria("The Agarimoo's fumes are damaging you!");

register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.agarimooCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    // baoWaterSCStats.save();
}).setCriteria("Your Chumcap Bucket trembles, it's an Agarimoo.");


////////////////////////////////////////////////////////////////////////////
// WATER SEA CREATURES (OASIS) ---------------------------------------------
////////////////////////////////////////////////////////////////////////////
// Oasis Rabbit
register('chat', (event) => {
    if (!getInDesert()) return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.oasisRabbitCatches += 1;
    baoWaterSCStats.totalOasisWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    // baoWaterSCStats.save();
}).setCriteria("An Oasis Rabbit appears from the water.");

// Oasis Sheep
register('chat', (event) => {
    if (!getInDesert()) return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.oasisSheepCatches += 1;
    baoWaterSCStats.totalOasisWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    // baoWaterSCStats.save();
}).setCriteria("An Oasis Sheep appears from the water.");


////////////////////////////////////////////////////////////////////////////
// WATER SEA CREATURES (CRYSTAL HOLLOWS) -----------------------------------
////////////////////////////////////////////////////////////////////////////
// Water Worm
register('chat', (event) => {
    if (!getInCH()) return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.waterWormCatches += 1;
    baoWaterSCStats.totalCHWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.abyssalMinerCatches += 1;
    // baoWaterSCStats.save();
}).setCriteria("A Water Worm surfaces!");

// Poisoned Water Worm
register('chat', (event) => {
    if (!getInCH()) return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.poisonedWaterWormCatches += 1;
    baoWaterSCStats.totalCHWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.abyssalMinerCatches += 1;
    // baoWaterSCStats.save();
}).setCriteria("A Poisoned Water Worm surfaces!");

// Abyssal Miner
register('chat', (event) => {
    if (!getInCH()) return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.totalCHWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.abyssalMinerCatches = 0;
    // baoWaterSCStats.save();
}).setCriteria("An Abyssal Miner breaks out of the water!");


////////////////////////////////////////////////////////////////////////////
// WATER SEA CREATURES (EVENTS :: SPOOKY FESTIVAL) -------------------------
////////////////////////////////////////////////////////////////////////////
// Scarecrow
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.scarecrowCatches += 1;
    baoWaterSCStats.totalSpookyWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSincePhantomFisher += 1;
    baoWaterSCStats.catchesSinceGrimReaper += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    // baoWaterSCStats.save();
}).setCriteria("Phew! It's only a Scarecrow.");

// Nightmare
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.nightmareCatches += 1;
    data.totalSpookyWaterSCCatches += 1;
    data.catchesSinceCarrotKing += 1;
    data.catchesSinceSeaEmperor += 1;
    data.catchesSinceWaterHydra += 1;
    data.catchesSincePhantomFisher += 1;
    data.catchesSinceGrimReaper += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    // baoWaterSCStats.save();
}).setCriteria("You hear trotting from beneath the waves, you caught a Nightmare.");

// Werewolf
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.werewolfCatches += 1;
    data.totalSpookyWaterSCCatches += 1;
    data.catchesSinceCarrotKing += 1;
    data.catchesSinceSeaEmperor += 1;
    data.catchesSinceWaterHydra += 1;
    data.catchesSincePhantomFisher += 1;
    data.catchesSinceGrimReaper += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    // baoWaterSCStats.save();
}).setCriteria("It must be a full moon, a Werewolf appears.");

// Phantom Fisher
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.phantomFisherCatches += 1;
    baoWaterSCStats.totalSpookyWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSincePhantomFisher = 0;
    baoWaterSCStats.catchesSinceGrimReaper += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    // baoWaterSCStats.save();
}).setCriteria("The spirit of a long lost Phantom Fisherman has come to haunt you.");

// Grim Reaper
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.grimReaperCatches += 1;
    baoWaterSCStats.totalSpookyWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSincePhantomFisher += 1;
    baoWaterSCStats.catchesSinceGrimReaper = 0;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    // baoWaterSCStats.save();
}).setCriteria("This can't be! The manifestation of death himself!");


////////////////////////////////////////////////////////////////////////////
// WATER SEA CREATURES (EVENTS :: WINTER FESTIVAL) -------------------------
////////////////////////////////////////////////////////////////////////////
// Frozen Steve
register('chat', (event) => {
    if (!getInJerry()) return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.frozenSteveCatches += 1;
    baoWaterSCStats.totalWinterWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSinceYeti += 1;
    baoWaterSCStats.catchesSinceReindrake += 1;
    // baoWaterSCStats.save();
}).setCriteria("Frozen Steve fell into the pond long ago, never to resurface...until now!");

// Frosty the Snowman
register('chat', (event) => {
    if (!getInJerry()) return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.frostySnowmanCatches += 1;
    baoWaterSCStats.totalWinterWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSinceYeti += 1;
    baoWaterSCStats.catchesSinceReindrake += 1;
    // baoWaterSCStats.save();
}).setCriteria("It's a snowman! He looks harmless.").setContains();

// Grinch
register('chat', (event) => {
    if (!getInJerry()) return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.grinchCatches += 1;
    baoWaterSCStats.totalWinterWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSinceYeti += 1;
    baoWaterSCStats.catchesSinceReindrake += 1;
    // baoWaterSCStats.save();
}).setCriteria("The Grinch stole Jerry's Gifts...get them back!");

// Yeti
register('chat', (event) => {
    if (!getInJerry()) return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.yetiCatches += 1;
    baoWaterSCStats.totalWinterWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSinceReindrake += 1;
    baoWaterSCStats.yetiSinceEpicPet += 1;
    baoWaterSCStats.yetiSinceLegPet += 1;
    setTimeout(() => {
        baoWaterSCStats.catchesSinceYeti = 0;
    }, 500);
    // baoWaterSCStats.save();
}).setCriteria("What is this creature!?");

// Baby Yeti Pet [Yeti]
register('chat', (mf, event) => {
    if (!getInJerry()) return;
    const message = ChatLib.getChatMessage(event, true);
    if (message.includes('&5Baby Yeti')) {
        baoWaterSCStats.epicBabyYeti += 1;
        baoWaterSCStats.yetiSinceEpicPet = 0;
        baoWaterSCStats.timeSinceEpicPet = 0;
    }
    if (message.includes('&6Baby Yeti')) {
        baoWaterSCStats.legBabyYeti += 1;
        baoWaterSCStats.yetiSinceLegPet = 0;
        baoWaterSCStats.timeSinceLegPet = 0;
    }
    // baoWaterSCStats.save();
}).setCriteria('PET DROP! Baby Yeti (+${mf}% ✯ Magic Find)')


// Nutcracker
register('chat', (event) => {
    if (!getInJerry()) return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.nutcrackerCatches += 1;
    baoWaterSCStats.totalWinterWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSinceYeti += 1;
    baoWaterSCStats.catchesSinceReindrake += 1;
    // baoWaterSCStats.save();
}).setCriteria("You found a forgotten Nutcracker laying beneath the ice.");

// Reindrake
register('chat', (event) => {
    if (!getInJerry()) return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.reindrakeCatches += 1;
    baoWaterSCStats.totalWinterWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSinceYeti += 1;
    baoWaterSCStats.timeSinceReindrake = 0;
    baoWaterSCStats.prosperityBook += 1;
    setTimeout(() => {
        baoWaterSCStats.catchesSinceReindrake = 0;
    }, 500);
    // baoWaterSCStats.save();
}).setCriteria("A Reindrake forms from the depths.");

register('chat', (event) => {
    if (!getInJerry()) return;
    if (Settings.hide_sc_msgs) cancel(event);
}).setCriteria('WOAH! A Reindrake was summoned from the depths!');

// ice rods
register('chat', (event) => {
    if (!getInJerry()) return;
    baoWaterSCStats.iceRods += 1;
    // baoWaterSCStats.save();
}).setCriteria('You sold Ice Rod x1 for 20,000 Coins!');

////////////////////////////////////////////////////////////////////////////
// WATER SEA CREATURES (EVENTS :: FISHING FESTIVAL) ------------------------
////////////////////////////////////////////////////////////////////////////
// Nurse Shark
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.nurseSharkCatches += 1;
    baoWaterSCStats.totalSharkWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSinceGWShark += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    // baoWaterSCStats.save();
}).setCriteria("A tiny fin emerges from the water, you've caught a Nurse Shark.");

// Blue Shark
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.blueSharkCatches += 1;
    baoWaterSCStats.totalSharkWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSinceGWShark += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    // baoWaterSCStats.save();
}).setCriteria("You spot a fin as blue as the water it came from, it's a Blue Shark.");

// Tiger Shark
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.tigerSharkCatches += 1;
    baoWaterSCStats.totalSharkWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSinceGWShark += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    // baoWaterSCStats.save();
}).setCriteria("A striped beast bounds from the depths, the wild Tiger Shark!");

// Great White Shark
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.gwSharkCatches += 1;
    baoWaterSCStats.totalSharkWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSinceGWShark = 0;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    // baoWaterSCStats.save();
}).setCriteria("Hide no longer, a Great White Shark has tracked your scent and thirsts for your blood!");

// reg steps 
register('step', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    const hubSepThick = `&5${baoUtils.thickSep}`;
    const hubSepThin = `&5${baoUtils.thinSep}`;

    const winterSepThick = `&7${baoUtils.thickSep}`;
    const winterSepThin = `&7${baoUtils.thinSep}`;


    if (getInHub()) {
        const generalTitle = Settings.kills_fishingcounter || Settings.mob_since_fishingcounter || Settings.drops_fishingcounter || Settings.tracker_fishingcounter || Settings.avgs_fishingcounter ? `&r  <--]|| &fGENERAL &r||[-->\n${hubSepThick}` : '';

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
        
        
        const showHubKills = Settings.kills_fishingcounter ? [squidLine, seaWalkerLine, seaGuardianLine, seaWitchLine, seaArcherLine, rotdLine, catfishLine, seaLeechLine, guardianDefenderLine, dspLine, agarimooLine, carrotKingLine, waterHydraLine, seaEmpLine, hubSepThin].join('\n') : '';
        
        const showHubDrops = Settings.drops_fishingcounter ? [cloverDropsLine, flyingFishDropsLine, guardianDropsLine, hubSepThin].join('\n') : '';

        const showMobSinceTrackers = Settings.mob_since_fishingcounter ? [carrotKingSinceLastCloverLine, hubSepThin].join('\n') : '';

        const showHubTrackers = Settings.tracker_fishingcounter ? [scSinceCarrotKing, scSinceWaterHydra, scSinceSeaEmperor, hubSepThin].join('\n') : '';
        
        const showHubAverages = Settings.avgs_fishingcounter ? [avgCarrotKingLine, avgWaterHydraLine, avgSeaEmperorLine, hubSepThin].join('\n') : '';
        

        const HubDisplayRaw = [generalTitle, showHubKills, showHubDrops, showMobSinceTrackers, showHubTrackers, showHubAverages].join('\n').replace(/\n{6,}/g, '\n');

        baoWaterSCStats.HUBDisplay = filterSeparators(HubDisplayRaw, hubSepThin)
        // baoWaterSCStats.save();
    }
    if (getInJerry()) {
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
        let timeSinceEpicPetLine = updateCDText('', '&9|&3|&b| &rTime Since Epic Pet', baoWaterSCStats.timeSinceEpicPet);
        let timeSinceLegPetLine = updateCDText('', '&9|&3|&b| &rTime Since Leg Pet', baoWaterSCStats.timeSinceLegPet);
        let timeSinceReinLine = updateCDText('', '&9|&3|&b| &rTime Since Reindrake', baoWaterSCStats.timeSinceReindrake);
    
        
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

        baoWaterSCStats.WIDisplay = filterSeparators(WIDisplayRaw, winterSepThin);
        // baoWaterSCStats.save();
    }
    // baoWaterSCStats.save();
}).setFps(1);
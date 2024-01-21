import Settings from '../settings.js';
import PogObject from 'PogData';
import { getCurrArea } from '../utils/functions.js'; // sb, area


////////////////////////////////////////////////////////////////////////////////
// SETUP CONSTS
////////////////////////////////////////////////////////////////////////////////
export const baoWaterSCStats = new PogObject("bao-dev", {
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
}, '/data/baoWaterSCStats.json');
baoWaterSCStats.autosave(5);


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
    
    if (getCurrArea() === "Jerry's Workshop") {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    baoWaterSCStats.save();
}).setCriteria('A Squid appeared.');

// Sea Walker
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.seaWalkerCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getCurrArea() === "Jerry's Workshop") {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    baoWaterSCStats.save();
}).setCriteria('You caught a Sea Walker.');

// Night Squid
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.nightSquidCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getCurrArea() === "Jerry's Workshop") {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    baoWaterSCStats.save();
}).setCriteria('Pitch darkness reveals a Night Squid.');

// Sea Guardian
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.seaGuardianCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getCurrArea() === "Jerry's Workshop") {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    baoWaterSCStats.save();
}).setCriteria('You stumbled upon a Sea Guardian.');

// guardian pet drop
register('chat', (event) => {
    const message = ChatLib.getChatMessage(event, true);
    if (message.includes('&rGuardian') || message.includes('&fGuardian')) baoWaterSCStats.commonGD += 1;
    if (message.includes('&aGuardian')) baoWaterSCStats.uncommonGD += 1;
    if (message.includes('&9Guardian')) baoWaterSCStats.rareGD += 1;
    if (message.includes('&5Guardian')) baoWaterSCStats.epicGD += 1;
    if (message.includes('&6Guardian')) baoWaterSCStats.legGD += 1;
    baoWaterSCStats.save();
}).setCriteria('GREAT CATCH! You found a [Lvl 1] Guardian.')


// Sea Witch
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.seaWitchCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getCurrArea() === "Jerry's Workshop") {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    baoWaterSCStats.save();
}).setCriteria("It looks like you've disrupted the Sea Witch's brewing session. Watch out, she's furious!");

// Sea Archer
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.seaArcherCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getCurrArea() === "Jerry's Workshop") {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    baoWaterSCStats.save();
}).setCriteria('You reeled in a Sea Archer.');

// Rider of the Deep
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.rotdCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getCurrArea() === "Jerry's Workshop") {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    baoWaterSCStats.save();
}).setCriteria('The Rider of the Deep has emerged.');

// Catfish
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.catfishCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getCurrArea() === "Jerry's Workshop") {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    baoWaterSCStats.save();
}).setCriteria('Huh? A Catfish!');

// Carrot King
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.carrotKingCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing = 0;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.carrotKingSinceLastClover += 1;
    if (getCurrArea() === "Jerry's Workshop") {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    baoWaterSCStats.save();
}).setCriteria("Is this even a fish? It's the Carrot King!");

// lucky Clovert Core [Carrot King]
register('chat', (mf, event) => {
    baoWaterSCStats.carrotKingSinceLastClover = 0;
    baoWaterSCStats.clover += 1;
    baoWaterSCStats.save();
}).setCriteria("RARE DROP! Lucky Clover Core (+${mf}% ✯ Magic Find)")


// Sea Leech
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.seaLeechCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getCurrArea() === "Jerry's Workshop") {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    baoWaterSCStats.save();
}).setCriteria('Gross! A Sea Leech!');
 
// Guardian Defender
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.guardianDefenderCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getCurrArea() === "Jerry's Workshop") {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    baoWaterSCStats.save();
}).setCriteria("You've discovered a Guardian Defender of the sea.");
 
// Deep Sea Protector
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.deepSeaProtectorCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getCurrArea() === "Jerry's Workshop") {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    baoWaterSCStats.save();
}).setCriteria('You have awoken the Deep Sea Protector, prepare for a battle!');
 
// Water Hydra
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.waterHydraCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra = 0;
    if (getCurrArea() === "Jerry's Workshop") {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    baoWaterSCStats.save();
}).setCriteria('The Water Hydra has come to test your strength.');
 
// Sea Emperor
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.seaEmperorCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor = 0;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getCurrArea() === "Jerry's Workshop") {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    baoWaterSCStats.save();
}).setCriteria('Sea Emperor arises from the depths.');

// Flying Fish Pet [Sea Emperor]
register('chat', (mf, event) => {
    const message = ChatLib.getChatMessage(event, true);
    if (message.includes('&rFlying Fish') || message.includes('&fFlying Fish')) baoWaterSCStats.commonFF += 1;
    if (message.includes('&aFlying Fish')) baoWaterSCStats.uncommonFF += 1;
    if (message.includes('&9Flying Fish')) baoWaterSCStats.rareFF += 1;
    if (message.includes('&5Flying Fish')) baoWaterSCStats.epicFF += 1;
    if (message.includes('&6Flying Fish')) baoWaterSCStats.legFF += 1;
    baoWaterSCStats.save();
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
    if (getCurrArea() === "Jerry's Workshop") {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    baoWaterSCStats.save();
}).setCriteria("Your Chumcap Bucket trembles, it's an Agarimoo.");


////////////////////////////////////////////////////////////////////////////
// WATER SEA CREATURES (OASIS) ---------------------------------------------
////////////////////////////////////////////////////////////////////////////
// Oasis Rabbit
register('chat', (event) => {
    if (getCurrArea() !== 'The Farming Islands') return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.oasisRabbitCatches += 1;
    baoWaterSCStats.totalOasisWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.save();
}).setCriteria("An Oasis Rabbit appears from the water.");

// Oasis Sheep
register('chat', (event) => {
    if (getCurrArea() !== 'The Farming Islands') return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.oasisSheepCatches += 1;
    baoWaterSCStats.totalOasisWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.save();
}).setCriteria("An Oasis Sheep appears from the water.");


////////////////////////////////////////////////////////////////////////////
// WATER SEA CREATURES (CRYSTAL HOLLOWS) -----------------------------------
////////////////////////////////////////////////////////////////////////////
// Water Worm
register('chat', (event) => {
    if (getCurrArea() !== 'Crystal Hollows') return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.waterWormCatches += 1;
    baoWaterSCStats.totalCHWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.abyssalMinerCatches += 1;
    baoWaterSCStats.save();
}).setCriteria("A Water Worm surfaces!");

// Poisoned Water Worm
register('chat', (event) => {
    if (getCurrArea() !== 'Crystal Hollows') return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.poisonedWaterWormCatches += 1;
    baoWaterSCStats.totalCHWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.abyssalMinerCatches += 1;
    baoWaterSCStats.save();
}).setCriteria("A Poisoned Water Worm surfaces!");

// Abyssal Miner
register('chat', (event) => {
    if (getCurrArea() !== 'Crystal Hollows') return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.totalCHWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.abyssalMinerCatches = 0;
    baoWaterSCStats.save();
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
    if (getCurrArea() === "Jerry's Workshop") {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    baoWaterSCStats.save();
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
    if (getCurrArea() === "Jerry's Workshop") {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    baoWaterSCStats.save();
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
    if (getCurrArea() === "Jerry's Workshop") {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    baoWaterSCStats.save();
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
    if (getCurrArea() === "Jerry's Workshop") {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    baoWaterSCStats.save();
}).setCriteria("The spirit of a long lost Phantom Fisherman has come to haunt you.");

// Grim Reaper
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    datawaterSC.grimReaperCatches += 1;
    baoWaterSCStats.totalSpookyWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSincePhantomFisher += 1;
    baoWaterSCStats.catchesSinceGrimReaper = 0;
    if (getCurrArea() === "Jerry's Workshop") {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    baoWaterSCStats.save();
}).setCriteria("This can't be! The manifestation of death himself!");


////////////////////////////////////////////////////////////////////////////
// WATER SEA CREATURES (EVENTS :: WINTER FESTIVAL) -------------------------
////////////////////////////////////////////////////////////////////////////
// Frozen Steve
register('chat', (event) => {
    if (getCurrArea() !== "Jerry's Workshop") return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.frozenSteveCatches += 1;
    baoWaterSCStats.totalWinterWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSinceYeti += 1;
    baoWaterSCStats.catchesSinceReindrake += 1;
    baoWaterSCStats.save();
}).setCriteria("Frozen Steve fell into the pond long ago, never to resurface...until now!");

// Frosty the Snowman
register('chat', (event) => {
    if (getCurrArea() !== "Jerry's Workshop") return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.frostySnowmanCatches += 1;
    baoWaterSCStats.totalWinterWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSinceYeti += 1;
    baoWaterSCStats.catchesSinceReindrake += 1;
    baoWaterSCStats.save();
}).setCriteria("It's a snowman! He looks harmless.").setContains();

// Grinch
register('chat', (event) => {
    if (getCurrArea() !== "Jerry's Workshop") return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.grinchCatches += 1;
    baoWaterSCStats.totalWinterWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSinceYeti += 1;
    baoWaterSCStats.catchesSinceReindrake += 1;
    baoWaterSCStats.save();
}).setCriteria("The Grinch stole Jerry's Gifts...get them back!");

// Yeti
register('chat', (event) => {
    if (getCurrArea() !== "Jerry's Workshop") return;
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
    baoWaterSCStats.save();
}).setCriteria("What is this creature!?");

// Baby Yeti Pet [Yeti]
register('chat', (mf, event) => {
    if (getCurrArea() !== "Jerry's Workshop") return;
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
    baoWaterSCStats.save();
}).setCriteria('PET DROP! Baby Yeti (+${mf}% ✯ Magic Find)')


// Nutcracker
register('chat', (event) => {
    if (getCurrArea() !== "Jerry's Workshop") return;
    if (Settings.hide_sc_msgs) cancel(event);
    baoWaterSCStats.nutcrackerCatches += 1;
    baoWaterSCStats.totalWinterWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSinceYeti += 1;
    baoWaterSCStats.catchesSinceReindrake += 1;
    baoWaterSCStats.save();
}).setCriteria("You found a forgotten Nutcracker laying beneath the ice.");

// Reindrake
register('chat', (event) => {
    if (getCurrArea() !== "Jerry's Workshop") return;
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
    baoWaterSCStats.save();
}).setCriteria("A Reindrake forms from the depths.");

// ice rods
register('chat', (event) => {
    if (getCurrArea() !== "Jerry's Workshop") return;
    baoWaterSCStats.iceRods += 1;
    baoWaterSCStats.save();
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
    if (getCurrArea() === "Jerry's Workshop") {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    baoWaterSCStats.save();
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
    if (getCurrArea() === "Jerry's Workshop") {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    baoWaterSCStats.save();
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
    if (getCurrArea() === "Jerry's Workshop") {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    baoWaterSCStats.save();
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
    if (getCurrArea() === "Jerry's Workshop") {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
    baoWaterSCStats.save();
}).setCriteria("Hide no longer, a Great White Shark has tracked your scent and thirsts for your blood!");


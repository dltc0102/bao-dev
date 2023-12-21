import settings from '../settings.js';
import Settings from '../settings.js';
import Audio from '../utils/audio.js';
import { data } from '../utils/data.js';
import { getTabArea, updateCDText, formatMoney } from '../utils/functions.js';
import { createGuiCommand, renderGuiPosition } from '../utils/functions.js';
/// HIDE SCC MESSAGES ON THIS FILE ONLY


// const fStats = new Audio();

////////////////////////////////////////////////////////////////////////////
// STATISTICAL FISHING EXP RATES TRACKER -----------------------------------
////////////////////////////////////////////////////////////////////////////
// expertise x on held rod
// experties: grants +2 to 20 fishing wisdom
// quantum 5 on necklace if day is a weekend. +1.2 to 2 fishing wisdom
// bobbin time increases +0.48 - 0.8% of fishing wisdom per fishing bobber within 30 blocks, up to 10 bobbers.
// check accessory bag
    // Future Calories Talisman: 1 fishing wisdom
    // Agarimoo Ring: 1 fishing wisdom
    // Agarimoo Artifact: 1 fishing wisdom
    // Chumming Talisman: 1 fishing wisdom
    // Lighter Blue™ Abicase: 1.5 fishing wisdom
// attributes on fishing armor: grants +0.5 to 5 fishing wisdom
// booster cookie (check tab): +25 fishing wisdom
// god pot (check tab) / fishing exp boost potion in effects: +5 to +20 fishing wisdom
// marina mayor


////////////////////////////////////////////////////////////////////////////
// DISPLAY FOR STATISTICAL FS, SCC, MF -------------------------------------
////////////////////////////////////////////////////////////////////////////
let playerFS = 0;
let playerSCC = 0;
let playerMF = 0;

// Fishing Speed

// RODS
// rod of the sea = +110 fs
// auger rod = +110 fs
// giant rod = +20 fs
// magma rod = +40 fs
// inferno rod = +60 fs
// hellfire rod = +75 fs

// PETS
// ammonite pet: boost = (mining lvl + fishing lvl) * (ammonite level boost)
    // if ammonite is lvl 1 +0.05 xp
    // if ammonite is lvl 100 +0.5 xp

// dolphin pet:  Grants +7-10 fs for each player within 30 blocks, up to 5 players
// flying fish pet: Grants +60-80 SkyBlock icons fishing speed.pngFishing Speed
// reindeer pet: Base Stat - +25 fs
//  Infused - Gives +75 fs while on Jerry's Workshop

// BAITS
// fish bait: +45 fs
// spooky bait: +25 fs
// whale bait: +30 fs

// EQ
// ichthyic belt: 4
// finwave belt: 8 
// gillsplash belt: 12

// ichthyic gloves: 4
// finwave gloves: 8
// gillsplash gloves: 12

// ichthyic cloak: 4
// finwave cloak: 8 
// gillsplash cloak: 12

// luminous bracelet: 1




// Fishing QOL:
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.hide_blessing_messages) return;
    cancel(event);
}).setCriteria('Your Blessing enchant got you double drops!');

////////////////////////////////////////////////////////////////////////////
// LAVA SEA CREATURE SPECIAL MESSAGES --------------------------------------
////////////////////////////////////////////////////////////////////////////
let dhSessionStats = 0;
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    dhSessionStats += 1;
    data.dhTotalStats += 1;
}).setCriteria("It's a Double Hook!");

register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    dhSessionStats += 1;
    data.dhTotalStats += 1;
}).setCriteria("It's a Double Hook! Woot Woot!");

////////////////////////////////////////////////////////////////////////////
// WATER SEA CREATURES (REGULAR) -------------------------------------------
////////////////////////////////////////////////////////////////////////////
// Squid

register('command', () => {
    boolText = false;
    if (Settings.hide_sc_msgs) boolText = true;
    ChatLib.chat(boolText)
}).setName('scctoggle');


register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.squidCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    
    if (data.currArea === "Jerry's Workshop") {
        data.waterSC.catchesSinceYeti += 1;
        data.waterSC.catchesSinceReindrake += 1;
        data.waterSC.totalWinterWaterSCCatches += 1;
    }

}).setCriteria('A Squid appeared.');

// Sea Walker
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.seaWalkerCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    if (data.currArea === "Jerry's Workshop") {
        data.waterSC.catchesSinceYeti += 1;
        data.waterSC.catchesSinceReindrake += 1;
        data.waterSC.totalWinterWaterSCCatches += 1;
    }
}).setCriteria('You caught a Sea Walker.');

// Night Squid
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.nightSquidCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    if (data.currArea === "Jerry's Workshop") {
        data.waterSC.catchesSinceYeti += 1;
        data.waterSC.catchesSinceReindrake += 1;
        data.waterSC.totalWinterWaterSCCatches += 1;
    }
}).setCriteria('Pitch darkness reveals a Night Squid.');

// Sea Guardian
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.seaGuardianCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    if (data.currArea === "Jerry's Workshop") {
        data.waterSC.catchesSinceYeti += 1;
        data.waterSC.catchesSinceReindrake += 1;
        data.waterSC.totalWinterWaterSCCatches += 1;
    }
}).setCriteria('You stumbled upon a Sea Guardian.');

// guardian pet drop
register('chat', (event) => {
    const message = ChatLib.getChatMessage(event, true);
    if (message.includes('&rGuardian') || message.includes('&fGuardian')) data.waterSC.commonGD += 1;
    if (message.includes('&aGuardian')) data.waterSC.uncommonGD += 1;
    if (message.includes('&9Guardian')) data.waterSC.rareGD += 1;
    if (message.includes('&5Guardian')) data.waterSC.epicGD += 1;
    if (message.includes('&6Guardian')) data.waterSC.legGD += 1;
}).setCriteria('GREAT CATCH! You found a [Lvl 1] Guardian.')


// Sea Witch
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.seaWitchCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    if (data.currArea === "Jerry's Workshop") {
        data.waterSC.catchesSinceYeti += 1;
        data.waterSC.catchesSinceReindrake += 1;
        data.waterSC.totalWinterWaterSCCatches += 1;
    }
}).setCriteria("It looks like you've disrupted the Sea Witch's brewing session. Watch out, she's furious!");

// Sea Archer
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.seaArcherCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    if (data.currArea === "Jerry's Workshop") {
        data.waterSC.catchesSinceYeti += 1;
        data.waterSC.catchesSinceReindrake += 1;
        data.waterSC.totalWinterWaterSCCatches += 1;
    }
}).setCriteria('You reeled in a Sea Archer.');

// Rider of the Deep
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.rotdCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    if (data.currArea === "Jerry's Workshop") {
        data.waterSC.catchesSinceYeti += 1;
        data.waterSC.catchesSinceReindrake += 1;
        data.waterSC.totalWinterWaterSCCatches += 1;
    }
}).setCriteria('The Rider of the Deep has emerged.');

// Catfish
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.catfishCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    if (data.currArea === "Jerry's Workshop") {
        data.waterSC.catchesSinceYeti += 1;
        data.waterSC.catchesSinceReindrake += 1;
        data.waterSC.totalWinterWaterSCCatches += 1;
    }
}).setCriteria('Huh? A Catfish!');

// Carrot King
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.carrotKingCatches += 1;
    data.waterSC.catchesSinceCarrotKing = 0;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    if (data.currArea === "Jerry's Workshop") {
        data.waterSC.catchesSinceYeti += 1;
        data.waterSC.catchesSinceReindrake += 1;
        data.waterSC.totalWinterWaterSCCatches += 1;
    }
    data.waterSC.carrotKingSinceLastClover += 1;
}).setCriteria("Is this even a fish? It's the Carrot King!");

// lucky Clovert Core [Carrot King]
register('chat', (mf, event) => {
    data.waterSC.carrotKingSinceLastClover = 0;
    data.waterSC.clover += 1;
}).setCriteria("RARE DROP! Lucky Clover Core (+${mf}% ✯ Magic Find)")


// Sea Leech
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.seaLeechCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    if (data.currArea === "Jerry's Workshop") {
        data.waterSC.catchesSinceYeti += 1;
        data.waterSC.catchesSinceReindrake += 1;
        data.waterSC.totalWinterWaterSCCatches += 1;
    }
}).setCriteria('Gross! A Sea Leech!');
 
// Guardian Defender
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.guardianDefenderCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    if (data.currArea === "Jerry's Workshop") {
        data.waterSC.catchesSinceYeti += 1;
        data.waterSC.catchesSinceReindrake += 1;
        data.waterSC.totalWinterWaterSCCatches += 1;
    }
}).setCriteria("You've discovered a Guardian Defender of the sea.");
 
// Deep Sea Protector
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.deepSeaProtectorCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    if (data.currArea === "Jerry's Workshop") {
        data.waterSC.catchesSinceYeti += 1;
        data.waterSC.catchesSinceReindrake += 1;
        data.waterSC.totalWinterWaterSCCatches += 1;
    }
}).setCriteria('You have awoken the Deep Sea Protector, prepare for a battle!');
 
// Water Hydra
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.waterHydraCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra = 0;
    if (data.currArea === "Jerry's Workshop") {
        data.waterSC.catchesSinceYeti += 1;
        data.waterSC.catchesSinceReindrake += 1;
        data.waterSC.totalWinterWaterSCCatches += 1;
    }
}).setCriteria('The Water Hydra has come to test your strength.');
 
// Sea Emperor
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.seaEmperorCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor = 0;
    data.waterSC.catchesSinceWaterHydra += 1;
    if (data.currArea === "Jerry's Workshop") {
        data.waterSC.catchesSinceYeti += 1;
        data.waterSC.catchesSinceReindrake += 1;
        data.waterSC.totalWinterWaterSCCatches += 1;
    }
}).setCriteria('Sea Emperor arises from the depths.');

// Flying Fish Pet [Sea Emperor]
register('chat', (mf, event) => {
    const message = ChatLib.getChatMessage(event, true);
    if (message.includes('&rFlying Fish') || message.includes('&fFlying Fish')) data.waterSC.commonFF += 1;
    if (message.includes('&aFlying Fish')) data.waterSC.uncommonFF += 1;
    if (message.includes('&9Flying Fish')) data.waterSC.rareFF += 1;
    if (message.includes('&5Flying Fish')) data.waterSC.epicFF += 1;
    if (message.includes('&6Flying Fish')) data.waterSC.legFF += 1;
}).setCriteria('PET DROP! Flying Fish (+${mf}% ✯ Magic Find)')


// Agarimoo
register('chat', (event) => {
    cancel(event);
}).setCriteria("Your Chumcap Bucket trembles, it's an Agarimoo.");

register('chat', (event) => {
    cancel(event);
}).setCriteria("The Agarimoo's fumes are damaging you!");

register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.agarimooCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    if (data.currArea === "Jerry's Workshop") {
        data.waterSC.catchesSinceYeti += 1;
        data.waterSC.catchesSinceReindrake += 1;
        data.waterSC.totalWinterWaterSCCatches += 1;
    }
}).setCriteria("Your Chumcap Bucket trembles, it's an Agarimoo.");


////////////////////////////////////////////////////////////////////////////
// WATER SEA CREATURES (OASIS) ---------------------------------------------
////////////////////////////////////////////////////////////////////////////
// Oasis Rabbit
register('chat', (event) => {
    if (data.currArea !== 'The Farming Islands') return;
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.oasisRabbitCatches += 1;
    data.waterSC.totalOasisWaterSCCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
}).setCriteria("An Oasis Rabbit appears from the water.");

// Oasis Sheep
register('chat', (event) => {
    if (data.currArea !== 'The Farming Islands') return;
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.oasisSheepCatches += 1;
    data.waterSC.totalOasisWaterSCCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
}).setCriteria("An Oasis Sheep appears from the water.");


////////////////////////////////////////////////////////////////////////////
// WATER SEA CREATURES (CRYSTAL HOLLOWS) -----------------------------------
////////////////////////////////////////////////////////////////////////////
// Water Worm
register('chat', (event) => {
    if (data.currArea !== 'Crystal Hollows') return;
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.waterWormCatches += 1;
    data.waterSC.totalCHWaterSCCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    data.waterSC.catchesSinceZombieMiner += 1;
}).setCriteria("A Water Worm surfaces!");

// Poisoned Water Worm
register('chat', (event) => {
    if (data.currArea !== 'Crystal Hollows') return;
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.poisonedWaterWormCatches += 1;
    data.waterSC.totalCHWaterSCCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    data.waterSC.catchesSinceZombieMiner += 1;
}).setCriteria("A Poisoned Water Worm surfaces!");

// Zombie Miner
register('chat', (event) => {
    if (data.currArea !== 'Crystal Hollows') return;
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.zombieMinerCatches += 1;
    data.waterSC.totalCHWaterSCCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    data.waterSC.catchesSinceZombieMiner = 0;
}).setCriteria("A Zombie Miner surfaces!");


////////////////////////////////////////////////////////////////////////////
// WATER SEA CREATURES (EVENTS :: SPOOKY FESTIVAL) -------------------------
////////////////////////////////////////////////////////////////////////////
// Scarecrow
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.scarecrowCatches += 1;
    data.waterSC.totalSpookyWaterSCCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    data.waterSC.catchesSincePhantomFisher += 1;
    data.waterSC.catchesSinceGrimReaper += 1;
    if (data.currArea === "Jerry's Workshop") {
        data.waterSC.catchesSinceYeti += 1;
        data.waterSC.catchesSinceReindrake += 1;
        data.waterSC.totalWinterWaterSCCatches += 1;
    }
}).setCriteria("Phew! It's only a Scarecrow.");

// Nightmare
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.nightmareCatches += 1;
    data.totalSpookyWaterSCCatches += 1;
    data.catchesSinceCarrotKing += 1;
    data.catchesSinceSeaEmperor += 1;
    data.catchesSinceWaterHydra += 1;
    data.catchesSincePhantomFisher += 1;
    data.catchesSinceGrimReaper += 1;
    if (data.currArea === "Jerry's Workshop") {
        data.waterSC.catchesSinceYeti += 1;
        data.waterSC.catchesSinceReindrake += 1;
        data.waterSC.totalWinterWaterSCCatches += 1;
    }
}).setCriteria("You hear trotting from beneath the waves, you caught a Nightmare.");

// Werewolf
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.werewolfCatches += 1;
    data.totalSpookyWaterSCCatches += 1;
    data.catchesSinceCarrotKing += 1;
    data.catchesSinceSeaEmperor += 1;
    data.catchesSinceWaterHydra += 1;
    data.catchesSincePhantomFisher += 1;
    data.catchesSinceGrimReaper += 1;
    if (data.currArea === "Jerry's Workshop") {
        data.waterSC.catchesSinceYeti += 1;
        data.waterSC.catchesSinceReindrake += 1;
        data.waterSC.totalWinterWaterSCCatches += 1;
    }
}).setCriteria("It must be a full moon, a Werewolf appears.");

// Phantom Fisher
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.phantomFisherCatches += 1;
    data.waterSC.totalSpookyWaterSCCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    data.waterSC.catchesSincePhantomFisher = 0;
    data.waterSC.catchesSinceGrimReaper += 1;
    if (data.currArea === "Jerry's Workshop") {
        data.waterSC.catchesSinceYeti += 1;
        data.waterSC.catchesSinceReindrake += 1;
        data.waterSC.totalWinterWaterSCCatches += 1;
    }
}).setCriteria("The spirit of a long lost Phantom Fisherman has come to haunt you.");

// Grim Reaper
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    datawaterSC.grimReaperCatches += 1;
    data.waterSC.totalSpookyWaterSCCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    data.waterSC.catchesSincePhantomFisher += 1;
    data.waterSC.catchesSinceGrimReaper = 0;
    if (data.currArea === "Jerry's Workshop") {
        data.waterSC.catchesSinceYeti += 1;
        data.waterSC.catchesSinceReindrake += 1;
        data.waterSC.totalWinterWaterSCCatches += 1;
    }
}).setCriteria("This can't be! The manifestation of death himself!");


////////////////////////////////////////////////////////////////////////////
// WATER SEA CREATURES (EVENTS :: WINTER FESTIVAL) -------------------------
////////////////////////////////////////////////////////////////////////////
// Frozen Steve
register('chat', (event) => {
    if (data.currArea !== "Jerry's Workshop") return;
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.frozenSteveCatches += 1;
    data.waterSC.totalWinterWaterSCCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    data.waterSC.catchesSinceYeti += 1;
    data.waterSC.catchesSinceReindrake += 1;
}).setCriteria("Frozen Steve fell into the pond long ago, never to resurface...until now!");

// Frosty the Snowman
register('chat', (event) => {
    if (data.currArea !== "Jerry's Workshop") return;
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.frostySnowmanCatches += 1;
    data.waterSC.totalWinterWaterSCCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    data.waterSC.catchesSinceYeti += 1;
    data.waterSC.catchesSinceReindrake += 1;
}).setCriteria("It's a snowman! He looks harmless.").setContains();

// Grinch
register('chat', (event) => {
    if (data.currArea !== "Jerry's Workshop") return;
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.grinchCatches += 1;
    data.waterSC.totalWinterWaterSCCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    data.waterSC.catchesSinceYeti += 1;
    data.waterSC.catchesSinceReindrake += 1;
}).setCriteria("The Grinch stole Jerry's Gifts...get them back!");

// Yeti
register('chat', (event) => {
    if (data.currArea !== "Jerry's Workshop") return;
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.yetiCatches += 1;
    data.waterSC.totalWinterWaterSCCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    data.waterSC.catchesSinceReindrake += 1;
    data.waterSC.yetiSinceEpicPet += 1;
    data.waterSC.yetiSinceLegPet += 1;
    setTimeout(() => {
        data.waterSC.catchesSinceYeti = 0;
    }, 500)
}).setCriteria("What is this creature!?");

// Baby Yeti Pet [Yeti]
register('chat', (mf, event) => {
    if (data.currArea !== "Jerry's Workshop") return;
    const message = ChatLib.getChatMessage(event, true);
    if (message.includes('&5Baby Yeti')) {
        data.waterSC.epicBabyYeti += 1;
        data.waterSC.yetiSinceEpicPet = 0;
        data.waterSC.timeSinceEpicPet = 0;
    }
    if (message.includes('&6Baby Yeti')) {
        data.waterSC.legBabyYeti += 1;
        data.waterSC.yetiSinceLegPet = 0;
        data.waterSC.timeSinceLegPet = 0;
    }
}).setCriteria('PET DROP! Baby Yeti (+${mf}% ✯ Magic Find)')


// Nutcracker
register('chat', (event) => {
    if (data.currArea !== "Jerry's Workshop") return;
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.nutcrackerCatches += 1;
    data.waterSC.totalWinterWaterSCCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    data.waterSC.catchesSinceYeti += 1;
    data.waterSC.catchesSinceReindrake += 1;
}).setCriteria("You found a forgotten Nutcracker laying beneath the ice.");

// Reindrake
register('chat', (event) => {
    if (data.currArea !== "Jerry's Workshop") return;
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.reindrakeCatches += 1;
    data.waterSC.totalWinterWaterSCCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    data.waterSC.catchesSinceYeti += 1;
    data.waterSC.timeSinceReindrake = 0;
    data.waterSC.prosperityBook += 1;
    setTimeout(() => {
        data.waterSC.catchesSinceReindrake = 0;
    }, 500)
}).setCriteria("A Reindrake forms from the depths.");

// ice rods
register('chat', (event) => {
    // code goes here
    if (data.currArea !== "Jerry's Workshop") return;
    data.waterSC.iceRods += 1;
}).setCriteria('You sold Ice Rod x1 for 20,000 Coins!');

////////////////////////////////////////////////////////////////////////////
// WATER SEA CREATURES (EVENTS :: FISHING FESTIVAL) ------------------------
////////////////////////////////////////////////////////////////////////////
// Nurse Shark
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.nurseSharkCatches += 1;
    data.waterSC.totalSharkWaterSCCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    data.waterSC.catchesSinceGWShark += 1;
    if (data.currArea === "Jerry's Workshop") {
        data.waterSC.catchesSinceYeti += 1;
        data.waterSC.catchesSinceReindrake += 1;
        data.waterSC.totalWinterWaterSCCatches += 1;
    }
}).setCriteria("A tiny fin emerges from the water, you've caught a Nurse Shark.");

// Blue Shark
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.blueSharkCatches += 1;
    data.waterSC.totalSharkWaterSCCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    data.waterSC.catchesSinceGWShark += 1;
    if (data.currArea === "Jerry's Workshop") {
        data.waterSC.catchesSinceYeti += 1;
        data.waterSC.catchesSinceReindrake += 1;
        data.waterSC.totalWinterWaterSCCatches += 1;
    }
}).setCriteria("You spot a fin as blue as the water it came from, it's a Blue Shark.");

// Tiger Shark
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.tigerSharkCatches += 1;
    data.waterSC.totalSharkWaterSCCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    data.waterSC.catchesSinceGWShark += 1;
    if (data.currArea === "Jerry's Workshop") {
        data.waterSC.catchesSinceYeti += 1;
        data.waterSC.catchesSinceReindrake += 1;
        data.waterSC.totalWinterWaterSCCatches += 1;
    }
}).setCriteria("A striped beast bounds from the depths, the wild Tiger Shark!");

// Great White Shark
register('chat', (event) => {
    if (Settings.hide_sc_msgs) cancel(event);
    data.waterSC.gwSharkCatches += 1;
    data.waterSC.totalSharkWaterSCCatches += 1;
    data.waterSC.catchesSinceCarrotKing += 1;
    data.waterSC.catchesSinceSeaEmperor += 1;
    data.waterSC.catchesSinceWaterHydra += 1;
    data.waterSC.catchesSinceGWShark = 0;
    if (data.currArea === "Jerry's Workshop") {
        data.waterSC.catchesSinceYeti += 1;
        data.waterSC.catchesSinceReindrake += 1;
        data.waterSC.totalWinterWaterSCCatches += 1;
    }
}).setCriteria("Hide no longer, a Great White Shark has tracked your scent and thirsts for your blood!");


////////////////////////////////////////////////////////////////////////////
// LAVA SEA CREATURES (CRIMSON ISLE) ---------------------------------------
////////////////////////////////////////////////////////////////////////////
// Phlegblast
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (data.currArea !== 'Crimson Isle') return;
    if (Settings.hide_sc_msgs) cancel(event);
    data.lavaSC.phlegblastCatches += 1;
    data.lavaSC.totalCrimsonSCCatches += 1;
    data.lavaSC.catchesSinceThunder += 1;
    data.lavaSC.catchesSinceJawbus += 1;
}).setCriteria("WOAH! A Plhlegblast appeared.");

// Magma Slug
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (data.currArea !== 'Crimson Isle') return;
    if (Settings.hide_sc_msgs) cancel(event);
    data.lavaSC.magmaSlugCatches += 1;
    data.lavaSC.totalCrimsonSCCatches += 1;
    data.lavaSC.catchesSinceThunder += 1;
    data.lavaSC.catchesSinceJawbus += 1;
}).setCriteria("From beneath the lava appears a Magma Slug.");

// Moogma
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (data.currArea !== 'Crimson Isle') return;
    if (Settings.hide_sc_msgs) cancel(event);
    data.lavaSC.moogmaCatches += 1;
    data.lavaSC.totalCrimsonSCCatches += 1;
    data.lavaSC.catchesSinceThunder += 1;
    data.lavaSC.catchesSinceJawbus += 1;
}).setCriteria("You hear a faint Moo from the lava... A Moogma appears.");

// Lava Leech
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (data.currArea !== 'Crimson Isle') return;
    if (Settings.hide_sc_msgs) cancel(event);
    data.lavaSC.lavaLeechCatches += 1;
    data.lavaSC.totalCrimsonSCCatches += 1;
    data.lavaSC.catchesSinceThunder += 1;
    data.lavaSC.catchesSinceJawbus += 1;
}).setCriteria("A small but fearsome Lava Leech emerges.");

// Pyroclastic Worm
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (data.currArea !== 'Crimson Isle') return;
    if (Settings.hide_sc_msgs) cancel(event);
    data.lavaSC.pyroclasticWormCatches += 1;
    data.lavaSC.totalCrimsonSCCatches += 1;
    data.lavaSC.catchesSinceThunder += 1;
    data.lavaSC.catchesSinceJawbus += 1;
}).setCriteria("You feel the heat radiating as a Pyroclastic Worm surfaces.");

// Lava Flame
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (data.currArea !== 'Crimson Isle') return;
    if (Settings.hide_sc_msgs) cancel(event);
    data.lavaSC.lavaFlameCatches += 1;
    data.lavaSC.totalCrimsonSCCatches += 1;
    data.lavaSC.catchesSinceThunder += 1;
    data.lavaSC.catchesSinceJawbus += 1;
}).setCriteria("A Lava Flame flies out from beneath the lava.");

// Fire Eels
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (data.currArea !== 'Crimson Isle') return;
    if (Settings.hide_sc_msgs) cancel(event);
    data.lavaSC.fireEelsCatches += 1;
    data.lavaSC.totalCrimsonSCCatches += 1;
    data.lavaSC.catchesSinceThunder += 1;
    data.lavaSC.catchesSinceJawbus += 1;
}).setCriteria("A Fire Eel slithers out from the depths.");

// Taurus
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (data.currArea !== 'Crimson Isle') return;
    if (Settings.hide_sc_msgs) cancel(event);
    data.lavaSC.taurusCatches += 1;
    data.lavaSC.totalCrimsonSCCatches += 1;
    data.lavaSC.catchesSinceThunder += 1;
    data.lavaSC.catchesSinceJawbus += 1;
}).setCriteria("Taurus and his steed emerge.");

// Thunder
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (data.currArea !== 'Crimson Isle') return;
    if (Settings.hide_sc_msgs) cancel(event);
    data.lavaSC.thunderCatches += 1;
    data.lavaSC.totalCrimsonSCCatches += 1;
    data.lavaSC.catchesSinceThunder = 0;
    data.lavaSC.catchesSinceJawbus += 1;
}).setCriteria("You hear a massive rumble as Thunder emerges.");

// Lord Jawbus
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (data.currArea !== 'Crimson Isle') return;
    if (Settings.hide_sc_msgs) cancel(event);
    data.lavaSC.lordJawbusCatches += 1;
    data.lavaSC.totalCrimsonSCCatches += 1;
    data.lavaSC.catchesSinceThunder += 1;
    data.lavaSC.catchesSinceJawbus = 0;
    data.lavaSC.jawbusSinceLastVial += 1;
}).setCriteria("You have angered a legendary creature... Lord Jawbus has arrived.");

// Radioactive Vial [Jawbus]
register('chat', (mf, event) => {
    if (!data.inSkyblock) return;
    data.lavaSC.jawbusSinceLastVial = 0;
}).setCriteria("RARE DROP! Radioactive Vial (+${mf}% ✯ Magic Find)")

////////////////////////////////////////////////////////////////////////////
// LAVA SEA CREATURES (CRYSTAL HOLLOWS) ------------------------------------
////////////////////////////////////////////////////////////////////////////
// Flaming Worm
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (data.currArea !== 'Crystal Hollows') return;
    if (Settings.hide_sc_msgs) cancel(event);
    data.lavaSC.flamingWormCatches += 1;
    data.lavaSC.totalLavaCHSCCatches += 1;
    data.catchesSinceFlamingWorm = 0;
}).setCriteria("A flaming worm surfaces from the depths!");

// Lava Blaze
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (data.currArea !== 'Crystal Hollows') return;
    if (Settings.hide_sc_msgs) cancel(event);
    data.lavaSC.lavaBlazeCatches += 1;
    data.lavaSC.totalLavaCHSCCatches += 1;
    data.catchesSinceFlamingWorm += 1;
}).setCriteria("A Lava Blaze has surfaced from the depths!");

// Lava Pigman
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (data.currArea !== 'Crystal Hollows') return;
    if (Settings.hide_sc_msgs) cancel(event);
    data.lavaSC.lavaPigmanCatches += 1;
    data.lavaSC.totalLavaCHSCCatches += 1;
    data.catchesSinceFlamingWorm += 1;
}).setCriteria("A Lava Pigman arose from the depths!");

////////////////////////////////////////////////////////////////////////////
// GUI STUFF FOR FISHING COUNTER -------------------------------------------
////////////////////////////////////////////////////////////////////////////
var movefishcounter = new Gui();

register('dragged', (dx, dy, x, y) => {
    if (!data.inSkyblock) return;
    if (movefishcounter.isOpen()) {
        data.FishCounter.x = x;
        data.FishCounter.y = y;
    }
})

createGuiCommand(movefishcounter, 'movefishcounter', 'mfc')

////////////////////////////////////////////////////////////////////////////
// RENDER OVERLAY COUNTER --------------------------------------------------
////////////////////////////////////////////////////////////////////////////
let CIDisplay = '';
let WIDisplay = '';
let HUBDisplay = '';
register('step', () => {
    if (!data.inSkyblock) return;
    let separatorThick = '=================='
    let separatorThin = '------------------'

    let crimsonSepThick = '&3' + separatorThick
    let crimsonSepThin = '&3' + separatorThin

    let winterSepThick = '&7' + separatorThick
    let winterSepThin = '&7' + separatorThin

    let hubSepThick = '&5' + separatorThick
    let hubSepThin = '&5' + separatorThin

    // CRIMSON ISLE COUNTER
    if (data.currArea === 'Crimson Isle') {
        crimsonTitle = Settings.kills_fishingcounter || Settings.tracker_fishingcounter || Settings.avgs_fishingcounter ? `&8|&7|&b|&7|&8| &cCrimson Isle &8|&7|&b|&7|&8|\n${crimsonSepThick}` : '';
        
        phlegLine = `&8||&b| &6Phlegblast: &b${data.lavaSC.phlegblastCatches}`
        magmaSlugLine = `&8||&b| &6Magma Slug: &b${data.lavaSC.magmaSlugCatches}`
        moogmaLine = `&8||&b| &6Moogma: &b${data.lavaSC.moogmaCatches}`
        lavaLeechLine = `&8||&b| &6Lava Leech: &b${data.lavaSC.lavaLeechCatches}`
        pyroWormLine = `&8||&b| &6Pyroclasic Worm: &b${data.lavaSC.pyroclasticWormCatches}`
        lavaFlameLine = `&8||&b| &6Lava Flame: &b${data.lavaSC.lavaFlameCatches}`
        fireEelLine = `&8||&b| &6Fire Eel: &b${data.lavaSC.fireEelsCatches}`
        taurusLine = `&8||&b| &6Taurus: &b${data.lavaSC.taurusCatches}`
        thunderLine = `&8||&b| &6Thunder: &b${data.lavaSC.thunderCatches}`
        JawbusLine = `&8||&b| &6Jawbus: &b${data.lavaSC.lordJawbusCatches}`

        scSinceThunderLine = `&8||&b| &rSC Since Thunder: &b${data.lavaSC.catchesSinceThunder}`
        scSinceJawbusLine = `&8||&b| &rSC Since Jawbus: &b${data.lavaSC.catchesSinceJawbus}`

        jawbusSinceVialLine = `&8||&b| &rJawbus Since Vial: &b${data.lavaSC.jawbusSinceLastVial === null ? 0 : data.lavaSC.jawbusSinceLastVial}`

        thunderChance = 0.0087;
        jawbusChance = 0.0017;
        probabilityThunder = (((data.lavaSC.thunderCatches / data.lavaSC.totalCrimsonSCCatches) + thunderChance) * 100).toFixed(2);
        probabilityJawbus = (((data.lavaSC.lordJawbusCatches / data.lavaSC.totalCrimsonSCCatches) + jawbusChance) * 100).toFixed(2);

        averageSCPerThunder = (data.lavaSC.totalCrimsonSCCatches / data.lavaSC.thunderCatches).toFixed(2);
        averageSCPerJawbus = (data.lavaSC.totalCrimsonSCCatches / data.lavaSC.lordJawbusCatches).toFixed(2);
        avgThunderLine = `&8||&b| &rAvg SC/Thunder: &b${averageSCPerThunder} &8|| &9&oP(%): ${probabilityThunder}%`
        avgJawbusLine = `&8||&b| &rAvg SC/Jawbus: &b${averageSCPerJawbus} &8|| &9&oP(%): ${probabilityJawbus}%`


        showCIKills = Settings.kills_fishingcounter ? [phlegLine, magmaSlugLine, moogmaLine, lavaLeechLine, pyroWormLine, lavaFlameLine, fireEelLine, taurusLine, thunderLine, JawbusLine, crimsonSepThin].join('\n') : '';

        showCITrackers = Settings.tracker_fishingcounter ? [scSinceThunderLine, scSinceJawbusLine, jawbusSinceVialLine, crimsonSepThin].join('\n') : '';

        showCIAverages = Settings.avgs_fishingcounter ? [avgThunderLine, avgJawbusLine, crimsonSepThin].join('\n') : '';

        CIDisplayRaw = [crimsonTitle, showCIKills, showCITrackers, showCIAverages].join('\n').replace(/\n{6,}/g, '\n');
        CIDisplayFilter = CIDisplayRaw.replace(/\n{2,}/g, '\n');

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
        CIDisplay = phraseArray.join('\n')
    }

    // WINTER ISLAND COUNTER
    if (data.currArea === "Jerry's Workshop") {
        winterTitle = Settings.kills_fishingcounter || Settings.mob_since_fishingcounter || Settings.drops_fishingcounter || Settings.tracker_fishingcounter || Settings.avgs_fishingcounter || Settings.elapsed_sincefishingcounter || Settings.specials_fishingcounter ? `&8|&1|&9|&3|&b| &rWinter Island &b|&3|&9|&1|&8|\n${winterSepThick}` : '';

        // winter kills
        frozenSteveLine = `&9|&3|&b| &rFrozen Steve: &b${data.waterSC.frozenSteveCatches}`
        frostySnowmanLine = `&9|&3|&b| &rFrosty Snowman: &b${data.waterSC.frostySnowmanCatches}`
        grinchLine = `&9|&3|&b| &rGrinch: &b${data.waterSC.grinchCatches}`
        nutcrackerLine = `&9|&3|&b| &rNutcracker: &b${data.waterSC.nutcrackerCatches}`
        yetiLine = `&9|&3|&b| &rYeti: &b${data.waterSC.yetiCatches}`
        reindrakeLine = `&9|&3|&b| &rReindrake: &b${data.waterSC.reindrakeCatches}`

        // winter trackers
        scSinceYetiLine = `&9|&3|&b| &rSC Since Yeti: &b${data.waterSC.catchesSinceYeti}`
        scSinceReindrakeLine = `&9|&3|&b| &rSC Since Reindrake: &b${data.waterSC.catchesSinceReindrake}`;

        // yeti since drops
        yetiSinceEpicPetLine = `&9|&3|&b| &rYeti Since &5Epic &rPet: &b${data.waterSC.yetiSinceEpicPet}`
        yetiSinceLegPetLine = `&9|&3|&b| &rYeti Since &6Leg &rPet: &b${data.waterSC.yetiSinceLegPet}`
        yetiSincePetLine = `${yetiSinceEpicPetLine}\n${yetiSinceLegPetLine}`

        // drops
        yetiPetLine = `&9|&3|&b| &rBaby Yeti Pet: &5${data.waterSC.epicBabyYeti == null || isNaN(data.waterSC.epicBabyYeti) ? 0 : data.waterSC.epicBabyYeti}&r | &6${data.waterSC.legBabyYeti == null || isNaN(data.waterSC.legBabyYeti) ? 0 : data.waterSC.legBabyYeti}&r`
        prosperityLine = `&9|&3|&b| &rProsperity I Book: &6${data.waterSC.prosperityBook == null || isNaN(data.waterSC.prosperityBook) ? 0 : data.waterSC.prosperityBook}&r`
        
        // winter time
        data.waterSC.timeSinceEpicPet += 1;
        data.waterSC.timeSinceLegPet += 1;
        data.waterSC.timeSinceReindrake += 1;
        timeSinceEpicPetLine = updateCDText('', '&9|&3|&b| &rTime Since Epic Pet', data.waterSC.timeSinceEpicPet)
        timeSinceLegPetLine = updateCDText('', '&9|&3|&b| &rTime Since Leg Pet', data.waterSC.timeSinceLegPet)
        timeSinceReinLine = updateCDText('', '&9|&3|&b| &rTime Since Reindrake', data.waterSC.timeSinceReindrake)

        
        // ice rod counts
        iceRodsLine = `&9|&3|&b| &rIce Rods: ${data.waterSC.iceRods == null || isNaN(data.waterSC.iceRods) ? 0 : data.waterSC.iceRods} &7(${data.waterSC.iceRods == null || isNaN(data.waterSC.iceRods) ? 0 : formatMoney(data.waterSC.iceRods * 20000)})`
        
        // winter averages
        averageSCPerYeti = (data.waterSC.totalWinterWaterSCCatches / data.waterSC.yetiCatches).toFixed(2);
        averageSCPerReindrake = (data.waterSC.totalWinterWaterSCCatches / data.waterSC.reindrakeCatches).toFixed(2);
        avgYetiLine = `&9|&3|&b| &rAvg SC/Yeti: &b${averageSCPerYeti == null || isNaN(averageSCPerYeti) ? 0 : averageSCPerYeti}`
        avgReindrakeLine = `&9|&3|&b| &rAvg SC/Reindrake: &b${averageSCPerReindrake == null || isNaN(averageSCPerReindrake) ? 0 : averageSCPerReindrake}`

        showWIKills = Settings.kills_fishingcounter ? [frozenSteveLine, frostySnowmanLine, grinchLine, nutcrackerLine, yetiLine, reindrakeLine, winterSepThin].join('\n') : '';

        showWITrackers = Settings.tracker_fishingcounter ? [scSinceYetiLine, scSinceReindrakeLine, winterSepThin].join('\n') : '';

        showMobSinceTrackers = Settings.mob_since_fishingcounter ? [yetiSincePetLine, winterSepThin].join('\n') : '';

        showWIDrops = Settings.drops_fishingcounter ? [yetiPetLine, prosperityLine, winterSepThin].join('\n') : '';

        showWIAverages = Settings.avgs_fishingcounter ? [avgYetiLine, avgReindrakeLine, winterSepThin].join('\n') : '';

        timeSincePetLine = Settings.elapsed_sincefishingcounter ? [`${timeSinceEpicPetLine}${timeSinceLegPetLine}${timeSinceReinLine}`, winterSepThin].join('\n') : '';

        showIceRodCounter = Settings.specials_fishingcounter ? [iceRodsLine, winterSepThin].join('\n') : ''

        WIDisplayRaw = [winterTitle, showWIKills, showWITrackers, showMobSinceTrackers, showWIDrops, showWIAverages, timeSincePetLine, showIceRodCounter].join('\n').replace(/\n{6,}/g, '\n');
        WIDisplayFilter = WIDisplayRaw.replace(/\n{2,}/g, '\n');

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
        WIDisplay = phraseArray.join('\n')
    }

    // HUB GENERAL COUNTER
    if (data.currArea === 'Hub') {
        generalTitle =  Settings.kills_fishingcounter || Settings.drops_fishingcounter || Settings.tracker_fishingcounter || Settings.avgs_fishingcounter || Settings.mob_since_fishingcounter ? `&r  <--]|| &fGENERAL &r||[-->  \n${hubSepThick}` : '';

        // kills
        squidLine = `&8||| &7Squid: &b${data.waterSC.squidCatches}`
        seaWalkerLine = `&8||| &7Sea Walker: &b${data.waterSC.seaWalkerCatches}`
        seaGuardianLine = `&8||| &7Sea Guardian: &b${data.waterSC.seaGuardianCatches}`
        seaWitchLine = `&8||| &7Sea Witch: &b${data.waterSC.seaWitchCatches}`
        seaArcherLine = `&8||| &7Sea Archer: &b${data.waterSC.seaArcherCatches}`
        rotdLine = `&8||| &7Rider of the Deep: &b${data.waterSC.rotdCatches}`
        catfishLine = `&8||| &7Catfish: &b${data.waterSC.catfishCatches}`
        seaLeechLine = `&8||| &7Sea Leech: &b${data.waterSC.seaLeechCatches}`
        guardianDefenderLine = `&8||| &7Guardian Defender: &b${data.waterSC.guardianDefenderCatches}`
        dspLine = `&8||| &7Deep Sea Protector: &b${data.waterSC.deepSeaProtectorCatches}`
        agarimooLine = `&8||| &7Agarimoo: &b${data.waterSC.agarimooCatches}`
        carrotKingLine = `&8||| &6Carrot King: &b${data.waterSC.carrotKingCatches}`
        waterHydraLine = `&8||| &6Water Hydra: &b${data.waterSC.waterHydraCatches}`
        seaEmpLine = `&8||| &6Sea Emperor: &b${data.waterSC.seaEmperorCatches}`

        // trackers
        scSinceCarrotKing = `&8||&r| SC Since Carrot King: &b${data.waterSC.catchesSinceCarrotKing}`;
        scSinceWaterHydra = `&8||&r| SC Since Water Hydra: &b${data.waterSC.catchesSinceWaterHydra}`;
        scSinceSeaEmperor = `&8||&r| SC Since Sea Emperor: &b${data.waterSC.catchesSinceSeaEmperor}`;

        // averages
        averageSCPerCarrotKing = (data.waterSC.totalRegularWaterSCCatches / data.waterSC.carrotKingCatches).toFixed(2);
        averageSCPerWaterHydra = (data.waterSC.totalRegularWaterSCCatches / data.waterSC.waterHydraCatches).toFixed(2);
        averageSCPerSeaEmperor = (data.waterSC.totalRegularWaterSCCatches / data.waterSC.seaEmperorCatches).toFixed(2);
        avgCarrotKingLine = `&8||&r| Avg SC/Carrot King: &b${averageSCPerCarrotKing == null || isNaN(averageSCPerCarrotKing) ? '0.00' : averageSCPerCarrotKing}`;
        avgWaterHydraLine = `&8||&r| Avg SC/Water Hydra: &b${averageSCPerWaterHydra == null || isNaN(averageSCPerWaterHydra) ? '0.00' : averageSCPerWaterHydra}`;
        avgSeaEmperorLine = `&8||&r| Avg SC/Sea Emperor: &b${averageSCPerSeaEmperor == null || isNaN(averageSCPerSeaEmperor) ? '0.00' : averageSCPerSeaEmperor}`;

        // mobs since last rng
        carrotKingSinceLastCloverLine = `&8||&r| CK(s) since last Clover: &3${data.waterSC.carrotKingSinceLastClover == null ? 0 : data.waterSC.carrotKingSinceLastClover}`;

        // drops
        cloverDropsLine = data.waterSC.clover == null ? "&8||&d| &rLucky Clover: &a0" : `&8||&d| &rLucky Clover: &a${data.waterSC.clover}`;
        flyingFishDropsLine = `&8||&d| &rFlying Fish: &r${data.waterSC.commonFF == null ? 0 : data.waterSC.commonFF}&8|&a${data.waterSC.uncommonFF == null ? 0 : data.waterSC.uncommonFF}&8|&9${data.waterSC.rareFF == null ? 0 : data.waterSC.rareFF}&8|&5${data.waterSC.epicFF == null ? 0 : data.waterSC.epicFF}&8|&6${data.waterSC.legFF == null ? 0 : data.waterSC.legFF}`;
        guardianDropsLine = `&8||&d| &rGuardian: &r${data.waterSC.commonGD == null ? 0 : data.waterSC.commonGD}&8|&a${data.waterSC.uncommonGD == null ? 0 : data.waterSC.uncommonGD}&8|&9${data.waterSC.rareGD == null ? 0 : data.waterSC.rareGD}&8|&5${data.waterSC.epicGD == null ? 0 : data.waterSC.epicGD}&8|&6${data.waterSC.legGD == null ? 0 : data.waterSC.legGD}`;



        showHubKills =  Settings.kills_fishingcounter ? [squidLine, seaWalkerLine, seaGuardianLine, seaWitchLine, seaArcherLine, rotdLine, catfishLine, guardianDefenderLine, dspLine, agarimooLine, carrotKingLine, waterHydraLine, seaEmpLine, hubSepThin].join('\n') : '';

        showHubTrackers = Settings.tracker_fishingcounter ? [scSinceCarrotKing, scSinceWaterHydra, scSinceSeaEmperor, hubSepThin].join('\n') : '';

        showHubAverages = Settings.avgs_fishingcounter ? [avgCarrotKingLine, avgWaterHydraLine, avgSeaEmperorLine, hubSepThin].join('\n') : '';

        showMobSinceTrackers = Settings.mob_since_fishingcounter ? [carrotKingSinceLastCloverLine, hubSepThin].join('\n') : '';

        showHubDrops = Settings.drops_fishingcounter ? [cloverDropsLine, flyingFishDropsLine, hubSepThin].join('\n') : '';

        HUBDisplayRaw = [generalTitle, showHubKills, showHubDrops, showMobSinceTrackers, showHubTrackers, showHubAverages].join('\n').replace(/\n{6,}/g, '\n');
        HUBDisplayFilter = HUBDisplayRaw.replace(/\n{2,}/g, '\n');
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
        HUBDisplay = phraseArray.join('\n')
    }
}).setFps(1);

register('renderOverlay', () => {
    if (!data.inSkyblock) return;
    if (!Settings.fishing_counter) return;
    if (data.currArea === 'Crimson Isle') {
        Renderer.drawStringWithShadow(CIDisplay, data.FishCounter.x, data.FishCounter.y)
    }
    if (data.currArea === "Jerry's Workshop") {
        Renderer.drawStringWithShadow(WIDisplay, data.FishCounter.x, data.FishCounter.y)
    }
    if (data.currArea === 'Hub') {
        Renderer.drawStringWithShadow(HUBDisplay, data.FishCounter.x, data.FishCounter.y)
    }
    
    renderGuiPosition(movefishcounter, data.FishCounter, '<><FISHING AREA><>\n==================\nKills #1: &b...\nKills #2: &b...: &b...\nKills #3: &b...\n-----------------\nDrops #1: &b...\nDrops #2: &b...\nDrops #3: &b...\n-----------------\nSC since Mob #1: &b...\n SC since Mob #2: &b...\n-----------------\nMob since Drop #1: &b...\n Mob since Drop #2: &b...\n-----------------\nAverage SC per Mob #1: &b...\nAverage SC per Mob #2: &b...\nAverage SC per Mob #3: &b...\n-----------------\nTime Since Mob #1: &b...\nTime Since Mob #2: &b...\n-----------------\nTime Since Drop #1: &b...\nTime Since Drop #2')
});

register('command', (args) => {
    data.lavaSC.phlegblastCatches = 0;
    data.lavaSC.magmaSlugCatches = 0;
    data.lavaSC.moogmaCatches = 0;
    data.lavaSC.lavaLeechCatches = 0;
    data.lavaSC.pyroclasticWormCatches = 0;
    data.lavaSC.lavaFlameCatches = 0;
    data.lavaSC.fireEelsCatches = 0;
    data.lavaSC.taurusCatches = 0;
    data.lavaSC.thunderCatches = 0;
    data.lavaSC.lordJawbusCatches = 0;
    
    data.lavaSC.flashBook = 0;
    data.lavaSC.magmaLordFragment = 0;
    data.lavaSC.radioactiveVial = 0;

    data.lavaSC.catchesSinceThunder = 0;
    data.lavaSC.catchesSinceJawbus = 0;
    data.lavaSC.jawbusSinceLastVial = 0;

    data.lavaSC.totalCrimsonSCCatches = 0;
    ChatLib.chat('&6[&3Bao&6] &aCrimson Fishing stats reset.')
}).setName('resetcrimson');

register('command', (args) => {
    data.waterSC.frozenSteveCatches = 0;
    data.waterSC.frostySnowmanCatches = 0;
    data.waterSC.grinchCatches = 0;
    data.waterSC.nutcrackerCatches = 0;
    data.waterSC.yetiCatches = 0;
    data.waterSC.reindrakeCatches = 0;

    data.waterSC.totalWinterWaterSCCatches = 0;

    data.waterSC.catchesSinceYeti = 0;
    data.waterSC.catchesSinceReindrake = 0;
    data.waterSC.yetiSinceEpicPet = 0;
    data.waterSC.yetiSinceLegPet = 0;

    data.waterSC.epicBabyYeti = 0;
    data.waterSC.legBabyYeti = 0;
    data.waterSC.prosperityBook = 0;
    ChatLib.chat('&6[&3Bao&6] &aWinter Fishing stats reset.')
}).setName('resetwinter');

register('command', () => {
    data.waterSC.squidCatches = 0;
    data.waterSC.seaWalkerCatches = 0;
    data.waterSC.nightSquidCatches = 0;
    data.waterSC.seaGuardianCatches = 0;
    data.waterSC.seaWitchCatches = 0;
    data.waterSC.seaArcherCatches = 0;
    data.waterSC.rotdCatches = 0;
    data.waterSC.catfishCatches = 0;
    data.waterSC.carrotKingCatches = 0;
    data.waterSC.seaLeechCatches = 0;
    data.waterSC.guardianDefenderCatches = 0;
    data.waterSC.deepSeaProtectorCatches = 0;
    data.waterSC.waterHydraCatches = 0;
    data.waterSC.seaEmperorCatches = 0;
    data.waterSC.agarimooCatches = 0;

    data.waterSC.clover = 0;
    data.waterSC.commonFF = 0;
    data.waterSC.clover = 0;
    data.waterSC.uncommonFF = 0;
    data.waterSC.rareFF = 0;
    data.waterSC.epicFF = 0;
    data.waterSC.legFF = 0;
    data.waterSC.commonGD = 0;
    data.waterSC.uncommonGD = 0;
    data.waterSC.rareGD = 0;
    data.waterSC.epicGD = 0;
    data.waterSC.legGD = 0;
    data.waterSC.shredder = 0;

    data.waterSC.oasisRabbitCatches = 0;
    data.waterSC.oasisSheepCatches = 0;
    data.waterSC.waterWormCatches = 0;
    data.waterSC.poisonedWaterWormCatches = 0;
    data.waterSC.zombieMinerCatches = 0;
    data.waterSC.scarecrowCatches = 0;
    data.waterSC.nightmareCatches = 0;
    data.waterSC.werewolfCatches = 0;
    data.waterSC.phantomFisherCatches = 0;
    data.waterSC.grimReaperCatches = 0;
    data.waterSC.DSO = 0;
    data.waterSC.phantomRod = 0;
    data.waterSC.soulFragment = 0;
    data.waterSC.frozenSteveCatches = 0;
    data.waterSC.frostySnowmanCatches = 0;
    data.waterSC.grinchCatches = 0;
    data.waterSC.nutcrackerCatches = 0;
    data.waterSC.yetiCatches = 0;
    data.waterSC.reindrakeCatches = 0;
    data.waterSC.nurseSharkCatches = 0;
    data.waterSC.blueSharkCatches = 0;
    data.waterSC.tigerSharkCatches = 0;
    data.waterSC.gwSharkCatches = 0;
    data.waterSC.gwSharkToof = 0;

    data.waterSC.totalRegularWaterSCCatches = 0;
    data.waterSC.totalOasisWaterSCCatches = 0;
    data.waterSC.totalCHWaterSCCatches = 0;
    data.waterSC.totalSpookyWaterSCCatches = 0;
    data.waterSC.totalWinterWaterSCCatches = 0;
    data.waterSC.totalSharkWaterSCCatches = 0;

    data.waterSC.catchesSinceCarrotKing = 0;
    data.waterSC.carrotKingSinceLastClover = 0;
    data.waterSC.catchesSinceWaterHydra = 0;
    data.waterSC.catchesSinceSeaEmperor = 0;
    data.waterSC.catchesSinceZombieMiner = 0;
    data.waterSC.catchesSincePhantomFisher = 0;
    data.waterSC.catchesSinceGrimReaper = 0;
    data.waterSC.catchesSinceYeti = 0;
    data.waterSC.catchesSinceReindrake = 0;
    data.waterSC.yetiSinceEpicPet = 0;
    data.waterSC.yetiSinceLegPet = 0;
    data.waterSC.timeSinceEpicPet = 0;
    data.waterSC.timeSinceLegPet = 0;
    data.waterSC.timeSinceReindrake = 0;
    data.waterSC.epicBabyYeti = 0;
    data.waterSC.legBabyYeti = 0;
    data.waterSC.prosperityBook = 0;
    data.waterSC.catchesSinceGWShark = 0;


    data.lavaSC.flamingWormCatches = 0;
    data.lavaSC.lavaBlazeCatches = 0;
    data.lavaSC.lavaPigmanCatches = 0;
    data.lavaSC.totalLavaCHSCCatches = 0;

    data.lavaSC.catchesSinceFlamingWorm = 0;

    // reset winter
    data.waterSC.frozenSteveCatches = 0;
    data.waterSC.frostySnowmanCatches = 0;
    data.waterSC.grinchCatches = 0;
    data.waterSC.nutcrackerCatches = 0;
    data.waterSC.yetiCatches = 0;
    data.waterSC.reindrakeCatches = 0;

    data.waterSC.totalWinterWaterSCCatches = 0;

    data.waterSC.catchesSinceYeti = 0;
    data.waterSC.catchesSinceReindrake = 0;
    data.waterSC.yetiSinceEpicPet = 0;
    data.waterSC.yetiSinceLegPet = 0;

    data.waterSC.epicBabyYeti = 0;
    data.waterSC.legBabyYeti = 0;
    data.waterSC.prosperityBook = 0;
    data.waterSC.iceRods = 0;

    // reset crimson
    data.lavaSC.phlegblastCatches = 0;
    data.lavaSC.magmaSlugCatches = 0;
    data.lavaSC.moogmaCatches = 0;
    data.lavaSC.lavaLeechCatches = 0;
    data.lavaSC.pyroclasticWormCatches = 0;
    data.lavaSC.lavaFlameCatches = 0;
    data.lavaSC.fireEelsCatches = 0;
    data.lavaSC.taurusCatches = 0;
    data.lavaSC.thunderCatches = 0;
    data.lavaSC.lordJawbusCatches = 0;
    
    data.lavaSC.flashBook = 0;
    data.lavaSC.magmaLordFragment = 0;
    data.lavaSC.radioactiveVial = 0;

    data.lavaSC.catchesSinceThunder = 0;
    data.lavaSC.catchesSinceJawbus = 0;
    data.lavaSC.jawbusSinceLastVial = 0;

    data.lavaSC.totalCrimsonSCCatches = 0;

    ChatLib.chat('&6[&3Bao&6] All fishing stats reset.')
}).setName('baoresetfishing');

register('command', () => {
    data.waterSC.yetiCatches += 1;
}).setName('addyeti');

register('command', () => {
    data.waterSC.reindrakeCatches += 1;
}).setName('addrein');

register('command', () => {
    data.waterSC.legBabyYeti += 1;
}).setName('addlegyeti');

register('command', () => {
    data.waterSC.epicBabyYeti += 1;
}).setName('addepicyeti');

////////////////////////////////////////////////////////////////////////////
// SOME NEW SEA CREATURES I GUESS LOL --------------------------------------
////////////////////////////////////////////////////////////////////////////

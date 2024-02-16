/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from '../settings.js';
import PogObject from 'PogData';

import { getInSkyblock } from '../utils/functions.js'; // sb, area
import { baoUtils } from '../utils/utils.js';
import { formatMoney } from '../utils/functions.js';
import { filterSeparators } from '../utils/functions.js';
import { updateCDText } from '../utils/functions.js';
import { filterSeparators } from '../utils/functions.js';
import { getInJerry, getInHub, getInCH, getInDesert } from '../utils/functions.js';
import { registerWhen, timeThis } from '../utils/utils.js';


////////////////////////////////////////////////////////////////////////////////
// SETUP CONSTS
////////////////////////////////////////////////////////////////////////////////
// pogobject
export const baoWaterSCStats = new PogObject("bao-dev", {
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
}, '/data/baoWaterSCStats.json');
baoWaterSCStats.autosave(5);


////////////////////////////////////////////////////////////////////////////////
// HUB CONSTS
////////////////////////////////////////////////////////////////////////////////
const hubSepThick = `&5${baoUtils.thickSep}`;
const hubSepThin = `&5${baoUtils.thinSep}`;

// kills
const squidLine = `&8||| &7Squid: &b${baoWaterSCStats.squidCatches}`
const seaWalkerLine = `&8||| &7Sea Walker: &b${baoWaterSCStats.seaWalkerCatches}`
const seaGuardianLine = `&8||| &7Sea Guardian: &b${baoWaterSCStats.seaGuardianCatches}`
const seaWitchLine = `&8||| &7Sea Witch: &b${baoWaterSCStats.seaWitchCatches}`
const seaArcherLine = `&8||| &7Sea Archer: &b${baoWaterSCStats.seaArcherCatches}`
const rotdLine = `&8||| &7Rider of the Deep: &b${baoWaterSCStats.rotdCatches}`
const catfishLine = `&8||| &7Catfish: &b${baoWaterSCStats.catfishCatches}`
const seaLeechLine = `&8||| &7Sea Leech: &b${baoWaterSCStats.seaLeechCatches}`
const guardianDefenderLine = `&8||| &7Guardian Defender: &b${baoWaterSCStats.guardianDefenderCatches}`
const dspLine = `&8||| &7Deep Sea Protector: &b${baoWaterSCStats.deepSeaProtectorCatches}`
const agarimooLine = `&8||| &7Agarimoo: &b${baoWaterSCStats.agarimooCatches}`
const carrotKingLine = `&8||| &6Carrot King: &b${baoWaterSCStats.carrotKingCatches}`
const waterHydraLine = `&8||| &6Water Hydra: &b${baoWaterSCStats.waterHydraCatches}`
const seaEmpLine = `&8||| &6Sea Emperor: &b${baoWaterSCStats.seaEmperorCatches}`


// trackers
const scSinceCarrotKing = `&8||&r| SC Since Carrot King: &b${baoWaterSCStats.catchesSinceCarrotKing}`;
const scSinceWaterHydra = `&8||&r| SC Since Water Hydra: &b${baoWaterSCStats.catchesSinceWaterHydra}`;
const scSinceSeaEmperor = `&8||&r| SC Since Sea Emperor: &b${baoWaterSCStats.catchesSinceSeaEmperor}`;

// averages
const averageSCPerCarrotKing = (baoWaterSCStats.totalRegularWaterSCCatches / baoWaterSCStats.carrotKingCatches).toFixed(2);
const averageSCPerWaterHydra = (baoWaterSCStats.totalRegularWaterSCCatches / baoWaterSCStats.waterHydraCatches).toFixed(2);
const averageSCPerSeaEmperor = (baoWaterSCStats.totalRegularWaterSCCatches / baoWaterSCStats.seaEmperorCatches).toFixed(2);
const avgCarrotKingLine = `&8||&r| Avg SC/Carrot King: &b${averageSCPerCarrotKing == null || isNaN(averageSCPerCarrotKing) ? '0.00' : averageSCPerCarrotKing}`;
const avgWaterHydraLine = `&8||&r| Avg SC/Water Hydra: &b${averageSCPerWaterHydra == null || isNaN(averageSCPerWaterHydra) ? '0.00' : averageSCPerWaterHydra}`;
const avgSeaEmperorLine = `&8||&r| Avg SC/Sea Emperor: &b${averageSCPerSeaEmperor == null || isNaN(averageSCPerSeaEmperor) ? '0.00' : averageSCPerSeaEmperor}`;

// mobs since last rng
const carrotKingSinceLastCloverLine = `&8||&r| CK(s) since last Clover: &3${baoWaterSCStats.carrotKingSinceLastClover == null ? 0 : baoWaterSCStats.carrotKingSinceLastClover}`;

// drops
const cloverDropsLine = baoWaterSCStats.clover == null ? "&8||&d| &rLucky Clover: &a0" : `&8||&d| &rLucky Clover: &a${baoWaterSCStats.clover}`;
const flyingFishDropsLine = `&8||&d| &rFlying Fish: &r${baoWaterSCStats.commonFF == null ? 0 : baoWaterSCStats.commonFF}&8|&a${baoWaterSCStats.uncommonFF == null ? 0 : baoWaterSCStats.uncommonFF}&8|&9${baoWaterSCStats.rareFF == null ? 0 : baoWaterSCStats.rareFF}&8|&5${baoWaterSCStats.epicFF == null ? 0 : baoWaterSCStats.epicFF}&8|&6${baoWaterSCStats.legFF == null ? 0 : baoWaterSCStats.legFF}`;
const guardianDropsLine = `&8||&d| &rGuardian: &r${baoWaterSCStats.commonGD == null ? 0 : baoWaterSCStats.commonGD}&8|&a${baoWaterSCStats.uncommonGD == null ? 0 : baoWaterSCStats.uncommonGD}&8|&9${baoWaterSCStats.rareGD == null ? 0 : baoWaterSCStats.rareGD}&8|&5${baoWaterSCStats.epicGD == null ? 0 : baoWaterSCStats.epicGD}&8|&6${baoWaterSCStats.legGD == null ? 0 : baoWaterSCStats.legGD}`;


////////////////////////////////////////////////////////////////////////////////
// JERRY ISLAND CONSTS
////////////////////////////////////////////////////////////////////////////////
const winterSepThick = `&7${baoUtils.thickSep}`;
const winterSepThin = `&7${baoUtils.thinSep}`;

// winter kills
const frozenSteveLine = `&9|&3|&b| &rFrozen Steve: &b${baoWaterSCStats.frozenSteveCatches}`
const frostySnowmanLine = `&9|&3|&b| &rFrosty Snowman: &b${baoWaterSCStats.frostySnowmanCatches}`
const grinchLine = `&9|&3|&b| &rGrinch: &b${baoWaterSCStats.grinchCatches}`
const nutcrackerLine = `&9|&3|&b| &rNutcracker: &b${baoWaterSCStats.nutcrackerCatches}`
const yetiLine = `&9|&3|&b| &rYeti: &b${baoWaterSCStats.yetiCatches}`
const reindrakeLine = `&9|&3|&b| &rReindrake: &b${baoWaterSCStats.reindrakeCatches}`

// winter trackers
const scSinceYetiLine = `&9|&3|&b| &rSC Since Yeti: &b${baoWaterSCStats.catchesSinceYeti}`
const scSinceReindrakeLine = `&9|&3|&b| &rSC Since Reindrake: &b${baoWaterSCStats.catchesSinceReindrake}`;

// yeti since drops
const yetiSinceEpicPetLine = `&9|&3|&b| &rYeti Since &5Epic &rPet: &b${baoWaterSCStats.yetiSinceEpicPet}`
const yetiSinceLegPetLine = `&9|&3|&b| &rYeti Since &6Leg &rPet: &b${baoWaterSCStats.yetiSinceLegPet}`
const yetiSincePetLine = `${yetiSinceEpicPetLine}\n${yetiSinceLegPetLine}`

// drops
const yetiPetLine = `&9|&3|&b| &rBaby Yeti Pet: &5${baoWaterSCStats.epicBabyYeti == null || isNaN(baoWaterSCStats.epicBabyYeti) ? 0 : baoWaterSCStats.epicBabyYeti}&r | &6${baoWaterSCStats.legBabyYeti == null || isNaN(baoWaterSCStats.legBabyYeti) ? 0 : baoWaterSCStats.legBabyYeti}&r`;
const prosperityLine = `&9|&3|&b| &rProsperity I Book: &6${baoWaterSCStats.prosperityBook == null || isNaN(baoWaterSCStats.prosperityBook) ? 0 : baoWaterSCStats.prosperityBook}&r`;


// ice rod counts
const iceRodsLine = `&9|&3|&b| &rIce Rods: ${baoWaterSCStats.iceRods == null || isNaN(baoWaterSCStats.iceRods) ? 0 : baoWaterSCStats.iceRods} &7(${baoWaterSCStats.iceRods == null || isNaN(baoWaterSCStats.iceRods) ? 0 : formatMoney(baoWaterSCStats.iceRods * 20000)})`;

// winter averages
const averageSCPerYeti = (baoWaterSCStats.totalWinterWaterSCCatches / baoWaterSCStats.yetiCatches).toFixed(2);
const averageSCPerReindrake = (baoWaterSCStats.totalWinterWaterSCCatches / baoWaterSCStats.reindrakeCatches).toFixed(2);
const avgYetiLine = `&9|&3|&b| &rAvg SC/Yeti: &b${averageSCPerYeti == null || isNaN(averageSCPerYeti) ? 0 : averageSCPerYeti}`;
const avgReindrakeLine = `&9|&3|&b| &rAvg SC/Reindrake: &b${averageSCPerReindrake == null || isNaN(averageSCPerReindrake) ? 0 : averageSCPerReindrake}`;



////////////////////////////////////////////////////////////////////////////
// WATER SEA CREATURES (REGULAR) 
////////////////////////////////////////////////////////////////////////////
const waterSCMessages = [
    // hub sc
    /A Squid appeared\./, 
    /You caught a Sea Walker\./, 
    /Pitch darkness reveals a Night Squid\./, 
    /You stumbled upon a Sea Guardian\./, 
    /It looks like you've disrupted the Sea Witch's brewing session\. Watch out, she's furious!/, 
    /You reeled in a Sea Archer/, 
    /The Rider of the Deep has emerged\./, 
    /Huh\? A Catfish!/, 
    /Is this even a fish\? It's the Carrot King!/, 
    /Gross! A Sea Leech!/, 
    /You've discovered a Guardian Defender of the sea\./, 
    /You have awoken the Deep Sea Protector, prepare for a battle!/, 
    /The Water Hydra has come to test your strength\./, 
    /Sea Emperor arises from the depths\./, 
    /Your Chumcap Bucket trembles, it's an Agarimoo\./, 
    /The Agarimoo's fumes are damaging you!/, 

    // desert island sc
    /An Oasis Rabbit appears from the water\./, 
    /An Oasis Sheep appears from the wate\./, 

    // crystal hollows sc
    /A Water Worm surfaces!/, 
    /A Poisoned Water Worm sufarces!/, 
    /An Abyssal Miner breaks out of the water!/, 

    // spooky sc
    /Phew! It's only a Scarecrow\./, 
    /You hear trotting from beneath the waves, you caught a Nightmare\./, 
    /It must be a full moon, a Werewolf appears\./, 
    /The spirit of a long lost Phantom Fisherman has come to haunt you\./, 
    /This can't be! The manifestation of death himself!/, 

    // jerry island sc
    /Frozen Steve fell into the pong long ago, never to resurface\.\.\.until now!/, 
    /It's a snowman! He looks harmless\./, 
    /The Grinch stole Jerry's Gifts\.\.\.get them back!/, 
    /What is this creature\?!/, 
    /You found a forgotten Nutcracker laying beneath the ice\./, 
    /WOAH! A Reindrake was summoned from the depths!/, 

    // shark fest sc
    /A tiny fiin emerges from the water, you've caught a Nurse Shark\./, 
    /You spot a fin as blue as the water it came from, it's a Blue Shark\./, 
    /A striped beast bounds from the depths, the wild Tiger Shark!/, 
    /Hide no longer, a Great White Shark has tracked your sent and thirsts for your blood!/, 
]
waterSCMessages.forEach(msg => {
    registerWhen('chat', timeThis("registerChat cancel waterSCMessages", (event) => {
        cancel(event);
    }), () => getInSkyblock() && World.isLoaded()).setCriteria(msg);
})

// Squid
registerWhen('chat', timeThis("registerChat squid spawned", (event) => {
    baoWaterSCStats.squidCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria('A Squid appeared.');

// Sea Walker
registerWhen('chat', timeThis("registerChat sea walker spawned", (event) => {
    baoWaterSCStats.seaWalkerCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getInCH()) baoWaterSCStats.catchesSinceAbyssalMiner += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria("You caught a Sea Walker.");

// Night Squid
registerWhen('chat', timeThis("registerChat night squid spawned", (event) => {
    baoWaterSCStats.nightSquidCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria('Pitch darkness reveals a Night Squid.');

// Sea Guardian
registerWhen('chat', timeThis("registerChat sea guardian spawned", (event) => {
    baoWaterSCStats.seaGuardianCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getInCH()) baoWaterSCStats.catchesSinceAbyssalMiner += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria('You stumbled upon a Sea Guardian.');

// guardian pet drop
registerWhen('chat', timeThis('registerChat guardian pet ping', (event) => {
    const message = ChatLib.getChatMessage(event, true);
    if (message.includes('&rGuardian') || message.includes('&fGuardian')) baoWaterSCStats.commonGD += 1;
    if (message.includes('&aGuardian')) baoWaterSCStats.uncommonGD += 1;
    if (message.includes('&9Guardian')) baoWaterSCStats.rareGD += 1;
    if (message.includes('&5Guardian')) baoWaterSCStats.epicGD += 1;
    if (message.includes('&6Guardian')) baoWaterSCStats.legGD += 1;
}), () => getInSkyblock() && World.isLoaded()).setCriteria('GREAT CATCH! You found a [Lvl 1] Guardian.');

// Sea Witch
registerWhen('chat', timeThis('registerChat sea witch spawned', (event) => {
    baoWaterSCStats.seaWitchCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getInCH()) baoWaterSCStats.catchesSinceAbyssalMiner += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria("It looks like you've disrupted the Sea Witch's brewing session. Watch out, she's furious!");

// Sea Archer
registerWhen('chat', timeThis('registerChat sea archer spawned', (event) => {
    baoWaterSCStats.seaArcherCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getInCH()) baoWaterSCStats.catchesSinceAbyssalMiner += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria('You reeled in a Sea Archer.');

// Rider of the Deep
registerWhen('chat', timeThis('registerChat rider of the deep spawned', (event) => {
    baoWaterSCStats.rotdCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getInCH()) baoWaterSCStats.catchesSinceAbyssalMiner += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria('The Rider of the Deep has emerged.');

// Catfish
registerWhen('chat', timeThis('registerChat catfish spawned', (event) => {
    baoWaterSCStats.catfishCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getInCH()) baoWaterSCStats.catchesSinceAbyssalMiner += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria('Huh? A Catfish!');

// Carrot King
registerWhen('chat', timeThis('registerChat carrot king spawned', (event) => {
    baoWaterSCStats.carrotKingCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing = 0;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.carrotKingSinceLastClover += 1;
    if (getInCH()) baoWaterSCStats.catchesSinceAbyssalMiner += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria("Is this even a fish? It's the Carrot King!");

// lucky Clovert Core [Carrot King]
registerWhen('chat', timeThis('registerChat lucky clover core message', (mf, event) => {
    baoWaterSCStats.carrotKingSinceLastClover = 0;
    baoWaterSCStats.clover += 1;
}), () => getInSkyblock() && World.isLoaded()).setCriteria("RARE DROP! Lucky Clover Core (+${mf}% ✯ Magic Find)");

// Sea Leech
registerWhen('chat', timeThis('registerChat sea leech spawned', (event) => {
    baoWaterSCStats.seaLeechCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getInCH()) baoWaterSCStats.catchesSinceAbyssalMiner += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria('Gross! A Sea Leech!');

// Guardian Defender
registerWhen('chat', timeThis('registerChat guardian defender spawned', (event) => {
    baoWaterSCStats.guardianDefenderCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getInCH()) baoWaterSCStats.catchesSinceAbyssalMiner += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria("You've discovered a Guardian Defender of the sea.");

// Deep Sea Protector
registerWhen('chat', timeThis('registerChat deep sea protector spawned', (event) => {
    baoWaterSCStats.deepSeaProtectorCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getInCH()) baoWaterSCStats.catchesSinceAbyssalMiner += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria('You have awoken the Deep Sea Protector, prepare for a battle!');

// Water Hydra
registerWhen('chat', timeThis('registerChat water hydra spawned', (event) => {
    baoWaterSCStats.waterHydraCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra = 0;
    if (getInCH()) baoWaterSCStats.catchesSinceAbyssalMiner += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria('The Water Hydra has come to test your strength.');
 
// Sea Emperor
registerWhen('chat', timeThis('registerChat sea emperor spawned', (event) => {
    baoWaterSCStats.seaEmperorCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor = 0;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getInCH()) baoWaterSCStats.catchesSinceAbyssalMiner += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria('Sea Emperor arises from the depths.');

// Flying Fish Pet [Sea Emperor]
registerWhen('chat', timeThis('registerChat flying fish pet message', (mf, event) => {
    const message = ChatLib.getChatMessage(event, true);
    if (message.includes('&rFlying Fish') || message.includes('&fFlying Fish')) baoWaterSCStats.commonFF += 1;
    if (message.includes('&aFlying Fish')) baoWaterSCStats.uncommonFF += 1;
    if (message.includes('&9Flying Fish')) baoWaterSCStats.rareFF += 1;
    if (message.includes('&5Flying Fish')) baoWaterSCStats.epicFF += 1;
    if (message.includes('&6Flying Fish')) baoWaterSCStats.legFF += 1;
}), () => getInSkyblock() && World.isLoaded()).setCriteria('PET DROP! Flying Fish (+${mf}% ✯ Magic Find)');

// Agarimoo
registerWhen('chat', timeThis('registerChat agarimoo spawned', (event) => {
    baoWaterSCStats.agarimooCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    if (getInCH()) baoWaterSCStats.catchesSinceAbyssalMiner += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria("Your Chumcap Bucket trembles, it's an Agarimoo.");


////////////////////////////////////////////////////////////////////////////
// WATER SEA CREATURES (OASIS)
////////////////////////////////////////////////////////////////////////////
// Oasis Rabbit
registerWhen('chat', timeThis('registerChat oasis rabbit spawned', (event) => {
    baoWaterSCStats.oasisRabbitCatches += 1;
    baoWaterSCStats.totalOasisWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
}), () => getInDesert() && getInSkyblock() && World.isLoaded()).setCriteria("An Oasis Rabbit appears from the water.");

// Oasis Sheep
registerWhen('chat', timeThis('registerChat oasis sheep spawned', (event) => {
    baoWaterSCStats.oasisSheepCatches += 1;
    baoWaterSCStats.totalOasisWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
}), () => getInDesert() && getInSkyblock() && World.isLoaded()).setCriteria("An Oasis Sheep appears from the water.");


////////////////////////////////////////////////////////////////////////////
// WATER SEA CREATURES (CRYSTAL HOLLOWS)
////////////////////////////////////////////////////////////////////////////
// Water Worm
registerWhen('chat', timeThis('registerChat water worm spawned', (event) => {
    baoWaterSCStats.waterWormCatches += 1;
    baoWaterSCStats.totalCHWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.abyssalMinerCatches += 1;
}), () => getInCH() && getInSkyblock() && World.isLoaded()).setCriteria("A Water Worm surfaces!");

// Poisoned Water Worm
registerWhen('chat', timeThis('registerChat poisoned water worm spawned', (event) => {
    baoWaterSCStats.poisonedWaterWormCatches += 1;
    baoWaterSCStats.totalCHWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.abyssalMinerCatches += 1;
}), () => getInCH() && getInSkyblock() && World.isLoaded()).setCriteria("A Poisoned Water Worm surfaces!");

// Abyssal Miner
registerWhen('chat', timeThis('registerChat abyssal miner spawned', (event) => {
    baoWaterSCStats.totalCHWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.abyssalMinerCatches = 0;
}), () => getInCH() && getInSkyblock() && World.isLoaded()).setCriteria("An Abyssal Miner breaks out of the water!");


////////////////////////////////////////////////////////////////////////////
// WATER SEA CREATURES (EVENTS :: SPOOKY FESTIVAL)
////////////////////////////////////////////////////////////////////////////
// Scarecrow
registerWhen('chat', timeThis('registerChat scarecrow spawned', (event) => {
    baoWaterSCStats.scarecrowCatches += 1;
    baoWaterSCStats.totalSpookyWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSincePhantomFisher += 1;
    baoWaterSCStats.catchesSinceGrimReaper += 1;
    if (getInCH()) baoWaterSCStats.catchesSinceAbyssalMiner += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria("Phew! It's only a Scarecrow.");

// Nightmare
registerWhen('chat', timeThis('registerChat nightmare spawned', (event) => {
    baoWaterSCStats.nightmareCatches += 1;
    data.totalSpookyWaterSCCatches += 1;
    data.catchesSinceCarrotKing += 1;
    data.catchesSinceSeaEmperor += 1;
    data.catchesSinceWaterHydra += 1;
    data.catchesSincePhantomFisher += 1;
    data.catchesSinceGrimReaper += 1;
    if (getInCH()) baoWaterSCStats.catchesSinceAbyssalMiner += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria("You hear trotting from beneath the waves, you caught a Nightmare.");

// Werewolf
registerWhen('chat', timeThis('registerChat werewolf spawned', (event) => {
    baoWaterSCStats.werewolfCatches += 1;
    data.totalSpookyWaterSCCatches += 1;
    data.catchesSinceCarrotKing += 1;
    data.catchesSinceSeaEmperor += 1;
    data.catchesSinceWaterHydra += 1;
    data.catchesSincePhantomFisher += 1;
    data.catchesSinceGrimReaper += 1;
    if (getInCH()) baoWaterSCStats.catchesSinceAbyssalMiner += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria("It must be a full moon, a Werewolf appears.");

// Phantom Fisher
registerWhen('chat', timeThis('registerChat phantom fisher spawned', (event) => {
    baoWaterSCStats.phantomFisherCatches += 1;
    baoWaterSCStats.totalSpookyWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSincePhantomFisher = 0;
    baoWaterSCStats.catchesSinceGrimReaper += 1;
    if (getInCH()) baoWaterSCStats.catchesSinceAbyssalMiner += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria("The spirit of a long lost Phantom Fisherman has come to haunt you.");

// Grim Reaper
registerWhen('chat', timeThis('registerChat grim reaper spawned', (event) => {
    baoWaterSCStats.grimReaperCatches += 1;
    baoWaterSCStats.totalSpookyWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSincePhantomFisher += 1;
    baoWaterSCStats.catchesSinceGrimReaper = 0;
    if (getInCH()) baoWaterSCStats.catchesSinceAbyssalMiner += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria("This can't be! The manifestation of death himself!");


////////////////////////////////////////////////////////////////////////////
// WATER SEA CREATURES (EVENTS :: WINTER FESTIVAL) -------------------------
////////////////////////////////////////////////////////////////////////////
// Frozen Steve
registerWhen('chat', timeThis('registerChat frozen steve spawned', (event) => {
    baoWaterSCStats.frozenSteveCatches += 1;
    baoWaterSCStats.totalWinterWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSinceYeti += 1;
    baoWaterSCStats.catchesSinceReindrake += 1;
}), () => getInJerry() && getInSkyblock() && World.isLoaded()).setCriteria("Frozen Steve fell into the pond long ago, never to resurface...until now!");

// Frosty the Snowman
registerWhen('chat', timeThis('registerChat frosty spawned', (event) => {
    baoWaterSCStats.frostySnowmanCatches += 1;
    baoWaterSCStats.totalWinterWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSinceYeti += 1;
    baoWaterSCStats.catchesSinceReindrake += 1;
}), () => getInJerry() && getInSkyblock() && World.isLoaded()).setCriteria("It's a snowman! He looks harmless.").setContains();

// Grinch
registerWhen('chat', timeThis('registerChat grinch spawned', (event) => {
    baoWaterSCStats.grinchCatches += 1;
    baoWaterSCStats.totalWinterWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSinceYeti += 1;
    baoWaterSCStats.catchesSinceReindrake += 1;
}), () => getInJerry() && getInSkyblock() && World.isLoaded()).setCriteria("The Grinch stole Jerry's Gifts...get them back!");

// Yeti
registerWhen('chat', timeThis('registerChat yeti spawned', (event) => {
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
}), () => getInJerry() && getInSkyblock() && World.isLoaded()).setCriteria("What is this creature!?");

// Baby Yeti Pet [Yeti]
registerWhen('chat', timeThis('registerChat baby yeti pet message', (mf, event) => {
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
}), () => getInJerry() && getInSkyblock() && World.isLoaded()).setCriteria('PET DROP! Baby Yeti (+${mf}% ✯ Magic Find)');

// Nutcracker
registerWhen('chat', timeThis('registerChat nutcracker spawned', (event) => {
    baoWaterSCStats.nutcrackerCatches += 1;
    baoWaterSCStats.totalWinterWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSinceYeti += 1;
    baoWaterSCStats.catchesSinceReindrake += 1;
}), () => getInJerry() && getInSkyblock() && World.isLoaded()).setCriteria("You found a forgotten Nutcracker laying beneath the ice.");

// Reindrake
registerWhen('chat', timeThis('registerChat reindrake spawned', (event) => {
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
}), () => getInJerry() && getInSkyblock() && World.isLoaded()).setCriteria("A Reindrake forms from the depths.");

// ice rods
registerWhen('chat', timeThis('registerChat sold ice rods message', (event) => {
    baoWaterSCStats.iceRods += 1;
}), () => getInJerry() && getInSkyblock() && World.isLoaded()).setCriteria('You sold Ice Rod x1 for 20,000 Coins!');


////////////////////////////////////////////////////////////////////////////
// WATER SEA CREATURES (EVENTS :: FISHING FESTIVAL) ------------------------
////////////////////////////////////////////////////////////////////////////
// Nurse Shark
registerWhen('chat', timeThis('registerChat nurse shark spawned', (event) => {
    baoWaterSCStats.nurseSharkCatches += 1;
    baoWaterSCStats.totalSharkWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSinceGWShark += 1;
    if (getInCH()) baoWaterSCStats.catchesSinceAbyssalMiner += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria("A tiny fin emerges from the water, you've caught a Nurse Shark.");
    
// Blue Shark
registerWhen('chat', timeThis('registerChat blue shark spawned', (event) => {
    baoWaterSCStats.blueSharkCatches += 1;
    baoWaterSCStats.totalSharkWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSinceGWShark += 1;
    if (getInCH()) baoWaterSCStats.catchesSinceAbyssalMiner += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria("You spot a fin as blue as the water it came from, it's a Blue Shark.");

// Tiger Shark
registerWhen('chat', timeThis('registerChat tiger shark spawned', (event) => {
    baoWaterSCStats.tigerSharkCatches += 1;
    baoWaterSCStats.totalSharkWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSinceGWShark += 1;
    if (getInCH()) baoWaterSCStats.catchesSinceAbyssalMiner += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria("A striped beast bounds from the depths, the wild Tiger Shark!");

// Great White Shark
registerWhen('chat', timeThis('registerChat great white shark spawned', (event) => {
    baoWaterSCStats.gwSharkCatches += 1;
    baoWaterSCStats.totalSharkWaterSCCatches += 1;
    baoWaterSCStats.catchesSinceCarrotKing += 1;
    baoWaterSCStats.catchesSinceSeaEmperor += 1;
    baoWaterSCStats.catchesSinceWaterHydra += 1;
    baoWaterSCStats.catchesSinceGWShark = 0;
    if (getInCH()) baoWaterSCStats.catchesSinceAbyssalMiner += 1;
    if (getInJerry()) {
        baoWaterSCStats.catchesSinceYeti += 1;
        baoWaterSCStats.catchesSinceReindrake += 1;
        baoWaterSCStats.totalWinterWaterSCCatches += 1;
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria("Hide no longer, a Great White Shark has tracked your scent and thirsts for your blood!");

// reg steps 
register('step', timeThis("registerStep updating HUB DisplayText", () => {
    if (!getInSkyblock() || !World.isLoaded() || !getInHub()) return;
    const generalTitle = Settings.kills_fishingcounter || Settings.mob_since_fishingcounter || Settings.drops_fishingcounter || Settings.tracker_fishingcounter || Settings.avgs_fishingcounter ? `&r  <--]|| &fGENERAL &r||[-->\n${hubSepThick}` : '';
    
    const showHubKills = Settings.kills_fishingcounter ? [squidLine, seaWalkerLine, seaGuardianLine, seaWitchLine, seaArcherLine, rotdLine, catfishLine, seaLeechLine, guardianDefenderLine, dspLine, agarimooLine, carrotKingLine, waterHydraLine, seaEmpLine, hubSepThin].join('\n') : '';
    
    const showHubDrops = Settings.drops_fishingcounter ? [cloverDropsLine, flyingFishDropsLine, guardianDropsLine, hubSepThin].join('\n') : '';

    const showMobSinceTrackers = Settings.mob_since_fishingcounter ? [carrotKingSinceLastCloverLine, hubSepThin].join('\n') : '';

    const showHubTrackers = Settings.tracker_fishingcounter ? [scSinceCarrotKing, scSinceWaterHydra, scSinceSeaEmperor, hubSepThin].join('\n') : '';
    
    const showHubAverages = Settings.avgs_fishingcounter ? [avgCarrotKingLine, avgWaterHydraLine, avgSeaEmperorLine, hubSepThin].join('\n') : '';
    
    const HubDisplayRaw = [generalTitle, showHubKills, showHubDrops, showMobSinceTrackers, showHubTrackers, showHubAverages].join('\n').replace(/\n{6,}/g, '\n');

    baoWaterSCStats.HUBDisplay = filterSeparators(HubDisplayRaw, hubSepThin)
})).setFps(1);

register('step', timeThis("registerStep updating WI DisplayText", () => {
    if (!getInSkyblock() || !World.isLoaded() || !getInJerry()) return;
    const winterTitle = Settings.kills_fishingcounter || Settings.mob_since_fishingcounter || Settings.drops_fishingcounter || Settings.tracker_fishingcounter || Settings.avgs_fishingcounter || Settings.elapsed_sincefishingcounter || Settings.specials_fishingcounter ? `&8|&1|&9|&3|&b| &rWinter Island &b|&3|&9|&1|&8|\n${winterSepThick}` : '';

    // winter time
    baoWaterSCStats.timeSinceEpicPet += 1;
    baoWaterSCStats.timeSinceLegPet += 1;
    baoWaterSCStats.timeSinceReindrake += 1;
    let timeSinceEpicPetLine = updateCDText('', '&9|&3|&b| &rTime Since Epic Pet', baoWaterSCStats.timeSinceEpicPet);
    let timeSinceLegPetLine = updateCDText('', '&9|&3|&b| &rTime Since Leg Pet', baoWaterSCStats.timeSinceLegPet);
    let timeSinceReinLine = updateCDText('', '&9|&3|&b| &rTime Since Reindrake', baoWaterSCStats.timeSinceReindrake);

    const showWIKills = Settings.kills_fishingcounter ? [frozenSteveLine, frostySnowmanLine, grinchLine, nutcrackerLine, yetiLine, reindrakeLine, winterSepThin].join('\n') : '';

    const showWITrackers = Settings.tracker_fishingcounter ? [scSinceYetiLine, scSinceReindrakeLine, winterSepThin].join('\n') : '';

    const showMobSinceTrackers = Settings.mob_since_fishingcounter ? [yetiSincePetLine, winterSepThin].join('\n') : '';

    const showWIDrops = Settings.drops_fishingcounter ? [yetiPetLine, prosperityLine, winterSepThin].join('\n') : '';

    const showWIAverages = Settings.avgs_fishingcounter ? [avgYetiLine, avgReindrakeLine, winterSepThin].join('\n') : '';

    const timeSincePetLine = Settings.elapsed_sincefishingcounter ? [`${timeSinceEpicPetLine}${timeSinceLegPetLine}${timeSinceReinLine}`, winterSepThin].join('\n') : '';

    const showIceRodCounter = Settings.specials_fishingcounter ? [iceRodsLine, winterSepThin].join('\n') : ''

    const WIDisplayRaw = [winterTitle, showWIKills, showWITrackers, showMobSinceTrackers, showWIDrops, showWIAverages, timeSincePetLine, showIceRodCounter].join('\n').replace(/\n{6,}/g, '\n');

    baoWaterSCStats.WIDisplay = filterSeparators(WIDisplayRaw, winterSepThin);
})).setFps(1);

import Settings from '../settings.js';
import Audio from '../utils/audio.js';

import { petDropPing, pingDolphinMS, playSound, registerSettingContains } from '../utils/functions.js';
import { sendMessage } from '../utils/party.js';
import { showAlert } from '../utils/utils.js';
import { getInSkyblock } from '../utils/functions.js'; // sb, area
import { baoWaterSCStats } from './waterSCStats.js';
import { baoLavaSCStats } from './lavaSCStats.js';

register('command', () => {
    playSound();
}).setName('rngtest');

////////////////////////////////////////////////////////////////////////////////
// SETUP CONSTS
////////////////////////////////////////////////////////////////////////////////
const fishPingAudio = new Audio();


////////////////////////////////////////////////////////////////////////////////
// TITLES ----------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
const jawbusTitle = '&4JAWBUS';
const rvialTitle = '&dRadioactive Vial';
const thunderTitle = "&bTHUNDER";
const vanqTitle = '&5Vanquisher';
const phlegTitle = '&4Phlegblast';
const yetiTitle = '&fYETI';
const nutcrackerTitle = '&7Nutcracker';
const reinTitle = '&cReindrake';
const gwTitle = '&3Great White';
const phantomTitle = '&dPhantom Fisher';
const grimTitle = '&5GRIM REAPER';
const dsoTitle = '&5Deep Sea Orb';
const phantomRodTitle = '&6Phantom Rod';
const luckyHoofTitle = '&aLucky Hoof';
const seaEmpTitle = '&6Sea Emperor';
const carrotKingTitle = '&6Carrot King';
const luckyCloverCoreTitle = '&5Lucky Clover Core';
const waterHydraTitle = '&1Hydra';
const abyssalMinerTitle = '&6Abyssal Miner';

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


////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////
function handleBetterFishingMsgs(event, message) {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (Settings.betterFishingMessages) cancel(event);
    if (message) ChatLib.chat(message);
}

function handleFishingPing(givSet1, givSet2, alert, message, cancel=false, event=null) {
    if (!getInSkyblock() || !World.isLoaded() || !givSet1) return;
    if (givSet2 !== null && !givSet2) return;
    if (cancel) cancel(event);
    if (alert) showAlert(alert);
    if (message) sendMessage(message);
}

function handlePetDropMsg(givSet1, givSet2, event) {
    if (!getInSkyblock() || !World.isLoaded() || !givSet1) return;
    if (givSet2 !== null && !givSet2) return;
    return ChatLib.getChatMessage(event, true);
}

////////////////////////////////////////////////////////////////////////////
// BETTER FISHING MESSAGES
////////////////////////////////////////////////////////////////////////////
register('chat', (AOrAn, baitType, event) => {
    handleBetterFishingMsgs(event);
}).setCriteria('GOOD CATCH! You found ${AOrAn} ${baitType} Bait.');

register('chat', (coin, event) => {
    handleBetterFishingMsgs(event, `&7+ &6${coin} &7coins`);
}).setCriteria('GOOD CATCH! You found ${coin} Coins.');

register('chat', (typeOfCatch, aOrAn, item, event) => {
    handleBetterFishingMsgs(event);
    if (item === 'Lava Shell') ChatLib.chat('&a+ &5Lava Shell');
}).setCriteria('${typeOfCatch} CATCH! You found ${aOrAn} ${item}.');

register('chat', (event) => {
    handleBetterFishingMsgs(event);
}).setCriteria('Your Blessing enchant got you double drops!');

register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (Settings.hideDHMessages) cancel(event);
}).setCriteria("It's a Double Hook!").setContains();


////////////////////////////////////////////////////////////////////////////////
/* Fishing @ Crimson Isles -----------------------------------------------------
* Purpose: Shows Pings for mobs fished up in the Crimson Isles
 ------------------------------------------------------------------------------*/
////////////////////////////////////////////////////////////////////////////////
// Jawbus extra pings
registerSettingContains(Settings.jawbusPing, 'Lord Jawbus Spawned!', jawbusTitle);
registerSettingContains(Settings.jawbusPing, 'Jawbus alert', jawbusTitle);

// Jawbus default ping
register('chat', (event) => {
    handleFishingPing(Settings.jawbusPing, null, jawbusTitle, `[!] Jawbus [!] (${baoLavaSCStats.catchesSinceJawbus})`);
    fishPingAudio.playDefaultSound();
}).setCriteria("You have angered a legendary creature... Lord Jawbus has arrived.");

// Radioactive Vial [Jawbus]
register('chat', (mf, event) => {
    handleFishingPing(Settings.jawbusPing, Settings.rvialPing, rvialTitle, `ay RARE DROP! Radioactive Vial (+${mf}% ✯ Magic Find)`);
    playSound();
}).setCriteria("RARE DROP! Radioactive Vial (+${mf}% ✯ Magic Find)");

// Thunder extra pings
registerSettingContains(Settings.thunderPing, 'Thunder Spawned!', thunderTitle);
registerSettingContains(Settings.thunderPing, 'Thunder alert', thunderTitle);

// Thunder default ping
register('chat', (event) => {
    handleFishingPing(Settings.thunderPing, null, thunderTitle, `[!] Thunder [!] (${baoLavaSCStats.catchesSinceThunder})`);
    fishPingAudio.playDefaultSound();
}).setCriteria('You hear a massive rumble as Thunder emerges.');

// Vanquisher extra pings
registerSettingContains(Settings.vanqPing, 'Vanquisher Spawned!', vanqTitle);

// Vanquisher default ping
register('chat', (event) => {
    handleFishingPing(Settings.vanqPing, null, vanqTitle, '[!] Vanquisher [!]');
    fishPingAudio.playDefaultSound();
}).setCriteria('A Vanquisher is spawning nearby!');

// Phlegblast default ping
register('chat', (event) => {
    handleFishingPing(Settings.phlegPing, null, phlegTitle, '[!] Phlegblast [!]');
    fishPingAudio.playDefaultSound();
}).setCriteria('WOAH! A Phlegblast appared.');


////////////////////////////////////////////////////////////////////////////////
/* Fishing @ Winter Island -----------------------------------------------------
* Purpose: Shows Pings for mobs fished up in the Winter Island
 ------------------------------------------------------------------------------*/
////////////////////////////////////////////////////////////////////////////////
//Yeti default ping
register('chat', (event) => {
    handleFishingPing(Settings.yetiPing, null, yetiTitle, `[!] Baba Yeti [!] (${baoWaterSCStats.catchesSinceYeti} kills)`);
    fishPingAudio.playDefaultSound();
}).setCriteria('What is this creature!?');

// Baby Yeti Pet [Yeti]
register('chat', (mf, event) => {
    const message = handlePetDropMsg(Settings.yetiPing, Settings.babyYetiPing, event)
    petDropPing(message, 'PET DROP!', 'Baby Yeti', mf);
}).setCriteria('PET DROP! Baby Yeti (+${mf}% ✯ Magic Find)');

// Nutcracker default ping
register('chat', (event) => {
    handleFishingPing(Settings.nutcrackerPing, null, nutcrackerTitle, '[!] Nootkracker [!]');
    fishPingAudio.playDefaultSound();
}).setCriteria('You found a forgotten Nutcracker laying beneath the ice.');

// Reindrake default ping
register('chat', (event) => { // player fishes up a reindrake
    handleFishingPing(Settings.reinPing, null, reinTitle, `[!] Reindrake [!] (${baoWaterSCStats.catchesSinceReindrake} kills)`);
    playSound();
}).setCriteria('A Reindrake forms from the depths.');

// Reindrake extra pings
register('chat', (event) => { // someone else fished up a reindrake
    handleFishingPing(Settings.reinPing, null, reinTitle, null);
    fishPingAudio.playDefaultSound();
}).setCriteria('WOAH! A Reindrake was summoned from the depths!');


////////////////////////////////////////////////////////////////////////////////
/* Fishing @ Hub Shark -----------------------------------------------------
* Purpose: Shows Pings for mobs fished up in the Hub Shark
 ------------------------------------------------------------------------------*/
////////////////////////////////////////////////////////////////////////////////
// Great White Shark default ping
register('chat', (event) => {
    handleFishingPing(Settings.gwPing, null, gwTitle, '[!] Great White Shark [!]');
    playSound();
}).setCriteria('Hide no longer, a Great White Shark has tracked your scent and thirsts for your blood!');

// Megalodon Pet [Great White Shark / Tiger Shark]
register('chat', (mf, event) => {
    const message = handlePetDropMsg(Settings.gwPing, Settings.megPetPing, event)
    petDropPing(message, 'PET DROP!', 'Megalodon', mf);
}).setCriteria('PET DROP! Megalodon (+${mf}% ✯ Magic Find)');


////////////////////////////////////////////////////////////////////////////////
/* Fishing @ Hub - Spooky -----------------------------------------------------
* Purpose: Shows Pings for mobs fished up in the Hub - Spooky
 ------------------------------------------------------------------------------*/
////////////////////////////////////////////////////////////////////////////////
// Phantom Fisher default ping
register('chat', (event) => {
    handleFishingPing(Settings.phantomFisherPing, null, phantomTitle, '[!] Phantom Fisher [!]');
    fishPingAudio.playDefaultSound();
}).setCriteria('The spirit of a long lost Phantom Fisher has come to haunt you.');

// Grim Reaper default ping
register('chat', (event) => {
    handleFishingPing(Settings.grimReaperPing, null, grimTitle, '[!] Gwim Weeper [!]');
    fishPingAudio.playDefaultSound();
}).setCriteria("This can't be! The manifestation of death himself!");

// Deep Sea Orb [Phantom Fisher / Grim Reaper]
register('chat', (mf, event) => {
    handleFishingPing(Settings.deepSeaOrbPing, null, dsoTitle, `RARE DROP! Deep Sea Orb (+${mf}% ✯ Magic Find)`);
    playSound();
}).setCriteria('RARE DROP! Deep Sea Orb (+${mf}% ✯ Magic Find)');

// Phantom Rod [Phantom Fisher]
register('chat', (mf, event) => {
    handleFishingPing(Settings.phantomRodPing, null, phantomRodTitle, `RARE DROP! Phantom Rod (+${mf}% ✯ Magic Find)`);
    fishPingAudio.playDefaultSound();
}).setCriteria('RARE DROP! Phantom Rod (+${mf}% ✯ Magic Find)');

// Lucky Hoof [Nightmare]
register('chat', (mf, event) => {
    handleFishingPing(Settings.luckyHoofPing, null, luckyHoofTitle, `RARE DROP! Lucky Hoof (+${mf}% ✯ Magic Find)`);
    fishPingAudio.playDefaultSound();
}).setCriteria('RARE DROP! Lucky Hoof (+${mf}% ✯ Magic Find)');


////////////////////////////////////////////////////////////////////////////////
/* Fishing @ Hub ---------------------------------------------------------------
* Purpose: Shows Pings for mobs fished up in the Hub
 ------------------------------------------------------------------------------*/
////////////////////////////////////////////////////////////////////////////////
// Sea Emperor default ping
register('chat', (event) => {
    handleFishingPing(Settings.seaEmpPing, null, seaEmpTitle, '[!] Sea Emperor [!]');
    fishPingAudio.playDefaultSound();
}).setCriteria('The Sea Emperor arises from the depths.');

// Flying Fish Pet [Sea Emperor]
register('chat', (mf, event) => {
    const message = handlePetDropMsg(Settings.seaEmpPing, Settings.flyingFishPing, event)
    petDropPing(message, 'PET DROP!', 'Flying Fish', mf);
}).setCriteria('PET DROP! Flying Fish (+${mf}% ✯ Magic Find)');

// Carrot King extra pings
registerSettingContains(Settings.carrot_king_ping, 'A Carrot King has spawned', carrotKingTitle);
registerSettingContains(Settings.carrot_king_ping, 'Carrot King!', carrotKingTitle);

// Carrot King default ping
register('chat', (event) => {
    handleFishingPing(Settings.carrotKingPing, null, carrotKingTitle, '[!] Hop! A Carrot King! [!]');
    fishPingAudio.playDefaultSound();
}).setCriteria("Is this even a fish? It's the Carrot King!");

// lucky Clovert Core [Carrot King]
register('chat', (mf, event) => {
    handleFishingPing(Settings.carrotKingPing, Settings.luckyCloverCorePing, luckyCloverCoreTitle, `RARE DROP! Lucky CLover Core (+${mf}% ✯ Magic Find)`);
    playSound();
}).setCriteria("RARE DROP! Lucky Clover Core (+${mf}% ✯ Magic Find)");

// Water Hydra default ping
register('chat', (event) => {
    handleFishingPing(Settings.waterHydraPing, null, waterHydraTitle, '[!] Water Hydra [!]');
    fishPingAudio.playDefaultSound();
}).setCriteria("The Water Hydra has come to test your strength.");

// guardian pet drop
register('chat', (event) => {
    const message = handlePetDropMsg(Settings.guardianPetPing, null, event);
    petDropPing(message, 'GREAT CATCH!', 'Guardian', 0);
}).setCriteria('GREAT CATCH! You found a [Lvl 1] Guardian.');

// dolphin milestone pet drop
register('chat', (killCount, event) => {
    if (!getInSkyblock() || !World.isLoaded() || !Settings.dolphinMSPetPing) return;
    pingDolphinMS(killCount);
}).setCriteria('You have reached a new Sea Creature Kill Milestone of ${killCount} kills!');

// squid pet drop
register('chat', (event) => {
    const message = handlePetDropMsg(Settings.squidPetPing, null, event);
    petDropPing(message, 'GREAT CATCH!', 'Squid', 0);
}).setCriteria('GREAT CATCH! You found a [Lvl 1] Squid.');



////////////////////////////////////////////////////////////////////////////////
/* Fishing @ Others > Crystal Hollows ---------------------------------------------
* Purpose: Shows Pings for mobs fished up in the Crystal Hollows
 ------------------------------------------------------------------------------*/
////////////////////////////////////////////////////////////////////////////////
// Abyssal Miner
register('chat', (event) => {
    handleFishingPing(Settings.zombieMinerPing, null, abyssalMinerTitle, '[!] Abyssal Miner [!]');
    fishPingAudio.playDefaultSound();
}).setCriteria("An Abyssal Miner breaks out of the water!");


////////////////////////////////////////////////////////////////////////////////
/* Fishing - Others > Fawe Pings --------------------------------------------------
* Purpose: Shows Title & Sound pings for fawe messages (up to date for v2.0.5)
 ------------------------------------------------------------------------------*/
////////////////////////////////////////////////////////////////////////////////
registerSettingContains(Settings.fawePings, 'A Jawbus has spawned', jawbusTitle);
registerSettingContains(Settings.fawePings, 'A Thunder has spawned', thunderTitle);
registerSettingContains(Settings.fawePings, 'A YETI has spawned', yetiTitle);
registerSettingContains(Settings.fawePings, 'A Vanquisher has spawned', vanqTitle);
registerSettingContains(Settings.fawePings, 'A Great White Shark has spawned', gwTitle);
registerSettingContains(Settings.fawePings, 'A Phantom Fisher has spawned', phantomTitle);
registerSettingContains(Settings.fawePings, 'A GRIM REAPER has spawned', grimTitle);
registerSettingContains(Settings.fawePings, 'A Sea Emperor has spawned', seaEmpTitle);
registerSettingContains(Settings.fawePings, 'Nut in comming', nutcrackerTitle);
registerSettingContains(Settings.fawePings, 'A Carrot King has spawned', carrotKingTitle);


////////////////////////////////////////////////////////////////////////////////
// NEXT THING IG ---------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
// sendMessage('');
import Settings from '../settings.js';
import Audio from '../utils/audio.js';

import { petDropPing, pingDolphinMS, playSound, registerSettingContains } from '../utils/functions.js';
import { sendMessage } from '../utils/party.js';
import { showAlert } from '../utils/utils.js';
import { getInSkyblock } from '../utils/functions.js'; // sb, area
import { baoWaterSCStats } from './waterSCStats.js';
import { baoLavaSCStats } from './lavaSCStats.js';

register('command', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    playSound();
}).setName('rngtest');

////////////////////////////////////////////////////////////////////////////////
// SETUP CONSTS
////////////////////////////////////////////////////////////////////////////////
const fishPingAudio = new Audio();


////////////////////////////////////////////////////////////////////////////////
// TITLES ----------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
const jawbus_title = '&4JAWBUS';
const rvial_title = '&dRadioactive Vial';
const thunder_title = "&bTHUNDER";
const vanq_title = '&5Vanquisher';
const phleg_title = '&4Phlegblast';
const yeti_title = '&fYETI';
const nutcracker_title = '&7Nutcracker';
const rein_title = '&cReindrake';
const gw_title = '&3Great White';
const phantom_title = '&dPhantom Fisher';
const grim_title = '&5GRIM REAPER';
const dso_title = '&5Deep Sea Orb';
const phantom_rod_title = '&6Phantom Rod';
const hoof_title = '&aLucky Hoof';
const emp_title = '&6Sea Emperor';
const carrot_title = '&6Carrot King';
const clover_core_title = '&5Lucky Clover Core';
const hydra_title = '&1Hydra';
const zb_miner_title = '&6Abyssal Miner';

// toggle all fishing pings command
register('command', () => {
    // code goes here
}).setName('togglefishingpings');



// QOL

////////////////////////////////////////////////////////////////////////////
// BETTER FISHING MESSAGES
////////////////////////////////////////////////////////////////////////////
register('chat', (AOrAn, baitType, event) => {
    if (Settings.betterFishingMessages) cancel(event);
}).setCriteria('GOOD CATCH! You found ${AOrAn} ${baitType} Bait.');

register('chat', (coin, event) => {
    if (Settings.betterFishingMessages) {
        cancel(event);
        ChatLib.chat(`&7+ &6${coin} &7coins`);
    }
}).setCriteria('GOOD CATCH! You found ${coin} Coins.');

register('chat', (typeOfCatch, aOrAn, item, event) => {
    if (Settings.betterFishingMessages) {
        cancel(event);
        if (item === 'Lava Shell') ChatLib.chat('&a+ &5Lava Shell');
    }
}).setCriteria('${typeOfCatch} CATCH! You found ${aOrAn} ${item}.');

register('chat', (event) => {
    if (Settings.betterFishingMessages) cancel(event);
}).setCriteria('Your Blessing enchant got you double drops!');

register('chat', (event) => {
    if (Settings.hideDHMessages) cancel(event);
}).setCriteria("It's a Double Hook!").setContains();


////////////////////////////////////////////////////////////////////////////////
/* Fishing @ Crimson Isles -----------------------------------------------------
* Purpose: Shows Pings for mobs fished up in the Crimson Isles
 ------------------------------------------------------------------------------*/
////////////////////////////////////////////////////////////////////////////////
// Jawbus extra pings
registerSettingContains(Settings.jawbus_ping, 'Lord Jawbus Spawned!', jawbus_title);
registerSettingContains(Settings.jawbus_ping, 'Jawbus alert', jawbus_title);

// Jawbus default ping
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.jawbus_ping) return;
    showAlert(jawbus_title);
    sendMessage(`[!] Jawbus [!] (${baoLavaSCStats.catchesSinceJawbus})`);
    fishPingAudio.playDefaultSound();
}).setCriteria("You have angered a legendary creature... Lord Jawbus has arrived.");

// Radioactive Vial [Jawbus]
register('chat', (mf, event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.jawbus_ping) return;
    if (!Settings.rvial_ping) return;
    showAlert(rvial_title);
    sendMessage(`ay RARE DROP! Radioactive Vial (+${mf}% ✯ Magic Find)`);
    playSound();
}).setCriteria("RARE DROP! Radioactive Vial (+${mf}% ✯ Magic Find)");

// Thunder extra pings
registerSettingContains(Settings.thunder_ping, 'Thunder Spawned!', thunder_title);
registerSettingContains(Settings.thunder_ping, 'Thunder alert', thunder_title);

// Thunder default ping
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.thunder_ping) return;
    showAlert(thunder_title);
    sendMessage(`[!] Thunder [!] (${baoLavaSCStats.catchesSinceThunder})`);
    fishPingAudio.playDefaultSound();
}).setCriteria('You hear a massive rumble as Thunder emerges.');

// Vanquisher extra pings
registerSettingContains(Settings.vanq_ping, 'Vanquisher Spawned!', vanq_title);

// Vanquisher default ping
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.vanq_ping) return;
    cancel(event);
    showAlert(vanq_title);
    sendMessage('[!] Vanquisher [!]');
    fishPingAudio.playDefaultSound();
}).setCriteria('A Vanquisher is spawning nearby!');

// Phlegblast default ping
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.phleg_ping) return;
    showAlert(phleg_title);
    sendMessage('[!] Phlegblast [!]');
    fishPingAudio.playDefaultSound();
}).setCriteria('WOAH! A Phlegblast appared.');


////////////////////////////////////////////////////////////////////////////////
/* Fishing @ Winter Island -----------------------------------------------------
* Purpose: Shows Pings for mobs fished up in the Winter Island
 ------------------------------------------------------------------------------*/
////////////////////////////////////////////////////////////////////////////////
//Yeti default ping
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.yeti_ping) return;
    showAlert(yeti_title);
    sendMessage(`[!] Baba Yeti [!] (${baoWaterSCStats.catchesSinceYeti} kills)`);
    fishPingAudio.playDefaultSound();
}).setCriteria('What is this creature!?');

// Baby Yeti Pet [Yeti]
register('chat', (mf, event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.yeti_ping) return;
    if (!Settings.yeti_pet_drop_ping) return;
    const message = ChatLib.getChatMessage(event, true);
    petDropPing(message, 'PET DROP!', 'Baby Yeti', mf);
}).setCriteria('PET DROP! Baby Yeti (+${mf}% ✯ Magic Find)');

// yeti rod ls
register('chat', (mf, event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    sendMessage(`Loot Share: RARE DROP! Yeti Rod (+${mf}% ✯ Magic Find)`);
    fishPingAudio.playDefaultSound();
}).setCriteria('RARE DROP! Yeti Rod (+${mf}% ✯ Magic Find)');

// Nutcracker default ping
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.nutcracker_ping) return;
    showAlert(nutcracker_title);
    sendMessage('[!] Nootkracker [!]');
    fishPingAudio.playDefaultSound();
}).setCriteria('You found a forgotten Nutcracker laying beneath the ice.');

// Reindrake default ping
register('chat', (event) => { // player fishes up a reindrake
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.rein_ping) return;
    showAlert(rein_title);
    sendMessage(`[!] Reindrake [!] (${baoWaterSCStats.catchesSinceReindrake} kills)`);
    playSound();
}).setCriteria('A Reindrake forms from the depths.');

// Reindrake extra pings
register('chat', (event) => { // someone else fished up a reindrake
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.rein_ping) return;
    showAlert(rein_title);
    fishPingAudio.playDefaultSound();
}).setCriteria('WOAH! A Reindrake was summoned from the depths!');


////////////////////////////////////////////////////////////////////////////////
/* Fishing @ Hub Shark -----------------------------------------------------
* Purpose: Shows Pings for mobs fished up in the Hub Shark
 ------------------------------------------------------------------------------*/
////////////////////////////////////////////////////////////////////////////////
// Great White Shark default ping
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.gw_ping) return;
    showAlert(gw_title);
    sendMessage('[!] Great White Shark [!]');
    playSound();
}).setCriteria('Hide no longer, a Great White Shark has tracked your scent and thirsts for your blood!');

// Megalodon Pet [Great White Shark / Tiger Shark]
register('chat', (mf, event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.gw_ping) return;
    if (!Settings.meg_pet_drop_ping) return;
    const message = ChatLib.getChatMessage(event, true);
    petDropPing(message, 'PET DROP!', 'Megalodon', mf);
}).setCriteria('PET DROP! Megalodon (+${mf}% ✯ Magic Find)');


////////////////////////////////////////////////////////////////////////////////
/* Fishing @ Hub - Spooky -----------------------------------------------------
* Purpose: Shows Pings for mobs fished up in the Hub - Spooky
 ------------------------------------------------------------------------------*/
////////////////////////////////////////////////////////////////////////////////
// Phantom Fisher default ping
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.phantom_fisher_ping) return;
    showAlert(phantom_title);
    sendMessage('[!] Phantom Fisher [!]');
    fishPingAudio.playDefaultSound();
}).setCriteria('The spirit of a long lost Phantom Fisher has come to haunt you.');

// Grim Reaper default ping
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.grim_reaper_ping) return;
    showAlert(grim_title);
    sendMessage('[!] Gwim Weeper [!]');
    fishPingAudio.playDefaultSound();
}).setCriteria("This can't be! The manifestation of death himself!");

// Deep Sea Orb [Phantom Fisher / Grim Reaper]
register('chat', (mf, event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.dso_ping) return;
    showAlert(dso_title);
    sendMessage(`RARE DROP! Deep Sea Orb (+${mf}% ✯ Magic Find)`);
    playSound();
}).setCriteria('RARE DROP! Deep Sea Orb (+${mf}% ✯ Magic Find)');

// Phantom Rod [Phantom Fisher]
register('chat', (mf, event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.phan_rod_ping) return;
    showAlert(phantom_rod_title);
    sendMessage(`RARE DROP! Phantom Rod (+${mf}% ✯ Magic Find)`);
    fishPingAudio.playDefaultSound();
}).setCriteria('RARE DROP! Phantom Rod (+${mf}% ✯ Magic Find)');

// Lucky Hoof [Nightmare]
register('chat', (mf, event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.hoof_ping) return; 
    showAlert(hoof_title);
    sendMessage(`RARE DROP! Lucky Hoof (+${mf}% ✯ Magic Find)`);
    fishPingAudio.playDefaultSound();
}).setCriteria('RARE DROP! Lucky Hoof (+${mf}% ✯ Magic Find)');


////////////////////////////////////////////////////////////////////////////////
/* Fishing @ Hub ---------------------------------------------------------------
* Purpose: Shows Pings for mobs fished up in the Hub
 ------------------------------------------------------------------------------*/
////////////////////////////////////////////////////////////////////////////////
// Sea Emperor default ping
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.sea_emp_ping) return;
    showAlert(emp_title);
    sendMessage('[!] Sea Emperor [!]');
    fishPingAudio.playDefaultSound();
}).setCriteria('The Sea Emperor arises from the depths.');

// Flying Fish Pet [Sea Emperor]
register('chat', (mf, event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.ff_pet_drop_ping) return;
    ChatLib.chat('ff pet drop ping run..')
    const message = ChatLib.getChatMessage(event, true);
    petDropPing(message, 'PET DROP!', 'Flying Fish', mf);
}).setCriteria('PET DROP! Flying Fish (+${mf}% ✯ Magic Find)');

// Carrot King extra pings
registerSettingContains(Settings.carrot_king_ping, 'A Carrot King has spawned', carrot_title);
registerSettingContains(Settings.carrot_king_ping, 'Carrot King!', carrot_title);

// Carrot King default ping
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.carrot_king_ping) return;
    showAlert(carrot_title);
    sendMessage('[!] Hop! A Carrot King! [!]');
    fishPingAudio.playDefaultSound();
}).setCriteria("Is this even a fish? It's the Carrot King!");

// lucky Clovert Core [Carrot King]
register('chat', (mf, event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.carrot_king_ping) return;
    if (!Settings.lucky_core_ping) return;
    showAlert(clover_core_title);
    sendMessage(`ay RARE DROP! Lucky CLover Core (+${mf}% ✯ Magic Find)`);
    playSound();
}).setCriteria("RARE DROP! Lucky Clover Core (+${mf}% ✯ Magic Find)");

// Water Hydra default ping
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.hydra_ping) return;
    showAlert(hydra_title);
    sendMessage('[!] Water Hydra, hit for bestiary lol [!]');
    fishPingAudio.playDefaultSound();
}).setCriteria("The Water Hydra has come to test your strength.");

// guardian pet drop
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.guardian_pet_drop_ping) return;
    const message = ChatLib.getChatMessage(event, true);
    petDropPing(message, 'GREAT CATCH!', 'Guardian', 0);
}).setCriteria('GREAT CATCH! You found a [Lvl 1] Guardian.');

// dolphin milestone pet drop
// dolphin_ms_pet_drop_ping
register('chat', (killCount, event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.dolphin_ms_pet_drop_ping) return;
    const kills = killCount.replace(/,/g, '');
    const numKills = Number(kills);
    pingDolphinMS(numKills);
}).setCriteria('You have reached a new Sea Creature Kill Milestone of ${killCount} kills!');

// squid pet drop
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.squid_pet_drop_ping) return;
    const message = ChatLib.getChatMessage(event, true);
    petDropPing(message, 'GREAT CATCH!', 'Squid', 0);
}).setCriteria('GREAT CATCH! You found a [Lvl 1] Squid.');



////////////////////////////////////////////////////////////////////////////////
/* Fishing @ Others > Crystal Hollows ---------------------------------------------
* Purpose: Shows Pings for mobs fished up in the Crystal Hollows
 ------------------------------------------------------------------------------*/
////////////////////////////////////////////////////////////////////////////////
// Abyssal Miner
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.zb_miner_ping) return;
    showAlert(zb_miner_title);
    sendMessage('[!] Abyssal Miner [!]');
    fishPingAudio.playDefaultSound();
}).setCriteria("An Abyssal Miner breaks out of the water!");


////////////////////////////////////////////////////////////////////////////////
/* Fishing - Others > Fawe Pings --------------------------------------------------
* Purpose: Shows Title & Sound pings for fawe messages (up to date for v2.0.5)
 ------------------------------------------------------------------------------*/
////////////////////////////////////////////////////////////////////////////////
registerSettingContains(Settings.fawe_pings, 'A Jawbus has spawned', jawbus_title);
registerSettingContains(Settings.fawe_pings, 'A Thunder has spawned', thunder_title);
registerSettingContains(Settings.fawe_pings, 'A YETI has spawned', yeti_title);
registerSettingContains(Settings.fawe_pings, 'A Vanquisher has spawned', vanq_title);
registerSettingContains(Settings.fawe_pings, 'A Great White Shark has spawned', gw_title);
registerSettingContains(Settings.fawe_pings, 'A Phantom Fisher has spawned', phantom_title);
registerSettingContains(Settings.fawe_pings, 'A GRIM REAPER has spawned', grim_title);
registerSettingContains(Settings.fawe_pings, 'A Sea Emperor has spawned', emp_title);
registerSettingContains(Settings.fawe_pings, 'Nut in comming', nutcracker_title);
registerSettingContains(Settings.fawe_pings, 'A Carrot King has spawned', carrot_title);


////////////////////////////////////////////////////////////////////////////////
// NEXT THING IG ---------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
// sendMessage('');
import Settings from '../settings.js';
import Audio from '../utils/audio.js';

import { petDropPing, playSound } from '../utils/functions.js';
import { sendMessage, stripRank } from '../utils/party.js';
import { showAlert } from '../utils/utils.js';
import { getInSkyblock, getInMines } from '../utils/functions.js'; // sb, area
import { baoUtils } from '../utils/utils.js';


////////////////////////////////////////////////////////////////////////////////
// SETUP CONSTS
////////////////////////////////////////////////////////////////////////////////
const miscAudio = new Audio();
const wildHorseTitle = '&6Horseman &r@ &2Wilderness'
const graveHorseTitle = '&6Horseman &r@ &cGraveyard'

////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function generateRandomStr(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const randomChar = () => characters.charAt(Math.floor(Math.random() * characters.length));

    return Array.from({ length }, randomChar).sort(() => 0.5 - Math.random()).join('');
}

function shouldHandlFearMsgs() {
    return !getInSkyblock() || !World.isLoaded() || !Settings.primal_fear_main_toggle;
}

function solveFearMaths(problem) {
    const question = problem.replace(/x/g, '*');
    return eval(question).toFixed(0);
}

function determineJerryColor(color) {
    if (color === 'Green') return '&a';
    if (color === 'Blue') return '&9';
    if (color === 'Purple') return '&5';
    if (color === 'Golden') return '&6';
    return '&5';
}

function handleJerryPings(event, color) {
    if (!getInSkyblock() || !Settings.jerry_ping) return;
    cancel(event);
    ChatLib.chat(`[!] A ${color} Jerry has spawned [!]`);
    showAlert(`${determineJerryColor(color)}${color} Jerry`);
    color === 'Golden' ? playSound() : miscAudio.playDefaultSound();
}

function determineJerryColor(color) {
    if (color === 'Green') return '&a';
    if (color === 'Blue') return '&9';
    if (color === 'Purple') return '&5';
    if (color === 'Golden') return '&6';
    return '&5';
}

function handleJerryPings(event, color) {
    if (!getInSkyblock() || !Settings.jerry_ping) return;
    cancel(event);
    let jerryColor = determineJerryColor(color)
    ChatLib.chat(`${baoUtils.modPrefix} [!] ${jerryColor}${color} Jerry`);
    showAlert(`${jerryColor}${color} Jerry`);
    miscAudio.playDefaultSound();
}


////////////////////////////////////////////////////////////////////////////////
// MINING
////////////////////////////////////////////////////////////////////////////////
// golden goblin alert
register('chat', (event) => {
    if (!getInSkyblock() || !Settings.goldenGoblinAlert) return;
    cancel(event);
    showAlert('&6Golden Goblin');
    miscAudio.playDefaultSound();
    sendMessage('[!] Golden Goblin [!]');
}).setCriteria('A Golden Goblin has spawned!');

// scatha pet drop alert
register('chat', (mf, event) => {
    if (!getInSkyblock() || !Settings.scathaPetPing) return;
    cancel(event);
    const message = ChatLib.getChatMessage(event, true);
    petDropPing(message, 'PET DROP!', 'Scatha', mf);
}).setCriteria('PET DROP! Scatha (+${mf}% ✯ Magic Find)');

// bal ping
register('chat', (event) => {
    if (!getInSkyblock() || !Settings.balPetPing) return;
    sendMessage(`RARE DROP A Bal Pet Dropped!`);
    playSound();
}).setCriteria('RARE DROP A Bal Pet Dropped!');



////////////////////////////////////////////////////////////////////////////////
// JERRY PINGS
////////////////////////////////////////////////////////////////////////////////
register('chat', (color, event) => {
    handleJerryPings(event, color);
}).setCriteria(' ☺ You discovered a ${color} Jerry!');

register('chat', (color, event) => {
    handleJerryPings(event, color);
}).setCriteria(' ☺ Some ${color} Jerry was hiding, but you found it!');

register('chat', (color, event) => {
    handleJerryPings(event, color);
}).setCriteria(' ☺ You located a hidden ${color} Jerry!');

register('chat', (color, event) => {
    handleJerryPings(event, color);
}).setCriteria(' ☺ A wild ${color} Jerry spawned!');

register('chat', (color, event) => {
    handleJerryPings(event, color);
}).setCriteria(' ☺ Some ${color} Jerry was hiding, but you found it!');

register('chat', (color, event) => {
    handleJerryPings(event, color);
}).setCriteria(' ☺ There is a ${color} Jerry!');

register('chat', (color, event) => {
    handleJerryPings(event, color);
}).setCriteria(' ☺ You found a ${color} Jerry!');

register('chat', (color, event) => {
    handleJerryPings(event, color);
}).setCriteria(' ☺ A ${color} Jerry appeared!');

////////////////////////////////////////////////////////////////////////////////
// DYE PINGS
////////////////////////////////////////////////////////////////////////////////
// carmine
register('chat', (event) => {
    if (!getInSkyblock() || !Settings.dye_pings) return;
    showAlert('&3[&b&ka&3] &cCarmine Dye &3[&b&ka&3]');
    sendMessage('RARE DROP! Carmine Dye');
    playSound();
}).setCriteria('RARE DROP! Carmine Dye');

// necron
register('chat', (playerName, event) => {
    if (!getInSkyblock() || !Settings.dye_pings) return;
    if (stripRank(playerName) === Player.getName()) {
        showAlert('&6&lNecron Dye');
        playSound();
    }
}).setCriteria('${playerName} unlocked Necron Dye!');

// holly dye
register('chat', (p1, p2, event) => {
    if (!getInSkyblock() || !Settings.dye_pings) return;
    if (stripRank(p2) === Player.getName()) {
        showAlert('&6[&c&ka&6] &2Holly Dye &6[&c&ka&6]');
        playSound();
    }
}).setCriteria('SANTA GIFT! ${p1} gifted Holly Dye to ${p2}!');

// aquamarine
register('chat', (event) => {
    if (!getInSkyblock() || !Settings.dye_pings) return;
    showAlert('&5[&6&ka&5] &3Aquamarine Dye &5[&6&ka&5]');
    sendMessage('OUTSTANDING CATCH! You found a Aquamarine Dye.');
    playSound();
}).setCriteria('OUTSTANDING CATCH! You found a Aquamarine Dye.');

// celeste
register('chat', (event) => {
    if (!getInSkyblock() || !Settings.dye_pings) return;
    showAlert('&3[&r&ka&3] &bCeleste Dye &3[&r&ka&3]');
    sendMessage('RARE DROP! Celeste Dye');
    playSound();
}).setCriteria('RARE DROP! Celeste Dye');

// flame dye
// mango dye -------- register pickup item
// nyanza dye
// celadon dye
// emerald dye 
// tentacle dye
// dark purple dye
// midnight dye
// byzantium dye
// cyclamen dye
// nadeshiko dye
// wild strawberry dye -------- register pickup item
// brick red dye
// bone dye

////////////////////////////////////////////////////////////////////////////////
// SPOOKY EVENT PINGS
////////////////////////////////////////////////////////////////////////////////
// trick or treat mob pings
register('chat', (spookyMob, event) => {
    if (!Settings.spooky_tot_ping) return;
    cancel(event);
    showAlert(`&8${spookyMob}`);
    sendMessage(`${spookyMob} has spawned.`)
    miscAudio.playDefaultSound();
}).setCriteria('TRICK! A ${spookyMob} has tricked you!');

// headless horseman ping
register('chat', (spawner, location, event) => {
    if (!Settings.horseman_ping) return;
    cancel(event);
    location === 'Wilderness' 
        ? showAlert(wildHorseTitle) 
        : location === 'Graveyard' 
            ? showAlert(graveHorseTitle) 
            : null;
    sendMessage(`[!] Horseman @ ${location} [!]`);
    miscAudio.playDefaultSound();
}).setCriteria("${spawner} has spawned the Headless Horseman boss in the ${location}!")

// Royal Resident
register('chat', (message, event) => {
    if (!getInSkyblock() || !getInMines()) return;
    if (Settings.hide_royal_resident_messages) cancel(event);
}).setCriteria('[NPC] No Name: ${message}').setContains();



////////////////////////////////////////////////////////////////////////////////
// PRIMAL FEARS
////////////////////////////////////////////////////////////////////////////////
// message hiders
register('chat', (event) => {
    if (!shouldHandlFearMsgs()) return;
    if (Settings.hide_fear_messages) cancel(event);
}).setCriteria('FEAR. You got some rewards from killing a Primal Fear!');

register('chat', (event) => {
    if (!shouldHandlFearMsgs()) return;
    if (Settings.hide_fear_messages) cancel(event);
}).setCriteria('[FEAR]').setContains();

// primal fears spawn ping
register('chat', (event) => {
    if (!shouldHandlFearMsgs()) return;
    if (!Settings.primal_fear_spawn_ping) return;
    if (Settings.hide_fear_messages) cancel(event);
    miscAudio.playDefaultSound();
    showAlert('&4PRIMAL FEAR');
    ChatLib.chat('[!] Primal Fear [!]');
}).setCriteria('FEAR. A Primal Fear has been summoned!');

// quick maths lol
register('chat', (problem, event) => {
    if (!shouldHandlFearMsgs() || !Settings.fear_math_solver) return;
    let result = solveFearMaths(problem);
    setTimeout(() => {
        ChatLib.chat(`${baoUtils.modPrefix} &fAnswer: &b${result}`);
    }, 300);
}).setCriteria('QUICK MATHS! Solve: ${problem}');

// random blah blah
let isFearAnnounced = false;
register('chat', (playerName, event) => {
    if (!shouldHandlFearMsgs()) return;
    if (!Settings.fear_karen_solver) return;
    if (playerName !== Player.getName()) return;
    const randomMessage = generateRandomStr(18);
    if (!isFearAnnounced) {
        isFearAnnounced = true;
        setTimeout(() => {
            ChatLib.chat(randomMessage);
        }, 300);
        setTimeout(() => {
            isFearAnnounced = false;
        }, 30000);
    };
}).setCriteria('[FEAR] Public Speaking Demon: Say something interesting ${playerName}!');

register('chat', (event) => {
    cancel(event);
}).setCriteria('Timer for 60 has ended!');

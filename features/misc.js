import Settings from '../settings.js';
import Audio from '../utils/audio.js';

import { generateRandomStr, petDropPing, playSound, sendGuild } from '../utils/functions.js';
import { sendMessage } from '../utils/party.js';
import { showAlert } from '../utils/utils.js';
import { getInSkyblock, getCurrArea } from '../utils/functions.js'; // sb, area
import { baoUtils } from '../utils/utils.js';

////////////////////////////////////////////////////////////////////////////////
// SETUP CONSTS
////////////////////////////////////////////////////////////////////////////////
const miscAudio = new Audio();

const wildHorseTitle = '&6Horseman &r@ &2Wilderness'
const graveHorseTitle = '&6Horseman &r@ &cGraveyard'

const carmineInfo = {
    "title": '&3[&b&ka&3] &cCarmine Dye &3[&b&ka&3]', 
    "pattern": /&6&lRARE DROP! &5Carmine Dye/, 
    "message": 'RARE DROP! Carmine Dye',
}

const necronDyeInfo = {
    "title": '&6Necron Dye', 
    "pattern": /&eunlocked &6Necron Dye&e!/, 
    "message": `${Player.getName()} unlocked Necron Dye!`,
}

const hollyDyeInfo = {
    "title": '&6[&c&ka&6] &2Holly Dye &6[&c&ka&6]',
    "pattern": '&egifted &5Holly Dye &eto',
}

const aquamarineDyeInfo = {
    "title": '&5[&6&ka&5] &3Aquamarine Dye &5[&6&ka&5]', 
    "pattern": /&d&lOUTSTANDING CATCH! &bYou found a &5Aquamarine Dye&b./, 
    "message": 'OUTSTANDING CATCH! You found a Aquamarine Dye.',
}

const celesteDyeInfo = {
    "title": '&3[&r&ka&3] &bCeleste Dye &3[&r&ka&3]', 
    "pattern": /&6&lRARE DROP! &5Celeste Dye/, 
    "message": 'RARE DROP! Celeste Dye', 
}

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
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function shouldHandlFearMsgs() {
    return !getInSkyblock() || !World.isLoaded() || !Settings.primal_fear_main_toggle;
}

function solveFearMaths(problem) {
    const question = problem.replace(/x/g, '*');
    return eval(question).toFixed(0);
}
////////////////////////////////////////////////////////////////////////////////
// MINING
////////////////////////////////////////////////////////////////////////////////
// golden goblin alert
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.golden_goblin_alert) return;
    cancel(event);
    showAlert('&6Golden Goblin');
    miscAudio.playDefaultSound();
    sendMessage('[!] Golden Goblin [!]');
}).setCriteria('A Golden Goblin has spawned!');

// scatha pet drop alert
register('chat', (mf, event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.scatha_pet_drop_ping) return;
    cancel(event);
    const message = ChatLib.getChatMessage(event, true);
    petDropPing(message, 'PET DROP!', 'Scatha', mf);
}).setCriteria('PET DROP! Scatha (+${mf}% ✯ Magic Find)');


////////////////////////////////////////////////////////////////////////////////
// JERRY PINGS
////////////////////////////////////////////////////////////////////////////////
function determineJerryColor(color) {
    if (color === 'Green') return '&a';
    if (color === 'Blue') return '&9';
    if (color === 'Purple') return '&5';
    if (color === 'Golden') return '&6';
    return '&5';
}

function handleJerryPings(event, color) {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.jerry_ping) return;
    cancel(event);
    ChatLib.chat(`[!] A ${color} Jerry has spawned [!]`);
    showAlert(`${determineJerryColor(color)}${color} Jerry`);
    color === 'Golden' ? playSound() : miscAudio.playDefaultSound();
}
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

////////////////////////////////////////////////////////////////////////////////
// DYE PINGS
////////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.dye_pings) return;
    const message = ChatLib.getChatMessage(event, true);

    // carmine
    if (message.match(carmineInfo.pattern)) {
        showAlert(carmineInfo.pattern);
        sendMessage(carmineInfo.message);
        if (Settings.guild_announce_dye_pings) sendGuild(carmineInfo.message);
        playSound();
    };

    // necron
    if (message.match(necronDyeInfo.pattern)) {
        showAlert(necronDyeInfo.title);
        sendMessage(necronDyeInfo.message);
        if (Settings.guild_announce_dye_pings) sendGuild(necronDyeInfo.message);
        playSound();
    };

    // flame
    // mango
    // nyanza
    // celadon
    // emerald
    // holly
    if (message.includes(hollyDyeInfo.pattern) && message.includes(Player.getName())) {
        showAlert(hollyDyeInfo.title);
        sendMessage(message);
        playSound();
    };

    // aquamarine
    if (message.match(aquamarineDyeInfo.pattern)) {
        showAlert(aquamarineDyeInfo.title);
        sendMessage(aquamarineDyeInfo.message);
        if (Settings.guild_announce_dye_pings) sendGuild(aquamarineDyeInfo.message);
        playSound();
    };

    // celeste
    if (message.match(celesteDyeInfo.pattern)) {
        showAlert(celesteDyeInfo.title);
        sendMessage(celesteDyeInfo.message);
        if (Settings.guild_announce_dye_pings) sendGuild(celesteDyeInfo.message);
        playSound();
    };
    // tentacle
    // dark purple
    // midnight
    // byzantium
    // cyclamen
    // nadeshiko
    // wild strawberry
    // brick red
    // bone
})

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
    location === 'Wilderness' ? showAlert(wildHorseTitle) : location === 'Graveyard' ? showAlert(graveHorseTitle) : null;
    sendMessage(`[!] Horseman @ ${location} [!]`);
    miscAudio.playDefaultSound();
}).setCriteria("${spawner} has spawned the Headless Horseman boss in the ${location}!")

// Royal Resident
register('chat', (message, event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (getCurrArea() !== 'Dwarven Mines') { ChatLib.chat('not in dwarven mines'); return; }
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
    if (!shouldHandlFearMsgs()) return;
    if (!Settings.fear_math_solver) return;
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


import Settings from '../settings.js';
import Audio from '../utils/audio.js';
import { data } from '../utils/data.js';
import { debug, showAlert } from '../utils/utils.js';
import { getIsPL, sendMessage, getPLockList } from '../utils/party.js';
import { determinePlayerRankColor, hideMessage, calcSkillXP } from '../utils/functions.js';

const generalAudio = new Audio();

///////////////////////////////////////////////////////////////////////////////
// #warp ----------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////
register('chat', (rank, name, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.auto_warp_cmd) return;
    if (getIsPL()) ChatLib.command('p warp');
    generalAudio.playDefaultSound();
   
    /* 
    * plock list code
    */

    debug(`isPL: ${getIsPL()}`)
}).setCriteria('Party > ${rank} ${name}: #warp')

register('chat', (rank, name, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.auto_warp_cmd) return;
    if (getIsPL()) ChatLib.command('p warp');
    generalAudio.playDefaultSound();

    /* 
    * plock list code
    */

    debug(`isPL: ${getIsPL()}`)
}).setCriteria('Party > ${rank} ${name}: #w')



///////////////////////////////////////////////////////////////////////////////
// Auto notifier for #warp when player joins ----------------------------------
///////////////////////////////////////////////////////////////////////////////
register('chat', (player, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.auto_notify_warp_cmd) return
    if (!getIsPL()) return;
    sendMessage('[!] type #warp for warp when r[!]')
    generalAudio.playDefaultSound();
}).setCriteria('${player} joined the party.')


///////////////////////////////////////////////////////////////////////////////
// #pai -----------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////
register('chat', (rank, name, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.pai_cmd) return
    const paiPattern = /\#pai/;
    const message = ChatLib.getChatMessage(event, true);
    const paiMatch = message.match(paiPattern);
    if (paiMatch) { 
        ChatLib.command('p settings allinvite'); 
        generalAudio.playDefaultSound();
    }
}).setCriteria('Party > ${rank} ${name}: #pai')


///////////////////////////////////////////////////////////////////////////////
// #ko ------------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////
register('chat', (rank, ignevent) => {
    if (!getIsPL()) return;
    ChatLib.command('p kickoffline')
}).setCriteria('Party > ${rank} ${ign}: #ko')

///////////////////////////////////////////////////////////////////////////////
// #pt / #transfer ------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////
register('command', () => {
    ChatLib.chat(getIsPL())
}).setName('checkpl');

register('chat', (rank, ign, event) => {
    if (!getIsPL()) return;
    ChatLib.command(`p transfer ${ign}`)
}).setCriteria('Party > ${rank} ${ign}: #pt')

register('chat', (rank, ign, event) => {
    if (!getIsPL()) return;
    ChatLib.command(`p transfer ${ign}`)
}).setCriteria('Party > ${rank} ${ign}: #transfer')

///////////////////////////////////////////////////////////////////////////////
// Kicked from SB Alert -------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////
// kicked from sb alert
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.kicked_notifier) return;
    sendMessage('You were kicked while joining that server! 1 minute cooldown.')
}).setCriteria('You were kicked while joining that server!')


///////////////////////////////////////////////////////////////////////////////
// Boop Notifier --------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////
register('chat', (rank, player, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.boop_notifier) return
    const rankColor = determinePlayerRankColor(rank);
    showAlert(`${rankColor}${player} &dBooped &ryou!`);
    generalAudio.playDefaultSound();
}).setCriteria("From [${rank}] ${player}: Boop!")


///////////////////////////////////////////////////////////////////////////////
// /warpexc -------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////
register("command", (...args) => {
    if (!data.inSkyblock) return;
    if (!Settings.warp_exc_cmd) return
    const namesExc = args;

    const executeCommands = (commands, delay) => {
        commands.forEach((command, index) => {
            setTimeout(() => {
                ChatLib.command(`${command}`);
            }, index * delay);
        });
    };

    setTimeout(() => {
        const allCommands = [];
        const removeCommands = namesExc.map(name => `p remove ${name}`);
        const inviteCommands = namesExc.map(name => `p invite ${name}`);
        for (let i = 0; i < namesExc.length; i++) { allCommands.push(removeCommands[i]); }
        const warpCommand = 'p warp';
        allCommands.push(warpCommand);
        for (let i = 0; i < namesExc.length; i++) { allCommands.push(inviteCommands[i]); }

        executeCommands(allCommands, 1000);
    }, 1000);
}).setName('warpexc');

////////////////////////////////////////////////////////////////////////////////
// MESSAGE HIDERS --------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
// aotv hider
hideMessage("There are blocks in the way!", '', null, Settings.aotvHider)

// soopy message
hideMessage(`Unknown command. Type "/help" for help. ('uhfdsolguhkjdjfhgkjhdfdlgkjhldkjhlkjhsldkjfhldshkjf')`, '', null, Settings.randomSoopyMessageHider)


// stash shortener
let pickupMat = '';
let numMats = 0;
let remMats = 0;
let sackTypes = 0;
register('chat', (itemName, event) => {
    if (Settings.betterStashMessages) cancel(event);
    pickupMat = itemName;
}).setCriteria('From stash: ${itemName}');

register('chat', (numItems, event) => {
    if (Settings.betterStashMessages) cancel(event);
    numMats = Number(numItems);
}).setCriteria('You picked up ${numItems} items from your material stash!');

register('chat', (matsRem, numTypes, event) => {
    if (Settings.betterStashMessages) cancel(event);
    remMats = parseInt(matsRem.replace(',', ''), 10);
    sackTypes = Number(numTypes);

    if (Settings.betterStashMessages) ChatLib.chat(`&eFrom Sacks: &b${pickupMat} x${numMats} &7|| &cR: &b${remMats} &7|| &aTypes: ${sackTypes}`)
}).setCriteria('You still have ${matsRem} materials totalling ${numTypes} types of materials in there!');

// click stash shortener
let reminderMatsRem = 0;
let numTypesRem = 0;
register('chat', (numMatsRem, event) => {
    if (Settings.hideClickStashMessages) cancel(event);
    reminderMatsRem = parseInt(numMatsRem.replace(',', ''), 10);
}).setCriteria('You have ${numMatsRem} materials stashed away!').setContains();

register('chat', (numTypes, event) => {
    if (Settings.hideClickStashMessages) cancel(event);
    numTypesRem = Number(numTypes);
}).setCriteria('(This totals ${numTypes} type of material stashed!)').setContains();

register('chat', (numTypes, event) => {
    if (Settings.hideClickStashMessages) cancel(event);
    numTypesRem = Number(numTypes);
}).setCriteria('(This totals ${numTypes} types of materials stashed!)').setContains();

let limitOptions = {
    '0': 1, 
    '1': 6, 
    '2': 11, 
    '3': 0,
}
let stashLimit = limitOptions[Settings.clickStashLimitOption];
let numTillReminder = stashLimit;

register('chat', (event) => {
    if (Settings.hideClickStashMessages) {
        cancel(event);
        
        if (numTillReminder !== 0) {
            ChatLib.chat(`&4&lREMINDER: &rYou have &b${reminderMatsRem}&r materials of &b${numTypesRem}&r type(s) in your sacks!`);
            if (stashLimit === 1) numTillReminder === 1; 
            if (stashLimit === 6) numTillReminder === 6; 
            if (stashLimit === 11) numTillReminder === 11; 
        }
        numTillReminder -= 1;
    }
}).setCriteria('>>> CLICK HERE to pick them up! <<<').setContains();



// hide lightning
register("renderEntity", function (entity, position, ticks, event) {
    if (!World.isLoaded()) return;
    if (!data.inSkyblock) return;
    if (!Settings.hide_lightning) return;
    if(entity.getClassName() === "EntityLightningBolt"){
      cancel(event)
    }
})

// snow cannon message hider
register('chat', (playerName, event) => {
    if (!data.inSkyblock) return;
    if (data.currArea !== "Jerry's Workshop") return;
    if (!Settings.hide_snow_cannon_messages) return;
    cancel(event);
}).setCriteria(' ☃ ${playerName} mounted a Snow Cannon!');

// baker qol
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.get_baker_cake) return;
    setTimeout(() => {
        ChatLib.command('openbaker')
    }, 250)
}).setCriteria('CLICK HERE to get your SPECIAL new year cake!').setContains();

// grandma wolf hider
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.grandma_hider) return;
    cancel(event);
}).setCriteria('+${comboNum} Kill Combo +${bonus}');

// }).setCriteria('+10 Kill Combo +10 coins per kill');
// }).setCriteria('+15 Kill Combo +3✯ Magic Find');
// }).setCriteria('+20 Kill Combo +15☯ Combat Wisdom');
// }).setCriteria('+25 Kill Combo +3✯ Magic Find');




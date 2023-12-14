import Settings from '../settings.js';
import Audio from '../utils/audio.js';
import { data } from '../utils/data.js';
import { debug, showAlert } from '../utils/utils.js';
import { getIsPL, sendMessage, getPLockList } from '../utils/party.js';
import { determinePlayerRankColor, delayMessage, hideMessage } from '../utils/functions.js';
import { drawLine3d } from 'BloomCore/utils/Utils.js';

const generalAudio = new Audio();

const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");
let screenW = Renderer.screen.getWidth();

// test commands
register('command', (args) => {
    Client.showTitle(args, '', 1, 30, 1);
    generalAudio.playDefaultSound();
}).setName('titlesim').setAliases('tsim');



///////////////////////////////////////////////////////////////////////////////
// #warp ----------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////
register('chat', (rank, name, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.auto_warp_cmd) return;
    ChatLib.command('p warp');
    generalAudio.playDefaultSound();
    // if (data.lockedList.length > 0) {
    //     sendMessage(`#warp is not available! There is ${data.lockedList.length} player(s) locked.`)
    //     setTimeout(() => { generalAudio.playDutSound(); sendMessage(`Please use /warpexc command instead.`); }, 500)
    // } else {
    //     if (!getIsPL()) return;
    //     ChatLib.command('p warp');
    //     generalAudio.playDefaultSound();
    // }
    debug(`isPL: ${getIsPL()}`)
}).setCriteria('Party > ${rank} ${name}: #warp')

register('chat', (rank, name, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.auto_warp_cmd) return;
    ChatLib.command('p warp');
    generalAudio.playDefaultSound();
    if (getIsPL()) {
        if (data.lockedList.length > 0) {
            ChatLib.chat(`&c#warp is not available! There is ${data.lockedList.length} players locked.\n&cPlease use &e/warpexc &ccommand instead.`)
            generalAudio.playDefaultSound();
        } else {
            ChatLib.command('p warp');
            generalAudio.playDefaultSound();
        }
    }
    debug(`isPL: ${getIsPL()}`)
}).setCriteria('Party > ${rank} ${name}: #w')



///////////////////////////////////////////////////////////////////////////////
// Auto notifier for #warp when player joins ----------------------------------
///////////////////////////////////////////////////////////////////////////////
register('chat', (player, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.auto_notify_warp_cmd) return
    if (!getIsPL()) return;
    // if (!getIsPL()) return;
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
    if (paiMatch && message.includes('Party') && !message.includes('Co-op')) { 
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
    if (getIsPL()) {
        ChatLib.command(`p transfer ${ign}`)
    }
}).setCriteria('Party > ${rank} ${ign}: #pt')

register('chat', (rank, ign, event) => {
    if (getIsPL()) {
        ChatLib.command(`p transfer ${ign}`)
    }
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
hideMessage("There are blocks in the way!", '', null)

// soopy message
hideMessage(`Unknown command. Type "/help" for help. ('uhfdsolguhkjdjfhgkjhdfdlgkjhldkjhlkjhsldkjfhldshkjf')`, '', null)




////////////////////////////////////////////////////////////////////////////////
// BEACON FOR PLAYER -----------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
// let px = 0;
// let py = 0;
// let pz = 0;
// let showBox = false;

// register('chat', (rank, name, x, y, z, event) => {
//     px = x
//     py = y
//     pz = z
//     showBox = true;
// }).setCriteria('Party > ${rank} ${name}: x: ${x}, y: ${y}, z: ${z}')
// // RenderLib.drawInnerEspBox(px, py, pz, 1, 1, 1, 1, 1, .5, false);


// let playerFacing = '';
// let playerCoords = {};
// // drawBonzoBox(playerCoords.x, playerCoords.y, playerCoords.z, 'purple', false);
// // drawBeacon(playerCoords.x, playerCoords.y, playerCoords.z, "white", false);
// // playerCoords = centerCoordinates(Player.getX(), Player.getY(), Player.getZ());


// // let showrun = false;
// // register('command', () => {
// //     showrun = true;
// // }).setName('testrun');

// // register('renderWorld', () => {
// //     if (!data.inSkyblock) return;
// //     RenderLib.drawInnerEspBox(6.5, 216, -106.5, 0.1, 0.1, 1, 1, 1, .2, false);
// // })

// let showThunderBoxes = false;
// let nearbyThunderStands;
// register('command', () => {
//     nearbyThunderStands = World.getAllEntitiesOfType(EntityArmorStand).forEach(entity => {
//         console.log(entity);
//     })
//     showThunderBoxes = true;
//     console.log(showThunderBoxes);
// }).setName('stands')

// register('renderWorld', () => {
//     if (!data.inSkyblock) return;
//     if (!showThunderBoxes) return;
//     if (!nearbyThunderStands || !nearbyThunderStands.length > 0) return;
//     if (showThunderBoxes) {
//         console.log(showThunderBoxes);
//         nearbyThunderStands.forEach(thunderStand => {
//             thunderX = thunderStand.getX();
//             thunderY = thunderStand.getY();
//             thunderZ = thunderStand.getZ();
//             drawBonzoBox(thunderX, thunderY, thunderZ, 'pink', true);
//         })
        
//         playerCoords = centerCoordinates(Player.getX(), Player.getY(), Player.getZ());
//         drawBonzoBox(playerCoords.x, playerCoords.y, playerCoords.z, 'purple', false);
//     }
// })


// stash shortener
let pickupMat = '';
let numMats = 0;
let remMats = 0;
let sackTypes = 0;
register('chat', (itemName, event) => {
    cancel(event);
    pickupMat = itemName;
}).setCriteria('From stash: ${itemName}');

register('chat', (numItems, event) => {
    cancel(event);
    numMats = Number(numItems);
}).setCriteria('You picked up ${numItems} items from your material stash!');

register('chat', (matsRem, numTypes, event) => {
    cancel(event);
    remMats = parseInt(matsRem.replace(',', ''), 10);
    sackTypes = Number(numTypes);

    ChatLib.chat(`&eFrom Sacks: &b${pickupMat} x${numMats} &7|| &cR: &b${remMats} &7|| &aTypes: ${sackTypes}`)
}).setCriteria('You still have ${matsRem} materials totalling ${numTypes} types of materials in there!');

// click stash shortener
let reminderMatsRem = 0;
let numTypesRem = 0;
register('chat', (numMatsRem, event) => {
    cancel(event);
    reminderMatsRem = parseInt(numMatsRem.replace(',', ''), 10);
}).setCriteria('You have ${numMatsRem} materials stashed away!').setContains();

register('chat', (numTypes, event) => {
    cancel(event);
    numTypesRem = Number(numTypes);
}).setCriteria('(This totals ${numTypes} type of material stashed!)').setContains();

register('chat', (numTypes, event) => {
    cancel(event);
    numTypesRem = Number(numTypes);
}).setCriteria('(This totals ${numTypes} types of materials stashed!)').setContains();

let numTillReminder = 11;
register('chat', (event) => {
    cancel(event);
    numTillReminder -= 1;
    if (numTillReminder === 1) {
        ChatLib.chat(`&4&lREMINDER: &rYou have &b${reminderMatsRem}&r materials of &b${numTypesRem}&r type(s) in your sacks!`)
        numTillReminder = 11;
    }
}).setCriteria('>>> CLICK HERE to pick them up! <<<').setContains();

// garden message hiders
register('chat', (event) => {
    cancel(event);
}).setCriteria('WARNING! Blocks that you break on this plot will not drop items while using a custom preset!');

register('chat', (event) => {
    cancel(event);
}).setCriteria('Remember, you have to be on the island for the resources to be planted!');

register('chat', (presetName, plotName, event) => {
    cancel(event);
    ChatLib.chat(`&6&lPASTING: &rUsing Preset &b&l[&r${presetName}&b&l]&r on Plot &b'&c${plotName}&b'&r!`)
}).setCriteria('Started pasting ${presetName} preset on Garden Plot - ${plotName}!');


register("renderEntity", function (entity, position, ticks, event) {
    if (!World.isLoaded()) return;
    if (!data.inSkyblock) return;
    if (!Settings.hide_lightning) return;
    if(entity.getClassName() === "EntityLightningBolt"){
      cancel(event)
    }
})

// // guild shortener
// register('chat', (rank, name, role, message, event) => {
//     cancel(event);
//     ChatLib.chat(`G > ${rank} ${name} ${role}: ${message}`);
// }).setCriteria('Guild > ${rank} ${name} ${role}: ${message}');

// register('chat', (name, message, event) => {
//     cancel(event);
//     playerColor = determinePlayerRankColor(name);
//     ChatLib.chat(`&2G > ${name} ${role}: ${message}`);
// }).setCriteria('Guild > ${name} ${role}: ${message}');

// // bridge name shortener
// register('chat', (rank, bridgeBot, role, event) => {
//     cancel(event);
//     firstLetter = bridgeBot[0].toUpperCase();
//     ChatLib.chat(`${firstLetter} > : ${message}`)
// }).setCriteria('Guild > ${rank} ${bridgeBot} ${role}: ${message}');

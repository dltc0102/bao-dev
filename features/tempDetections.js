import Audio from "../utils/audio";

import { registerWhen, timeThis } from "../utils/utils";
import { sendMessage, stripRank } from "../utils/party";
import { showAlert } from "../utils/utils";
import { drawBonzoBox, drawGoldenFishBox, getInSkyblock } from "../utils/functions";
import { getInPark, getInCI } from "../utils/functions";

////////////////////////////////////////////////////////////////////////////////
// ENTITY GLOBALS --------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////c
const tempAudio = new Audio();

const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

// maybe save jawbus/thunder info to pogdata
let jawbusInfo = {
    found: false,
    foundNearby: false, 
    names: [],
    titleShown: false,
    numNearby: 0,
    currHealth: 0,
    totalHealth: 0,
};

let thunderInfo = {
    found: false,
    foundNearby: false, 
    names: [],
    titleShown: false,
    numNearby: 0,
    currHealth: 0,
    totalHealth: 0,
};

let vanqInfo = {
    found: false,
    foundNearby: false, 
    names: [],
    titleShown: false,
    numNearby: 0,
    currHealth: 0,
    totalHealth: 0,
    loc: {
        x: 0, 
        y: 0, 
        z: 0
    },
};

function getHealth(healthStr) {
    const multipliers = {
        k: 1000,
        M: 1000000,
    };
    const match = healthStr.match(/^(\d+(?:\.\d+)?)\s*([kM]?)$/);
    const numericPart = parseFloat(match[1]);
    const multiplier = match[2] || ''; // Default to empty string if no multiplier

    if (multipliers.hasOwnProperty(multiplier)) {
        return numericPart * multipliers[multiplier];
    }
}


function detectDH(entityType, givenMobName, givenFormatCode, nameException, givenMobInfo) {
    let nearbyMobEntities = World.getAllEntitiesOfType(entityType)
        .filter(mobEntity => {
            const mobName = mobEntity.getName().removeFormatting();
            return mobName.includes(givenMobName) && (!nameException || !nameException === null || !mobName.includes(nameException));
        });
    
    if (nearbyMobEntities.length > 0) {
        givenMobInfo.found = true;
        givenMobInfo.names = [];
        for (const mobIdx of nearbyMobEntities) {
            const mobMatch = mobIdx.getName().removeFormatting().match(/\[Lv\d+] ([A-Za-z ]+) (\d+(?:\.\d+)?[kM]?)\/(\d+(?:\.\d+)?[kM])❤/);
            if (mobMatch) {
                if (mobMatch[1] === 'Vanquisher') {
                    givenMobInfo.loc.x = mobIdx.getX().toFixed(0);
                    givenMobInfo.loc.y = mobIdx.getY().toFixed(0);
                    givenMobInfo.loc.z = mobIdx.getZ().toFixed(0);
                }
                givenMobInfo.currHealth = getHealth(mobMatch[2]) // get current hp
                givenMobInfo.totalHealth = getHealth(mobMatch[3]) // get max hp
            }
            givenMobInfo.names.push(mobIdx.getName());
        }
    } else { 
        givenMobInfo.found = false; 
    }
    
    const last5 = ChatLib.getChatLines().slice(0, 5);
    let hasMob = false;
    let hasDoubleMob = false;
    
    for (let idx = 0; idx < last5.length; idx++) {
        if (!last5[idx] && (!last5[idx].includes(`Doublehook ${givenMobName} Detected!`) || !last5[idx].includes(`Detected ${givenMobName} nearby`))) break;
        hasMob = (hasMob || last5[idx].includes(givenMobName) || last5[idx].includes(givenMobName.toUpperCase())) && (!last5[idx].includes('Double') || !last5[idx].includes('DOUBLE'));
        hasDoubleMob = hasDoubleMob || last5[idx].includes(`Doublehook ${givenMobName}`) || last5[idx].includes(`Double ${givenMobName}`) || last5[idx].includes(`DOUBLE ${givenMobName.toUpperCase()}`);
    }
    // if message.includes THUNDER or THUNDER SPAWNED or Thunder or Thunder Spawned
    // if message.includes JAWBUS or Jawbus or JAWBUS SPAWNED or Jawbus Spawned
    
    givenMobInfo.numNearby = nearbyMobEntities.length;
    
    if (givenMobInfo.numNearby === 0) { givenMobInfo.titleShown = false; givenMobInfo.messageSent = false;}
    
    // noping nearby detection
    if (givenMobInfo.titleShown) return; // doesnt really change anythign
    if (givenMobInfo.numNearby === 1 && givenMobInfo.currHealth >= (givenMobInfo.totalHealth / 2)) {
        showAlert(`${givenFormatCode}${givenMobName} Nearby!`)
        tempAudio.playDefaultSound();
        if (!hasMob) { 
            setTimeout(() => { 
                if (givenMobName === 'Vanquisher') {
                    // if show vanq coords
                    let [vx, vy, vz] = [givenMobInfo.loc.x, givenMobInfo.loc.y, givenMobInfo.loc.z]
                    let coords = `x: ${vx}, y: ${vy-6}, z: ${vz}`;
                    if (vx !== 0 && vy !== 0 && vz !== 0) sendMessage(`${coords}  ||  ${givenMobName} Detected Nearby`);
                } else {
                    sendMessage(`${givenMobName} Spawned Nearby!`); 
                }
                givenMobInfo.messageSent = true;
            }, 150); 
        }
        givenMobInfo.titleShown = true;
    }
    
    // doublehook detection
    if (givenMobInfo.numNearby >= 2 && givenMobInfo.currHealth >= (givenMobInfo.totalHealth / 2)) {
        if (givenMobName === 'Vanquisher') return;
        showAlert(`${givenFormatCode}Doublehook ${givenMobName}!`)
        tempAudio.playDefaultSound();
        if (!hasDoubleMob) { 
            setTimeout(() => {
                sendMessage(`Doublehook ${givenMobName} Nearby!`); 
                givenMobInfo.messageSent = true;
            }, 150);
        }
        givenMobInfo.titleShown = true;
    }
    givenMobInfo.foundNearby = givenMobInfo.numNearby > 0;
}


register("step", timeThis("registerStep detectDH of mobInfo", () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    detectDH(EntityArmorStand, 'Jawbus', '&4', 'Follower', jawbusInfo);
    detectDH(EntityArmorStand, 'Thunder', '&b', null, thunderInfo);
    detectDH(EntityArmorStand, 'Vanquisher', '&5', null, vanqInfo);
})).setFps(3);




// thunder shard box
// const thunderShardTexture = '';

import { drawBonzoBox } from "../utils/functions";
// registerWhen('renderWorld', timeThis('', () => {
//     World.getAllEntitiesOfType(entityArmorStand).filter(entity => { 
//         let entityID = entity.getEntity();
//         let [ex, ey, ez] = [entityID.x, entityID.y, entityID.z]
//         drawBonzoBox(ex, ey, ez, 'light_blue', true);
//     })
// }), () => getInCI() && getInSkyblock() && World.isLoaded());



// remove lines

function createChatBreak() {
    ChatLib.chat(ChatLib.getChatBreak(' ')); 
}

function createPartyJoinMessage(playerName) {
    return new Message(
        new TextComponent("&eYou have &c60&e seconds to accept. &6Click here to join!").setClick("run_command", `/p accept ${playerName}`)
    );
}

// // general lines
// registerWhen('chat', timeThis('', (event) => {
//     const message = ChatLib.getChatMessage(event, true);
//     if (message.includes('friend') || message.includes('Friend')) return;
//     if (message.includes('&9')) {
//         cancel(event);
//         createChatBreak();
//     }
// }), () => getInSkyblock() && World.isLoaded()).setCriteria('--------------------------------------').setContains();

// registerWhen('chat', timeThis('', (playerName, event) => {
//     cancel(event);
//     let message = ChatLib.getChatMessage(event, true);
//     let inviteLine = message.replace(/-/g, '').split('!')[0];

//     createChatBreak();
//     ChatLib.chat(`${inviteLine}!`);
//     ChatLib.chat(createPartyJoinMessage(stripRank(playerName)))
//     createChatBreak();
// }), () => getInSkyblock() && World.isLoaded()).setCriteria('${playerName} has invited you to join their party!').setContains();

// function requestOptionsLine(playerName) {
//     let acceptOption = new Message(
//         new TextComponent("&a&l[ACCEPT]&r").setClick("run_command", `/f accept ${playerName}`)
//     );

//     let denyOption = new Message(
//         new TextComponent("&c&l[DENY]&r").setClick("run_command", `/f deny ${playerName}`)
//     );

//     let ignoreOption = new Message(
//         new TextComponent("&7&l[IGNORE]&r").setClick("run_command", `/ignore add ${playerName}`)
//     );

//     return `${acceptOption}&8 - ${denyOption}&8 - ${ignoreOption}`;
// }

// registerWhen('chat', timeThis('', (newFriend, event) => {
//     cancel(event);
//     let message = ChatLib.getChatMessage(event, true);
//     let newMessage = message.replace(/-/g, '');
//     const requestRegex = /Friend request from (.+)\[ACCEPT] - \[DENY] - \[IGNORE]/;
//     let msgMatch = newMessage.match(requestRegex);
//     let newFriendName = stripRank(newFriend);
//     if (msgMatch) {
//         formattedName = msgMatch[1];
//         createChatBreak();
//         ChatLib.chat(`&eFriend request from ${formattedName}`);
//         ChatLib.chat(requestOptionsLine(newFriendName)); // not working
//         createChatBreak();
//     }
// }), () => getInSkyblock() && World.isLoaded()).setCriteria('Friend request from ${newFriend}').setContains();

// function getEmbeddedLine(event) {
//     let message = ChatLib.getChatMessage(event, true);
//     message.replace(/-/g, '');
    
//     createChatBreak();
//     ChatLib.chat(message);
//     createChatBreak();
// };

// const embeddedMessages = [
//     /.+ is now a best friend!/, 
//     /.+ is no longer a best friend!/, 
//     /.+ now has the nickname .+/,
//     /Enabled best friend join\/leave notifications!/, 
//     /Disabled best friend join\/leave notifications!/, 
//     /Enabled friend join\/leave notifications!/, 
//     /Disabled friend join\/leave notifications!/, 
//     /You removed .+ from your friends list!/,
//     /Declined .+'s friend request!/
// ]

// embeddedMessages.forEach(msg => {
//     registerWhen('chat', timeThis('', (playerName, event) => {
//         cancel(event);
//         getEmbeddedLine(event);
//     }), () => getInSkyblock() && World.isLoaded()).setCriteria(msg).setContains();
// });


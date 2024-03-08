import Audio from "../utils/audio";

import { registerWhen, timeThis } from "../utils/utils";
import { sendMessage } from "../utils/party";
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
    22
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
                    sendMessage(`Detected ${givenMobName} Nearby!`); 
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
                sendMessage(`Doublehook ${givenMobName}s Detected!`); 
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

registerWhen('chat', timeThis('registerChat hide stupid dh message', (event) => {
    cancel(event);
}), () => getInSkyblock() && World.isLoaded()).setCriteria('Womp! Womp! Bitch').setContains();


// guild shortener
const bridgeBot = 'Baltics';
registerWhen('chat', timeThis('registerChat guild message shortener', (playerName, msg, event) => {
    if (playerName.includes(bridgeBot)) return;
    cancel(event);
    const message = ChatLib.getChatMessage(event, true);
    const shortenedMessage = message.substring(message.indexOf(">")+1);
    ChatLib.chat(`&2G >&r${shortenedMessage}`);
}), () => getInSkyblock() && World.isLoaded()).setCriteria('Guild > ${playerName}: ${msg}');

// bridge shortener
registerWhen('chat', timeThis('registerChat guild bridge message shortener', (bridgeRank, bridgeName, bridgeRole, playerName, playerMessage, event) => {
    if (bridgeName !== bridgeBot) return;
    cancel(event);
    const message = ChatLib.getChatMessage(event, true);
    const firstColonIndex = message.indexOf(':');
    if (firstColonIndex !== -1) {
        const bridgeMessage = message.substring(firstColonIndex + 1).split(':')[1].trim();
        const bridgeCap = bridgeName[0].toUpperCase();
        ChatLib.chat(`&2${bridgeCap} > &a${playerName}&r: ${bridgeMessage}`);
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria("Guild > ${bridgeRank} ${bridgeName} ${bridgeRole}: ${bridgeMessage}");


// park rain timer 
let rainTimeText = '';
let rainTimeLeft = '';
let rainTime = 0;
let oneMinAlert = false;    
register('step', timeThis("registerStep rain time", () => {
    if (!getInPark() || !getInSkyblock() || !World.isLoaded()) return;
    rainTimeText = TabList.getNames()[44];
    
    rainTimeLeft = rainTimeText.split(":")[1].trim(); // 10m
    if (rainTimeLeft === '1m') {
        showAlert('&e1 min of Rain Left')
        tempAudio.playDefaultSound();
        oneMinAlert = true;
    }
    if (rainTimeLeft !== '1m') {
        oneMinAlert = false;
    }
})).setFps(1);

registerWhen('renderOverlay', timeThis('registerOverlay rainTime text', () => {
    Renderer.drawStringWithShadow(rainTimeText, Renderer.screen.getWidth() - Renderer.getStringWidth(rainTimeText) - 3, 50);
}), () => getInPark() && getInSkyblock() && World.isLoaded());


// volcano timer
let explosivity = '';
register('step', timeThis("registerStep get lobby explosivity", () => {
    if (!getInCI() || !getInSkyblock() || !World.isLoaded()) return;
    let phase = TabList.getNames()[58].trim();
    // console.log(JSON.stringify(phase))
    let phaseText = phase.includes('CATACLYSMIC') ? ` &4&lCATACLYSMIC` : phase;
    explosivity = `Explosivity:${phaseText}`;
})).setFps(1);

registerWhen('renderOverlay', timeThis('registerOverlay explosivity text', () => {
    Renderer.drawStringWithShadow(explosivity, Renderer.screen.getWidth() - Renderer.getStringWidth(explosivity) - 3, 3);
}), () => getInCI() && getInSkyblock() && World.isLoaded());


// jawbus followers hitboxes
import { drawFollowerHitbox } from "../utils/functions";
registerWhen('renderWorld', timeThis("renderOverlay follower hitboxes", () => {
    World.getAllEntities().forEach(entity => {if (entity.getName().removeFormatting().includes("Jawbus Follower")) drawFollowerHitbox(entity.x, entity.y-0.65, entity.z, givColor='white', alpha=1, seethru=false)})
}), () => getInCI() && getInSkyblock() && World.isLoaded());


// flare timer
const warningFlareTexture = 'ewogICJ0aW1lc3RhbXAiIDogMTY0NjY4NzMwNjIyMywKICAicHJvZmlsZUlkIiA6ICI0MWQzYWJjMmQ3NDk0MDBjOTA5MGQ1NDM0ZDAzODMxYiIsCiAgInByb2ZpbGVOYW1lIiA6ICJNZWdha2xvb24iLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMjJlMmJmNmMxZWMzMzAyNDc5MjdiYTYzNDc5ZTU4NzJhYzY2YjA2OTAzYzg2YzgyYjUyZGFjOWYxYzk3MTQ1OCIKICAgIH0KICB9Cn';
const alertFlareTexture = '';
const sosFlareTexture = 'ewogICJ0aW1lc3RhbXAiIDogMTY0NjY4NzM0NzQ4OSwKICAicHJvZmlsZUlkIiA6ICI0MWQzYWJjMmQ3NDk0MDBjOTA5MGQ1NDM0ZDAzODMxYiIsCiAgInByb2ZpbGVOYW1lIiA6ICJNZWdha2xvb24iLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYzAwNjJjYzk4ZWJkYTcyYTZhNGI4OTc4M2FkY2VmMjgxNWI0ODNhMDFkNzNlYTg3YjNkZjc2MDcyYTg5ZDEzYiIKICAgIH0KICB9Cn0';

// thunder shard box
const thunderShardTexture = '';

const entityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

register('command', () => {
    World.getAllEntitiesOfType(entityArmorStand).filter(entity => { 
        console.log(entity.getEntity())
    })
    console.log('-------------------------------------------')
    console.log('')
}).setName('detectas');

register('command', () => {
    World.getAllEntitiesOfType(entityArmorStand).filter(entity => { 
        console.log(entity.getEntity()?.func_82169_q(3)?.func_77978_p()?.toString());
    })
    console.log('-------------------------------------------')
    console.log('')
}).setName('gettextures');

import { drawBonzoBox } from "../utils/functions";
registerWhen('renderWorld', timeThis('', () => {
    World.getAllEntitiesOfType(entityArmorStand).filter(entity => { 
        let entityID = entity.getEntity();
        let [ex, ey, ez] = [entityID.x, entityID.y, entityID.z]
        drawBonzoBox(ex, ey, ez, 'light_blue', true);
    })
}), () => getInCI() && getInSkyblock() && World.isLoaded());

registerWhen('chat', timeThis('', (event) => {
    cancel(event);
}), () => getInSkyblock() && World.isLoaded()).setCriteria('You have reached the maximum number of Magma Cubes allowed on your island. (2)');

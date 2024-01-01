import Settings from "../settings.js"
import { data } from '../utils/data.js'
import { showAlert } from '../utils/utils.js'
import { sendMessage } from '../utils/party.js'
import RenderLib from 'RenderLib/index.js'

////////////////////////////////////////////////////////////////////////////////
// SLAYERS ---------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
/**
 * Draws slayer info on screen based on params
 * @param {*} timerName 
 * @param {*} bossName 
 * @param {*} specialName1 
 * @param {*} specialName2 
 * @param {*} specialName3 
 * @param {*} specialName4 
 */
export function drawSlayerInfo(timerName, bossName, specialName1, specialName2, specialName3, specialName4) {
    Renderer.drawString(`Timer: ${timerName}`, 5, 120);
    Renderer.drawString(bossName, 5, 130);
    if (specialName1) { Renderer.drawString(specialName1, 5, 140); }
    if (specialName2) { Renderer.drawString(specialName2, 5, 150); }
    if (specialName3) { Renderer.drawString(specialName3, 5, 160); }
    if (specialName4) { Rendewrer.drawString(specialName4, 5, 170); }
}

////////////////////////////////////////////////////////////////////////////////
// SOUND ----------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
/**
 * @function playSound - plays RNG sound based on selection in GUI
 * @returns played sound for RNG drops
 */
export function playSound() {
    if (Settings.rng_sound_sel == 0) data.audioInst.playDefaultSound();
    if (Settings.rng_sound_sel == 1) data.audioInst.playCatSong();
    if (Settings.rng_sound_sel == 2) data.audioInst.playNitroSong();
    if (Settings.rng_sound_sel == 3) data.audioInst.playBisSong();
}

////////////////////////////////////////////////////////////////////////////////
// GET CHAT LIINES -------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
/**
 * @function containsMobNameLine - Detects noping entities 
 * @param {number} numLines - Number of lines to search for the mob's name in
 * @param {string} givenMobName - A string param of the mob's name for detection
 * @returns {*} true if the mob's name matches line in chatHistory 
 */
export function containsMobNameLine(numLines, givenMobName) {
    const chatHistory = ChatLib.getChatLines().slice(0, numLines);
    for (let cx = 0; cx < chatHistory.length; cx++) {
        if (chatHistory[cx] && chatHistory[cx].includes(givenMobName) && !chatHistory[cx].includes(`killed by ${givenMobName}`)) {
            return true;
        }
        return false;
    }
}


////////////////////////////////////////////////////////////////////////////////
// ENTITIES --------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
/**
 * @function detectEntity - Detects noping entities 
 * @param {string} givenMobName - A string param of the mob's name for detection
 * @returns {*} Rendered Display of the mobs' health at the default position
 */
export function detectEntity(entityType, givenMobName, givenInfo) {
    const nearbyMobEntities = World.getAllEntitiesOfType(entityType)
        .filter(mobEntity => {
            const mobName = mobEntity.getName().removeFormatting();
            return mobName.includes(givenMobName);
        });

        if (nearbyMobEntities.length > 0 && !containsMobNameLine(3, givenMobName)) {
            givenInfo.found = true;
            givenInfo.names = [];
            for (const mobEntity of nearbyMobEntities) {
                givenInfo.names.push(mobEntity.getName());
            }
            if (!givenInfo.titleShown) {
                showAlert(`${givenMobName} detected`)
                // sendMessage(`${givenInfo.names.length} ${givenMobName}s detected nearby`)

                ChatLib.chat(`${givenMobName} detected nearby`)
                data.audioInst.playDefaultSound();
                givenInfo.titleShown = true;
            }
        givenInfo.found = false;
        givenInfo.titleShown = false;
    }
}

////////////////////////////////////////////////////////////////////////
// DISPLAY HEALTH OF ENTITY --------------------------------------------
////////////////////////////////////////////////////////////////////////
export function displayEntity(entityFound, entityNames, x, y) {
    if (entityFound) {
        const stringInfo = entityNames.join('\n');
        Renderer.drawString(stringInfo, x, y)
    }
}

export function getHealth(healthStr) {
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

////////////////////////////////////////////////////////////////////////
// DETECT DOUBLE HOOK ENTITIES -----------------------------------------
////////////////////////////////////////////////////////////////////////
export function detectDH(entityType, givenMobName, givenFormatCode, nameException, givenMobInfo) {
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
                givenMobInfo.currHealth = getHealth(mobMatch[2]) // get current hp
                givenMobInfo.totalHealth = getHealth(mobMatch[3]) // get max hp
            }
            givenMobInfo.names.push(mobIdx.getName());
        }
    } else { 
        givenMobInfo.found = false; 
    }
    
    const last10 = ChatLib.getChatLines().slice(0, 10);
    let hasMob = false;
    let hasDoubleMob = false;
    
    for (let idx = 0; idx < last10.length; idx++) {
        if (!last10[idx] && (!last10[idx].includes(`Doublehook ${givenMobName} Detected!`) || !last10[idx].includes(`Detected ${givenMobName} nearby`))) break;
        hasMob = hasMob || last10[idx].includes(givenMobName);
        hasDoubleMob = hasDoubleMob || last10[idx].includes(`Doublehook ${givenMobName}`);
    }
    
    givenMobInfo.numNearby = nearbyMobEntities.length;
    
    if (givenMobInfo.numNearby === 0) { givenMobInfo.titleShown = false; givenMobInfo.messageSent = false;}
    
    // noping nearby detection
    if (givenMobInfo.titleShown) return; // doesnt really change anythign
    if (givenMobInfo.numNearby === 1 && givenMobInfo.currHealth >= (givenMobInfo.totalHealth / 2)) {
        showAlert(`${givenFormatCode}${givenMobName} Nearby!`)
        data.audioInst.playDefaultSound();
        if (!hasMob) { 
            setTimeout(() => { 
                sendMessage(`Detected ${givenMobName} nearby!`); 
                givenMobInfo.messageSent = true;
            }, 150); 
        }
        givenMobInfo.titleShown = true;
    }
    
    // doublehook detection
    if (givenMobInfo.numNearby >= 2 && givenMobInfo.currHealth >= (givenMobInfo.totalHealth / 2)) {
        showAlert(`${givenFormatCode}Doublehook ${givenMobName}!`)
        data.audioInst.playDefaultSound();
        if (!hasDoubleMob) { 
            setTimeout(() => {
                sendMessage(`Doublehook ${givenMobName} Detected!`) 
                givenMobInfo.messageSent = true;
            }, 150);
        }
        givenMobInfo.titleShown = true;
    }
    givenMobInfo.foundNearby = givenMobInfo.numNearby > 0;
}

////////////////////////////////////////////////////////////////////////////////
// CREATE GUI COMMAND ----------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
export function createGuiCommand(guiName, cmdName, cmdAliases) {
    register('command', () => {
        guiName.open();
    }).setName(cmdName).setAliases(cmdAliases);
}


////////////////////////////////////////////////////////////////////////////////
// FILTER TAB NAMES ------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
export function getFilteredPlayerTabNames() {
    if (!World.isLoaded()) return;
    return TabList.getNames()
        .filter(name => /\[.*\]/.test(name))
        .map(name => name.split(' ')[1].removeFormatting());
}


////////////////////////////////////////////////////////////////////////////////
// NEARBY PLAYERS  -------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
export function getNearbyPlayers(maxDistance) {
    return World.getAllEntitiesOfType(data.entityPlayer)
        .filter(player => player.distanceTo(Player.getPlayer()) < maxDistance);
}


////////////////////////////////////////////////////////////////////////////////
// FILTER BOT NAMES ----------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
export function filterBotNames(players, tabNames) {
    const regex = /taurus/i;
    return players
        .filter(player => !regex.test(player.getName()))
        .map(player => player.getName())
        .filter(name => tabNames.includes(name));
}


////////////////////////////////////////////////////////////////////////////////
// RENDER DISPLAY TEXT ---------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
export function renderGuiPosition(gui, position, infoText) {
    if (gui.isOpen()) {
        Renderer.drawString(`x: ${Math.round(position.x)}, y: ${Math.round(position.y)}`, parseInt(position.x) - 65, parseInt(position.y) - 12, false);
        Renderer.scale(1);
        Renderer.drawStringWithShadow(infoText, position.x, position.y);
    }
}


////////////////////////////////////////////////////////////////////////////////
// DISPLAY ENTITY HP -----------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
export function displayEntityHP(names, foundEntity, x, y) {
    if (names.length > 0 && foundEntity) {
        const stringOfNames = names.join('\n');
        Renderer.drawString(stringOfNames, x, y);
    }
}


////////////////////////////////////////////////////////////////////////////////
// CONSTRAIN COORDS ------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
export function constrainX(x, margin, stringW) {
    let result = 0;
    if (x < margin) {
        result = margin
    } else if (x > data.screenW - margin - stringW) {
        result = data.screenW - margin - stringW;
    } else {
        result = x;
    }
    return result; 
}

export function constrainY(y, margin, stringH) {
    let result = 0;
    if (y < margin) {
        result = margin;
    } else if (y > data.screenH - margin - stringH) {
        result = data.screenH - margin - stringH;
    } else {
        result = y;
    }
    return result;
}

export function getNumLines(givString) {
    let lines = 1;
    if (givString.includes('\n')) {
        lines = givString.split('\n').length;
    }
    return lines;
}


export function centerCoords(givenString, x, y) {
    let screenW = Renderer.screen.getWidth();
    let screenH = Renderer.screen.getHeight();
    x = screenW - (Renderer.getStringWidth(givenString) / 2);
    y = screenH - 5;
}


////////////////////////////////////////////////////////////////////////
// CONVERT SECONDS TO MS -----------------------------------------------
////////////////////////////////////////////////////////////////////////
export function sToMs(seconds) {
    return seconds * 1000;
}

////////////////////////////////////////////////////////////////////////
// UPDATE CD TEXT FOR TIMERS --------------------------------------------
////////////////////////////////////////////////////////////////////////
export function updateCDText(colorCode, displayName, cd) {
    let timerText = '';
    if (cd < 0) timerText = '';
    if (cd === 0) timerText = '';
    else {
        const hours = Math.floor(cd / 3600);
        const minutes = Math.floor((cd % 3600) / 60);
        const seconds = cd % 60;
        if (hours > 0) {
            timerText = `${colorCode}${displayName}: &r${hours}h ${minutes}m`;
        } else if (minutes > 0) {
            timerText = `${colorCode}${displayName}: &r${minutes}m ${seconds}s`;
        } else {
            timerText = `${colorCode}${displayName}: &r${seconds}s`;
        }
    }
    return timerText + '\n';
}

export function updatePlotTimerText(cd) {
    let timerText = cd;
    return timerText;
}


// get current location of player
export function getPlayerLocation() {
    const scoreboardLines = Scoreboard.getLines();
    for (const line of scoreboardLines) {
        const formattedLine = line.toString();
        if (formattedLine.includes('⏣')) {
            const matchChar = new RegExp(formattedLine[16], 'g');
            const noFormatLine = formattedLine.replace(matchChar, '');
            return noFormatLine.trim();
        }
    }
}

// register setting -- contains
export function registerSettingContains(settingName, criteria, title) {
    register('chat', (event) => {
        if (!data.inSkyblock) return;
        if (!settingName) return;
        showAlert(title);
        data.audioInst.playDefaultSound();
    }).setCriteria(criteria).setContains();
}

////////////////////////////////////////////////////////////////////////
// PUBLIC SPEAKING DEMON -----------------------------------------------
////////////////////////////////////////////////////////////////////////
export function generateRandomStr(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    // Shuffle the characters in the result string
    result = result.split('').sort(function() { return 0.5 - Math.random() }).join('');
    return result;
}


////////////////////////////////////////////////////////////////////////
// CHARGE COUNTER ------------------------------------------------------
////////////////////////////////////////////////////////////////////////
export function closest(num, arr) {
    if (arr.length === 0) return 'No Bottle Available';
    let curr = arr[0];
    arr.forEach(val => {
        if (Math.abs(num - val) < Math.abs(num - curr)) {
            curr = val;
        }
    });
    return curr;
}

export function getCharges(chargeString) {
    const chargeRegex = /^Charge: (\d{1,3}(?:,\d{3})*)\/50,000$/;
    const chargeMatch = chargeString.match(chargeRegex);
    if (chargeMatch) {
        charges = chargeMatch[1];
    }
    return charges.replace(/,/g, '');
}


// player pos
export function getPlayerPos() {
    const playerX = Player.getX().toFixed(0);
    const playerY = Player.getY().toFixed(0);
    const playerZ = Player.getZ().toFixed(0);
    const pos_str = "x: " + playerX + ", y: " + playerY + ", z: " + playerZ
    return pos_str;
}


// player area
export function getPlayerPOI() {
    let playerLocation = '';
    const scoreboard_lines = Scoreboard.getLines();
	scoreboard_lines.forEach(line => {
		const formLine = line.toString();
		const rmChar = formLine[16];
		const matchChar = new RegExp(rmChar, 'g');
		const noform_line = formLine.replace(matchChar, '');
		if (noform_line.includes('⏣')) { 
            const loc = noform_line.trim().removeFormatting(); 
            const rmChar2 = loc[11]
            const matchChar2 = new RegExp(rmChar2, 'g');
            playerLocation = loc.replace(matchChar2, '');
        }
	});
    return playerLocation;
}

export function delayMessage(prefix, message, ms) {
    if (prefix === 'client') {
        setTimeout(() => {
            ChatLib.chat(message);
        }, ms)
    }
    if (prefix === 'announce') {
        setTimeout(() => {
            ChatLib.command(`ac ${message}`);
        }, ms)
    }
    if (prefix === 'auto') {
        setTimeout(() => {
            sendMessage(message)
        }, ms)
    }
    if (prefix === 'console') {
        setTimeout(() => {
            console.log(message)
        }, ms)
    }
}

export function getTabArea() {
    if (!World.isLoaded()) return;
    const rawArea = TabList.getNames()[41]
    if (rawArea) {
        const area = rawArea.removeFormatting().trim().split(': ')[1];
        return area;
    }
}

export function formatMoney(moneyAmt) {
    if (moneyAmt < 1000000) {
        const formattedMoney = (moneyAmt / 1000).toFixed(1); // (k)
        return `${formattedMoney}k`;
    } else {
        const formattedMoney = (moneyAmt / 1000000).toFixed(1); // (m)
        return `${formattedMoney}m`;
    }
};

export function timeToSeconds(hours, minutes, seconds) {
    return hours * 3600 + minutes * 60 + seconds;
}

export function getThunderBottle() {
    if (!World.isLoaded()) return;
    if (!data.inSkyblock) return;
    let skullItems = []; // list of slot number for skulls
    const invItems = Player.getInventory().getItems();
    for (let idx = 0; idx < invItems.length; idx++) {
        if (invItems[idx] !== null && invItems[idx].toString().includes('item.skull')) {
            skullItems.push(idx);
        }
    }

    let allCharges = [];
    skullItems.forEach(slotNum => {
        // get name in slot
        const slotItem = Player.getInventory().getStackInSlot(slotNum).getLore();
        
        // filter out for 'thunder in a bottle' or 'empty thunder bottle'
        if (slotItem[0].toLowerCase().includes('thunder in a bottle') || slotItem[0].toLowerCase().includes('empty thunder bottle')) {
            
            // filter charges
            if (slotItem[0].toLowerCase().includes('thunder in a bottle')) {
                const fullCharge = getCharges(slotItem[6].removeFormatting());
                allCharges.push(fullCharge)
            }
            if (slotItem[0].toLowerCase().includes('empty thunder bottle')) {
                const partialCharge = getCharges(slotItem[5].removeFormatting());
                allCharges.push(partialCharge)
            }
        }
    })
    // find closest one to 50,000
    closestCharge = closest(50000, allCharges);
    return closestCharge;
}

let rarityCode = {
    "1": "&r", 
    "2": "&a", 
    "3": "&9", 
    "4": "&5", 
    "5": "&6", 
    "6": "&d", 
    "7": "&b", 
}
let rarityName = {
    "1": "Common", 
    "2": "Uncommon", 
    "3": "Rare", 
    "4": "Epic", 
    "5": "Legendary", 
    "6": "Mythic", 
    "7": "Divine"
}

export function pingDolphinMS(killCount) {
    if (killCount === 250) rarity = 1;
    if (killCount === 1000) rarity = 2;
    if (killCount === 2500) rarity = 3;
    if (killCount === 5000) rarity = 4;
    if (killCount === 10000) rarity = 5;

    showAlert(`${rarityCode[rarity]}Dolphin`)
    sendMessage(`gg ${rarityName[rarity]} Dolphin @ ${killCount} kills`)
    if (rarity === 5) {
        playSound();
    } else {
        data.audioInst.playDefaultSound();
    }
}
export function petDropPing(message, exclamation, petName, mf) {
    let rarity = '';
    if (message.includes(`&r${petName}`) || message.include(`&f${petName}`)) { rarity = 1; } // common
    if (message.includes(`&a${petName}`)) { rarity = 2; } // uncommon
    if (message.includes(`&9${petName}`)) { rarity = 3; } // rare
    if (message.includes(`&5${petName}`)) { rarity = 4; } // epic
    if (message.includes(`&6${petName}`)) { rarity = 5; } // legendary
    if (message.includes(`&d${petName}`)) { rarity = 6; } // mythic
    if (message.includes(`&b${petName}`)) { rarity = 7; } // divine // doesnt exist

    showAlert(`${rarityCode[rarity]}${petName}`);

    if (petName === 'Rat' || petName === 'Slug') {
        sendMessage(`${exclamation} ${rarityName[rarity]} ${petName} (+${mf}☘)`)
        rarity > 4 ? playSound() : data.audioInst.playDefaultSound();
    }
    if (petName === 'Scatha') {
        sendMessage(`${exclamation} ${rarityName[rarity]} ${petName} (+${mf})% ✯ Magic Find)`)
        playSound();
    }
    if (petName === 'Baby Yeti') {
        yetiStat = rarity > 4 ? data.waterSC.yetiSinceLegPet : data.waterSC.yetiSinceEpicPet;
        sendMessage(`${exclamation} ${rarityName[rarity]} ${petName} (+${mf})% ✯ Magic Find) [${yetiStat} Yetis since]`)
        rarity > 4 ? playSound() : data.audioInst.playDefaultSound();

    } else {
        let noMFText = `${exclamation} You caught a ${rarityName[rarity]} [Lvl 1] ${petName}`
        let withMFText = `${exclamation} ${rarityName[rarity]} ${petName} (+${mf})% ✯ Magic Find)`
        mf === 0 ? sendMessage(noMFText) : sendMessage(withMFText);
        rarity > 4 ? playSound() : data.audioInst.playDefaultSound();
    }
}

export function determinePlayerRankColor(rank) {
    let rankColor = '&7'; // no rank 
    if (rank === 'VIP' || rank === 'VIP+') rankColor = '&a';
    if (rank === 'MVP' || rank === 'MVP+') rankColor = '&b';
    if (rank === 'MVP++') rankColor = '&6';
    return rankColor;
}

export function sendSelf(message) {
    ChatLib.command(`cc ${message}`);
}

export function sendGuild(message) {
    ChatLib.command(`gc ${message}`)
}

export function drawBonzoBox(x, y, z, givColor, seethru) {
    let colorCode = colorToRgb(givColor);
    RenderLib.drawEspBox(x, y, z, 0.25, 0.25, colorCode.red, colorCode.green, colorCode.blue, 1, seethru);
}

export function drawBeacon(x, y, z, givColor, alpha, seethru) {
    let colorCode = colorToRgb(givColor);
    RenderLib.drawInnerEspBox(x, y, z, 1, 1, colorCode.red, colorCode.green, colorCode.blue, alpha, seethru)
    // RenderLib.drawinnerEspBox(x, y, z, 1, 1, colorCode.red, colorCode.green, colorCode.blue, .5, seethru)
}

export function drawOutlineBeacon(x, y, z, givColor, alpha, seethru) {
    let colorCode = colorToRgb(givColor);
    RenderLib.drawEspBox(x, y, z, 1, 1, colorCode.red, colorCode.green, colorCode.blue, alpha, seethru)
}

export function drawLine(x1, y1, z1, x2, y2, z2, givColor, seethru) {
    let colorCode = colorToRgb(givColor);
    drawLine3d(x1, y1, z1, x2, y2, z2, colorCode.red, colorCode.green, colorCode.blue, 1, 3, seethru);
}

export function colorToRgb(input) {
    if (/^#([0-9A-F]{3}){1,2}$/i.test(input)) {
        input = input.replace('#', '');
  
        if (input.length === 3) {
            input = input
                .split('')
                .map(char => char + char)
                .join('');
        }
  
        const red = parseInt(input.substring(0, 2), 16);
        const green = parseInt(input.substring(2, 4), 16);
        const blue = parseInt(input.substring(4, 6), 16);

        return { red, green, blue };
    }

    const colorNames = {
        red: 'FF0000',
        green: '00FF00',
        blue: '0000FF',
        light_blue: '00FFFB',
        teal: '00FFBB',
        purple: 'A200FF', 
        pink: 'FF00E1', 
        light_purple: 'FF99CC', 
        white: 'FFFFFF', 
        black: '000000', 
        gray: '858585'
    };

    const normalizedInput = input.toLowerCase();
    if (colorNames[normalizedInput]) {
        return colorToRgb(`#${colorNames[normalizedInput]}`);
    }
}

export function centerCoordinates(x, y, z) {
    let cx = Math.round(x * 2) / 2; // Round to the nearest 0.5
    let cy = Math.round(y * 2) / 2;
    let cz = Math.round(z * 2) / 2;
    
    const originalFractionalX = x - Math.floor(x);
    if (originalFractionalX < 0.25) {
        cx = Math.floor(x) + 0.5; // Round down to 93.5
    } else if (originalFractionalX > 0.75) {
        cx = Math.ceil(x) - 0.5; // Round up to 94.5
    }

    const originalFractionalZ = z - Math.floor(z);
    if (originalFractionalZ < 0.25) {
        cz = Math.floor(z) + 0.5;
    } else if (originalFractionalZ > 0.75) {
        cz = Math.ceil(z) - 0.5;
    }

    return { x: cx, y: cy, z: cz };
}

export function getSkyBlockTime() {
    // Constants
    const epochTime = 1560275700000; // Tuesday, June 11th, 2019, at 10:55:00 AM GMT-07:00 DST
    const secondsInMinute = 60;
    const minutesInHour = 60;
    const minutesInSkyBlockHour = minutesInHour / 0.83;
    const hoursInDay = 24;
    const daysInSkyBlockYear = 372;
    const seasonsInYear = 4;
    const hoursInSkyBlockYear = daysInSkyBlockYear * hoursInDay;
  
    // Calculate elapsed skyblock time
    const elapsedSkyBlockMinutes = (epochTime / secondsInMinute) / 0.83;
    const elapsedSkyBlockHours = elapsedSkyBlockMinutes / minutesInSkyBlockHour;
  
    // Calculate current season
    const currentSeason = Math.floor((elapsedSkyBlockHours / hoursInSkyBlockYear) * seasonsInYear) % seasonsInYear;
  
    // Calculate time until next season
    const timeUntilNextSeason = hoursInSkyBlockYear - (elapsedSkyBlockHours % hoursInSkyBlockYear);
  
    // Convert time until next season to real time
    const realTimeHours = Math.floor(timeUntilNextSeason / minutesInSkyBlockHour);
    const realTimeMinutes = Math.floor((timeUntilNextSeason % minutesInSkyBlockHour) * 0.83);
  
    // Map current season based on 3-month intervals
    const seasonsMap = ['Spring', 'Summer', 'Autumn', 'Winter'];
    const currentRealTimeSeason = seasonsMap[Math.floor((elapsedSkyBlockHours / hoursInSkyBlockYear) * 4) % seasonsInYear];
  
    return {
        currentSeason: currentRealTimeSeason,
        timeUntilNextSeason: {
            realTimeHours,
            realTimeMinutes
        }
    };
}

/** regex for plot name: https://regex101.com/r/hq04eN/1 */
export function getCell(plotConfigGui, index) {
    const slotIdx = plotConfigGui.getStackInSlot(index)
    // console.log(slotIdx)
    if (slotIdx){
        const slotName = slotIdx.getLore()[0].removeFormatting()
        // console.log(slotName)
        const slotMatch = slotName.match(/Plot - (.+?) \(\#\d+(?:\/\d+)?\)/);
        const barnMatch = slotName.match(/^(The Barn)\s\(#(\d+)\)$/i);
        if (barnMatch) {
            return barnMatch[1]
        }
        if (slotMatch) {
            return slotMatch[1];
        }
    }
}

export function getSlotInfo(plotConfigGui, index) {
    const slotIdx = plotConfig.getStackInSlot(index);
    return slotIdx;
}

//  function for scaling/translating/rotating/drawing the player's arrow position
export function drawArrow(arrowImage, scale, rotation, x, y) {
    let arrowSize = 10;
    Renderer.scale(scale);
    Renderer.translate(x, y, 2);
    Renderer.rotate(rotation);
    Renderer.drawImage(arrowImage, -arrowSize/2, -arrowSize/2, arrowSize, arrowSize);
}

// function for drawing scaled strings
export function drawScaledString(displayString, x, y, scale, shadow=false) {
    Renderer.scale(scale);
    if (shadow) {
        Renderer.drawStringWithShadow(displayString, x, y);
    } else {
        Renderer.drawString(displayString, x, y)
    }
}

// function to update property of plot in plots
export function updatePlots(arr3d, plotName, propertyName, propertyValue) {
    let plotInst;
    for (let i = 0; i < arr3d.length; i++) {
        for (let j = 0; j < arr3d[i].length; j++) {
            // console.log(arr3d[i][j])
            if (arr3d[i][j].name === plotName) {
                plotInst = arr3d[i][j];
            }
        }
    }
    
    if (plotInst) {
        plotInst[propertyName] = propertyValue;
    }
}

export function getPlotInst(arr3d, plotName) {
    let plotInst;
    for (let i = 0; i < arr3d.length; i++) {
        for (let j = 0; j < arr3d[i].length; j++) {
            if (arr3d[i][j].name === plotName) {
                plotInst = arr3d[i][j];
                return plotInst;
            }
        }
    }
}

export function colorPlot(plotObj) {
    if (plotObj.name === 'The Barn') return '&a';
    if (plotObj.pest) return '&c';
    if (plotObj.spray) return '&2';
    return '&7';
}

export function startSprayTimer(array, plotName) {
    let plotObj = getPlotInst(array, plotName)
    if (plotObj.spray === false) return;
    // plotObj.sprayDateEnd = new Date();
    plotObj.sprayDateEnd.setMinutes(plotObj.sprayDateEnd.getMinutes() + 30); // 30 minutes (spray duration)
    updateInterval(array, plotName);
}

export function updateInterval(array, plotName) {
    let plotObj = getPlotInst(array, plotName);
    if (plotObj.spray === false) return;
    
    let timeLeft = Number((plotObj.sprayDateEnd - new Date()) / 1000);
    
    plotObj.sprayTimerText = `&0${Math.floor(timeLeft / 60)}`

    if (timeLeft === 0 || timeLeft < 0) {
        plotObj.spray = false;
        plotObj.sprayTimerText = '';
        ChatLib.chat(`&eSpray in &c${plotName}&e has expired!`)
        data.audioInst.playDefaultSound();

    } else {
        timeLeft -= 1;
        register("renderOverlay", () => {
            Renderer.drawString(plotObj.sprayTimerText, plotObj.sprayDisPos[0], plotObj.sprayDisPos[1])
        });
        setTimeout(() => {
            updateInterval(array, plotName)
        }, 1000)
    }
}

export function formatTime(seconds) {
    let timerText = '';
    if (cd < 0) timerText = '';
    if (cd === 0) timerText = '';
    else {
        const hours = Math.floor(cd / 3600);
        const minutes = Math.floor((cd % 3600) / 60);
        const seconds = cd % 60;
        if (hours > 0) {
            timerText = `&r${hours}h ${minutes}m`;
        } else if (minutes > 0) {
            timerText = `&r${minutes}m ${seconds}s`;
        } else {
            timerText = `&r${seconds}s`;
        }
    }
    return timerText + '\n';
}

export function checkLSRange(entity) {
    entityX = entity.getX();
    entityY = entity.getY();
    entityZ = entity.getZ();
    xDiff = Math.pow(Player.getX() - entityX, 2);
    yDiff = Math.pow(Player.getY() - entityY, 2);
    zDiff = Math.pow(Player.getZ() - entityZ, 2);
    distFromMob = Math.sqrt(xDiff + yDiff + zDiff);
    return distFromMob;
}

export function calcSkillXP(xp) {
    let currLevel = 0;
    let basicXP = {
        '1': 1000,
        '2': 2000,
        '3': 5000,
        '4': 7500,
        '5': 10000,
    }
    for (let i = 0; i < basicXP.length; i++) {
        if (xp <= basicXP[i]) {
            currLevel = i;
            return currLevel;
        }
    }
}

export function crossLoadTimer(dataUsedVar, dataTargetVar) {
    if (dataUsedVar) {
        const targetTime = new Date(dataTargetVar);
        return ((targetTime - new Date()) / 1000).toFixed(0);
    } else {
        return 0;
    }
}

export function getTimerTarget(cooldown, timeType) {
    const targetTime = new Date();
    if (timeType === 's') targetTime.setSeconds(targetTime.getSeconds() + cooldown);
    if (timeType === 'm') targetTime.setMinutes(targetTime.getMinutes() + cooldown);
    if (timeType === 'h') targetTime.setHours(targetTime.getHours() + cooldown);
    return targetTime;
}

export function trackChatTimer(dataUsedVar, dataTargetVar, varTimeLeft, nameOfTimer, colorCode) {
    console.log('running func: trackChatTimer')
    console.log(`trackchattimer val: ${varTimeLeft}`)
    let updatedTimeLeft = varTimeLeft;
    if (updatedTimeLeft > 0) {
        dataUsedVar = true;
        updatedTimeLeft -= 1;
        updateCDText(colorCode, nameOfTimer, updatedTimeLeft);
    } else if (updatedTimeLeft === 0 || updatedTimeLeft < 0) {
        dataUsedVar = false;
        showAlert(`&c${nameOfTimer} &eExpired`)
        data.audioInst.playDefaultSound();
        if (nameOfTimer === 'Pest Repellent') ChatLib.chat(`&eYour &cPest Repellent Bonus Farming Fortune &ehas worn off!`);
        ChatLib.chat(`&eYour &c${nameOfTimer} &ehas expired.`)
        dataTargetVar = 0;
        updateCDText(colorCode, nameOfTimer, updatedTimeLeft);
    }
    console.log(`updatedtimeleft: ${updatedTimeLeft}`)
    return updatedTimeLeft;
}



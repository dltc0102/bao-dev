import RenderLib from 'RenderLib/index.js';
import Settings from '../settings.js';
import Audio from '../utils/audio.js'

import { sendMessage } from '../utils/party.js';
import { showAlert } from '../utils/utils.js';

const funcAudio = new Audio();

const rarityCode = {
    "1": "&r", 
    "2": "&a", 
    "3": "&9", 
    "4": "&5", 
    "5": "&6", 
    "6": "&d", 
    "7": "&b", 
}
const rarityName = {
    "1": "Common", 
    "2": "Uncommon", 
    "3": "Rare", 
    "4": "Epic", 
    "5": "Legendary", 
    "6": "Mythic", 
    "7": "Divine"
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

const romanNumerals = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
};

// inSkyblock
export function getInSkyblock() {
    return true;
    // return ChatLib.removeFormatting(Scoreboard.getTitle()).includes("SKYBLOCK");
}

// currArea
export function getCurrArea() {
    if (!getInSkyblock() || !World.isLoaded()) return;
    const rawArea = TabList.getNames()[41]
    if (rawArea) {
        const area = rawArea.removeFormatting().trim().split(': ')[1];
        return area;
    }
}

// dungeons
export function getInDungeon() {
    return getCurrArea() === 'Catacombs';
}

// dungon hub
export function getInDHub() {
    return getCurrArea() === 'Dungeon Hub';
}

// end
export function getInEnd() {
    return getCurrArea() === 'The End';
}

// crimson isles
export function getInCI() {
    return getCurrArea() === 'Crimson Isle';
}

// garden
export function getInGarden() {
    return getCurrArea() === 'Garden';
}

// jerry island
export function getInJerry() {
    return getCurrArea() === "Jerry's Workshop";
}

// crystal hollows
export function getInCH() {
    return getCurrArea() === 'Crystal Hollows';
}

// hub
export function getInHub() {
    return getCurrArea() === 'Hub';
}

// desert
export function getInDesert() {
    return getCurrArea() === 'The Farming Islands';
}

// island
export function getInIsland() {
    return getCurrArea() === 'Private Island';
}

// dwarven mines
export function getInMines() {
    return getCurrArea() === 'Dwarven Mines';
}

////////////////////////////////////////////////////////////////////////////////
// SOUND ----------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
/**
 * @function playSound - plays RNG sound based on selection in GUI
 * @returns played sound for RNG drops
 */
export function playSound() {
    if (Settings.rng_sound_sel === 0) funcAudio.playDefaultSound();
    if (Settings.rng_sound_sel === 1) funcAudio.playCatSong();
    if (Settings.rng_sound_sel === 2) funcAudio.playNitroSong();
    if (Settings.rng_sound_sel === 3) funcAudio.playBisSong();
    if (Settings.rng_sound_sel === 4) funcAudio.playChipiSong();
    
}

register('command', () => {
    playSound();
}).setName('rngtest', true);

////////////////////////////////////////////////////////////////////////////////
// ENTITIES --------------------------------------------------------------------
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
                funcAudio.playDefaultSound();
                givenInfo.titleShown = true;
            }
        givenInfo.found = false;
        givenInfo.titleShown = false;
    }
}


////////////////////////////////////////////////////////////////////////
// DISPLAY HEALTH OF ENTITY --------------------------------------------
////////////////////////////////////////////////////////////////////////
/**
 * getHealth() takes in a string parameter that ends in 'M' or 'k' and returns the unabbreviated number of the string passed in.
 * 
 * @function getHealth
 * @param {string} healthStr - A string param of the health of a mob that 
 * @returns {number} unabbreviated version of the string parameter
 * 
 * @example 
 *      getHealth('400k') returns 400000;
 *      getHealth('1M') returns 1000000;
 * 
 * @usedbyfunction detectDH()
 */
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


////////////////////////////////////////////////////////////////////////
// DETECT DOUBLE HOOK ENTITIES -----------------------------------------
////////////////////////////////////////////////////////////////////////
export function detectDH(entityType, givenMobName, givenFormatCode, nameException, givenMobInfo) {
    let nearbyMobEntities = World.getAllEntitiesOfType(entityType)
        .filter(mobEntity => {
            const mobName = mobEntity.getName().removeFormatting();
            return mobName.includes(givenMobName) && (!nameException || nameException !== null || !mobName.includes(nameException));
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
        funcAudio.playDefaultSound();
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
        funcAudio.playDefaultSound();
        if (!hasDoubleMob) { 
            setTimeout(() => {
                sendMessage(`Doublehook ${givenMobName} Detected!`);
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
// RENDER DISPLAY TEXT ---------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
export function renderGuiPosition(gui, position, infoText) {
    if (gui.isOpen()) {
        Renderer.drawString(`&cx: ${Math.round(position.x)}, y: ${Math.round(position.y)}`, parseInt(position.x) - 65, parseInt(position.y) - 12, false);
        Renderer.scale(1);
        Renderer.drawStringWithShadow(`&7${infoText}`, position.x, position.y);
    }
}


////////////////////////////////////////////////////////////////////////////////
// CONSTRAIN COORDS ------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
export function getLongestStrWidth(text) {
    let maxWidth = 0;
    const splittedStrings = text.split('\n');
    splittedStrings.forEach((str) => {
        const width = Renderer.getStringWidth(str);
        if (width > maxWidth) {
            maxWidth = width;
        }
    });
    if (maxWidth === 0) maxWidth = Renderer.getStringWidth(text);
    return maxWidth;
}
export function constrainX(x, margin, text) {
    let stringW = getLongestStrWidth(text);
    const screenW = Renderer.screen.getWidth();
    let result = 0;
    if (x < margin) {
        result = margin;
    } else if (x > screenW - margin - stringW) {
        result = screenW - margin - stringW;
    } else {
        result = x;
    }
    return result; 
}

export function constrainY(y, margin, text) {
    const screenH = Renderer.screen.getHeight();
    let stringH = getNumLines(text) * 10;
    stringH = stringH > 50 ? stringH-20 : stringH;
    let result = 0;
    if (y < margin) {
        result = margin;
    } else if (y > screenH - margin - stringH) {
        result = screenH - margin - stringH;
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
            displayName === 'Flux' ? 
            timerText = `${colorCode}[&r${displayName}${colorCode}]&r: &b${hours}h ${minutes}m` : timerText = `${colorCode}${displayName}: &r${hours}h ${minutes}m`;
        } else if (minutes > 0) {
            displayName === 'Flux' ? timerText = `${colorCode}[&r${displayName}${colorCode}]&r: &b${minutes}m ${seconds}s` : timerText = `${colorCode}${displayName}: &r${minutes}m ${seconds}s`;
        } else {
            displayName === 'Flux' ? timerText = `${colorCode}[&r${displayName}${colorCode}]&r: &b${seconds}s` : timerText = `${colorCode}${displayName}: &r${seconds}s`;
        }
    }
    return timerText + '\n';
}

// register setting -- contains
// fishing pings.js
export function registerSettingContains(settingName, criteria, title) {
    register('chat', (event) => {
        if (!getInSkyblock() || !World.isLoaded()) return;
        if (!settingName) return;
        showAlert(title);
        funcAudio.playDefaultSound();
    }).setCriteria(criteria).setContains();
}


// player pos -- mythos.js
export function getPlayerPos() {
    const playerX = Player.getX().toFixed(0);
    const playerY = Player.getY().toFixed(0);
    const playerZ = Player.getZ().toFixed(0);
    const pos_str = "x: " + playerX + ", y: " + playerY + ", z: " + playerZ
    return pos_str;
}


// player area -- mythos.js
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
            const rmChar2 = loc[11];
            const matchChar2 = new RegExp(rmChar2, 'g');
            playerLocation = loc.replace(matchChar2, '');
        }
	});
    return playerLocation;
}

// delaymessage -- mythos.js
export function delayMessage(prefix, message, ms) {
    if (prefix === 'client') {
        setTimeout(() => {
            ChatLib.chat(message);
        }, ms);
    }
    if (prefix === 'announce') {
        setTimeout(() => {
            ChatLib.command(`ac ${message}`);
        }, ms);
    }
    if (prefix === 'auto') {
        setTimeout(() => {
            sendMessage(message);
        }, ms);
    }
    if (prefix === 'console') {
        setTimeout(() => {
            console.log(message);
        }, ms);
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

export function secsToMS(seconds) {
    return seconds * 1000;
}

export function pingDolphinMS(killCount) {
    killCount = Number(killCount.replace(/,/g, ''));
    if (killCount === 250) rarity = 1;
    if (killCount === 1000) rarity = 2;
    if (killCount === 2500) rarity = 3;
    if (killCount === 5000) rarity = 4;
    if (killCount === 10000) rarity = 5;

    showAlert(`${rarityCode[rarity]}Dolphin`);
    sendMessage(`gg ${rarityName[rarity]} Dolphin @ ${killCount} kills`);
    if (rarity === 5) {
        playSound();
    } else {
        funcAudio.playDefaultSound();
    };
}
export function petDropPing(message, exclamation, petName, mf) {
    let rarity = '';
    if (message.includes(`&r${petName}`) || message.includes(`&f${petName}`)) { rarity = 1; } // common
    if (message.includes(`&a${petName}`)) { rarity = 2; } // uncommon
    if (message.includes(`&9${petName}`)) { rarity = 3; } // rare
    if (message.includes(`&5${petName}`)) { rarity = 4; } // epic
    if (message.includes(`&6${petName}`)) { rarity = 5; } // legendary
    if (message.includes(`&d${petName}`)) { rarity = 6; } // mythic
    if (message.includes(`&b${petName}`)) { rarity = 7; } // divine // doesnt exist

    showAlert(`${rarityCode[rarity]}${petName}`);

    if (petName === 'Rat' || petName === 'Slug') {
        sendMessage(`${exclamation} ${rarityName[rarity]} ${petName} (+${mf}☘)`);
        rarity > 4 ? playSound() : funcAudio.playDefaultSound();
    }
    if (petName === 'Scatha') {
        sendMessage(`${exclamation} ${rarityName[rarity]} ${petName} (+${mf})% ✯ Magic Find)`);
        playSound();
    }
    if (petName === 'Baby Yeti') {
        sendMessage(`${exclamation} ${rarityName[rarity]} ${petName} (+${mf})% ✯ Magic Find)`);
        rarity > 4 ? playSound() : funcAudio.playDefaultSound();

    } else {
        let noMFText = `${exclamation} You caught a ${rarityName[rarity]} [Lvl 1] ${petName}`;
        let withMFText = `${exclamation} ${rarityName[rarity]} ${petName} (+${mf})% ✯ Magic Find)`;
        mf === 0 ? sendMessage(noMFText) : sendMessage(withMFText);
        rarity > 4 ? playSound() : funcAudio.playDefaultSound();
    }
}

export function drawBonzoBox(x, y, z, givColor, seethru) {
    let colorCode = colorToRgb(givColor);
    RenderLib.drawEspBox(x, y, z, 0.25, 0.25, colorCode.red, colorCode.green, colorCode.blue, 10, seethru);
}

export function drawBeacon(x, y, z, givColor, alpha, seethru) {
    let colorCode = colorToRgb(givColor);
    RenderLib.drawInnerEspBox(x, y, z, 1, 1, colorCode.red, colorCode.green, colorCode.blue, alpha, seethru);
    // RenderLib.drawinnerEspBox(x, y, z, 1, 1, colorCode.red, colorCode.green, colorCode.blue, .5, seethru)
}

export function drawOutlineBeacon(x, y, z, givColor, alpha, seethru) {
    let colorCode = colorToRgb(givColor);
    RenderLib.drawEspBox(x, y, z, 1, 1, colorCode.red, colorCode.green, colorCode.blue, alpha, seethru);
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
    const slotIdx = plotConfigGui.getStackInSlot(index);
    // console.log(slotIdx)
    if (slotIdx){
        const slotName = slotIdx.getLore()[0].removeFormatting();
        // console.log(slotName)
        const slotMatch = slotName.match(/Plot - (.+?) \(\#\d+(?:\/\d+)?\)/);
        const barnMatch = slotName.match(/^(The Barn)\s\(#(\d+)\)$/i);
        if (barnMatch) {
            return barnMatch[1];
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
        Renderer.drawString(displayString, x, y);
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
    let plotObj = getPlotInst(array, plotName);
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
        ChatLib.chat(`&eSpray in &c${plotName}&e has expired!`);
        funcAudio.playDefaultSound();

    } else {
        timeLeft -= 1;
        register("renderOverlay", () => {
            Renderer.drawString(plotObj.sprayTimerText, plotObj.sprayDisPos[0], plotObj.sprayDisPos[1]);
        });
        setTimeout(() => {
            updateInterval(array, plotName);
        }, 1000);
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

export function regNearbyOrbs(dataObj) {
    const entityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");
    const nearbyOrbs = World.getAllEntitiesOfType(entityArmorStand)
            .filter(orbEntity => {
                const orbName = orbEntity.getName().removeFormatting();
                const effectiveRadius = orbEntity.distanceTo(Player.getPlayer());
                return (orbName.includes('Overflux') || orbName.includes('Plasmaflux')) && effectiveRadius < 19; 
            });

    if (nearbyOrbs.length > 0) {
        dataObj.found = true;
        dataObj.registered = [];
        for (const registeredOrb of nearbyOrbs) {
            const orbName = registeredOrb.getName().removeFormatting();
            if (orbName.includes('Overflux')) { dataObj.type = 5; dataObj.color = '&5';}
            if (orbName.includes('Plasmaflux')) { dataObj.type = 6; dataObj.color = '&d';}
            const countdownMatch = orbName.match(/(\d+)s/);
            if (countdownMatch) { dataObj.timeLeft = countdownMatch[1]; }
            dataObj.registered.push(orbName);
        }
        
        if (dataObj.timeLeft !== "") {
            if (dataObj.type === 5 || dataObj.type === 6) {
            const orbTypeColor = dataObj.type === 5 ? '&5' : '&d';
            dataObj.displayText = `${orbTypeColor}[&rFlux${orbTypeColor}]: &b${dataObj.timeLeft}s`;
            }
            if (dataObj.displayText === '[Flux]: 10s') ChatLib.chat('&c10s of Flux left!');
        }
    } else {
        dataObj.displayText = "";
        dataObj.found = false;
    }
}

export function checkTimeLeft(timerObj, name, ability) {
    if (timerObj.timeLeft > 0) {
        timerObj.used = true;
        timerObj.timeLeft -= 1;
    } else if (timerObj.timeLeft === 0) {
        funcAudio.playDefaultSound();
        if (name === 'Phoenix' || name === 'Spirit Mask' || name === 'Bonzo Mask') {
            ChatLib.chat(`&eYour ${name}'s &c${ability}&e ability has been refreshed!`);
            showAlert(`&a${ability} Available`);
        } else {
            if (name === 'Glowy Tonic') ChatLib.chat(`&eYour &2${name}&e has expired.`);
            if (name === 'Gummy Bear') ChatLib.chat(`&eYour &cReheated ${name}&e has expired.`);
            showAlert(`&a${ability} Expired`);

        }

        if (name !== 'Orb') timerObj.used = false;
        if (name !== 'Orb') timerObj.target = 0;
        if (name === 'Orb') timerObj.found = false;
    }
}

export function setTimer(timerObj) {
    timerObj.used = true;
    const targetTime = new Date();
    if (timerObj.name === 'Second Wind') {
        targetTime.setSeconds(targetTime.getSeconds() + timerObj.cd);
    } else { 
        targetTime.setMinutes(targetTime.getMinutes() + timerObj.cd);
    }
    timerObj.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    timerObj.target = targetTime;
}

export function filterSeparators(rawString, sepThin) {
    let filter = rawString.replace(/\n{2,}/g, '\n');
    let phraseArray = filter.split('\n');
    let lastIdx = -1;
    for (let i = phraseArray.length - 1; i >= 0; i--) {
        if (phraseArray[i].includes(sepThin)) {
            lastIdx = i;
            break;
        }
    }

    if (lastIdx !== -1) {
        phraseArray.splice(lastIdx, 1);
    }
    return phraseArray.join('\n');
}

export function romanToNumeral(romanStr) {
    let result = 0;
    if (romanStr) {
        let letters = romanStr.split("");
        for (var i = 0; i < letters.length; i++) {
            if (romanNumerals[letters[i]] < romanNumerals[letters[i + 1]]) {
                result -= romanNumerals[letters[i]]
            } else {
                result += romanNumerals[letters[i]]
            }
        }
    }
    return result;
}

export function drawDragonHitBox(x, y, z, colorStr) {
    let colorCode = colorToRgb(colorStr);
    RenderLib.drawEspBox(x, y, z, 16, 8, colorCode.red, colorCode.green, colorCode.blue, 1, false);
}
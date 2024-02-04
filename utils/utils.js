import Settings from '../settings.js';
import PogObject from 'PogData';

/**
 * Shows a chat message only visible to the client
 * @param {string} message - message to display for dev mode
 * @returns Chat message with information for debugging.
 */
export function debug(message) {
    if (Settings.toggle_debug) {
        setTimeout(() => {
            ChatLib.chat(`&7${message}`);
        }, 1)
    }
}

/**
 * Shows Title that alerts the user when event happens.
 * @param {string} title 
 * @returns Displayed Title.
 */
export function showAlert(someTitle) {
    Client.showTitle(someTitle, '', 1, 30, 1);
}

export function removeFromArray(array, value) {
    return array.filter(function (etu) {
        return etu.toLowerCase() != value.toLowerCase();
    })
}

// pogObject
export const baoUtils = new PogObject("bao-dev", {
    "firstTime": true, 
    "modPrefix": '&6[&3Bao&6]&r', 
    "screenH": Renderer.screen.getHeight(), 
    "screenW": Renderer.screen.getWidth(), 
    "thickSep": '==================', 
    "thinSep": '------------------',
    "baseTextH": 10,
    "currentTimestamp": 0,
}, './data/baoUtils.json');

// dungeon classes
export const importantItems = ['Hyperion', 'Dark Claymore', 'Terminator', "Giant's Sword", 'Infinileap', 'Diamond Pickaxe', 'Stonk', 'Ragnarock Axe', 'Spring Boots', 'Abiphone'];
export const dungeonClasses = ['Berserk', 'Archer', 'Tank', 'Healer', 'Mage'];

// player ranks
export function determinePlayerRankColor(rank) {
    let rankColor = ''; // no rank 
    if (rank === '[VIP]' || rank === '[VIP+]') rankColor = '&a';
    if (rank === '[MVP]' || rank === '[MVP+]') rankColor = '&b';
    if (rank === '[MVP++]') rankColor = '&6';
    return rankColor;
}

// SKYBLOCK TIME
function convertEpochTime(epochTimeInSeconds) {
    const milliseconds = epochTimeInSeconds * 1000;
  
    const dateObject = new Date(milliseconds);
  
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
  
    const readableTime = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  
    return readableTime;
}

const sbEpoch = 1560275700;
const result = convertEpochTime(sbEpoch);
// console.log(result);




// 1 sbMins = 60 sbSecs
// 1 sbHour = 60 sbMins
// 1 sbDay = 24 sbHours
// 1 sbMonth = 31 sbDays
// 1 sbSeason = 3 sbMonths (first: early, second: mid, third: late)
// 1 sbYear = 12 sbMonths

// jan 
// feb 
// mar 
// apr
// may
// jun
// jul
// aug
// sep
// oct
// nov
// dec

// 1 sbDecade = 10 sbYears
// 1 sbCentury = 100 sbYears
// 6am to 7pm = daytime
// 7pm to 6am = nighttime
// ghasts spawn between 9pm and 5am
// spooky mobs spawn at nighttime
// headless horseman can be spawned at nighttime
// rats can spawn at nighttime

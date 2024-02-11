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
export const baoFirstTime = new PogObject("bao-dev", {
    "firstTime": true,
}, './data/baoFirstTime.json');
baoFirstTime.autosave(5);

export const baoUtils = {
    "modPrefix": '&6[&3Bao&6]&r', 
    "screenH": Renderer.screen.getHeight(), 
    "screenW": Renderer.screen.getWidth(), 
    "thickSep": '==================', 
    "thinSep": '------------------',
    "baseTextH": 10,
    "currentTimestamp": 0,
};

// dungeon classes
export const dungeonClasses = ['Berserk', 'Archer', 'Tank', 'Healer', 'Mage'];

// player ranks
export function determinePlayerRankColor(rank) {
    let rankColor = ''; // no rank 
    if (rank === '[VIP]' || rank === '[VIP+]') rankColor = '&a';
    if (rank === '[MVP]' || rank === '[MVP+]') rankColor = '&b';
    if (rank === '[MVP++]') rankColor = '&6';
    return rankColor;
}

// render triggers unreg/reg 
let checkingTrigs = []; 
/**
 * Registers and unregisters the trigger depending on the result of the checkFunc. Use with render triggers to reduce lag when they are not being used.
 * @param {string} eventName 
 * @param {idek} callback
 * @param {() => boolean} checkFunc 
 * @returns {Trigger}
 */
export function registerWhen(eventName, callback, checkFunc) {
    const trigger = register(eventName, (...args) => {
        return checkFunc() && callback(...args);
    });
    checkingTrigs.push([trigger, checkFunc]);
    return trigger;
}

register('tick', () => {
    checkingTrigs.forEach(([trigger, func]) =>
        func() ? trigger.register() : trigger.unregister()
    );
});


// SKYBLOCK TIME
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
    "currArea": '',
    "inSkyblock": false,
    "screenH": Renderer.screen.getHeight(), 
    "screenW": Renderer.screen.getWidth(), 
    "thickSep": '==================', 
    "thinSep": '------------------',
    "baseTextH": 10,
}, './data/baoUtils.json');


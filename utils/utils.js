import Settings from '../settings.js';

/**
 * Shows a chat message only visible to the client
 * @param {string} message - message to display for dev mode
 * @returns Chat message with information for debugging.
 */
export function debug(message) {
    if (Settings.toggle_debug) ChatLib.chat(`&7${message}`);
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
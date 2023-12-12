import Settings from "../settings.js"
import Audio from '../utils/audio.js'
import { data } from '../utils/data.js'
// import { showAlert } from '../utils/utils.js'
import { playSound, generateRandomStr, hideMessage, getTabArea, timeToSeconds } from "../utils/functions.js"
// import { sendMessage, announce } from '../utils/party.js'

let currArea = '';
register('step', () => { currArea = getTabArea(); }).setFps(1);

const spookyAudio = new Audio();

// grandma wolf

register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.grandma_hider) return;
    cancel(event);
}).setCriteria('+5 Kill Combo +3✯ Magic Find');

register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.grandma_hider) return;
    cancel(event);
}).setCriteria('+10 Kill Combo +10 coins per kill');

register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.grandma_hider) return;
    cancel(event);
}).setCriteria('+15 Kill Combo +3✯ Magic Find');

register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.grandma_hider) return;
    cancel(event);
}).setCriteria('+20 Kill Combo +15☯ Combat Wisdom');

register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.grandma_hider) return;
    cancel(event);
}).setCriteria('+25 Kill Combo +3✯ Magic Find');


/** Jerry profits
 * sacks: 101m
 * yeti rod: 35m
 * epic yetis: 2x2m
 * leg yetis: 1x19m
 * epic flyfish: 2x800k
 * leg flyfish: 2x6.2m
 * hydra head: 2x3m
 * total = 179m
 */

// baker
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.get_baker_cake) return;
    setTimeout(() => {
        ChatLib.command('openbaker')
    }, 250)
}).setCriteria('CLICK HERE to get your SPECIAL new year cake!').setContains();
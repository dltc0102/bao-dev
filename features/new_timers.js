import Settings from '../settings.js'
import { data } from '../utils/data.js'
import { showAlert } from '../utils/utils.js'
import { sendMessage } from '../utils/party.js'
import { getActivePet } from '../utils/pet.js'
 

/**
 * @param {Date} upper Upper timestamp
 * @param {Date} lower Lower timestamp
 * @returns {Number | null} Difference in ms between upper and lower, or null if negative
 */
function timeDiff(upper, lower) {
    if (upper === null || lower === null) return null;
    console.log(`running timeDiff func...`)
    var timeLeft = upper - lower;
    var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return { minutes: minutes, seconds: seconds}
}


/**
 * 
 * @param {String} timeF m or s, depending on whether the timer is in minutes or seconds
 * @param {Number} cd Default duration of timer
 * @param {Number} parrotCD Duration of timer with parrot boost
 * @returns { Number, Number } Minutes and Seconds formatted from timeleft
 */
function setTimer(timestamp, timeF, cd, parrotCD) {
    const d = new Date(timestamp);
    if (timeF === 's') {
        getActivePet().includes('Parrot') ? d.setSeconds(parrotCD) : d.setSeconds(cd);
    } else if (timeF === 'm') {
        getActivePet().includes('Parrot') ? d.setMinutes(parrotCD) : d.setMinutes(cd);
    } else {
        console.log('error occurred running func: setTimer');
        console.log('params given: timestamp, timeF, cd, parrotCD');
        console.log(`timestamp: ${timestamp}`);
        console.log(`timeF: ${timeF}`);
        console.log(`cd: ${cd}`);
        console.log(`parrotCD: ${parrotCD}`);
        return;
    }
}

/**
 * 
 * @param {Number} timestamp Timestamp given
 * @returns new Date object using the timestamp given.
 */
function reloadTimer(timestamp) {
    if (storedTS === null && storedTS === undefined) return;

    // code
    const storedTS = timestamp;

    // debugs
    console.log(`running func: reloadTimer()`)
    console.log(`params(1): timestamp: ${timestamp}`)
    console.log(`storedTS: ${storedTS}`)
    console.log(`result: date obj: ${new Date(storedTS)}`)
    console.log(`result: date timestamp: ${new Date(storedTS).getTime()}`)
    
    return new Date(storedTS);
}

/**
 * 
 * @param {Number} timestamp Timestamp
 * @param {String} timeF m or s depending on the cooldown type for minutes or seconds
 * @param {Number} cooldown duration of the cooldown
 * @returns timestamp of set timestamp with duration of cooldown added.
 */
function setTimerCD(timestamp, timeF, cooldown) {
    const d = new Date(timestamp);
    if (timeF === 'm') d.setMinutes(cooldown);
    if (timeF === 's') d.setSeconds(cooldown);
    return d.getTime();
}

////////////////////////////////////////////////////////////////////
// HARVEST HARBRINGER POTION CD TIMER
////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    // if (!data.inSkyblock) return;
    if (!Settings.harvPotionOverlay) return;
    
    // code
    currentTime = new Date();
    let end = setTimer(timeF='m', cd=10, parrotCD=15);
    data.harvPotInfo.end = end;
    data.harvPotInfo.timestamp = end.getTime();
    data.audioInst.playDrinkSound();
    
    // debugs
    console.log(`reg chat: criteria: ('BUFF! You have gained Harvest Harbinger V! Press TAB or type /effects to view your active effects!'`)
    console.log(`reg chat: end: ${data.harvPotInfo.end}`)
    console.log(`reg chat: timestamp: ${data.harvPotInfo.timestamp}`)
}).setCriteria('BUFF! You have gained Harvest Harbinger V! Press TAB or type /effects to view your active effects!');

register('gameLoad', () => {
    if (!Settings.harvPotionOverlay) return;
    console.log('reg gameload triggered');
    if (data.harvPotInfo.end === null) {
        console.log(`reg gameload: data.timestamp: ${data.harvPotInfo.timestamp}`)
        console.log(`reg gameload: data.text: ${data.harvPotInfo.text}`)
        console.log(`returning...`)
        return;
    };
    console.log('reg gameload triggered');
    console.log('');
    console.log(`reg gameload: data.timestamp: ${data.harvPotInfo.timestamp}`)
    console.log(`reg gameload: data.text: ${data.harvPotInfo.text}`)

    // console.log(`timestamp before func run: ${data.harvPotInfo.end}`)
    // data.harvPotInfo.end = reloadTimer(data.harvPotInfo.timestamp);
    const storedTS = data.harvPotInfo.timestamp;
})

register('step', () => {
    if (!Settings.harvPotionOverlay) return;
    if (data.harvPotInfo.end !== null) {
        var now = new Date().getTime();
        var timeLeft = timeDiff(data.harvPotInfo.end, now);
        if (timeLeft.minutes === 0 && timeLeft.seconds === 0) {
            data.harvPotInfo.text = '';
            data.harvPotInfo.end = null; 
            showAlert('&6Harbringer Potion &cExpired')
            data.audioInst.playDefaultSound();
            ChatLib.chat('&cYour &6Harbringer Potion&c has run out!')
        }
        if (timeLeft.minutes < 0) timeLeft.minutes = 0;
        if (timeLeft.seconds < 0) timeLeft.seconds = 0;
    
        data.harvPotInfo.text = `&6Harbringer Potion: &r${isNaN(timeLeft.minutes) ? 0 : timeLeft.minutes}m ${isNaN(timeLeft.seconds) ? 0 : timeLeft.seconds}s`

    } else {
        // console.log(`reg step: data.end: ${data.harvPotInfo.end}`);
        // console.log(`reg step: data.text: ${data.harvPotInfo.text}`);
        // console.log(`reg step: data.timestamp: ${data.harvPotInfo.timestamp}`);
        return;
    }
}).setFps(1);

register('renderOverlay', () => {
    if (!Settings.harvPotionOverlay) return;
    if (data.harvPotInfo.end === null) return;
    if (data.harvPotInfo.text === '' || data.harvPotInfo.text === '&6Harbringer Potion: &r0m 0s') return;
    // console.log(`reg overlay: text: ${data.harvPotInfo.text}`)
    Renderer.drawString(data.harvPotInfo.text, 400, 40)
});
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
function timeDiff(upperTS, lower) {
    let upperDate = new Date(upperTS);
    if (upperDate === null || lower === null) return null;
    var timeLeft = upperDate - lower;
    var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    console.log('')
    console.log(`running timeDiff func...: minutes: ${minutes}, seconds: ${seconds}`);
    return { minutes: minutes, seconds: seconds}
}

/**
 * 
 * @param {String} timeF m or s, depending on whether the timer is in minutes or seconds
 * @param {Number} cd Default duration of timer
 * @param {Number} parrotCD Duration of timer with parrot boost
 * @returns { Number, Number } Minutes and Seconds formatted from timeleft
 */
function setTimer(timeF, cd, parrotCD) {
    console.log('')
    console.log(`running func: setTimer()`)
    const d = new Date();
    getActivePet().includes('Parrot') ? console.log('cd chosen: parrotCD') : console.log('cd chosen: default cd')
    if (timeF === 's') {
        console.log(`chosen time format: 's'`)
        getActivePet().includes('Parrot') ? d.setSeconds(d.getSeconds() + parrotCD) : d.setSeconds(d.getSeconds() + cd);
        return d.getTime();
    } if (timeF === 'm') {
        console.log(`chosen time format: 'm'`)
        getActivePet().includes('Parrot') ? d.setMinutes(d.getMinutes() + parrotCD) : d.setMinutes(d.getMinutes() + cd);
        return d.getTime();
    } else {
        console.log('error occurred running func: setTimer');
        console.log('params given: timestamp, timeF, cd, parrotCD');
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

////////////////////////////////////////////////////////////////////
// HARVEST HARBRINGER POTION CD TIMER
////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    // if (!data.inSkyblock) return;
    if (!Settings.harvPotionOverlay) return;
    
    // code
    currentTime = new Date();
    data.harvPotInfo.timestamp = setTimer(timeF='m', cd=10, parrotCD=15);
    data.audioInst.playDrinkSound();
    
    // debugs
    console.log('')
    console.log(`reg chat: criteria: 'BUFF! You have gained Harvest Harbinger V! Press TAB or type /effects to view your active effects!'`)
    console.log(`reg chat: timestamp: ${data.harvPotInfo.timestamp}`)
}).setCriteria('BUFF! You have gained Harvest Harbinger V! Press TAB or type /effects to view your active effects!');

register('gameLoad', () => {
    if (!Settings.harvPotionOverlay) return;
    console.log('');
    console.log('reg gameload triggered');
    if (data.harvPotInfo.timestamp === 0) {
        console.log(`reg gameload: data.timestamp: ${data.harvPotInfo.timestamp}`)
        console.log(`reg gameload: data.text: ${data.harvPotInfo.text}`)
        console.log(`returning...`)
        return;
    };
    console.log(`reg gameload: data.timestamp: ${data.harvPotInfo.timestamp}`)
    console.log(`reg gameload: data.text: ${data.harvPotInfo.text}`)

    // console.log(`timestamp before func run: ${data.harvPotInfo.end}`)
    // data.harvPotInfo.end = reloadTimer(data.harvPotInfo.timestamp);
    const storedTS = data.harvPotInfo.timestamp;
})

register('step', () => {
    if (!Settings.harvPotionOverlay) return;
    console.log('')
    console.log('reg step:')
    if (data.harvPotInfo.timestamp !== 0) {
        
        console.log('reg step: if data.harvpotinfo.timestamp !== 0:')
        var now = new Date().getTime();
        var timeLeft = timeDiff(data.harvPotInfo.timestamp, now);
        console.log(`reg step: now (timestmap): ${now}`)
        console.log(`reg step: timeLeft: ${timeLeft}`)

        if (timeLeft.minutes === 0 && timeLeft.seconds === 0) {
            console.log(`reg step: when timeLeft.minutes === 0 && timeLeft.seconds === 0`);
            data.harvPotInfo.text = '';
            console.log('reg step: text is set to ""');
            showAlert('&6Harbringer Potion &cExpired')
            console.log('reg step: alert shown for expired pot');
            data.audioInst.playDefaultSound();
            console.log('reg step: audio played for expired pot')
            ChatLib.chat('&cYour &6Harbringer Potion&c has run out!')
            console.log('reg step: chatlib.chat message for expired pot')
        }
        if (timeLeft.minutes < 0) { timeLeft.minutes = 0; console.log('reg step: timeLeft.minutes < 0, timeLeft.minutes = 0') }
        if (timeLeft.seconds < 0) { timeLeft.seconds = 0; console.log('reg step: timeLeft.seconds < 0, timeLeft.seconds = 0') }
    
        data.harvPotInfo.text = `&6Harbringer Potion: &r${isNaN(timeLeft.minutes) ? 0 : timeLeft.minutes}m ${isNaN(timeLeft.seconds) ? 0 : timeLeft.seconds}s`
        console.log('reg step: setting data.harvpotinfo.text string')

    } else {
        console.log('reg step: if data.harvpotinfo.timestamp === 0:')
        console.log(`reg step: data.text: ${data.harvPotInfo.text}`);
        console.log(`reg step: data.timestamp: ${data.harvPotInfo.timestamp}`);
        return;
    }
}).setFps(1);

register('renderOverlay', () => {
    if (!Settings.harvPotionOverlay) return;
    if (data.harvPotInfo.text === '' || data.harvPotInfo.text === '&6Harbringer Potion: &r0m 0s') return;
    // console.log(`reg overlay: text: ${data.harvPotInfo.text}`)
    Renderer.drawString(data.harvPotInfo.text, 400, 40)
});

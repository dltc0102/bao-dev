import Settings from '../settings.js'
import { data } from '../utils/data.js'
import { showAlert } from '../utils/utils.js'
import { updateCDText, createGuiCommand, renderGuiPosition, crossLoadTimer } from '../utils/functions.js'

////////////////////////////////////////////////////////////////////////
// POWERUP OVERLAY TIMERS
////////////////////////////////////////////////////////////////////////
const powerupCD = 80; // 80 seconds
let homingTimeLeft = 0;
let strongarmTimeLeft = 0;
let doubleUpTimeLeft = 0;
let powerupDisplayText = '';
var movepuptimer = new Gui();

register('gameLoad', () => {
    if (!data.inSkyblock) return;
    if (data.currArea !== "Jerry's Workshop") return;
    if (!Settings.displayPups) return;
    // crossLoadTimer(data.usedHoming, data.targetHoming, homingTimeLeft);
    // crossLoadTimer(data.usedStrongarm, data.targetStrongarm, strongarmTimeLeft);
    // crossLoadTimer(data.usedDoubleUp, data.targetDoubleUp, doubleUpTimeLeft);
})

// Homing Snowballs
register('chat', (event) => {
    if (data.currArea !== "Jerry's Workshop") return;
    if (!Settings.displayPups) return;
    data.audioInst.playDrinkSound();
    data.usedHoming = true;
    const targetTime = new Date();
    targetTime.setSeconds(targetTime.getSeconds() + powerupCD);
    homingTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.targetHoming = targetTime;
}).setCriteria('POWER UP! You activated Homing Snowballs for 80s! Press TAB to view your active power ups!');

// Strongarm
register('chat', (event) => {
    if (data.currArea !== "Jerry's Workshop") return;
    if (!Settings.displayPups) return;
    data.audioInst.playDrinkSound();
    data.usedStrongarm = true;
    const targetTime = new Date();
    targetTime.setSeconds(targetTime.getSeconds() + powerupCD);
    strongarmTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.targetStrongarm = targetTime;
}).setCriteria('POWER UP! You activated Strongarm for 80s! Press TAB to view your active power ups!');

// Double Up
register('chat', (event) => {
    if (data.currArea !== "Jerry's Workshop") return;
    if (!Settings.displayPups) return;
    data.audioInst.playDrinkSound();
    data.usedDoubleUp = true;
    const targetTime = new Date();
    targetTime.setSeconds(targetTime.getSeconds() + powerupCD);
    doubleUpTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.targetDoubleUp = targetTime;
}).setCriteria('POWER UP! You activated Double Up for 80s! Press TAB to view your active power ups!');

register('step', () => {
    if (data.currArea !== "Jerry's Workshop") return;
    if (!Settings.displayPups) return;
    if (!data.usedHoming) return;
    if (!data.usedStrongarm) return;
    if (!data.usedDoubleUp) return;

    if (homingTimeLeft > 0) {
        homingTimeLeft -= 1;
        data.usedHoming = true;
    } else if (homingTimeLeft === 0) {
        data.audioInst.playDefaultSound();
        ChatLib.chat(`&eYour &cHoming Snowballs Power-up&e has expired!`);
        showAlert(`&cHoming Snowballs Expired`);
        data.usedHoming = false;
    }

    if (strongarmTimeLeft > 0) {
        strongarmTimeLeft -= 1;
        data.usedStrongarm = true;
    } else if (strongarmTimeLeft === 0) {
        data.audioInst.playDefaultSound();
        ChatLib.chat(`&eYour &cStrongarm Power-up&e has expired!`);
        showAlert(`&cStrongarm Expired`);
        data.usedStrongarm = false;
    }

    if (doubleUpTimeLeft > 0) {
        doubleUpTimeLeft -= 1;
        data.usedDoubleUp = true;
    } else if (doubleUpTimeLeft === 0) {
        data.audioInst.playDefaultSound();
        ChatLib.chat(`&eYour &cStrongarm Power-up&e has expired!`);
        showAlert(`&cStrongarm Expired`);
        data.usedDoubleUp = false;
    }
}).setFps(1);

createGuiCommand(movepuptimer, 'movepuptimer', 'mpt');

register('step', () => {
    if (!data.inSkyblock) return;
    if (!Settings.displayPups) return;
    const timerValues = [];
    timerValues.push({ name: 'Homing Snowballs', color: '&b', timeLeft: homingTimeLeft});
    timerValues.push({ name: 'Strongarm', color: '&b', timeLeft: strongarmTimeLeft});
    timerValues.push({ name: 'Double Up', color: '&b', timeLeft: doubleUpTimeLeft});
    timerValues.sort((a, b) => b.timeLeft - a.timeLeft);
    powerupDisplayText = timerValues.map(entry => updateCDText(entry.color, entry.name, entry.timeLeft)).join('');
}).setFps(1);


register('dragged', (dx, dy, x, y) => {
    if (!data.inSkyblock) return;
    if (movepuptimer.isOpen()) {
        let numLines = 1;
        if (powerupDisplayText.includes('\n')) numLines = powerupDisplayText.split('\n')
        alignRight = data.screenW - 5 - (Renderer.getStringWidth(powerupDisplayText) * 4); // 4 is an arbitrary number, change into something more specific and future-proof later
        alignBottom = data.screenH - 5 - (numLines * 10);

        if (x < 5) { 
            data.pupDis.x = 5; 
        } else if (x >= alignRight) {
            data.pupDis.x = alignRight;
        } else { data.pupDis.x = x; }

        if (y < 5) { 
            data.pupDis.y = 5; 
        } else if (y >= alignBottom) {
            data.pupDis.y = alignBottom;
        } else { data.pupDis.y = y; }
    }
})

register('renderOverlay', () => {
    if (data.currArea !== "Jerry's Workshop") return;
    if (!Settings.displayPups) return;
    Renderer.drawStringWithShadow(powerupDisplayText, data.pupDis.x, data.pupDis.y);

    renderGuiPosition(movepuptimer, data.pupDis, '&bHoming Snowballs: &r00m 00s\n&bStrongarm: &r00m 00s\n&bDouble Up: &r00m 00s')
});

// better winter messages
register('chat', (player, event) => {
    if (data.currArea !== "Jerry's Workshop") return;
    if (Settings.betterWinterMsgs) cancel(event);
}).setCriteria(' ☠ ${player} was killed by Liquid Hot Magma.');

register('chat', (event) => {
    if (data.currArea !== "Jerry's Workshop") return;
    if (Settings.betterWinterMsgs) cancel(event);
}).setCriteria('The volcano is agitated...');

register('chat', (mins, event) => {
    if (data.currArea !== "Jerry's Workshop") return;
    if (Settings.betterWinterMsgs) cancel(event);
}).setCriteria('The volcano will erupt in ${mins} minutes!');

register('chat', (mins, event) => {
    if (data.currArea !== "Jerry's Workshop") return;
    if (Settings.betterWinterMsgs) cancel(event);
}).setCriteria('Another round will start in ${mins} minutes!');

register('chat', (cubeName, mins, event) => {
    if (data.currArea !== "Jerry's Workshop") return;
    if (Settings.betterWinterMsgs) cancel(event);
}).setCriteria(' ☠ ${cubeName} has been extinguished!');

register('chat', (cubeName, event) => {
    if (data.currArea !== "Jerry's Workshop") return;
    if (Settings.betterWinterMsgs) cancel(event);
}).setCriteria(' ♨ ${cubeName} has emerged from Mount Jerry! Stop it from reaching the Gifts! ');

register('chat', (event) => {
    if (data.currArea !== "Jerry's Workshop") return;
    if (Settings.betterWinterMsgs) cancel(event);
}).setCriteria(' ♨ Mount Jerry has erupted! Defend the village from the fire monsters!');

register('chat', (event) => {
    if (data.currArea !== "Jerry's Workshop") return;
    if (Settings.betterWinterMsgs) cancel(event);
}).setCriteria('SEASON OF JERRY Another wave of Magma Cubes is coming soon!');

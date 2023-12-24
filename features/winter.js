import Settings from '../settings.js'
import Audio from '../utils/audio.js'
import { data } from '../utils/data.js'
import { showAlert } from '../utils/utils.js'
import { updateCDText, createGuiCommand, renderGuiPosition, constrainCoords, crossLoadTimer } from '../utils/functions.js'

const jerryAudio = new Audio();

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
    if (data.currArea !== "Jerry's Workshop")
    if (!Settings.powerupTimerOverlay) return;
    crossLoadTimer(data.usedHoming, data.targetHoming, homingTimeLeft);
    crossLoadTimer(data.usedStrongarm, data.targetStrongarm, strongarmTimeLeft);
    crossLoadTimer(data.usedDoubleUp, data.targetDoubleUp, doubleUpTimeLeft);
})

// Homing Snowballs
register('chat', (event) => {
    if (!data.inSkyblock) return;
    jerryAudio.playDrinkSound();
    data.usedHoming = true;
    const targetTime = new Date();
    targetTime.setSeconds(targetTime.getSeconds() + powerupCD);
    homingTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.targetHoming = targetTime;
}).setCriteria('POWER UP! You activated Homing Snowballs for 80s! Press TAB to view your active power ups!');

register('step', () => {
    if (!data.inSkyblock) return;
    if (data.currArea !== "Jerry's Workshop") return;
    if (!data.usedHoming) return;
    if (homingTimeLeft > 0) {
        homingTimeLeft -= 1;
        data.usedHoming = true;
    } else if (homingTimeLeft === 0) {
        jerryAudio.playDefaultSound();
        ChatLib.chat(`&eYour &cHoming Snowballs Power-up&e has expired!`);
        showAlert(`&cHoming Snowballs Expired`);
        data.usedHoming = false;
    }
}).setFps(1);

// Strongarm
register('chat', (event) => {
    if (!data.inSkyblock) return;
    jerryAudio.playDrinkSound();
    data.usedStrongarm = true;
    const targetTime = new Date();
    targetTime.setSeconds(targetTime.getSeconds() + powerupCD);
    strongarmTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.targetStrongarm = targetTime;
}).setCriteria('POWER UP! You activated Strongarm for 80s! Press TAB to view your active power ups!');

register('step', () => {
    if (!data.inSkyblock) return;
    if (data.currArea !== "Jerry's Workshop") return;
    if (!data.usedStrongarm) return;
    if (strongarmTimeLeft > 0) {
        strongarmTimeLeft -= 1;
        data.usedStrongarm = true;
    } else if (strongarmTimeLeft === 0) {
        jerryAudio.playDefaultSound();
        ChatLib.chat(`&eYour &cStrongarm Power-up&e has expired!`);
        showAlert(`&cStrongarm Expired`);
        data.usedStrongarm = false;
    }
}).setFps(1);


// Double Up
register('chat', (event) => {
    if (!data.inSkyblock) return;
    jerryAudio.playDrinkSound();
    data.usedDoubleUp = true;
    const targetTime = new Date();
    targetTime.setSeconds(targetTime.getSeconds() + powerupCD);
    doubleUpTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.targetDoubleUp = targetTime;
}).setCriteria('POWER UP! You activated Double Up for 80s! Press TAB to view your active power ups!');

register('step', () => {
    if (!data.inSkyblock) return;
    if (data.currArea !== "Jerry's Workshop") return;
    if (!data.usedDoubleUp) return;
    if (doubleUpTimeLeft > 0) {
        doubleUpTimeLeft -= 1;
        data.usedDoubleUp = true;
    } else if (doubleUpTimeLeft === 0) {
        jerryAudio.playDefaultSound();
        ChatLib.chat(`&eYour &cStrongarm Power-up&e has expired!`);
        showAlert(`&cStrongarm Expired`);
        data.usedDoubleUp = false;
    }
}).setFps(1);

createGuiCommand(movepuptimer, 'movepuptimer', 'mpt');

register('step', () => {
    const timerValues = [];
    timerValues.push({ name: 'Homing Snowballs', color: '&b', timeLeft: homingTimeLeft});
    timerValues.push({ name: 'Strongarm', color: '&b', timeLeft: strongarmTimeLeft});
    timerValues.push({ name: 'Double Up', color: '&b', timeLeft: doubleUpTimeLeft});
    timerValues.sort((a, b) => b.timeLeft - a.timeLeft);
    powerupDisplayText = timerValues.map(entry => updateCDText(entry.color, entry.name, entry.timeLeft)).join('');
}).setFps(1);


let screenW = Renderer.screen.getWidth();
let screenH = Renderer.screen.getHeight();
register('dragged', (dx, dy, x, y) => {
    if (!data.inSkyblock) return;
    // if (movepuptimer.isOpen()) constrainCoords(x, y, data.pupDis, powerupDisplayText, 1)
    if (movepuptimer.isOpen()) {
        let numLines = 1;
        if (powerupDisplayText.includes('\n')) numLines = powerupDisplayText.split('\n')
        alignRight = screenW - 5 - (Renderer.getStringWidth(powerupDisplayText) * 4) ;
        alignBottom = screenH - 5 - (numLines * 10);

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
    if (!data.inSkyblock) return;
    if (data.currArea !== "Jerry's Workshop") return;
    Renderer.drawStringWithShadow(powerupDisplayText, data.pupDis.x, data.pupDis.y);

    renderGuiPosition(movepuptimer, data.pupDis, '&bHoming Snowballs: &r00m 00s\n&bStrongarm: &r00m 00s\n&bDouble Up: &r00m 00s')
});

register('chat', (player, event) => {
    if (!data.inSkyblock) return;
    if (data.currArea !== "Jerry's Workshop") return;
    cancel(event);
}).setCriteria(' ☠ ${player} was killed by Liquid Hot Magma.');

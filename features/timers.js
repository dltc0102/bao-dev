import Settings from '../settings.js';
import Audio from '../utils/audio.js';
import PogObject from 'PogData';

import { constrainX, constrainY } from '../utils/functions.js' // padding
import { createGuiCommand, renderGuiPosition } from '../utils/functions.js'; // gui
import { updateCDText } from '../utils/functions.js'
import { getActivePet } from '../utils/pet.js'
import { setTimer, checkTimeLeft, regNearbyOrbs } from '../utils/functions.js';
import { getInSkyblock, getCurrArea } from '../utils/functions.js'; // sb, area

////////////////////////////////////////////////////////////////////////////////
// SETUP CONSTS
////////////////////////////////////////////////////////////////////////////////
const timerAudio = new Audio();
const moveTimerDisplay = new Gui(); 
createGuiCommand(moveTimerDisplay, 'movetimerdisplay', 'mtm');
const timerDraggableText = "&2Mushy Tonic: &r00m 00s\n&2King's Scent: &r00m 00s\n&6Bonzo's Mask: &r00m 00s\n&6Rekindle: &r00m 00s\n&6Second Wind: &r00m 00s\n&aGummy Bear: &r00m00s\n[Flux]: 00s";
export const baoTimers = new PogObject("bao-dev", {
    "displayText": '', 
    "x": 400, 
    "y": 240,

    "gummy": {
        "name": "Gummy Bear",
        "cd": 60, 
        "timeLeft": 0, 
        "used": false, 
        "target": null,
    }, 
    "rekindle": {
        "name": "Rekindle",
        "cd": 1,
        "timeLeft": 0,
        "used": false, 
        "target": null,
    }, 
    "secondWind": {
        "name": "Second Wind", 
        "cd": 30,
        "timeLeft": 0,
        "used": false, 
        "target": null,
    }, 
    "glowyTonic": {
        "name": "Glowy Tonic",
        "cd": 0,
        "timeLeft": 0,
        "used": false, 
        "target": null,
    }, 
    "bonzo": {
        "name": "Clownin' Around",
        "cd": 6,
        "timeLeft": 0,
        "used": false, 
        "target": null,
    }, 
    "kingsScent": {
        "name": "King's Scent", 
        "cd": 20,
        "timeLeft": 0,
        "used": false, 
        "target": null,
    }, 
    "orb": {
        "registered": [], 
        "color": '',
        "displayText": '', 
        "timeLeft": 0, 
        "type": 5, 
        "found": false,
        "x": 400, 
        "y": 250,
    },
}, '/data/baoTimers.json');
baoTimers.autosave(5);

////////////////////////////////////////////////////////////////////////////////
// GUMMY --------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.gummyTimer) return;
    timerAudio.playDrinkSound();
    setTimer(baoTimers.gummy);
    baoTimers.save();
}).setCriteria('You ate a Re-heated Gummy Polar Bear!');

////////////////////////////////////////////////////////////////////////////////
// REKINDLE --------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.rekindleAlert) return;
    timerAudio.playProcSound();
    setTimer(baoTimers.rekindle);
    baoTimers.save();
}).setCriteria('Your Phoenix Pet saved you from certain death!');

////////////////////////////////////////////////////////////////////////////////
// SPIRIT MASK -----------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.secondWindAlert) return;
    timerAudio.playProcSound();
    setTimer(baoTimers.secondWind);
    baoTimers.save();
}).setCriteria('Second Wind Activated! Your Spirit Mask saved your life!');

///////////////////////////////////////////////////////////////////////////////
// Flux Countdown Timer -----------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////
register("step", () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.flux_timer) return;
    regNearbyOrbs(baoTimers.orb);
    baoTimers.save();
}).setFps(10);

////////////////////////////////////////////////////////////////////////////////
// MUSHY TIMER -----------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.mushyTimer) return;
    timerAudio.playDrinkSound();
    baoTimers.glowyTonic.cd = getActivePet().includes('Parrot') ? 84 : 60;
    setTimer(baoTimers.glowyTonic);
    baoTimers.save();
}).setCriteria('BUFF! You splashed yourself with Mushed Glowy Tonic I! Press TAB or type /effects to view your active effects!');

register('chat', (name, event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.mushyTimer) return;
    timerAudio.playDrinkSound();
    baoTimers.glowyTonic.cd = getActivePet().includes('Parrot') ? 84 : 60;
    setTimer(baoTimers.glowyTonic);
    baoTimers.save();
}).setCriteria('BUFF! You were splashed by ${name} with Mushed Glowy Tonic I! Press TAB or type /effects to view your active effects!')

////////////////////////////////////////////////////////////////////////////////
// BONZO MASK -----------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.bonzo_cd_timer) return;
    timerAudio.playProcSound();
    setTimer(baoTimers.bonzo);
    baoTimers.save();
}).setCriteria("Your Bonzo's Mask saved your life!");

////////////////////////////////////////////////////////////////////////////////
// KINGS SCENT TIMER -----------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.kingScentTimer) return;
    timerAudio.playDrinkSound();
    setTimer(baoTimers.kingsScent);
    baoTimers.save();
}).setCriteria("[NPC] King Yolkar: I'm covering you in my foul stench as we speak. It won't last long before it dissipates!");

////////////////////////////////////////////////////////////////////////////////
// RENDER OVERLAY
////////////////////////////////////////////////////////////////////////////////

register('gameLoad', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (Settings.rekindleAlert) {
        if (baoTimers.rekindle.used) {
            baoTimers.rekindle.timeLeft = 0;
            const targetTime = new Date(baoTimers.rekindle.target);
            baoTimers.rekindle.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
        } else {
            baoTimers.rekindle.timeLeft = 0;
        }
    }
    
    if (Settings.secondWindAlert) {
        if (baoTimers.secondWind.used) {
            baoTimers.secondWind.timeLeft = 0;
            const targetTime = new Date(baoTimers.secondWind.target);
            baoTimers.secondWind.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
        } else {
            baoTimers.secondWind.timeLeft = 0;
        }
    }
    if (Settings.mushyTimer) {
        if (baoTimers.glowyTonic.used) {
            baoTimers.glowyTonic.timeLeft = 0;
            const targetTime = new Date(baoTimers.glowyTonic.target);
            baoTimers.glowyTonic.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
        } else {
            baoTimers.glowyTonic.timeLeft = 0;
        }
    }

    if (Settings.bonzo_cd_timer) {
        if (baoTimers.bonzo.used) {
            baoTimers.bonzo.timeLeft = 0;
            const targetTime = new Date(baoTimers.bonzo.target);
            baoTimers.bonzo.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
        } else {
            baoTimers.bonzo.timeLeft = 0;
        }
    }   

    if (Settings.kingScentTimer) {
        if (baoTimers.kingsScent.used) {
            baoTimers.kingsScent.timeLeft = 0;
            const targetTime = new Date(baoTimers.kingsScent.target);
            baoTimers.kingsScent.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
        } else {
            baoTimers.kingsScent.timeLeft = 0;
        }
    }

    if (Settings.gummyTimer) {
        if (baoTimers.gummy.used) {
            baoTimers.gummy.timeLeft = 0;
            const targetTime = new Date(baoTimers.gummy.target);
            baoTimers.gummy.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
        } else {
            baoTimers.gummy.timeLeft = 0;
        }
    };
    baoTimers.save();
})


register('step', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    const timerValues = [];
    // rekindle
    if (Settings.rekindleAlert) {
        if (baoTimers.rekindle.used) checkTimeLeft(baoTimers.rekindle, 'Phoenix', 'Rekindle');
        timerValues.push({ name: "Rekindle", color: '&6', timeLeft: baoTimers.rekindle.timeLeft});
    }

    // second wind
    if (Settings.secondWindAlert) {
        if (baoTimers.secondWind.used) checkTimeLeft(baoTimers.secondWind, 'Spirit Mask', 'Second Wind');
        timerValues.push({ name: "Second Wind", color: '&6',  timeLeft: baoTimers.secondWind.timeLeft});
    }

    // mushy tonic
    if (Settings.mushyTimer && getCurrArea() !== 'Garden') {
        if (baoTimers.glowyTonic.used) checkTimeLeft(baoTimers.glowyTonic, 'Glowy Tonic');
        timerValues.push({ name: "Mushy Tonic", color: '&2', timeLeft: baoTimers.glowyTonic.timeLeft});
    }
    
    // bonzo
    if (Settings.bonzo_cd_timer) {
        if (baoTimers.bonzo.used) checkTimeLeft(baoTimers.bonzo, 'Bonzo Mask', "Clowin' Around");
        timerValues.push({ name: "Bonzo Mask", color: '&6', timeLeft: baoTimers.bonzo.timeLeft});
    }
    
    // kings scent
    if (Settings.kingScentTimer) {
        if (baoTimers.kingsScent.used) checkTimeLeft(baoTimers.kingsScent, '', "King's Scent");
        timerValues.push({ name: "King's Scent", color: '&2', timeLeft: baoTimers.kingsScent.timeLeft});
    }

    // gummy bear
    if (Settings.gummyTimer) {
        if (baoTimers.gummy.used) checkTimeLeft(baoTimers.gummy, 'Gummy Bear');
        timerValues.push({name: "Gummy Bear", color: '&a', timeLeft: baoTimers.gummy.timeLeft});
    }

    if (Settings.flux_timer && baoTimers.orb.found) {
        checkTimeLeft(baoTimers.orb, 'Orb');
        timerValues.push({name: "Flux", color: baoTimers.orb.color, timeLeft: baoTimers.orb.timeLeft});
    }

    timerValues.sort((a, b) => b.timeLeft - a.timeLeft);

    baoTimers.displayText = timerValues.map(entry => updateCDText(entry.color, entry.name, entry.timeLeft)).join('');
    baoTimers.save();
}).setFps(1);

register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (moveTimerDisplay.isOpen()) {
        baoTimers.x = constrainX(x, 3, timerDraggableText);
        baoTimers.y = constrainY(y, 3, timerDraggableText);
    }
    baoTimers.save();
});

register('renderOverlay', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    Renderer.drawStringWithShadow(baoTimers.displayText, baoTimers.x, baoTimers.y);
    renderGuiPosition(moveTimerDisplay, baoTimers, timerDraggableText);
    baoTimers.save();
});

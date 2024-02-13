import Settings from '../settings.js';
import Audio from '../utils/audio.js';
import PogObject from 'PogData';

import { constrainX, constrainY } from '../utils/functions.js' // padding
import { createGuiCommand, renderGuiPosition } from '../utils/functions.js'; // gui
import { updateCDText } from '../utils/functions.js'
import { getActivePet } from '../utils/pet.js'
import { setTimer, checkTimeLeft, regNearbyOrbs } from '../utils/functions.js';
import { getInSkyblock, getCurrArea } from '../utils/functions.js'; // sb, area
import { registerWhen, timeThis } from '../utils/utils.js';

////////////////////////////////////////////////////////////////////////////////
// SETUP CONSTS
////////////////////////////////////////////////////////////////////////////////
const timerAudio = new Audio();
const moveTimerDisplay = new Gui(); 
createGuiCommand(moveTimerDisplay, 'movetimerdisplay', 'mtm');
const timerDraggableText = "&2Mushy Tonic: &r00m 00s\n&2King's Scent: &r00m 00s\n&6Bonzo's Mask: &r00m 00s\n&6Rekindle: &r00m 00s\n&6Second Wind: &r00m 00s\n&aGummy Bear: &r00m00s\n[Flux]: 00s";

let timerDisplayText = '';
export const baoTimerDisplay = new PogObject("bao-dev", {
    "x": 400, 
    "y": 240,
}, '/data/baoTimerDisplay.json');
baoTimerDisplay.autosave(5);

export const baoTimers = {
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
        "color": '',
        "timeLeft": 0, 
        "type": 5, 
        "found": false,
    },
};

////////////////////////////////////////////////////////////////////////////////
// GUMMY TIMER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    timerAudio.playDrinkSound();
    setTimer(baoTimers.gummy);
}, () => Settings.gummyTimer && getInSkyblock() && World.isLoaded()).setCriteria('You ate a Re-heated Gummy Polar Bear!');


////////////////////////////////////////////////////////////////////////////////
// REKINDLE TIMER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    timerAudio.playProcSound();
    setTimer(baoTimers.rekindle);
}, () => Settings.rekindleAlert && getInSkyblock() && World.isLoaded()).setCriteria('Your Phoenix Pet saved you from certain death!');


////////////////////////////////////////////////////////////////////////////////
// SPIRIT MASK TIMER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    timerAudio.playProcSound();
    setTimer(baoTimers.secondWind);
}, () => Settings.secondWindAlert && getInSkyblock() && World.isLoaded()).setCriteria('Second Wind Activated! Your Spirit Mask saved your life!');


///////////////////////////////////////////////////////////////////////////////
// FLUX TIMER
///////////////////////////////////////////////////////////////////////////////
register("step", () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.flux_timer) return;
    regNearbyOrbs(baoTimers.orb);
}).setFps(10);

////////////////////////////////////////////////////////////////////////////////
// MUSHY TIMER 
////////////////////////////////////////////////////////////////////////////////
const mushyMessages = [
    /BUFF! You splashed yourself with Mushed Glowy Tonic I! Press TAB or type \/effects to view your active effects!/, 
    /BUFF! You were splashed by .+ with Mushed Glowy Tonic I! Press TAB or type \/effects to view your active effects!/,
];

mushyMessages.forEach(msg => {
    registerWhen('chat', (event) => {
        timerAudio.playDrinkSound();
        baoTimers.glowyTonic.cd = getActivePet().includes('Parrot') ? 84 : 60;
        setTimer(baoTimers.glowyTonic);
    }, () => Settings.mushyTimer && getInSkyblock() && World.isLoaded()).setCriteria(msg);
})


////////////////////////////////////////////////////////////////////////////////
// BONZO MASK TIMER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    timerAudio.playProcSound();
    setTimer(baoTimers.bonzo);
}, () => Settings.bonzo_cd_timer && getInSkyblock() && World.isLoaded()).setCriteria("Your Bonzo's Mask saved your life!");


////////////////////////////////////////////////////////////////////////////////
// KINGS SCENT TIMER 
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    timerAudio.playDrinkSound();
    setTimer(baoTimers.kingsScent);
}, () => Settings.kingScentTimer && getInSkyblock() && World.isLoaded()).setCriteria("[NPC] King Yolkar: I'm covering you in my foul stench as we speak. It won't last long before it dissipates!");


////////////////////////////////////////////////////////////////////////////////
// REG: GAMELOAD
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
    // baoTimers.save();
})


////////////////////////////////////////////////////////////////////////////////
// REG: STEP
////////////////////////////////////////////////////////////////////////////////
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

    timerDisplayText = timerValues.map(entry => updateCDText(entry.color, entry.name, entry.timeLeft)).join('');
    // baoTimers.save();
}).setFps(1);


////////////////////////////////////////////////////////////////////////////////
// REG: DRAG
////////////////////////////////////////////////////////////////////////////////
register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (moveTimerDisplay.isOpen()) {
        baoTimerDisplay.x = constrainX(x, 3, timerDraggableText);
        baoTimerDisplay.y = constrainY(y, 3, timerDraggableText);
    };
    baoTimerDisplay.save();
});


////////////////////////////////////////////////////////////////////////////////
// REG: OVERLAY
////////////////////////////////////////////////////////////////////////////////
registerWhen('renderOverlay', timeThis("renderOverlay timerDisplayText", () => {
    Renderer.drawStringWithShadow(timerDisplayText, baoTimerDisplay.x, baoTimerDisplay.y);
}), () => (Settings.gummyTimer || Settings.rekindleAlert || Settings.secondWindAlert || Settings.flux_timer || Settings.mushyTimer || Settings.bonzo_cd_timer || Settings.kingScentTimer) && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', timeThis("renderOverlay timerDisplayText draggable", () => {
    renderGuiPosition(moveTimerDisplay, baoTimerDisplay, timerDraggableText);
}), () => getInSkyblock() && World.isLoaded());



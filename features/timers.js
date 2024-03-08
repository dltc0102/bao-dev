import Settings from '../config1/settings.js';
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

// general timer display
const moveTimerDisplay = new Gui(); 
createGuiCommand(moveTimerDisplay, 'movetimerdisplay', 'mtm');
const timerDraggableText = "&2Mushy Tonic: &r00m 00s\n&2King's Scent: &r00m 00s\n&6Bonzo's Mask: &r00m 00s\n&6Rekindle: &r00m 00s\n&6Second Wind: &r00m 00s\n&aGummy Bear: &r00m00s\n[Flux]: 00s";
let timerDisplayText = '';

export const baoTimerDisplay = new PogObject("bao-dev", {
    "x": 400, 
    "y": 240,
}, '/data/baoTimerDisplay.json');
baoTimerDisplay.autosave(5);

// cake display
const moveCakeDisplay = new Gui();
createGuiCommand(moveCakeDisplay, 'moveCakeDisplay', 'mcake');
const cakeDraggable = '&7Cake: 47h 59m';
let cakeDisplayText = '';

export const cakeDisplayInfo = new PogObject("bao-dev", {
    "x": 100,
    "y": 100,
}, '/data/cakeDisplayInfo.json');
cakeDisplayInfo.autosave(5);

// timer infos
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
    "wisp": {
        "name": "Wisp Potion", 
        "cd": 42, 
        "timeLeft": 0, 
        "used": false, 
        "target": null,
    },
    "cake": {
        "name": "Cake", 
        "color": "&d",
        "cd": 48, 
        "timeLeft": 0,
        "used": false,
        "target": null,
    },
    "withercloak": {
        "name": "Wither Cloak", 
        "color": '&5',
        "cd": 10, 
        "timeLeft": 0, 
        "used": false, 
        "target": null,
    },
    "cellsAlign": {
        "name": "Cells Align", 
        "color": '&6',
        "cd": 10, 
        "timeLeft": 0, 
        "used": false, 
        "target": null,
    },
    "firestorm": {
        "name": "Firestorm", 
        "color": '&c',
        "cd": 20, 
        "timeLeft": 0, 
        "used": false, 
        "target": null,
    },
    "howl": {
        "name": "Howl", 
        "color": '&6',
        "cd": 20, 
        "timeLeft": 0, 
        "used": false, 
        "target": null,
    },
    "ragnarock": {
        "name": "Ragnarock", 
        "color": '&6',
        "cd": 20, 
        "timeLeft": 0, 
        "used": false, 
        "target": null,
    },
};

////////////////////////////////////////////////////////////////////////////////
// GUMMY TIMER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat gummy bear message", (event) => {
    timerAudio.playDrinkSound();
    setTimer(baoTimers.gummy);
}), () => Settings.gummyTimer && getInSkyblock() && World.isLoaded()).setCriteria('You ate a Re-heated Gummy Polar Bear!');


////////////////////////////////////////////////////////////////////////////////
// REKINDLE TIMER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat phoenix pet message", (event) => {
    timerAudio.playProcSound();
    setTimer(baoTimers.rekindle);
}), () => Settings.rekindleAlert && getInSkyblock() && World.isLoaded()).setCriteria('Your Phoenix Pet saved you from certain death!');


////////////////////////////////////////////////////////////////////////////////
// SPIRIT MASK TIMER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat spirit mask message", (event) => {
    timerAudio.playProcSound();
    setTimer(baoTimers.secondWind);
}), () => Settings.secondWindAlert && getInSkyblock() && World.isLoaded()).setCriteria('Second Wind Activated! Your Spirit Mask saved your life!');


///////////////////////////////////////////////////////////////////////////////
// FLUX TIMER
///////////////////////////////////////////////////////////////////////////////
register("step", timeThis("registerStep get flux time", () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.flux_timer) return;
    regNearbyOrbs(baoTimers.orb);
})).setFps(10);


////////////////////////////////////////////////////////////////////////////////
// MUSHY TIMER 
////////////////////////////////////////////////////////////////////////////////
const mushyMessages = [
    /BUFF! You splashed yourself with Mushed Glowy Tonic I! Press TAB or type \/effects to view your active effects!/, 
    /BUFF! You were splashed by .+ with Mushed Glowy Tonic I! Press TAB or type \/effects to view your active effects!/,
];

mushyMessages.forEach(msg => {
    registerWhen('chat', timeThis("registerChat mushyMessages", (event) => {
        timerAudio.playDrinkSound();
        baoTimers.glowyTonic.cd = getActivePet().includes('Parrot') ? 84 : 60;
        setTimer(baoTimers.glowyTonic);
    }), () => Settings.mushyTimer && getInSkyblock() && World.isLoaded()).setCriteria(msg);
})


////////////////////////////////////////////////////////////////////////////////
// BONZO MASK TIMER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat bonzo mask message", (event) => {
    timerAudio.playProcSound();
    setTimer(baoTimers.bonzo);
}), () => Settings.bonzoMaskTimer && getInSkyblock() && World.isLoaded()).setCriteria("Your Bonzo's Mask saved your life!");


////////////////////////////////////////////////////////////////////////////////
// KINGS SCENT TIMER 
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat kings scent message", (event) => {
    timerAudio.playDrinkSound();
    setTimer(baoTimers.kingsScent);
}), () => Settings.kingScentTimer && getInSkyblock() && World.isLoaded()).setCriteria("[NPC] King Yolkar: I'm covering you in my foul stench as we speak. It won't last long before it dissipates!");


////////////////////////////////////////////////////////////////////////////////
// WISP POT TIMER
////////////////////////////////////////////////////////////////////////////////
const wispMessages = [
    /BUFF! You splashed yourself with Wisp's Ice-Flavored Water I! Press TAB or type \/effects to view your active effects!/, 
    /BUFF! You were splashed by .+ with Wisp's Ice-Flavored Water I! Press TAB or type \/effects to view your active effects!/,
];

wispMessages.forEach(msg => {
    registerWhen('chat', timeThis("registerChat mushyMessages", (event) => {
        timerAudio.playDrinkSound();
        setTimer(baoTimers.wisp);
    }), () => Settings.wispTimer && getInSkyblock() && World.isLoaded()).setCriteria(msg);
})


////////////////////////////////////////////////////////////////////////////////
// WITHERCLOAK CD TIMER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat withercloak deactivated message", (event) => {
    timerAudio.playDutSound();
    setTimer(baoTimers.withercloak);
}), () => Settings.withercloakTimer && getInSkyblock() && World.isLoaded()).setCriteria('Creeper Veil De-activated!');


////////////////////////////////////////////////////////////////////////////////
// CELLS ALIGN CD TIMER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat cells alignment message", (event) => {
    timerAudio.playProcSound();
    setTimer(baoTimers.cellsAlign);
}), () => Settings.cellsAlignTimer && getInSkyblock() && World.isLoaded()).setCriteria('You aligned yourself!');


////////////////////////////////////////////////////////////////////////////////
// FIRE FURY STAFF CD TIMER
////////////////////////////////////////////////////////////////////////////////
registerWhen('actionBar', timeThis('registerActionBar firestorm used', (manaUsed, manaNum) => {
    timerAudio.playProcSound();
    setTimer(baoTimers.firestorm)
}), () => Settings.firestormTimer && getInSkyblock() && World.isLoaded()).setCriteria("${manaUsed} (Firestorm) ${manaNum}");


////////////////////////////////////////////////////////////////////////////////
// TUBA HOWL CD TIMER
////////////////////////////////////////////////////////////////////////////////
registerWhen('actionBar', timeThis('registerActionBar howl used', (manaUsed, manaNum) => {
    timerAudio.playProcSound();
    setTimer(baoTimers.howl)
}), () => Settings.howlTimer && getInSkyblock() && World.isLoaded()).setCriteria("${manaUsed} (Howl) ${manaNum}");


////////////////////////////////////////////////////////////////////////////////
// RAG AXE CD TIMER
////////////////////////////////////////////////////////////////////////////////
registerWhen('actionBar', timeThis('registerActionBar ragnarock axe used', (defenseNum, defense) => {
    timerAudio.playDutSound();
    setTimer(baoTimers.ragnarock);
}), () => Settings.ragAxeTimer && getInSkyblock() && World.isLoaded()).setCriteria("${defenseNum} ${defense} CASTING IN 3s");


////////////////////////////////////////////////////////////////////////////////
// CAKE TIMER 
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis('registerChat refresh cake message', (effect, event) => {
    setTimer(baoTimers.cake);
}), () => Settings.cakeTimer && getInSkyblock() && World.isLoaded()).setCriteria("Big Yum! You refresh +${effect} for 48 hours!");

registerWhen('chat', timeThis('', (event) => {
    setTimer(baoTimers.cake);
}), () => Settings.cakeTimer && getInSkyblock() && World.isLoaded()).setCriteria("Big Yum! You gain +${effect} for 48 hours!");

register('step', () => {
    if (!getInSkyblock() || !World.isLoaded() || !Settings.cakeTimer) return;
    if (baoTimers.cake.used) checkTimeLeft(baoTimers.cake, 'Cake');
    cakeDisplayText = updateCDText(baoTimers.cake.color, baoTimers.cake.name, baoTimers.cake.timeLeft)
}).setFps(1);


////////////////////////////////////////////////////////////////////////////////
// REG: STEP
////////////////////////////////////////////////////////////////////////////////
register('step', timeThis("registerStep update general timer text", () => {
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
    if (Settings.bonzoMaskTimer) {
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

    // flux timer
    if (Settings.flux_timer && baoTimers.orb.found) {
        checkTimeLeft(baoTimers.orb, 'Orb');
        timerValues.push({name: "Flux", color: baoTimers.orb.color, timeLeft: baoTimers.orb.timeLeft});
    }

    // wisp pot
    if (Settings.wispTimer) {
        if (baoTimers.wisp.used) checkTimeLeft(baoTimers.wisp, 'Wisp Potion');
        timerValues.push({name: "Wisp Potion", color: '&3', timeLeft: baoTimers.wisp.timeLeft});
    }

    // withercloak deactivate cd timer
    if (Settings.withercloakTimer) {
        if (baoTimers.withercloak.used) checkTimeLeft(baoTimers.withercloak, 'Wither Cloak', 'Creeper Veil');
        timerValues.push({name: "Wither Cloak", color: '&5', timeLeft: baoTimers.withercloak.timeLeft});
    }

    // cells alignment cd timer
    if (Settings.cellsAlignTimer) {
        if (baoTimers.cellsAlign.used) checkTimeLeft(baoTimers.cellsAlign, 'Gyrokinetic Wand', 'Cells Alignment');
        timerValues.push({name: "Cells Alignment", color: '&6', timeLeft: baoTimers.cellsAlign.timeLeft});
    }
    
    // firestorm cd timer
    if (Settings.firestormTimer) {
        if (baoTimers.firestorm.used) checkTimeLeft(baoTimers.firestorm, 'Fire Fury Staff', 'Firestorm');
        timerValues.push({name: "Firestorm", color: '&c', timeLeft: baoTimers.firestorm.timeLeft});
    }
    
    // tuba howl cd timer
    if (Settings.howlTimer) {
        if (baoTimers.howl.used) checkTimeLeft(baoTimers.howl, 'Tuba', 'Howl');
        timerValues.push({name: "Howl", color: '&5', timeLeft: baoTimers.howl.timeLeft});
    }
    
    // ragnarock axe cd timer
    if (Settings.ragAxeTimer) {
        if (baoTimers.ragnarock.used) checkTimeLeft(baoTimers.ragnarock, 'Ragnarock Axe', 'Ragnarock');
        timerValues.push({name: "Ragnarock", color: '&6', timeLeft: baoTimers.ragnarock.timeLeft});
    }

    timerValues.sort((a, b) => b.timeLeft - a.timeLeft);

    timerDisplayText = timerValues.map(entry => updateCDText(entry.color, entry.name, entry.timeLeft)).join('');
    // baoTimers.save();
})).setFps(1);


////////////////////////////////////////////////////////////////////////////////
// REG: DRAG
////////////////////////////////////////////////////////////////////////////////
register('dragged', timeThis("registerDragged moveTimerDisplay", (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (moveTimerDisplay.isOpen()) {
        baoTimerDisplay.x = constrainX(x, 3, timerDraggableText);
        baoTimerDisplay.y = constrainY(y, 3, timerDraggableText);
    };
    baoTimerDisplay.save();
}));

register('dragged', timeThis("registerDragged moveCakeDisplay", (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;;
    if (moveCakeDisplay.isOpen()) {
        cakeDisplayInfo.x = constrainX(x, 3, cakeDraggable);
        cakeDisplayInfo.y = constrainY(y, 3, cakeDraggable);
    };
    cakeDisplayInfo.save();
}));


////////////////////////////////////////////////////////////////////////////////
// REG: OVERLAY
////////////////////////////////////////////////////////////////////////////////
// timers
registerWhen('renderOverlay', timeThis("renderOverlay timerDisplayText", () => {
    Renderer.drawStringWithShadow(timerDisplayText, baoTimerDisplay.x, baoTimerDisplay.y);
}), () => (Settings.gummyTimer || Settings.rekindleAlert || Settings.secondWindAlert || Settings.flux_timer || Settings.mushyTimer || Settings.bonzoMaskTimer || Settings.kingScentTimer) && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', timeThis("renderOverlay timerDisplayText draggable", () => {
    renderGuiPosition(moveTimerDisplay, baoTimerDisplay, timerDraggableText);
}), () => getInSkyblock() && World.isLoaded());

// cake
registerWhen('renderOverlay', timeThis('', () => {
    Renderer.drawStringWithShadow(cakeDisplayText, cakeDisplayInfo.x, cakeDisplayInfo.y);
}), () => Settings.cakeTimer && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', timeThis('', () => {
    renderGuiPosition(moveCakeDisplay, cakeDisplayInfo, cakeDraggable);
}), () => getInSkyblock() && World.isLoaded());

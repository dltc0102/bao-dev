import Settings from "../settings.js"
import { data } from "../utils/data.js"
import { constrainX, constrainY, createGuiCommand, renderGuiPosition, updateCDText } from '../utils/functions.js'
import { getActivePet } from '../utils/pet.js'
import { setTimer, checkTimeLeft, regNearbyOrbs } from '../utils/functions.js';

const gummyObj = data.timerInfos.gummy; 
const rekindleObj = data.timerInfos.rekindle;
const secondWindObj = data.timerInfos.secondWind;
const tonicObj = data.timerInfos.glowyTonic;
const bonzoObj = data.timerInfos.bonzo;
const kingsObj = data.timerInfos.kingsScent;
const orbObj = data.timerInfos.orb;
////////////////////////////////////////////////////////////////////////////////
// GUMMY --------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.gummyTimer) return;
    data.audioInst.playDrinkSound();
    setTimer(gummyObj);
}).setCriteria('You ate a Re-heated Gummy Polar Bear!');

////////////////////////////////////////////////////////////////////////////////
// REKINDLE --------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.rekindleAlert) return;
    data.audioInst.playProcSound();
    setTimer(rekindleObj);
}).setCriteria('Your Phoenix Pet saved you from certain death!');

////////////////////////////////////////////////////////////////////////////////
// SPIRIT MASK -----------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.secondWindAlert) return;
    data.audioInst.playProcSound();
    setTimer(secondWindObj);
}).setCriteria('Second Wind Activated! Your Spirit Mask saved your life!');

///////////////////////////////////////////////////////////////////////////////
// Flux Countdown Timer -----------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////
register("step", () => {
    if (!data.inSkyblock) return;
    if (!Settings.flux_timer) return;
    regNearbyOrbs(orbObj);
}).setFps(10);

////////////////////////////////////////////////////////////////////////////////
// MUSHY TIMER -----------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.mushyTimer) return;
    data.audioInst.playDrinkSound();
    data.timerInfos.glowyTonic.cd = getActivePet().includes('Parrot') ? 84 : 60;
    setTimer(tonicObj);
}).setCriteria('BUFF! You splashed yourself with Mushed Glowy Tonic I! Press TAB or type /effects to view your active effects!');

register('chat', (name, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.mushyTimer) return;
    data.audioInst.playDrinkSound();
    data.timerInfos.glowyTonic.cd = getActivePet().includes('Parrot') ? 84 : 60;
    setTimer(tonicObj);
}).setCriteria('BUFF! You were splashed by ${name} with Mushed Glowy Tonic I! Press TAB or type /effects to view your active effects!')

////////////////////////////////////////////////////////////////////////////////
// BONZO MASK -----------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.bonzo_cd_timer) return;
    data.audioInst.playProcSound();
    setTimer(bonzoObj);
}).setCriteria("Your Bonzo's Mask saved your life!");

////////////////////////////////////////////////////////////////////////////////
// KINGS SCENT TIMER -----------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.kingScentTimer) return;
    data.audioInst.playDrinkSound();
    setTimer(kingsObj);
}).setCriteria("[NPC] King Yolkar: I'm covering you in my foul stench as we speak. It won't last long before it dissipates!");

////////////////////////////////////////////////////////////////////////////////
// RENDER OVERLAY
////////////////////////////////////////////////////////////////////////////////
data.timerInfos.moveTimerDisplay = new Gui(); // timer displays
data.timerInfos.moveFluxTimerDisplay = new Gui();
register('gameLoad', () => {
    if (!Settings.rekindleAlert) return;
    if (!Settings.secondWindAlert) return;
    if (!Settings.mushyTimer) return;
    if (!Settings.bonzo_cd_timer) return;
    if (!Settings.kingScentTimer) return;
    if (!Settings.gummyTimer) return;

    if (data.timerInfos.rekindle.used) {
        const targetTime = new Date(data.timerInfos.rekindle.target);
        data.timerInfos.rekindle.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    } else {
        data.timerInfos.rekindle.timeLeft = 0;
    }

    if (data.timerInfos.secondWind.used) {
        const targetTime = new Date(data.timerInfos.secondWind.target);
        data.timerInfos.secondWind.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    } else {
        data.timerInfos.secondWind.timeLeft = 0;
    }

    if (data.timerInfos.glowyTonic.used) {
        const targetTime = new Date(data.targetTonic);
        data.timerInfos.glowyTonic.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    } else {
        data.timerInfos.glowyTonic.timeLeft = 0;
    }

    if (data.timerInfos.bonzo.used) {
        const targetTime = new Date(data.timerInfos.bonzo.target);
        data.timerInfos.bonzo.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    } else {
        data.timerInfos.bonzo.timeLeft = 0;
    }

    if (data.timerInfos.kingsScent.used) {
        const targetTime = new Date(data.timerInfos.kingsScent.target);
        data.timerInfos.kingsScent.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    } else {
        data.timerInfos.kingsScent.timeLeft = 0;
    }

    if (data.timerInfos.gummy.used) {
        const targetTime = new Date(data.timerInfos.gummy.target);
        data.timerInfos.gummy.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    } else {
        data.timerInfos.gummy.timeLeft = 0;
    }
})

createGuiCommand(data.timerInfos.moveTimerDisplay, 'movetimer', 'mtm');
createGuiCommand(data.timerInfos.moveFluxTimerDisplay, 'movefluxtimer', 'mflux');

register('step', () => {
    if (!data.inSkyblock || !World.isLoaded()) return;
    const timerValues = [];
    // rekindle
    if (Settings.rekindleAlert) {
        if (data.timerInfos.rekindle.used) checkTimeLeft(rekindleObj, 'Phoenix', 'Rekindle');
        timerValues.push({ name: "Rekindle", color: '&6', timeLeft: data.timerInfos.rekindle.timeLeft});
    }

    // second wind
    if (Settings.secondWindAlert) {
        if (data.timerInfos.secondWind.used) checkTimeLeft(secondWindObj, 'Spirit Mask', 'Second Wind');
        timerValues.push({ name: "Second Wind", color: '&6',  timeLeft: data.timerInfos.secondWind.timeLeft});
    }

    // mushy tonic
    if (Settings.mushyTimer && data.currArea !== 'Garden') {
        if (data.timerInfos.glowyTonic.used) checkTimeLeft(tonicObj, 'Glowy Tonic');
        timerValues.push({ name: "Mushy Tonic", color: '&2', timeLeft: data.timerInfos.glowyTonic.timeLeft});
    }
    
    // bonzo
    if (Settings.bonzo_cd_timer) {
        if (data.timerInfos.bonzo.used) checkTimeLeft(bonzoObj, 'Bonzo Mask', "Clowin' Around");
        timerValues.push({ name: "Bonzo Mask", color: '&6', timeLeft: data.timerInfos.bonzo.timeLeft});
    }
    
    // kings scent
    if (Settings.kingScentTimer) {
        if (data.timerInfos.kingsScent.used) checkTimeLeft(kingsObj, '', "King's Scent");
        timerValues.push({ name: "King's Scent", color: '&2', timeLeft: data.timerInfos.kingsScent.timeLeft});
    }

    // cake
    // cakeDisplayText = Settings.cake_timer ? /** updateCDText(cakeTimeLeft) */ '' : '';

    // gummy bear
    if (Settings.gummyTimer) {
        if (data.timerInfos.gummy.used) checkTimeLeft(gummyObj, 'Gummy Bear');
        timerValues.push({name: "Gummy Bear", color: '&a', timeLeft: data.timerInfos.gummy.timeLeft});
    }

    timerValues.sort((a, b) => b.timeLeft - a.timeLeft);

    data.timerInfos.displayText = timerValues.map(entry => updateCDText(entry.color, entry.name, entry.timeLeft)).join('');
}).setFps(1);

register('dragged', (dx, dy, x, y) => {
    if (!data.inSkyblock) return;
    if (data.timerInfos.moveTimerDisplay.isOpen()) {
        data.timerDis.x = constrainX(x, 3, data.timerInfos.displayText);
        data.timerDis.y = constrainY(y, 3, data.timerInfos.displayText);
    }
    if (data.timerInfos.moveFluxTimerDisplay.isOpen()) {
        data.fluxTimer.x = constrainX(x, 3, orbObj.displayText);
        data.fluxTimer.y = constrainY(y, 3, orbObj.displayText);
    }
});

register('renderOverlay', () => {
    if (!data.inSkyblock) return;
    Renderer.drawStringWithShadow(data.timerInfos.displayText, data.timerInfos.x, data.timerInfos.y);
    renderGuiPosition(data.timerInfos.moveTimerDisplay, data.timerInfos, "&2Mushy Tonic: &r00m 00s\n&2King's Scent: &r00m 00s\n&6Bonzo's Mask: &r00m 00s\n&6Rekindle: 00m 00s\n&6Second Wind: &r00m 00s\n&aGummy Bear: &r00m00s")
    
    if (Settings.flux_timer && orbObj.found) {
        Renderer.drawStringWithShadow(orbObj.displayText, orbObj.x, orbObj.y);
        renderGuiPosition(data.timerInfos.moveFluxTimerDisplay, orbObj, '[Flux]: 00s')
    }
});

import Settings from "../settings.js"
import { data } from "../utils/data.js"
import { updateCDText, createGuiCommand, renderGuiPosition, crossLoadTimer } from '../utils/functions.js'
import { getActivePet } from '../utils/pet.js'
import { showAlert } from '../utils/utils.js'
import { sendMessage } from '../utils/party.js'


////////////////////////////////////////////////////////////////////////////////
// GUMMY --------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
const gummyCD = 60;
let gummyTimeLeft = 0;
register('chat', (event) => {
    if (!Settings.gummyTimer) return;
    data.audioInst.playDrinkSound();
    data.usedGummy = true; 
    const targetTime = new Date();
    targetTime.setMinutes(targetTime.getMinutes() + gummyCD);
    gummyTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.targetGummy = targetTime;
}).setCriteria('You ate a Re-heated Gummy Polar Bear!');

register('step', () => {
    if (!data.inSkyblock) return;
    if (!Settings.gummyTimer) return;
    if (!data.usedGummy) return;
    if (gummyTimeLeft > 0) {
        gummyTimeLeft -= 1;
        data.usedGummy = true;
        updateCDText('&a', 'Gummy Bear', gummyTimeLeft);
    } else if (gummyTimeLeft === 0) {
        data.audioInst.playDefaultSound();
        ChatLib.chat('&eYour &cReheated Gummy Bear &ehas expired!');
        showAlert('&cGummy Bear Expired');
        data.usedGummy = false;
        updateCDText('&a', 'Gummy Bear', gummyTimeLeft);
    }
}).setFps(1);


////////////////////////////////////////////////////////////////////////////////
// REKINDLE --------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
const rekindleCD = 60; // 60 
let rekindleTimeLeft = 0;
register('chat', (event) => {
    if (!Settings.rekindleAlert) return;
    data.audioInst.playProcSound();
    data.usedRekindle = true;
    const targetTime = new Date();
    targetTime.setMinutes(targetTime.getMinutes() + rekindleCD);
    rekindleTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.targetRekindle = targetTime;
}).setCriteria('Your Phoenix Pet saved you from certain death!');

register('step', () => {
    if (!data.inSkyblock) return;
    if (!Settings.rekindleAlert) return;
    if (!data.usedRekindle) return;
    if (rekindleTimeLeft > 0) {
        rekindleTimeLeft -= 1;
        data.usedRekindle = true;
        updateCDText('&6', 'Rekindle', rekindleTimeLeft);
    } else if (rekindleTimeLeft === 0) {
        data.audioInst.playDefaultSound();
        ChatLib.chat('&eYour Phoenix &cRekindle &eability has been refreshed!');
        showAlert('&aRekindle Available');
        data.usedRekindle = false;
        updateCDText('&6', 'Rekindle', rekindleTimeLeft);
    }
}).setFps(1);


////////////////////////////////////////////////////////////////////////////////
// SPIRIT MASK -----------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
const secondWindCD = 30; // 30
let secondWindTimeLeft = 0;
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.secondWindAlert) return;
    data.audioInst.playProcSound();
    data.usedSecondWind = true;
    const targetTime = new Date();
    targetTime.setSeconds(targetTime.getSeconds() + secondWindCD);
    secondWindTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.targetSecondWind = targetTime;
    showAlert('&cSPIRIT MASK USED');
    cancel(event);
}).setCriteria('Second Wind Activated! Your Spirit Mask saved your life!');

register('step', () => {
    if (!data.inSkyblock) return;
    if (!Settings.secondWindAlert) return;
    if (!data.usedSecondWind) return;
    if (secondWindTimeLeft > 0) {
        data.usedSecondWind = true;
        secondWindTimeLeft -= 1;
        updateCDText('&6', 'Second Wind', secondWindTimeLeft);
    } else if (secondWindTimeLeft === 0) {
        data.usedSecondWind = false;
        showAlert('&aSecond Wind Available');
        data.audioInst.playDefaultSound();
        ChatLib.chat('&eYour Spirit Mask &cSecond Wind &eability has been refreshed!');
        data.targetSecondWind = 0;
        updateCDText('&6', 'Second Wind', secondWindTimeLeft);
    }
}).setFps(1);


///////////////////////////////////////////////////////////////////////////////
// Flux Countdown Timer -----------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////
let orbFTimer = '';
let orbType;
let foundOrb = false;
let orbNameInfos = [];
let fluxTimerText = '';

register("step", () => {
    if (data.inSkyblock === false) return;
    if (!Settings.flux_timer) return;

    const nearbyOrbs = World.getAllEntitiesOfType(data.entityArmorStand)
        .filter(orbEntity => {
            const orbName = orbEntity.getName().removeFormatting();
            const effectiveRadius = orbEntity.distanceTo(Player.getPlayer());
            return (orbName.includes('Overflux') || orbName.includes('Plasmaflux')) && effectiveRadius < 19;
        });

    if (nearbyOrbs.length > 0) {
        foundOrb = true;
        orbNameInfos = [];
        for (const orb of nearbyOrbs) {
            const orbName = orb.getName().removeFormatting();
            if (orbName.includes('Overflux')) { orbType = 5; }
            if (orbName.includes('Plasmaflux')) { orbType = 6; }
            const countdownMatch = orbName.match(/(\d+)s/);
            if (countdownMatch) { orbFTimer = `&b${countdownMatch[1]}s`; }
            orbNameInfos.push(orbName);
        }
        
        if (orbFTimer !== "") {
            if (orbType == 5) { fluxTimerText = `&5[&rFlux&5]: &b${orbFTimer}`; } 
            if (orbType == 6) { fluxTimerText = `&d[&rFlux&d]: &b${orbFTimer}`; }
            if (fluxTimerText !== '[Flux]: 0s') {
                if (fluxTimerText == '[Flux]: 10s') {
                    ChatLib.chat('&c10s of Flux left!');
                }
            }
        }
    } else {
        orbFTimer = "";
        foundOrb = false;
    }
}).setFps(10);

////////////////////////////////////////////////////////////////////////////////
// MUSHY TIMER -----------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
let tonicTimeLeft = 0;
register('chat', (event) => {
    if (!Settings.mushyTimer) return;
    data.audioInst.playDrinkSound();
    let mushyCD = getActivePet().includes('Parrot') ? 5040 : 3600;
    data.usedTonic = true;
    const targetTime = new Date();
    targetTime.setSeconds(targetTime.getSeconds() + mushyCD);
    tonicTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.targetTonic = targetTime;
}).setCriteria('BUFF! You splashed yourself with Mushed Glowy Tonic I! Press TAB or type /effects to view your active effects!');

register('chat', (name, event) => {
    if (!Settings.mushyTimer) return;
    data.audioInst.playDrinkSound();
    let mushyCD = getActivePet().includes('Parrot') ? 5040 : 3600;
    data.usedTonic = true;
    const targetTime = new Date();
    targetTime.setSeconds(targetTime.getSeconds() + mushyCD);
    tonicTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.targetTonic = targetTime;
}).setCriteria('BUFF! You were splashed by ${name} with Mushed Glowy Tonic I! Press TAB or type /effects to view your active effects!')

register('step', () => {
    if (!Settings.mushyTimer) return;
    if (!data.inSkyblock) return;
    if (!data.usedTonic) return;
    if (tonicTimeLeft === 0) {
        data.audioInst.playDefaultSound();
        ChatLib.chat('&cYour &2Glowy Tonic &c has expired.');
        showAlert('&aGlowy Tonic Expired');
        data.usedTonic = false;
        updateCDText('&2', 'Mushy Tonic', tonicTimeLeft);
    } else if (tonicTimeLeft < 0) {
        data.usedTonic = false;
        updateCDText('&2', 'Mushy Tonic', tonicTimeLeft);
    } else {
        if (tonicTimeLeft === 60) {
            ChatLib.chat('&cYou have 1 minute of &2Glowy Mushy Tonic I &cleft.');
        } else if (tonicTimeLeft <= 3 && tonicTimeLeft > 0) {
            ChatLib.chat(`&cYour &2Glowy Mushy Tonic I &cexpires in ${tonicTimeLeft}.`);
        }
        tonicTimeLeft -= 1;
        data.usedTonic = true;
        updateCDText('&2', 'Mushy Tonic', tonicTimeLeft);
    }
}).setFps(1);

// mushy command
register('command', () => {
    const hours = Math.floor(tonicTimeLeft / 3600);
    const minutes = Math.floor((tonicTimeLeft % 3600) / 60);
    const seconds = tonicTimeLeft % 60;
    let timerText = '';

    if (hours > 0) {
        timerText = `Mushy Tonic: ${hours}h ${minutes}m`;
    } else if (minutes > 0) {
        timerText = `Mushy Tonic: ${minutes}m ${seconds}s`;
    } else {
        timerText = `Mushy Tonic: ${seconds}s`;
    }

    sendMessage(timerText);
}).setName('mushy');


////////////////////////////////////////////////////////////////////////////////
// BONZO MASK -----------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
const clownCD = 360; // 360
let clownTimeLeft = 0;
register('chat', (event) => {
    if (!Settings.bonzo_cd_timer) return;
    data.audioInst.playProcSound();
    data.usedBonzo = true;
    const targetTime = new Date();
    targetTime.setSeconds(targetTime.getSeconds() + clownCD);
    clownTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.targetBonzo = targetTime;
    showAlert('&cBONZO MASK USED');
    cancel(event);
}).setCriteria("Your Bonzo's Mask saved your life!");

register('step', () => {
    if (!Settings.bonzo_cd_timer) return;
    if (!data.inSkyblock) return;
    if (!data.usedBonzo) return;
    if (clownTimeLeft === 0) {
        data.audioInst.playDefaultSound();
        ChatLib.chat("&eYour Bonzo Mask &cClownin' Around &eability has been refreshed!")
        showAlert('&aBonzo Mask Available')
        data.usedBonzo = false;
        clownTimeLeft = clownCD;
    } else {
        clownTimeLeft -= 1 ;
        data.usedBonzo = true;
    }
}).setFps(1)


// ////////////////////////////////////////////////////////////////////////////////
// // CAKE TIMER ------------------------------------------------------------------
// ////////////////////////////////////////////////////////////////////////////////
// const cakeCD = 48; // 2 days
// let cakeTimeLeft = 0;

// register('chat', (boost, cakeType, event) => {
//     if (!Settings.cake_timer) return;
//     data.usedCake = true;
//     const targetTime = new Date();
//     targetTime.setHours(targetTime.getHours() + cakeCD);
//     cakeTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
//     data.targetCake = targetTime;
// }).setCriteria('Big Yum! You refresh ${boost} ${cakeType} for 48 hours!')

// register('gameLoad', () => {
//     if (!Settings.cake_timer) return;
//     cakeTimeLeft = 0;
//     const targetTime = new Date(data.targetCake);
//     cakeTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
// })

// register('step', () => {
//     if (!Settings.cake_timer) return;
//     if (!data.inSkyblock) return;
//     if (!data.usedCake) return;
//     if (cakeTimeLeft === 0) {
//         data.audioInst.playDefaultSound();
//         ChatLib.chat('&cYour &6&lCAKES &r&chave expired.')
//         showAlert('&6&lCAKES &r&cExpired');
//         data.usedCake = false;
//         cakeTimeLeft = cakeCD;
//     } else if (cakeTimeLeft === 60) {
//         ChatLib.chat('&cYou have 1 minute of &6&lCAKES &r&cleft.');
//         data.usedCake = true;
//     } else if (cakeTimeLeft === 3) {
//         ChatLib.chat('&cYour &6&lCAKES &r&cexpires in 3.');
//         data.usedCake = true;
//     } else if (cakeTimeLeft === 2) {
//         ChatLib.chat('&cYour &6&lCAKES &r&cexpires in 2.');
//         data.usedCake = true;
//     } else if (cakeTimeLeft === 1) {
//         ChatLib.chat('&cYour &6&lCAKES &r&cexpires in 1.');
//         data.usedCake = true;
//     } else {
//         cakeTimeLeft -= 1;
//         data.usedCake = true;
//         updateCakeTimerText(cakeTimeLeft);
//     }
// })

////////////////////////////////////////////////////////////////////////////////
// KINGS SCENT TIMER -----------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
const kingsScentCD = 1200; // 20 minutes
let kingsScentTimeLeft = 0;
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.kingScentTimer) return;
    data.audioInst.playDrinkSound();
    data.usedScent = true;
    const targetTime = new Date();
    targetTime.setSeconds(targetTime.getSeconds() + kingsScentCD);
    kingsScentTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.targetScent = targetTime;
}).setCriteria("[NPC] King Yolkar: I'm covering you in my foul stench as we speak. It won't last long before it dissipates!");

register('step', () => {
    if (!data.inSkyblock) return;
    if (!Settings.kingScentTimer) return;
    if (!data.usedScent) return;
    if (kingsScentTimeLeft > 0) {
        kingsScentTimeLeft -= 1;
        data.usedScent = true;
    } else if (kingsScentTimeLeft === 0) {
        data.audioInst.playProcSound();
        ChatLib.chat("&cYour &2King's Scent &chas worn off!");
        showAlert(`&cKing's Scent Expired`);
        data.usedScent = false;
    }
}).setFps(1);



////////////////////////////////////////////////////////////////////////////////
// RENDER OVERLAY
////////////////////////////////////////////////////////////////////////////////

let timerDisplayText = '';

var movetimer = new Gui(); // timer displays
var movefluxtimer = new Gui();


register('gameLoad', () => {
    if (!Settings.rekindleAlert) return;
    if (!Settings.secondWindAlert) return;
    if (!Settings.mushyTimer) return;
    if (!Settings.bonzo_cd_timer) return;
    if (!Settings.kingScentTimer) return;
    if (!Settings.gummyTimer) return;

    if (data.usedRekindle) {
        const targetTime = new Date(data.targetRekindle);
        rekindleTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    } else {
        rekindleTimeLeft = 0;
    }

    if (data.usedSecondWind) {
        const targetTime = new Date(data.targetSecondWind);
        secondWindTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    } else {
        secondWindTimeLeft = 0;
    }

    if (data.usedTonic) {
        const targetTime = new Date(data.targetTonic);
        tonicTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    } else {
        tonicTimeLeft = 0;
    }

    if (data.usedBonzo) {
        const targetTime = new Date(data.targetBonzo);
        clownTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    } else {
        clownTimeLeft = 0;
    }

    if (data.usedScent) {
        const targetTime = new Date(data.targetScent);
        kingsScentTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    } else {
        kingsScentTimeLeft = 0;
    }

    if (data.usedGummy) {
        const targetTime = new Date(data.targetGummy);
        gummyTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    } else {
        gummyTimeLeft = 0;
    }


    // crossLoadTimer(data.usedRekindle, data.targetRekindle)
    // crossLoadTimer(data.usedSecondWind, data.targetSecondWind)
    // crossLoadTimer(data.usedTonic, data.targetTonic)
    // crossLoadTimer(data.usedBonzo, data.targetBonzo)
    // crossLoadTimer(data.usedScent, data.targetScent)
    // crossLoadTimer(data.usedGummy, data.targetGummy)
})


register('dragged', (dx, dy, x, y) => {
    if (!data.inSkyblock) return;
    if (movetimer.isOpen()) {
        data.timerDis.x = x;
        data.timerDis.y = y;
    }
    if (movefluxtimer.isOpen()) {
        data.fluxTimer.x = x;
        data.fluxTimer.y = y;
    }
})

createGuiCommand(movetimer, 'movetimer', 'mtm');
createGuiCommand(movefluxtimer, 'movefluxtimer', 'mflux');

register('step', () => {
    const timerValues = [];
    // rekindle
    if (Settings.rekindleAlert) {
        timerValues.push({ name: "Rekindle", color: '&6', timeLeft: rekindleTimeLeft});
    }

    // second wind
    if (Settings.secondWindAlert) {
        timerValues.push({ name: "Second Wind", color: '&6',  timeLeft: secondWindTimeLeft});
    }

    // mushy tonic
    if (Settings.mushyTimer && data.currArea !== 'Garden') {
        timerValues.push({ name: "Mushy Tonic", color: '&2', timeLeft: tonicTimeLeft});
    }
    
    // bonzo
    if (Settings.bonzo_cd_timer) {
        timerValues.push({ name: "Bonzo Mask", color: '&6', timeLeft: clownTimeLeft});
    }
    
    // kings scent
    if (Settings.kingScentTimer) {
        timerValues.push({ name: "King's Scent", color: '&2', timeLeft: kingsScentTimeLeft});
    }

    // cake
    // cakeDisplayText = Settings.cake_timer ? /** updateCDText(cakeTimeLeft) */ '' : '';

    // feeder 
    // feederDisplayText = Settings.feeder_timer ? /* NEED VAR*/'' : '';

    // gummy bear
    if (Settings.gummyTimer) {
        timerValues.push({name: "Gummy Bear", color: '&a', timeLeft: gummyTimeLeft});
    }

    timerValues.sort((a, b) => b.timeLeft - a.timeLeft);

    timerDisplayText = timerValues.map(entry => updateCDText(entry.color, entry.name, entry.timeLeft)).join('');
}).setFps(1)

register('renderOverlay', () => {
    if (!data.inSkyblock) return;
    Renderer.drawStringWithShadow(timerDisplayText, data.timerDis.x, data.timerDis.y);
    renderGuiPosition(movetimer, data.timerDis, "&2Mushy Tonic: &r00m 00s\n&2King's Scent: &r00m 00s\n&6Bonzo's Mask: &r00m 00s\n&6Rekindle: 00m 00s\n&6Second Wind: &r00m 00s\n&aGummy Bear: &r00m00s")
    
    if (!Settings.flux_timer) return;
    if (!foundOrb) return;
    Renderer.drawStringWithShadow(fluxTimerText, data.fluxTimer.x, data.fluxTimer.y);

    renderGuiPosition(movefluxtimer, data.fluxTimer, '[Flux]: 00s')
});

import Settings from "../settings.js"
import { data } from "../utils/data.js"
import { constrainX, constrainY, createGuiCommand, renderGuiPosition, updateCDText } from '../utils/functions.js'
import { sendMessage } from '../utils/party.js'
import { getActivePet } from '../utils/pet.js'
import { showAlert } from '../utils/utils.js'

////////////////////////////////////////////////////////////////////////////////
// GUMMY --------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.gummyTimer) return;
    data.audioInst.playDrinkSound();
    data.timerInfos.gummy.used = true; 
    const targetTime = new Date();
    targetTime.setMinutes(targetTime.getMinutes() + data.timerInfos.gummy.cd);
    data.timerInfos.gummy.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.timerInfos.gummy.target = targetTime;
}).setCriteria('You ate a Re-heated Gummy Polar Bear!');

register('step', () => {
    if (!data.inSkyblock) return;
    if (!Settings.gummyTimer) return;
    if (!data.timerInfos.gummy.used) return;
    if (data.timerInfos.gummy.timeLeft > 0) {
        data.timerInfos.gummy.timeLeft -= 1;
        data.timerInfos.gummy.used = true;
        updateCDText('&a', 'Gummy Bear', data.timerInfos.gummy.timeLeft);
    } else if (data.timerInfos.gummy.timeLeft === 0) {
        data.audioInst.playDefaultSound();
        ChatLib.chat('&eYour &cReheated Gummy Bear &ehas expired!');
        showAlert('&cGummy Bear Expired');
        data.timerInfos.gummy.used = false;
        updateCDText('&a', 'Gummy Bear', data.timerInfos.gummy.timeLeft);
    }
}).setFps(1);


////////////////////////////////////////////////////////////////////////////////
// REKINDLE --------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.rekindleAlert) return;
    data.audioInst.playProcSound();
    data.timerInfos.rekindle.used = true;
    const targetTime = new Date();
    targetTime.setMinutes(targetTime.getMinutes() + data.timerInfo.rekindle.cd);
    datat.timerInfo.rekindle.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.timerInfos.rekindle.target = targetTime;
}).setCriteria('Your Phoenix Pet saved you from certain death!');

register('step', () => {
    if (!data.inSkyblock) return;
    if (!Settings.rekindleAlert) return;
    if (!data.timerInfos.rekindle.used) return;
    if (datat.timerInfo.rekindle.timeLeft > 0) {
        datat.timerInfo.rekindle.timeLeft -= 1;
        data.timerInfos.rekindle.used = true;
        updateCDText('&6', 'Rekindle', datat.timerInfo.rekindle.timeLeft);
    } else if (datat.timerInfo.rekindle.timeLeft === 0) {
        data.audioInst.playDefaultSound();
        ChatLib.chat('&eYour Phoenix &cRekindle&e ability has been refreshed!');
        showAlert('&aRekindle Available');
        data.timerInfos.rekindle.used = false;
        updateCDText('&6', 'Rekindle', datat.timerInfo.rekindle.timeLeft);
    }
}).setFps(1);


////////////////////////////////////////////////////////////////////////////////
// SPIRIT MASK -----------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.secondWindAlert) return;
    data.audioInst.playProcSound();
    data.timerInfos.secondWind.used = true;
    const targetTime = new Date();
    targetTime.setSeconds(targetTime.getSeconds() + data.timerInfos.secondWind.cd);
    data.timerInfos.secondWind.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.timerInfos.secondWind.target = targetTime;
}).setCriteria('Second Wind Activated! Your Spirit Mask saved your life!');

register('step', () => {
    if (!data.inSkyblock) return;
    if (!Settings.secondWindAlert) return;
    if (!data.timerInfos.secondWind.used) return;
    if (data.timerInfos.secondWind.timeLeft > 0) {
        data.timerInfos.secondWind.used = true;
        data.timerInfos.secondWind.timeLeft -= 1;
        updateCDText('&6', 'Second Wind', data.timerInfos.secondWind.timeLeft);
    } else if (data.timerInfos.secondWind.timeLeft === 0) {
        data.timerInfos.secondWind.used = false;
        showAlert('&aSecond Wind Available');
        data.audioInst.playDefaultSound();
        ChatLib.chat('&eYour Spirit Mask &cSecond Wind &eability has been refreshed!');
        data.timerInfos.secondWind.target = 0;
        updateCDText('&6', 'Second Wind', data.timerInfos.secondWind.timeLeft);
    }
}).setFps(1);


///////////////////////////////////////////////////////////////////////////////
// Flux Countdown Timer -----------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////
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
        data.timerInfos.orb.found = true;
        data.timerInfos.orb.registered = [];
        for (const orb of nearbyOrbs) {
            const orbName = orb.getName().removeFormatting();
            if (orbName.includes('Overflux')) { data.timerInfos.orb.type = 5; }
            if (orbName.includes('Plasmaflux')) { data.timerInfos.orb.type = 6; }
            const countdownMatch = orbName.match(/(\d+)s/);
            if (countdownMatch) { data.timerInfos.orb.formattedText = `&b${countdownMatch[1]}s`; }
            data.timerInfos.orb.registered.push(orbName);
        }
        
        if (data.timerInfos.orb.formattedText !== "") {
            if (data.timerInfos.orb.type === 5) { data.timerInfos.orb.displayText = `&5[&rFlux&5]: &b${data.timerInfos.orb.formattedText}`; } 
            if (data.timerInfos.orb.type === 6) { data.timerInfos.orb.displayText = `&d[&rFlux&d]: &b${data.timerInfos.orb.formattedText}`; }
            if (data.timerInfos.orb.displayText !== '[Flux]: 0s') {
                if (data.timerInfos.orb.displayText === '[Flux]: 10s') {
                    ChatLib.chat('&c10s of Flux left!');
                }
            }
        }
    } else {
        data.timerInfos.orb.formattedText = "";
        data.timerInfos.orb.found = false;
    }
}).setFps(10);

////////////////////////////////////////////////////////////////////////////////
// MUSHY TIMER -----------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.mushyTimer) return;
    data.audioInst.playDrinkSound();
    let mushyCD = getActivePet().includes('Parrot') ? 5040 : 3600;
    data.usedTonic = true;
    const targetTime = new Date();
    targetTime.setSeconds(targetTime.getSeconds() + mushyCD);
    data.timerInfos.glowyTonic.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.targetTonic = targetTime;
}).setCriteria('BUFF! You splashed yourself with Mushed Glowy Tonic I! Press TAB or type /effects to view your active effects!');

register('chat', (name, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.mushyTimer) return;
    data.audioInst.playDrinkSound();
    let mushyCD = getActivePet().includes('Parrot') ? 5040 : 3600;
    data.usedTonic = true;
    const targetTime = new Date();
    targetTime.setSeconds(targetTime.getSeconds() + mushyCD);
    data.timerInfos.glowyTonic.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.targetTonic = targetTime;
}).setCriteria('BUFF! You were splashed by ${name} with Mushed Glowy Tonic I! Press TAB or type /effects to view your active effects!')

register('step', () => {
    if (!data.inSkyblock || !World.isLoaded()) return;
    if (!Settings.mushyTimer) return;
    if (!data.usedTonic) return;
    if (data.timerInfos.glowyTonic.timeLeft === 0) {
        data.audioInst.playDefaultSound();
        ChatLib.chat('&cYour &2Glowy Tonic &c has expired.');
        showAlert('&aGlowy Tonic Expired');
        data.usedTonic = false;
        updateCDText('&2', 'Mushy Tonic', data.timerInfos.glowyTonic.timeLeft);
    } else if (data.timerInfos.glowyTonic.timeLeft < 0) {
        data.usedTonic = false;
        updateCDText('&2', 'Mushy Tonic', data.timerInfos.glowyTonic.timeLeft);
    } else {
        if (data.timerInfos.glowyTonic.timeLeft === 60) {
            ChatLib.chat('&cYou have 1 minute of &2Glowy Mushy Tonic I &cleft.');
        } else if (data.timerInfos.glowyTonic.timeLeft <= 3 && data.timerInfos.glowyTonic.timeLeft > 0) {
            ChatLib.chat(`&cYour &2Glowy Mushy Tonic I &cexpires in ${data.timerInfos.glowyTonic.timeLeft}.`);
        }
        data.timerInfos.glowyTonic.timeLeft -= 1;
        data.usedTonic = true;
        updateCDText('&2', 'Mushy Tonic', data.timerInfos.glowyTonic.timeLeft);
    }
}).setFps(1);

// mushy command
register('command', () => {
    const hours = Math.floor(data.timerInfos.glowyTonic.timeLeft / 3600);
    const minutes = Math.floor((data.timerInfos.glowyTonic.timeLeft % 3600) / 60);
    const seconds = data.timerInfos.glowyTonic.timeLeft % 60;
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
register('chat', (event) => {
    if (!Settings.bonzo_cd_timer) return;
    data.audioInst.playProcSound();
    data.timerInfos.bonzo.used = true;
    const targetTime = new Date();
    targetTime.setMinutes(targetTime.getMinutes() + data.timerInfos.bonzo.cd);
    data.timerInfos.bonzo.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.timerInfos.bonzo.target = targetTime;
}).setCriteria("Your Bonzo's Mask saved your life!");

register('step', () => {
    if (!Settings.bonzo_cd_timer) return;
    if (!data.inSkyblock) return;
    if (!data.timerInfos.bonzo.used) return;
    if (data.timerInfos.bonzo.timeLeft === 0) {
        data.audioInst.playDefaultSound();
        ChatLib.chat("&eYour Bonzo Mask &cClownin' Around &eability has been refreshed!")
        showAlert('&aBonzo Mask Available')
        data.timerInfos.bonzo.used = false;
        data.timerInfos.bonzo.timeLeft = data.timerInfos.bonzo.cd;
    } else {
        data.timerInfos.bonzo.timeLeft -= 1 ;
        data.timerInfos.bonzo.used = true;
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

    if (data.timerInfos.rekindle.used) {
        const targetTime = new Date(data.timerInfos.rekindle.target);
        datat.timerInfo.rekindle.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    } else {
        datat.timerInfo.rekindle.timeLeft = 0;
    }

    if (data.timerInfos.secondWind.used) {
        const targetTime = new Date(data.timerInfos.secondWind.target);
        data.timerInfos.secondWind.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    } else {
        data.timerInfos.secondWind.timeLeft = 0;
    }

    if (data.usedTonic) {
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

    if (data.usedScent) {
        const targetTime = new Date(data.targetScent);
        kingsScentTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    } else {
        kingsScentTimeLeft = 0;
    }

    if (data.timerInfos.gummy.used) {
        const targetTime = new Date(data.timerInfos.gummy.target);
        data.timerInfos.gummy.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    } else {
        data.timerInfos.gummy.timeLeft = 0;
    }
})

createGuiCommand(movetimer, 'movetimer', 'mtm');
createGuiCommand(movefluxtimer, 'movefluxtimer', 'mflux');

register('step', () => {
    const timerValues = [];
    // rekindle
    if (Settings.rekindleAlert) {
        timerValues.push({ name: "Rekindle", color: '&6', timeLeft: datat.timerInfo.rekindle.timeLeft});
    }

    // second wind
    if (Settings.secondWindAlert) {
        timerValues.push({ name: "Second Wind", color: '&6',  timeLeft: data.timerInfos.secondWind.timeLeft});
    }

    // mushy tonic
    if (Settings.mushyTimer && data.currArea !== 'Garden') {
        timerValues.push({ name: "Mushy Tonic", color: '&2', timeLeft: data.timerInfos.glowyTonic.timeLeft});
    }
    
    // bonzo
    if (Settings.bonzo_cd_timer) {
        timerValues.push({ name: "Bonzo Mask", color: '&6', timeLeft: data.timerInfos.bonzo.timeLeft});
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
        timerValues.push({name: "Gummy Bear", color: '&a', timeLeft: data.timerInfos.gummy.timeLeft});
    }

    timerValues.sort((a, b) => b.timeLeft - a.timeLeft);

    timerDisplayText = timerValues.map(entry => updateCDText(entry.color, entry.name, entry.timeLeft)).join('');
}).setFps(1);

register('dragged', (dx, dy, x, y) => {
    if (!data.inSkyblock) return;
    if (movetimer.isOpen()) {
        data.timerDis.x = constrainX(x, 3, timerDisplayText);
        data.timerDis.y = constrainY(y, 3, timerDisplayText);
    }
    if (movefluxtimer.isOpen()) {
        data.fluxTimer.x = constrainX(x, 3, data.timerInfos.orb.displayText);
        data.fluxTimer.y = constrainY(y, 3, data.timerInfos.orb.displayText);
    }
});

register('renderOverlay', () => {
    if (!data.inSkyblock) return;
    Renderer.drawStringWithShadow(timerDisplayText, data.timerDis.x, data.timerDis.y);
    renderGuiPosition(movetimer, data.timerDis, "&2Mushy Tonic: &r00m 00s\n&2King's Scent: &r00m 00s\n&6Bonzo's Mask: &r00m 00s\n&6Rekindle: 00m 00s\n&6Second Wind: &r00m 00s\n&aGummy Bear: &r00m00s")
    
    if (!Settings.flux_timer) return;
    if (!data.timerInfos.orb.found) return;
    Renderer.drawStringWithShadow(data.timerInfos.orb.displayText, data.fluxTimer.x, data.fluxTimer.y);
    
    renderGuiPosition(movefluxtimer, data.fluxTimer, '[Flux]: 00s')
});

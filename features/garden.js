import Settings from '../settings.js'
import { data } from '../utils/data.js'
import { showAlert } from '../utils/utils.js'
import { drawOutlineBeacon, getCell, petDropPing, getTimerTarget, playSound, crossLoadTimer } from '../utils/functions.js'
import { drawArrow, drawScaledString, updatePlots, colorPlot, startSprayTimer } from '../utils/functions.js'
import { sendMessage } from '../utils/party.js'
import { getActivePet } from '../utils/pet.js'

import { trackChatTimer, updateCDText } from '../utils/functions.js'
 
////////////////////////////////////////////////////////////////////
// SETUP        
////////////////////////////////////////////////////////////////////
const playerArrow = Image.Companion.fromFile(`config/ChatTriggers/modules/bao-dev/assets/delta-arrow.png`);

////////////////////////////////////////////////////////////////////
// Reminder for getting desk config
////////////////////////////////////////////////////////////////////
register('step', () => {
    if (!World.isLoaded()) return;
    if (data.currArea !== 'Garden') return;
    if (data.sentDeskReminder) return;
    if (data.plots = []) {
        data.audioInst.playDefaultSound();
        ChatLib.chat("&7[&3Bao&6] &7Hi! \n&7Just a reminder, to setup bao for the garden, click into the &e'Configure Plots'&7 window of your &e/desk&7 menu in the Garden.\n&7If you' received the chat message &b'Bao config saved'&7, the process has been completed.")
        data.sentDeskReminder = true;
    }
}).setFps(1);


////////////////////////////////////////////////////////////////////
// SIMPLE REG CHATS
////////////////////////////////////////////////////////////////////
// alert message: You don't have any ${materialName}!
register('chat', (materialName, event) => {
    if (data.currArea !== 'Garden') return;
    if (Settings.alertNoMatSprayonator) {
        data.audioInst.playDefaultSound();
        showAlert(`&cNeed &e${materialName}&c!`)
    }
}).setCriteria("You don't have any ${materialName}!");

// selected mat for sprayonator
register('chat', (material, event) => {
    if (data.currArea !== 'Garden') return;
    cancel(event); // if  settings.garden_sprayonator_hider
    data.selectedSprayMat = material;
}).setCriteria('SPRAYONATOR! Your selected material is now ${material}!');


////////////////////////////////////////////////////////////////////
// CLASS OF PLOTS
////////////////////////////////////////////////////////////////////
class Plot {
    constructor(name, refCoords, tl, br, sprayDisPos) {
        this.name = name;
        this.refCoords = refCoords;
        this.tl = tl;
        this.br = br;
        this.pest = false;
        this.spray = false;
        this.sprayDisPos = sprayDisPos;
        this.sprayDateEnd = null;
        this.sprayTimerText = '';
    }
}


// creating data for data.gardenPlot.coords
data.gardenPlot.coords = [];
for (let i = 0; i < data.gardenPlot.rows; i++) {
    let rowSet = [];
    for (let j = 0; j < data.gardenPlot.cols; j++) {
        let x1 = -240 + j * data.gardenPlot.plotW;
        let x2 = -145 + j * data.gardenPlot.plotW;

        let z1 = -240 + i * data.gardenPlot.plotW;
        let z2 = -145 + i * data.gardenPlot.plotW;
        
        let tl = [x1, z1];
        let br = [x2, z2];

        let submatrix = [tl, br]
        rowSet.push(submatrix);
    }
    data.gardenPlot.coords.push(rowSet);
}

// creating data for data.plotSprayInfo.timers -- FOR RENDERING ONLY
data.plotSprayInfo.timers = [];
for (let i=0; i <5; i++) {
    let timerRow = [];
    for (let j=0; j<5; j++) {
        let x1 = data.gardenMap.x + data.plotSprayInfo.offsetX + i * data.plotSprayInfo.dx;
        let y1 = data.gardenMap.y + data.plotSprayInfo.offsetY + j * data.plotSprayInfo.dy;
        let submatrix = [x1, y1];
        timerRow.push(submatrix);
    }
    // console.log(timerRow)
    data.plotSprayInfo.timers.push(timerRow);
}


// creating data for data.playerPlotInfo.names
register('guiRender', () => {
    if (data.currArea !== 'Garden') return;
    if (data.playerPlotInfo.configMsg) return;
    if (Player.getPlayer() === null || Player.getOpenedInventory() === null || Player.getContainer().getName() !== 'Configure Plots') return;

    let guiContainer = Player.getContainer();
    data.pestPlotCoords = [];
    data.sprayPlotCoords = [];
    data.plots = [];
    data.playerPlotInfo.names = [];
    
    for (let i = 0; i < data.playerPlotInfo.rows; i++) {
        let row = [];
        for (let j = 0; j < data.playerPlotInfo.cols; j++) {
            let slotIdx = i * 9 + j + 2;
            let cellValue = getCell(guiContainer, slotIdx);
            row.push(cellValue);
        }
        data.playerPlotInfo.names.push(row.slice(0, 5));
    }
    
    for (let r = 0; r < data.playerPlotInfo.rows; r++) {
        let playerRow = [];
        for (let c = 0; c < data.playerPlotInfo.cols; c++) {
            let cellName = data.playerPlotInfo.names[r][c];
            let timerDis = data.plotSprayInfo.timers[c][r];
            let [tl, br] = data.gardenPlot.coords[r][c];
            let refCoords = [r, c]
            let plot = {
                name: cellName, 
                refCoords: refCoords, 
                tl: tl, 
                br: br, 
                sprayDisPos: timerDis, 
                pest: false, 
                spray: false, 
            }
            playerRow.push(plot)
        }
        data.plots.push(playerRow)
    }

    data.playerPlotInfo.numLoads -= 1;
    if (data.playerPlotInfo.numLoads === 0) {
        ChatLib.chat('&6[&3Bao&6] &bDesk Config Saved.')
        data.playerPlotInfo.configMsg = true;
    }
});


////////////////////////////////////////////////////////////////////
// PEST APPEARS REG CHAT
////////////////////////////////////////////////////////////////////
register('chat', (exclamation, userPlotName, event) => {
    if (data.currArea !== 'Garden') return;
    if (!Settings.pestQOL) return;
    //  GROSS! A Pest has appeared in Plot - money 1!
    updatePlots(data.plots, userPlotName, 'pest', true);

    if (Settings.titlePestAlert) showAlert(`&c1 &rPest!`);
    if (Settings.autoSHPest) {
        setTimeout(() => {
            ChatLib.command('sethome')
            if (Settings.autoWarpPest && !data.isContest) {
                setTimeout(() => {
                    ChatLib.command(`tptoplot ${userPlotName}`)
                }, 300)
            };
        }, 200)
    };
    data.audioInst.playDefaultSound();
}).setCriteria('${exclamation}! A Pest has appeared in Plot - ${userPlotName}!');

register('chat', (exclamation, numPests, userPlotName, event) => {
    if (data.currArea !== 'Garden') return;
    if (!Settings.pestQOL) return;
    // EWW! 2 Pests have spawned in Plot - kacktoos 2!
    updatePlots(data.plots, userPlotName, 'pest', true);

    if (Settings.titlePestAlert) showAlert(`&b${numPests} &rpests!`);
    if (Settings.autoSHPest) {
        setTimeout(() => {
            ChatLib.command('sethome')
            if (Settings.autoWarpPest && !data.isContest) {
                setTimeout(() => {
                    ChatLib.command(`tptoplot ${userPlotName}`)
                }, 300)
            };
        }, 200)
    };
    data.audioInst.playDefaultSound();
}).setCriteria('${exclamation}! ${numPests} Pests have spawned in Plot - ${userPlotName}!');


////////////////////////////////////////////////////////////////////
// PLOT SPRAYED REG CHAT
////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (data.currArea !== 'Garden') return;
    if (Settings.hideSprayonatorExpiryMsg) cancel(event);
}).setCriteria('SPRAYONATOR! This will expire in 30m!');

register('chat', (userPlotName, mat, event) => {
    if (data.currArea !== 'Garden') return;
    // SPRAYONATOR! You sprayed Plot - melon 2 with Compost!
    updatePlots(data.plots, userPlotName, 'spray', false);
    updatePlots(data.plots, userPlotName, 'spray', true);
    updatePlots(data.plots, userPlotName, 'sprayDateEnd', new Date());
    if (Settings.gardenPlotMap) startSprayTimer(data.plots, userPlotName);
    data.audioInst.playProcSound();
}).setCriteria('SPRAYONATOR! You sprayed Plot - ${userPlotName} with ${mat}!');


////////////////////////////////////////////////////////////////////
// VINYL SELECTOR CHAT REG
////////////////////////////////////////////////////////////////////
register('chat', (vinylName, event) => {
    if (data.currArea !== 'Garden') return;
    if (!Settings.vinylDisplay) return;
    if (!data.allVinylNames.includes(vinylName)) return;
    data.isPlayingVinyl = false;
    data.currentVinyl = '&cNo Vinyl Playing';
}).setCriteria('You are no longer playing ${vinylName}!');

register('chat', (vinylName, event) => {
    if (data.currArea !== 'Garden') return;
    if (!Settings.vinylDisplay) return;
    if (!data.allVinylNames.includes(vinylName)) return;
    data.isPlayingVinyl = true;
    data.currentVinyl = vinylName;
    data.audioInst.playDefaultSound();
}).setCriteria('You are now playing ${vinylName}!');


////////////////////////////////////////////////////////////////////
// HARVEST HARBRINGER POTION CD TIMER
////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.harvPotionOverlay) return;
    let harvPotCD = getActivePet().includes('Parrot') ? 35 : 25;
    data.audioInst.playDrinkSound();

    data.usedHarvPot = true;
    const targetTime = getTimerTarget(harvPotCD, 's');
    data.harvPotTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.targetHarvPot = targetTime;
}).setCriteria('BUFF! You have gained Harvest Harbinger V! Press TAB or type /effects to view your active effects!');


////////////////////////////////////////////////////////////////////
// PEST REPELLENT TIMER
////////////////////////////////////////////////////////////////////
let is2x = false;
let is4x = false;
register('chat', (pestRepellentType, event) => {
    if (data.currArea !== 'Garden') return;
    if (!Settings.pestRepellentDisplay) return;
    if (pestRepellentType === '2') is2x = true; 
    is2x = pestRepellentType === '2';
    is4x = pestRepellentType === '4';
    data.audioInst.playDrinkSound();

    data.usedPestRepellent = true;
    const targetTime = getTimerTarget(data.pestRepelCD, 'm');
    data.pestRepellentTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.targetPestRepellent = targetTime;
}).setCriteria('YUM! Pests will now spawn ${pestRepellentType}x less while you break crops for the next 60m!');


////////////////////////////////////////////////////////////////////
// PEST EXCHANGE 
////////////////////////////////////////////////////////////////////
register('chat', (numPests, ff, duration, event) => {
    if (data.currArea !== 'Garden') return;
    if (!Settings.pestExchangeDisplay) return;
    // [NPC] Phillip: In exchange for 1 Pest, I've given you +10☘ Farming Fortune for 30m!
    data.bonusFF = parseInt(ff.replace(',', ''), 10)
    data.donatedPests = parseInt(numPests.replace(',', ''), 10);
    data.audioInst.playDrinkSound();

    data.usedPestExchange = true;
    const targetTime = getTimerTarget(parseInt(duration.replace(',', ''), 10), 'm');
    data.pestExchangeTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.targetExchange = targetTime;
}).setCriteria("[NPC] Phillip: In exchange for ${numPests} Pest, I've given you +${ff}☘ Farming Fortune for ${duration}m!");


////////////////////////////////////////////////////////////////////
// TIMER GAMELOAD REGS
////////////////////////////////////////////////////////////////////
register('gameLoad', () => {
    if (!data.inSkyblock) return;
    if (!Settings.harvPotionOverlay) return;
    if (!Settings.pestRepellentDisplay) return;
    if (!Settings.pestExchangeDisplay) return;
    data.harvPotTimeLeft = crossLoadTimer(data.usedHarvPot, data.targetHarvPot);
    data.pestRepellentTimeLeft = crossLoadTimer(data.usedRepellent, data.targetRepellent);
    data.pestRepellentTimeLeft = crossLoadTimer(data.usedPestExchange, data.targetExchange);
})


////////////////////////////////////////////////////////////////////
// TIMER STEP TRIGGERS
////////////////////////////////////////////////////////////////////
function updateTimer(dataUsedVar, dataTargetVar, timeLeft, colorCode, nameOfTimer, audioInst) { 
    console.log('func trigger: running updateTimer')
    console.log(`func trigger: timeleft: ${timeLeft}`)
    console.log(`func trigger: before func run: usedVar status: ${dataUsedVar}`)
    if (timeLeft > 0) {
        dataUsedVar = true;
        timeLeft -= 1;
        updateCDText(colorCode, nameOfTimer, timeLeft);
    } else {
        dataUsedVar = false;
        // showAlert(`&c${nameOfTimer}&e Expired`);
        // audioInst.playDefaultSound();
        // ChatLib.chat(`&eYour &c${nameOfTimer}&e has expired.`)
        dataTargetVar = 0;
        updateCDText(colorCode, nameOfTimer, timeLeft);
    }
    console.log(`func trigger: after func run: updateTimer usedVar status: ${dataUsedVar}`)
    return timeLeft;
}

register('step', () => {
    if (data.currArea !== 'Garden') return;

    if (Settings.harvPotionOverlay) {
        if (data.usedHarvPot) {
            console.log(`step trigger: data.harvPotTimeLeft val: ${data.harvPotTimeLeft}`)
            // data.harvPotTimeLeft = trackChatTimer(data.usedHarvPot, data.targetHarvPot, data.harvPotTimeLeft, 'Harbringer Potion', '&6', data.audioInst);
            // if (data.harvPotTimeLeft > 0) {
            //     data.usedHarvPot = true;
            //     data.harvPotTimeLeft -= 1;
            //     updateCDText('&6', 'Harbringer Potion', data.harvPotTimeLeft);
            // } else if (data.harvPotTimeLeft === 0 || data.harvPotTimeLeft < 0) {
            //     data.usedHarvPot = false;
            //     showAlert(`&cHarbringer Potion &eExpired`)
            //     data.audioInst.playDefaultSound();
            //     ChatLib.chat(`&eYour &cHarbringer Potion &ehas expired.`)
            //     data.targetHarvPot = 0;
            //     updateCDText('&6', 'Harbringer Potion', data.harvPotTimeLeft);
            // }
            console.log(`step trigger: before updateTimer func usedvar status: ${data.usedHarvPot}`)
            data.harvPotTimeLeft = updateTimer(data.usedHarvPot, data.targetHarvPot, data.harvPotTimeLeft, '&6', 'Harbringer Potion', data.audioInst)
            console.log(`step trigger: after updateTimer func usedvar status: ${data.usedHarvPot}`)
        }
        data.harbringerText = data.harvPotTimeLeft > 0 ? `&6Harbringer Potion: &r${Math.floor(data.harvPotTimeLeft/60)}m ${Math.floor(data.harvPotTimeLeft % 60)}s&r` : '';
    }

    // pest repellent timer
    if (Settings.pestRepellentDisplay) {
        if (is2x) data.pestRepelType = '2x';
        if (is4x) data.pestRepelType = '4x';
        if (!data.usedPestRepellent) return;
        console.log(`data.pestRepellentTimeLeft val: ${data.harvPotTimeLeft}`)

        // data.pestRepellentTimeLeft = trackChatTimer(data.usedPestRepellent, data.targetPestRepellent, data.pestRepellentTimeLeft, 'Pest Repellent', '', data.audioInst);
        if (data.pestRepellentTimeLeft > 0) {
            data.usedPestRepellent = true;
            data.pestRepellentTimeLeft -= 1;
            updateCDText('', 'Pest Repellent', data.pestRepellentTimeLeft);
        } else if (data.pestRepellentTimeLeft === 0 || data.pestRepellentTimeLeft < 0) {
            data.usedPestRepellent = false;
            showAlert(`&cPest Repellent &eExpired`)
            data.audioInst.playDefaultSound();
            ChatLib.chat(`&eYour &cPest Repellent Bonus Farming Fortune &ehas worn off!`);
            data.targetPestRepellent = 0;
            updateCDText('', 'Pest Repellent', data.pestRepellentTimeLeft);
        }

        data.pestRepellentText = data.usedPestRepellent ? `Pest Repellent [&c${data.pestRepelType}&r]: &bYES&r &7|&r &a${Math.floor(data.pestRepellentTimeLeft/60)}m ${Math.floor(data.pestRepellentTimeLeft % 60)}s&r` : `Pest Repellent: &bNO&r`;
    }

    // pest exchange timer
    if (Settings.pestExchangeDisplay) {
        if (!data.usedPestExchange) return;
        console.log(`data.pestExchangeTimeLeft val: ${data.harvPotTimeLeft}`)
        // data.pestExchangeTimeLeft = trackChatTimer(data.usedPestExchange, data.targetExchange, data.pestExchangeTimeLeft, 'Pest Exchange', '', data.audioInst);
        if (data.pestExchangeTimeLeft > 0) {
            data.usedPestExchange = true;
            data.pestExchangeTimeLeft -= 1;
            updateCDText('', 'Pest Exchange', data.pestExchangeTimeLeft);
        } else if (data.pestExchangeTimeLeft === 0 || data.pestExchangeTimeLeft < 0) {
            data.usedPestExchange = false;
            showAlert(`&cPest Exchange &eExpired`)
            data.audioInst.playDefaultSound();
            ChatLib.chat(`&eYour &cPest Exchange &ehas expired.`)
            data.targetPestRepellent = 0;
            updateCDText('', 'Pest Exchange', data.pestExchangeTimeLeft);
        }

        data.pestExchangeText = data.usedPestExchange ? `&2Pest Exchange: &r${Math.floor(data.pestExchangeTimeLeft / 60)}m ${Math.floor(data.pestExchangeTimeLeft % 60)}s &6(+${data.bonusFF === null || isNaN(data.bonusFF) ? 0 : data.bonusFF}☘ &7|&6 ${data.donatedPests === null || isNaN(data.donatedPests) ? 0 : data.donatedPests} Pests )` : '';
    }
}).setFps(1);



register('step', () => {
    if (!World.isLoaded()) return;
    if (data.currArea !== 'Garden') return;

    // player yaw and pitch
    if (Settings.showPlayerYawPitch) {
        playerYaw = Player.getYaw().toFixed(3);
        playerPitch = Player.getPitch().toFixed(3);
        data.playerYP = `Yaw: &b${playerYaw}\nPitch: &b${playerPitch}`
    }

    // pest death detection
    const scoreboardLines = Scoreboard.getLines();
    let loc_regex = /^⏣ The Garden ൠ x[1-9]|10$/
    let playerX = Player.getX();
    let playerZ = Player.getZ();
    data.plots.forEach(column => {
        column.forEach(plot => {
            if (plot.pest) {
                const locLine = scoreboardLines[5].toString();
                const [tlX, tlZ] = plot.tl;
                const [brX, brZ] = plot.br;
    
                if (!locLine.match(loc_regex) && tlX <= playerX && playerX <= brX && tlZ <= playerZ && playerZ <= brZ) {
                    plot.pest = false;
                }
            }
        });
    });

    // show sprayonator selected material and possible pests
    if (Settings.sprayonatorDisplay) {
        data.sprayMatText = data.selectedSprayMat ? `&rSprayonator: &a${data.selectedSprayMat}` : `&rSprayonator: &aCompost`
        data.possiblePests = data.selectedSprayMat ? `&rPossible Pests: &b${data.matAttracts[data.selectedSprayMat].join(', ')}` :  `&rPossible Pests: &bMosquito, Earthworm`;
        data.sprayOverlayText = `${data.sprayMatText}\n${data.possiblePests}`
    }

    // plot text
    if (Settings.gardenPlotMap) {
        data.plotMapText = '';
        for (let r = 0; r < data.plots.length; r++) {
            let row = '';
            for (let c = 0; c < data.plots[r].length; c++) {
                let plot = data.plots[r][c];
                let plotColor = colorPlot(plot);
                let coloredPlot = `${plotColor}█`
                row += coloredPlot;
            }
            data.plotMapText += row + '\n';
        }
    }
    
    // calculates the arrow's X and Y Position relative the to player's coordinates
    let offsetX = 4;
    let offsetY = 45;
    let arrowBaseX = data.gardenMap.x + offsetX
    let arrowBaseY = data.gardenMap.y + offsetY
    let normalizedX = (Player.getX() - (-240)) / (240 - (-240))
    let normalizedY = (Player.getZ() - (-240)) / (240 - (-240))
    data.plotArrow.x = arrowBaseX + normalizedX * (117 - 7)
    data.plotArrow.y = arrowBaseY + normalizedY * (185 - 75)

    // is contest:
    if (Settings.gardenContestOverlay) {
        checkTabContest = TabList.getNames()[76]
        data.isContest = checkTabContest && checkTabContest.includes('ACTIVE')
        data.contestText = data.isContest ? `Contest: &aYES` : `Contest: &cNO`
    }

    // vinyl selected
    if (Settings.vinylDisplay) {
        data.vinylText = data.isPlayingVinyl ? `Current Vinyl: &a${data.currentVinyl}𝅘𝅥𝅮𝅘𝅥𝅮` : `Current Vinyl: &c No Vinyl Playing`;
    }

}).setFps(5);


// render overlay
register('renderOverlay', () => {
    if (data.currArea !== 'Garden') return;
    const paddingText = (text) => {
        return (Renderer.screen.getWidth()) - 5 - Renderer.getStringWidth(text);
    }

    // yaw and pitch
    if (Settings.showPlayerYawPitch) {
        Renderer.drawStringWithShadow(data.playerYP, 5, 12) 
    }
    
    // Sprayonator selected material
    if (Settings.sprayonatorDisplay) {
        Renderer.drawStringWithShadow(data.sprayOverlayText, 5, 32)
    }

    // draws plot map
    // draws player arrow
    if (Settings.gardenPlotMap) {
        drawScaledString(data.plotMapText, data.gardenMap.x, data.gardenMap.y, 2)
        drawArrow(playerArrow, 0.8, Player.getYaw() + 180, data.plotArrow.x, data.plotArrow.y)
    }
    

    // draws harbringer potion timer -- 25 / 35
    if (Settings.harvPotionOverlay) {
        Renderer.drawStringWithShadow(data.harbringerText, paddingText(data.harbringerText), 60)
    }

    // draw contest
    if (Settings.gardenContestOverlay) {
        Renderer.drawStringWithShadow(data.contestText, paddingText(data.contestText), 10)
    }

    // draws pest repellent timer -- 60 minutes (pest repellent or pest repellent max)
    if (Settings.pestRepellentDisplay) {
        Renderer.drawStringWithShadow(data.pestRepellentText, paddingText(data.pestRepellentText), 20);
    }
    
    
    // draws vinyl display
    if (Settings.vinylDisplay) {
        Renderer.drawStringWithShadow(data.vinylText, paddingText(data.vinylText), 30);
    }

    // pest exchange text
    if (Settings.pestExchangeDisplay) {
        Renderer.drawStringWithShadow(data.pestExchangeText, paddingText(data.pestExchangeText), 40)
    }
})


////////////////////////////////////////////////////////////////////
// SHOW PEST ENTITY BOX (ESP)
////////////////////////////////////////////////////////////////////
register("renderWorld", () => {
    if (!data.inSkyblock) return;
    if (data.currArea !== 'Garden') return;
    if (!Settings.pestQOL) return;
    if (!Settings.pestEsp) return;
    World.getAllEntities().forEach(entity => {if (entity.getName().removeFormatting().includes("ൠ")) drawOutlineBeacon(entity.x, entity.y-0.65, entity.z, 'white', 1, false)})
})


////////////////////////////////////////////////////////////////////
// PEST DROP PINGS
////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (data.currArea !== 'Garden') return;
    if (!Settings.gardenRareDropPings) return;
    showAlert('&dBurrowing Spores')
    sendMessage('VERY RARE DROP! Burrowing Spores');
    data.audioInst.playDefaultSound();
}).setCriteria('VERY RARE CROP! Burrowing Spores');

register('chat', (ff, event) => {
    // RARE DROP! Atmospheric Filter (+4949☘)
    if (data.currArea !== 'Garden')return;
    if (!Settings.gardenRareDropPings) return;
    showAlert('&6Atmospheric Filter');
    sendMessage(`RARE DROP! Atmospheric Filter (+${ff}☘)`)
    playSound();
}).setCriteria('RARE DROP! Atmospheric Filter (+${ff}☘)');

register('chat', (ff, event) => {
    // RARE DROP! Pesterminator I Book (+4949☘)
    if (data.currArea !== 'Garden')return;
    if (!Settings.gardenRareDropPings) return;
    showAlert('&6Pesterminator I Book');
    sendMessage(`RARE DROP! Pesterminator I Book (+${ff}☘)`)
    playSound();
}).setCriteria('RARE DROP! Pesterminator I Book (+${ff}☘)');

////////////////////////////////////////////////////////////////////
// PET DROP PINGS
////////////////////////////////////////////////////////////////////
register('chat', (ff, event) => {
    // PET DROP! &5Rat&r (+1000☘)
    // PET DROP! &6Rat&r (+1000☘)
    if (data.currArea !== 'Garden') return;
    if (!Settings.gardenPetDropPings) return;
    const message = ChatLib.getChatMessage(event, true);
    petDropPing(message, 'PET DROP!', 'Rat', ff, data.audioInst)
}).setCriteria('PET DROP! Rat (+${ff}☘)');

register('chat', (ff, event) => {
    // PET DROP! &5Slug&r (+1000☘)
    // PET DROP! &6Slug&r (+1000☘)
    if (data.currArea !== 'Garden') return;
    if (!Settings.gardenPetDropPings) return;
    const message = ChatLib.getChatMessage(event, true);
    petDropPing(message, 'PET DROP!', 'Slug', ff, data.audioInst)
}).setCriteria('PET DROP! Slug (+${ff}☘)');

////////////////////////////////////////////////////////////////////
// DEBUGS
////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (data.currArea !== 'Garden') return;
    data.plots.forEach((row, i) => row.forEach((plot, j) => 
    // console.log("props: ", Object.getOwnPropertyNames(Object.getPrototypeOf(plot)))));
    console.log(`Plot ${i * row.length + j + 1}: Name: ${plot.name}, TL: [${plot.tl.join(', ')}], BR: [${plot.br.join(', ')}], Pest: ${plot.pest}, Spray: ${plot.spray}, Color: ${colorPlot(plot)}`)));
}).setCriteria('#plot').setContains();

register('chat', (event) => {
    for (let i = 0; i < data.playerPlotInfo.names.length; i++) {
        console.log(data.playerPlotInfo.names[i])
    }
}).setCriteria('#log playernames').setContains();

register('chat', (event) => {
    console.log(data.gardenPlot.coords)
}).setCriteria('#log gardennames').setContains();

register('chat', (event) => {
    console.log(data.plotSprayInfo.timers)
}).setCriteria('#log spraytimers').setContains();

register('chat', (event) => {
    console.log(data.pestPlotCoords); // List[str, str, ...]
}).setCriteria('#log pestplots').setContains();

register('chat', (event) => {
    console.log(data.sprayPlotCoords); // List[str, str, ...]
}).setCriteria('#log sprayplots').setContains();

register("guiClosed", () => {
    data.playerPlotInfo.configMsg = false;
});

// garden message hiders
register('chat', (event) => {
    if (Settings.betterGardenMessages) cancel(event);
}).setCriteria('WARNING! Blocks that you break on this plot will not drop items while using a custom preset!');

register('chat', (event) => {
    if (Settings.betterGardenMessages) cancel(event);
}).setCriteria('Remember, you have to be on the island for the resources to be planted!');

register('chat', (presetName, plotName, event) => {
    if (Settings.betterGardenMessages) {
        cancel(event);
        ChatLib.chat(`&6&lPASTING: &rUsing Preset &b&l[&r${presetName}&b&l]&r on Plot &b'&c${plotName}&b'&r!`)
    }
}).setCriteria('Started pasting ${presetName} preset on Garden Plot - ${plotName}!');


// mutes jacob contest messages if not on garden
register('chat', (event) => {
    if (data.currArea === 'Garden') return;
    cancel(event);
}).setCriteria('[NPC] Jacob: My contest has started!');

register('chat', (taliPhase, ff, crop, event) => {
    if (data.currArea === 'Garden') return;
    cancel(event);
}).setCriteria("[NPC] Jacob: Your Anita's ${taliPhase} is giving you +${ff}☘ {crop} Fortune during the contest!");
import Settings from '../settings.js'
import Audio from '../utils/audio.js'
import { data } from '../utils/data.js'
import { showAlert } from '../utils/utils.js'
import { getTabArea, drawOutlineBeacon, getCell, petDropPing, updateCDText, playSound } from '../utils/functions.js'
import { drawArrow, drawScaledString, updatePlots, colorPlot, startSprayTimer } from '../utils/functions.js'
import { sendMessage } from '../utils/party.js'
import { getActivePet } from '../utils/pet.js'

////////////////////////////////////////////////////////////////////
// SETUP        
////////////////////////////////////////////////////////////////////
const playerArrow = Image.Companion.fromFile(`config/ChatTriggers/modules/bao-dev/assets/delta-arrow.png`);

let currArea = '';
register('step', () => { if (!data.inSkyblock) return; currArea = getTabArea(); }).setFps(1);

const gardenAudio = new Audio();

const wKey = Client.getKeyBindFromDescription("key.forward")
const aKey = Client.getKeyBindFromDescription("key.left")
const sKey = Client.getKeyBindFromDescription("key.back")
const dKey = Client.getKeyBindFromDescription("key.right")

////////////////////////////////////////////////////////////////////
// Reminder for getting desk config
////////////////////////////////////////////////////////////////////
let sentDeskReminder = false;
register('step', () => {
    if (!World.isLoaded()) return;
    if (currArea !== 'Garden') return;
    if (sentDeskReminder) return;
    if (data.plots = []) {
        ChatLib.chat("&7[&3Bao&6] &7Hi! \n&7Just a reminder, to setup bao for the garden, click into the &e'Configure Plots'&7 window of your &e/desk&7 menu in the Garden. \n&7If you' received the chat message &b'Bao config saved'&7, the process has been completed.")
        sentDeskReminder = true;
        gardenAudio.playDefaultSound();
    }
}).setFps(1);


////////////////////////////////////////////////////////////////////
// SIMPLE REG CHATS
////////////////////////////////////////////////////////////////////
// alert message: You don't have any ${materialName}!
register('chat', (materialName, event) => {
    if (currArea !== 'Garden') return;
    if (Settings.alertNoMatSprayonator) {
        gardenAudio.playDefaultSound();
        showAlert(`&cNeed &e${materialName}&c!`)
    }
}).setCriteria("You don't have any ${materialName}!");

// selected mat for sprayonator
let sprayMat = '';
register('chat', (material, event) => {
    if (currArea !== 'Garden') return;
    cancel(event); // if  settings.garden_sprayonator_hider
    sprayMat = material;
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


// creating data for data.gardenPlotCoords
numRows = 5;
numCols = 5;
plotW = 96;

data.gardenPlotCoords = [];
for (let i = 0; i < numRows; i++) {
    let rowSet = [];
    for (let j = 0; j < numCols; j++) {
        let x1 = -240 + j * plotW;
        let x2 = -145 + j * plotW;

        let z1 = -240 + i * plotW;
        let z2 = -145 + i * plotW;
        
        let tl = [x1, z1];
        let br = [x2, z2];

        let submatrix = [tl, br]
        rowSet.push(submatrix);
    }
    data.gardenPlotCoords.push(rowSet);
}

// creating data for data.plotSprayTimers -- FOR RENDERING ONLY
data.plotSprayTimers = [];
timerOffsetX = 5.5;
timerOffsetY = 35;
timerDx = 18;
timerDy = 18;
for (let i=0; i <5; i++) {
    let timerRow = [];
    for (let j=0; j<5; j++) {
        let x1 = data.gardenMap.x + timerOffsetX + i * timerDx;
        let y1 = data.gardenMap.y + timerOffsetY + j * timerDy;
        let submatrix = [x1, y1];
        timerRow.push(submatrix);
    }
    // console.log(timerRow)
    data.plotSprayTimers.push(timerRow);
}


// creating data for data.playerPlotNames
let deskConfigMsg = false;
let numLoads = 6;
// data.playerPlotNames = [];
register('guiRender', () => {
    if (currArea !== 'Garden') return;
    if (deskConfigMsg) return;
    if (Player.getPlayer() === null || Player.getOpenedInventory() === null || Player.getContainer().getName() !== 'Configure Plots') return;

    let guiContainer = Player.getContainer();
    data.pestPlotCoords = [];
    data.sprayPlotCoords = [];
    data.plots = [];
    data.playerPlotNames = [];
    let numRows = 5;
    let numCols = 5;
    
    for (let i = 0; i < numRows; i++) {
        let row = [];
        for (let j = 0; j < numCols; j++) {
            let slotIdx = i * 9 + j + 2;
            let cellValue = getCell(guiContainer, slotIdx);
            row.push(cellValue);
        }
        // console.log(row);
        data.playerPlotNames.push(row.slice(0, 5));
    }
    
    let plotCols = 5;
    for (let r = 0; r < numRows; r++) {
        let playerRow = [];
        for (let c = 0; c < plotCols; c++) {
            let cellName = data.playerPlotNames[r][c];
            let timerDis = data.plotSprayTimers[c][r];
            let [tl, br] = data.gardenPlotCoords[r][c];
            let refCoords = [r, c]
            // console.log(cellName, tl, br, timerDis)
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

    numLoads -= 1;
    if (numLoads === 0) {
        ChatLib.chat('&6[&3Bao&6] &bDesk Config Saved.')
        deskConfigMsg = true;
    }
});


////////////////////////////////////////////////////////////////////
// PEST APPEARS REG CHAT
////////////////////////////////////////////////////////////////////
register('chat', (exclamation, userPlotName, event) => {
    if (currArea !== 'Garden') return;
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
    gardenAudio.playDefaultSound();
}).setCriteria('${exclamation}! A Pest has appeared in Plot - ${userPlotName}!');

register('chat', (exclamation, numPests, userPlotName, event) => {
    if (currArea !== 'Garden') return;
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
    gardenAudio.playDefaultSound();
}).setCriteria('${exclamation}! ${numPests} Pests have spawned in Plot - ${userPlotName}!');

////////////////////////////////////////////////////////////////////
// PLOT SPRAYED REG CHAT
////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (currArea !== 'Garden') return;
    if (Settings.hideSprayonatorExpiryMsg) cancel(event);
}).setCriteria('SPRAYONATOR! This will expire in 30m!');

register('chat', (userPlotName, mat, event) => {
    if (currArea !== 'Garden') return;
    // SPRAYONATOR! You sprayed Plot - melon 2 with Compost!
    updatePlots(data.plots, userPlotName, 'spray', false);
    updatePlots(data.plots, userPlotName, 'spray', true);
    updatePlots(data.plots, userPlotName, 'sprayDateEnd', new Date());
    if (Settings.gardenPlotMap) startSprayTimer(data.plots, userPlotName);
    gardenAudio.playProcSound();
}).setCriteria('SPRAYONATOR! You sprayed Plot - ${userPlotName} with ${mat}!');


////////////////////////////////////////////////////////////////////
// HARVEST HARBRINGER POTION CD TIMER
////////////////////////////////////////////////////////////////////
let harvPotTimeLeft = 0;
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.harvPotionOverlay) return;
    let harvPotCD = getActivePet().includes('Parrot') ? 35 : 25;
    data.usedHarvPot = true;
    const targetTime = new Date();
    targetTime.setMinutes(targetTime.getMinutes() + harvPotCD);
    harvPotTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.targetHarvPot = targetTime;
    gardenAudio.playDrinkSound();
}).setCriteria('BUFF! You have gained Harvest Harbinger V! Press TAB or type /effects to view your active effects!');

register('gameLoad', () => {
    if (!Settings.harvPotionOverlay) return;
    if (data.usedHarvPot) {
        harvPotTimeLeft = 0;
        const targetTime = new Date(data.targetHarvPot);
        harvPotTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    } else {
        harvPotTimeLeft = 0;
    }
})


////////////////////////////////////////////////////////////////////
// PEST REPELLENT TIMER
////////////////////////////////////////////////////////////////////

let is2x = false;
let is4x = false;
let pestRepelCD = 60; // 60 minutes
let pestRepellentTimeLeft = 0;
register('chat', (event) => {
    if (currArea !== 'Garden') return;
    if (!Settings.pestRepellentDisplay) return;
    is2x = true;
    gardenAudio.playDrinkSound();
    data.usedPestRepellent = true;
    const targetTime = new Date();
    targetTime.setMinutes(targetTime.getMinutes() + pestRepelCD);
    pestRepellentTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.targetPestRepellent = targetTime;
}).setCriteria('YUM! Pests will now spawn 2x less while you break crops for the next 60m!');


register('chat', (event) => {
    if (currArea !== 'Garden') return;
    if (!Settings.pestRepellentDisplay) return;
    is4x = true;
    gardenAudio.playDrinkSound();
    data.usedPestRepellent = true;
    const targetTime = new Date();
    targetTime.setMinutes(targetTime.getMinutes() + pestRepelCD);
    pestRepellentTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.targetPestRepellent = targetTime;
}).setCriteria('YUM! Pests will now spawn 4x less while you break crops for the next 60m!');

register('gameLoad', () => {
    if (!data.inSkyblock) return;
    if (!Settings.pestRepellentDisplay) return;
    if (data.usedPestRepellent) {
        pestRepellentTimeLeft = 0;
        const targetTime = new Date(data.targetPestRepellent);
        pestRepellentTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    } else {
        pestRepellentTimeLeft = 0;
    }
})


////////////////////////////////////////////////////////////////////
// VINYL SELECTOR CHAT REG
////////////////////////////////////////////////////////////////////
let vNames = ["Pretty Fly", "Cricket Choir", "Earthworm Ensemble", "Slow and Groovy", "Not Just a Pest", "Cicada Symphony", "DynaMITES", "Rodent Revolution", "Wings of Harmony", "Buzzin' Beats"] 
register('chat', (vinylName, event) => {
    if (currArea !== 'Garden') return;
    if (!Settings.vinylDisplay) return;
    if (!vNames.includes(vinylName)) return;
    data.isPlayingVinyl = false;
    data.currentVinyl = '&cNo Vinyl Playing';
}).setCriteria('You are no longer playing ${vinylName}!');

register('chat', (vinylName, event) => {
    if (currArea !== 'Garden') return;
    if (!Settings.vinylDisplay) return;
    if (!vNames.includes(vinylName)) return;
    data.isPlayingVinyl = true;
    data.currentVinyl = vinylName;
    gardenAudio.playDefaultSound();
}).setCriteria('You are now playing ${vinylName}!');


////////////////////////////////////////////////////////////////////
// PEST EXCHANGE 
////////////////////////////////////////////////////////////////////
const pestExCD = 30; // 30 minutes duration
let pestExTimeLeft = 0;
register('chat', (numPests, ff, event) => {
    if (currArea !== 'Garden') return;
    if (!Settings.pestExchangeDisplay) return;
    // [NPC] Phillip: In exchange for 1 Pest, I've given you +10☘ Farming Fortune for 30m!
    data.bonusFF = parseInt(ff.replace(',', ''), 10)
    data.donatedPests = parseInt(numPests.replace(',', ''), 10);

    gardenAudio.playDrinkSound();
    data.usedPestExchange = true;
    const targetTime = new Date();
    targetTime.setMinutes(targetTime.getMinutes() + pestExCD);
    pestExTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.targetExchange = targetTime;
}).setCriteria("[NPC] Phillip: In exchange for ${numPests} Pest, I've given you +${ff}☘ Farming Fortune for 30m!");

register('gameLoad', () => {
    if (!data.inSkyblock) return;
    if (!Settings.pestExchangeDisplay) return;
    if (data.usedPestExchange) {
        pestExTimeLeft = 0;
        const targetTime = new Date(data.targetExchange);
        pestExTimeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    } else {
        pestExTimeLeft = 0;
    }
})


////////////////////////////////////////////////////////////////////
// TIMER STEP TRIGGERS
////////////////////////////////////////////////////////////////////
let harbringerText = '';
let pestRepelText = '';
let pestExchangeText = '';
register('step', () => {
    if (currArea !== 'Garden') return;

    if (Settings.harvPotionOverlay) {
        if (data.usedHarvPot) {
            if (harvPotTimeLeft > 0) {
                data.usedHarvPot = true;
                harvPotTimeLeft -= 1;
                updateCDText('&6', 'Harbringer Potion', harvPotTimeLeft);
            } else if (harvPotTimeLeft === 0) {
                data.usedHarvPot = false;
                showAlert('&6Harbringer Pot expired');
                gardenAudio.playDefaultSound();
                ChatLib.chat('&cYour &6Harvest Harbringer Potion &chas expired.');
                data.targetHarvPot = 0;
                updateCDText('&6', 'Harbringer Potion', harvPotTimeLeft);
            }
        }
        harbringerText = harvPotTimeLeft > 0 ? `&6Harbringer Potion: &r${Math.floor(harvPotTimeLeft/60)}m ${Math.floor(harvPotTimeLeft % 60)}s&r` : '';
    }

    // pest repellent timer
    if (Settings.pestRepellentDisplay) {
        if (is2x) data.pestRepelType = '2x';
        if (is4x) data.pestRepelType = '4x';
        if (!data.usedPestRepellent) return;
        if (pestRepellentTimeLeft > 0) {
            data.usedPestRepellent = true;
            pestRepellentTimeLeft -= 1;
            updateCDText('', 'Pest Repellent', pestRepellentTimeLeft);
        } else if (pestRepellentTimeLeft === 0 || pestRepellentTimeLeft < 0) {
            data.usedPestRepellent = false;
            showAlert('&cPest Repellent &eexpired!');
            gardenAudio.playDefaultSound();
            ChatLib.chat(`&eYour &cPest Repellent &b[${data.pestRepelType}] &ehas expired.`);
            data.targetPestRepellent = 0;
            updateCDText('', 'Pest Repellent', pestRepellentTimeLeft);
        }
    
        pestRepelText = data.usedPestRepellent ? `Pest Repellent [&c${data.pestRepelType}&r]: &bYES&r &7|&r &a${Math.floor(pestRepellentTimeLeft/60)}m ${Math.floor(pestRepellentTimeLeft % 60)}s&r` : `Pest Repellent: &bNO&r`
    }

    // pest exchange timer
    if (Settings.pestExchangeDisplay) {
        if (!data.usedPestExchange) return;
        if (pestExTimeLeft > 0) {
            data.usedPestExchange = true;
            pestExTimeLeft -= 1;
            updateCDText('', 'Pest Exchange', pestExTimeLeft);
        } else if (pestExTimeLeft === 0 || pestExTimeLeft < 0) {
            data.usedPestExchange = false;
            showAlert('&cPest Exchange &rexpired!');
            gardenAudio.playDefaultSound();
            ChatLib.chat(`&eYour &cPest Exchange Bonus Farming Fortune &ehas worn off!`);
            data.targetExchange = 0;
            updateCDText('', 'Pest Exchange', pestExTimeLeft);
        }
        pestExchangeText = data.usedPestExchange ? `&2Pest Exchange: &r${Math.floor(pestExTimeLeft / 60)}m ${Math.floor(pestExTimeLeft % 60)}s &6(+${data.bonusFF === null || isNaN(data.bonusFF) ? 0 : data.bonusFF}☘ &7|&6 ${data.donatedPests === null || isNaN(data.donatedPests) ? 0 : data.donatedPests} Pests )` : ''
    }
}).setFps(1);



let playerYP = '';
let currentGardenPlot = [];
let sprayMatText = '';
let possiblePests = '';
let sprayOverlayText = '';
let plotMapText = '';
let arrowX = 0;
let arrowY = 0;
let contestText = '';
let vinylText = '';
register('step', () => {
    if (!World.isLoaded()) return;
    if (currArea !== 'Garden') return;

    // player yaw and pitch
    if (Settings.showPlayerYawPitch) {
        playerYaw = Player.getYaw().toFixed(3);
        playerPitch = Player.getPitch().toFixed(3);
        playerYP = `Yaw: &b${playerYaw}\nPitch: &b${playerPitch}`
    }

    // player coords for garden plot coords
    playerX = Player.getX();
    playerZ = Player.getZ();
    for (let rowIdx = 0; rowIdx < data.gardenPlotCoords.length; rowIdx++) {
        for (let colIdx = 0; colIdx < data.gardenPlotCoords[rowIdx].length; colIdx++) {
            let plotCoords = data.gardenPlotCoords[rowIdx][colIdx];
            let [x1, z1] = plotCoords[0];
            let [x2, z2] = plotCoords[1];
  
            if (playerX >= x1 && playerX <= x2 && playerZ >= z1 && playerZ <= z2) {
                currentGardenPlot = [rowIdx, colIdx]
            }
        }
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
        sprayMatText = sprayMat ? `&rSprayonator: &a${sprayMat}` : `&rSprayonator: &aCompost`
        possiblePests = sprayMat ? `&rPossible Pests: &b${data.matAttracts[sprayMat].join(', ')}` :  `&rPossible Pests: &bMosquito, Earthworm`;
        sprayOverlayText = `${sprayMatText}\n${possiblePests}`
    }

    // plot text
    if (Settings.gardenPlotMap) {
        plotMapText = '';
        for (let r = 0; r < data.plots.length; r++) {
            let row = '';
            for (let c = 0; c < data.plots[r].length; c++) {
                let plot = data.plots[r][c];
                let plotColor = colorPlot(plot);
                let coloredPlot = `${plotColor}█`
                console.log(coloredPlot)
                row += coloredPlot;
            }
            plotMapText += row + '\n';
        }
    }
    
    // calculates the arrow's X and Y Position relative the to player's coordinates
    let offsetX = 4;
    let offsetY = 45;
    let arrowBaseX = data.gardenMap.x + offsetX
    let arrowBaseY = data.gardenMap.y + offsetY
    let normalizedX = (Player.getX() - (-240)) / (240 - (-240))
    let normalizedY = (Player.getZ() - (-240)) / (240 - (-240))
    arrowX = arrowBaseX + normalizedX * (117 - 7)
    arrowY = arrowBaseY + normalizedY * (185 - 75)

    // is contest:
    if (Settings.gardenContestOverlay) {
        checkTabContest = TabList.getNames()[76]
        data.isContest = checkTabContest && checkTabContest.includes('ACTIVE')
        contestText = data.isContest ? `Contest: &aYES` : `Contest: &cNO`
    }

    // vinyl selected
    if (Settings.vinylDisplay) {
        vinylText = data.isPlayingVinyl ? `Current Vinyl: &a${data.currentVinyl}𝅘𝅥𝅮𝅘𝅥𝅮` : `Current Vinyl: &c No Vinyl Playing`;
    }

}).setFps(5);


// render overlay
register('renderOverlay', () => {
    if (currArea !== 'Garden') return;
    let screenW = Renderer.screen.getWidth();
    const paddingText = (text) => {
        return screenW - 5 - Renderer.getStringWidth(text);
    }

    // yaw and pitch
    if (Settings.showPlayerYawPitch) {
        Renderer.drawStringWithShadow(playerYP, 5, 12) 
    }
    
    // Sprayonator selected material
    if (Settings.sprayonatorDisplay) {
        Renderer.drawStringWithShadow(sprayOverlayText, 5, 32)
    }

    // draws plot map
    // draws player arrow
    if (Settings.gardenPlotMap) {
        drawScaledString(plotMapText, data.gardenMap.x, data.gardenMap.y, 2)
        drawArrow(playerArrow, 0.8, Player.getYaw() + 180, arrowX, arrowY)
    }
    

    // draws harbringer potion timer -- 25 / 35
    if (Settings.harvPotionOverlay) {
        Renderer.drawStringWithShadow(harbringerText, paddingText(harbringerText), 60)
    }

    // draw contest
    if (Settings.gardenContestOverlay) {
        Renderer.drawStringWithShadow(contestText, paddingText(contestText), 10)
    }

    // draws pest repellent timer -- 60 minutes (pest repellent or pest repellent max)
    if (Settings.pestRepellentDisplay) {
        Renderer.drawStringWithShadow(pestRepelText, paddingText(pestRepelText), 20);
    }
    
    
    // draws vinyl display
    if (Settings.vinylDisplay) {
        Renderer.drawStringWithShadow(vinylText, paddingText(vinylText), 30);
    }

    // pest exchange text
    if (Settings.pestExchangeDisplay) {
        Renderer.drawStringWithShadow(pestExchangeText, paddingText(pestExchangeText), 40)
    }
})


////////////////////////////////////////////////////////////////////
// SHOW PEST ENTITY BOX (ESP)
////////////////////////////////////////////////////////////////////
register("renderWorld", () => {
    if (!data.inSkyblock) return;
    if (currArea !== 'Garden') return;
    if (!Settings.pestQOL) return;
    if (!Settings.pestEsp) return;
    World.getAllEntities().forEach(entity => {if (entity.getName().removeFormatting().includes("ൠ")) drawOutlineBeacon(entity.x, entity.y-0.65, entity.z, 'white', 1, false)})
})


////////////////////////////////////////////////////////////////////
// PEST DROP PINGS
////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (currArea !== 'Garden') return;
    if (!Settings.gardenRareDropPings) return;
    showAlert('&dBurrowing Spores')
    sendMessage('VERY RARE DROP! Burrowing Spores');
    gardenAudio.playDefaultSound();
}).setCriteria('VERY RARE CROP! Burrowing Spores');

register('chat', (ff, event) => {
    // RARE DROP! Atmospheric Filter (+4949☘)
    if (currArea !== 'Garden')return;
    if (!Settings.gardenRareDropPings) return;
    showAlert('&6Atmospheric Filter');
    sendMessage(`RARE DROP! Atmospheric Filter (+${ff}☘)`)
    playSound();
}).setCriteria('RARE DROP! Atmospheric Filter (+${ff}☘)');

register('chat', (ff, event) => {
    // RARE DROP! Pesterminator I Book (+4949☘)
    if (currArea !== 'Garden')return;
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
    if (currArea !== 'Garden') return;
    if (!Settings.gardenPetDropPings) return;
    const message = ChatLib.getChatMessage(event, true);
    console.log(message);
    petDropPing(message, 'PET DROP!', 'Rat', ff, gardenAudio)
}).setCriteria('PET DROP! Rat (+${ff}☘)');

register('chat', (ff, event) => {
    // PET DROP! &5Slug&r (+1000☘)
    // PET DROP! &6Slug&r (+1000☘)
    if (currArea !== 'Garden') return;
    if (!Settings.gardenPetDropPings) return;
    const message = ChatLib.getChatMessage(event, true);
    console.log(message);
    petDropPing(message, 'PET DROP!', 'Slug', ff, gardenAudio)
}).setCriteria('PET DROP! Slug (+${ff}☘)');

////////////////////////////////////////////////////////////////////
// DEBUGS
////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (currArea !== 'Garden') return;
    data.plots.forEach((row, i) => row.forEach((plot, j) => 
    // console.log("props: ", Object.getOwnPropertyNames(Object.getPrototypeOf(plot)))));
    console.log(`Plot ${i * row.length + j + 1}: Name: ${plot.name}, TL: [${plot.tl.join(', ')}], BR: [${plot.br.join(', ')}], Pest: ${plot.pest}, Spray: ${plot.spray}, Color: ${colorPlot(plot)}`)));
}).setCriteria('#plot').setContains();

register('chat', (event) => {
    for (let i = 0; i < data.playerPlotNames.length; i++) {
        console.log(data.playerPlotNames[i])
    }
}).setCriteria('#log playernames').setContains();

register('chat', (event) => {
    console.log(data.gardenPlotCoords)
}).setCriteria('#log gardennames').setContains();

register('chat', (event) => {
    console.log(data.plotSprayTimers)
}).setCriteria('#log spraytimers').setContains();

register('chat', (event) => {
    console.log(data.pestPlotCoords); // List[str, str, ...]
}).setCriteria('#log pestplots').setContains();

register('chat', (event) => {
    console.log(data.sprayPlotCoords); // List[str, str, ...]
}).setCriteria('#log sprayplots').setContains();

register("guiClosed", () => {
    deskConfigMsg = false;
});
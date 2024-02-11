import Settings from '../settings.js';
import Audio from '../utils/audio.js';

import { colorPlot, drawArrow, drawOutlineBeacon, drawScaledString, getCell, petDropPing, playSound, startSprayTimer, updatePlots } from '../utils/functions.js'
import { sendMessage } from '../utils/party.js'
import { getActivePet } from '../utils/pet.js'
import { showAlert, registerWhen } from '../utils/utils.js'
import { baoUtils } from '../utils/utils.js';
import { updateCDText, setTimer } from '../utils/functions.js'
import { getInSkyblock } from '../utils/functions.js'; // sb, area
import { createGuiCommand, renderGuiPosition } from '../utils/functions.js'; // gui
import { constrainX, constrainY } from '../utils/functions.js' // padding
import { getInGarden } from '../utils/functions.js';

////////////////////////////////////////////////////////////////////////////////
// CONSTS 
////////////////////////////////////////////////////////////////////////////////
const playerArrowImg = Image.Companion.fromFile(`config/ChatTriggers/modules/bao-dev/assets/delta-arrow.png`);
const gardenAudio = new Audio();
let playerYaw = 0;
let playerPitch = 0;
let lookingAtText = '';

let isInContest = false;
let contestText = '';

const matAttracts =  {
    "Dung": ["Fly", "Beetle"], 
    "Honey Jar": ["Cricket", "Moth"], 
    "Plant Matter": ["Locust", "Slug"], 
    "Tasty Cheese": ["Rat", "Mite"], 
    "Compost": ["Mosquito", "Earthworm"]
};

const allVinylNames = ["Pretty Fly", "Cricket Choir", "Earthworm Ensemble", "Slow and Groovy", "Not Just a Pest", "Cicada Symphony", "DynaMITES", "Rodent Revolution", "Wings of Harmony", "Buzzin' Beats"];

const paddingText = (text) => {
    return baoUtils.screenW - 5 - Renderer.getStringWidth(text);
}

let sentReminder = false;
export const baoGardens = {
    "arrow": {
        "x": 0, 
        "y": 0,
    }, 
    "playerInfo": {
        "x": 5, 
        "y": 12, 
    },

    // contest
    "contestInfo": {
        "x": 600, // arbituary random number, replaced by padding function 
        "y": 10,
    }, 

    // sprayonator overlay
    "sprayonatorOverlay": {
        "x": 5, 
        "y": 32, 
        "displayText": '', 
        "possiblePests": '', 
        "materialText": '', 
        "selectedSprayMaterial": '',
    }, 

    // vinyls
    "vinylInfo": {
        "isPlaying": false, 
        "currentVinyl": '', 
        "displayText": '',
        "x": 5, 
        "y": 50, 
    }, 

    // plots
    "plots": [],
    "plotMapText": '',
    "gardenPlotMap": {
        "ox": 4, 
        "oy": 45,
        "x": 3, 
        "y": 30
    },  

    // plots - player
    "playerPlotInfo": {
        "names": [], 
        "configMsg": false, 
        "numLoads": 6,
        "rows": 5,
        "cols": 5,
    },

    // plots - default garden
    "gardenPlot": {
        "coords": [], 
        "rows": 5, 
        "cols": 5, 
        "plotW": 96,
    }, 

    // plots - sprayed
    "sprayPlotCoords": [],
    "plotSprayInfo": {
        "timers": [], 
        "offsetX": 5.5, 
        "offsetY": 35, 
        "dx": 18, 
        "dy": 18, 
        "cols": 5, 
        "rows": 5,
    },
    
    // plots - pest infected
    "pestPlotCoords": [], 


    // harbringer potion
    "harbringer": {
        "cd": 0,
        "used": false, 
        "target": null, 
        "timeLeft": 0, 
        "text": '',
        "x": 600, // arbituary random number, replaced by padding function 
        "y": 20, 
    }, 

    // pest repellent
    "pestRepellent": {
        "cd": 60, 
        "used": false, 
        "is2x": false, 
        "is4x": false, 
        "type": '', 
        "target": null, 
        "timeLeft": 0, 
        "text": '',
        "x": 600, // arbituary random number, replaced by padding function 
        "y": 30, 
    }, 

    // pest exchange
    "pestExchange": {
        "cd": 0,
        "used": false, 
        "target": null, 
        "timeLeft": 0,
        "text": '', 
        "bonusFF": 0, 
        "donatedPests": 0,
        "x": 600, // arbituary random number, replaced by padding function 
        "y": 40,
    },
};

////////////////////////////////////////////////////////////////////
// CLASS OF PLOTS
////////////////////////////////////////////////////////////////////
class Plot {
    constructor(plotName, refCoords, tl, br, sprayDisPos) {
        this.plotName = plotName;
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


////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function shouldHandleGardenRegs() {
    return getInGarden() && getInSkyblock() && World.isLoaded();
}


////////////////////////////////////////////////////////////////////////////////
// DESK CONFIG REMINDER FOR PLOT MAP
////////////////////////////////////////////////////////////////////////////////
register('step', () => {
    if (!getInGarden()) return;
    if (sentReminder) return;
    if (baoGardens.plots = []) {
        gardenAudio.playDefaultSound();
        ChatLib.chat("&7[&3Bao&6] &7Hi! \n&7Just a reminder, to setup bao for the garden, click into the &e'Configure Plots'&7 window of your &e/desk&7 menu in the Garden.\n&7If you' received the chat message &b'Bao config saved'&7, the process has been completed.")
        sentReminder = true;
    };
}).setFps(1);


////////////////////////////////////////////////////////////////////////////////
// REG: Out of Materials for Sprayonator
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (materialName, event) => {
    gardenAudio.playDefaultSound();
    showAlert(`&cNeed &e${materialName}&c!`)
}, () => Settings.alertNoMatSprayonator && shouldHandleGardenRegs()).setCriteria("You don't have any ${materialName}!");


////////////////////////////////////////////////////////////////////////////////
// REG: Selected Material for Sprayonator
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (material, event) => {
    cancel(event);
    baoGardens.sprayonatorOverlay.selectedSprayMaterial = material;
}, () => Settings.hideSelSprayMatMsg && shouldHandleGardenRegs()).setCriteria('SPRAYONATOR! Your selected material is now ${material}!');



////////////////////////////////////////////////////////////////////////////////
// CREATING DEFAULT GARDEN COORDS
////////////////////////////////////////////////////////////////////////////////
baoGardens.gardenPlot.coords = [];
for (let i = 0; i < baoGardens.gardenPlot.rows; i++) {
    let rowSet = [];
    for (let j = 0; j < baoGardens.gardenPlot.cols; j++) {
        let x1 = -240 + j * baoGardens.gardenPlot.plotW;
        let x2 = -145 + j * baoGardens.gardenPlot.plotW;

        let z1 = -240 + i * baoGardens.gardenPlot.plotW;
        let z2 = -145 + i * baoGardens.gardenPlot.plotW;
        
        let tl = [x1, z1];
        let br = [x2, z2];

        let submatrix = [tl, br]
        rowSet.push(submatrix);
    }
    baoGardens.gardenPlot.coords.push(rowSet);
}


////////////////////////////////////////////////////////////////////////////////
// CREATING DATA FOR TIMERS X AND Y FOR RENDERING
////////////////////////////////////////////////////////////////////////////////
baoGardens.plotSprayInfo.timers = [];
for (let i=0; i <5; i++) {
    let timerRow = [];
    for (let j=0; j<5; j++) {
        let x1 = baoGardens.gardenPlotMap.x + baoGardens.plotSprayInfo.offsetX + i * baoGardens.plotSprayInfo.dx;
        let y1 = baoGardens.gardenPlotMap.y + baoGardens.plotSprayInfo.offsetY + j * baoGardens.plotSprayInfo.dy;
        let submatrix = [x1, y1];
        timerRow.push(submatrix);
    }
    // console.log(timerRow)
    baoGardens.plotSprayInfo.timers.push(timerRow);
}


////////////////////////////////////////////////////////////////////////////////
// GETTING DATA OF PLAYER'S PLOT NAMES FROM DESK CONFIG GUI
////////////////////////////////////////////////////////////////////////////////
register('guiRender', () => {
    if (!getInGarden()) return;
    if (baoGardens.playerPlotInfo.configMsg) return;
    if (Player.getPlayer() === null || Player.getOpenedInventory() === null || Player.getContainer().getName() !== 'Configure Plots') return;

    let guiContainer = Player.getContainer();
    baoGardens.pestPlotCoords = [];
    baoGardens.sprayPlotCoords = [];
    baoGardens.plots = [];
    baoGardens.playerPlotInfo.names = [];
    
    for (let i = 0; i < baoGardens.playerPlotInfo.rows; i++) {
        let row = [];
        for (let j = 0; j < baoGardens.playerPlotInfo.cols; j++) {
            let slotIdx = i * 9 + j + 2;
            let cellValue = getCell(guiContainer, slotIdx);
            row.push(cellValue);
        }
        baoGardens.playerPlotInfo.names.push(row.slice(0, 5));
    }
    
    for (let r = 0; r < baoGardens.playerPlotInfo.rows; r++) {
        let playerRow = [];
        for (let c = 0; c < baoGardens.playerPlotInfo.cols; c++) {
            let cellName = baoGardens.playerPlotInfo.names[r][c];
            let timerDis = baoGardens.plotSprayInfo.timers[c][r];
            let [tl, br] = baoGardens.gardenPlot.coords[r][c];
            let refCoords = [r, c]
            let plot = new Plot(plotName=cellName, refCoords=refCoords, tl=tl, br=br, sprayDisPos=timerDis, pest=false, spray=false);
            playerRow.push(plot)
        }
        baoGardens.plots.push(playerRow)
    }

    baoGardens.playerPlotInfo.numLoads -= 1;
    if (baoGardens.playerPlotInfo.numLoads === 0) {
        ChatLib.chat('&6[&3Bao&6] &bDesk Config Saved.')
        baoGardens.playerPlotInfo.configMsg = true;
    }
    // baoGardens.save();
});


register("guiClosed", () => {
    baoGardens.playerPlotInfo.configMsg = false;
});


////////////////////////////////////////////////////////////////////////////////
// REG: PEST APPEARED IN PLOT MESSAGE
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (exclamation, userPlotName, event) => {
    updatePlots(baoGardens.plots, userPlotName, 'pest', true);
    if (Settings.titlePestAlert) showAlert(`&c1 &rPest!`);
    if (Settings.autoSHPest) {
        setTimeout(() => {
            ChatLib.command('sethome')
            if (Settings.autoWarpPest && !isInContest) {
                setTimeout(() => {
                    ChatLib.command(`tptoplot ${userPlotName}`)
                }, 300)
            };
        }, 200)
    };
    gardenAudio.playDefaultSound();
}, () => Settings.pestQOL && shouldHandleGardenRegs()).setCriteria('${exclamation}! A Pest has appeared in Plot - ${userPlotName}!');

registerWhen('chat', (exclamation, numPests, userPlotName, event) => {
    updatePlots(baoGardens.plots, userPlotName, 'pest', true);
    if (Settings.titlePestAlert) showAlert(`&b${numPests} &rpests!`);
    if (Settings.autoSHPest) {
        setTimeout(() => {
            ChatLib.command('sethome')
            if (Settings.autoWarpPest && !isInContest) {
                setTimeout(() => {
                    ChatLib.command(`tptoplot ${userPlotName}`)
                }, 300)
            };
        }, 200)
    };
    gardenAudio.playDefaultSound();
}, () => Settings.pestQOL && shouldHandleGardenRegs()).setCriteria('${exclamation}! ${numPests} Pests have spawned in Plot - ${userPlotName}!');


////////////////////////////////////////////////////////////////////////////////
// REG: PLOT SPRAYED MESSAGE
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    cancel(event);
}, () => Settings.hideSprayonatorExpiryMsg && shouldHandleGardenRegs()).setCriteria('SPRAYONATOR! This will expire in 30m!');

registerWhen('chat', (userPlotName, mat, event) => {
    // SPRAYONATOR! You sprayed Plot - melon 2 with Compost!
    updatePlots(baoGardens.plots, userPlotName, 'spray', false);
    updatePlots(baoGardens.plots, userPlotName, 'spray', true);
    updatePlots(baoGardens.plots, userPlotName, 'sprayDateEnd', new Date());
    if (Settings.gardenPlotMap) startSprayTimer(baoGardens.plots, userPlotName);
    gardenAudio.playProcSound();
}, () => shouldHandleGardenRegs()).setCriteria('SPRAYONATOR! You sprayed Plot - ${userPlotName} with ${mat}!');


////////////////////////////////////////////////////////////////////////////////
// REG: VINYL SELECTED MESSAGES
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (vinylName, event) => {
    baoGardens.vinylInfo.isPlaying = false;
    baoGardens.vinylInfo.currentVinyl = '&cNo Vinyl Playing';
}, () => Settings.vinylDisplay && getInGarden() && allVinylNames.includes(vinylName) && getInSkyblock() && World.isLoaded()).setCriteria('You are no longer playing ${vinylName}!');

registerWhen('chat', (vinylName, event) => {
    baoGardens.vinylInfo.isPlaying = true;
    baoGardens.vinylInfo.currentVinyl = vinylName;
    gardenAudio.playDefaultSound();
}, () => Settings.vinylDisplay && getInGarden() && allVinylNames.includes(vinylName) && getInSkyblock() && World.isLoaded()).setCriteria('You are now playing ${vinylName}!');


////////////////////////////////////////////////////////////////////////////////
// REG: HARVEST HARBRINGER POTION TIMER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    baoGardens.harbringer.cd = getActivePet().includes('Parrot') ? 35 : 25;
    gardenAudio.playDrinkSound();
    setTimer(baoGardens.harbringer);
}, () => Settings.harvPotionOverlay && shouldHandleGardenRegs()).setCriteria('BUFF! You have gained Harvest Harbinger V! Press TAB or type /effects to view your active effects!');


////////////////////////////////////////////////////////////////////////////////
// REG: PEST REPELLENT TIMER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (typeOfPestRepellent, event) => {
    if (typeOfPestRepellent === '2x') baoGardens.pestRepellent.is2x = true; 
    if (typeOfPestRepellent === '4x') baoGardens.pestRepellent.is4x = true; 
    baoGardens.pestRepellent.is2x = typeOfPestRepellent === '2';
    baoGardens.pestRepellent.is4x = typeOfPestRepellent === '4';
    gardenAudio.playDrinkSound();
    setTimer(baoGardens.pestRepellent);
}, () => Settings.pestRepellentDisplay && shouldHandleGardenRegs()).setCriteria('YUM! Pests will now spawn ${typeOfPestRepellent}x less while you break crops for the next 60m!');


////////////////////////////////////////////////////////////////////////////////
// REG: PEST EXCHANGE TIMER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (numPests, ff, duration, event) => {
    // [NPC] Phillip: In exchange for 1 Pest, I've given you +10☘ Farming Fortune for 30m!
    baoGardens.pestExchange.bonusFF = parseInt(ff.replace(',', ''), 10)
    baoGardens.pestExchange.donatedPests = parseInt(numPests.replace(',', ''), 10);
    baoGardens.pestExchange.cd = parseInt(duration.replace(',', ''), 10);
    gardenAudio.playDrinkSound();
    setTimer(baoGardens.pestExchange);
}, () => Settings.pestExchangeDisplay && shouldHandleGardenRegs()).setCriteria("[NPC] Phillip: In exchange for ${numPests} Pest, I've given you +${ff}☘ Farming Fortune for ${duration}m!");


////////////////////////////////////////////////////////////////////////////////
// REG: GAMELOAD
////////////////////////////////////////////////////////////////////////////////
register('gameLoad', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.harvPotionOverlay) return;
    if (!Settings.pestRepellentDisplay) return;
    if (!Settings.pestExchangeDisplay) return;

    // harbringer
    if (baoGardens.harbringer.used) {
        const targetTime = new Date(baoGardens.harbringer.target);
        baoGardens.harbringer.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    } else {
        baoGardens.harbringer.timeLeft = 0;
    }

    // pestRepellent
    if (baoGardens.pestRepellent.used) {
        const targetTime = new Date(baoGardens.pestRepellent.target);
        baoGardens.pestRepellent.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    } else {
        baoGardens.pestRepellent.timeLeft = 0;
    }

    // pestExchange
    if (baoGardens.pestExchange.used) {
        const targetTime = new Date(baoGardens.pestExchange.target);
        baoGardens.pestRepellent.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    } else {
        baoGardens.pestRepellent.timeLeft = 0;
    }
    // baoGardens.save();
});


////////////////////////////////////////////////////////////////////////////////
// REG: STEP - TIMERS
////////////////////////////////////////////////////////////////////////////////
register('step', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!getInGarden()) return;

    if (Settings.harvPotionOverlay && baoGardens.harbringer.used) {
        if (baoGardens.harbringer.timeLeft > 0) {
            baoGardens.harbringer.used = true;
            baoGardens.harbringer.timeLeft -= 1;
            updateCDText('&6', 'Harbringer Potion', baoGardens.harbringer.timeLeft);
        } else if (baoGardens.harbringer.timeLeft === 0 || baoGardens.harbringer.timeLeft < 0) {
            baoGardens.harbringer.used = false;
            showAlert(`&cHarbringer Potion &eExpired`)
            gardenAudio.playDefaultSound();
            ChatLib.chat(`&eYour &cHarbringer Potion &ehas expired.`)
            baoGardens.harbringer.target = 0;
            updateCDText('&6', 'Harbringer Potion', baoGardens.harbringer.timeLeft);
        }
        baoGardens.harbringer.text = baoGardens.harbringer.timeLeft > 0 ? `&6Harbringer Potion: &r${Math.floor(baoGardens.harbringer.timeLeft/60)}m ${Math.floor(baoGardens.harbringer.timeLeft % 60)}s&r` : '';
    }

    // pest repellent timer
    if (Settings.pestRepellentDisplay && baoGardens.pestRepellent.used) {
        if (baoGardens.pestRepellent.is2x) baoGardens.pestRepellent.type = '2x';
        if (baoGardens.pestRepellent.is4x) baoGardens.pestRepellent.type = '4x';

        if (baoGardens.pestRepellent.timeLeft > 0) {
            baoGardens.pestRepellent.used = true;
            baoGardens.pestRepellent.timeLeft -= 1;
            updateCDText('', 'Pest Repellent', baoGardens.pestRepellent.timeLeft);
        } else if (baoGardens.pestRepellent.timeLeft === 0 || baoGardens.pestRepellent.timeLeft < 0) {
            baoGardens.pestRepellent.used = false;
            showAlert(`&cPest Repellent &eExpired`)
            gardenAudio.playDefaultSound();
            ChatLib.chat(`&eYour &cPest Repellent Bonus Farming Fortune &ehas worn off!`);
            baoGardens.pestRepellent.target = 0;
            updateCDText('', 'Pest Repellent', baoGardens.pestRepellent.timeLeft);
        }

        baoGardens.pestRepellent.text = baoGardens.pestRepellent.used ? ` &aPest Repellent [&c${baoGardens.pestRepellent.type}&r]: &bYES&r &7|&r &a${Math.floor(baoGardens.pestRepellent.timeLeft/60)}m ${Math.floor(baoGardens.pestRepellent.timeLeft % 60)}s&r` : `&aPest Repellent: &bNO&r`;
    }

    // pest exchange timer
    if (Settings.pestExchangeDisplay && baoGardens.pestExchange.used) {
        if (baoGardens.pestExchange.timeLeft > 0) {
            baoGardens.pestExchange.used = true;
            baoGardens.pestExchange.timeLeft -= 1;
            updateCDText('', 'Pest Exchange', baoGardens.pestExchange.timeLeft);
        } else if (baoGardens.pestExchange.timeLeft === 0 || baoGardens.pestExchange.timeLeft < 0) {
            baoGardens.pestExchange.used = false;
            showAlert(`&cPest Exchange &eExpired`)
            gardenAudio.playDefaultSound();
            ChatLib.chat(`&eYour &cPest Exchange &ehas expired.`)
            baoGardens.targetPestExchange = 0;
            updateCDText('', 'Pest Exchange', baoGardens.pestExchange.timeLeft);
        }

        baoGardens.pestExchange.text = baoGardens.pestExchange.used ? `&2Pest Exchange: &r${Math.floor(baoGardens.pestExchange.timeLeft / 60)}m ${Math.floor(baoGardens.pestExchange.timeLeft % 60)}s &6(+${baoGardens.pestExchange.bonusFF === null || isNaN(baoGardens.pestExchange.bonusFF) ? 0 : baoGardens.pestExchange.bonusFF}☘ &7|&6 ${baoGardens.pestExchange.donatedPests === null || isNaN(baoGardens.pestExchange.donatedPests) ? 0 : baoGardens.pestExchange.donatedPests} Pests )` : '';
    }
    // baoGardens.save();
}).setFps(1);


////////////////////////////////////////////////////////////////////////////////
// REG: STEP - OTHERS
////////////////////////////////////////////////////////////////////////////////
register('step', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!getInGarden()) return;

    // player yaw and pitch
    if (Settings.showPlayerYawPitch) {
        playerYaw = Player.getYaw().toFixed(3);
        playerPitch = Player.getPitch().toFixed(3);
        lookingAtText = `Yaw: &b${playerYaw}\nPitch: &b${playerPitch}`
    }

    // pest death detection
    let scoreboardLines = Scoreboard.getLines();
    const loc_regex = /^⏣ The Garden ൠ x[1-9]|10$/
    let playerX = Player.getX();
    let playerZ = Player.getZ();
    baoGardens.plots.forEach(column => {
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
        baoGardens.sprayonatorOverlay.materialText = baoGardens.sprayonatorOverlay.selectedSprayMaterial ? `&rSprayonator: &a${baoGardens.sprayonatorOverlay.selectedSprayMaterial}` : `&rSprayonator: &aCompost`
        baoGardens.sprayonatorOverlay.possiblePests = baoGardens.sprayonatorOverlay.selectedSprayMaterial ? `&rPossible Pests: &b${matAttracts[baoGardens.sprayonatorOverlay.selectedSprayMaterial].join(', ')}` :  `&rPossible Pests: &bMosquito, Earthworm`;
        baoGardens.sprayonatorOverlay.displayText = `${baoGardens.sprayonatorOverlay.materialText}\n${baoGardens.sprayonatorOverlay.possiblePests}`
    }

    // plot text
    if (Settings.gardenPlotMap) {
        baoGardens.plotMapText = '';
        for (let r = 0; r < baoGardens.plots.length; r++) {
            let row = '';
            for (let c = 0; c < baoGardens.plots[r].length; c++) {
                let plot = baoGardens.plots[r][c];
                let plotColor = colorPlot(plot);
                let coloredPlot = `${plotColor}█`
                row += coloredPlot;
            }
            baoGardens.plotMapText += row + '\n';
        }
    }
    
    // calculates the arrow's X and Y Position relative the to player's coordinates
    let arrowBaseX = baoGardens.gardenPlotMap.x + baoGardens.gardenPlotMap.ox;
    let arrowBaseY = baoGardens.gardenPlotMap.y + baoGardens.gardenPlotMap.oy
    let normalizedX = (Player.getX() - (-240)) / (240 - (-240))
    let normalizedY = (Player.getZ() - (-240)) / (240 - (-240))
    baoGardens.arrow.x = arrowBaseX + normalizedX * (117 - 7)
    baoGardens.arrow.y = arrowBaseY + normalizedY * (185 - 75)

    // is contest:
    if (Settings.gardenContestOverlay) {
        let checkTabContest = TabList.getNames()[76];
        isInContest = checkTabContest && checkTabContest.includes('ACTIVE')
        contestText = isInContest ? `Contest: &aYES` : `Contest: &cNO`
    }

    // vinyl selected
    if (Settings.vinylDisplay) {
        baoGardens.vinylInfo.displayText = baoGardens.vinylInfo.isPlaying ? `Current Vinyl: &a${baoGardens.vinylInfo.currentVinyl}𝅘𝅥𝅮𝅘𝅥𝅮` : `Current Vinyl: &c No Vinyl Playing`;
    }

    baoGardens.contestInfo.x = paddingText(contestText);
    baoGardens.pestRepellent.x = paddingText(baoGardens.pestRepellent.text);
    baoGardens.pestExchange.x = paddingText(baoGardens.pestExchange.text);
    baoGardens.harbringer.x = paddingText(baoGardens.harbringer.text);
    // baoGardens.save();
}).setFps(5);


////////////////////////////////////////////////////////////////////////////////
// REG: OVERLAY
////////////////////////////////////////////////////////////////////////////////
registerWhen('renderOverlay', () => {
    Renderer.drawStringWithShadow(lookingAtText, baoGardens.playerInfo.x, baoGardens.playerInfo.y);
}, () => Settings.showPlayerYawPitch && shouldHandleGardenRegs());

registerWhen('renderOverlay', () => {
    Renderer.drawStringWithShadow(contestText, baoGardens.contestInfo.x, baoGardens.contestInfo.y);
}, () => Settings.gardenContestOverlay && shouldHandleGardenRegs());

registerWhen('renderOverlay', () => {
    Renderer.drawStringWithShadow(baoGardens.sprayonatorOverlay.displayText, baoGardens.sprayonatorOverlay.x, baoGardens.sprayonatorOverlay.y);
}, () => Settings.sprayonatorDisplay && shouldHandleGardenRegs());

registerWhen('renderOverlay', () => {
    Renderer.drawStringWithShadow(baoGardens.vinylInfo.displayText, baoGardens.vinylInfo.x, baoGardens.vinylInfo.y);
}, () => Settings.vinylDisplay && shouldHandleGardenRegs());

registerWhen('renderOverlay', () => {
    drawScaledString(baoGardens.plotMapText, baoGardens.gardenPlotMap.x, baoGardens.gardenPlotMap.y, 2);
    drawArrow(playerArrowImg, 0.8, Player.getYaw() + 180, baoGardens.arrow.x, baoGardens.arrow.y);
}, () => Settings.gardenPlotMap && shouldHandleGardenRegs());

registerWhen('renderOverlay', () => {
    Renderer.drawStringWithShadow(baoGardens.harbringer.text, baoGardens.harbringer.x, baoGardens.harbringer.y);
}, () => Settings.harvPotionOverlay && shouldHandleGardenRegs());

registerWhen('renderOverlay', () => {
    Renderer.drawStringWithShadow(baoGardens.pestRepellent.text, baoGardens.pestRepellent.x, baoGardens.pestRepellent.y);
}, () => Settings.pestRepellentDisplay && shouldHandleGardenRegs());

registerWhen('renderOverlay', () => {
    Renderer.drawStringWithShadow(baoGardens.pestExchange.text, baoGardens.pestExchange.x, baoGardens.pestExchange.y);
}, () => Settings.pestExchangeDisplay && shouldHandleGardenRegs());



////////////////////////////////////////////////////////////////////
// SHOW PEST ENTITY BOX (ESP)
////////////////////////////////////////////////////////////////////
registerWhen('renderOverlay', () => {
    World.getAllEntities().forEach(entity => {if (entity.getName().removeFormatting().includes("ൠ")) drawOutlineBeacon(entity.x, entity.y-0.65, entity.z, givColor='white', alpha=1, seethru=false)})
}, () => Settings.pestQOL && Settings.pestEsp && shouldHandleGardenRegs());


////////////////////////////////////////////////////////////////////
// BURROWING SPORES PING
////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    showAlert('&dBurrowing Spores')
    sendMessage('VERY RARE DROP! Burrowing Spores');
    gardenAudio.playDefaultSound();
}, () => Settings.gardenRareDropPings && shouldHandleGardenRegs()).setCriteria('VERY RARE CROP! Burrowing Spores');


////////////////////////////////////////////////////////////////////
// ATMOSPHERIC FILTER PING
////////////////////////////////////////////////////////////////////
registerWhen('chat', (ff, event) => {
    showAlert('&6Atmospheric Filter');
    sendMessage(`RARE DROP! Atmospheric Filter (+${ff}☘)`)
    playSound();
}, () => Settings.gardenRareDropPings && shouldHandleGardenRegs()).setCriteria('RARE DROP! Atmospheric Filter (+${ff}☘)');


////////////////////////////////////////////////////////////////////
// ATMOSPHERIC FILTER PING
////////////////////////////////////////////////////////////////////
registerWhen('chat', (ff, event) => {
    showAlert('&6Atmospheric Filter');
    sendMessage(`RARE DROP! Atmospheric Filter (+${ff}☘)`)
    playSound();
}, () => Settings.gardenRareDropPings && shouldHandleGardenRegs()).setCriteria('RARE DROP! Atmospheric Filter (+${ff}☘)');


////////////////////////////////////////////////////////////////////
// PESTERMINATOR I PING
////////////////////////////////////////////////////////////////////
registerWhen('chat', (ff, event) => {
    showAlert('&6Pesterminator I Book');
    sendMessage(`RARE DROP! Pesterminator I Book (+${ff}☘)`)
    playSound();
}, () => Settings.gardenRareDropPings && shouldHandleGardenRegs()).setCriteria('RARE DROP! Pesterminator I Book (+${ff}☘)');


////////////////////////////////////////////////////////////////////
// RAT PET DROP PING
////////////////////////////////////////////////////////////////////
registerWhen('chat', (ff, event) => {
    // PET DROP! &5Rat&r (+1000☘)
    // PET DROP! &6Rat&r (+1000☘)
    const message = ChatLib.getChatMessage(event, true);
    petDropPing(message, 'PET DROP!', 'Rat', ff, gardenAudio)
}, () => Settings.gardenRareDropPings && shouldHandleGardenRegs()).setCriteria('PET DROP! Rat (+${ff}☘)');


////////////////////////////////////////////////////////////////////
// SLUG PET DROP PING
////////////////////////////////////////////////////////////////////
registerWhen('chat', (ff, event) => {
    // PET DROP! &5Slug&r (+1000☘)
    // PET DROP! &6Slug&r (+1000☘)
    const message = ChatLib.getChatMessage(event, true);
    petDropPing(message, 'PET DROP!', 'Slug', ff, gardenAudio);
}, () => Settings.gardenRareDropPings && shouldHandleGardenRegs()).setCriteria('PET DROP! Slug (+${ff}☘)');


////////////////////////////////////////////////////////////////////
// BETTER GARDEN MESSAGES
////////////////////////////////////////////////////////////////////
const betterGardenMessages = [
    /WARNING! Blocks that you break on this plot will not drop items while using a custom preset!/, 
    /Remember, you have to be on the island for the resources to be planted!/, 
    /Started pasting .+ preset on Garden Plot - .+!/, 
]

betterGardenMessages.forEach(msg => {
    registerWhen('chat', (event) => {
        cancel(event);
    }, () => Settings.betterGardenMessages && shouldHandleGardenRegs()).setCriteria(msg);
})

registerWhen('chat', (presetName, plotName, event) => {
    ChatLib.chat(`&6&lPASTING: &rUsing Preset &b&l[&r${presetName}&b&l]&r on Plot &b'&c${plotName}&b'&r!`);
}, () => Settings.betterGardenMessages && shouldHandleGardenRegs()).setCriteria('Started pasting ${presetName} preset on Garden Plot - ${plotName}!');


const jacobMessages = [
    /\[NPC] Jacob: My contest has started!/,
    /\[NPC] Jacob: Your Anita's .+ is giving you \+.+☘ .+ Fortune during the contest!/, 
]

jacobMessages.forEach(msg => {
    registerWhen('chat', (event) => {
        cancel(event);
    }, () => Settings.betterGardenMessages && !getInGarden() && getInSkyblock() && World.isLoaded()).setCriteria(msg);
});


// ////////////////////////////////////////////////////////////////////
// // DEBUGS
// ////////////////////////////////////////////////////////////////////
// register('chat', (event) => {
//     if (!getInGarden()) return;
//     baoGardens.plots.forEach((row, i) => row.forEach((plot, j) => 
//     // console.log("props: ", Object.getOwnPropertyNames(Object.getPrototypeOf(plot)))));
//     console.log(`Plot ${i * row.length + j + 1}: Name: ${plot.name}, TL: [${plot.tl.join(', ')}], BR: [${plot.br.join(', ')}], Pest: ${plot.pest}, Spray: ${plot.spray}, Color: ${colorPlot(plot)}`)));
// }).setCriteria('#plot').setContains();

// register('chat', (event) => {
//     for (let i = 0; i < baoGardens.playerPlotInfo.names.length; i++) {
//         console.log(baoGardens.playerPlotInfo.names[i])
//     }
// }).setCriteria('#log playernames').setContains();

// register('chat', (event) => {
//     console.log(baoGardens.gardenPlot.coords)
// }).setCriteria('#log gardennames').setContains();

// register('chat', (event) => {
//     console.log(baoGardens.plotSprayInfo.timers)
// }).setCriteria('#log spraytimers').setContains();

// register('chat', (event) => {
//     console.log(baoGardens.pestPlotCoords); // List[str, str, ...]
// }).setCriteria('#log pestplots').setContains();

// register('chat', (event) => {
//     console.log(baoGardens.sprayPlotCoords); // List[str, str, ...]
// }).setCriteria('#log sprayplots').setContains();

// register('command', () => {
//     console.log(`harbringer text: ${baoGardens.harbringer.text} typeof text: ${typeof baoGardens.harbringer.text}, timeLeft: ${baoGardens.harbringer.timeLeft}`)
//     console.log(`pestRepellent text: ${baoGardens.pestRepellent.text} typeof text: ${typeof baoGardens.pestRepellent.text}, timeLeft: ${baoGardens.pestRepellent.timeLeft}`)
//     console.log(`pestExchange text: ${baoGardens.pestExchange.text} typeof text: ${typeof baoGardens.pestExchange.text}, timeLeft: ${baoGardens.pestExchange.timeLeft}`)
// }).setName('getpottext');
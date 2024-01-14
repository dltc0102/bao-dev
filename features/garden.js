import Settings from '../settings.js'
import { data } from '../utils/data.js'
import { colorPlot, drawArrow, drawOutlineBeacon, drawScaledString, getCell, petDropPing, playSound, startSprayTimer, updatePlots } from '../utils/functions.js'
import { sendMessage } from '../utils/party.js'
import { getActivePet } from '../utils/pet.js'
import { showAlert } from '../utils/utils.js'
import { updateCDText } from '../utils/functions.js'
 
////////////////////////////////////////////////////////////////////
// Image        
////////////////////////////////////////////////////////////////////
data.gardens.playerArrowImage = Image.Companion.fromFile(`config/ChatTriggers/modules/bao-dev/assets/delta-arrow.png`);

////////////////////////////////////////////////////////////////////
// Reminder for getting desk config
////////////////////////////////////////////////////////////////////
register('step', () => {
    if (!World.isLoaded()) return;
    if (data.currArea !== 'Garden') return;
    if (data.gardens.sentDeskReminder) return;
    if (data.gardens.plots = []) {
        data.audioInst.playDefaultSound();
        ChatLib.chat("&7[&3Bao&6] &7Hi! \n&7Just a reminder, to setup bao for the garden, click into the &e'Configure Plots'&7 window of your &e/desk&7 menu in the Garden.\n&7If you' received the chat message &b'Bao config saved'&7, the process has been completed.")
        data.gardens.sentDeskReminder = true;
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
    data.gardens.sprayonatorOverlay.selectedSprayMaterial = material;
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


// creating data for data.gardens.gardenPlot.coords
data.gardens.gardenPlot.coords = [];
for (let i = 0; i < data.gardens.gardenPlot.rows; i++) {
    let rowSet = [];
    for (let j = 0; j < data.gardens.gardenPlot.cols; j++) {
        let x1 = -240 + j * data.gardens.gardenPlot.plotW;
        let x2 = -145 + j * data.gardens.gardenPlot.plotW;

        let z1 = -240 + i * data.gardens.gardenPlot.plotW;
        let z2 = -145 + i * data.gardens.gardenPlot.plotW;
        
        let tl = [x1, z1];
        let br = [x2, z2];

        let submatrix = [tl, br]
        rowSet.push(submatrix);
    }
    data.gardens.gardenPlot.coords.push(rowSet);
}

// creating data for data.gardens.plotSprayInfo.timers -- FOR RENDERING ONLY
data.gardens.plotSprayInfo.timers = [];
for (let i=0; i <5; i++) {
    let timerRow = [];
    for (let j=0; j<5; j++) {
        let x1 = data.gardens.gardenPlotMap.x + data.gardens.plotSprayInfo.offsetX + i * data.gardens.plotSprayInfo.dx;
        let y1 = data.gardens.gardenPlotMap.y + data.gardens.plotSprayInfo.offsetY + j * data.gardens.plotSprayInfo.dy;
        let submatrix = [x1, y1];
        timerRow.push(submatrix);
    }
    // console.log(timerRow)
    data.gardens.plotSprayInfo.timers.push(timerRow);
}


// creating data for data.gardens.playerPlotInfo.names
register('guiRender', () => {
    if (data.currArea !== 'Garden') return;
    if (data.gardens.playerPlotInfo.configMsg) return;
    if (Player.getPlayer() === null || Player.getOpenedInventory() === null || Player.getContainer().getName() !== 'Configure Plots') return;

    let guiContainer = Player.getContainer();
    data.gardens.pestPlotCoords = [];
    data.gardens.sprayPlotCoords = [];
    data.gardens.plots = [];
    data.gardens.playerPlotInfo.names = [];
    
    for (let i = 0; i < data.gardens.playerPlotInfo.rows; i++) {
        let row = [];
        for (let j = 0; j < data.gardens.playerPlotInfo.cols; j++) {
            let slotIdx = i * 9 + j + 2;
            let cellValue = getCell(guiContainer, slotIdx);
            row.push(cellValue);
        }
        data.gardens.playerPlotInfo.names.push(row.slice(0, 5));
    }
    
    for (let r = 0; r < data.gardens.playerPlotInfo.rows; r++) {
        let playerRow = [];
        for (let c = 0; c < data.gardens.playerPlotInfo.cols; c++) {
            let cellName = data.gardens.playerPlotInfo.names[r][c];
            let timerDis = data.gardens.plotSprayInfo.timers[c][r];
            let [tl, br] = data.gardens.gardenPlot.coords[r][c];
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
        data.gardens.plots.push(playerRow)
    }

    data.gardens.playerPlotInfo.numLoads -= 1;
    if (data.gardens.playerPlotInfo.numLoads === 0) {
        ChatLib.chat('&6[&3Bao&6] &bDesk Config Saved.')
        data.gardens.playerPlotInfo.configMsg = true;
    }
});


////////////////////////////////////////////////////////////////////
// PEST APPEARS REG CHAT
////////////////////////////////////////////////////////////////////
register('chat', (exclamation, userPlotName, event) => {
    if (data.currArea !== 'Garden') return;
    if (!Settings.pestQOL) return;
    //  GROSS! A Pest has appeared in Plot - money 1!
    updatePlots(data.gardens.plots, userPlotName, 'pest', true);

    if (Settings.titlePestAlert) showAlert(`&c1 &rPest!`);
    if (Settings.autoSHPest) {
        setTimeout(() => {
            ChatLib.command('sethome')
            if (Settings.autoWarpPest && !data.gardens.isInContest) {
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
    updatePlots(data.gardens.plots, userPlotName, 'pest', true);

    if (Settings.titlePestAlert) showAlert(`&b${numPests} &rpests!`);
    if (Settings.autoSHPest) {
        setTimeout(() => {
            ChatLib.command('sethome')
            if (Settings.autoWarpPest && !data.gardens.isInContest) {
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
    updatePlots(data.gardens.plots, userPlotName, 'spray', false);
    updatePlots(data.gardens.plots, userPlotName, 'spray', true);
    updatePlots(data.gardens.plots, userPlotName, 'sprayDateEnd', new Date());
    if (Settings.gardenPlotMap) startSprayTimer(data.gardens.plots, userPlotName);
    data.audioInst.playProcSound();
}).setCriteria('SPRAYONATOR! You sprayed Plot - ${userPlotName} with ${mat}!');


////////////////////////////////////////////////////////////////////
// VINYL SELECTOR CHAT REG
////////////////////////////////////////////////////////////////////
register('chat', (vinylName, event) => {
    if (data.currArea !== 'Garden') return;
    if (!Settings.vinylDisplay) return;
    if (!data.gardens.vinylInfo.names.includes(vinylName)) return;
    data.gardens.vinylInfo.isPlaying = false;
    data.gardens.vinylInfo.currentVinyl = '&cNo Vinyl Playing';
}).setCriteria('You are no longer playing ${vinylName}!');

register('chat', (vinylName, event) => {
    if (data.currArea !== 'Garden') return;
    if (!Settings.vinylDisplay) return;
    if (!data.gardens.vinylInfo.names.includes(vinylName)) return;
    data.gardens.vinylInfo.isPlaying = true;
    data.gardens.vinylInfo.currentVinyl = vinylName;
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

    data.gardens.harbringer.used = true;
    const targetTime = getTimerTarget(harvPotCD, 's');
    data.gardens.harbringer.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.gardens.harbringer.target = targetTime;
}).setCriteria('BUFF! You have gained Harvest Harbinger V! Press TAB or type /effects to view your active effects!');


////////////////////////////////////////////////////////////////////
// PEST REPELLENT TIMER
////////////////////////////////////////////////////////////////////
register('chat', (typeOfPestRepellent, event) => {
    if (data.currArea !== 'Garden') return;
    if (!Settings.pestRepellentDisplay) return;
    if (typeOfPestRepellent === '2x') data.gardens.pestRepellent.is2x = true; 
    if (typeOfPestRepellent === '4x') data.gardens.pestRepellent.is4x = true; 
    data.gardens.pestRepellent.is2x = typeOfPestRepellent === '2';
    data.gardens.pestRepellent.is4x = typeOfPestRepellent === '4';
    data.audioInst.playDrinkSound();

    data.gardens.pestRepellent.used = true;
    const targetTime = getTimerTarget(data.gardens.pestRepellent.cd, 'm');
    data.gardens.pestRepellent.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.gardens.pestRepellent.target = targetTime;
}).setCriteria('YUM! Pests will now spawn ${typeOfPestRepellent}x less while you break crops for the next 60m!');


////////////////////////////////////////////////////////////////////
// PEST EXCHANGE 
////////////////////////////////////////////////////////////////////
register('chat', (numPests, ff, duration, event) => {
    if (data.currArea !== 'Garden') return;
    if (!Settings.pestExchangeDisplay) return;
    // [NPC] Phillip: In exchange for 1 Pest, I've given you +10☘ Farming Fortune for 30m!
    data.gardens.pestExchange.bonusFF = parseInt(ff.replace(',', ''), 10)
    data.gardens.pestExchange.donatedPests = parseInt(numPests.replace(',', ''), 10);
    data.audioInst.playDrinkSound();

    data.gardens.pestExchange.used = true;
    const targetTime = getTimerTarget(parseInt(duration.replace(',', ''), 10), 'm');
    data.gardens.pestExchange.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    data.gardens.pestExchange.target = targetTime;
}).setCriteria("[NPC] Phillip: In exchange for ${numPests} Pest, I've given you +${ff}☘ Farming Fortune for ${duration}m!");


////////////////////////////////////////////////////////////////////
// TIMER GAMELOAD REGS
////////////////////////////////////////////////////////////////////
register('gameLoad', () => {
    if (!data.inSkyblock) return;
    if (!Settings.harvPotionOverlay) return;
    if (!Settings.pestRepellentDisplay) return;
    if (!Settings.pestExchangeDisplay) return;

    // harbringer
    if (data.gardens.harbringer.used) {
        const targetTime = new Date(data.gardens.harbringer.target);
        data.gardens.harbringer.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    } else {
        data.gardens.harbringer.timeLeft = 0;
    }

    // pestRepellent
    if (data.gardens.pestRepellent.used) {
        const targetTime = new Date(data.gardens.pestRepellent.target);
        data.gardens.pestRepellent.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    } else {
        data.gardens.pestRepellent.timeLeft = 0;
    }

    // pestExchange
    if (data.gardens.pestExchange.used) {
        const targetTime = new Date(data.gardens.pestExchange.target);
        data.gardens.pestRepellent.timeLeft = ((targetTime - new Date()) / 1000).toFixed(0);
    } else {
        data.gardens.pestRepellent.timeLeft = 0;
    }
});

////////////////////////////////////////////////////////////////////
// TIMER STEP TRIGGERS
////////////////////////////////////////////////////////////////////
register('step', () => {
    if (data.currArea !== 'Garden') return;
    if (Settings.harvPotionOverlay && data.gardens.harbringer.used) {
        if (data.gardens.harbringer.timeLeft > 0) {
            data.gardens.harbringer.used = true;
            data.gardens.harbringer.timeLeft -= 1;
            updateCDText('&6', 'Harbringer Potion', data.gardens.harbringer.timeLeft);
        } else if (data.gardens.harbringer.timeLeft === 0 || data.gardens.harbringer.timeLeft < 0) {
            data.gardens.harbringer.used = false;
            showAlert(`&cHarbringer Potion &eExpired`)
            data.audioInst.playDefaultSound();
            ChatLib.chat(`&eYour &cHarbringer Potion &ehas expired.`)
            data.gardens.harbringer.target = 0;
            updateCDText('&6', 'Harbringer Potion', data.gardens.harbringer.timeLeft);
        }
        data.gardens.harbringer.text = data.gardens.harbringer.timeLeft > 0 ? `&6Harbringer Potion: &r${Math.floor(data.gardens.harbringer.timeLeft/60)}m ${Math.floor(data.gardens.harbringer.timeLeft % 60)}s&r` : '';
    }

    // pest repellent timer
    if (Settings.pestRepellentDisplay) {
        if (data.gardens.pestRepellent.is2x) data.gardens.pestRepellent.type = '2x';
        if (data.gardens.pestRepellent.is4x) data.gardens.pestRepellent.type = '4x';
        if (!data.gardens.pestRepellent.used) return;
        console.log(`data.gardens.pestRepellent.timeLeft val: ${data.gardens.harbringer.timeLeft}`)

        // data.gardens.pestRepellent.timeLeft = trackChatTimer(data.gardens.pestRepellent.used, data.gardens.pestRepellent.target, data.gardens.pestRepellent.timeLeft, 'Pest Repellent', '', data.audioInst);
        if (data.gardens.pestRepellent.timeLeft > 0) {
            data.gardens.pestRepellent.used = true;
            data.gardens.pestRepellent.timeLeft -= 1;
            updateCDText('', 'Pest Repellent', data.gardens.pestRepellent.timeLeft);
        } else if (data.gardens.pestRepellent.timeLeft === 0 || data.gardens.pestRepellent.timeLeft < 0) {
            data.gardens.pestRepellent.used = false;
            showAlert(`&cPest Repellent &eExpired`)
            data.audioInst.playDefaultSound();
            ChatLib.chat(`&eYour &cPest Repellent Bonus Farming Fortune &ehas worn off!`);
            data.gardens.pestRepellent.target = 0;
            updateCDText('', 'Pest Repellent', data.gardens.pestRepellent.timeLeft);
        }

        data.gardens.pestRepellent.text = data.gardens.pestRepellent.used ? `Pest Repellent [&c${data.gardens.pestRepellent.type}&r]: &bYES&r &7|&r &a${Math.floor(data.gardens.pestRepellent.timeLeft/60)}m ${Math.floor(data.gardens.pestRepellent.timeLeft % 60)}s&r` : `Pest Repellent: &bNO&r`;
    }

    // pest exchange timer
    if (Settings.pestExchangeDisplay) {
        if (!data.gardens.pestExchange.used) return;
        console.log(`data.gardens.pestExchange.timeLeft val: ${data.gardens.harbringer.timeLeft}`)
        // data.gardens.pestExchange.timeLeft = trackChatTimer(data.gardens.pestExchange.used, data.gardens.pestExchange.used, data.gardens.pestExchange.timeLeft, 'Pest Exchange', '', data.audioInst);
        if (data.gardens.pestExchange.timeLeft > 0) {
            data.gardens.pestExchange.used = true;
            data.gardens.pestExchange.timeLeft -= 1;
            updateCDText('', 'Pest Exchange', data.gardens.pestExchange.timeLeft);
        } else if (data.gardens.pestExchange.timeLeft === 0 || data.gardens.pestExchange.timeLeft < 0) {
            data.gardens.pestExchange.used = false;
            showAlert(`&cPest Exchange &eExpired`)
            data.audioInst.playDefaultSound();
            ChatLib.chat(`&eYour &cPest Exchange &ehas expired.`)
            data.gardens.targetPestExchange = 0;
            updateCDText('', 'Pest Exchange', data.gardens.pestExchange.timeLeft);
        }

        data.pestExchangeText = data.gardens.pestExchange.used ? `&2Pest Exchange: &r${Math.floor(data.gardens.pestExchange.timeLeft / 60)}m ${Math.floor(data.gardens.pestExchange.timeLeft % 60)}s &6(+${data.gardens.pestExchange.bonusFF === null || isNaN(data.gardens.pestExchange.bonusFF) ? 0 : data.gardens.pestExchange.bonusFF}☘ &7|&6 ${data.gardens.pestExchange.donatedPests === null || isNaN(data.gardens.pestExchange.donatedPests) ? 0 : data.gardens.pestExchange.donatedPests} Pests )` : '';
    }
}).setFps(1);



register('step', () => {
    if (!World.isLoaded()) return;
    if (data.currArea !== 'Garden') return;

    // player yaw and pitch
    if (Settings.showPlayerYawPitch) {
        data.gardens.playerInfo.yaw = Player.getYaw().toFixed(3);
        data.gardens.playerInfo.pitch = Player.getPitch().toFixed(3);
        data.gardens.playerInfo.lookingAtText = `Yaw: &b${data.gardens.playerInfo.yaw}\nPitch: &b${data.gardens.playerInfo.pitch}`
    }

    // pest death detection
    const scoreboardLines = Scoreboard.getLines();
    let loc_regex = /^⏣ The Garden ൠ x[1-9]|10$/
    let playerX = Player.getX();
    let playerZ = Player.getZ();
    data.gardens.plots.forEach(column => {
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
        data.gardens.sprayonatorOverlay.materialText = data.gardens.sprayonatorOverlay.selectedSprayMaterial ? `&rSprayonator: &a${data.gardens.sprayonatorOverlay.selectedSprayMaterial}` : `&rSprayonator: &aCompost`
        data.gardens.sprayonatorOverlay.possiblePests = data.gardens.sprayonatorOverlay.selectedSprayMaterial ? `&rPossible Pests: &b${data.gardens.sprayonatorOverlay.matAttracts[data.gardens.sprayonatorOverlay.selectedSprayMaterial].join(', ')}` :  `&rPossible Pests: &bMosquito, Earthworm`;
        data.gardens.sprayonatorOverlay.displayText = `${data.gardens.sprayonatorOverlay.materialText}\n${data.gardens.sprayonatorOverlay.possiblePests}`
    }

    // plot text
    if (Settings.gardenPlotMap) {
        data.gardens.plotMapText = '';
        for (let r = 0; r < data.gardens.plots.length; r++) {
            let row = '';
            for (let c = 0; c < data.gardens.plots[r].length; c++) {
                let plot = data.gardens.plots[r][c];
                let plotColor = colorPlot(plot);
                let coloredPlot = `${plotColor}█`
                row += coloredPlot;
            }
            data.gardens.plotMapText += row + '\n';
        }
    }
    
    // calculates the arrow's X and Y Position relative the to player's coordinates
    let arrowBaseX = data.gardens.gardenPlotMap.x + data.gardens.gardenPlotMap.ox;
    let arrowBaseY = data.gardens.gardenPlotMap.y + data.gardens.gardenPlotMap.oy
    let normalizedX = (Player.getX() - (-240)) / (240 - (-240))
    let normalizedY = (Player.getZ() - (-240)) / (240 - (-240))
    data.gardens.plotArrow.x = arrowBaseX + normalizedX * (117 - 7)
    data.gardens.plotArrow.y = arrowBaseY + normalizedY * (185 - 75)

    // is contest:
    if (Settings.gardenContestOverlay) {
        checkTabContest = TabList.getNames()[76]
        data.gardens.isInContest = checkTabContest && checkTabContest.includes('ACTIVE')
        data.gardens.contestText = data.gardens.isInContest ? `Contest: &aYES` : `Contest: &cNO`
    }

    // vinyl selected
    if (Settings.vinylDisplay) {
        data.gardens.vinylInfo.displayText = data.gardens.vinylInfo.isPlaying ? `Current Vinyl: &a${data.gardens.vinylInfo.currentVinyl}𝅘𝅥𝅮𝅘𝅥𝅮` : `Current Vinyl: &c No Vinyl Playing`;
    }

}).setFps(5);


// render overlay
register('renderOverlay', () => {
    if (data.currArea !== 'Garden') return;
    const paddingText = (text) => {
        return data.screenW - 5 - Renderer.getStringWidth(text);
    }

    // yaw and pitch
    if (Settings.showPlayerYawPitch) {
        Renderer.drawStringWithShadow(data.gardens.playerInfo.lookingAtText, data.gardens.playerInfo.x, data.gardens.playerInfo.y) ;
    }

    // draw contest
    if (Settings.gardenContestOverlay) {
        data.gardens.contestInfo.x = paddingText(data.gardens.contestText);
        Renderer.drawStringWithShadow(data.gardens.contestText, data.gardens.contestInfo.x, data.gardens.contestInfo.y);
    }
    
    // Sprayonator selected material
    if (Settings.sprayonatorDisplay) {
        Renderer.drawStringWithShadow(data.gardens.sprayonatorOverlay.displayText, data.gardens.sprayonatorOverlay.x, data.gardens.sprayonatorOverlay.y);
    }

    // draws vinyl display
    if (Settings.vinylDisplay) {
        Renderer.drawStringWithShadow(data.gardens.vinylInfo.displayText, data.gardens.vinylInfo.x, data.gardens.vinylInfo.y);
    }

    // draws plot map and player arrow
    if (Settings.gardenPlotMap) {
        drawScaledString(data.gardens.plotMapText, data.gardens.gardenPlotMap.x, data.gardens.gardenPlotMap.y, 2);
        drawArrow(data.gardens.playerArrowImage, 0.8, Player.getYaw() + 180, data.gardens.plotArrow.x, data.gardens.plotArrow.y);
    }
    

    // draws harbringer potion timer
    if (Settings.harvPotionOverlay) {
        data.gardens.harbringer.x = paddingText(data.gardens.harbringer.text);
        Renderer.drawStringWithShadow(data.gardens.harbringer.text, data.gardens.harbringer.x, data.gardens.harbringer.y);
    }


    // draws pest repellent timer
    if (Settings.pestRepellentDisplay) {
        data.gardens.pestRepellent.x = paddingText(data.gardens.pestRepellent.text);
        Renderer.drawStringWithShadow(data.gardens.pestRepellent.text, data.gardens.pestRepellent.x, data.gardens.pestRepellent.y);
    }
    
    // pest exchange text
    if (Settings.pestExchangeDisplay) {
        data.gardens.pestExchange.x = paddingText(data.pestExchangeText);
        Renderer.drawStringWithShadow(data.pestExchangeText, data.gardens.pestExchange.x, data.gardens.pestExchange.y);
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
    World.getAllEntities().forEach(entity => {if (entity.getName().removeFormatting().includes("ൠ")) drawOutlineBeacon(entity.x, entity.y-0.65, entity.z, givColor='white', alpha=1, seethru=false)})
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

register("guiClosed", () => {
    data.gardens.playerPlotInfo.configMsg = false;
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
    if (data.currArea !== 'Garden') cancel(event);
}).setCriteria('[NPC] Jacob: My contest has started!');

register('chat', (taliphase, ff, cropName, event) => {
    if (data.currArea !== 'Garden') cancel(event);
}).setCriteria("[NPC] Jacob: Your Anita's ${taliphase} is giving you +${ff}☘ ${cropName} Fortune during the contest!");


////////////////////////////////////////////////////////////////////
// DEBUGS
////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (data.currArea !== 'Garden') return;
    data.gardens.plots.forEach((row, i) => row.forEach((plot, j) => 
    // console.log("props: ", Object.getOwnPropertyNames(Object.getPrototypeOf(plot)))));
    console.log(`Plot ${i * row.length + j + 1}: Name: ${plot.name}, TL: [${plot.tl.join(', ')}], BR: [${plot.br.join(', ')}], Pest: ${plot.pest}, Spray: ${plot.spray}, Color: ${colorPlot(plot)}`)));
}).setCriteria('#plot').setContains();

register('chat', (event) => {
    for (let i = 0; i < data.gardens.playerPlotInfo.names.length; i++) {
        console.log(data.gardens.playerPlotInfo.names[i])
    }
}).setCriteria('#log playernames').setContains();

register('chat', (event) => {
    console.log(data.gardens.gardenPlot.coords)
}).setCriteria('#log gardennames').setContains();

register('chat', (event) => {
    console.log(data.gardens.plotSprayInfo.timers)
}).setCriteria('#log spraytimers').setContains();

register('chat', (event) => {
    console.log(data.gardens.pestPlotCoords); // List[str, str, ...]
}).setCriteria('#log pestplots').setContains();

register('chat', (event) => {
    console.log(data.gardens.sprayPlotCoords); // List[str, str, ...]
}).setCriteria('#log sprayplots').setContains();
import Settings from '../settings.js';
import Audio from '../utils/audio.js';

import { delayMessage, filterSeparators, formatMoney, getPlayerPOI, getPlayerPos, playSound } from '../utils/functions.js';
import { constrainX, constrainY } from '../utils/functions.js' // padding
import { createGuiCommand, renderGuiPosition } from '../utils/functions.js'; // gui
import { sendMessage } from '../utils/party.js';
import { showAlert, registerWhen } from '../utils/utils.js';
import { getInSkyblock, getInHub } from '../utils/functions.js'; // sb, area
import { baoUtils } from '../utils/utils.js';


////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const mythosAudio = new Audio();
const moveMythosCounter = new Gui(); // bobber count
createGuiCommand(moveMythosCounter, 'movemythoscounter', 'mmc');

const mythosDragText = `&7|| MYTHOS ||\n&7==================\n&7||| Burros Dug: 0\n&7||| Feathers: 0\n&7||| Coins Dug Up: 0\n&7------------------\n&7\n&7|||MinosHunters: 0\n&7|||Lynxes: 0\n&7|||Gaias: 0\n&7|||Minotaurs: 0\n&7|||Champions: 0\n&7||| Inquisitors: 0\n&7------------------\n&7||| 0 0 0\n&7||| 0 0 0\n&7||| 0 0\n&7------------------\n&7|| Kills/Inq: 0\n&7|| Minotaurs/Dae Stick: 0\n&7|| Burrows/CoG: 0\n&7|| Burrows/WuS: 0\n&7|| Champs Since Relic: 0`;

export const baoMythos = {
    "allLines": '',
    "x": 5, 
    "y": 100,
    "stats": { // mythos player info
        "featherCount": 0, 
        "moneyCount": 0, 
        "burrowCount": 0, 
        "ancientClawCount": 0, 
        "ancientClawMoney": 0,

        "minosHunterKills": 0, 
        "siaLynxKills": 0, 
        "gaiaConsKills": 0, 
        "minotaurKills": 0, 
        "minosChampKills": 0, 
        "minosInqKills": 0, 
        "totalMythosKills": 0, 

        "DTS": 0, // check inventory pickup
        "AR": 0, // check inventory pickup
        "CTP": 0, // check inventory pickup
        "DS": 0, 
        "CoG": 0, 
        "WuS": 0, 
        "MR": 0, // check inventory pickup
        "CHIM": 0, // check inventory pickup and chat message

        "mobsSinceInq": 0, 
        "minotaursSinceDae": 0, 
        "burrowsSinceCOG": 0, 
        "burrowsSinceWUS": 0, 
        "championsSinceRelic": 0, 
    }, 
};

const dts_title = '&2Dwarf Turtle Shelmet' 
const ar_title = '&5Antique Remedies'
const ctp_title = '&5Crochet Tiger Plushie'
const relic_title = '&6Minos Relic'
const cog_title = '&6Crown of Greed'
const wus_title = '&6Washed-up Souvenir'
const dae_title = '&6Daedalus Stick'
const chim_title = '&d&lCHIMERA I'

// mythosCounterGeneral
const burrowLine = `&4|&3|| &rBurrows Dug: &b${baoMythos.stats.burrowCount}`;
const featherLine = `&4|&3|| &rFeathers: &b${baoMythos.stats.featherCount}`;

// mythosCounterKills
const hunterLine = `&4|&3|| &rMinos Hunters: &b${baoMythos.stats.minosHunterKills}`;
const lynxLine = `&4|&3|| &rLynxes: &b${baoMythos.stats.siaLynxKills}`;
const gaiaLine = `&4|&3|| &rGaias: &b${baoMythos.stats.gaiaConsKills}`;
const minotaurLine = `&4|&3|| &rMinotaurs: &b${baoMythos.stats.minotaurKills}`;
const championLine = `&4|&3|| &rChampions: &b${baoMythos.stats.minosChampKills}`;
const inquisitorLine = `&4|&3|| &rInquisitors: &b${baoMythos.stats.minosInqKills}`

// mythosCounterDrops
const dtsAmt = baoMythos.stats.DTS > 0 ? baoMythos.stats.DTS : 0;
const arAmt = baoMythos.stats.AR > 0 ? baoMythos.stats.AR : 0;
const ctpAmt = baoMythos.stats.CTP > 0 ? baoMythos.stats.CTP : 0;
const dsAmt = baoMythos.stats.DS > 0 ? baoMythos.stats.DS : 0;
const cogAmt = baoMythos.stats.CoG > 0 ? baoMythos.stats.CoG : 0;
const wusAmt = baoMythos.stats.WuS > 0 ? baoMythos.stats.WuS : 0;
const mrAmt = baoMythos.stats.MR > 0 ? baoMythos.stats.MR : 0;
const chimAmt = baoMythos.stats.CHIM > 0 ? baoMythos.stats.CHIM : 0;

const dtsLine = `&rDTS: &b${dtsAmt}`;
const arLine = `&rAR: &b${arAmt}`;
const ctpLine = `&rCTP: &b${ctpAmt}`;
const dsLine = `&rDS: &b${dsAmt}`;
const cogLine = `&rCoG: &b${cogAmt}`;
const wusLine = `&rWuS: &b${wusAmt}`;
const mrLine = `&rMR: &b${mrAmt}`;
const chimLine = `&rCHIMERA: &b${chimAmt}`;

const dropsLine1 = `&4|&3|| &r${dtsLine} ${arLine} ${ctpLine}`;
const dropsLine2 = `&4|&3|| &r${dsLine} ${cogLine} ${wusLine}`;
const dropsLine3 = `&4|&3|| &r${mrLine} ${chimLine}`;

// mythosCounterAvgs
const avgInq = (isNaN(baoMythos.stats.totalMythosKills) || isNaN(baoMythos.stats.minosInqKills) || baoMythos.stats.minosInqKills === 0) ? 0 : (baoMythos.stats.totalMythosKills / baoMythos.stats.minosInqKills).toFixed(0);
const avgDae = (isNaN(baoMythos.stats.minotaurKills) || isNaN(baoMythos.stats.DS) || baoMythos.stats.DS === 0) ? 0 : (baoMythos.stats.minotaurKills / baoMythos.stats.DS).toFixed(0);
const avgCoG = (isNaN(baoMythos.stats.burrowCount) || isNaN(baoMythos.stats.CoG) || baoMythos.stats.CoG === 0) ? 0 : (baoMythos.stats.burrowCount / baoMythos.stats.CoG).toFixed(2);
const avgWuS = (isNaN(baoMythos.stats.burrowCount) || isNaN(baoMythos.stats.WuS) || baoMythos.stats.WuS === 0) ? 0 : (baoMythos.stats.burrowCount / baoMythos.stats.WuS).toFixed(2);
const avgRelic = (isNaN(baoMythos.stats.minosChampKills) || isNaN(baoMythos.stats.MR) || baoMythos.stats.MR === 0) ? 0 : (baoMythos.stats.minosChampKills / baoMythos.stats.MR).toFixed(0);

const averageInqLine = `&4|&3|| &rKills/Inq: &b${avgInq}`;
const averageDaeLine = `&4|&3|| &rMinotaurs/Dae Stick: &b${avgDae}`;
const averageCOGLine = `&4|&3|| &rBurrows/CoG: &b${avgCoG}`;
const averageWUSLine = `&4|&3|| &rBurrows/WuS: &b${avgWuS}`;
const averageRelicLine = `&4|&3|| &rChamps/Relic: &b${avgRelic}`;

// mythosCounterTrackers
const mobsSinceInqLine = `&6|| &rMobs Since Inq: &c${baoMythos.stats.mobsSinceInq}`;
const minotaursSinceDaeLine = `&6|| &rMinotaurs Since Dae: &c${baoMythos.stats.minotaursSinceDae}`;
const burrowsSinceCOGLine = `&6|| &rBurrows Since CoG: &c${baoMythos.stats.burrowsSinceCOG}`;
const burrowsSinceWUSLine = `&6|| &rMinotaurs Since WuS: &c${baoMythos.stats.burrowsSinceWUS}`;
const champsSinceRelicLine = `&6|| &rChamps Since Relic: &c${baoMythos.stats.championsSinceRelic}`;


////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function shouldHandleMythosRegs() {
    return getInHub() && getInSkyblock() && World.isLoaded();
}


////////////////////////////////////////////////////////////////////////////////
// BETTER MYTHOS EVENT MESSAGES
////////////////////////////////////////////////////////////////////////////////
const mythosMessages = [
    // sift
    /Follow the arrows to find the treasure!/, 
    /You need to equip a LEGENDARY griffin pet to fight this!/, 

    // items
    /RARE DROP! You dug out a Griffin Feather!/, 
    /Wow! You dug out .+ coins!/, 
    /You sold Ancient Claw x.+ for .+ Coins!/,
    /You sold Ancient Claw x.+ for .+ Coin!/,
    /You gut out a Griffin Burrow!/, 
    /You finished the Griffin burrow chain! (4\/4)/, 

    // mob stats
    /You dug out a Minos Hunter!/, 
    /You dug out Siamese Lynxes!/, 
    /You dug out a Gaia Construct!/, 
    /You dug out a Minotaur!/, 
    /You dug out a Minos Champion!/, 
    /You dug out a Minos Inquisitor!/, 
]

mythosMessages.forEach(msg => {
    registerWhen('chat', (event) => {
        cancel(event);
    }, () => Settings.betterMythosMessages && shouldHandleMythosRegs()).setCriteria(msg);
});


////////////////////////////////////////////////////////////////////////////////
// FEATHERS
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    baoMythos.stats.featherCount += 1;
}, () => shouldHandleMythosRegs()).setCriteria('RARE DROP! You dug out a Griffin Feather!');


////////////////////////////////////////////////////////////////////////////////
// COINS
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (money, event) => {
    const moneyNoCom = money.toString().replace(/,/g, '');;
    baoMythos.stats.moneyCount += Number(moneyNoCom);
}, () => shouldHandleMythosRegs()).setCriteria('Wow! You dug out ${money} coins!');


////////////////////////////////////////////////////////////////////////////////
// ANCIENT CLAWS
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (amt, coins, event) => {
    baoMythos.stats.ancientClawCount += parseInt(amt);
    baoMythos.stats.ancientClawMoney += parseInt(coins.replace(',', ''), 10);
}, () => shouldHandleMythosRegs()).setCriteria('You sold Ancient Claw x${amt} for ${coins} Coins!');


////////////////////////////////////////////////////////////////////////////////
// BURROWS
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    baoMythos.stats.burrowCount +=1;
    baoMythos.stats.burrowsSinceCOG += 1;
    baoMythos.stats.burrowsSinceWUS += 1;
}, () => shouldHandleMythosRegs()).setCriteria('You dug out a Griffin Burrow!').setContains();

registerWhen('chat', (event) => {
    baoMythos.stats.burrowCount +=1;
    baoMythos.stats.burrowsSinceCOG += 1;
    baoMythos.stats.burrowsSinceWUS += 1;
}, () => shouldHandleMythosRegs()).setCriteria('You finished the Griffin burrow chain! (4/4)');


////////////////////////////////////////////////////////////////////////////////
// DWARF TURTLE SHELMET
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    showAlert(dts_title);
    mythosAudio.playDefaultSound();
    if (baoMythos.stats.DTS === undefined) baoMythos.stats.DTS += 2;
    baoMythos.stats.DTS += 1;
}, () => shouldHandleMythosRegs()).setCriteria('[SBE] RARE DROP! Dwarf Turtle Shelmet');


////////////////////////////////////////////////////////////////////////////////
// ANTIQUE REMEDIES
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    showAlert(ar_title);
    mythosAudio.playDefaultSound();
    if (baoMythos.stats.AR === undefined) baoMythos.stats.AR += 2;
    baoMythos.stats.AR += 1;
}, () => shouldHandleMythosRegs()).setCriteria('[SBE] RARE DROP! Antique Remedies');


////////////////////////////////////////////////////////////////////////////////
// CROCHET TIGER PLUSHIE
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    showAlert(ctp_title);
    mythosAudio.playDefaultSound();
    if (baoMythos.stats.CTP === undefined) baoMythos.stats.CTP += 2;
    baoMythos.stats.CTP += 1;
}, () => shouldHandleMythosRegs()).setCriteria('[SBE] RARE DROP! Crochet Tiger Plushie');


////////////////////////////////////////////////////////////////////////////////
// MINOS RELIC
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    showAlert(relic_title);
    sendMessage(`RARE DROP! Minos Relic [${baoMythos.stats.championsSinceRelic} Champ kills]`);
    playSound();
    if (baoMythos.stats.MR === undefined) baoMythos.stats.MR += 2;
    baoMythos.stats.MR += 1;
}, () => shouldHandleMythosRegs()).setCriteria('[SBE] RARE DROP! Minos Relic');


////////////////////////////////////////////////////////////////////////////////
// CROWN OF GREED
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    sendMessage(`RARE DROP! You dug out a Crown of Greed! [${baoMythos.stats.burrowsSinceCOG} burrows]`);
    showAlert(cog_title);
    mythosAudio.playDefaultSound();
    if (baoMythos.stats.CoG === undefined) baoMythos.stats.CoG += 2;
    baoMythos.stats.CoG += 1;
    baoMythos.stats.burrowsSinceCOG = 0;
}, () => shouldHandleMythosRegs()).setCriteria('RARE DROP! You dug out a Crown of Greed!');


////////////////////////////////////////////////////////////////////////////////
// WASHED UP SOUVENIR
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    sendMessage(`RARE DROP! You dug out a Washed-up Souvenir! [${baoMythos.stats.burrowsSinceWUS} burrows]`);
    showAlert(wus_title);
    mythosAudio.playDefaultSound();
    if (baoMythos.stats.WuS === undefined) baoMythos.stats.WuS += 2;
    baoMythos.stats.WuS += 1;
    baoMythos.stats.burrowsSinceWUS = 0;
}, () => shouldHandleMythosRegs()).setCriteria('RARE DROP! You dug out a Washed-up Souvenir!');


////////////////////////////////////////////////////////////////////////////////
// DAEDALUS STICK
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (mf, event) => {
    sendMessage(`RARE DROP! Daedalus Stick (+${mf}% ✯ Magic Find) [${baoMythos.stats.minotaursSinceDae} Minotaur kills]`)
    showAlert(dae_title);
    playSound();
    if (baoMythos.stats.DS === undefined) baoMythos.stats.DS += 2;
    baoMythos.stats.DS += 1;
    baoMythos.stats.minotaursSinceDae = 0;
}, () => shouldHandleMythosRegs()).setCriteria('RARE DROP! Daedalus Stick (+${mf}% ✯ Magic Find)');


////////////////////////////////////////////////////////////////////////////////
// CHIMERA I
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (mf, event) => {
    showAlert(chim_title)
    sendMessage('RARE DROP! Enchanted Book');
    if (baoMythos.stats.CHIM === undefined) baoMythos.stats.CHIM += 2;
    baoMythos.stats.CHIM += 1;
    mythosAudio.playDefaultSound();
}, () => shouldHandleMythosRegs()).setCriteria('RARE DROP! Enchanted Book');


////////////////////////////////////////////////////////////////////////////////
// MINOS HUNTER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (mf, event) => {
    baoMythos.stats.minosHunterKills += 1; 
    baoMythos.stats.mobsSinceInq += 1; 
    baoMythos.stats.totalMythosKills += 1;
}, () => shouldHandleMythosRegs()).setCriteria('You dug out a Minos Hunter!').setContains();


////////////////////////////////////////////////////////////////////
// STATS: SIAMESE LYNXES
////////////////////////////////////////////////////////////////////
registerWhen('chat', (mf, event) => {
    baoMythos.stats.siaLynxKills += 1; 
    baoMythos.stats.mobsSinceInq += 1; 
    baoMythos.stats.totalMythosKills += 1;
}, () => shouldHandleMythosRegs()).setCriteria('You dug out a Siamese Lynxes!').setContains();


////////////////////////////////////////////////////////////////////
// STATS: GAIA CONSTRUCT
////////////////////////////////////////////////////////////////////
registerWhen('chat', (mf, event) => {
    baoMythos.stats.gaiaConsKills += 1; 
    baoMythos.stats.mobsSinceInq += 1; 
    baoMythos.stats.totalMythosKills += 1;
}, () => shouldHandleMythosRegs()).setCriteria('You dug out a Gaia Construct!').setContains();


////////////////////////////////////////////////////////////////////
// STATS: MINOTAUR
////////////////////////////////////////////////////////////////////
registerWhen('chat', (mf, event) => {
    baoMythos.stats.minotaurKills += 1; 
    baoMythos.stats.mobsSinceInq += 1; 
    baoMythos.stats.minotaursSinceDae += 1; 
    baoMythos.stats.totalMythosKills += 1;
}, () => shouldHandleMythosRegs()).setCriteria('You dug out a Minotaur!').setContains();


////////////////////////////////////////////////////////////////////
// STATS: MINOS CHAMPION
////////////////////////////////////////////////////////////////////
registerWhen('chat', (mf, event) => {
    baoMythos.stats.championsSinceRelic += 1;
    baoMythos.stats.minosChampKills += 1; 
    baoMythos.stats.mobsSinceInq += 1; 
    baoMythos.stats.totalMythosKills += 1;
}, () => shouldHandleMythosRegs()).setCriteria('You dug out a Minos Champion!').setContains();


////////////////////////////////////////////////////////////////////
// STATS: MINOS INQUISITOR
////////////////////////////////////////////////////////////////////
registerWhen('chat', (mf, event) => {
    if (Settings.announce_inqs) sendMessage(`${getPlayerPos()} || ${getPlayerPOI()} || Inquisitor`);
    setTimeout(() => { ChatLib.chat(`Mobs Since Last Inq: &b${baoMythos.stats.mobsSinceInq} &ckills`)}, 100);
    playSound();

    baoMythos.stats.minosInqKills += 1; 
    baoMythos.stats.mobsSinceInq = 0; 
    baoMythos.stats.totalMythosKills += 1;
}, () => shouldHandleMythosRegs()).setCriteria('You dug out a Minos Inquisitor!').setContains();


////////////////////////////////////////////////////////////////////
// REG: STEP
////////////////////////////////////////////////////////////////////
register('step', () => {
    if (!getInSkyblock() || !World.isLoaded() || !getInHub() || !Settings.mythosCounterMainToggle) return;
    
    const mythosTitle = Settings.mythosCounterGeneral || Settings.mythosCounterKills || Settings.mythosCounterDrops || Settings.mythosCounterAvgs || Settings.mythosCounterTrackers ? `&3|| &6MYTHOS &3||\n${baoUtils.thickSep}` : '';
    
    // lines
    const moneyLine = `&4|&3|| &rCoins Dug Up: &b${formatMoney(baoMythos.stats.moneyCount)}`;
    
    const showGeneral = Settings.mythosCounterGeneral ? [burrowLine, featherLine, moneyLine, baoUtils.thinSep].join('\n') : '';

    const showKills = Settings.mythosCounterKills ? [hunterLine, lynxLine, gaiaLine, minotaurLine, championLine, inquisitorLine, baoUtils.thinSep].join('\n') : '';

    const showDrops = Settings.mythosCounterDrops ? [dropsLine1, dropsLine2, dropsLine3, baoUtils.thinSep].join('\n') : '';

    const showAverages = Settings.mythosCounterAvgs ? [averageInqLine, averageDaeLine, averageCOGLine, averageWUSLine, averageRelicLine, baoUtils.thinSep].join('\n') : '';

    const showTrackers = Settings.mythosCounterTrackers ? [mobsSinceInqLine, minotaursSinceDaeLine, burrowsSinceCOGLine, burrowsSinceWUSLine, champsSinceRelicLine, baoUtils.thinSep].join('\n') : '';

    const mythosDisplayRaw = [mythosTitle, showGeneral, showKills, showDrops, showAverages, showTrackers].join('\n');

    baoMythos.allLines = filterSeparators(mythosDisplayRaw, baoUtils.thinSep);
}).setFps(1)


////////////////////////////////////////////////////////////////////
// REG: DRAG
////////////////////////////////////////////////////////////////////
register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (moveMythosCounter.isOpen()){
        baoMythos.x = constrainX(x, 3, mythosDragText);
        baoMythos.y = constrainY(y, 3, mythosDragText);
    }
});


////////////////////////////////////////////////////////////////////
// REG: OVERLAY
////////////////////////////////////////////////////////////////////
registerWhen('renderOverlay', () => {
    Renderer.drawStringWithShadow(baoMythos.allLines, baoMythos.x, baoMythos.y);
}, () => Settings.mythosCounterMainToggle && getInHub() && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', () => {
    renderGuiPosition(moveMythosCounter, baoMythos, mythosDragText);
}, () => getInSkyblock() && World.isLoaded());


////////////////////////////////////////////////////////////////////
// INFO: COMMANDS
////////////////////////////////////////////////////////////////////
register('command', () => {
    ChatLib.chat(`&6|| &rMobs Since Inq: &c${baoMythos.stats.mobsSinceInq}`);
    ChatLib.chat(`&6|| &rMinotaurs Since Dae: &c${baoMythos.stats.minotaursSinceDae}`);
    ChatLib.chat(`&6|| &rBurrows Since CoG: &c${baoMythos.stats.burrowsSinceCOG}`);
    ChatLib.chat(`&6|| &rMinotaurs Since WuS: &c${baoMythos.stats.burrowsSinceWUS}`);
    ChatLib.chat(`&6|| &rChamps Since Relic: &c${baoMythos.stats.championsSinceRelic}`);
}).setName('mythostats');

register('command', () => {
    baoMythos.stats.featherCount = 0;
    baoMythos.stats.moneyCount = 0;
    baoMythos.stats.burrowCount = 0;

    baoMythos.stats.minosHunterKills = 0;
    baoMythos.stats.siaLynxKills = 0;
    baoMythos.stats.gaiaConsKills = 0;
    baoMythos.stats.minotaurKills = 0;
    baoMythos.stats.minosChampKills = 0;
    baoMythos.stats.minosInqKills = 0;
    baoMythos.stats.totalMythosKills = 0;
    
    baoMythos.stats.DTS = 0;
    baoMythos.stats.AR = 0;
    baoMythos.stats.CTP = 0;
    baoMythos.stats.DS = 0;
    baoMythos.stats.CoG = 0;
    baoMythos.stats.WuS = 0;
    baoMythos.stats.MR = 0;
    baoMythos.stats.CHIM = 0;

    baoMythos.stats.mobsSinceInq = 0;
    baoMythos.stats.minotaursSinceDae = 0;
    baoMythos.stats.burrowsSinceCOG = 0;
    baoMythos.stats.burrowsSinceWUS = 0;
    baoMythos.stats.championsSinceRelic = 0;
 
    ChatLib.chat('&aYour counter for mythological event has been resetted!');
}).setName('resetmythosbao');

import Settings from '../settings.js';
import Audio from '../utils/audio.js';
import PogObject from 'PogData';

import { delayMessage, formatMoney, getPlayerPOI, getPlayerPos, playSound } from '../utils/functions.js';
import { constrainX, constrainY } from '../utils/functions.js' // padding
import { createGuiCommand, renderGuiPosition } from '../utils/functions.js'; // gui
import { sendMessage } from '../utils/party.js';
import { showAlert } from '../utils/utils.js';
import { getInSkyblock, getInHub } from '../utils/functions.js'; // sb, area
import { baoUtils } from '../utils/utils.js';


////////////////////////////////////////////////////////////////////////////////
// SETUP CONSTS
////////////////////////////////////////////////////////////////////////////////
const mythosAudio = new Audio();
const moveMythosCounter = new Gui(); // bobber count
createGuiCommand(moveMythosCounter, 'movemythoscounter', 'mmc');

const mythosDragText = `&7|| MYTHOS ||\n&7==================\n&7||| Burros Dug: 0\n&7||| Feathers: 0\n&7||| Coins Dug Up: 0\n&7------------------\n&7\n&7|||MinosHunters: 0\n&7|||Lynxes: 0\n&7|||Gaias: 0\n&7|||Minotaurs: 0\n&7|||Champions: 0\n&7||| Inquisitors: 0\n&7------------------\n&7||| 0 0 0\n&7||| 0 0 0\n&7||| 0 0\n&7------------------\n&7|| Kills/Inq: 0\n&7|| Minotaurs/Dae Stick: 0\n&7|| Burrows/CoG: 0\n&7|| Burrows/WuS: 0\n&7|| Champs Since Relic: 0`;

// pogobject
export const baoMythos = new PogObject("bao-dev", {
    "allLines": '',
    "x": 5, 
    "y": 100,
    "stats": { // mythos player info
        "featherCount": 0, 
        "moneyCount": 0, 
        "burrowCount": 0, 
        "ancientClawCount": 0, 
        "anicentClawMoney": 0,

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
}, '/data/baoMythos.json');
baoMythos.autosave(5);

const dts_title = '&2Dwarf Turtle Shelmet' 
const ar_title = '&5Antique Remedies'
const ctp_title = '&5Crochet Tiger Plushie'
const relic_title = '&6Minos Relic'
const cog_title = '&6Crown of Greed'
const wus_title = '&6Washed-up Souvenir'
const dae_title = '&6Daedalus Stick'
const chim_title = '&d&lCHIMERA I'


////////////////////////////////////////////////////////////////////////////////
// REGS
////////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    cancel(event);
}).setCriteria('Follow the arrows to find the treasure!');

// feathers dug up
register('chat', (event) => {
    cancel(event);
    baoMythos.stats.featherCount += 1;
    baoMythos.save();
}).setCriteria('RARE DROP! You dug out a Griffin Feather!');

// coins dug up
register('chat', (money, event) => {
    cancel(event);
    const moneyNoCom = money.toString().replace(/,/g, '');;
    baoMythos.stats.moneyCount += Number(moneyNoCom);
    baoMythos.save();
}).setCriteria('Wow! You dug out ${money} coins!');

// ancient claws sold to npc
register('chat', (amt, coins, event) => {
    baoMythos.stats.ancientClawCount += parseInt(amt);
    baoMythos.stats.ancientClawMoney += parseInt(coins.replace(',', ''), 10);
    baoMythos.save();
}).setCriteria('You sold Ancient Claw x${amt} for ${coins} Coins!');

// burrow digging
register('chat', (event) => {
    cancel(event);
    baoMythos.stats.burrowCount +=1;
    baoMythos.stats.burrowsSinceCOG += 1;
    baoMythos.stats.burrowsSinceWUS += 1;
    baoMythos.save();
}).setCriteria('You dug out a Griffin Burrow!').setContains();

register('chat', (event) => { 
    cancel(event);
    baoMythos.stats.burrowCount +=1;
    baoMythos.stats.burrowsSinceCOG += 1;
    baoMythos.stats.burrowsSinceWUS += 1;
    baoMythos.save();
}).setCriteria('You finished the Griffin burrow chain! (4/4)');

// dwarf turtle shelmet
register('chat', (event) => {
    showAlert(dts_title);
    mythosAudio.playDefaultSound();
    if (baoMythos.stats.DTS === undefined) baoMythos.stats.DTS += 2;
    baoMythos.stats.DTS += 1;
    baoMythos.save();
}).setCriteria('[SBE] RARE DROP! Dwarf Turtle Shelmet');

// antique remedies
register('chat', (event) => {
    showAlert(ar_title);
    mythosAudio.playDefaultSound();
    if (baoMythos.stats.AR === undefined) baoMythos.stats.AR += 2;
    baoMythos.stats.AR += 1;
    baoMythos.save();
}).setCriteria('[SBE] RARE DROP! Antique Remedies');

// crochet tiger plushie
register('chat', (event) => {
    showAlert(ctp_title);
    mythosAudio.playDefaultSound();
    if (baoMythos.stats.CTP === undefined) baoMythos.stats.CTP += 2;
    baoMythos.stats.CTP += 1;
    baoMythos.save();
}).setCriteria('[SBE] RARE DROP! Crochet Tiger Plushie');

// minos relic
register('chat', (event) => {
    showAlert(relic_title);
    sendMessage(`RARE DROP! Minos Relic [${baoMythos.stats.championsSinceRelic} Champ kills]`);
    playSound();
    if (baoMythos.stats.MR === undefined) baoMythos.stats.MR += 2;
    baoMythos.stats.MR += 1;
    baoMythos.save();
}).setCriteria('[SBE] RARE DROP! Minos Relic');

// crown of greed
register('chat', (event) => {
    sendMessage(`RARE DROP! You dug out a Crown of Greed! [${baoMythos.stats.burrowsSinceCOG} burrows]`);
    showAlert(cog_title);
    mythosAudio.playDefaultSound();
    if (baoMythos.stats.CoG === undefined) baoMythos.stats.CoG += 2;
    baoMythos.stats.CoG += 1;
    baoMythos.stats.burrowsSinceCOG = 0;
    baoMythos.save();
}).setCriteria('RARE DROP! You dug out a Crown of Greed!');

// washed up souvenir
register('chat', (event) => {
    sendMessage(`RARE DROP! You dug out a Washed-up Souvenir! [${baoMythos.stats.burrowsSinceWUS} burrows]`);
    showAlert(wus_title);
    mythosAudio.playDefaultSound();
    if (baoMythos.stats.WuS === undefined) baoMythos.stats.WuS += 2;
    baoMythos.stats.WuS += 1;
    baoMythos.stats.burrowsSinceWUS = 0;
    baoMythos.save();
}).setCriteria('RARE DROP! You dug out a Washed-up Souvenir!');

// daedalus stick
register('chat', (mf, event) => {
    sendMessage(`RARE DROP! Daedalus Stick (+${mf}% ✯ Magic Find) [${baoMythos.stats.minotaursSinceDae} Minotaur kills]`)
    showAlert(dae_title);
    playSound();
    if (baoMythos.stats.DS === undefined) baoMythos.stats.DS += 2;
    baoMythos.stats.DS += 1;
    baoMythos.stats.minotaursSinceDae = 0;
    baoMythos.save();
}).setCriteria('RARE DROP! Daedalus Stick (+${mf}% ✯ Magic Find)');

// chimera book
register('chat', (event) => {
    showAlert(chim_title)
    sendMessage('RARE DROP! Enchanted Book');
    if (baoMythos.stats.CHIM === undefined) baoMythos.stats.CHIM += 2;
    baoMythos.stats.CHIM += 1;
    // baoMythos.stats.inqsSinceChim = 0;
    mythosAudio.playDefaultSound();
    baoMythos.save();
}).setCriteria('RARE DROP! Enchanted Book');

// Minos Hunter
register('chat', (event) => {
    cancel(event);
    baoMythos.stats.minosHunterKills += 1; 
    baoMythos.stats.mobsSinceInq += 1; 
    baoMythos.stats.totalMythosKills += 1;
    baoMythos.save();
}).setCriteria('You dug out a Minos Hunter!').setContains();

// Siamese Lynxes
register('chat', (event) => {
    cancel(event);
    baoMythos.stats.siaLynxKills += 1; 
    baoMythos.stats.mobsSinceInq += 1; 
    baoMythos.stats.totalMythosKills += 1;
    baoMythos.save();
}).setCriteria('You dug out Siamese Lynxes!').setContains();

// Gaia Construct
register('chat', (event) => {
    cancel(event);
    baoMythos.stats.gaiaConsKills += 1; 
    baoMythos.stats.mobsSinceInq += 1; 
    baoMythos.stats.totalMythosKills += 1;
    baoMythos.save();
}).setCriteria('You dug out a Gaia Construct!').setContains();

// Minotaur
register('chat', (event) => {
    cancel(event);
    baoMythos.stats.minotaurKills += 1; 
    baoMythos.stats.mobsSinceInq += 1; 
    baoMythos.stats.minotaursSinceDae += 1; 
    baoMythos.stats.totalMythosKills += 1;
    baoMythos.save();
}).setCriteria('You dug out a Minotaur!').setContains();

// Minos Champion
register('chat', (event) => {
    cancel(event);
    baoMythos.stats.championsSinceRelic += 1;
    baoMythos.stats.minosChampKills += 1; 
    baoMythos.stats.mobsSinceInq += 1; 
    baoMythos.stats.totalMythosKills += 1;
    baoMythos.save();
}).setCriteria('You dug out a Minos Champion!').setContains();

// Minos Inquisitor
register('chat', (event) => {
    cancel(event);
    if (Settings.announce_inqs) sendMessage(`${getPlayerPos()} || ${getPlayerPOI()} || Inquisitor`);
    delayMessage('client', `Mobs Since Last Inq: &b${baoMythos.stats.mobsSinceInq} &ckills`, 100);
    playSound();

    baoMythos.stats.minosInqKills += 1; 
    baoMythos.stats.mobsSinceInq = 0; 
    baoMythos.stats.totalMythosKills += 1;
    baoMythos.save();
}).setCriteria('You dug out a Minos Inquisitor!').setContains();




register('step', () => {
    if (!getInSkyblock() || !World.isLoaded() || !getInHub() || !Settings.mythos_main_toggle) return;
    const moneyText = formatMoney(baoMythos.stats.moneyCount)

    const mythosTitle = Settings.mythos_counter_general || Settings.mythos_counter_kills || Settings.mythos_counter_drops || Settings.mythos_counter_averages || Settings.mythos_counter_trackers ? `&3|| &6MYTHOS &3||\n${baoUtils.thickSep}` : '';

    // mythos_counter_general
    let burrowLine = `&4|&3|| &rBurrows Dug: &b${baoMythos.stats.burrowCount}`;
    let featherLine = `&4|&3|| &rFeathers: &b${baoMythos.stats.featherCount}`;
    let moneyLine = `&4|&3|| &rCoins Dug Up: &b${moneyText}`;

    // mythos_counter_kills
    let hunterLine = `&4|&3|| &rMinos Hunters: &b${baoMythos.stats.minosHunterKills}`;
    let lynxLine = `&4|&3|| &rLynxes: &b${baoMythos.stats.siaLynxKills}`;
    let gaiaLine = `&4|&3|| &rGaias: &b${baoMythos.stats.gaiaConsKills}`;
    let minotaurLine = `&4|&3|| &rMinotaurs: &b${baoMythos.stats.minotaurKills}`;
    let championLine = `&4|&3|| &rChampions: &b${baoMythos.stats.minosChampKills}`;
    let inquisitorLine = `&4|&3|| &rInquisitors: &b${baoMythos.stats.minosInqKills}`

    // mythos_counter_drops
    let dtsAmt = baoMythos.stats.DTS > 0 ? baoMythos.stats.DTS : 0;
    let arAmt = baoMythos.stats.AR > 0 ? baoMythos.stats.AR : 0;
    let ctpAmt = baoMythos.stats.CTP > 0 ? baoMythos.stats.CTP : 0;
    let dsAmt = baoMythos.stats.DS > 0 ? baoMythos.stats.DS : 0;
    let cogAmt = baoMythos.stats.CoG > 0 ? baoMythos.stats.CoG : 0;
    let wusAmt = baoMythos.stats.WuS > 0 ? baoMythos.stats.WuS : 0;
    let mrAmt = baoMythos.stats.MR > 0 ? baoMythos.stats.MR : 0;
    let chimAmt = baoMythos.stats.CHIM > 0 ? baoMythos.stats.CHIM : 0;

    let dtsLine = `&rDTS: &b${dtsAmt}`;
    let arLine = `&rAR: &b${arAmt}`;
    let ctpLine = `&rCTP: &b${ctpAmt}`;
    let dsLine = `&rDS: &b${dsAmt}`;
    let cogLine = `&rCoG: &b${cogAmt}`;
    let wusLine = `&rWuS: &b${wusAmt}`;
    let mrLine = `&rMR: &b${mrAmt}`;
    let chimLine = `&rCHIMERA: &b${chimAmt}`;

    let dropsLine1 = `&4|&3|| &r${dtsLine} ${arLine} ${ctpLine}`;
    let dropsLine2 = `&4|&3|| &r${dsLine} ${cogLine} ${wusLine}`;
    let dropsLine3 = `&4|&3|| &r${mrLine} ${chimLine}`;

    // mythos_counter_averages
    let avgInq = (isNaN(baoMythos.stats.totalMythosKills) || isNaN(baoMythos.stats.minosInqKills) || baoMythos.stats.minosInqKills === 0) ? 0 : (baoMythos.stats.totalMythosKills / baoMythos.stats.minosInqKills).toFixed(0);
    let avgDae = (isNaN(baoMythos.stats.minotaurKills) || isNaN(baoMythos.stats.DS) || baoMythos.stats.DS === 0) ? 0 : (baoMythos.stats.minotaurKills / baoMythos.stats.DS).toFixed(0);
    let avgCoG = (isNaN(baoMythos.stats.burrowCount) || isNaN(baoMythos.stats.CoG) || baoMythos.stats.CoG === 0) ? 0 : (baoMythos.stats.burrowCount / baoMythos.stats.CoG).toFixed(2);
    let avgWuS = (isNaN(baoMythos.stats.burrowCount) || isNaN(baoMythos.stats.WuS) || baoMythos.stats.WuS === 0) ? 0 : (baoMythos.stats.burrowCount / baoMythos.stats.WuS).toFixed(2);
    let avgRelic = (isNaN(baoMythos.stats.minosChampKills) || isNaN(baoMythos.stats.MR) || baoMythos.stats.MR === 0) ? 0 : (baoMythos.stats.minosChampKills / baoMythos.stats.MR).toFixed(0);

    let averageInqLine = `&4|&3|| &rKills/Inq: &b${avgInq}`;
    let averageDaeLine = `&4|&3|| &rMinotaurs/Dae Stick: &b${avgDae}`;
    let averageCOGLine = `&4|&3|| &rBurrows/CoG: &b${avgCoG}`;
    let averageWUSLine = `&4|&3|| &rBurrows/WuS: &b${avgWuS}`;
    let averageRelicLine = `&4|&3|| &rChamps/Relic: &b${avgRelic}`;

    // mythos_counter_trackers
    let mobsSinceInqLine = `&6|| &rMobs Since Inq: &c${baoMythos.stats.mobsSinceInq}`;
    let minotaursSinceDaeLine = `&6|| &rMinotaurs Since Dae: &c${baoMythos.stats.minotaursSinceDae}`;
    let burrowsSinceCOGLine = `&6|| &rBurrows Since CoG: &c${baoMythos.stats.burrowsSinceCOG}`;
    let burrowsSinceWUSLine = `&6|| &rMinotaurs Since WuS: &c${baoMythos.stats.burrowsSinceWUS}`;
    let champsSinceRelicLine = `&6|| &rChamps Since Relic: &c${baoMythos.stats.championsSinceRelic}`

    // lines
    const showGeneral = Settings.mythos_counter_general ? [burrowLine, featherLine, moneyLine, baoUtils.thinSep].join('\n') : '';

    const showKills = Settings.mythos_counter_kills ? [hunterLine, lynxLine, gaiaLine, minotaurLine, championLine, inquisitorLine, baoUtils.thinSep].join('\n') : '';

    const showDrops = Settings.mythos_counter_drops ? [dropsLine1, dropsLine2, dropsLine3, baoUtils.thinSep].join('\n') : '';

    const showAverages = Settings.mythos_counter_averages ? [averageInqLine, averageDaeLine, averageCOGLine, averageWUSLine, averageRelicLine, baoUtils.thinSep].join('\n') : '';

    const showTrackers = Settings.mythos_counter_trackers ? [mobsSinceInqLine, minotaursSinceDaeLine, burrowsSinceCOGLine, burrowsSinceWUSLine, champsSinceRelicLine, baoUtils.thinSep].join('\n') : '';

    const mythosDisplayRaw = [mythosTitle, showGeneral, showKills, showDrops, showAverages, showTrackers].join('\n');
    let mythosDisplayFilter = mythosDisplayRaw.replace(/\n{2,}/g, '\n');

    let phraseArray = mythosDisplayFilter.split('\n');
    let lastIdx = -1;
    for (let i = phraseArray.length - 1; i >= 0; i--) {
        if (phraseArray[i].includes(baoUtils.thinSep)) {
            lastIdx = i;
            break;
        }
    }

    if (lastIdx !== -1) {
        phraseArray.splice(lastIdx, 1);
    }
    baoMythos.allLines = phraseArray.join('\n')
}).setFps(1)

register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (moveMythosCounter.isOpen()){
        baoMythos.x = constrainX(x, 3, mythosDragText);
        baoMythos.y = constrainY(y, 3, mythosDragText);
    }
});

register('renderOverlay', () => {
    if (!getInSkyblock() || !World.isLoaded() || !Settings.mythos_main_toggle || !getInHub()) return;
    Renderer.drawStringWithShadow(baoMythos.allLines, baoMythos.x, baoMythos.y);
    renderGuiPosition(moveMythosCounter, baoMythos, mythosDragText);
});

register('chat', (event) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (Settings.hide_griffin_error) cancel(event);
}).setCriteria('You need to equip a LEGENDARY griffin pet to fight this!');

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

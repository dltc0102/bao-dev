import Settings from '../settings.js';
import { data } from '../utils/data.js';
import { constrainX, constrainY, createGuiCommand, delayMessage, formatMoney, getPlayerPOI, getPlayerPos, playSound, renderGuiPosition } from '../utils/functions.js';
import { sendMessage } from '../utils/party.js';
import { showAlert } from '../utils/utils.js';

const dts_title = '&2Dwarf Turtle Shelmet' 
const ar_title = '&5Antique Remedies'
const ctp_title = '&5Crochet Tiger Plushie'
const relic_title = '&6Minos Relic'
const cog_title = '&6Crown of Greed'
const wus_title = '&6Washed-up Souvenir'
const dae_title = '&6Daedalus Stick'
const chim_title = '&d&lCHIMERA I'

register('chat', (event) => {
    // code goes here
    cancel(event);
}).setCriteria('Follow the arrows to find the treasure!');

// feathers dug up
register('chat', (event) => {
    cancel(event);
    data.mythosInfo.counterInfo.featherCount += 1;
}).setCriteria('RARE DROP! You dug out a Griffin Feather!');

// coins dug up
register('chat', (money, event) => {
    cancel(event);
    const moneyStr = money.toString();
    const moneyNoCom = moneyStr.replace(/,/g, '');
    data.mythosInfo.counterInfo.moneyCount += Number(moneyNoCom);
}).setCriteria('Wow! You dug out ${money} coins!');

// burrow digging
register('chat', (event) => {
    cancel(event);
    data.mythosInfo.counterInfo.burrowCount +=1;
    data.mythosInfo.counterInfo.burrowsSinceCOG += 1;
    data.mythosInfo.counterInfo.burrowsSinceWUS += 1;
}).setCriteria('You dug out a Griffin Burrow!').setContains();

register('chat', (event) => { 
    cancel(event);
    data.mythosInfo.counterInfo.burrowCount +=1;
    data.mythosInfo.counterInfo.burrowsSinceCOG += 1;
    data.mythosInfo.counterInfo.burrowsSinceWUS += 1;
}).setCriteria('You finished the Griffin burrow chain! (4/4)');

// dwarf turtle shelmet
register('chat', (event) => {
    showAlert(dts_title);
    data.audioInst.playDefaultSound();
    if (data.mythosInfo.counterInfo.DTS === undefined) data.mythosInfo.counterInfo.DTS += 2;
    data.mythosInfo.counterInfo.DTS += 1;
}).setCriteria('[SBE] RARE DROP! Dwarf Turtle Shelmet');

// antique remedies
register('chat', (event) => {
    showAlert(ar_title);
    data.audioInst.playDefaultSound();
    if (data.mythosInfo.counterInfo.AR === undefined) data.mythosInfo.counterInfo.AR += 2;
    data.mythosInfo.counterInfo.AR += 1;
}).setCriteria('[SBE] RARE DROP! Antique Remedies');

// crochet tiger plushie
register('chat', (event) => {
    showAlert(ctp_title);
    data.audioInst.playDefaultSound();
    if (data.mythosInfo.counterInfo.CTP === undefined) data.mythosInfo.counterInfo.CTP += 2;
    data.mythosInfo.counterInfo.CTP += 1;
}).setCriteria('[SBE] RARE DROP! Crochet Tiger Plushie');

// minos relic
register('chat', (event) => {
    showAlert(relic_title);
    sendMessage(`RARE DROP! Minos Relic [${data.mythosInfo.counterInfo.championsSinceRelic} Champ kills]`);
    playSound();
    if (data.mythosInfo.counterInfo.MR === undefined) data.mythosInfo.counterInfo.MR += 2;
    data.mythosInfo.counterInfo.MR += 1;
}).setCriteria('[SBE] RARE DROP! Minos Relic');

// crown of greed
register('chat', (event) => {
    sendMessage(`RARE DROP! You dug out a Crown of Greed! [${data.mythosInfo.counterInfo.burrowsSinceCOG} burrows]`);
    showAlert(cog_title);
    data.audioInst.playDefaultSound();
    if (data.mythosInfo.counterInfo.CoG === undefined) data.mythosInfo.counterInfo.CoG += 2;
    data.mythosInfo.counterInfo.CoG += 1;
    data.mythosInfo.counterInfo.burrowsSinceCOG = 0;
}).setCriteria('RARE DROP! You dug out a Crown of Greed!');

// washed up souvenir
register('chat', (event) => {
    sendMessage(`RARE DROP! You dug out a Washed-up Souvenir! [${data.mythosInfo.counterInfo.burrowsSinceWUS} burrows]`);
    showAlert(wus_title);
    data.audioInst.playDefaultSound();
    if (data.mythosInfo.counterInfo.WuS === undefined) data.mythosInfo.counterInfo.WuS += 2;
    data.mythosInfo.counterInfo.WuS += 1;
    data.mythosInfo.counterInfo.burrowsSinceWUS = 0;
}).setCriteria('RARE DROP! You dug out a Washed-up Souvenir!');

// daedalus stick
register('chat', (mf, event) => {
    sendMessage(`RARE DROP! Daedalus Stick (+${mf}% ✯ Magic Find) [${data.mythosInfo.counterInfo.minotaursSinceDae} Minotaur kills]`)
    showAlert(dae_title);
    playSound();
    if (data.mythosInfo.counterInfo.DS === undefined) data.mythosInfo.counterInfo.DS += 2;
    data.mythosInfo.counterInfo.DS += 1;
    data.mythosInfo.counterInfo.minotaursSinceDae = 0;
}).setCriteria('RARE DROP! Daedalus Stick (+${mf}% ✯ Magic Find)');

// chimera book
register('chat', (event) => {
    showAlert(chim_title)
    sendMessage('RARE DROP! Enchanted Book');
    if (data.mythosInfo.counterInfo.CHIM === undefined) data.mythosInfo.counterInfo.CHIM += 2;
    data.mythosInfo.counterInfo.CHIM += 1;
    // data.mythosInfo.counterInfo.inqsSinceChim = 0;
    data.audioInst.playDefaultSound();
}).setCriteria('RARE DROP! Enchanted Book');

// Minos Hunter
register('chat', (event) => {
    cancel(event);
    data.mythosInfo.counterInfo.minosHunterKills += 1; 
    data.mythosInfo.counterInfo.mobsSinceInq += 1; 
    data.mythosInfo.counterInfo.totalMythosKills += 1;
}).setCriteria('You dug out a Minos Hunter!').setContains();

// Siamese Lynxes
register('chat', (event) => {
    cancel(event);
    data.mythosInfo.counterInfo.siaLynxKills += 1; 
    data.mythosInfo.counterInfo.mobsSinceInq += 1; 
    data.mythosInfo.counterInfo.totalMythosKills += 1;
}).setCriteria('You dug out Siamese Lynxes!').setContains();

// Gaia Construct
register('chat', (event) => {
    cancel(event);
    data.mythosInfo.counterInfo.gaiaConsKills += 1; 
    data.mythosInfo.counterInfo.mobsSinceInq += 1; 
    data.mythosInfo.counterInfo.totalMythosKills += 1;
}).setCriteria('You dug out a Gaia Construct!').setContains();

// Minotaur
register('chat', (event) => {
    cancel(event);
    data.mythosInfo.counterInfo.minotaurKills += 1; 
    data.mythosInfo.counterInfo.mobsSinceInq += 1; 
    data.mythosInfo.counterInfo.minotaursSinceDae += 1; 
    data.mythosInfo.counterInfo.totalMythosKills += 1;
}).setCriteria('You dug out a Minotaur!').setContains();

// Minos Champion
register('chat', (event) => {
    cancel(event);
    data.mythosInfo.counterInfo.championsSinceRelic += 1;
    data.mythosInfo.counterInfo.minosChampKills += 1; 
    data.mythosInfo.counterInfo.mobsSinceInq += 1; 
    data.mythosInfo.counterInfo.totalMythosKills += 1;
}).setCriteria('You dug out a Minos Champion!').setContains();

// Minos Inquisitor
register('chat', (event) => {
    cancel(event);
    if (Settings.announce_inqs) sendMessage(`${getPlayerPos()} || ${getPlayerPOI()} || Inquisitor`);
    delayMessage('client', `Mobs Since Last Inq: &b${data.mythosInfo.counterInfo.mobsSinceInq} &ckills`, 100);
    playSound();

    data.mythosInfo.counterInfo.minosInqKills += 1; 
    data.mythosInfo.counterInfo.mobsSinceInq = 0; 
    data.mythosInfo.counterInfo.totalMythosKills += 1;
}).setCriteria('You dug out a Minos Inquisitor!').setContains();

data.mythosInfo.counter.movemythoscounter = new Gui(); // bobber count
createGuiCommand(data.mythosInfo.counter.movemythoscounter, 'movemythoscounter', 'mmc')

register('step', () => {
    if (!data.inSkyblock) return;
    if (data.currArea !== 'Hub') return;
    if (!Settings.mythos_main_toggle) return;
    const moneyText = formatMoney(data.mythosInfo.counterInfo.moneyCount)

    mythosTitle = Settings.mythos_counter_general || Settings.mythos_counter_kills || Settings.mythos_counter_drops || Settings.mythos_counter_averages || Settings.mythos_counter_trackers ? `&3|| &6MYTHOS &3||\n${data.thickSep}` : '';

    // mythos_counter_general
    burrowLine = `&4|&3|| &rBurrows Dug: &b${data.mythosInfo.counterInfo.burrowCount}`;
    featherLine = `&4|&3|| &rFeathers: &b${data.mythosInfo.counterInfo.featherCount}`;
    moneyLine = `&4|&3|| &rCoins Dug Up: &b${moneyText}`;

    // mythos_counter_kills
    hunterLine = `&4|&3|| &rMinos Hunters: &b${data.mythosInfo.counterInfo.minosHunterKills}`;
    lynxLine = `&4|&3|| &rLynxes: &b${data.mythosInfo.counterInfo.siaLynxKills}`;
    gaiaLine = `&4|&3|| &rGaias: &b${data.mythosInfo.counterInfo.gaiaConsKills}`;
    minotaurLine = `&4|&3|| &rMinotaurs: &b${data.mythosInfo.counterInfo.minotaurKills}`;
    championLine = `&4|&3|| &rChampions: &b${data.mythosInfo.counterInfo.minosChampKills}`;
    inquisitorLine = `&4|&3|| &rInquisitors: &b${data.mythosInfo.counterInfo.minosInqKills}`

    // mythos_counter_drops
    dtsAmt = data.mythosInfo.counterInfo.DTS > 0 ? data.mythosInfo.counterInfo.DTS : 0;
    arAmt = data.mythosInfo.counterInfo.AR > 0 ? data.mythosInfo.counterInfo.AR : 0;
    ctpAmt = data.mythosInfo.counterInfo.CTP > 0 ? data.mythosInfo.counterInfo.CTP : 0;
    dsAmt = data.mythosInfo.counterInfo.DS > 0 ? data.mythosInfo.counterInfo.DS : 0;
    cogAmt = data.mythosInfo.counterInfo.CoG > 0 ? data.mythosInfo.counterInfo.CoG : 0;
    wusAmt = data.mythosInfo.counterInfo.WuS > 0 ? data.mythosInfo.counterInfo.WuS : 0;
    mrAmt = data.mythosInfo.counterInfo.MR > 0 ? data.mythosInfo.counterInfo.MR : 0;
    chimAmt = data.mythosInfo.counterInfo.CHIM > 0 ? data.mythosInfo.counterInfo.CHIM : 0;

    dtsLine = `&rDTS: &b${dtsAmt}`;
    arLine = `&rAR: &b${arAmt}`;
    ctpLine = `&rCTP: &b${ctpAmt}`;
    dsLine = `&rDS: &b${dsAmt}`;
    cogLine = `&rCoG: &b${cogAmt}`;
    wusLine = `&rWuS: &b${wusAmt}`;
    mrLine = `&rMR: &b${mrAmt}`;
    chimLine = `&rCHIMERA: &b${chimAmt}`;

    dropsLine1 = `&4|&3|| &r${dtsLine} ${arLine} ${ctpLine}`;
    dropsLine2 = `&4|&3|| &r${dsLine} ${cogLine} ${wusLine}`;
    dropsLine3 = `&4|&3|| &r${mrLine} ${chimLine}`;

    // mythos_counter_averages
    avgInq = (isNaN(data.mythosInfo.counterInfo.totalMythosKills) || isNaN(data.mythosInfo.counterInfo.minosInqKills) || data.mythosInfo.counterInfo.minosInqKills === 0) ? 0 : (data.mythosInfo.counterInfo.totalMythosKills / data.mythosInfo.counterInfo.minosInqKills).toFixed(0);
    avgDae = (isNaN(data.mythosInfo.counterInfo.minotaurKills) || isNaN(data.mythosInfo.counterInfo.DS) || data.mythosInfo.counterInfo.DS === 0) ? 0 : (data.mythosInfo.counterInfo.minotaurKills / data.mythosInfo.counterInfo.DS).toFixed(0);
    avgCoG = (isNaN(data.mythosInfo.counterInfo.burrowCount) || isNaN(data.mythosInfo.counterInfo.CoG) || data.mythosInfo.counterInfo.CoG === 0) ? 0 : (data.mythosInfo.counterInfo.burrowCount / data.mythosInfo.counterInfo.CoG).toFixed(2);
    avgWuS = (isNaN(data.mythosInfo.counterInfo.burrowCount) || isNaN(data.mythosInfo.counterInfo.WuS) || data.mythosInfo.counterInfo.WuS === 0) ? 0 : (data.mythosInfo.counterInfo.burrowCount / data.mythosInfo.counterInfo.WuS).toFixed(2);
    avgRelic = (isNaN(data.mythosInfo.counterInfo.minosChampKills) || isNaN(data.mythosInfo.counterInfo.MR) || data.mythosInfo.counterInfo.MR === 0) ? 0 : (data.mythosInfo.counterInfo.minosChampKills / data.mythosInfo.counterInfo.MR).toFixed(0);

    averageInqLine = `&4|&3|| &rKills/Inq: &b${avgInq}`;
    averageDaeLine = `&4|&3|| &rMinotaurs/Dae Stick: &b${avgDae}`;
    averageCOGLine = `&4|&3|| &rBurrows/CoG: &b${avgCoG}`;
    averageWUSLine = `&4|&3|| &rBurrows/WuS: &b${avgWuS}`;
    averageRelicLine = `&4|&3|| &rChamps/Relic: &b${avgRelic}`;

    // mythos_counter_trackers
    mobsSinceInqLine = `&6|| &rMobs Since Inq: &c${data.mythosInfo.counterInfo.mobsSinceInq}`;
    minotaursSinceDaeLine = `&6|| &rMinotaurs Since Dae: &c${data.mythosInfo.counterInfo.minotaursSinceDae}`;
    burrowsSinceCOGLine = `&6|| &rBurrows Since CoG: &c${data.mythosInfo.counterInfo.burrowsSinceCOG}`;
    burrowsSinceWUSLine = `&6|| &rMinotaurs Since WuS: &c${data.mythosInfo.counterInfo.burrowsSinceWUS}`;
    champsSinceRelicLine = `&6|| &rChamps Since Relic: &c${data.mythosInfo.counterInfo.championsSinceRelic}`

    // lines
    let showGeneral = Settings.mythos_counter_general ? [burrowLine, featherLine, moneyLine, data.thinSep].join('\n') : '';

    let showKills = Settings.mythos_counter_kills ? [hunterLine, lynxLine, gaiaLine, minotaurLine, championLine, inquisitorLine, data.thinSep].join('\n') : '';

    let showDrops = Settings.mythos_counter_drops ? [dropsLine1, dropsLine2, dropsLine3, data.thinSep].join('\n') : '';

    let showAverages = Settings.mythos_counter_averages ? [averageInqLine, averageDaeLine, averageCOGLine, averageWUSLine, averageRelicLine, data.thinSep].join('\n') : '';

    let showTrackers = Settings.mythos_counter_trackers ? [mobsSinceInqLine, minotaursSinceDaeLine, burrowsSinceCOGLine, burrowsSinceWUSLine, champsSinceRelicLine, data.thinSep].join('\n') : '';

    let mythosDisplayRaw = [mythosTitle, showGeneral, showKills, showDrops, showAverages, showTrackers].join('\n');
    let mythosDisplayFilter = mythosDisplayRaw.replace(/\n{2,}/g, '\n');

    let phraseArray = mythosDisplayFilter.split('\n');
    let lastIdx = -1;
    for (let i = phraseArray.length - 1; i >= 0; i--) {
        if (phraseArray[i].includes(data.thinSep)) {
            lastIdx = i;
            break;
        }
    }

    if (lastIdx !== -1) {
        phraseArray.splice(lastIdx, 1);
    }
    data.mythosInfo.counter.allLines = phraseArray.join('\n')
}).setFps(1)

register('dragged', (dx, dy, x, y) => {
    if (!data.inSkyblock) return;
    if (data.mythosInfo.counter.movemythoscounter.isOpen()){
        data.mythosInfo.counter.x = constrainX(x, 3, data.mythosInfo.counter.allLines);
        data.mythosInfo.counter.y = constrainY(y, 3, data.mythosInfo.counter.allLines);
    }
});

register('renderOverlay', () => {
    if (!data.inSkyblock) return;
    if (!Settings.mythos_main_toggle) return;
    if (data.currArea !== 'Hub') return;
    Renderer.drawStringWithShadow(data.mythosInfo.counter.allLines, data.mythosInfo.counter.x, data.mythosInfo.counter.y);
    renderGuiPosition(data.mythosInfo.counter.movemythoscounter, data.mythosInfo.counter, `|| MYTHOS ||\n${data.thickSep}\n||| Burros Dug: 0\n||| Feathers: 0\n||| Coins Dug Up: 0\n${data.thinSep}\n\n|||MinosHunters: 0\n|||Lynxes: 0\n|||Gaias: 0\n|||Minotaurs: 0\n|||Champions: 0\n||| Inquisitors: 0\n${data.thinSep}\n||| 0 0 0\n||| 0 0 0\n||| 0 0\n${data.thinSep}\n|| Kills/Inq: 0\n|| Minotaurs/Dae Stick: 0\n|| Burrows/CoG: 0\n|| Burrows/WuS: 0\n|| Champs Since Relic: 0`);
});

register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (Settings.hide_griffin_error) cancel(event);
}).setCriteria('You need to equip a LEGENDARY griffin pet to fight this!');

register('command', () => {
    ChatLib.chat(`&6|| &rMobs Since Inq: &c${data.mythosInfo.counterInfo.mobsSinceInq}`);
    ChatLib.chat(`&6|| &rMinotaurs Since Dae: &c${data.mythosInfo.counterInfo.minotaursSinceDae}`);
    ChatLib.chat(`&6|| &rBurrows Since CoG: &c${data.mythosInfo.counterInfo.burrowsSinceCOG}`);
    ChatLib.chat(`&6|| &rMinotaurs Since WuS: &c${data.mythosInfo.counterInfo.burrowsSinceWUS}`);
    ChatLib.chat(`&6|| &rChamps Since Relic: &c${data.mythosInfo.counterInfo.championsSinceRelic}`);
}).setName('mythostats');

register('command', () => {
    data.mythosInfo.counterInfo.featherCount = 0;
    data.mythosInfo.counterInfo.moneyCount = 0;
    data.mythosInfo.counterInfo.burrowCount = 0;

    data.mythosInfo.counterInfo.minosHunterKills = 0;
    data.mythosInfo.counterInfo.siaLynxKills = 0;
    data.mythosInfo.counterInfo.gaiaConsKills = 0;
    data.mythosInfo.counterInfo.minotaurKills = 0;
    data.mythosInfo.counterInfo.minosChampKills = 0;
    data.mythosInfo.counterInfo.minosInqKills = 0;
    data.mythosInfo.counterInfo.totalMythosKills = 0;
    
    data.mythosInfo.counterInfo.DTS = 0;
    data.mythosInfo.counterInfo.AR = 0;
    data.mythosInfo.counterInfo.CTP = 0;
    data.mythosInfo.counterInfo.DS = 0;
    data.mythosInfo.counterInfo.CoG = 0;
    data.mythosInfo.counterInfo.WuS = 0;
    data.mythosInfo.counterInfo.MR = 0;
    data.mythosInfo.counterInfo.CHIM = 0;

    data.mythosInfo.counterInfo.mobsSinceInq = 0;
    data.mythosInfo.counterInfo.minotaursSinceDae = 0;
    data.mythosInfo.counterInfo.burrowsSinceCOG = 0;
    data.mythosInfo.counterInfo.burrowsSinceWUS = 0;
    data.mythosInfo.counterInfo.championsSinceRelic = 0;

    data.mythosInfo.counterInfo.cachedMobsSinceInq = 0;
    data.mythosInfo.counterInfo.cachedMinotaursSinceDae = 0;
    data.mythosInfo.counterInfo.cachedBurrowsSinceCOG = 0;
    data.mythosInfo.counterInfo.cachedBurrowsSinceWUS = 0;
    data.mythosInfo.counterInfo.cachedChampionsSinceRelic = 0;

    ChatLib.chat('&aYour counter for mythological event has been resetted!');
}).setName('resetmythosbao');

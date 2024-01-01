import Settings from '../settings.js';
import { data } from '../utils/data.js';
import { sendMessage } from '../utils/party.js';
import { showAlert } from '../utils/utils.js';
import { playSound, getPlayerPos, getPlayerPOI, delayMessage, formatMoney } from '../utils/functions.js';

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
    data.MPI.featherCount += 1;
}).setCriteria('RARE DROP! You dug out a Griffin Feather!');

// coins dug up
register('chat', (money, event) => {
    cancel(event);
    var moneyStr = money.toString();
    var moneyNoCom = moneyStr.replace(/,/g, '');
    data.MPI.moneyCount += Number(moneyNoCom);
}).setCriteria('Wow! You dug out ${money} coins!');

// burrow digging
register('chat', (event) => {
    cancel(event);
    data.MPI.burrowCount +=1;
    data.MPI.burrowsSinceCOG += 1;
    data.MPI.burrowsSinceWUS += 1;
}).setCriteria('You dug out a Griffin Burrow!').setContains();

register('chat', (event) => { 
    cancel(event);
    data.MPI.burrowCount +=1;
    data.MPI.burrowsSinceCOG += 1;
    data.MPI.burrowsSinceWUS += 1;
}).setCriteria('You finished the Griffin burrow chain! (4/4)');

// dwarf turtle shelmet
register('chat', (event) => {
    showAlert(dts_title);
    data.audioInst.playDefaultSound();
    if (data.MPI.DTS === undefined) data.MPI.DTS += 2;
    data.MPI.DTS += 1;
}).setCriteria('[SBE] RARE DROP! Dwarf Turtle Shelmet');

// antique remedies
register('chat', (event) => {
    showAlert(ar_title);
    data.audioInst.playDefaultSound();
    if (data.MPI.AR === undefined) data.MPI.AR += 2;
    data.MPI.AR += 1;
}).setCriteria('[SBE] RARE DROP! Antique Remedies');

// crochet tiger plushie
register('chat', (event) => {
    showAlert(ctp_title);
    data.audioInst.playDefaultSound();
    if (data.MPI.CTP === undefined) data.MPI.CTP += 2;
    data.MPI.CTP += 1;
}).setCriteria('[SBE] RARE DROP! Crochet Tiger Plushie');

// minos relic
register('chat', (event) => {
    showAlert(relic_title);
    sendMessage(`RARE DROP! Minos Relic [${data.MPI.championsSinceRelic} Champ kills]`);
    playSound();
    if (data.MPI.MR === undefined) data.MPI.MR += 2;
    data.MPI.MR += 1;
}).setCriteria('[SBE] RARE DROP! Minos Relic');

// crown of greed
register('chat', (event) => {
    sendMessage(`RARE DROP! You dug out a Crown of Greed! [${data.MPI.burrowsSinceCOG} burrows]`);
    showAlert(cog_title);
    data.audioInst.playDefaultSound();
    if (data.MPI.CoG === undefined) data.MPI.CoG += 2;
    data.MPI.CoG += 1;
    data.MPI.burrowsSinceCOG = 0;
}).setCriteria('RARE DROP! You dug out a Crown of Greed!');

// washed up souvenir
register('chat', (event) => {
    sendMessage(`RARE DROP! You dug out a Washed-up Souvenir! [${data.MPI.burrowsSinceWUS} burrows]`);
    showAlert(wus_title);
    data.audioInst.playDefaultSound();
    if (data.MPI.WuS === undefined) data.MPI.WuS += 2;
    data.MPI.WuS += 1;
    data.MPI.burrowsSinceWUS = 0;
}).setCriteria('RARE DROP! You dug out a Washed-up Souvenir!');

// daedalus stick
register('chat', (mf, event) => {
    sendMessage(`RARE DROP! Daedalus Stick (+${mf}% ✯ Magic Find) [${data.MPI.minotaursSinceDae} Minotaur kills]`)
    showAlert(dae_title);
    playSound();
    if (data.MPI.DS === undefined) data.MPI.DS += 2;
    data.MPI.DS += 1;
    data.MPI.minotaursSinceDae = 0;
}).setCriteria('RARE DROP! Daedalus Stick (+${mf}% ✯ Magic Find)');

// chimera book
register('chat', (event) => {
    showAlert(chim_title)
    sendMessage('RARE DROP! Enchanted Book');
    if (data.MPI.CHIM === undefined) data.MPI.CHIM += 2;
    data.MPI.CHIM += 1;
    // data.MPI.inqsSinceChim = 0;
    data.audioInst.playDefaultSound();
}).setCriteria('RARE DROP! Enchanted Book');

// Minos Hunter
register('chat', (event) => {
    cancel(event);
    data.MPI.minosHunterKills += 1; 
    data.MPI.mobsSinceInq += 1; 
    data.MPI.totalMythosKills += 1;
}).setCriteria('You dug out a Minos Hunter!').setContains();

// Siamese Lynxes
register('chat', (event) => {
    cancel(event);
    data.MPI.siaLynxKills += 1; 
    data.MPI.mobsSinceInq += 1; 
    data.MPI.totalMythosKills += 1;
}).setCriteria('You dug out Siamese Lynxes!').setContains();

// Gaia Construct
register('chat', (event) => {
    cancel(event);
    data.MPI.gaiaConsKills += 1; 
    data.MPI.mobsSinceInq += 1; 
    data.MPI.totalMythosKills += 1;
}).setCriteria('You dug out a Gaia Construct!').setContains();

// Minotaur
register('chat', (event) => {
    cancel(event);
    data.MPI.minotaurKills += 1; 
    data.MPI.mobsSinceInq += 1; 
    data.MPI.minotaursSinceDae += 1; 
    data.MPI.totalMythosKills += 1;
}).setCriteria('You dug out a Minotaur!').setContains();

// Minos Champion
register('chat', (event) => {
    cancel(event);
    data.MPI.championsSinceRelic += 1;
    data.MPI.minosChampKills += 1; 
    data.MPI.mobsSinceInq += 1; 
    data.MPI.totalMythosKills += 1;
}).setCriteria('You dug out a Minos Champion!').setContains();

// Minos Inquisitor
register('chat', (event) => {
    cancel(event);
    if (Settings.announce_inqs) sendMessage(`${getPlayerPos()} || ${getPlayerPOI()} || Inquisitor`);
    delayMessage('client', `Mobs Since Last Inq: &b${data.MPI.mobsSinceInq} &ckills`, 100);
    playSound();

    data.MPI.minosInqKills += 1; 
    data.MPI.mobsSinceInq = 0; 
    data.MPI.totalMythosKills += 1;
}).setCriteria('You dug out a Minos Inquisitor!').setContains();

register('command', () => {
    data.MPI.featherCount = 0;
    data.MPI.moneyCount = 0;
    data.MPI.burrowCount = 0;

    data.MPI.minosHunterKills = 0;
    data.MPI.siaLynxKills = 0;
    data.MPI.gaiaConsKills = 0;
    data.MPI.minotaurKills = 0;
    data.MPI.minosChampKills = 0;
    data.MPI.minosInqKills = 0;
    data.MPI.totalMythosKills = 0;
    
    data.MPI.DTS = 0;
    data.MPI.AR = 0;
    data.MPI.CTP = 0;
    data.MPI.DS = 0;
    data.MPI.CoG = 0;
    data.MPI.WuS = 0;
    data.MPI.MR = 0;
    data.MPI.CHIM = 0;

    data.MPI.mobsSinceInq = 0;
    data.MPI.minotaursSinceDae = 0;
    data.MPI.burrowsSinceCOG = 0;
    data.MPI.burrowsSinceWUS = 0;
    data.MPI.championsSinceRelic = 0;

    data.MPI.cachedMobsSinceInq = 0;
    data.MPI.cachedMinotaursSinceDae = 0;
    data.MPI.cachedBurrowsSinceCOG = 0;
    data.MPI.cachedBurrowsSinceWUS = 0;
    data.MPI.cachedChampionsSinceRelic = 0;

    ChatLib.chat('&aYour counter for mythological event has been resetted!');
}).setName('resetmythosbao');

let allMythoLines = '';
register('step', () => {
    if (!data.inSkyblock) return;
    if (data.currArea !== 'Hub') return;
    if (!Settings.mythos_main_toggle) return;
    const moneyText = formatMoney(data.MPI.moneyCount)

    const mythosTitleLine = `&3|| &6MYTHOS &3||`;
    const thickSeparatorLine = `==================`;
    const thinSeparatorLine = `------------------`

    const burrowLine = `&4|&3|| &rBurrows Dug: &b${data.MPI.burrowCount}`;
    const featherLine = `&4|&3|| &rFeathers: &b${data.MPI.featherCount}`;
    const moneyLine = `&4|&3|| &rCoins Dug Up: &b${moneyText}`;
    const generalLines = Settings.mythos_counter_general ? `${burrowLine}\n${featherLine}\n${moneyLine}\n${thinSeparatorLine}` : '';

    const hunterLine = `&4|&3|| &rMinos Hunters: &b${data.MPI.minosHunterKills}`;
    const lynxLine = `&4|&3|| &rLynxes: &b${data.MPI.siaLynxKills}`;
    const gaiaLine = `&4|&3|| &rGaias: &b${data.MPI.gaiaConsKills}`;
    const minotaurLine = `&4|&3|| &rMinotaurs: &b${data.MPI.minotaurKills}`;
    const championLine = `&4|&3|| &rChampions: &b${data.MPI.minosChampKills}`;
    const inquisitorLine = `&4|&3|| &rInquisitors: &b${data.MPI.minosInqKills}`
    const killLines = Settings.mythos_counter_kills ? `${hunterLine}\n${lynxLine}\n${gaiaLine}\n${minotaurLine}\n${championLine}\n${inquisitorLine}\n${thinSeparatorLine}` : '';

    const dtsAmt = data.MPI.DTS > 0 ? data.MPI.DTS : 0;
    const arAmt = data.MPI.AR > 0 ? data.MPI.AR : 0;
    const ctpAmt = data.MPI.CTP > 0 ? data.MPI.CTP : 0;
    const dsAmt = data.MPI.DS > 0 ? data.MPI.DS : 0;
    const cogAmt = data.MPI.CoG > 0 ? data.MPI.CoG : 0;
    const wusAmt = data.MPI.WuS > 0 ? data.MPI.WuS : 0;
    const mrAmt = data.MPI.MR > 0 ? data.MPI.MR : 0;
    const chimAmt = data.MPI.CHIM > 0 ? data.MPI.CHIM : 0;

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
    const allDropsLines = Settings.mythos_counter_drops ? `${dropsLine1}\n${dropsLine2}\n${dropsLine3}\n${thinSeparatorLine}` : '';

    const avgInq = (isNaN(data.MPI.totalMythosKills) || isNaN(data.MPI.minosInqKills) || data.MPI.minosInqKills === 0) ? 0 : (data.MPI.totalMythosKills / data.MPI.minosInqKills).toFixed(0);
    const avgDae = (isNaN(data.MPI.minotaurKills) || isNaN(data.MPI.DS) || data.MPI.DS === 0) ? 0 : (data.MPI.minotaurKills / data.MPI.DS).toFixed(0);
    const avgCoG = (isNaN(data.MPI.burrowCount) || isNaN(data.MPI.CoG) || data.MPI.CoG === 0) ? 0 : (data.MPI.burrowCount / data.MPI.CoG).toFixed(2);
    const avgWuS = (isNaN(data.MPI.burrowCount) || isNaN(data.MPI.WuS) || data.MPI.WuS === 0) ? 0 : (data.MPI.burrowCount / data.MPI.WuS).toFixed(2);
    const avgRelic = (isNaN(data.MPI.minosChampKills) || isNaN(data.MPI.MR) || data.MPI.MR === 0) ? 0 : (data.MPI.minosChampKills / data.MPI.MR).toFixed(0);

    const averageInqLine = `&4|&3|| &rKills/Inq: &b${avgInq}`;
    const averageDaeLine = `&4|&3|| &rMinotaurs/Dae Stick: &b${avgDae}`;
    const averageCOGLine = `&4|&3|| &rBurrows/CoG: &b${avgCoG}`;
    const averageWUSLine = `&4|&3|| &rBurrows/WuS: &b${avgWuS}`;
    const averageRelicLine = `&4|&3|| &rChamps/Relic: &b${avgRelic}`;
    const allAvgLines = Settings.mythos_counter_averages ? `${averageInqLine}\n${averageDaeLine}\n${averageCOGLine}\n${averageWUSLine}\n${averageRelicLine}\n${thinSeparatorLine}` : '';

    const mobsSinceInqLine = `&6|| &rMobs Since Inq: &c${data.MPI.mobsSinceInq}`;
    const minotaursSinceDaeLine = `&6|| &rMinotaurs Since Dae: &c${data.MPI.minotaursSinceDae}`;
    const burrowsSinceCOGLine = `&6|| &rBurrows Since CoG: &c${data.MPI.burrowsSinceCOG}`;
    const burrowsSinceWUSLine = `&6|| &rMinotaurs Since WuS: &c${data.MPI.burrowsSinceWUS}`;
    const champsSinceRelicLine = `&6|| &rChamps Since Relic: &c${data.MPI.championsSinceRelic}`
    const trackerLines = Settings.mythos_counter_trackers ? `${mobsSinceInqLine}\n${minotaursSinceDaeLine}\n${burrowsSinceCOGLine}\n${burrowsSinceWUSLine}\n${champsSinceRelicLine}\n${thinSeparatorLine}` : '';

    const inRangeSymbol = '&a&l✔&r'
    const notInRangeSymbol = '&c&l✖&r'
    // const inLSRangeLine = `&c||| &6In LS Range: &r[${inRangeSymbol}]`

    allMythoLines = `${mythosTitleLine}\n${thickSeparatorLine}\n${generalLines}\n${killLines}\n${allDropsLines}\n${allAvgLines}\n${trackerLines}`.replace(/\n{3,}/g, '\n');
}).setFps(1)

register('renderOverlay', () => {
    if (!data.inSkyblock) return;
    if (!Settings.mythos_main_toggle) return;
    if (data.currArea !== 'Hub') return;
    Renderer.drawStringWithShadow(allMythoLines, 5, 100);
});

register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.hide_griffin_error) return;
    cancel(event);
}).setCriteria('You need to equip a LEGENDARY griffin pet to fight this!');

register('command', () => {
    ChatLib.chat(`&6|| &rMobs Since Inq: &c${data.MPI.mobsSinceInq}`);
    ChatLib.chat(`&6|| &rMinotaurs Since Dae: &c${data.MPI.minotaursSinceDae}`);
    ChatLib.chat(`&6|| &rBurrows Since CoG: &c${data.MPI.burrowsSinceCOG}`);
    ChatLib.chat(`&6|| &rMinotaurs Since WuS: &c${data.MPI.burrowsSinceWUS}`);
    ChatLib.chat(`&6|| &rChamps Since Relic: &c${data.MPI.championsSinceRelic}`);
}).setName('mythostats');


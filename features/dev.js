import Settings from '../config1/settings.js';
import PogObject from 'PogData';
import Audio from '../utils/audio.js';

import { registerWhen, timeThis, showAlert } from "../utils/utils";
import { getInSkyblock, checkLSRange, getHealth } from '../utils/functions.js';
import { getPList, sendMessage } from '../utils/party.js';
import { createGuiCommand, renderGuiPosition } from '../utils/functions.js';


////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const devAudio = new Audio();

const moveHPDisplay = new Gui();
createGuiCommand(moveHPDisplay, 'movehpdisplay', 'mhp');
const hpDisplayDraggable = '&7[Lv1000] BigForeheadMob 500M/500M❤';

export const devDisplay = new PogObject("bao-dev", {
    "x": 200, 
    "y": 300,
}, '/data/devDisplay.json');
devDisplay.autosave(5);

const entityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

const jawbusRegex = /﴾ \[Lv(.+)] Lord Jawbus (.+[?Mk])\/(.+[?Mk])❤ ﴿/;
const followerRegex = /\[Lv(.+)] Jawbus Follower (.+[?Mk])\/(.+[?Mk])❤/;
const thunderRegex = /﴾ \[Lv(.+)] Thunder (.+[?Mk])\/(.+[?Mk])❤ ﴿/;
const vanqRegex = /\[Lv(.+)] Vanquisher (.+[?Mk])\/(.+[?Mk])❤/;
const reinRegex = /\[Lv(.+)] Reindrake (.+)\/(.+)❤/;
const yetiRegex = /\[Lv(.+)] Yeti (.+[?Mk])\/(.+[?Mk])❤/;
const gwSharkRegex = /\[Lv(.+)] Great White Shark (.+[?Mk])\/(1\.5M)❤/;
const ckingRegex = /\[Lv(.+) Carrot King(.+[?Mk])\/(.+[?Mk])❤/;
const hydraRegex = /\[Lv(.+)] Water Hydra (.+[?Mk])\/(.+[?Mk])❤/;
const seaEmpRegex = /\[Lv(.+)] Sea Emperor (.+[?Mk])\/(.+[?Mk])❤/;
const phantomRegex = /\[Lv(.+)] Phantom Fisherman (.+[?Mk])\/(.+[?Mk])❤/;
const reaperRegex = /\[Lv(.+)] Grim Reaper (.+[?Mk])\/(.+[?Mk])❤/;
const minerRegex = /\[Lv(.+)] Abyssal Miner (.+[?Mk])\/(.+[?Mk])❤/;
const plhlegRegex = /\[Lv(.+)] Plhlegblast (.+[?Mk])\/(.+[?Mk])❤/;
const moogmaRegex = /\[Lv(.+)] Moogma (.+[?Mk])\/(.+[?Mk])❤/;

let specifiedMobs = [];

const mobSettings = [
    { condition: Settings.jawbus_hp, mob: 'Jawbus' }, 
    { condition: Settings.thunder_hp, mob: 'Thunder' },
    { condition: Settings.vanq_hp, mob: 'Vanquisher' },
    { condition: Settings.rein_hp, mob: 'Reindrake' },
    { condition: Settings.yeti_hp, mob: 'Yeti' },
    { condition: Settings.gwshark_hp, mob: 'Great White Shark' },
    { condition: Settings.carrotking_hp, mob: 'Carrot King' },
    { condition: Settings.waterhydra_hp, mob: 'Water Hydra' },
    { condition: Settings.sea_emp_hp, mob: 'Sea Emperor' },
    { condition: Settings.reaper_hp, mob: 'Grim Reaper' },
    { condition: Settings.phantom_fisher_hp, mob: 'Phantom Fisher' },
    { condition: Settings.mythos_hp, mob: 'Exalted Minos Hunter' },
    { condition: Settings.mythos_hp, mob: 'Bagheera' },
    { condition: Settings.mythos_hp, mob: 'Exalted Minotaur' },
    { condition: Settings.mythos_hp, mob: 'Exalted Gaia Construct' },
    { condition: Settings.mythos_hp, mob: 'Exalted Minos Champion' },
    { condition: Settings.mythos_hp, mob: 'Exalted Minos Inquisitor' },
    { condition: Settings.abyssal_miner_hp, mob: 'Abyssal Miner' },
    { condition: Settings.plhleg_hp, mob: 'Plhlegblast' },
    { condition: true, mob: 'Moogma' },
];

// found counters
const mobInfos = {
    "jawbus": {
        alert: "&4&lJAWBUS",
        name: "Lord Jawbus",
        numFound: 0,
        infos: [],
    },
    "follower": {
        name: "Jawbus Follower",
        numFound: 0,
        infos: [],
    },
    "thunder": {
        alert: "&b&lTHUNDER",
        name: "Thunder",
        numFound: 0,
        infos: [],
    }, 
    "vanquisher": {
        alert: "&5&lVANQUISHER", 
        name: "Vanquisher",
        numFound: 0,
        infos: [],
    }, 
    "reindrake": {
        alert: "&c&lREINDRAKE", 
        name: "Reindrake",
        numFound: 0,
        infos: [],
    }, 
    "yeti": {
        alert: "&f5&lYETI", 
        name: "Yeti",
        numFound: 0,
        infos: [],
    }, 
    "greatWhite": {
        alert: "&3&lGREAT WHITE SHARK", 
        name: "Great White Shark",
        numFound: 0,
        infos: [],
    }, 
    "carrotKing": {
        alert: "&6&lCARROT KING", 
        name: "Carrot King",
        numFound: 0,
        infos: [],
    }, 
    "hydra": {
        alert: "&1&lWATER HYDRA", 
        name: "Water Hydra",
        numFound: 0,
        infos: [],
    }, 
    "emperor": {
        alert: "&e&lSEA EMPEROR", 
        name: "Sea Emperor",
        numFound: 0,
        infos: [],
    }, 
    "reaper": {
        alert: "&5&lGRIM REAPER", 
        name: "Grim Reaper",
        numFound: 0,
        infos: [],
    }, 
    "phantom": {
        alert: "&d&lPHANTOM FISHER", 
        name: "Phantom Fisherman",
        numFound: 0,
        infos: [],
    },
    "moogma": {
        alert: "&c&lMOOGMA", 
        name: "Moogma",
        numFound: 0, 
        infos: [],
    },
};


const mobInfosConfig = {
    'Jawbus': { regex: jawbusRegex, key: 'jawbus', fullName: 'Lord Jawbus', colorF: '&4&l' },
    'Follower': { regex: followerRegex, key: 'follower', fullName: 'Jawbus Follower', colorF: '&c&l' },
    'Thunder': { regex: thunderRegex, key: 'thunder', fullName: 'Thunder', colorF: '&b&l' },
    'Vanquisher': { regex: vanqRegex, key: 'vanquisher', fullName: 'Vanquisher', colorF: '&5&l' },
    'Reindrake': { regex: reinRegex, key: 'reindrake', fullName: 'Reindrake', colorF: '&c&l' },
    'Plhlegblast': { regex: plhlegRegex, key: 'plhlegblast', fullName: 'Plhlegblast', colorF: '&6&l' },
    'Yeti': { regex: yetiRegex, key: 'yeti', fullName: 'Yeti', colorF: '&f&l' },
    'Great White Shark': { regex: gwSharkRegex, key: 'greatWhite', fullName: 'Great White Shark', colorF: '&3&l' },
    'Carrot King': { regex: ckingRegex, key: 'carrotKing', fullName: 'Carrot King', colorF: '&6&l' },
    'Water Hydra': { regex: hydraRegex, key: 'hydra', fullName: 'Water Hydra', colorF: '&1&l' },
    'Sea Emperor': { regex: seaEmpRegex, key: 'emperor', fullName: 'Sea Emperor', colorF: '&e&l' },
    'Grim Reaper': { regex: reaperRegex, key: 'reaper', fullName: 'Grim Reaper', colorF: '&5&l' },
    'Phantom Fisher': { regex: phantomRegex, key: 'phantom', fullName: 'Phantom Fisherman', colorF: '&d&l' }, 
    'Abyssal Miner': { regex: minerRegex, key: 'miner', fullName: 'Abyssal Miner', colorF: '&2&l' }, 
    'Moogma': { regex: moogmaRegex, key: 'moogma', fullName: 'Moogma', colorF: '&6&l' },
};


////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function removeFromList(L, obj) {
    return L.filter(item => item !== obj);
}

function parseMobInfos(name, nameRegex, infos, key, entityFullName, colorText, rangeText) {
    let keyMatch = name.match(nameRegex);
    if (keyMatch) {
        infos[key].infos.push({ fullName: entityFullName, lvl: keyMatch[1], currhp: keyMatch[2], totalhp: keyMatch[3], nameColor: colorText, inRange: rangeText });
        infos[key].numFound += 1;
    };
};

function resetInfos(infos) {
    Object.keys(infos).forEach(key => {
        infos[key].numFound = 0;
        infos[key].infos = [];
    });
};

function getWidth(str) {
    return Renderer.getStringWidth(str);
};

function halfOf(x) {
    return x / 2;
};

function drawHPBar(hpInfo, displayPos, numFound, type=0) {
    // fullName
    // lvl
    // currhp
    // totalhp
    // nameColor
    // inRange
    const currHP = getHealth(hpInfo.currhp);
    const totalHP = getHealth(hpInfo.totalhp);
    const maxHPLength = Renderer.screen.getWidth() / 6;
    const currHPLength = (currHP / totalHP) * maxHPLength;

    const rangeText = `&f[${hpInfo.inRange}&f]&r`;
    const levelText = `&7[Lv${hpInfo.lvl}]&r`;
    const mobText = `${hpInfo.nameColor}${hpInfo.fullName}&r`;
    const heartIcon = '&c❤&r';
    const healthText = `&r&f${currHP}/${totalHP}${heartIcon}`;
    const defaultDisplay = `${levelText} ${mobText} ${healthText}`; 
    const defaultRangeDisplay = `${defaultDisplay} -- ${rangeText}`

    // DEFAULT HP DISPLAY 
    // Ex. [Lv600] Lord Jawbus 100M/100M❤
    if (type > 6) type = 0;
    if (type === 0) {
        Renderer.drawStringWithShadow(defaultDisplay, displayPos.x, displayPos.y);
        // return;
    }

    if (type !== 0 && type < 4) {
        Renderer.drawRect(Renderer.DARK_GRAY, displayPos.x, displayPos.y, maxHPLength, 5);
        /*if (Settings.showBGHealthBar) */
        Renderer.drawRect(Renderer.DARK_GREEN, displayPos.x, displayPos.y, currHPLength, 5);

        // Ex.
        //    [Lv600] Lord Jawbus 100M/100M❤ -- [✓]
        //        ███████████████████████████████
        //        ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
        if (type === 1) {
            let textW = getWidth(defaultRangeDisplay);
            let x = displayPos.x + halfOf(maxHPLength) - halfOf(textW);
            Renderer.drawStringWithShadow(defaultRangeDisplay, x, displayPos.y - 10);
            // return;
        }

        // Ex.
        //                 [Lv600] Lord Jawbus -- [✓]
        //  100M/100M❤  ███████████████████████████████
        //               ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
        if (type === 2) {
            let displayText = `${levelText} ${mobText} -- ${rangeText}`;
            let textW = getWidth(displayText);
            let mainX = displayPos.x + halfOf(maxHPLength) - halfOf(textW);
            Renderer.drawStringWithShadow(displayText, mainX, displayPos.y - 10);

            // side
            let hpTextW = getWidth(healthText);
            let sideX = displayPos.x - hpTextW - 3;
            Renderer.drawStringWithShadow(healthText, sideX, displayPos.y - 1.5);
            // return;
        }

        // Ex.
        //                                100M/100M❤ -- [✓]
        //    [Lv600] Lord Jawbus  ███████████████████████████████
        //                         ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
        if (type === 3) {
            let displayText = `${healthText} -- ${rangeText}`;
            let textW = getWidth(displayText);
            let mainX = displayPos.x + halfOf(maxHPLength) - halfOf(textW);
            Renderer.drawStringWithShadow(displayText, mainX, displayPos.y - 10);

            // side
            let sideText = `${levelText} ${mobText}`;
            let sideTextW = getWidth(sideText);
            let sideX = displayPos.x - (sideTextW * 1.12);
            Renderer.drawStringWithShadow(sideText, sideX, displayPos.y - 2);
            // return;
        }

        // if (hpInfo.fullName === 'Jawbus')
        // const barPad = 3;
        // const miniBarLength = maxHPLength / numFound - (barPad * (numFound - 1));
        // code here        
    }
    if (type > 3 && type < 7) {
        Renderer.drawRect(Renderer.DARK_GRAY, x, y, maxHPLength, 10);
        /*if (Settings.showBGHealthBar) */
        Renderer.drawRect(Renderer.DARK_GREEN, x, y, currHPLength, 10);

        let mainText = `${levelText} ${mobText} ${rangeText}`;
        let mainW = getWidth(mainText);
        let mainX = displayPos.x + halfOf(maxHPLength) - halfOf(mainW);
        Renderer.drawStringWithShadow(mainText, mainX, displayPos.y - 10);

        let healthW = getWidth(healthText);
        // Ex.
        //              [Lv600] Lord Jawbus [✓]
        //            ▍100M/100M❤              ▍
        if (type === 4) {
            Renderer.drawStringWithShadow(healthText, displayPos.x + 3, displayPos.y + 1);
            // return;
        }

        // Ex.
        //              [Lv600] Lord Jawbus [✓]
        //            ▍       100M/100M❤       ▍
        if (type === 5) {
            let sideX = displayPos.x + halfOf(maxHPLength) - halfOf(healthW);
            Renderer.drawStringWithShadow(healthText, sideX, displayPos.y + 1);
            // return;
        }

        // Ex.
        //              [Lv600] Lord Jawbus [✓]
        //            ▍             100M/100M❤ ▍
        if (type === 6) {
            let sideX = displayPos.x + maxHPLength - healthW - 3;
            Renderer.drawStringWithShadow(healthText, sideX, displayPos.y + 1);
            // return;
        }
        
        // if (hpInfo.fullName === 'Jawbus')
        // const barPad = 3;
        // const miniBarLength = maxHPLength / numFound - (barPad * (numFound - 1));
        // code here  
    }
};



////////////////////////////////////////////////////////////////////////////////
// REG: CHAT 
////////////////////////////////////////////////////////////////////////////////
let hasMob = false;
let hasDoubleMob = false;
registerWhen('chat', timeThis('registerChat detected mobName nearby', (event) => {
    hasMob = true;
}), () => getInSkyblock() && World.isLoaded()).setCriteria("${chatType} > ${playerName}: Detected ${mobName} Nearby!");

registerWhen('chat', timeThis('registerChat doublehook mobName detected', (event) => {
    hasDoubleMob = true;
}), () => getInSkyblock() && World.isLoaded()).setCriteria("${chatType} > ${playerName}: Doublehook ${mobName} Nearby!");


////////////////////////////////////////////////////////////////////////////////
// REG: STEP
////////////////////////////////////////////////////////////////////////////////
register('step', timeThis("registerStep updating specifiedMobs", () => {
    if (!getInSkyblock() || !World.isLoaded()) return;

    mobSettings.forEach(({ condition, mob, mobs }) => {
        if (condition && !specifiedMobs.includes(mob)) {
            specifiedMobs.push(mob);
        } else if (!condition && specifiedMobs.includes(mob)) {
            removeFromList(specifiedMobs, mob);
        }
    });
})).setDelay(5);


////////////////////////////////////////////////////////////////////////////////
// REG: STEP
////////////////////////////////////////////////////////////////////////////////
let shownAlert = false;
let playedSound = false;
register('step', timeThis("registerStep parseMobInfos", () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    
    // reset values
    resetInfos(mobInfos);

    World.getAllEntitiesOfType(entityArmorStand).forEach(mobEntity => {
        const mobName = mobEntity.getName().removeFormatting();
 
        Object.keys(mobInfosConfig).forEach(mobType => {
            if (specifiedMobs.includes(mobType)) {
                const { regex, key, fullName, colorF } = mobInfosConfig[mobType];
                const inRangeText = checkLSRange(mobEntity) < 31 ? '&a✓' : '&c✖';
                parseMobInfos(mobName, regex, mobInfos, key, fullName, colorF, inRangeText);
            }
        })
    });
})).setFps(3);

register('step', timeThis('registerStep send detection messages', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;

    Object.keys(mobInfos).forEach(mobKey => {
        const mobInfo = mobInfos[mobKey];
        if (mobInfo.numFound === 1 && mobKey !== 'follower') {
            if (!shownAlert) { showAlert(mobInfo.alert); shownAlert = true; };
            if (!playedSound) { devAudio.playDefaultSound(); playedSound = true; };
            if (!hasMob) { sendMessage(`Detected ${mobInfo.name} Nearby!`); hasMob = true; };
        } else if (mobInfo.numFound >= 2 && mobKey !== 'follower') {
            if (!shownAlert) { showAlert(mobInfo.alert); shownAlert = true; };
            if (!playedSound) { devAudio.playDefaultSound(); playedSound = true; };
            if (!hasDoubleMob) { sendMessage(`Doublehook ${mobInfo.name} Detected!`); hasDoubleMob = true; };
        };
        // } else if (mobInfo.numFound === 0) {
        //     shownAlert = false;
        //     playedSound = false;
        // };
    });
})).setFps(1);

registerWhen('renderOverlay', timeThis('registerOverlay drawHPBar', () => {
    Object.keys(mobInfos).forEach(mobKey => {
        const mobInfo = mobInfos[mobKey];
        if (mobInfo.numFound > 0) {
            const mobCounter = mobInfo.numFound;
            mobInfo.infos.forEach(mobDetail => {
                drawHPBar(mobDetail, devDisplay, mobCounter);
            })
        }
    })
}), () => getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', timeThis('registerOverlay renderGui for moveHPDisplay', () => {
    renderGuiPosition(moveHPDisplay, devDisplay, hpDisplayDraggable);
}), () => getInSkyblock() && World.isLoaded());



// let lobbyJawbAlertSent = false;
// registerWhen('chat', timeThis('', (playerName, event) => {
//     cancel(event);
//     if (lobbyJawbAlertSent) return;
//     let partyList = getPList();
//     if (partyList.includes(playerName)) return;

//     lobbyJawbAlertSent = true;
//     ChatLib.chat(`&c&l${playerName} died to a Jawbus!`);
//     showAlert(`&4JAWBUS IN LOBBY`);
//     devAudio.playDefaultSound();
//     setTimeout(() => {
//         lobbyJawbAlertSent = false;
//     }, 60000);
// }), () => getInSkyblock() && World.isLoaded()).setCriteria('${playerName} was killed by Lord Jawbus.').setContains();
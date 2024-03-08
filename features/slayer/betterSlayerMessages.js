import Settings from "../../config1/settings";

import { baoUtils, registerWhen, timeThis } from "../../utils/utils";
import { getInSkyblock } from "../../utils/functions";


registerWhen('chat', timeThis('registerChat cancel blazeDrops', (mf, event) => {
    cancel(event);
}), () => getInSkyblock() && World.isLoaded()).setCriteria("RARE DROP! (Enchanted Blaze Powder) (\+${mf}% ✯ Magic Find)");


const slayerCompMessages = [
    /SLAYER QUEST COMPLETE!/,
    /.+ Slayer LVL .+ - Next LVL in .+ XP!/,
    /SLAYER QUEST STARTED!/,
    /» Slay .+ Combat XP worth of .+\./,
]

slayerCompMessages.forEach(msg => {
    registerWhen('chat', timeThis('registerChat cancel slayer messages', (event) => {
        cancel(event);
    }), () => getInSkyblock() && World.isLoaded()).setCriteria(msg).setContains();
});


let xpLeft = 0;
let nextLevel = 0;
let slayerType = '';

function getSlayerTier(xp, mobName) {
    let tierStr = '';
    let slayer = '';
    if (mobName === 'Zombies') {
        slayer = 'Revenant'
        if (xp === 150) tierStr = 'T1';
        if (xp === 1440) tierStr = 'T2';
        if (xp === 2400) tierStr = 'T3';
        if (xp === 4800) tierStr = 'T4';
        if (xp === 6000) tierStr = 'T5';
    }

    if (mobName === 'Spiders') {
        slayer = 'Tarantula'
        if (xp === 250) tierStr = 'T1';
        if (xp === 600) tierStr = 'T2';
        if (xp === 1000) tierStr = 'T3';
        if (xp === 2000) tierStr = 'T4';
    }

    if (mobName === 'Wolves') {
        slayer = 'Sven'
        if (xp === 270) tierStr = 'T1';
        if (xp === 648) tierStr = 'T2';
        if (xp === 1584) tierStr = 'T3';
        if (xp === 3168) tierStr = 'T4';
    }

    if (mobName === 'Endermen') {
        slayer = 'Eman'
        if (xp === 2750) tierStr = 'T1';
        if (xp === 6600) tierStr = 'T2';
        if (xp === 11000) tierStr = 'T3';
        if (xp === 22000) tierStr = 'T4';
    }

    if (mobName === 'Blazes') {
        slayer = 'Blaze'
        if (xp === 6000) tierStr = 'T1';
        if (xp === 14400) tierStr = 'T2';
        if (xp === 18000) tierStr = 'T3';
        if (xp === 36000) tierStr = 'T4';
    }

    if (mobName === 'Vampires') {
        slayer = 'Vampire'
        if (xp === 360) tierStr = 'T1';
        if (xp === 450) tierStr = 'T2';
        if (xp === 600) tierStr = 'T3';
        if (xp === 750) tierStr = 'T4';
        if (xp === 900) tierStr = 'T5';
    }
    return [tierStr, slayer];
}

registerWhen('chat', timeThis('registerChat eval number of blaze slayer T1s until next level', (type, slayerLvl, xp, event) => {
    nextLevel = parseInt(slayerLvl) + 1;
    xpLeft = parseInt(xp.replace(',', ''));2
    slayerType = type.trim();
}), () => getInSkyblock() && World.isLoaded()).setCriteria('${type} Slayer LVL ${slayerLvl} - Next LVL in ${xp} XP!').setContains();

registerWhen('chat', timeThis('', (tierLevel, slayerType, event) => {
    let combatXp = parseInt(tierLevel.replace(',', ''));
    let [slayerTier, slayerName] = getSlayerTier(combatXp, slayerType);
    let slayersLeft = Math.round(xpLeft/5);
    ChatLib.chat(`&c&lSLAYER DEAD! » &r&b${slayersLeft} &7${slayerName} ${slayerTier}s until Slayer Lvl &c${nextLevel}!`);
}), () => getInSkyblock() && World.isLoaded()).setCriteria('» Slay ${tierLevel} Combat XP worth of ${slayerType}.').setContains();
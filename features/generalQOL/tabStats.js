import { getInSkyblock } from "../../utils/functions";
import { registerWhen, timeThis } from "../../utils/utils";


function extractTabInfo(info, statName) {
    let statText = '';
    let hasStatName = false;
    info.forEach(name => {
        hasStatName = name.includes(statName);
        if (hasStatName) {
            statText = `${statName}: ${name.split(':')[1].trim()}`;
        }
    });
    return [statText, hasStatName]
}

let statisticArray = [];
class Statistic {
    constructor(info) {
        this.displayText = info[0];
        this.hasStat = info[1];
    }
}

register('step', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    let tabInfo = TabList.getNames();
    statisticArray = [];
    statisticArray.push(new Statistic(extractTabInfo(tabInfo, 'Magic Find')));
    statisticArray.push(new Statistic(extractTabInfo(tabInfo, 'Sea Creature Chance')));
    statisticArray.push(new Statistic(extractTabInfo(tabInfo, 'Fishing Speed')));
    statisticArray.push(new Statistic(extractTabInfo(tabInfo, 'Fishing Wisdom')));
}).setFps(1);

registerWhen('renderOverlay', timeThis('', () => {
    for (let idx = 0; idx < statisticArray.length; idx++) {
        let stat = statisticArray[idx];
        if (stat.hasStat) Renderer.drawStringWithShadow(stat.displayText, 300, 300+(idx*10));
    }
}), () => getInSkyblock() && World.isLoaded());


// let displayStats = {
//     // general
//     health: '', 
//     defense: '',
//     speed: '', 
//     strength: '',
//     intel: '', 
//     critChance: '', 
//     critDmg: '', 
//     atkSpeed: '', 
//     abiDmg: '', 
//     magicFind: '', 
//     petLuck: '', 
//     trueDef: '', 
//     healthRegen: '', 
//     vitality: '', 
//     mending: '', 
//     ferocity: '',
//     swingRange: '', 
    
//     // fishing
//     seaCreatureChance: '', 
//     fishingSpeed: '', 
//     fishingWisdom: '', 
    
//     // mining
//     miningFortune: '', 
//     miningSpeed: '', 
//     miningWisdom: '', 
//     pristine: '', 
    
//     // farming
//     farmingFortune: '', 
//     farmingWisdom: '', 
//     bonusPestChance: '',

//     // foraging
//     foragingFortune: '', 
//     foragingWisdom: '', 

//     // combat
//     combatWisdom: '', 

//     // enchanting
//     enchantingWisdom: '', 
    
//     // alchemy
//     alchemyWisdom: '', 
    
//     // carpentry
//     carpentryWisdom: '', 
    
//     // runecrafting
//     runecraftingWisdom: '', 
    
//     // social
//     socialWisdom: '', 
    
//     // taming
//     tamingWisdom: '', 
// }
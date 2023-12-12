import Settings from '../settings.js';
import Audio from '../utils/audio.js';
import { data } from '../utils/data.js';
import { getTabArea } from '../utils/functions.js';

let currArea = '';
register('step', () => { currArea = getTabArea(); }).setFps(1);

// const fStats = new Audio();

let trophyFish = {
    "Sulphur Skitter": {
        "bronze": 0, 
        "silver": 0, 
        "gold": 0, 
        "diamond": 0,
    },
    "Obfuscated 1": {
        "bronze": 0, 
        "silver": 0, 
        "gold": 0, 
        "diamond": 0,
    },
    "Steaming-Hot Flounder": {
        "bronze": 0, 
        "silver": 0, 
        "gold": 0, 
        "diamond": 0,
    },
    "Gusher": {
        "bronze": 0, 
        "silver": 0, 
        "gold": 0, 
        "diamond": 0,
    },
    "Blobfish": {
        "bronze": 0, 
        "silver": 0, 
        "gold": 0, 
        "diamond": 0,
    },
    "Obfuscated 2": {
        "bronze": 0, 
        "silver": 0, 
        "gold": 0, 
        "diamond": 0,
    },
    "Slugfish": {
        "bronze": 0, 
        "silver": 0, 
        "gold": 0, 
        "diamond": 0,
    },
    "Flyfish": {
        "bronze": 0, 
        "silver": 0, 
        "gold": 0, 
        "diamond": 0,
    },
    "Obfuscated 3": {
        "bronze": 0, 
        "silver": 0, 
        "gold": 0, 
        "diamond": 0,
    },
    "Lavahorse": {
        "bronze": 0, 
        "silver": 0, 
        "gold": 0, 
        "diamond": 0,
    },
    "Mana Ray": {
        "bronze": 0, 
        "silver": 0, 
        "gold": 0, 
        "diamond": 0,
    },
    "Volcanic Stonefish": {
        "bronze": 0, 
        "silver": 0, 
        "gold": 0, 
        "diamond": 0,
    },
    "Vanille": {
        "bronze": 0, 
        "silver": 0, 
        "gold": 0, 
        "diamond": 0,
    },
    "Skeleton Fish": {
        "bronze": 0, 
        "silver": 0, 
        "gold": 0, 
        "diamond": 0,
    },
    "Moldfin": {
        "bronze": 0, 
        "silver": 0, 
        "gold": 0, 
        "diamond": 0,
    },
    "Soulfish": {
        "bronze": 0, 
        "silver": 0, 
        "gold": 0, 
        "diamond": 0,
    },
    "Karate": {
        "bronze": 0, 
        "silver": 0, 
        "gold": 0, 
        "diamond": 0,
    },
    "Golden": {
        "bronze": 0, 
        "silver": 0, 
        "gold": 0, 
        "diamond": 0,
    },
}
function regTFish(fishName) {
    register('chat', (trophyFishName, rarityName, event) => {
        rarity = rarityName.toLowerCase();
        if (trophyFishName === fishName) {
            if (rarity === 'bronze') {
                trophyFish.trophyFish[trophyFishName].bronze += 1;
            }
            if (rarity === 'silver') {
                trophyFish.trophyFish[trophyFishName].silver += 1;
            }
            if (rarity === 'gold') {
                trophyFish.trophyFish[trophyFishName].gold += 1;
            }
            if (rarity === 'diamond') {
                trophyFish.trophyFish[trophyFishName].diamond += 1;
            }
        }
    }).setCriteria('TROPHY FISH! You caught a ${trophyFishName} ${rarityName}.');
}

regTFish('Sulphur Skitter');
regTFish('Obfuscated 1');
regTFish('Steaming-Hot Flounder'); 
regTFish('Gusher');
regTFish('Blobfish');
regTFish('Obfuscated 2');
regTFish('Slugfish');
regTFish('Flyfish');
regTFish('Obfuscated 3');
regTFish('Lavahorse');
regTFish('Mana Ray');
regTFish('Volcanic Stonefish');
regTFish('Vanille Fish');
regTFish('Skeleton Fish');
regTFish('Moldfin');
regTFish('Soulfish');
regTFish('Karate');
regTFish('Golden');

// if holding rod, display attributes on screen
// "double hook" == 'DH'
// 'fishing speed' == 'FS'
// 'trophy hunter' == 'TH'
// 'Fisherman' == 'FM'
// 'Infection' == 'INF'
// 'Corrupted' == 'CR'
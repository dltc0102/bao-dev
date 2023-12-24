import { debug } from '../utils/utils.js'
import Settings from "../settings.js"
import { data } from '../utils/data.js'
import { renderGuiPosition, createGuiCommand } from '../utils/functions.js'

let petPages = 0;
let petNum = 0;
let inPetsWindow = false;

class Pet {
    constructor(name, level, rarity, petItem, skin) {
        this.name = name;
        this.level = level;
        this.rarity = rarity;
        this.petItem = petItem;
        this.skin = skin;
    }
}


// // opening pets window
// register('guiRender', () => {
//     if (!data.inSkyblock) return;
//     if (inPetsWindow) return;
//     if (Player.getPlayer() === null || Player.getOpenedInventory() === null || !Player.getContainer().getName().includes('Pets')) return;
//     // window name is (1/3) Pets
//     inPetsWindow = true;
//     let guiContainer = Player.getContainer();
//     data.userPets = [];
//     let numRows = 5;
//     let numCols = 9;
//     for (let i = 0; i < numRows; i++) {
//         let petRow = [];
//         for (let j = 0; j < numCols; j++) {
//             let petSlot = i * 9 + j + 1;
//             let cellInfo = guiContainer.getStackInSlot(petSlot); // returns a list of info
//             petRow.push(cellInfo);
//             // first row of pets are 11, 12, 13, 14, 15, 16, 17
//             // second row of pets are 20, 21, 22, 23, 24, 25, 26
//             // third row of pets are 29, 30, 31, 32, 33, 34, 35
//             // fourth row of pets are 36, 37, 38, 39, 40, 41, 42

//             // first row of pets are
//             // (1, 2-8)
//             // (2, 2-8)
//             // (3, 2-8)
//             // (4, 2-8)
//         }
//         data.userPets.push(petRow.slice(0, 7));
//     }

//     // verify pet window
//     // test data.userPets output
//     // PItem: Fishing Exp Boost 

//     //       1 2  3  4  5  6  7  8 9
//     // 0 -- | 00 00 00 00 00 00 00 |
//     // 1 -- | [] [] [] [] [] [] [] |
//     // 2 -- | [] [] [] [] [] [] [] |
//     // 3 -- | [] [] [] [] [] [] [] |
//     // 4 -- | [] [] [] [] [] [] [] |
//     // 5 -- | -- II PS BB AA CC -- |

// })

// // gui stuff
// var movepet = new Gui();
// register('dragged', (dx, dy, x, y) => {
//     if (!data.inSkyblock) return;
//     if (movepet.isOpen()) {
//         data.petDis.x = x;
//         data.petDis.y = y;
//     }
// })

const petRarities = {
    "1": '&f',
    "2": '&a',
    "3": '&9',
    "4": '&5',
    "6": '&6',
    "7": '&d',
}

let usingPet = false;
let activePetName = '';
let activePetLvl = '';
let activePetRarity = '';
let displayPet = `[Lvl ${activePetLvl}] ${petRarities[activePetRarity]}${activePetName}`;
register('chat', (petName, event) => {
    usingPet = true;
    activePetName = petName;
    debug(`usingPet: ${usingPet}, activePet: ${activePetName}`)
}).setCriteria('You summoned your ${petName}!')

register('chat', (pet, event) => {
    usingPet = false;
    activePetName = '';
    debug(`usingPet: ${usingPet}, activePet: ${activePetName}`)
}).setCriteria('You despawned your ${pet}!')

register('chat', (lvlNum, petName, event) => {
    if (Settings.hide_autopet_messages) cancel(event);
    usingPet = true;
    activePetName = petName;
    debug(`usingPet: ${usingPet}, activePet: ${activePetName}, mainPet: ${petName}`)
}).setCriteria('Autopet equipped your [Lvl ${lvlNum}] ${petName}! VIEW RULE')

// register('command', () => {
//     ChatLib.chat(`Current Pet: ${activePet}`)
// }).setName('currpet');

// register('renderOverlay', () => {
//     if (!data.inSkyblock) return;
//     if (!Settings.show_active_pet) return;
//     Renderer.drawString(displayPet, data.petDis.x, data.petDis.y)
// })


export function getActivePet() {
    return activePetName;
}
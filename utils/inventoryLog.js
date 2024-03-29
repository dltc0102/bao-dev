import Settings from '../config1/settings.js';
import Audio from '../utils/audio.js';
import PogObject from 'PogData';

import { baoUtils } from './utils.js';
import { getInSkyblock } from '../utils/functions.js'; // sb, area
import { showAlert } from './utils.js';

const miscAudio = new Audio();

export const baoInv = new PogObject("bao-dev", {
    "books": {
        "flash": 0,
        "chimera": 0,
    }, 
    "skulls": {
        "turtleShelmets": 0, 
        "tigerPlushies": 0,
        "minosRelics": 0,
        "mlFrags": 0, 
        "hydraHeads": 0,
    }, 
    "flowers": {
        "antiqueRemedies": 0,
    },
    "gw_teeth": 0,
})
baoInv.autosave(5);

function getLoreOfSlot(slotIdx) {
    return Player.getInventory().getStackInSlot(slotIdx).getLore();
}
const idRegex = /([a-zA-Z\s]+)\s\(\#[0-9]+\/[0-9]+\)/;

register('command', () => {
    let bookItems = [];
    let skullItems = [];
    let flowerItems = [];
    Player.getInventory().getItems().forEach((item, idx) => {
        if (idx >= 0 && idx < 36 && idx !== 8 && item) {
            if (item.toString() === '1xitem.enchantedBook@0' && !bookItems.includes(idx)) bookItems.push(idx);
            if (item.toString() === '1xitem.skull@3' && !skullItems.includes(idx)) skullItems.push(idx);
            if (item.toString() === '1xtile.flower2@3' && !flowerItems.includes(idx)) flowerItems.push(idx); 
        }
    })

    bookItems.forEach(slotNum => {
        const slotLore = getLoreOfSlot(slotNum);
        const bookName = slotLore[1].removeFormatting();
        if (bookName === 'Flash I') baoInv.books.flash += 1;
        if (bookName === 'Chimera I') baoInv.books.chimera += 1;
    })

    skullItems.forEach(slotNum => {
        const slotLore = getLoreOfSlot(slotNum);
        const skullMatch = (slotLore[0].removeFormatting()).match(idRegex);
        if (skullMatch) {
            const skullName = skullMatch[1];
            if (skullName === 'Dwarf Turtle Shelmet') baoInv.skulls.turtleShelmets += 1;
            if (skullName === 'Crochet Tiger Plushie') baoInv.skulls.tigerPlushies += 1;
            if (skullName === 'Minos Relic') baoInv.skulls.minosRelics += 1;
            if (skullName === 'Magma Lord Fragment') baoInv.skulls.mlFrags += 1;
            if (skullName === 'Water Hydra head') baoInv.skulls.hydraHeads += 1;
        }
    })

    flowerItems.forEach(slotNum => {
        const slotLore = getLoreOfSlot(slotNum);
        const flowerMatch = (slotLore[0].removeFormatting()).match(idRegex);
        if (flowerMatch) {
            const flowerName = flowerMatch[1];
            if (flowerName === 'Antique Remedies') baoInv.flowers.antiqueRemedies += 1;
        }
    })
}).setName('getinv');

register('command', () => {
    ChatLib.chat(`inv logged items: `);
    ChatLib.chat('-------------------');
    ChatLib.chat(`Books: `);
    ChatLib.chat(`Flash: ${baoInv.books.flash}`);
    ChatLib.chat(`Chimera: ${baoInv.books.chimera}`);
    ChatLib.chat('-------------------');
    ChatLib.chat(`Skulls: `);
    ChatLib.chat(`Shelmets: ${baoInv.skulls.turtleShelmets}`);
    ChatLib.chat(`Plushies: ${baoInv.skulls.tigerPlushies}`);
    ChatLib.chat(`Minos Relics: ${baoInv.skulls.minosRelics}`);
    ChatLib.chat(`ML Frags: ${baoInv.skulls.mlFrags}`);
    ChatLib.chat(`Hydra Heads: ${baoInv.skulls.hydraHeads}`);
    ChatLib.chat('-------------------');
    ChatLib.chat(`Flowers: `);
    ChatLib.chat(`Remedies: ${baoInv.flowers.antiqueRemedies}`);
    ChatLib.chat('-------------------');
    ChatLib.chat(`GW Toof: ${baoInv.gw_teeth}`);
}).setName('logitems');
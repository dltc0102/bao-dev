// import Settings from "../../config1/settings.js";
import PogObject from 'PogData';

import { getInSkyblock } from '../utils/functions.js'; // sb, area
import { createGuiCommand, renderGuiPosition } from '../utils/functions.js'; // gui
import { constrainX, constrainY } from '../utils/functions.js' // padding

// FUNCTIONS
function checkCake(effect, givObject) {
    if (effect === '+1✯ Magic Find') givObject.cakeEffects += ' &b✯';
    if (effect === '+1♣ Pet Luck') givObject.cakeEffects += ' &d♣';
    if (effect === '+2❁ Strength') givObject.cakeEffects += ' &c❁';
    if (effect === '+5✎ Intelligence') givObject.cakeEffects += ' &b✎';
    if (effect === '+10❤ Health') givObject.cakeEffects += ' &c❤';
    if (effect === '+1α Sea Creature Chance') givObject.cakeEffects += ' &3α';
    if (effect === '+3❈ Defense') givObject.cakeEffects += ' &a❈';
    if (effect === '+2⫽ Ferocity') givObject.cakeEffects += ' &c⫽';
    if (effect === '+10✦ Speed') givObject.cakeEffects += ' &f✦';
    if (effect === '+5☘ Farming Fortune') givObject.cakeEffects += ' &6Farming☘';
    if (effect === '+5☘ Foraging Fortune') givObject.cakeEffects += ' &6Foraging☘';
    if (effect === '+5☘ Mining Fortune') givObject.cakeEffects += ' &6Mining☘';
    if (effect === '+1♨ Vitality') givObject.cakeEffects += ' &4♨';
    if (effect === '+1❂ True Defense') givObject.cakeEffects += ' &f❂';
    givObject.save();
}

function handleCakeDisplay(cakeString) {
    let cakeList = cakeString.trim().split(' ');
    cakeList = [... new Set(cakeList)];
    return `| ${cakeList.join(' &r|&r ')} &r|`;
}

function drawOutlineBox(x, y, w, size) {
    let wc = Renderer.DARK_AQUA;
    new Rectangle(wc, x-5, y-1, w+size+10, 0).setOutline(wc, 0.75).draw(); // top
    new Rectangle(wc, x-5, y-1, 0, size/1.618+10).setOutline(wc, 0.75).draw(); // left
    new Rectangle(wc, x-5, y+size/1.618+9, w+size+10, 0).setOutline(wc, 0.75).draw(); // bottom
    new Rectangle(wc, w+x+size+5, y-1, 0, size/1.618+10).setOutline(wc, 0.75).draw(); // right
    // resize
    new Rectangle(wc, w+x+size+5, y+size/1.618+5, 5, 5).draw();
}



// SETUP CONSTS
const cakeDrag = '&7✯ ♣ ❁ ✎ ❤ α ❈ ⫽ ✦ Farming☘ Foraging☘ Mining☘ ♨ ❂'
export const baoCake = new PogObject("bao-dev", {
    "cakeEffects": '',
    "cakeDisplay": '',
    "x": 0, 
    "y": 0,
    "scale": 1,
}, '/data/baoCake.json');
baoCake.autosave(5);

const moveCake = new Gui();
createGuiCommand(moveCake, 'movecake', 'mck');

// REGS
register('chat', (exclamation, effect) => {
    checkCake(effect, baoCake);
}).setCriteria('${exclamation}! You gain ${effect} for ${hrs} hours!');

register('chat', (exclamation, effect) => {
    checkCake(effect, baoCake);
}).setCriteria('${exclamation}! You refresh ${effect} for ${hrs} hours!');


// GUI STUFF
register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!moveCake.isOpen) return;
    if (moveCake.isOpen()) {
        baoCake.x = constrainX(x, 3, cakeDrag);
        baoCake.y = constrainY(y, 3, cakeDrag);
    };
    baoCake.save();
});

register('step', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    baoCake.cakeDisplay = handleCakeDisplay(baoCake.cakeEffects);
    baoCake.w = Renderer.getStringWidth(baoCake.cakeDisplay);
}).setFps(1);

// register('renderOverlay', () => {
//     if (!getInSkyblock() || !World.isLoaded()) return;
//     Renderer.translate(baoCake.x, baoCake.y);
//     Renderer.scale(baoCake.scale ?? 1);
//     Renderer.drawStringWithShadow(baoCake.cakeDisplay, baoCake.x, baoCake.y);

//     if (moveCake.isOpen()) {
//         drawOutlineBox(baoCake.x + baoCake.w, baoCake.y, baoCake.w, baoCake.size)
//     }
// });

register('scrolled', (mx, my, dir) => {
    if (!moveCake.isOpen()) return;
    dir === 1 ? baoCake.scale += 0.02 : baoCake.scale -= 0.02;
    baoCake.save();
});

register('command', () => {
    baoCake.cakeEffects = '';
}).setName('wipecake');
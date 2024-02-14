import Settings from "../../settings.js";
import PogObject from 'PogData';
import Audio from "../../utils/audio.js";

import { constrainX, constrainY } from '../../utils/functions.js' // padding
import { createGuiCommand, renderGuiPosition } from '../../utils/functions.js'; // gui
import { registerWhen, timeThis } from "../../utils/utils.js";
import { getInSkyblock, getInGarden } from "../../utils/functions.js";
import { showAlert } from "../../utils/utils.js";

////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const chargeAudio = new Audio();
const moveChargesCounter = new Gui(); // charges
createGuiCommand(moveChargesCounter, 'movecharge', 'mcc');
const chargesDraggable = '&7Thunder Bottle: 00000⚡';

let sentFullMsg = false;
let chargeCounterText = '';
export const chargeCounterInfo = new PogObject("bao-dev", {
    'x': 3,
    'y': 64,
}, '/data/chargeCounterInfo.json');
chargeCounterInfo.autosave(5);

////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function updateChargeText(charges) {
    if (charges === 50000) return 'Thunder Bottle: &b&lFULL';
    if (charges === null) return 'Thunder Bottle: &cNo Bottle Available';
    if (charges !== null && charges !== 50000) return `Thunder Bottle: &b${charges}⚡`; 
}

function handleFullyCharged(alert, audioInst, flag) {
    if (alert) showAlert(alert);
    if (audioInst) audioInst.playDefaultSound();
    flag = true;
}

function getBiggestNum(arr) {
    let biggestNum = 0;
    arr.forEach(str => {
        let parsedNum = parseInt(str);
        // console.log(parsedNum, typeof parsedNum);
        if (parsedNum && parsedNum > biggestNum) {
            biggestNum = parsedNum;
        }
    });
    return biggestNum;
}

function getCharges(chargeLore) {
    const chargeRegex = /Charge: (\d{1,3}(?:,\d{3})*)\/50,000/;
    let result = '';

    chargeLore.forEach(chargeLine => {
        let unformattedLine = chargeLine.removeFormatting();
        let chargeMatch = unformattedLine.match(chargeRegex);
        if (chargeMatch) {
            result = chargeMatch[1].replace(/,/g, '');
        }
    });
    return result;
}

function getThunderBottle() {
    const skullItems = Player.getInventory().getItems()
        .map((item, idx) => (item !== null && item.toString().includes('item.skull')) ? idx : -1)
        .filter(idx => idx !== -1);

    let closestCharge = null;

    let currentBottles = [];
    skullItems.forEach(slotNum => {
        const slotLore = Player.getInventory().getStackInSlot(slotNum).getLore(); // list of strings of lore
        

        if (slotLore[0].includes('Thunder in a Bottle')) {
            const fullCharge = getCharges(slotLore);
            currentBottles.push(fullCharge);

        } else if (slotLore[0].includes('Empty Thunder Bottle')) {
            const partialCharge = getCharges(slotLore);
            currentBottles.push(partialCharge);
        }

    });
    currentBottles = currentBottles.filter(element => element !== '');
    closestCharge = currentBottles.length === 0 ? null : getBiggestNum(currentBottles);
    return closestCharge;
}


////////////////////////////////////////////////////////////////////////////////
// REG: STEP
////////////////////////////////////////////////////////////////////////////////
register('step', timeThis("registerStep update chargeCounterText", () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (Settings.full_bottle_ping) {
        let bottleCharge = getThunderBottle();

        if (bottleCharge === 50000 && !sentFullMsg) {
            handleFullyCharged('&b&lTHUNDER BOTTLE FULL', chargeAudio, sentFullMsg)
        }
        chargeCounterText = updateChargeText(bottleCharge);
        sentFullMsg = bottleCharge === 50000;
    } 
})).setFps(3);


////////////////////////////////////////////////////////////////////////////////
// REG: DRAG
////////////////////////////////////////////////////////////////////////////////
register('dragged', timeThis("registerDragged moveChargesCounter", (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (moveChargesCounter.isOpen()){
        chargeCounterInfo.x = constrainX(x, 3, chargesDraggable);
        chargeCounterInfo.y = constrainY(y, 3, chargesDraggable);
    };
    chargeCounterInfo.save();
}))


////////////////////////////////////////////////////////////////////////////////
// REG: OVERLAY
////////////////////////////////////////////////////////////////////////////////
registerWhen('renderOverlay', timeThis("renderOverlay chargeCounterText", () => {
    Renderer.drawStringWithShadow(chargeCounterText, chargeCounterInfo.x, chargeCounterInfo.y);
}), () => Settings.chargeCounter && !getInGarden() && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', timeThis("renderOverlay chargeCounterText draggable", () => {
    renderGuiPosition(moveChargesCounter, chargeCounterInfo, chargesDraggable);
}), () => getInSkyblock() && World.isLoaded());


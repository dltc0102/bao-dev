import Settings from "../../settings.js";

import { constrainX, constrainY } from '../../utils/functions.js' // padding
import { createGuiCommand, renderGuiPosition } from '../../utils/functions.js'; // gui
import { registerWhen } from "../../utils/utils.js";
import { getInSkyblock, getInCI } from "../../utils/functions.js";


////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const moveChargesCounter = new Gui(); // charges
createGuiCommand(moveChargesCounter, 'movecharge', 'mcc');
const chargesDraggable = '&7Thunder Bottle: 0';

let sentFullMsg = false;
const counterInfo = {
    'text': 0, 
    'x': 3,
    'y': 64,
};


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
            // console.log(`fullCharge: ${fullCharge}`)
            currentBottles.push(fullCharge);

        } else if (slotLore[0].includes('Empty Thunder Bottle')) {
            const partialCharge = getCharges(slotLore);
            // console.log(`partialCharge: ${partialCharge}`)
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
register('step', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (Settings.full_bottle_ping) {
        if (getInCI()) {
            let bottleCharge = getThunderBottle();
    
            if (bottleCharge === 50000 && !sentFullMsg) {
                handleFullyCharged('&b&lTHUNDER BOTTLE FULL', fishOverlayAudio, sentFullMsg)
            }
            counterInfo.text = updateChargeText(bottleCharge);
            sentFullMsg = bottleCharge === 50000;
        } 
    }
}).setFps(3);


////////////////////////////////////////////////////////////////////////////////
// REG: DRAG
////////////////////////////////////////////////////////////////////////////////
register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (moveChargesCounter.isOpen()){
        counterInfo.x = constrainX(x, 3, chargesDraggable);
        counterInfo.y = constrainY(y, 3, chargesDraggable);
    }
})


////////////////////////////////////////////////////////////////////////////////
// REG: OVERLAY
////////////////////////////////////////////////////////////////////////////////
registerWhen('renderOverlay', () => {
    Renderer.drawStringWithShadow(counterInfo.text, counterInfo.x, counterInfo.y);
}, () => Settings.chargeCounter && getInCI() && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', () => {
    renderGuiPosition(moveChargesCounter, counterInfo, chargesDraggable);
}, () => getInSkyblock() && World.isLoaded());


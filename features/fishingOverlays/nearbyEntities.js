import Settings from "../../settings.js";

import { constrainX, constrainY } from '../../utils/functions.js' // padding
import { createGuiCommand, renderGuiPosition } from '../../utils/functions.js'; // gui
import { registerWhen } from "../../utils/utils.js";
import { getInSkyblock, getInCI, detectDH } from "../../utils/functions.js";
import { baoDisplayHP } from "../displayHP.js";

////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const entityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

// jawbus
const moveNearbyJawbusCounter = new Gui(); // nearby jawbus
createGuiCommand(moveNearbyJawbusCounter, 'movejawbus', 'mj');
const jawbusDraggable = '&7Nearby Jawbus: NO [x0]'

// thunder
const moveNearbyThunderCounter = new Gui(); // nearby jawbus
createGuiCommand(moveNearbyThunderCounter, 'movethunder', 'mt');
const thunderDraggable = '&7Nearby Thunder: NO [x0]'

const counterInfo = {
    'jawbus': {
        'info': null,
        'text': 0, 
        'x': 3,
        'y': 44,
    }, 
    'thunder': {
        'info': null, 
        'text': '',
        'x': 3,
        'y': 54,
    }
};


////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function createInfoObject() {
    let resultObj = {
        found: false,
        foundNearby: false, 
        names: [], 
        titleShown: false, 
        numNearby: 0, 
        currHealth: 0,
        totalHealth: 0,   
    }
    return resultObj;
}

function updateNearbyText(name, givObject) {
    let isNBFound = givObject.foundNearby ? 'YES' : 'NO';
    let numNB = givObject.numNearby > 0 ? ` [x${givObject.numNearby}]` : '';
    return `&rNearby ${name}: &b${isNBFound}  &6${numNB}`;
}

function displayEntityHP(names, foundEntity, x, y) {
    if (names && names.length > 0 && foundEntity) {
        const stringOfNames = names.join('\n');
        Renderer.drawString(stringOfNames, x, y);
    }
}

////////////////////////////////////////////////////////////////////////////////
// CREATING INFO OBJECTS
////////////////////////////////////////////////////////////////////////////////
counterInfo.jawbus.info = createInfoObject();
counterInfo.thunder.info = createInfoObject();


////////////////////////////////////////////////////////////////////////////////
// REG: DRAG
////////////////////////////////////////////////////////////////////////////////
register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (moveNearbyJawbusCounter.isOpen()){
        counterInfo.jawbus.x = constrainX(x, 3, jawbusDraggable);
        counterInfo.jawbus.y = constrainY(y, 3, jawbusDraggable);
    }
    if (moveNearbyThunderCounter.isOpen()){
        counterInfo.thunder.x = constrainX(x, 3, thunderDraggable);
        counterInfo.thunder.y = constrainY(y, 3, thunderDraggable);
    }
})


////////////////////////////////////////////////////////////////////////////////
// REG: STEP 
////////////////////////////////////////////////////////////////////////////////
register('step', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    // detect doublehook jawbus
    if (Settings.detectDoubleJawbus) {
        detectDH(entityArmorStand, 'Jawbus', '&4', 'Follower', counterInfo.jawbus.info);
        if (getInCI()) {
            counterInfo.jawbus.text = updateNearbyText('Jawbus', counterInfo.jawbus.info);
        }
    }

    // detect doublehook thunder
    if (Settings.detectDoubleThunder) {
        detectDH(entityArmorStand, 'Thunder', '&b', null, counterInfo.thunder.info);
        counterInfo.thunder.text = updateNearbyText('Thunder', counterInfo.thunder.info);
    }
}).setFps(3);


////////////////////////////////////////////////////////////////////////////////
// REG: OVERLAY
////////////////////////////////////////////////////////////////////////////////
registerWhen('renderOverlay', () => {
    Renderer.drawStringWithShadow(counterInfo.jawbus.text, counterInfo.jawbus.x, counterInfo.jawbus.y);
    if (Settings.jawbus_hp) { 
        displayEntityHP(counterInfo.jawbus.names, counterInfo.jawbus.found, baoDisplayHP.x, baoDisplayHP.y);
    }
}, () => Settings.detectDoubleJawbus && getInCI() && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', () => {
    Renderer.drawStringWithShadow(counterInfo.thunder.text, counterInfo.thunder.x, counterInfo.thunder.y);
    if (Settings.thunder_hp) { 
        displayEntityHP(counterInfo.thunder.info.names, counterInfo.thunder.info.found, baoDisplayHP.x, baoDisplayHP.y); 
    }
}, () => Settings.detectDoubleThunder && getInCI() && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', () => {
    renderGuiPosition(moveNearbyJawbusCounter, counterInfo.jawbus, jawbusDraggable);
    renderGuiPosition(moveNearbyThunderCounter, counterInfo.thunder, thunderDraggable);
}, () => getInSkyblock() && World.isLoaded());


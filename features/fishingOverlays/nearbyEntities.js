import Settings from "../../settings.js";
import PogObject from 'PogData';

import { constrainX, constrainY } from '../../utils/functions.js' // padding
import { createGuiCommand, renderGuiPosition } from '../../utils/functions.js'; // gui
import { registerWhen, timeThis } from "../../utils/utils.js";
import { getInSkyblock, getInCI, detectDH } from "../../utils/functions.js";

////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const entityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

// jawbus
const moveNearbyJawbusCounter = new Gui(); // nearby jawbus
createGuiCommand(moveNearbyJawbusCounter, 'movejawbus', 'mj');
const jawbusDraggable = '&7Nearby Jawbus: NO [x0]';
let jawbusInfo = null;
let nearbyJawbusText = '';

// thunder
const moveNearbyThunderCounter = new Gui(); // nearby jawbus
createGuiCommand(moveNearbyThunderCounter, 'movethunder', 'mt');
const thunderDraggable = '&7Nearby Thunder: NO [x0]'
let thunderInfo = null;
let nearbyThunderText = '';

export const nearbyEntitiesDisplay = new PogObject("bao-dev", {
    'jawbus': {
        'x': 3,
        'y': 44,
    }, 
    'thunder': {
        'x': 3,
        'y': 54,
    }
}, '/data/nearbyEntitiesDisplay.json');
nearbyEntitiesDisplay.autosave(5);


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

////////////////////////////////////////////////////////////////////////////////
// CREATING INFO OBJECTS
////////////////////////////////////////////////////////////////////////////////
jawbusInfo = createInfoObject();
thunderInfo = createInfoObject();


////////////////////////////////////////////////////////////////////////////////
// REG: STEP 
////////////////////////////////////////////////////////////////////////////////
register('step', timeThis("registerStep update nearbyJawbusText and nearbyThunderText", () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    // detect doublehook jawbus
    if (Settings.detectDoubleJawbus) {
        detectDH(entityArmorStand, 'Jawbus', '&4', 'Follower', jawbusInfo);
        if (getInCI()) {
            nearbyJawbusText = updateNearbyText('Jawbus', jawbusInfo);
        }
    }

    // detect doublehook thunder
    if (Settings.detectDoubleThunder) {
        detectDH(entityArmorStand, 'Thunder', '&b', null, thunderInfo);
        nearbyThunderText = updateNearbyText('Thunder', thunderInfo);
    }
})).setFps(3);


////////////////////////////////////////////////////////////////////////////////
// REG: DRAG
////////////////////////////////////////////////////////////////////////////////
register('dragged', timeThis("registerDragged moveNearbyJawbusCounter and moveNearbyThunderCounter", (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (moveNearbyJawbusCounter.isOpen()){
        nearbyEntitiesDisplay.jawbus.x = constrainX(x, 3, jawbusDraggable);
        nearbyEntitiesDisplay.jawbus.y = constrainY(y, 3, jawbusDraggable);
    };
    if (moveNearbyThunderCounter.isOpen()){
        nearbyEntitiesDisplay.thunder.x = constrainX(x, 3, thunderDraggable);
        nearbyEntitiesDisplay.thunder.y = constrainY(y, 3, thunderDraggable);
    };
    nearbyEntitiesDisplay.save();
}))


////////////////////////////////////////////////////////////////////////////////
// REG: OVERLAY
////////////////////////////////////////////////////////////////////////////////
registerWhen('renderOverlay', timeThis("renderOverlay nearbyJawbusText", () => {
    Renderer.drawStringWithShadow(nearbyJawbusText, nearbyEntitiesDisplay.jawbus.x, nearbyEntitiesDisplay.jawbus.y);
}), () => Settings.detectDoubleJawbus && getInCI() && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', timeThis("renderOverlay nearbyThunderText", () => {
    Renderer.drawStringWithShadow(nearbyThunderText, nearbyEntitiesDisplay.thunder.x, nearbyEntitiesDisplay.thunder.y);
}), () => Settings.detectDoubleThunder && getInCI() && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', timeThis("renderOverlay nearbyJawbusText draggable", () => {
    renderGuiPosition(moveNearbyJawbusCounter, nearbyEntitiesDisplay.jawbus, jawbusDraggable);
}), () => getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', timeThis("renderOverlay nearbyThunderText draggable", () => {
    renderGuiPosition(moveNearbyThunderCounter, nearbyEntitiesDisplay.thunder, thunderDraggable);
}), () => getInSkyblock() && World.isLoaded());

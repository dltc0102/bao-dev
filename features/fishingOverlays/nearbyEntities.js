import Settings from "../../config1/settings.js";
import PogObject from 'PogData';

import { constrainX, constrainY } from '../../utils/functions.js' // padding
import { createGuiCommand, renderGuiPosition } from '../../utils/functions.js'; // gui
import { registerWhen, timeThis } from "../../utils/utils.js";
import { getInSkyblock, getInCI, detectDH } from "../../utils/functions.js";
import { getJawbusInfoObject } from "../detections/jawbus.js";
import { getThunderInfoObject } from "../detections/thunder.js";


////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const entityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

// jawbus
const moveNearbyJawbusCounter = new Gui(); // nearby jawbus
createGuiCommand(moveNearbyJawbusCounter, 'movejawbus', 'mj');
const jawbusDraggable = '&7Nearby Jawbus: NO [x0]';
let nearbyJawbusText = '';

// thunder
const moveNearbyThunderCounter = new Gui(); // nearby jawbus
createGuiCommand(moveNearbyThunderCounter, 'movethunder', 'mt');
const thunderDraggable = '&7Nearby Thunder: NO [x0]'
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
function updateNearbyText(name, givObject) {
    let isFound = givObject.found ? 'YES' : 'NO';
    let numFound = givObject.numFound > 0 ? ` [x${givObject.numFound}]` : '';
    return `&rNearby ${name}: &b${isFound}  &6${numFound}`;
}

////////////////////////////////////////////////////////////////////////////////
// REG: STEP 
////////////////////////////////////////////////////////////////////////////////
register('step', timeThis("registerStep update nearbyJawbusText", () => {
    if (!getInSkyblock() || !World.isLoaded() || !Settings.detectJawbusEntities || !getInCI()) return;
    let jawbusInfo = getJawbusInfoObject();
    nearbyJawbusText = updateNearbyText('Jawbus', jawbusInfo);
})).setFps(3);

register('step', timeThis("registerStep update nearbyThunderText", () => {
    if (!getInSkyblock() || !World.isLoaded() || !Settings.detectThunderEntities || !getInCI()) return;
    let thunderInfo = getThunderInfoObject();
    nearbyThunderText = updateNearbyText('Thunder', thunderInfo);
})).setFps(3);


////////////////////////////////////////////////////////////////////////////////
// REG: DRAG
////////////////////////////////////////////////////////////////////////////////
register('dragged', timeThis("registerDragged moveNearbyJawbusCounter", (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (moveNearbyJawbusCounter.isOpen()){
        nearbyEntitiesDisplay.jawbus.x = constrainX(x, 3, jawbusDraggable);
        nearbyEntitiesDisplay.jawbus.y = constrainY(y, 3, jawbusDraggable);
    };
    nearbyEntitiesDisplay.save();
}));

register('dragged', timeThis("registerDragged moveNearbyThunderCounter", (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (moveNearbyThunderCounter.isOpen()){
        nearbyEntitiesDisplay.thunder.x = constrainX(x, 3, thunderDraggable);
        nearbyEntitiesDisplay.thunder.y = constrainY(y, 3, thunderDraggable);
    };
    nearbyEntitiesDisplay.save();
}));


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

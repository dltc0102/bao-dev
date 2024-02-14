import Settings from "../../settings.js";
import PogObject from 'PogData';

import { getInSkyblock, getInGarden } from "../../utils/functions.js";
import { constrainX, constrainY } from '../../utils/functions.js' // padding
import { createGuiCommand, renderGuiPosition } from '../../utils/functions.js'; // gui
import { registerWhen, timeThis } from "../../utils/utils.js";


////////////////////////////////////////////////////////////////////////////////
// CONST
////////////////////////////////////////////////////////////////////////////////
const entityHook = Java.type("net.minecraft.entity.projectile.EntityFishHook");

const moveBobberCounter = new Gui();
createGuiCommand(moveBobberCounter, 'movebobber', 'mbc');
const bobberDraggable = '&7Bobbers: 0';

let bobberCount = 0;
let bobberText = '';

export const bobberDisplay = new PogObject("bao-dev", {
    'x': 3,
    'y': 14,
}, '/data/bobberDisplay.json');
bobberDisplay.autosave(5);

////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function updateEntityText(name, count) {
    let colorF = count > 6 ? '&b&l' : '&b'
    let nbEntitiesText = count > 0 ? Math.round(count) : '0';
    return `&r${name}: ${colorF}${nbEntitiesText}`;
}

function updateBobberCount(hook) {
    return World.getAllEntitiesOfType(hook).filter(dist => dist.distanceTo(Player.getPlayer()) < 31).length;
}


////////////////////////////////////////////////////////////////////////////////
// REG: STEP
////////////////////////////////////////////////////////////////////////////////
register('step', timeThis("registerStep update bobberCountText", () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (Settings.bobberCount) { 
        bobberCount = updateBobberCount(entityHook);
        bobberText = updateEntityText('Bobbers', bobberCount);
    }
})).setFps(3);


////////////////////////////////////////////////////////////////////////////////
// REG: DRAG
////////////////////////////////////////////////////////////////////////////////
register('dragged', timeThis("registerDragged moveBobberCount", (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (moveBobberCounter.isOpen()){
        bobberDisplay.x = constrainX(x, 3, bobberDraggable);
        bobberDisplay.y = constrainY(y, 3, bobberDraggable);
    };
    bobberDisplay.save();
}))


////////////////////////////////////////////////////////////////////////////////
// REG: OVERLAY
////////////////////////////////////////////////////////////////////////////////
registerWhen('renderOverlay', timeThis("renderOverlay bobberText", () => {
    Renderer.drawStringWithShadow(bobberText, bobberDisplay.x, bobberDisplay.y);
}), () => Settings.bobberCount && !getInGarden() && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', timeThis("renderOverlay bobberText draggable", () => {
    renderGuiPosition(moveBobberCounter, bobberDisplay, bobberDraggable);
}), () => getInSkyblock() && World.isLoaded());


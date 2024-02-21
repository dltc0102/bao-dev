/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../config1/settings.js";
import PogObject from 'PogData';

import { getInSkyblock, getInGarden } from "../../utils/functions.js";
import { constrainX, constrainY } from '../../utils/functions.js' // padding
import { createGuiCommand, renderGuiPosition } from '../../utils/functions.js'; // gui
import { registerWhen, timeThis } from "../../utils/utils.js";
import { isSBALoaded } from "../../utils/functions.js";

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

let hasSBA = false;
register('gameLoad', () => {
    hasSBA = isSBALoaded();
});

////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function updateBobberCount(hook) {
    return World.getAllEntitiesOfType(hook).filter(dist => dist.distanceTo(Player.getPlayer()) < 31).length;
}


////////////////////////////////////////////////////////////////////////////////
// REG: STEP
////////////////////////////////////////////////////////////////////////////////
register('step', timeThis("registerStep update bobberCountText", () => {
    if (!getInSkyblock() || !World.isLoaded() || !Settings.bobberCount) return;
    bobberCount = updateBobberCount(entityHook);
    let numBobber = bobberCount > 0 ? Math.round(bobberCount) : 0;

    if (Settings.bobberChroma && bobberCount >= Settings.bobberChromaNum) {
        bobberText = hasSBA ? `&zBobbers: ${numBobber}` : `&rBobbers: &b&l${numBobber}`;
        return;
    }
    let colorF = bobberCount >= 10 ? '&b&l' : '&b';
    bobberText = `&rBobbers: ${colorF}${numBobber}`;
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


/////////////////
register('command', () => {
    ChatLib.chat(`hasSba: ${isSBALoaded()}`);
}).setName('checksba');
import Settings from "../../settings.js";

import { getInSkyblock, getInGarden } from "../../utils/functions.js";
import { constrainX, constrainY } from '../../utils/functions.js' // padding
import { createGuiCommand, renderGuiPosition } from '../../utils/functions.js'; // gui
import { registerWhen } from "../../utils/utils.js";


////////////////////////////////////////////////////////////////////////////////
// CONST
////////////////////////////////////////////////////////////////////////////////
const entityHook = Java.type("net.minecraft.entity.projectile.EntityFishHook");

const moveBobberCounter = new Gui();
createGuiCommand(moveBobberCounter, 'movebobber', 'mbc');
const bobberDraggable = '&7Bobbers: 0';

const counterInfo = {
    'count': 0,
    'text': 0, 
    'x': 3,
    'y': 14,
};


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
// REG: DRAG
////////////////////////////////////////////////////////////////////////////////
register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (moveBobberCounter.isOpen()){
        counterInfo.x = constrainX(x, 3, bobberDraggable);
        counterInfo.y = constrainY(y, 3, bobberDraggable);
    }
})

////////////////////////////////////////////////////////////////////////////////
// REG: STEP
////////////////////////////////////////////////////////////////////////////////
register('step', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (Settings.bobberCount) { 
        counterInfo.count = updateBobberCount(entityHook);
        counterInfo.text = updateEntityText('Bobbers', counterInfo.count);
    }
}).setFps(3);


////////////////////////////////////////////////////////////////////////////////
// REG: OVERLAY
////////////////////////////////////////////////////////////////////////////////
registerWhen('renderOverlay', () => {
    Renderer.drawStringWithShadow(counterInfo.text, counterInfo.x, counterInfo.y);
}, () => Settings.bobberCount && !getInGarden() && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', () => {
    renderGuiPosition(moveBobberCounter, counterInfo, bobberDraggable);
}, () => getInSkyblock() && World.isLoaded());


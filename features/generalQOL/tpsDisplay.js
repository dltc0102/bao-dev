import Settings from "../../settings.js";
import PogObject from 'PogData';

import { createGuiCommand, renderGuiPosition } from "../../utils/functions";
import { constrainX, constrainY } from "../../utils/functions";
import { getInSkyblock } from "../../utils/functions";
import { registerWhen, timeThis } from "../../utils/utils";
import { getAvgTps } from "../../utils/tps";


////////////////////////////////////////////////////////////////////////////////
// CONST
////////////////////////////////////////////////////////////////////////////////
const moveTpsDisplay = new Gui();
createGuiCommand(moveTpsDisplay, 'movetps', 'mtps');
const tpsDraggable = '&7TPS: 00.0';
let tpsDisplayText = '';

export const tpsDisplay = new PogObject("bao-dev", {
    "x": 3, 
    "y": 74,
}, '/data/tpsDisplay.json');
tpsDisplay.autosave(5);

register('step', () => {
    if (!getInSkyblock() || !World.isLoaded() || Settings.showTpsDisplay) return;
    tpsDisplayText = `TPS: &b${getAvgTps().toFixed(1)}`;
}).setFps(1);

register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;;
    if (moveTpsDisplay.isOpen()) {
        tpsDisplay.x = constrainX(x, 3, tpsDraggable);
        tpsDisplay.y = constrainY(y, 3, tpsDraggable);
    };
    tpsDisplay.save();
});

registerWhen('renderOverlay', timeThis('registerOverlay tpsDisplayText', () => {
    Renderer.drawStringWithShadow(tpsDisplayText, tpsDisplay.x, tpsDisplay.y);
}), () => Settings.showTpsDisplay && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', timeThis('registerOverlay moveTpsDisplay', () => {
    renderGuiPosition(moveTpsDisplay, tpsDisplay, tpsDraggable);
}), () => getInSkyblock() && World.isLoaded());


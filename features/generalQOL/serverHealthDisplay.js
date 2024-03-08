import Settings from "../../config1/settings.js";
import PogObject from 'PogData';

import { createGuiCommand, renderGuiPosition } from "../../utils/functions";
import { constrainX, constrainY } from "../../utils/functions";
import { getInSkyblock } from "../../utils/functions";
import { registerWhen, timeThis } from "../../utils/utils";
import { getAvgTps } from "../../utils/tps";
import { getHypixelPing } from "../../utils/ping.js";

////////////////////////////////////////////////////////////////////////////////
// CONST
////////////////////////////////////////////////////////////////////////////////
export const moveServerHealthDisplay = new Gui();
createGuiCommand(moveServerHealthDisplay, 'moveserverhealthdisplay', 'msh');
const serverHealthDraggable = '&7TPS: 00.0\n&7Ping: 000.0';
let serverHealthDisplayText = '';

export const serverHealthDisplay = new PogObject("bao-dev", {
    "x": 3, 
    "y": 64,
}, '/data/serverHealthDisplay.json');
serverHealthDisplay.autosave(5);

register('step', () => {
    if (!getInSkyblock() || !World.isLoaded() || Settings.showServerHealthDisplay) return;
    let ping = getHypixelPing();
    let tps = getAvgTps();
    serverHealthDisplayText = `Ping: &b${ping}\nTPS: &b${tps}`;
}).setFps(1);

register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;;
    if (moveServerHealthDisplay.isOpen()) {
        serverHealthDisplay.x = constrainX(x, 3, serverHealthDraggable);
        serverHealthDisplay.y = constrainY(y, 3, serverHealthDraggable);
    };
    serverHealthDisplay.save();
});

registerWhen('renderOverlay', timeThis('registerOverlay serverHealthDisplayText', () => {
    Renderer.drawStringWithShadow(serverHealthDisplayText, serverHealthDisplay.x, serverHealthDisplay.y);
}), () => Settings.showServerHealthDisplay && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', timeThis('registerOverlay moveServerHealthDisplay', () => {
    renderGuiPosition(moveServerHealthDisplay, serverHealthDisplay, serverHealthDraggable);
}), () => getInSkyblock() && World.isLoaded());


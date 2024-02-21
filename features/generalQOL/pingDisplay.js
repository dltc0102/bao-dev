/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../config1/settings.js";
import PogObject from 'PogData';

import { createGuiCommand, renderGuiPosition } from "../../utils/functions";
import { constrainX, constrainY } from "../../utils/functions";
import { getInSkyblock } from "../../utils/functions";
import { registerWhen, timeThis } from "../../utils/utils";
import { getHypixelPing } from "../../utils/ping.js";

////////////////////////////////////////////////////////////////////////////////
// CONST
////////////////////////////////////////////////////////////////////////////////
const movePingDisplay = new Gui();
createGuiCommand(movePingDisplay, 'moveping', 'mping');
const pingDraggable = '&7Ping: 000.0';

// pogobject
export const pingDisplay = new PogObject("bao-dev", {
    "x": 3,
    "y": 84,
}, '/data/pingDisplay.json');
pingDisplay.autosave(5);

let pingDisplayText = '';

register('step', timeThis("registerStep update pingDisplayText", () => {
	if (!getInSkyblock() || !World.isLoaded() || Settings.showPingDisplay) return;
	pingDisplayText = `Ping: &b${getHypixelPing()}`
})).setFps(1);

register('dragged', timeThis("registerDragged movePingDisplay", (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;;
    if (movePingDisplay.isOpen()) {
        pingDisplay.x = constrainX(x, 3, pingDraggable);
        pingDisplay.y = constrainY(y, 3, pingDraggable);
    };
	pingDisplay.save();
}));

registerWhen('renderOverlay', timeThis('registerOverlay pingDisplayText', () => {
    Renderer.drawStringWithShadow(pingDisplayText, pingDisplay.x, pingDisplay.y);
}), () => Settings.showPingDisplay && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', timeThis('registerOverlay movePingDisplay', () => {
    renderGuiPosition(movePingDisplay, pingDisplay, pingDraggable)
}), () => getInSkyblock() && World.isLoaded());

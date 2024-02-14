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
const movePingDisplay = new Gui();
createGuiCommand(movePingDisplay, 'moveping', 'mping');
const pingDraggable = '&7Ping: 000.0';
const C16PacketClientStatus = Java.type('net.minecraft.network.play.client.C16PacketClientStatus');
const S01PacketJoinGame = Java.type('net.minecraft.network.play.server.S01PacketJoinGame');
const S37PacketStatistics = Java.type('net.minecraft.network.play.server.S37PacketStatistics');
const System = Java.type('java.lang.System')

// pogobject
export const pingDisplay = new PogObject("bao-dev", {
    "x": 3,
    "y": 84,
}, '/data/pingDisplay.json');
pingDisplay.autosave(5);

let isPinging = false
let pingCache = -1
let lastPingAt = -1
let pingDisplayText = '';


// functions
function sendPing() {
	if (!isPinging) {
		Client.sendPacket(new C16PacketClientStatus(C16PacketClientStatus.EnumState.REQUEST_STATS))
		lastPingAt = System.nanoTime()
		isPinging = true
	}
}

// reg step 
register('step', () => {
	if (!getInSkyblock() || !World.isLoaded() || Settings.showPingDisplay) return;
    sendPing()
}).setDelay(2);

register('worldLoad', timeThis("registerWorldLoad reset pingCache and isPinging flag", () => {
	pingCache = -1
	isPinging = false
}));

registerWhen('packetReceived', timeThis('registerPacketReceived onPacketJoinGame reset lastPingAt', () => {
	if (lastPingAt > 0) {
		lastPingAt = -1
		isPinging = false
	}
}), () => (Settings.showPingDisplay || Settings.pingCommands) && getInSkyblock() && World.isLoaded()).setFilteredClass(S01PacketJoinGame);

registerWhen('packetReceived', timeThis('registerPacketRecceived onPacketStatistics reset lastPingAt', () => {
	if (lastPingAt > 0) {
		let diff = Math.abs((System.nanoTime() - lastPingAt) / 1_000_000);
		lastPingAt *= -1
		pingCache = diff
		isPinging = false
	}
}), () => (Settings.showPingDisplay || Settings.pingCommands) && getInSkyblock() && World.isLoaded()).setFilteredClass(S37PacketStatistics);

register('step', () => {
	if (!getInSkyblock() || !World.isLoaded() || Settings.showPingDisplay) return;
	pingDisplayText = `Ping: &b${parseInt(pingCache)}`
}).setFps(1);

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

export function getPlayerPing() {
	return parseInt(pingCache);
};

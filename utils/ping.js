import Settings from "../config1/settings";

import { getInSkyblock } from "./functions";
import { registerWhen, timeThis } from "./utils";

const C16PacketClientStatus = Java.type('net.minecraft.network.play.client.C16PacketClientStatus');
const S01PacketJoinGame = Java.type('net.minecraft.network.play.server.S01PacketJoinGame');
const S37PacketStatistics = Java.type('net.minecraft.network.play.server.S37PacketStatistics');
const System = Java.type('java.lang.System')

let isPinging = false
let pingCache = -1
let lastPingAt = -1

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

export function getHypixelPing() {
    return parseInt(pingCache);
}
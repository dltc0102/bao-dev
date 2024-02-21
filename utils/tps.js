/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from '../config1/settings.js';

// if Settings.tps
import { registerWhen, timeThis } from "./utils";
import { getInSkyblock } from "./functions";

const S03PacketTimeUpdate = Java.type("net.minecraft.network.play.server.S03PacketTimeUpdate");

let prevTime = 0;
let avgTps = 20.0;
let tps = 20.0;

registerWhen('worldLoad', timeThis('registerWorldLoad reset tps', () => {
    prevTime = 0;
    avgTps = 20.0;
}), () => getInSkyblock() && World.isLoaded());

registerWhen('packetReceived', timeThis('registerPacketReceived process current tps', (packet) => {
    if (!(packet instanceof S03PacketTimeUpdate)) return;
    tps = 20000 / (Date.now() - prevTime + 1);
    tps = tps > 20 ? 20.0 :
        tps < 0 ? 0.0 :
            tps;
    if (prevTime !== 0) avgTps = tps * 0.182 + avgTps * 0.818;
    prevTime = Date.now();
}), () => (Settings.showTpsDisplay || Settings.tpsCommands) && getInSkyblock() && World.isLoaded());

export function getTps() {
    return tps;
}

export function getAvgTps() {
    return avgTps;
}
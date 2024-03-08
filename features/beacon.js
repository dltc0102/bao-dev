import { drawBeacon, drawOutlineBeacon } from "../utils/functions";

import { getInSkyblock } from "../utils/functions";
import { registerWhen, timeThis } from "../utils/utils";

let beaconPositions = [];
register('command', () => {
    ChatLib.chat(`Party > oBiscuit: x: ${Player.getX()}, y: ${Player.getY()}, z: ${Player.getZ()}`)
    beaconPositions.push([Player.getX(), Player.getY(), Player.getZ()])
}).setName('testpos');

registerWhen('chat', timeThis('', (playerName, px, py, pz, event) => {
    beaconPositions.push([px, py, pz]);
}), () => getInSkyblock() && World.isLoaded()).setCriteria('Party > ${playerName}: x: ${px}, y: ${py}, z: ${pz}');

// registerWhen('renderWorld', timeThis('', () => {
//     let [x, y, z ] = beaconPos;
//     drawBeacon(x, y+1, z, 'white', 1, true);
// }), () => getInSkyblock() && World.isLoaded());
register('renderWorld', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (beaconPositions.length === 0) return;
    for (let pdx = 0; pdx < beaconPositions.length; pdx++) {
        let [px, py, pz] = beaconPositions[pdx];
        console.log(px, py, pz)
        drawBeacon(px, py+1, pz, 'light_blue', 0.5, true);
    }
})
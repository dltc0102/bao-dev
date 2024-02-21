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
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const entityPlayer = Java.type("net.minecraft.entity.player.EntityPlayer");
const movePlayerCounter = new Gui();
createGuiCommand(movePlayerCounter, 'moveplayer', 'mpc');
const playerDraggable = '&7Players: 0';

let playerCount = 0;
let playerCountText = '';

export const playerCountDisplay = new PogObject("bao-dev", {
    'x': 3,
    'y': 24,
}, '/data/playerCountDisplay.json');
playerCountDisplay.autosave(5);

let hasSBA = false;
register('gameLoad', () => {
    hasSBA = isSBALoaded();
});


////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function getPlayerCount(entityPlayer) {
    const regex = /taurus/i;
    let nbPlayers = World.getAllEntitiesOfType(entityPlayer).filter(player => player.distanceTo(Player.getPlayer()) < 31);
    let tabNames = TabList.getNames().filter(name => /\[.*\]/.test(name)).map(name => name.split(' ')[1].removeFormatting());

    return nbPlayers
        .filter(player => !regex.test(player.getName()))
        .map(player => player.getName())
        .filter(name => tabNames.includes(name)).length;
}


////////////////////////////////////////////////////////////////////////////////
// REG: STEP
////////////////////////////////////////////////////////////////////////////////
register('step', timeThis("regissterStep update playerCountText", () => {
    if (!getInSkyblock() || !World.isLoaded() || !Settings.playersNearbyCount) return;
    playerCount = getPlayerCount(entityPlayer);
    let numPlayers = playerCount > 0 ? Math.round(playerCount) : 0;

    if (Settings.playerChroma && playerCount >= Settings.playerChromaNum) {
        playerCountText = hasSBA ? `&zPlayers: ${numPlayers}` : `&rPlayers: &b&l${numPlayers}`;
        return;
    }
    let colorF = playerCount >= 20 ? '&b&l' : '&b';
    playerCountText = `&rPlayers: ${colorF}${numPlayers}`;
})).setFps(3);


////////////////////////////////////////////////////////////////////////////////
// REG: DRAG
////////////////////////////////////////////////////////////////////////////////
register('dragged', timeThis("registerDragged movePlayerCounter", (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (movePlayerCounter.isOpen()){
        playerCountDisplay.x = constrainX(x, 3, playerDraggable);
        playerCountDisplay.y = constrainY(y, 3, playerDraggable);
    };
    playerCountDisplay.save();
}))


////////////////////////////////////////////////////////////////////////////////
// REG: OVERLAY
////////////////////////////////////////////////////////////////////////////////
registerWhen('renderOverlay', timeThis("renderOverlay playerCountText", () => {
    Renderer.drawStringWithShadow(playerCountText, playerCountDisplay.x, playerCountDisplay.y);
}), () => Settings.playersNearbyCount && !getInGarden() && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', timeThis("renderOverlay playerCountText draggable", () => {
    renderGuiPosition(movePlayerCounter, playerCountDisplay, playerDraggable);
}), () => getInSkyblock() && World.isLoaded());



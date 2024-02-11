import Settings from "../../settings.js";

import { getInSkyblock, getInGarden } from "../../utils/functions.js";
import { constrainX, constrainY } from '../../utils/functions.js' // padding
import { createGuiCommand, renderGuiPosition } from '../../utils/functions.js'; // gui
import { registerWhen } from "../../utils/utils.js";


////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const entityPlayer = Java.type("net.minecraft.entity.player.EntityPlayer");
const movePlayerCounter = new Gui();
createGuiCommand(movePlayerCounter, 'moveplayer', 'mpc');
const playerDraggable = '&7Players: 0';

const counterInfo = {
    'count': 0,
    'text': 0, 
    'x': 3,
    'y': 24,
};


////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function updateEntityText(name, count) {
    let colorF = count > 6 ? '&b&l' : '&b'
    let nbEntitiesText = count > 0 ? Math.round(count) : '0';
    return `&r${name}: ${colorF}${nbEntitiesText}`;
}

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
// REG: DRAG
////////////////////////////////////////////////////////////////////////////////
register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (movePlayerCounter.isOpen()){
        counterInfo.player.x = constrainX(x, 3, playerDraggable);
        counterInfo.player.y = constrainY(y, 3, playerDraggable);
    }
})


////////////////////////////////////////////////////////////////////////////////
// REG: STEP
////////////////////////////////////////////////////////////////////////////////
register('step', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (Settings.playersNearbyCount) {
        counterInfo.count = getPlayerCount(entityPlayer);
        counterInfo.text = updateEntityText('Players', counterInfo.count);
    }
}).setFps(3);


////////////////////////////////////////////////////////////////////////////////
// REG: OVERLAY
////////////////////////////////////////////////////////////////////////////////
registerWhen('renderOverlay', () => {
    Renderer.drawStringWithShadow(counterInfo.text, counterInfo.x, counterInfo.y);
}, () => Settings.playersNearbyCount && !getInGarden() && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', () => {
    renderGuiPosition(movePlayerCounter, counterInfo, playerDraggable);
}, () => getInSkyblock() && World.isLoaded());



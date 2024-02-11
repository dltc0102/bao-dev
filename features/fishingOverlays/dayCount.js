import Settings from "../../settings.js";

import { getInSkyblock, getInGarden } from "../../utils/functions.js";
import { constrainX, constrainY } from '../../utils/functions.js' // padding
import { createGuiCommand, renderGuiPosition } from '../../utils/functions.js'; // gui
import { registerWhen } from "../../utils/utils.js";


////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const moveDayCounter = new Gui();
createGuiCommand(moveDayCounter, 'movedaycount', 'mdc');
const dayDraggable = '&7Day: 0.00'

const counterInfo = {
    'text': 0, 
    'x': 3,
    'y': 34,
};


////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function getLobbyDay() {
    let lobbyTicks = World.getTime();
    let day = (lobbyTicks / 24000).toFixed(2);
    return `Day: &b${day}`;
}


////////////////////////////////////////////////////////////////////////////////
// REG: STEP
////////////////////////////////////////////////////////////////////////////////
register('step', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (Settings.lobbyDayCount) {
        counterInfo.text = getLobbyDay();
    }
}).setFps(3);


////////////////////////////////////////////////////////////////////////////////
// REG: DRAG
////////////////////////////////////////////////////////////////////////////////
register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (moveDayCounter.isOpen()){
        counterInfo.x = constrainX(x, 3, dayDraggable);
        counterInfo.y = constrainY(y, 3, dayDraggable);
    }
})


////////////////////////////////////////////////////////////////////////////////
// REG: OVERLAY
////////////////////////////////////////////////////////////////////////////////
registerWhen('renderOverlay', () => {
    Renderer.drawStringWithShadow(counterInfo.text, counterInfo.x, counterInfo.y);
}, () => Settings.lobbyDayCount && !getInGarden() && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', () => {
    renderGuiPosition(moveDayCounter, counterInfo, dayDraggable);
}, () => getInSkyblock() && World.isLoaded());


import Settings from "../../config1/settings.js";
import PogObject from 'PogData';

import { getInSkyblock, getInGarden } from "../../utils/functions.js";
import { constrainX, constrainY } from '../../utils/functions.js' // padding
import { createGuiCommand, renderGuiPosition } from '../../utils/functions.js'; // gui
import { registerWhen, timeThis } from "../../utils/utils.js";


////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const moveDayCounter = new Gui();
createGuiCommand(moveDayCounter, 'movedaycount', 'mdc');
const dayDraggable = '&7Day: 0.00'

export const dayCountDisplay = new PogObject("bao-dev", {
    'x': 3,
    'y': 34,
}, '/data/dayCountDisplay.json');
dayCountDisplay.autosave(5);


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
let lobbyDayText = '';
register('step', timeThis("registerStep update lobbyDayText", () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (Settings.lobbyDayCount) lobbyDayText = getLobbyDay();
})).setFps(2);


////////////////////////////////////////////////////////////////////////////////
// REG: DRAG
////////////////////////////////////////////////////////////////////////////////
register('dragged', timeThis("registerDragged moveDayCounter", (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (moveDayCounter.isOpen()){
        dayCountDisplay.x = constrainX(x, 3, dayDraggable);
        dayCountDisplay.y = constrainY(y, 3, dayDraggable);
    };
    dayCountDisplay.save();
}))


////////////////////////////////////////////////////////////////////////////////
// REG: OVERLAY
////////////////////////////////////////////////////////////////////////////////
registerWhen('renderOverlay', timeThis("renderOverlay lobbyDayText", () => {
    Renderer.drawStringWithShadow(lobbyDayText, dayCountDisplay.x, dayCountDisplay.y);
}), () => Settings.lobbyDayCount && !getInGarden() && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', timeThis("renderOverlay lobbyDayText draggable", () => {
    renderGuiPosition(moveDayCounter, dayCountDisplay, dayDraggable);
}), () => getInSkyblock() && World.isLoaded());


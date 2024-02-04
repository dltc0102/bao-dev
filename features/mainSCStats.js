import Settings from '../settings.js';
import PogObject from 'PogData';

import { createGuiCommand, playSound, renderGuiPosition } from '../utils/functions.js';
import { getInSkyblock, getCurrArea } from '../utils/functions.js'; // sb, area
import { constrainX, constrainY } from '../utils/functions.js' // padding
import { baoWaterSCStats } from './waterSCStats.js';
import { baoLavaSCStats } from './lavaSCStats.js';
import { getInCI, getInJerry, getInIsland } from '../utils/functions.js';

////////////////////////////////////////////////////////////////////////////////
// SETUP CONSTS
////////////////////////////////////////////////////////////////////////////////
const movefishcounter = new Gui();
createGuiCommand(movefishcounter, 'movefishcounter', 'mfc');

const fishCounterDraggable = '&7<><FISHING AREA><>\n&7==================\n&7Kills #1: &b...\n&7Kills #2: &b...: &b...\n&7Kills #3: &b...\n&7-----------------\n&7Drops #1: &b...\n&7Drops #2: &b...\n&7Drops #3: &b...\n&7-----------------\n&7SC since Mob #1: &b...\n&7 SC since Mob #2: &b...\n&7-----------------\n&7Mob since Drop #1: &b...\n&7 Mob since Drop #2: &b...\n&7-----------------\nAverage SC per Mob #1: &b...\n&7Average SC per Mob #2: &b...\n&7Average SC per Mob #3: &b...\n&7-----------------\n&7Time Since Mob #1: &b...\n&7Time Since Mob #2: &b...\n&7-----------------\n&7Time Since Drop #1: &b...\n&7Time Since Drop #2';

export const baoFishStats = new PogObject("bao-dev", {
    "x": 5, 
    "y": 100, 
    "overallDisplay": '',
}, '/data/baoFishStats.json');
baoFishStats.autosave(5);


////////////////////////////////////////////////////////////////////////////
// RENDER OVERLAY COUNTER --------------------------------------------------
////////////////////////////////////////////////////////////////////////////
register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (movefishcounter.isOpen()) {
        baoFishStats.x = constrainX(x, 3, fishCounterDraggable);
        baoFishStats.y = constrainY(y, 3, fishCounterDraggable);
    }
    baoFishStats.save();
})

register('renderOverlay', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (!Settings.fishing_counter) return;
    if (getInCI()) Renderer.drawStringWithShadow(baoLavaSCStats.CIDisplay, baoFishStats.x, baoFishStats.y);

    if (getInJerry()) Renderer.drawStringWithShadow(baoWaterSCStats.WIDisplay, baoFishStats.x, baoFishStats.y);

    if (!getInCI() && !getInJerry() && !getInIsland()) Renderer.drawStringWithShadow(baoWaterSCStats.HUBDisplay, baoFishStats.x, baoFishStats.y);

    renderGuiPosition(movefishcounter, baoFishStats, fishCounterDraggable);
    baoFishStats.save();
});

////////////////////////////////////////////////////////////////////////////
// SOME NEW SEA CREATURES I GUESS LOL 
////////////////////////////////////////////////////////////////////////////
// trophy fishing
// hide bronze
register('chat', (fish, event) => {
    if (Settings.toggleTrophyFishMsgs) cancel(event);
}).setCriteria('TROPHY FISH! You caught a ${fish} BRONZE.');

// hide silver
register('chat', (fish, event) => {
    if (Settings.toggleTrophyFishMsgs) cancel(event);
}).setCriteria('TROPHY FISH! You caught a ${fish} SILVER.');

// hide gold
register('chat', (fish, event) => {
    if (Settings.toggleTrophyFishMsgs) cancel(event);
}).setCriteria('TROPHY FISH! You caught a ${fish} GOLD.');

// hide diamond
register('chat', (fish, event) => {
    if (Settings.toggleTrophyFishMsgs) playSound();
}).setCriteria('TROPHY FISH! You caught a ${fish} DIAMOND.');

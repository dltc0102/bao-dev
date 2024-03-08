import Settings from '../config1/settings.js';
import PogObject from 'PogData';

import { createGuiCommand, renderGuiPosition } from '../utils/functions.js';
import { getInSkyblock } from '../utils/functions.js'; // sb, area
import { constrainX, constrainY } from '../utils/functions.js' // padding
import { baoWaterSCStats } from './waterSCStats.js';
import { baoLavaSCStats } from './lavaSCStats.js';
import { getInCI, getInJerry, getInIsland } from '../utils/functions.js';
import { registerWhen, timeThis } from '../utils/utils.js';


// register('command', () => {
//     baoLavaSCStats.phlegblastCatches = 1;
//     baoLavaSCStats.magmaSlugCatches = 21649;
//     baoLavaSCStats.moogmaCatches = 16573;
//     baoLavaSCStats.lavaLeechCatches = 8234;
//     baoLavaSCStats.pyroclasticWormCatches = 5592;
//     baoLavaSCStats.lavaFlameCatches = 5025;
//     baoLavaSCStats.fireEelsCatches = 4025;
//     baoLavaSCStats.taurusCatches = 2412;
//     baoLavaSCStats.thunderCatches = 975;
//     baoLavaSCStats.lordJawbusCatches = 345;

//     baoWaterSCStats.squidCatches = 19233;
//     baoWaterSCStats.nightSquidCatches = 855;
//     baoWaterSCStats.seaWalkerCatches = 10890;
//     baoWaterSCStats.seaGuardianCatches = 8495;
//     baoWaterSCStats.seaWitchCatches = 9530;
//     baoWaterSCStats.seaArcherCatches = 7512;
//     baoWaterSCStats.rotdCatches = 5768;
//     baoWaterSCStats.catfishCatches = 3849;
//     baoWaterSCStats.carrotKingCatches = 218;
//     baoWaterSCStats.seaLeechCatches = 2531;
//     baoWaterSCStats.guardianDefenderCatches = 2007;
//     baoWaterSCStats.deepSeaProtectorCatches = 1320;
//     baoWaterSCStats.waterHydraCatches = 708;
//     baoWaterSCStats.seaEmperorCatches = 211;
//     baoWaterSCStats.agarimooCatches = 439;
//     baoWaterSCStats.abyssalMinerCatches = 2;
//     baoWaterSCStats.oasisRabbitCatches = 23;
//     baoWaterSCStats.oasisSheepCatches = 56;
//     baoWaterSCStats.poisonedWaterWormCatches = 13;
//     baoWaterSCStats.waterWormCatches = 10;
// }).setName('setbiscuitstats');

////////////////////////////////////////////////////////////////////////////////
// CONSTS
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
// REG: DRAG
////////////////////////////////////////////////////////////////////////////
register('dragged', timeThis("registerDragged movefishcounter", (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (movefishcounter.isOpen()) {
        baoFishStats.x = constrainX(x, 3, fishCounterDraggable);
        baoFishStats.y = constrainY(y, 3, fishCounterDraggable);
    }
    baoFishStats.save();
}))


////////////////////////////////////////////////////////////////////////////
// REG: OVERLAY
////////////////////////////////////////////////////////////////////////////
registerWhen('renderOverlay', timeThis("renderOverlay ci display", () => {
    Renderer.drawStringWithShadow(baoLavaSCStats.CIDisplay, baoFishStats.x, baoFishStats.y);
}), () => Settings.fishing_counter && getInCI() && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', timeThis("renderOverlay wi display", () => {
    Renderer.drawStringWithShadow(baoWaterSCStats.WIDisplay, baoFishStats.x, baoFishStats.y);
}), () => Settings.fishing_counter && getInJerry() && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', timeThis("renderOverlay hub display", () => {
    Renderer.drawStringWithShadow(baoWaterSCStats.HUBDisplay, baoFishStats.x, baoFishStats.y);
}), () => Settings.fishing_counter && !getInCI() && !getInJerry() && !getInIsland() && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', timeThis("renderOverlay fishCounter draggable", () => {
    renderGuiPosition(movefishcounter, baoFishStats, fishCounterDraggable);
}), () => getInSkyblock() && World.isLoaded());

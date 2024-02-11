import Settings from "../../settings";
import Audio from "../../utils/audio";

import { getInSkyblock, getInDungeon } from "../../utils/functions";
import { showAlert } from "../../utils/utils";


////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const invAudio = new Audio();


////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function isPlayerInvFull() {
    if (!getInSkyblock() || !World.isLoaded()) return;
    let playerInv = Player.getInventory().getItems().map(obj => (obj === null ? 'null' : obj.toString()));
    let barrierItem = '1xtile.barrier@0';
    if (playerInv.includes('null') || playerInv.includes(barrierItem)) {
        return false;
    } else {
        return true;
    }
}


////////////////////////////////////////////////////////////////////////////////
// REG: STEP
////////////////////////////////////////////////////////////////////////////////
register('step', () => {
    if (Settings.dungeonMessageQOL && isPlayerInvFull() && getInDungeon() && getInSkyblock() && World.isLoaded()) {
        showAlert('&4&lFull Inv');
        invAudio.playDefaultSound();
    }
}).setFps(1);

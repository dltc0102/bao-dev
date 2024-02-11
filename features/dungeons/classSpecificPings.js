import Settings from "../../settings.js";
import Audio from "../../utils/audio";

import { getInSkyblock, getInDungeon } from "../../utils/functions";
import { showAlert } from "../../utils/utils";
import { registerWhen } from "../../utils/utils";

const roleAudio = new Audio();

// if Settings.showClassSpecificPings

function getPlayerClass() {
    let tabInfo = TabList.getNames();
    for (let i = 0; i < tabInfo.length; i++) {
        let tabName = tabInfo[i].removeFormatting();
        let playerRegex = /\[\d+\] (\w+)\s?(\S+)? \(([^)]+) .+\)/;
        let tabLineMatch = tabName.match(playerRegex);
        if (tabLineMatch && tabLineMatch[1].includes(Player.getName())) {
            return tabLineMatch[3].trim();
        }
    }
}

function shouldHandleClassSpecificPings() {
    return getInDungeon() && getInSkyblock() && World.isLoaded();
}

registerWhen('chat', (event) => {
    if (getPlayerClass() === 'Healer') {
        showAlert(`&f&lWISH`);
        roleAudio.playDefaultSound();
    }
    if (getPlayerClass() === 'Tank') {
        showAlert(`&f&lCASTLE`);
        roleAudio.playDefaultSound();
    }
}, () => shouldHandleClassSpecificPings()).setCriteria('⚠ Maxor is enraged! ⚠');

registerWhen('chat', (event) => {
    if (getPlayerClass() === 'Healer') {
        showAlert(`&f&lWISH`);
        roleAudio.playDefaultSound();
    }
    if (getPlayerClass() === 'Tank') {
        showAlert(`&f&lCASTLE`);
        roleAudio.playDefaultSound();
    }
}, () => shouldHandleClassSpecificPings()).setCriteria('[BOSS] Goldor: You have done it, you destroyed the factory…');

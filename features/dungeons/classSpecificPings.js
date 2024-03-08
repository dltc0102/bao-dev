import Settings from "../../config1/settings.js";
import Audio from "../../utils/audio";

import { getInSkyblock, getInDungeon } from "../../utils/functions";
import { showAlert } from "../../utils/utils";
import { registerWhen, timeThis } from "../../utils/utils";

const roleAudio = new Audio();

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

registerWhen('chat', timeThis("registerChat maxor is enraged", (event) => {
    let regStart = Instant.now().getNano();
    
    if (getPlayerClass() === 'Healer') {
        showAlert(`&f&lWISH`);
        roleAudio.playDefaultSound();
    }
    if (getPlayerClass() === 'Tank') {
        showAlert(`&f&lCASTLE`);
        roleAudio.playDefaultSound();
    }

    let regEnd = Instant.now().getNano();
    let regDiff = regEnd - regStart;
    if (regDiff > 0) {
        console.log('')
        console.log(`regwhen - chat - 'maxor is enraged (h/t ping)'`);
        console.log(`timeTake (ns > 0): ${regDiff}`);
    }
}), () => Settings.showClassSpecificPings && shouldHandleClassSpecificPings()).setCriteria('⚠ Maxor is enraged! ⚠');

registerWhen('chat', timeThis("registerChat goldor enters core entrance", (event) => {
    if (getPlayerClass() === 'Healer') {
        showAlert(`&f&lWISH`);
        roleAudio.playDefaultSound();
    }
    if (getPlayerClass() === 'Tank') {
        showAlert(`&f&lCASTLE`);
        roleAudio.playDefaultSound();
    }
}), () => Settings.showClassSpecificPings && shouldHandleClassSpecificPings()).setCriteria('[BOSS] Goldor: You have done it, you destroyed the factory…');

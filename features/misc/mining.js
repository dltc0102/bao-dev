import ExtraSettings from "../../config2/extraSettings.js";
import Audio from "../../utils/audio";

import { registerWhen, timeThis } from "../../utils/utils";
import { getInSkyblock, getInMines, getInCH } from "../../utils/functions";
import { petDropPing } from "../../utils/functions";

////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const miningAudio = new Audio();


////////////////////////////////////////////////////////////////////////////////
// GOLDEN GOBLIN ALERT
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat golden goblin ping", (event) => {
    cancel(event);
    showAlert('&6Golden Goblin');
    sendMessage('[!] Golden Goblin [!]')
    miningAudio.playDefaultSound();
}), () => ExtraSettings.goldenGoblinAlert && (getInMines() || getInCH()) && getInSkyblock() && World.isLoaded()).setCriteria('A Golden Goblin has spawned!');


////////////////////////////////////////////////////////////////////////////////
// SCATHA PET
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat scatha pet ping", (mf, event) => {
    cancel(event);
    const message = ChatLib.getChatMessage(event, true);
    petDropPing(message, 'PET DROP!', 'Scatha', mf);
}), () => ExtraSettings.goldenGoblinAlert && getInCH() && getInSkyblock() && World.isLoaded()).setCriteria('PET DROP! Scatha (+${mf}% ✯ Magic Find)');


////////////////////////////////////////////////////////////////////////////////
// BAL PET
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat bal pet ping", (mf, event) => {
    cancel(event);
    sendMessage(`RARE DROP A Bal Pet Dropped!`);
    miningAudio.playDefaultSound();
}), () => ExtraSettings.goldenGoblinAlert && getInCH() && getInSkyblock() && World.isLoaded()).setCriteria('RARE DROP A Bal Pet Dropped!');
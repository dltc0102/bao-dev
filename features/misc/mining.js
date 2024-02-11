import Settings from "../../settings";
import Audio from "../../utils/audio";

import { registerWhen } from "../../utils/utils";
import { getInSkyblock, getInMines, getInCH } from "../../utils/functions";


////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const miningAudio = new Audio();


////////////////////////////////////////////////////////////////////////////////
// GOLDEN GOBLIN ALERT
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    cancel(event);
    showAlert('&6Golden Goblin');
    sendMessage('[!] Golden Goblin [!]')
    miningAudio.playDefaultSound();
}, () => Settings.goldenGoblinAlert && (getInMines() || getInCH()) && getInSkyblock() && World.isLoaded()).setCriteria('A Golden Goblin has spawned!');


////////////////////////////////////////////////////////////////////////////////
// SCATHA PET
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (mf, event) => {
    cancel(event);
    const message = ChatLib.getChatMessage(event, true);
    petDropPing(message, 'PET DROP!', 'Scatha', mf);
}, () => Settings.goldenGoblinAlert && getInCH() && getInSkyblock() && World.isLoaded()).setCriteria('PET DROP! Scatha (+${mf}% ✯ Magic Find)');


////////////////////////////////////////////////////////////////////////////////
// BAL PET
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (mf, event) => {
    cancel(event);
    sendMessage(`RARE DROP A Bal Pet Dropped!`);
    miningAudio.playDefaultSound();
}, () => Settings.goldenGoblinAlert && getInCH() && getInSkyblock() && World.isLoaded()).setCriteria('RARE DROP A Bal Pet Dropped!');
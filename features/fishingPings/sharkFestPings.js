import Settings from "../../settings";
import Audio from "../../utils/audio";

import { getInSkyblock, petDropPing } from "../../utils/functions";
import { sendMessage } from "../../utils/party";
import { registerWhen, showAlert, timeThis } from "../../utils/utils";


////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const sharkAudio = new Audio();
const gwTitle = '&3Great White';


////////////////////////////////////////////////////////////////////////////////
// GREAT WHITE SHARK
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat great white shark ping", (event) => {
    cancel(event);
    showAlert(gwTitle);
    sendMessage('[!] Great White Shark [!]');
    sharkAudio.playDefaultSound();
}), () => Settings.gwPing && getInSkyblock() && World.isLoaded()).setCriteria('Hide no longer, a Great White Shark has tracked your scent and thirsts for your blood!');


////////////////////////////////////////////////////////////////////////////////
// GREAT WHITE SHARK: MEGALODON PET
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat megalodon pet ping", (mf, event) => {
    const message = ChatLib.getChatMessage(event, true);
    petDropPing(message, 'PET DROP!', 'Megalodon', mf);
}), () => getInSkyblock() && World.isLoaded()).setCriteria('PET DROP! Megalodon (+${mf}% ✯ Magic Find)');


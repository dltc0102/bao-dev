import ExtraSettings from "../../config2/extraSettings.js";
import Audio from "../../utils/audio";

import { registerWhen, showAlert, timeThis } from "../../utils/utils";
import { getInSkyblock, getInHub } from "../../utils/functions";
import { sendMessage } from "../../utils/party";


////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const spookyAudio = new Audio();
const wildHorseTitle = '&6Horseman &r@ &2Wilderness'
const graveHorseTitle = '&6Horseman &r@ &cGraveyard'

////////////////////////////////////////////////////////////////////////////////
// TRICK OR TREAT MOB PINGS
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat spookyMob ping", (spookyMob, event) => {
    cancel(event);
    showAlert(`&8${spookyMob}`);
    sendMessage(`[!] ${spookyMob} [!]`);
    spookyAudio.playDefaultSound();
}), () => getInSkyblock() && World.isLoaded()).setCriteria('TRICK! A ${spookyMob} has tricked you!');


////////////////////////////////////////////////////////////////////////////////
// HEADLESS HORSEMAN PING
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat horseman ping", (spawner, location, event) => {
    cancel(event);
    if (location === 'Wilderness') showAlert(wildHorseTitle);
    if (location === 'Graveyard') showAlert(graveHorseTitle);
    sendMessage(`[!] Horseman @ ${location} [!]`);
    spookyAudio.playDefaultSound();
}), () => ExtraSettings.horseman_ping && getInHub() && getInSkyblock() && World.isLoaded()).setCriteria("${spawner} has spawned the Headless Horseman boss in the ${location}!");


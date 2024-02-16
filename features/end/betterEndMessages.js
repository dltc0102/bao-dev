/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import ExtraSettings from "../../extraSettings.js";
import Audio from "../../utils/audio";

import { getInSkyblock, getInEnd } from "../../utils/functions";
import { showAlert, registerWhen, timeThis } from "../../utils/utils";
import { sendMessage } from "../../utils/party";


////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const endProtTitle = '&8End Protector'
const endAudio = new Audio();


////////////////////////////////////////////////////////////////////////////////
// REG: CHAT
////////////////////////////////////////////////////////////////////////////////
const someEndMessages = [
    /Your Sleeping Eyes have been awoken by the magic of the Dragon\. They are now Remnants of the Eye!/, 
    /☬ The .+ Dragon has spawned!/, 
    /☬ The Dragon's Gate is .+!/, 
    /☬ .+ Dragon used .+ on you for .+ damage\./, 
    /☬ .+ destroyed an Ender Crystal!/, 
    / ☠ .+ was killed by .+ Dragon./, 
];

someEndMessages.forEach(msg => {{
    registerWhen('chat', timeThis("registerChat cancel someEndMessages", (event) => {
        cancel(event);
    }), () => ExtraSettings.betterEndMessages && getInEnd() && getInSkyblock() && World.isLoaded()).setCriteria(msg);
}});

registerWhen('chat', timeThis("registerChat endstone protector spawning message", (event) => {
    endAudio.playDefaultSound();
    sendMessage('Endstone Protector Spawning');
    showAlert(endProtTitle)
}), () => ExtraSettings.end_protector_ping && getInEnd() && getInSkyblock() && World.isLoaded()).setCriteria('The ground begins to shake as an Endstone Protector rises from below!');

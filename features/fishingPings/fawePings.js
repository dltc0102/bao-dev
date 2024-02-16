/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../settings.js";
import Audio from "../../utils/audio.js";

import { registerWhen, showAlert, timeThis } from "../../utils/utils";
import { getInSkyblock } from "../../utils/functions.js";


////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////
const fawePingAudio = new Audio();


////////////////////////////////////////////////////////////////////////////
// FAWE PINGS
////////////////////////////////////////////////////////////////////////////
const faweMessages = [
    { message: "A Jawbus has spawned", alert: "&4JAWBUS" },
    { message: 'A Thunder has spawned', alert: '&bTHUNDER'}, 
    { message: 'A Vanquisher has spawned', alert: '&5Vanquisher'}, 
    { message: 'A YETI has spawned', alert: '&fYETI'}, 
    { message: 'A Great White Shark has spawned', alert: '&3Great White'}, 
    { message: 'A Phantom Fisher has spawned', alert: '&dPhantom Fisher'}, 
    { message: 'A Grim Reaper has spawned', alert: '&5GRIM REAPER'}, 
    { message: 'A Sea Emperor has spawned', alert: '&6Sea Emperor'}, 
    { message: 'A Carrot King has spawned', alert: '&6Carrot King'}, 
    { message: 'Nut in comming', alert: '&7Nutcracker'}, 
]

faweMessages.forEach(({ message, alert}) => {
    registerWhen('chat', timeThis("registerChat cancel faweMessages", (event) => {
        showAlert(alert);
        fawePingAudio.playDefaultSound();
    }), () => Settings.fawePings && getInSkyblock() && World.isLoaded()).setCriteria(message).setContains();
})

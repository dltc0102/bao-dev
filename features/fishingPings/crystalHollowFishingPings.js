/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../settings";
import Audio from "../../utils/audio";

import { getInSkyblock, getInCH } from "../../utils/functions";
import { sendMessage } from "../../utils/party";
import { registerWhen, showAlert, timeThis } from "../../utils/utils";


////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const chAudio = new Audio();
const abyssalMinerTitle = '&3Abyssal Miner';


////////////////////////////////////////////////////////////////////////////////
// ABYSSAL MINER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat abyssal miner ping", (event) => {
    cancel(event);
    showAlert(abyssalMinerTitle);
    sendMessage('[!] Abyssal Miner [!]');
    chAudio.playDefaultSound();
}), () => Settings.zombieMinerPing && getInCH() && getInSkyblock() && World.isLoaded()).setCriteria("An Abyssal Miner breaks out of the water!");


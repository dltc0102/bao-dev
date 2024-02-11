import Settings from "../../settings";
import Audio from "../../utils/audio";

import { getInSkyblock, getInCH } from "../../utils/functions";
import { sendMessage } from "../../utils/party";
import { registerWhen, showAlert } from "../../utils/utils";


////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const chAudio = new Audio();
const abyssalMinerTitle = '&3Abyssal Miner';


////////////////////////////////////////////////////////////////////////////////
// ABYSSAL MINER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    cancel(event);
    showAlert(abyssalMinerTitle);
    sendMessage('[!] Abyssal Miner [!]');
    chAudio.playDefaultSound();
}, () => Settings.zombieMinerPing && getInCH() && getInSkyblock() && World.isLoaded()).setCriteria("An Abyssal Miner breaks out of the water!");


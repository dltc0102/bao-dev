import Settings from "../../config1/settings.js";
import Audio from "../../utils/audio.js";

import { getInSkyblock, getInHub } from '../../utils/functions.js'; // sb, area
import { sendMessage } from '../../utils/party';
import { baoUtils, registerWhen, showAlert, timeThis } from '../../utils/utils.js';

const qolAudio = new Audio();

///////////////////////////////////////////////////////////////////////////////
// Kicked from SB Alert 
///////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat kicked from sb notifier message", (event) => {
    sendMessage('You were kicked while joining that server! 1 minute cooldown.');
}), () => Settings.notifyKicked && getInSkyblock() && World.isLoaded()).setCriteria('You were kicked while joining that server!');


////////////////////////////////////////////////////////////////////////////////
// EASY BAKER QOL
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat openbaker qol feature", (event) => {
    setTimeout(() => {
        ChatLib.command('openbaker');
    }, 250);
}), () => Settings.getBakerCake && getInSkyblock() && World.isLoaded()).setCriteria('CLICK HERE to get your SPECIAL new year cake!').setContains();


// private mega
function getNumLobbyPlayers() {
    let names = TabList.getNames().filter(name => /\[.*\]/.test(name)).map(name => name.split(' ')[1].removeFormatting());
    names = [...new Set(names)];
    return names.length;
};

registerWhen('chat', timeThis('', (serverID, event) => {
    setTimeout(() => {
        let lobbyPlayers = getNumLobbyPlayers();
        if (lobbyPlayers === 1) {
            ChatLib.chat(`${baoUtils.modPrefix} &6Private Mega Found!`);
            showAlert('&6Private Mega :D');
            qolAudio.playDefaultSound();
        };
    }, 1000)
}), () => getInHub() && getInSkyblock() && World.isLoaded()).setCriteria('Sending to server mega${serverID}...');

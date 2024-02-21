/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

// import ExtraSettings from "../../config2/extraSettings.js";
import Audio from "../../utils/audio";

import { getInEnd, getInSkyblock } from "../../utils/functions";
import { registerWhen, timeThis } from "../../utils/utils";


////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const endStatsAudio = new Audio();
export const baoEnd = {
    "spawned": false,
    "eyesPlaced": 0,
    "crystalsBroken": 0, 
    "counter": {
        "old": 0, 
        "protector": 0, 
        "strong": 0,
        "unstable": 0, 
        "wise": 0, 
        "young": 0, 
        "superior": 0,
        "dragsSinceSuperior": 0,
    },
    "displayText": '',
};


////////////////////////////////////////////////////////////////////////////////
// REG: CHAT
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat eyesPlaced++ stat", (playerName, numEyes, event) => {
    if (playerName === Player.getName()) baoEnd.eyesPlaced++;
}), () => getInEnd() && getInSkyblock() && World.isLoaded()).setCriteria('☬ ${playerName} placed a Summoning Eye! (${numEyes}/8)');


registerWhen('chat', timeThis("registerChat reset stats when dragon egg spawns", (event) => {
    baoEnd.eyesPlaced = 0;
    baoEnd.spawned = false;
    endStatsAudio.playDefaultSound();
}), () => getInEnd() && getInSkyblock() && World.isLoaded()).setCriteria('☬ The Dragon Egg has spawned!');


registerWhen('chat', timeThis("registerChat dragon spawned message", (dragName, event) => {
    let dragNameLower = dragName.toLowerCase();
    if (dragNameLower !== 'superior') {
        baoEnd.counter[dragNameLower] += 1;
        baoEnd.counter.dragsSinceSuperior += 1;
    } else if (dragNameLower === 'superior') {
        baoEnd.counter[dragNameLower] += 1;
        baoEnd.counter.dragsSinceSuperior = 0;
    }
    
    baoEnd.counter.dragsSinceSuperior += 1;
    baoEnd.spawned = true;
}), () => getInEnd() && getInSkyblock() && World.isLoaded()).setCriteria('☬ The ${dragName} Dragon has spawned!');


registerWhen('chat', timeThis("registerChat crystalsBroken++ stat", (playerName, event) => {
    if (playerName === Player.getName()) baoEnd.crystalsBroken += 1;
}), () => getInEnd() && getInSkyblock() && World.isLoaded()).setCriteria('☬ ${playerName} destroyed an Ender Crystal!');

registerWhen('chat', timeThis("registerChat dragon killed event", (dragType, event) => {
    baoEnd.spawned = false;
}), () => getInEnd() && getInSkyblock() && World.isLoaded()).setCriteria('${dragType} DRAGON DOWN!').setContains();

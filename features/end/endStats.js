import Settings from "../../settings";
import Audio from "../../utils/audio";

import { getInSkyblock, getInEnd } from "../../utils/functions";
import { registerWhen } from "../../utils/utils";


////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const endStatsAudio = new Audio();
const Instant = Java.type('java.time.Instant');


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
registerWhen('chat', (playerName, numEyes, event) => {
    if (playerName === Player.getName()) baoEnd.eyesPlaced++;
}, () => getInEnd() && getInSkyblock() && World.isLoaded()).setCriteria('☬ ${playerName} placed a Summoning Eye! (${numEyes}/8)');


registerWhen('chat', (event) => {
    endStatsAudio.playDefaultSound();
    baoEnd.eyesPlaced = 0;
    baoEnd.spawned = false;
}, () => getInEnd() && getInSkyblock() && World.isLoaded()).setCriteria('☬ The Dragon Egg has spawned!');


registerWhen('chat', (dragName, event) => {
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
}, () => getInEnd() && getInSkyblock() && World.isLoaded()).setCriteria('☬ The ${dragName} Dragon has spawned!');


registerWhen('chat', (playerName, event) => {
    if (playerName === Player.getName()) baoEnd.crystalsBroken += 1;
}, () => getInEnd() && getInSkyblock() && World.isLoaded()).setCriteria('☬ ${playerName} destroyed an Ender Crystal!');

registerWhen('chat', (dragType, event) => {
    baoEnd.spawned = false;
}, () => getInEnd() && getInSkyblock() && World.isLoaded()).setCriteria('${dragType} DRAGON DOWN!').setContains();

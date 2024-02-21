/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../config1/settings.js";

import { registerWhen, timeThis} from '../../utils/utils.js';
import { getInSkyblock } from '../../utils/functions.js';


// join dungeon commands
const wordToNumber = {
    '1': 'one', 
    '2': 'two', 
    '3': 'three', 
    '4': 'four', 
    '5': 'five', 
    '6': 'six', 
    '7': 'seven'
};

registerWhen('chat', timeThis('', (playerName, cataType, floorNum, event) => {
    let floorLevel = wordToNumber[floorNum];
    if (cataType.toLowerCase() === 'f') {
        ChatLib.command(`joininstance catacombs_floor_${floorLevel}`);
    }
    if (cataType.toLowerCase() === 'm') {
        ChatLib.command(`joininstance mastermode_floor_${floorLevel}`);
    }
}), () => Settings.enableJoinDungeonShortcuts && getInSkyblock() && World.isLoaded()).setCriteria('Party > ${playerName}: #${cataType}${floorNum}');

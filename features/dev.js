import Audio from "../utils/audio.js";

import { registerWhen } from "../utils/utils";
import { getInSkyblock, getInDHub } from '../utils/functions.js';

const devAudio = new Audio();

registerWhen('chat', (event) => {
    ChatLib.chat('yes booga');
    devAudio.playDefaultSound();
}, () => getInDHub() && getInSkyblock() && World.isLoaded()).setCriteria('hello booga');

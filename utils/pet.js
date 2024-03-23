import Settings from '../config1/settings.js';
import Audio from './audio.js';
import { registerWhen, timeThis } from './utils.js';
import { showAlert } from './utils.js';
import { getInSkyblock } from './functions.js';

const petAudio = new Audio();

let usingPet = false;
let activePetName = '';

registerWhen('chat', timeThis('', (petName, event) => {
    usingPet = true;
    activePetName = petName;
}), () => getInSkyblock() && World.isLoaded()).setCriteria('You summoned your ${petName}!');

registerWhen('chat', timeThis('', (petName, event) => {
    usingPet = false;
    activePetName = '';
}), () => getInSkyblock() && World.isLoaded()).setCriteria('You despawned your ${petName}!');

registerWhen('chat', timeThis('', (lvlNum, petName, event) => {
    if (Settings.hideAutopetMessages) cancel(event);
    usingPet = true;
    activePetName = petName;
}), () => getInSkyblock() && World.isLoaded()).setCriteria('Autopet equipped your [Lvl ${lvlNum}] ${petName}! VIEW RULE');

registerWhen('chat', timeThis('', (petName, event) => {
    showAlert(`${petName} &6&l100`);
    petAudio.playDefaultSound();
}), () => getInSkyblock() && World.isLoaded()).setCriteria('Your ${petName} leveled up to level 100!');

export function getActivePet() {
    return activePetName;
}

export function isPetActive() {
    return usingPet;
}

import Settings from '../settings.js';
import { debug } from '../utils/utils.js';

let usingPet = false;
let activePetName = '';
register('chat', (petName, event) => {
    usingPet = true;
    activePetName = petName;
    debug(`usingPet: ${usingPet}, activePet: ${activePetName}`)
}).setCriteria('You summoned your ${petName}!')

register('chat', (pet, event) => {
    usingPet = false;
    activePetName = '';
    debug(`usingPet: ${usingPet}, activePet: ${activePetName}`)
}).setCriteria('You despawned your ${pet}!')

register('chat', (lvlNum, petName, event) => {
    if (Settings.hide_autopet_messages) cancel(event);
    usingPet = true;
    activePetName = petName;
    debug(`usingPet: ${usingPet}, activePet: ${activePetName}, mainPet: ${petName}`)
}).setCriteria('Autopet equipped your [Lvl ${lvlNum}] ${petName}! VIEW RULE')

export function getActivePet() {
    return activePetName;
}

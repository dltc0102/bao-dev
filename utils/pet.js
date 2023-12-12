import { debug } from '../utils/utils.js'
import Settings from "../settings.js"

let usingPet = false;
let activePet = '';

register('chat', (pet, event) => {
    usingPet = true;
    activePet = pet;
    debug(`usingPet: ${usingPet}, activePet: ${activePet}`)
}).setCriteria('You summoned your ${pet}!')

register('chat', (pet, event) => {
    usingPet = false;
    activePet = '';
    debug(`usingPet: ${usingPet}, activePet: ${activePet}`)
}).setCriteria('You despawned your ${pet}!')

register('chat', (lvl, pet, event) => {
    if (Settings.hide_autopet_messages) cancel(event);
    usingPet = true;
    activePet = pet;
    debug(`usingPet: ${usingPet}, activePet: ${activePet}, mainPet: ${pet}`)
}).setCriteria('Autopet equipped your ${lvl} ${pet}! VIEW RULE')

export function getActivePet() {
    return activePet;
}
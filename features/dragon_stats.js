import Settings from '../settings.js'
import { data } from '../utils/data.js'
import { showAlert } from '../utils/utils.js'


register('chat', (dragon, event) => {
    if (data.currArea !== 'The End') return;
    if (dragon === 'protector') { data.dragons.protector += 1; data.dragons.dragsSinceSup += 1; }
    if (dragon === 'old') { data.dragons.old += 1; data.dragons.dragsSinceSup += 1; }
    if (dragon === 'unstable') { data.dragons.unstable += 1; data.dragons.dragsSinceSup += 1; }
    if (dragon === 'young') { data.dragons.young += 1; data.dragons.dragsSinceSup += 1; }
    if (dragon === 'strong') { data.dragons.strong += 1; data.dragons.dragsSinceSup += 1; }
    if (dragon === 'wise') { data.dragons.wise += 1; data.dragons.dragsSinceSup += 1; }
    if (dragon === 'superior') { data.dragons.superior += 1;  data.dragons.dragsSinceSup = 0; }
}).setCriteria('☬ The ${dragon} Dragon has spawned!');

// crystal messages
register('chat', (player, event) => {
    if (data.currArea !== 'The End') return;
    if (player === Player.getName()) data.dragons.crystalFrags += 1;
    if (Settings.removeCrystalMsgs) cancel(event);
}).setCriteria('☬ ${player} destroyed an Ender Crystal!');

// dragon gate
register('chat', (event) => {
    if (data.currArea !== 'The End') return;
    if (Settings.removeDragonGateMsgs) cancel(event);
}).setCriteria("☬ The Dragon's Gate has opened!");

register('chat', (status, event) => {
    if (data.currArea !== 'The End') return;
    if (Settings.removeDragonGateMsgs) cancel(event);
}).setCriteria("☬ The Dragon's Gate is ${status}!");

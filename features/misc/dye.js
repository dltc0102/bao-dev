import Settings from "../../settings";

import { registerWhen, showAlert } from "../../utils/utils";
import { getInSkyblock } from "../../utils/functions";
import { playSound } from "../../utils/functions";
import { sendMessage, stripRank } from "../../utils/party";

////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const carmineTitle = '&3[&b&ka&3] &cCarmine Dye &3[&b&ka&3]';
const necronTitle = '&6&lNecron Dye';
const hollyTitle = '&6[&c&ka&6] &2Holly Dye &6[&c&ka&6]';
const aquamarineTitle = '&5[&6&ka&5] &3Aquamarine Dye &5[&6&ka&5]';
const celesteTitle = '&3[&r&ka&3] &bCeleste Dye &3[&r&ka&3]';
// flame
// mango
// nyanza
// celadon
// emerald
// tentacle
// dark purple
// midnight
// byzantium 
// cyclamen
// nadeshiko
// wild strawberry
// brick red
// bone


////////////////////////////////////////////////////////////////////////////////
// CARMINE DYE
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    showAlert(carmineTitle);
    sendMessage('RARE DROP! Carmine Dye');
    playSound();
}, () => Settings.dye_pings && getInSkyblock() && World.isLoaded()).setCriteria('RARE DROP! Carmine Dye');


////////////////////////////////////////////////////////////////////////////////
// NECRON DYE
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (playerName, event) => {
    if (stripRank(playerName) !== Player.getName()) return;
    showAlert(necronTitle);
    sendMessage(`${playerName} unlocked Necron Dye!`)
    playSound();
}, () => Settings.dye_pings && getInSkyblock() && World.isLoaded()).setCriteria('${playerName} unlocked Necron Dye!');


////////////////////////////////////////////////////////////////////////////////
// HOLLY DYE
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (p1, p2, event) => {
    if (stripRank(p2) !== Player.getName()) return;
    showAlert(hollyTitle);
    sendMessage(`SANTA GIFT! ${p1} gifted Holly Dye to ${p2}!`)
    playSound();
}, () => Settings.dye_pings && getInSkyblock() && World.isLoaded()).setCriteria('SANTA GIFT! ${p1} gifted Holly Dye to ${p2}!');


////////////////////////////////////////////////////////////////////////////////
// AQUAMARINE DYE
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    showAlert(aquamarineTitle);
    sendMessage('OUTSTANDING CATCH! You found a Aquamarine Dye.');
    playSound();
}, () => Settings.dye_pings && getInSkyblock() && World.isLoaded()).setCriteria('OUTSTANDING CATCH! You found a Aquamarine Dye.');


////////////////////////////////////////////////////////////////////////////////
// CELESTE DYE
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    showAlert(celesteTitle);
    sendMessage('RARE DROP! Celeste Dye');
    playSound();
}, () => Settings.dye_pings && getInSkyblock() && World.isLoaded()).setCriteria('RARE DROP! Celeste Dye');

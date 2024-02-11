import Settings from "../../settings";
import Audio from "../../utils/audio";

import { getInSkyblock, getInCI, getInJerry, playSound, petDropPing, pingDolphinMS } from "../../utils/functions";
import { sendMessage } from "../../utils/party";
import { registerWhen, showAlert } from "../../utils/utils";

////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////
const genAudio = new Audio();

const seaEmpTitle = '&6Sea Emperor';
const carrotKingTitle = '&6Carrot King';
const luckyCloverCoreTitle = '&aLucky Clover Core';
const waterHydraTitle = '&1Hydra';


////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////
function shouldHandleGeneralFishingPings() {
    return (!getInCI() || !getInJerry()) && getInSkyblock() && World.isLoaded();
};


////////////////////////////////////////////////////////////////////////////
// SEA EMPEROR
////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    cancel(event);
    sendMessage('[!] Sea Emperor [!]');
    showAlert(seaEmpTitle);
    genAudio.playDefaultSound();
}, () => Settings.seaEmpPing && shouldHandleGeneralFishingPings()).setCriteria('The Sea Emperor arises from the depths.');


////////////////////////////////////////////////////////////////////////////
// SEA EMPEROR: FLYING FISH PET
////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (mf, event) => {
    const message = ChatLib.getChatMessage(event, true);
    petDropPing(message, 'PET DROP!', 'Flying Fish', mf);
}, () => Settings.seaEmpPing && Settings.flyingFishPing && shouldHandleGeneralFishingPings()).setCriteria('PET DROP! Flying Fish (+${mf}% ✯ Magic Find)');


////////////////////////////////////////////////////////////////////////////
// CARROT KING
////////////////////////////////////////////////////////////////////////////
const carrotKingMessages = [
    /A Carrot King has spawned/, 
    /Carrot King!/, 
]

carrotKingMessages.forEach(msg => {
    registerWhen('chat', (event) => {
        genAudio.playDefaultSound();
        showAlert(carrotKingTitle);
    }, () => Settings.carrotKingPing && shouldHandleGeneralFishingPings()).setCriteria(msg);
});

registerWhen('chat', (event) => {
    cancel(event);
    sendMessage('[!] Hop! A Carrot King! [!]');
    showAlert(carrotKingTitle);
    genAudio.playDefaultSound();
}, () => Settings.carrotKingPing && shouldHandleGeneralFishingPings()).setCriteria("Is this even a fish? It's the Carrot King!");


////////////////////////////////////////////////////////////////////////////
// CARROT KING: LUCKY CLOVER CORE
////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (mf, event) => {
    playSound();
    showAlert(luckyCloverCoreTitle);
    sendMessage(`RARE DROP! Lucky CLover Core (+${mf}% ✯ Magic Find)`)
}, () => Settings.carrotKingPing && Settings.luckyCloverCorePing && shouldHandleGeneralFishingPings()).setCriteria("RARE DROP! Lucky Clover Core (+${mf}% ✯ Magic Find)");    


////////////////////////////////////////////////////////////////////////////
// WATER HYDRA
////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    cancel(event);
    sendMessage('[!] Water Hydra [!]');
    showAlert(waterHydraTitle);
    genAudio.playDefaultSound();
}, () => Settings.waterHydraPing && shouldHandleGeneralFishingPings()).setCriteria("The Water Hydra has come to test your strength."); 


////////////////////////////////////////////////////////////////////////////
// GUARDIAN PET
////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    const message = ChatLib.getChatMessage(event, true);
    petDropPing(message, 'GREAT CATCH!', 'Guardian', 0);
}, () => Settings.waterHydraPing && shouldHandleGeneralFishingPings()).setCriteria('GREAT CATCH! You found a [Lvl 1] Guardian.');


////////////////////////////////////////////////////////////////////////////
// DOLPHIN MILESTONE PET
////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (killCount, event) => { 
    pingDolphinMS(killCount);
}, () => Settings.dolphinMSPetPing && shouldHandleGeneralFishingPings()).setCriteria('You have reached a new Sea Creature Kill Milestone of ${killCount} kills!');


////////////////////////////////////////////////////////////////////////////
// SQUID PET
////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    const message = ChatLib.getChatMessage(event, true);
    petDropPing(message, 'GREAT CATCH!', 'Squid', 0);
}, () => Settings.squidPetPing && shouldHandleGeneralFishingPings()).setCriteria('GREAT CATCH! You found a [Lvl 1] Squid.');



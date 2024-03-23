import Settings from "../../config1/settings.js";
import Audio from "../../utils/audio.js";

import { getInSkyblock, getInCI, playSound } from "../../utils/functions";
import { registerWhen, timeThis, showAlert } from "../../utils/utils";
import { playSound } from "../../utils/functions";
import { sendMessage } from "../../utils/party.js";
import { playSound } from "../../utils/functions";

const trophyAudio = new Audio();

const trophyMessages = [
    /TROPHY FISH! You caught a .+ BRONZE\./, 
    /TROPHY FISH! You caught an .+ BRONZE\./, 
    /TROPHY FISH! You caught a .+ SILVER\./, 
    /TROPHY FISH! You caught an .+ SILVER\./, 
    /TROPHY FISH! You caught a .+ GOLD\./, 
    /TROPHY FISH! You caught an .+ GOLD\./, 
    /TROPHY FISH! You caught a .+ DIAMOND\./, 
    /TROPHY FISH! You caught an .+ DIAMOND\./, 
]
trophyMessages.forEach(msg => {
    registerWhen('chat', timeThis('registerChat cancel trophyFish bronze/silver/gold', (event) => {
        cancel(event);
    }), () => Settings.toggleTrophyFishMsgs && getInCI() && getInSkyblock() && World.isLoaded()).setCriteria(msg);
});

function formatTrophyColor(rarity) {
    if (rarity === 'BRONZE') return '&8&lBRONZE';
    if (rarity === 'SILVER') return '&7&lSILVER';
    if (rarity === 'GOLD') return '&6&lGOLD';
    if (rarity === 'DIAMOND') return '&8&lDIAMOND';
}
registerWhen('chat', timeThis("registerChat alert for new discovery", (trophyMessage, event) => {
    const message = ChatLib.getChatMessage(event, true).removeFormatting();
    let trophyRegex = /(.+) (BRONZE|SILVER|GOLD|DIAMOND)/;
    let trophyMatch = trophyMessage.match(trophyRegex);
    if (trophyMatch) {
        let colorRarity = formatTrophyColor(rarity)
        showAlert(`&r&l${trophyMatch[1]} ${colorRarity}`);
        playSound();
        sendMessage(`NEW DISCOVERY: ${trophyMessage}`)
    }
}), () => Settings.toggleTrophyFishMsgs && getInCI() && getInSkyblock() && World.isLoaded()).setCriteria('NEW DISCOVERY: ${trophyMessage}');

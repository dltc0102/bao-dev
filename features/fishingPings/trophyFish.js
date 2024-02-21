/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../config1/settings.js";

import { getInSkyblock, getInCI, playSound } from "../../utils/functions";
import { registerWhen, timeThis, showAlert } from "../../utils/utils";
import { playSound } from "../../utils/functions";

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
    registerWhen('chat', timeThis('registerChat cancel trophyFish b s g', (event) => {
        cancel(event);
    }), () => Settings.toggleTrophyFishMsgs && getInCI() && getInSkyblock() && World.isLoaded()).setCriteria(msg);
})

registerWhen('chat', timeThis("registerChat alert for new discovery", (trophyMessage, event) => {
    playSound();
    const message = ChatLib.getChatMessage(event, true).removeFormatting();
    let aFish = /TROPHY FISH! You caught a (.+) .+\./;
    let anFish = /TROPHY FISH! You caught an (.+) .+\./;

    let aMatch = message.match(aFish);
    let anMatch = message.match(anFish); 
    let trophy = 'unknown';
    if (aMatch) trophy = aMatch[1];
    if (anMatch) trophy = anMatch[1];
    showAlert(`&b&l${trophy} DIAMOND`);
}), () => Settings.toggleTrophyFishMsgs && getInCI() && getInSkyblock() && World.isLoaded()).setCriteria('NEW DISCOVERY: ${trophyMessage}');

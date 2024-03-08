import Settings from "../../config1/settings.js";
import Audio from "../../utils/audio.js";

import { getInSkyblock, getInCI, playSound } from "../../utils/functions";
import { registerWhen, timeThis, showAlert } from "../../utils/utils";
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


// golden fish hitbox
import { drawGoldenFishBox } from "../../utils/functions";

let goldenFishSpawned = false;
const goldenFishSpawnedMessages = [
    /You spot a Golden Fish surface from beneath the lava!/, 
    /The Golden Fish is resisting\.\.\./,
    /The Golden Fish escapes your hook\./,
    /The Golden Fish escapes your hook but looks weakened\./,
]

goldenFishSpawnedMessages.forEach(msg => {
    registerWhen('chat', timeThis('', (event) => {
        goldenFishSpawned = true;
    }), () => getInCI() && getInSkyblock() && World.isLoaded()).setCriteria(msg);
});

const goldenFishDespawnedMessages = [
    /The Golden Fish swims back beneath the lava\.\.\./,
    /The Golden Fish is weak!/,
    /TROPHY FISH! You caught a Golden Fish .+\./
]

goldenFishDespawnedMessages.forEach(msg => {
    registerWhen('chat', timeThis('', (event) => {
        goldenFishSpawned = false;
    }), () => getInCI() && getInSkyblock() && World.isLoaded()).setCriteria(msg);
});

registerWhen('chat', timeThis('', (event) => {
    trophyAudio.playFlashSound();
    showAlert('&6Golden Fish');
}), () => getInCI() && getInSkyblock() && World.isLoaded()).setCriteria('You spot a Golden Fish surface from beneath the lava!');

const entityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");
const gfishTexture = "ewogICJ0aW1lc3RhbXAiIDogMTY0MzgzMTA2MDE5OCwKICAicHJvZmlsZUlkIiA6ICJiN2ZkYmU2N2NkMDA0NjgzYjlmYTllM2UxNzczODI1NCIsCiAgInByb2ZpbGVOYW1lIiA6ICJDVUNGTDE0IiwKICAic2lnbmF0dXJlUmVxdWlyZWQiIDogdHJ1ZSwKICAidGV4dHVyZXMiIDogewogICAgIlNLSU4iIDogewogICAgICAidXJsIiA6ICJodHRwOi8vdGV4dHVyZXMubWluZWNyYWZ0Lm5ldC90ZXh0dXJlLzEyMGNmM2MwYTQwZmM2N2UwZTVmZTBjNDZiMGFlNDA5YWM3MTAzMGE3NjU2ZGExN2IxMWVkMDAxNjQ1ODg4ZmUiCiAgICB9CiAgfQp9";

registerWhen('renderWorld', timeThis('registerWorld drawGoldenFishBox', () => {
    if (!goldenFishSpawned) return;
    World.getAllEntitiesOfType(entityArmorStand).filter(fishEntity => { 
        let helmetTexture = fishEntity.getEntity()?.func_82169_q(3)?.func_77978_p()?.toString();
        if (helmetTexture.includes(gfishTexture)) {
            drawGoldenFishBox(fishEntity.getX(), fishEntity.getY()+2, fishEntity.getZ(), 'light_blue', 1, true);
        }
    })
}), () => getInCI() && getInSkyblock() && World.isLoaded());
import Settings from "../../settings";

import { getInSkyblock, getInCI, playSound } from "../../utils/functions";
import { registerWhen } from "../../utils/utils";
import { playSound } from "../../utils/functions";

registerWhen('chat', (event) => {
    cancel(event);
}, () => Settings.toggleTrophyFishMsgs && getInCI() && getInSkyblock() && World.isLoaded()).setCriteria('TROPHY FISH! You caught a ${fish} BRONZE.');

registerWhen('chat', (event) => {
    cancel(event);
}, () => Settings.toggleTrophyFishMsgs && getInCI() && getInSkyblock() && World.isLoaded()).setCriteria('TROPHY FISH! You caught a ${fish} SILVER.');

registerWhen('chat', (event) => {
    cancel(event);
}, () => Settings.toggleTrophyFishMsgs && getInCI() && getInSkyblock() && World.isLoaded()).setCriteria('TROPHY FISH! You caught a ${fish} GOLD.');

registerWhen('chat', (event) => {
    playSound();
}, () => Settings.toggleTrophyFishMsgs && getInCI() && getInSkyblock() && World.isLoaded()).setCriteria('TROPHY FISH! You caught a ${fish} DIAMOND.');

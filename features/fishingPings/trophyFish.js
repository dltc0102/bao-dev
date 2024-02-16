/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../settings";

import { getInSkyblock, getInCI, playSound } from "../../utils/functions";
import { registerWhen, timeThis } from "../../utils/utils";
import { playSound } from "../../utils/functions";

registerWhen('chat', timeThis("registerChat cancel bronze trophyfish", (event) => {
    cancel(event);
}), () => Settings.toggleTrophyFishMsgs && getInCI() && getInSkyblock() && World.isLoaded()).setCriteria('TROPHY FISH! You caught a ${fish} BRONZE.');

registerWhen('chat', timeThis("registerChat cancel silver trophyfish", (event) => {
    cancel(event);
}), () => Settings.toggleTrophyFishMsgs && getInCI() && getInSkyblock() && World.isLoaded()).setCriteria('TROPHY FISH! You caught a ${fish} SILVER.');

registerWhen('chat', timeThis("registerChat cancel gold trophyfish", (event) => {
    cancel(event);
}), () => Settings.toggleTrophyFishMsgs && getInCI() && getInSkyblock() && World.isLoaded()).setCriteria('TROPHY FISH! You caught a ${fish} GOLD.');

registerWhen('chat', timeThis("registerChat rngsound for diamond trophyfish", (event) => {
    playSound();
}), () => Settings.toggleTrophyFishMsgs && getInCI() && getInSkyblock() && World.isLoaded()).setCriteria('TROPHY FISH! You caught a ${fish} DIAMOND.');

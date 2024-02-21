/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import ExtraSettings from "../../config2/extraSettings.js";

import { registerWhen, timeThis } from "../../utils/utils";
import { getInSkyblock, getInMines } from "../../utils/functions";

registerWhen('chat', timeThis("registerChat cancel sheep messages", (message, event) => {
    cancel(event);
}), () => ExtraSettings.hideRoyalResident && getInMines() && getInSkyblock() && World.isLoaded()).setCriteria('[NPC] No Name: ${message}');

import Settings from "../../settings";

import { registerWhen } from "../../utils/utils";
import { getInSkyblock, getInMines } from "../../utils/functions";

registerWhen('chat', (message, event) => {
    cancel(event);
}, () => Settings.hideRoyalResident && getInMines() && getInSkyblock() && World.isLoaded()).setCriteria('[NPC] No Name: ${message}');

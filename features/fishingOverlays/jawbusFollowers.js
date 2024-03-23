import { registerWhen, timeThis } from "../../utils/utils";
import { getInSkyblock, getInCI } from "../../utils/functions";
import { drawFollowerHitbox } from "../utils/functions";

// jawbus followers hitboxes
registerWhen('renderWorld', timeThis("renderOverlay follower hitboxes", () => {
    World.getAllEntities().forEach(entity => {if (entity.getName().removeFormatting().includes("Jawbus Follower")) drawFollowerHitbox(entity.x, entity.y-1, entity.z, givColor='white', alpha=1, seethru=false)})
}), () => getInCI() && getInSkyblock() && World.isLoaded());
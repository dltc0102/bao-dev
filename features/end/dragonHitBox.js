// import Settings from "../../settings";

import { getInSkyblock, getInEnd } from "../../utils/functions";
import { drawDragonHitBox } from "../../utils/functions";
import { registerWhen } from "../../utils/utils";

// if Settings.showDragonHitbox


////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const entityDrag = Java.type("net.minecraft.entity.boss.EntityDragon");


////////////////////////////////////////////////////////////////////////////////
// REG: RENDER WORLD
////////////////////////////////////////////////////////////////////////////////
registerWhen('renderWorld', () => {
    World.getAllEntitiesOfType(entityDrag).forEach(dragon => {
        drawDragonHitBox(dragon.getX(), dragon.getY(), dragon.getZ(), 'white');
    });
}, () => getInEnd() && getInSkyblock() && World.isLoaded());

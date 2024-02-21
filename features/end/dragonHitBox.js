/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import ExtraSettings from "../../config2/extraSettings.js";

import { getInSkyblock, getInEnd, getInJerry } from "../../utils/functions";
import { drawDragonHitBox } from "../../utils/functions";
import { registerWhen, timeThis } from "../../utils/utils";


////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const entityDrag = Java.type("net.minecraft.entity.boss.EntityDragon");


////////////////////////////////////////////////////////////////////////////////
// REG: RENDER WORLD
////////////////////////////////////////////////////////////////////////////////
registerWhen('renderWorld', timeThis("renderWorld for dragon hitbox", () => {
    World.getAllEntitiesOfType(entityDrag).forEach(dragon => {
        drawDragonHitBox(dragon.getX(), dragon.getY(), dragon.getZ(), 'white');
    });
}), () => ExtraSettings.showDragonHitbox && (getInJerry() || getInEnd()) && getInSkyblock() && World.isLoaded());

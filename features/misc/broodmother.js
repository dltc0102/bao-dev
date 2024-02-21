import ExtraSettings from '../../config2/extraSettings.js'
import Audio from "../../utils/audio";

import { getInSkyblock, getInSpider, drawBroodmotherBox } from "../../utils/functions";
import { showAlert } from "../../utils/utils";
import { registerWhen, timeThis } from '../../utils/utils';

const entityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");
const broodAudio = new Audio();
const broodRegex = /\[Lv12] Broodmother .+\/.+❤/;

let broodStatus = false;
register('step', () => {
    if (!getInSkyblock() || !World.isLoaded() || !ExtraSettings.broodmotherAlert) return;
    if (!broodStatus) {
        World.getAllEntitiesOfType(entityArmorStand).filter(mobEntity => {
            const broodName = mobEntity.getName().removeFormatting();
            let broodMatch = broodName.match(broodRegex);
            if (broodMatch) {
                broodStatus = true;
                showAlert('&cBroodmother Spawned!');
                broodAudio.playDefaultSound();
            }
        });
    };
    Scoreboard.getLines().forEach(msg => {
        let slainRegex = /Broodmother:.+ (.+)/;
        let slainName = msg.getName().removeFormatting()
        let slainMatch = slainName.match(slainRegex);
        if (slainMatch) broodStatus = slainMatch[1] === 'Alive!';
    });
}).setFps(1);

register('command', () => {
    ChatLib.chat(`BroodmotherStatus: ${broodStatus}`)
}).setName('checkbrood');

register('command', () => {
    Scoreboard.getLines().forEach(msg => {
        let slainRegex = /Broodmother:.+ (.+)/;
        let slainName = msg.getName().removeFormatting()
        let slainMatch = slainName.match(slainRegex);
        if (slainMatch) broodStatus = slainMatch[1] === 'Alive!';
    })
}).setName('broodboard');

registerWhen('renderWorld', timeThis("renderWorld for broodmother hitbox", () => {
    World.getAllEntitiesOfType(entityArmorStand).filter(broodmother => {
        if (broodmother.getName().removeFormatting().match(broodRegex)) {
            drawBroodmotherBox(broodmother.getX(), broodmother.getY(), broodmother.getZ(), 'light_blue');
        }
    })
}), () => ExtraSettings.broodmotherAlert && getInSpider() && getInSkyblock() && World.isLoaded());

import { registerWhen, timeThis } from "../../utils/utils";
import { getInSkyblock, getInCI } from "../../utils/functions";


// volcano timer
let explosivity = '';
function extractExplosivity() {
    let phase = '&8INACTIVE';
    const pattern = /Volcano: (.+)/;
    TabList.getNames().forEach(phase => {
        const match = phase.removeFormatting().match(pattern);
        if (match) {
            phase = match[1];
        }
    });
    return phase === 'CATACLYSMIC' ? '&4&lCATACLYSMIC' : phase;
};

register('step', timeThis("registerStep get lobby explosivity", () => {
    if (!getInCI() || !getInSkyblock() || !World.isLoaded()) return;
    let phaseText = extractExplosivity();
    explosivity = `Explosivity: ${phaseText}`;
})).setFps(1);

registerWhen('renderOverlay', timeThis('registerOverlay explosivity text', () => {
    Renderer.drawStringWithShadow(explosivity, Renderer.screen.getWidth() - Renderer.getStringWidth(explosivity) - 3, 3);
}), () => getInCI() && getInSkyblock() && World.isLoaded());

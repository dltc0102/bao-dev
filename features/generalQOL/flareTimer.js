import Settings from "../../config1/settings";
import PogObject from 'PogData';

import { registerWhen, showAlert, timeThis } from '../../utils/utils.js'
import { getInSkyblock } from '../../utils/functions.js'
import { createGuiCommand, renderGuiPosition } from "../../utils/functions.js";
import { constrainX, constrainY } from "../../utils/functions.js";


const entityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

const moveFlareCounter = new Gui();
createGuiCommand(moveFlareCounter, 'moveflarecounter', 'mflare');
const flareDraggable = `&7FlareType: 100s`;

const flareTextures = [
    //Warning Flare Texture
    "ewogICJ0aW1lc3RhbXAiIDogMTY0NjY4NzMwNjIyMywKICAicHJvZmlsZUlkIiA6ICI0MWQzYWJjMmQ3NDk0MDBjOTA5MGQ1NDM0ZDAzODMxYiIsCiAgInByb2ZpbGVOYW1lIiA6ICJNZWdha2xvb24iLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMjJlMmJmNmMxZWMzMzAyNDc5MjdiYTYzNDc5ZTU4NzJhYzY2YjA2OTAzYzg2YzgyYjUyZGFjOWYxYzk3MTQ1OCIKICAgIH0KICB9Cn0=",
    //Alert Flare Texture
    "ewogICJ0aW1lc3RhbXAiIDogMTY0NjY4NzMyNjQzMiwKICAicHJvZmlsZUlkIiA6ICI0MWQzYWJjMmQ3NDk0MDBjOTA5MGQ1NDM0ZDAzODMxYiIsCiAgInByb2ZpbGVOYW1lIiA6ICJNZWdha2xvb24iLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvOWQyYmY5ODY0NzIwZDg3ZmQwNmI4NGVmYTgwYjc5NWM0OGVkNTM5YjE2NTIzYzNiMWYxOTkwYjQwYzAwM2Y2YiIKICAgIH0KICB9Cn0=",
    //SOS Flare Texture
    "ewogICJ0aW1lc3RhbXAiIDogMTY0NjY4NzM0NzQ4OSwKICAicHJvZmlsZUlkIiA6ICI0MWQzYWJjMmQ3NDk0MDBjOTA5MGQ1NDM0ZDAzODMxYiIsCiAgInByb2ZpbGVOYW1lIiA6ICJNZWdha2xvb24iLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYzAwNjJjYzk4ZWJkYTcyYTZhNGI4OTc4M2FkY2VmMjgxNWI0ODNhMDFkNzNlYTg3YjNkZjc2MDcyYTg5ZDEzYiIKICAgIH0KICB9Cn0="
];

let flareActive = false;

export const flareTimerDisplay = new PogObject("bao-dev", {
    "x": 300, 
    "y": 300
}, '/data/flareTimerDisplay.json');
flareTimerDisplay.autosave(5);

let flare = {
    type: -1,
    time: 0
};
let inFlareRange = false;

let flareType = 0;
let flareTime = 0;
let flareDisplayText = '';

register('step', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    inFlareRange = false;
    flare = {
        type: -1,
        time: 0
    };

    World.getAllEntitiesOfType(entityArmorStand.class).find((flare) => {
        const [px, py, pz] = [Player.getX(), Player.getY(), Player.getZ()];
        const [fx, fy, fz] = [flare.getX(), flare.getY(), flare.getZ()];
        const distance = Math.floor(
            Math.sqrt(
                Math.pow(fx-px, 2) + Math.pow(fy-py, 2) + Math.pow(fz-pz, 2)
            )
        );
        if (distance > 40 || flare.getTicksExisted() > 3600) return;

        let as = new EntityLivingBase(flare.getEntity());
        let head = as.getItemInSlot(4)?.getRawNBT();
        if (!head) return;
        let type = -1;
        for (let idx = 0; idx < flareTextures.length; idx++) {
            if (head.includes(flareTextures[idx])) {
                type = idx;
                break;
            }
        }
        if (type === -1) return;
        inFlareRange = true;
        const flareTime = parseInt(180-flare.getTicksExisted()/20);
        if (type > flare.type) {
            flare.type = type;
            flare.time = time;
        } else if (type === flare.type && flareTime > flare.time) {
            flare.time = flareTime;
        }
    });
    
    if (flare.type === 0) flareType = '&a&lWarning';
    if (flare.type === 1) flareType = '&1&lAlert';
    if (flare.type === 2) flareType = '&5&lSOS';
    flareTime = inFlareRange ? flare.time : -1;
    flareDisplayText = `${flareType}: ${flare.time}`;
}).setFps(1);

register("worldUnload", () => {
    flare = {
        type: -1,
        time: 0
    };
})


register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;;
    if (moveFlareCounter.isOpen()) {
        flareTimerDisplay.x = constrainX(x, 3, flareDraggable);
        flareTimerDisplay.y = constrainY(y, 3, flareDraggable);
    };
});


registerWhen('renderOverlay', timeThis('registerOverlay show flare timer', () => {
    if (flareType !== '' && flareTime >= 0) {
        Renderer.drawStringWithShadow(flareDisplayText, flareTimerDisplay.x, flareTimerDisplay.y);
    }
}), () => Settings.flareTimer && flareActive && getInSkyblock() && World.isLoaded());

registerWhen('renderOverlay', timeThis('', () => {
    renderGuiPosition(moveFlareCounter, flareTimerDisplay, flareDraggable);
}), () => getInSkyblock() && World.isLoaded());

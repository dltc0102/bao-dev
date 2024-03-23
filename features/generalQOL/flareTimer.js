import PogObject from 'PogData';
import Audio from "../../utils/audio.js";

import { registerWhen, showAlert, timeThis } from '../../utils/utils.js'
import { getInSkyblock } from '../../utils/functions.js'
import { createGuiCommand, renderGuiPosition } from "../../utils/functions.js";
import { constrainX, constrainY } from "../../utils/functions.js";


// consts
const flareAudio = new Audio();

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

export const flareTimerDisplay = new PogObject("bao-dev", {
    "x": 300, 
    "y": 300
}, '/data/flareTimerDisplay.json');
flareTimerDisplay.autosave(5);


// functions
function formatFlareTimer(mins, secs, type=1) {
    let text = '00:00';
    if (type === 1) {
        if (mins > 0) {
            text = `${mins}m ${secs}s`;
        } else if (mins === 0) {
            text = `${secs}s`;
        }

    } else if (type === 2) {
        if (mins > 0) {
            if (secs === 0) {
                text = `${mins}:00`;
            } else if (secs < 10) {
                text = `${mins}:0${secs}`;
            } else {
                text = `${mins}:${secs}`;
            }
        } else if (mins === 0) {
            if (secs < 10) {
                text = `0:0${secs}`;
            } else {
                text = `0:${secs}`;
            }
        }
    }
    return text;
}

// session values
let flareDetected = false;
let hasFlare = false;
let flareMins = 0;
let flareSecs = 0;
let flareText = '';

// reg steps
register('step', () => {
    if (flareDetected || !getInSkyblock() || !World.isLoaded()) return;
    World.getAllEntities().forEach(entity => {
        if (entity.getName().includes("FireworksRocketEntity")) {
            hasFlare = true;
            flareMins = 3;
            flareSecs = 0;
            flareDetected = true;
            setTimeout(() => {
                flareDetected = false;
            }, 5000);
        }
    })
}).setFps(1);

register('step', () => {
    if (!getInSkyblock() || !World.isLoaded()) return;
    if (hasFlare) {
        if (flareSecs === 0) {
            if (flareMins === 0) {
                hasFlare = false;
                showAlert('&6&lFlare Disappeared!');
                flareAudio.playDefaultSound();
            } else {
                flareMins -= 1;
                flareSecs += 59;
            }
        } else {
            flareSecs -= 1;
        }
        flareText = `Flare Timer: &b${formatFlareTimer(flareMins, flareSecs, 1)}`;
    }
}).setFps(1);

registerWhen('chat', timeThis('', (id, event) => {
    hasFlare = false;
}), () => getInSkyblock() && World.isLoaded()).setCriteria('You are playing on profile: ${id}');

registerWhen('chat', timeThis('', (event) => {
    hasFlare = false;
    showAlert('&6&lFlare Gone!');
    flareAudio.playDefaultSound();
}), () => getInSkyblock() && World.isLoaded()).setCriteria('Your flare disappeared because you were too far away!');

register('dragged', (dx, dy, x, y) => {
    if (!getInSkyblock() || !World.isLoaded()) return;;
    if (moveFlareCounter.isOpen()) {
        flareTimerDisplay.x = constrainX(x, 3, flareDraggable);
        flareTimerDisplay.y = constrainY(y, 3, flareDraggable);
    };
});


registerWhen('renderOverlay', timeThis('registerOverlay show flare timer', () => {
    if (!hasFlare) return;
    Renderer.drawStringWithShadow(flareText, flareTimerDisplay.x, flareTimerDisplay.y);
    renderGuiPosition(moveFlareCounter, flareTimerDisplay, flareDraggable);
}), () => getInSkyblock() && World.isLoaded());

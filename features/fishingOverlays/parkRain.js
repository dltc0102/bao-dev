import { registerWhen, timeThis } from "../../utils/utils";
import { getInSkyblock, getInPark } from "../../utils/functions";
import { showAlert } from "../../utils/utils";
import Audio from "../../utils/audio";

const parkAudio = new Audio();

// park rain timer 
let rainTimeText = '';
let rainTimeLeft = '';
let rainTime = 0;
let oneMinAlert = false;    
register('step', timeThis("registerStep rain time", () => {
    if (!getInPark() || !getInSkyblock() || !World.isLoaded()) return;
    rainTimeText = TabList.getNames()[44];
    
    rainTimeLeft = rainTimeText.split(":")[1].trim(); // 10m
    if (rainTimeLeft === '1m') {
        showAlert('&e1 min of Rain Left')
        parkAudio.playDefaultSound();
        oneMinAlert = true;
    }
    if (rainTimeLeft !== '1m') {
        oneMinAlert = false;
    }
})).setFps(1);

registerWhen('renderOverlay', timeThis('registerOverlay rainTime text', () => {
    Renderer.drawStringWithShadow(rainTimeText, Renderer.screen.getWidth() - Renderer.getStringWidth(rainTimeText) - 3, 50);
}), () => getInPark() && getInSkyblock() && World.isLoaded());

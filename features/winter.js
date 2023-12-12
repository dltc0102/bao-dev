import Settings from '../settings.js'
import Audio from '../utils/audio.js'
import { data } from '../utils/data.js'
import { showAlert } from '../utils/utils.js'
import { getTabArea } from '../utils/functions.js'

let currArea = '';
register('step', () => { if (!data.inSkyblock) return; currArea = getTabArea(); }).setFps(1);

const jerryAudio = new Audio();

register('chat', (waveNum, event) => {
    if (!data.inSkyblock) return;
    if (currArea !== "Jerry's Workshop") return;
    showAlert(`Wave ${waveNum} starting!`)
}).setCriteria("DEFEND JERRY'S WORKSHOP - WAVE ${waveNum}").setContains();

// event timer cooldown
register('command', () => {
    Scoreboard.getLines().forEach(line => ChatLib.chat(line))
}).setName('getlines');

let currJerryStatus = '';
register('step', () => {
    Scoreboard.getLines().forEach(line => {
        if (line.toString().removeFormatting().startsWith('Next Wave')) {
            currJerryStatus = line;
        } else {
            currJerryStatus = '';
        }
    })
}).setFps(1);

register('renderOverlay', () => {
    Renderer.drawString(currJerryStatus, 400, 60)
});

// power up timer
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (currArea !== "Jerry's Workshop") return;
    // code goes here
}).setCriteria('POWER UP! You activated Homing  Snowballs for 80s! Press TAB to view your active power ups!');

register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (currArea !== "Jerry's Workshop") return;
    // code goes here
}).setCriteria('POWER UP! You activated Strongarm for 80s! Press TAB to view your active power ups!');

register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (currArea !== "Jerry's Workshop") return;
    // code goes here
}).setCriteria('POWER UP! You activated Double  Up for 80s! Press TAB to view your active power ups!');

// snow cannon message hider
register('chat', (playerName, event) => {
    if (!data.inSkyblock) return;
    if (currArea !== "Jerry's Workshop") return;
    if (!Settings.hide_snow_cannon_messages) return;
    cancel(event);
}).setCriteria(' ☃ ${playerName} mounted a Snow Cannon!');
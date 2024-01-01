import Settings from '../settings.js'
import { data } from '../utils/data.js'
import { showAlert } from '../utils/utils.js'
import { createGuiCommand, renderGuiPosition } from '../utils/functions.js'
import { sendMessage } from '../utils/party.js'
// import { drawBonzoBox, drawLine, drawBeacon, colorToRgb, centerCoordinates } from '../utils/functions.js'

////////////////////////////////////////////////////////////////////////////////
// MELODY DETECTOR -------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
let melodyMsgSent = false;
let lastMelodyMsgTime = 0;
register('step', () => {
    if (!World.isLoaded()) return;
    if (!data.inSkyblock) return;
    if (!Settings.alert_melody) return;
    if (Player.getContainer().getName() === 'Click the button on time!') {
        if (melodyMsgSent) { 
            const currentTime = Date.now();
            if (currentTime - lastMelodyMsgTime >= 5000) melodyMsgSent = false;
            return;
        }
        sendMessage('melody');
        melodyMsgSent = true;
        lastMelodyMsgTime = Date.now();
    }
})


////////////////////////////////////////////////////////////////////////////////
// secrets per run
////////////////////////////////////////////////////////////////////////////////
let statsCommandRun = false;
let deathStats = 0;
let secretStats = 0;
let numRunsStats = 0;
var movesecretcounter = new Gui();

register('dragged', (dx, dy, x, y) => {
    if (!data.inSkyblock) return;
    if (movesecretcounter.isOpen()) {
        data.SecretCount.x = x;
        data.SecretCount.y = y;
    }
})

createGuiCommand(movesecretcounter, 'movesecretcounter', 'msc')

register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (data.currArea !== 'Catacombs') return;
    numRunsStats += 1;
    ChatLib.command('showextrastats');
    statsCommandRun = true;
}).setCriteria('> EXTRA STATS <').setContains();

register('chat', (playerDeaths, event) => {
    if (!data.inSkyblock) return;
    if (data.currArea !== 'Catacombs') return;
    deathStats += Number(playerDeaths);
}).setCriteria('Deaths: ${playerDeaths}').setContains();

register('chat', (secretCount, event) => {
    if (!data.inSkyblock) return;
    if (data.currArea !== 'Catacombs') return;
    secretStats += Number(secretCount);
}).setCriteria('Secrets Found: ${secretCount}').setContains();

register('chat', (event) => {
    setTimeout(() => {
        ChatLib.chat(`${data.modPrefix} &3${Player.getName()} &7Secrets: &b${secretStats}&7, Deaths: &b${deathStats}`)
    }, 1000)
}).setCriteria('CLICK HERE to re-queue into The Catacombs!').setContains();

let secretOverviewText = '';
register('step', () => {
    secretOverviewText = `Runs: &b${numRunsStats}&r | Secrets: &b${secretStats}&r | Avg: &b${(secretStats / numRunsStats).toFixed(2)}&r/&brun`
}).setFps(1);

register('renderOverlay', () => {
    if (!data.inSkyblock) return;
    if (!Settings.secretsPerSession) return;
    let screenW = Renderer.screen.getWidth();
    Renderer.drawStringWithShadow(secretOverviewText, screenW / 2 - (Renderer.getStringWidth(secretOverviewText) / 2), 30)
    renderGuiPosition(movesecretcounter, data.SecretCount, `Runs: 0 | Secrets: 0 | Avg: 0/run`)
})

register('command', () => {
    secretStats = 0;
    numRunsStats = 0;
}).setName('resetsecretcounter');



////////////////////////////////////////////////////////////////////////////////
// Better Dungeon Messages
////////////////////////////////////////////////////////////////////////////////
// Ability messages
register('chat', (ability, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonAbiMsgs) cancel(event);
}).setCriteria('${ability} is ready to use! Press DROP to activate it!');

register('chat', (ability, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonAbiMsgs) cancel(event);
}).setCriteria('Used ${ability}!');

register('chat', (ability, numEnemies, damage, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonAbiMsgs) cancel(event);
}).setCriteria('Your ${ability} hit ${numEnemies} enemy for ${damage} damage.');

// Revive messages
register('chat', (player, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonRevMsgs) cancel(event);
}).setCriteria(' ❣ ${player} was revived!');

register('chat', (player, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonRevMsgs) cancel(event);
}).setCriteria(' ❣ You are reviving ${player}!');

register('chat', (player, fairy, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonRevMsgs) cancel(event);
}).setCriteria('❣ ${player} was revived by ${fairy} the Fairy!');

// Death messages
register('chat', (player, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonDeathMsgs) cancel(event);
}).setCriteria(' ☠ ${player} was killed by').setContains();

// Essence messages
register('chat', (event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonEssMsgs) cancel(event);
}).setCriteria('You found a Wither Essence! Everyone gains an extra essence!');

// Milestone messages
function determineMS(milestone) {
    let ms = 0;
    if (milestone === '❶') ms = 1;
    if (milestone === '❷') ms = 2;
    if (milestone === '❸') ms = 3;
    if (milestone === '❹') ms = 4;
    if (milestone === '❺') ms = 5;
    if (milestone === '❻') ms = 6;
    if (milestone === '❼') ms = 7;
    if (milestone === '❽') ms = 8;
    if (milestone === '❾') ms = 9;
    if (milestone === '❿') ms = 10;
    return ms;
}

register('chat', (msClass, milestone, msDamage, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonMSMsgs) {
        msLevel = determineMS(milestone);
        milestoneMessage = `&6&l${msClass} Milestone Reached: &r&b${msLevel} &r&6(${msDamage})`
        cancel(event);
    }
}).setCriteria('${msClass} Milestone ${milestone}: You have dealt ${msDamage} Total Damage so far!').setContains();

// Wither Door messages
register('chat', (player, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonWDoorMsgs) cancel(event);
}).setCriteria('${player} has obtained Wither Key!');

register('chat', (player, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonWDoorMsgs) cancel(event);
}).setCriteria('${player} opened a WITHER door!');

register('chat', (player, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonWDoorMsgs) cancel(event);
}).setCriteria('RIGHT CLICK on a WITHER door to open it. This key can only be used to open 1 door!');

// Blood Door messages
let bloodPlayer = '';
register('chat', (player, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonBDoorMsgs) {
        bloodPlayer = player;
        cancel(event);
    }
}).setCriteria('${player} has obtained Blood Key!');

register('chat', (player, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonBDoorMsgs) cancel(event);
}).setCriteria('RIGHT CLICK on the BLOOD DOOR to open it. This key can only be used to open 1 door!');

register('chat', (player, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonBDoorMsgs) cancel(event);
}).setCriteria('A shiver runs down your spine...');

register('chat', (player, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonBDoorMsgs) {
        cancel(event);
        ChatLib.chat(`${bloodPlayer} opened the Blood Door!`);
    }
}).setCriteria('The BLOOD DOOR has been opened!');

// Boss Messages
register('chat', (message, event) => {
    if (!Settings.betterDungeonMsgs) return;
    if (Settings.dungeonBBossMsgs) {
        if (message !== 'You have proven yourself. You may pass.' || message !== 'That will be enough for now.') cancel (event);
    }
}).setCriteria('[BOSS] The Watcher: ${message}');

// Potion Messages
// You are not allowed to use Potion Effects while in Dungeon, therefore all active effects have been paused and stored. They will be restored when you leave Dungeon!

// Mort Messages
// [NPC] Mort: Here, I found this map when I first entered the dungeon.
// [NPC] Mort: You should find it useful if you get lost.
// [NPC] Mort: Good luck.

// random mob messages
// The ${randomMob} struck you for ${negligibleDamage} damage!










// if player in ignore list is in party, auto remove
// load ignore list in first laod

// let totalIgnorePages = 0;
// let totalPagesGot = false;
// let inSetupIgnores = false;
// register('chat', (pageMax, event) => {
//     cancel(event);
//     totalIgnorePages = Number(pageMax).toFixed(0);
//     totalPagesGot = true;
//     inSetupIgnores = true;
// }).setCriteria('------ Ignored Users (Page 1 of ${pageMax}) ------');

// register('step', () => {
//     if (!data.inSkyblock) return;
//     if (!inSetupIgnores) return;
//     for (let idx = 1; idx <= totalIgnorePages; idx++) {
//         setTimeout(() => {
//             ChatLib.command(`ignore list ${idx}`);
//         }, 1500);
//         if (idx === totalIgnorePages) totalPagesGot = false;
//     }
// }).setDelay(2000)

// register('chat', (nameIdx, playerName, event) => {
//     if (!data.inSkyblock) return;
//     if (!inSetupIgnores) return;
//     cancel(event);
//     data.ignoredNames.push(playerName);
// }).setCriteria("${nameIdx}. ${playerName}").setContains();

// register('command', () => {
//     console.log(ignoredNames);
// }).setName('getignored');



// for (const patge in ignorePages) {

// }
// Added _KenTos_ to your ignore list.
// Removed _KenTos_ from your ignore list.


// predev routes


// routes for 1
// routes for 2
// routes for 3
// routes for 4

// register('renderWorld', () => {
    //     drawBonzoBox(6.5, 217, -106.5, 'light_blue', false);
    //     drawBonzoBox(0.5, 218, -106.5, 'purple', false);
    //     drawLine(6.5, 217, -106.5, 0.5, 218, -106.5, 'green', false);
    
    // })  
    
    
// secret counter per session
// average secret per run for session
// lifetime/profile rng counter

// [MVP++] Adawk unlocked Fourth Master Star!
// [MVP++] oBiscuit unlocked Giant's Sword!
// ${rank} ${playerName} unlocked ${rngItem}!

// let showBox = false;
// let px = 0;
// let py = 0;
// let pz = 0;
// register('chat', (rank, name, x, y, z, event) => {
//     px = x;
//     py = y;
//     pz = z;
//     showBox = true;
// }).setCriteria('Party > ${rank} ${name}: x: ${x}, y: ${y}, z: ${z}');

// register('renderWorld', () => {
//     drawBeacon(px, py+1, pz, 'light_blue', true);
// })




////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 1
////////////////////////////////////////////////////////////////////////////////////////////////////////
// 1 - part 1
// 101 115 50
// 106 113 72
// 104 113 89
// 101 112 107

// 2 - part 1
// 101 115 58
// 102 113 76
// 108 119 79
// 106 120 89
// 105 121 103

// 3 - part 1
// 100 115 58
// 97 113 78
// 93 112 92
// 94 112 97

// 4 - part 1
// 99 115 50
// 94 119 70
// 96 120 84
// 92 122 101

// pd - part 1
// 98 115 50
// 94 119 70
// 96 120 84
// 96 121 101
// 95 123 112
// 96 119 121

////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 2
////////////////////////////////////////////////////////////////////////////////////////////////////////
// 1 - part 2

// 2 - part 2

// 3 - part 2

// 4 - part 2

// pd phase 2 -- skip lights
// 91 115 132
// 71 109 127
// 52 107 128
// 45 123 129
// 33 123 129
// 19 119 129

// pd phase 2 -- lights
// 89 115 132
// 71 108 127 block (side facing south)
// 63 129 137
// 60 132 141
// 51 132 138
// 33 131 138
// 19 130 135

////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 3 
////////////////////////////////////////////////////////////////////////////////////////////////////////
// pd - part 3
// 8 115 122 (bonzo node)
// 6 113 103 (bonzo node)
// 11 107 84 (bounce node)
// 13 122 83 block (side facing south) (bonzo node)
// 3 120 76 (line)
// 8 117 67 (bonzo node)
// 9 113 51 (end)

// 1 - part 3
// 11 115 122 (bonzo node)
// 1 109 111 (term)
// 2 109 98 (bonzo node)
// 2 108 87 (line)
// 1 109 76 (line)
// 3 109 67 (line)
// 9 109 63 (line)
// 9 109 54 (abs center of block)
// 9 113 51 (end)

// 2 - part 3
// 8 115 122 (bonzo node)
// 1 109 98 (drop node)
// 0 119 93 (term)
// 3 120 87 (line)
// 9 117 78 (bonzo)
// 9 117 67 (bonzo)
// 9 113 51 (end)

// 3 - part 3
// 8 115 122 (bonzo node)
// 9 113 104 (bonzo node)
// 10 107 92 (drop node)
// 16 123 93 (term)
// 14 124 88 (bonzo node)
// 6 116 78 (bonzo node)
// 8 117 67 (bonzo node)
// 9 113 51 (end)

// 4 - part 3
// 7 115 122 (bonzo node)
// 2 109 101 (bonzo node)
// 2 108 87 (node)
// 2 108 84 (jerry chine node)
// 0 109 78 (term)
// 1 109 76 (line)
// 3 109 67 (line)
// 9 109 63 (line)
// 9 109 54 (abs center of block)
// 9 113 51 (end)


////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 4 
////////////////////////////////////////////////////////////////////////////////////////////////////////







/////////////////////////////////////////////////////////////////////////////////////
// CHOOSE FLOOR - FUTURE STUFF I CBA TO DO THIS STUFF FUCK
/////////////////////////////////////////////////////////////////////////////////////
// let floorMessages = {
//     "1": /^\[BOSS\] Bonzo: (Alright, maybe I'm just weak after all\.\.|But my masters are a lot stronger\.\.|Just you wait\.\.\.)$/,

//     "2": /^\[BOSS\] Scarf: (I always knew I would win\.\.\.I'm a genius\.|But don't worry I'll add you to my collection\.|In a way, you'll live forever\.\.\.)$/, 

//     "3": /^\[BOSS\] The Professor: (Now that you have fallen, my student has been avenged\.|Picking a fight with me and my experiments will only lead to your demise\!|I give you an F-!)$/,

//     "4": /^\[BOSS\] Thorn: (Wonderful performance humans, truly beautiful\.|How one dies shows how one lived. And it was your masterpiece\.|What spirit shall you become\? Yes! (A rabbit!|A chihuahua!|A sheep!|A chicken!))$/, 

//     "5": /^\[BOSS\] Livid: (Impossible! How did you figure out which one I was\?!|If you think this is the end, you are so wrong\!|My shadows are everywhere, THEY WILL FIND YOU!!)$/,

//     "6": /^\[BOSS\] Sadan: (It was inevitable. You are fighting forces beyond your imagination\.|No adventurer can see what lays beyond this floor\.|Rest in peace\.)$/, 

//     "7": /^\[BOSS\] Necron: (All this, for nothing\.\.\.|I understand your words now, my master\.|The Catacombs\.\.\. are no more\.)$/, 

//     "7+": /^\[BOSS\] Wither King: (Incredible. You did what I couldn't do myself\.|In a way I should thank you, I lost all hopes centuries ago that it would ever end\.|I hope you’ll become the Heroes I could never be\.|So long champions of this mad world\!|My strengths are depleting, this… this is it…)$/
// }

// register('command', (args) => {
//     if (args === 'f1' || args === 'm1' || args === 'F1' || args === 'M1') chosenMessage = floorMessages['1']
//     if (args === 'f2' || args === 'm2' || args === 'F2' || args === 'M2') chosenMessage = floorMessages['2']
//     if (args === 'f3' || args === 'm3' || args === 'F3' || args === 'M3') chosenMessage = floorMessages['3']
//     if (args === 'f4' || args === 'm4' || args === 'F4' || args === 'M4') chosenMessage = floorMessages['4']
//     if (args === 'f5' || args === 'm5' || args === 'F5' || args === 'M5') chosenMessage = floorMessages['5']
//     if (args === 'f6' || args === 'm6' || args === 'F6' || args === 'M6') chosenMessage = floorMessages['6']
//     if (args === 'f7' || args === 'F7') chosenMessage = floorMessages['7']
//     if (args === 'm7' || args === 'M7') chosenMessage = floorMessages['7+']

// }).setName('setfloor')

// register('command', () => {
//     ChatLib.chat(data.runCountGoal);
// }).setName('getrungoal')

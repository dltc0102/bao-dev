/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />




function getQuality(pbq, pDamage, fDamage, pEyes) {
    let quality = pbq + (100 * (pDamage/fDamage)) + (100 * pEyes);
    return quality;
}


////////////////////////////////////////////////////////////////////////////////
// DRAGON WEIGHT
////////////////////////////////////////////////////////////////////////////////

let dragonDamage = 0;
let firstDragDamage = 0;
let damagePos = 0;
let playerBaseQuality = 0;
let playerResultQuality = 0;
let canDropPet = false;

register('chat', (playerName, damage, event) => {
    firstDragDamage = parseInt(damage.replace(/,/g, ''));
}).setCriteria('1st Damager - ${playerName} - ${damage}').setContains();

register('command', () => {
    setTimeout(() => {
        ChatLib.chat(`☬ oBiscuit placed a Summoning Eye! (1/8)`);
        setTimeout(() => {
            ChatLib.chat(`☬ oBiscuit placed a Summoning Eye! (2/8)`);
            setTimeout(() => {
                ChatLib.chat(`☬ oBiscuit placed a Summoning Eye! (3/8)`);
                setTimeout(() => {
                    ChatLib.chat(`☬ oBiscuit placed a Summoning Eye! (4/8)`)
                    setTimeout(() => {
                        ChatLib.chat(`UNSTABLE DRAGON DOWN!`);
                        setTimeout(() => {
                            ChatLib.chat(`1st Damager - [MVP+] oBiscuit - 4,804,251`);
                            setTimeout(() => {
                                ChatLib.chat(`Your Damage: 4,804,251 (Position #1)`);
                            }, 1000)
                        }, 1000)
                    }, 1000)
                }, 1000)
            }, 1000)
        }, 1000)
    }, 1000)
    // code goes here
}).setName('fakedrag');

register('chat', (damage, pos, event) => {
    if (baoDragons.spawned) return;
    playerResultQuality = 0;
    dragonDamage = parseInt(damage.replace(/,/g, ''));
    damagePos = parseInt(pos);
    const qualityLookup = {
        1: 200,
        2: 175,
        3: 150,
        4: 125,
        5: 110,
        6: 100,
        7: 100,
        8: 100,
        9: 90,
        10: 90,
        11: 80,
        12: 80
    };
    
    if (damagePos <= 25) {
        playerBaseQuality = qualityLookup[damagePos] || 70;
    } else {
        playerBaseQuality = dragonDamage > 1 ? 70 : 10;
    }
}).setCriteria('Your Damage: ${damage} (Position #${pos})').setContains();


// WIP
register('command', () => {
    playerResultQuality = getQuality(playerBaseQuality, dragonDamage, firstDragDamage, baoDragons.eyesPlaced);
    console.log(`eyesplaced: ${baoDragons.eyesPlaced}`)
    console.log(`input: ${playerBaseQuality}`)
    console.log(`output: ${playerResultQuality}`)

    canDropPet = playerResultQuality >= 450;
    if (canDropPet) {
        console.log(`pet possible? YES`)
        let chanceEpic = 0.05 * baoDragons.eyesPlaced;
        let chanceLeg = 0.01 * baoDragons.eyesPlaced;
        console.log(`epic edrag chance: ${chanceEpic}`);
        console.log(`leg edrag chance: ${chanceLeg}`)
    }
}).setName('calcquality');
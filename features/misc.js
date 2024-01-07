import Settings from "../settings.js"
import { data } from '../utils/data.js'
import { showAlert } from '../utils/utils.js'
import { playSound, generateRandomStr, petDropPing, sendSelf, sendGuild, createGuiCommand, renderGuiPosition } from "../utils/functions.js"
import { sendMessage, announce } from '../utils/party.js'

////////////////////////////////////////////////////////////////////////////////
// JERRY TITLES ----------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
const green_jerry = '&aGreen Jerry'
const blue_jerry = '&9Blue Jerry'
const purple_jerry = '&5Purple Jerry'
const gold_jerry = '&6Golden Jerry'
const sharing_is_caring = '&cHit for BE'
const wildHorseTitle = '&6Horseman &r@ &2Wilderness'
const graveHorseTitle = '&6Horseman &r@ &cGraveyard'
const end_prot_title = '&8End Protector'

////////////////////////////////////////////////////////////////////////////////
// DYE TITLES ------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
const carmine_title = '&3[&b&ka&3] &cCarmine Dye &3[&b&ka&3]'
const carmine_pattern = /&6&lRARE DROP! &5Carmine Dye/
const necron_title = '&6Necron Dye'
const necron_pattern = /&eunlocked &6Necron Dye&e!/
// flame dye
// mango dye -------- register pickup item
// nyanza dye
// celadon dye
// emerald dye 
const holly_title = '&6[&c&ka&6] &2Holly Dye &6[&c&ka&6]'
const holly_pattern = /&egifted &5Holly Dye &eto/
const aquamarine_title = '&5[&6&ka&5] &3Aquamarine Dye &5[&6&ka&5]'
const aquamarine_pattern = /&d&lOUTSTANDING CATCH! &bYou found a &5Aquamarine Dye&b./
const celeste_title = '&3[&r&ka&3] &bCeleste Dye &3[&r&ka&3]'
const celeste_pattern = /&6&lRARE DROP! &5Celeste Dye/
// tentacle dye
// dark purple dye
// midnight dye
// byzantium dye
// cyclamen dye
// nadeshiko dye
// wild strawberry dye -------- register pickup item
// brick red dye
// bone dye


////////////////////////////////////////////////////////////////////////////////
// MINING ----------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
// dwarven mines lobby day
var movedaycount = new Gui();
register('dragged', (dx, dy, x, y) => {
    if (!data.inSkyblock) return;
    if (movedaycount.isOpen()) {
        data.DayCount.x = x;
        data.DayCount.y = y;
    }
})

createGuiCommand(movedaycount, 'movedaycount', 'mdc');

let lobbyDisplay = '';
register('step', () => {
    if (!data.inSkyblock) return;
    if (!World.isLoaded()) return;
    if (!Settings.lobbyDayCount) return;
    lobbyTicks = World.getTime();
    lobbyDay = (lobbyTicks / 24000).toFixed(2);
    lobbyDisplay = `Day: &b${lobbyDay}`
}).setFps(1);

register('renderOverlay', () => {
    if (!data.inSkyblock) return;
    if (!World.isLoaded()) return;
    if (!Settings.lobbyDayCount) return;
    if (data.currArea === 'Garden') return;
    Renderer.drawStringWithShadow(lobbyDisplay, data.DayCount.x, data.DayCount.y)
    renderGuiPosition(movedaycount, data.DayCount, `Day: 0.00`)
});

// golden goblin alert
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.golden_goblin_alert) return;
    showAlert('&6Golden Goblin')
    data.audioInst.playDefaultSound();
    sendMessage('[!] Golden Goblin [!]')
}).setCriteria('A Golden Goblin has spawned!')

// scatha pet drop alert
register('chat', (mf, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.scatha_pet_drop_ping) return;
    const message = ChatLib.getChatMessage(event, true);
    petDropPing(message, 'PET DROP!', 'Scatha', mf, data.audioInst)
}).setCriteria('PET DROP! Scatha (+${mf}% ✯ Magic Find)');


////////////////////////////////////////////////////////////////////////////////
// JERRY PINGS -----------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (!Settings.jerry_ping) return
    var message = ChatLib.getChatMessage(event, true)

    // green jerry
    if (message.includes('&aGreen Jerry&e')) {
        sendSelf('[!] A Green Jerry has spawned [!]');
        showAlert(green_jerry);
        data.audioInst.playDefaultSound();
    }

    // blue jerry
    if (message.includes('&9Blue Jerry&e')) {
        sendSelf('[!] A Blue Jerry has spawned [!]');
        showAlert(blue_jerry);
        data.audioInst.playDefaultSound();
    }

    // purple jerry
    if (message.includes('&5Purple Jerry&e')) {
        sendSelf('[!] A Purple Jerry has spawned [!]');
        showAlert(purple_jerry);
        data.audioInst.playDefaultSound();
    }

    // golden jerry
    if (message.includes('&6Golden Jerry&e')) {
        sendSelf('[!] A Golden Jerry has spawned [!]');
        showAlert(gold_jerry);
        playSound()
    }
})


////////////////////////////////////////////////////////////////////////////////
// END PINGS -------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (!Settings.end_protector_ping) return
    showAlert(end_prot_title);
    sendMessage('endstone protector spawning');
    data.audioInst.playDefaultSound();
}).setCriteria('The ground begins to shake as an Endstone Protector rises from below!')


////////////////////////////////////////////////////////////////////////////////
// DYE PINGS -------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
register('chat', (event) => {
    if (!Settings.dye_pings) return
    var message = ChatLib.getChatMessage(event, true)

    // carmine
    if (message.match(carmine_pattern)) {
        showAlert(carmine_title);
        sendMessage('RARE DROP! Carmine Dye');
        if (Settings.guild_announce_dye_pings) sendGuild('RARE DROP! Carmine Dye')
        playSound()
    }

    // necron
    if (message.match(necron_pattern)) {
        showAlert(necron_title);
        sendMessage(`${Player.getName()} unlocked Necron Dye!`);
        playSound()
    }

    // flame
    // mango
    // nyanza
    // celadon
    // emerald
    // holly
    if (message.match(holly_pattern) && message.includes(Player.getName())) {
        showAlert(holly_title);
        sendMessage('Holly Dye');
        playSound()
    }

    // aquamarine
    if (message.match(aquamarine_pattern)) {
        showAlert(aquamarine_title);
        sendMessage('OUTSTANDING CATCH! You found a Aquamarine Dye.');
        playSound()
    }

    // celeste
    if (message.match(celeste_pattern)) {
        showAlert(celeste_title);
        sendMessage('RARE DROP! Celeste Dye');
        playSound()
    }
    // tentacle
    // dark purple
    // midnight
    // byzantium
    // cyclamen
    // nadeshiko
    // wild strawberry
    // brick red
    // bone
})

////////////////////////////////////////////////////////////////////////////////
// SPOOKY EVENT PINGS ----------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
// trick or treat mob pings
register('chat', (spookyMob, event) => {
    if (!Settings.spooky_tot_ping) return;
    if (Settings.hide_scc_msgs) cancel(event);
    showAlert(sharing_is_caring);
    sendMessage(`${spookyMob} has spawned.`)
    data.audioInst.playDefaultSound();
}).setCriteria('TRICK! A ${spookyMob} has tricked you!');

// headless horseman ping
register('chat', (spawner, location, event) => {
    cancel(event);
    if (!Settings.horseman_ping) return
    if (location === 'Wilderness') {
        showAlert(wildHorseTitle);
        sendMessage('[!] Horseman @ Wilderness [!]');
        data.audioInst.playDefaultSound();
    }
    if (location === 'Graveyard') {
        showAlert(graveHorseTitle);
        sendMessage('[!] Horseman @ Graveyards [!]');
        data.audioInst.playDefaultSound();
    }
}).setCriteria("${spawner} has spawned the Headless Horseman boss in the ${location}!")


/////////////////////////////////////////////////
// PRIMAL FEARS
////////////////////////////////////////////////
// message hiders
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.primal_fear_main_toggle) return;
    if (!Settings.hide_fear_messages) return;
    cancel(event);
}).setCriteria('FEAR. You got some rewards from killing a Primal Fear!');

register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.primal_fear_main_toggle) return;
    if (!Settings.hide_fear_messages) return;
    cancel(event);
}).setCriteria('[FEAR]').setContains();

// primal fears spawn ping
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.primal_fear_main_toggle) return;
    if (!Settings.primal_fear_spawn_ping) return;
    data.audioInst.playDefaultSound();
    showAlert('&4PRIMAL FEAR')
    sendMessage('[!] Primal Fear (not ls-able btw)[!]')
}).setCriteria('FEAR. A Primal Fear has been summoned!')

// quick maths lol
register('chat', (problem, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.primal_fear_main_toggle) return;
    if (!Settings.fear_math_solver) return;
    const question = problem.replace(/x/g, '*');
    const result = eval(question);
    setTimeout(() => {
        ChatLib.chat(result.toFixed(0))
    }, 300)
}).setCriteria('QUICK MATHS! Solve: ${problem}')

// random blah blah
let isRandomAnnounced = false;
register('chat', (name, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.primal_fear_main_toggle) return;
    if (!Settings.fear_karen_solver) return;
    const randomMessage = generateRandomStr(18);
    if (name !== Player.getName()) return;
    if (!isRandomAnnounced) {
        isRandomAnnounced = true;
        setTimeout(() => {
            ChatLib.chat(randomMessage)
        }, 300)
        setTimeout(() => {
            isRandomAnnounced = false;
        }, 30000)
    }
}).setCriteria('[FEAR] Public Speaking Demon: Say something interesting ${name}!')


// Royal Resident
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.primal_fear_main_toggle) return;
    if (!Settings.hide_royal_resident_messages) return;
    cancel(event);
}).setCriteria('[NPC] No Name: ').setContains();



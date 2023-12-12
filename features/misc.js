import Settings from "../settings.js"
import Audio from '../utils/audio.js'
import { data } from '../utils/data.js'
import { showAlert } from '../utils/utils.js'
import { playSound, generateRandomStr, hideMessage, getTabArea, timeToSeconds, petDropPing, sendSelf, sendGuild } from "../utils/functions.js"
import { sendMessage, announce } from '../utils/party.js'

let currArea = '';
register('step', () => { if (!data.inSkyblock) return; currArea = getTabArea(); }).setFps(1);

const miscAudio = new Audio();

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
// golden goblin alert
register('chat', (event) => {
    if (!data.inSkyblock) return;
    if (!Settings.golden_goblin_alert) return;
    showAlert('&6Golden Goblin')
    miscAudio.playDefaultSound();
    sendMessage('[!] Golden Goblin [!]')
}).setCriteria('A Golden Goblin has spawned!')

// scatha pet drop alert
register('chat', (mf, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.scatha_pet_drop_ping) return;
    const message = ChatLib.getChatMessage(event, true);
    petDropPing(message, 'PET DROP!', 'Scatha', mf, miscAudio)
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
        miscAudio.playDefaultSound();
    }

    // blue jerry
    if (message.includes('&9Blue Jerry&e')) {
        sendSelf('[!] A Blue Jerry has spawned [!]');
        showAlert(blue_jerry);
        miscAudio.playDefaultSound();
    }

    // purple jerry
    if (message.includes('&5Purple Jerry&e')) {
        sendSelf('[!] A Purple Jerry has spawned [!]');
        showAlert(purple_jerry);
        miscAudio.playDefaultSound();
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
    miscAudio.playDefaultSound();
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
register('chat', (event) => {
    if (!Settings.spooky_tot_ping) return
    var message = ChatLib.getChatMessage(event, true)

    const totPattern = '&r&c&lTRICK! &r&eA &r&c&r&eTrick or Treater &r&ehas tricked you!&r';
    const wgourdPattern = '&r&c&lTRICK! &r&eA &r&c&r&6Wither Gourd &r&ehas tricked you!&r';
    const pSpiritPattern = '&r&c&lTRICK! &r&eA &r&c&r&cPhantom Spirit &r&ehas tricked you!&r';
    const sJerryPattern = '&r&c&lTRICK! &r&eA &r&c&r&6Scary Jerry &r&ehas tricked you!&r';
    const wraithPattern = '&r&c&lTRICK! &r&eA &r&c&r&8Wraith &r&ehas tricked you!&r';
    const cWitchPattern = '&r&c&lTRICK! &r&eA &r&c&r&8Crazy Witch &r&ehas tricked you!&r';
    
    // trick or treater
    if (message.includes(totPattern)) { 
        if (Settings.hide_scc_msgs) cancel(event);
        sendMessage('TRICK! Trick or Treater spawned!'); 
        showAlert(sharing_is_caring);
        miscAudio.playDefaultSound();
    }  
    // wither gourd
    if (message.includes(wgourdPattern)) { 
        if (Settings.hide_scc_msgs) cancel(event);
        sendMessage('TRICK! Wither Gourd spawned!'); 
        showAlert(sharing_is_caring);
        miscAudio.playDefaultSound();
    }

    // phantom spirit
    if (message.includes(pSpiritPattern)) {
        if (Settings.hide_scc_msgs) cancel(event); 
        sendMessage('TRICK! Phantom Spirit spawned!'); 
        showAlert(sharing_is_caring);
        miscAudio.playDefaultSound();
    } 

    // scary jerry
    if (message.includes(sJerryPattern)) { 
        if (Settings.hide_scc_msgs) cancel(event);
        sendMessage('TRICK! Scary Jerry spawned!'); 
        showAlert(sharing_is_caring);
        miscAudio.playDefaultSound();
    } 

    // wraith
    if (message.includes(wraithPattern)) { 
        if (Settings.hide_scc_msgs) cancel(event);
        sendMessage('TRICK! Wraith spawned!'); 
        showAlert(sharing_is_caring);
        miscAudio.playDefaultSound();
    } 

    // crazy witch
    if (message.includes(cWitchPattern)) { 
        if (Settings.hide_scc_msgs) cancel(event);
        sendMessage('TRICK! Crazy Witch spawned!'); 
        showAlert(sharing_is_caring);
        miscAudio.playDefaultSound();
    } 
})

// headless horseman ping
register('chat', (spawner, location, event) => {
    cancel(event);
    if (!Settings.horseman_ping) return
    if (location == 'Wilderness') {
        showAlert(wildHorseTitle);
        sendMessage('[!] Horseman @ Wilderness [!]');
        miscAudio.playDefaultSound();
    }
    if (location == 'Graveyard') {
        showAlert(graveHorseTitle);
        sendMessage('[!] Horseman @ Graveyards [!]');
        miscAudio.playDefaultSound();
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
    miscAudio.playDefaultSound();
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



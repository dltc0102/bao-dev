import Settings from "../settings.js"
import Audio from '../utils/audio.js';

const devAudio = new Audio();

// test commands
register('command', (args) => {
    Client.showTitle(args, '', 1, 30, 1);
    devAudio.playDefaultSound();
}).setName('titlesim').setAliases('tsim');

////////////////////////////////
// ali's tab thing [WIP]
// sends message for accurate level detection
////////////////////////////////
function getFilteredPlayerTabNames() {
    return TabList.getNames()
        .filter(name => /\[.*\]/.test(name))
        .map(name => name.split(' ')[1].removeFormatting());
}


register('command', () => {
    const playerTabNames = getFilteredPlayerTabNames();
    const filteredNames = Array.from(new Set(playerTabNames));
    console.log(filteredNames)
}).setName('gettabnames');

// ah filter
let attributeAliases = {
    "blazing_fortune": "bf", 
    "breeze": "brz", 
    "life_regeneration": "lr", 
    "lifeline": "ll", 
    "magic_find": "mf", 
    "mana_pool": "mp", 
    "mana_regeneration": "mr", 
    "vitality": "vit", 
    "speed": "spd", 
    "veteran": "vet", 
    "fishing_experience": "fe", 
    "infection": "inf", 
    "double_hook": "dh", 
    "fisherman": "fm", 
    "fishing_speed": "fs", 
    "hunter": "ht", 
    "trophy_hunter": "th"
}

register('command', () => {
    // garden
    Settings.gardenPlotMap = true;
    Settings.gardenContestOverlay = true;
    Settings.harvPotionOverlay = true;
    Settings.sprayonatorDisplay = true;
    Settings.vinylDisplay = true;
    Settings.pestRepellentDisplay = true;
    Settings.pestExchangeDisplay = true;
    Settings.pestEsp = true;
    Settings.autoSHPest = true;
    Settings.autoWarpPest = true;
    Settings.titlePestAlert = true;
    Settings.hideSprayonatorExpiryMsg = true;
    Settings.alertNoMatSprayonator = true;
    Settings.gardenRareDropPings = true;
    Settings.gardenPetDropPings = true;
    Settings.showPlayerYawPitch = true;

    // Timers
    Settings.flux_timer = true;
    Settings.kingScentTimer = true;
    Settings.gummyTimer = true;

    // Counter -- Fishing
    Settings.fishing_counter = true;
    Settings.kills_fishingcounter = true;
    Settings.mob_since_fishingcounter = true;
    Settings.drops_fishingcounter = true;
    Settings.tracker_fishingcounter = true;
    Settings.avgs_fishingcounter = true; 
    Settings.elapsed_sincefishingcounter = true;
    Settings.specials_fishingcounter = true;

    // gui
    Settings.bobberCounter = true; 
    Settings.playersNearbyCount = true;
    Settings.detectDoubleJawbus = true;
    // enter jawbus hp here
    Settings.detectDoubleThunder = true;
    // enter thunder hp here
    Settings.chargeCounter = true; 

    // general qol
    Settings.auto_warp_cmd = true;
    Settings.auto_notify_warp_cmd = true;
    Settings.warp_exc_cmd = true;
    Settings.pai_cmd = true;
    Settings.pk_cmd = true;
    Settings.show_active_pet = true; // pet counter
    Settings.kicked_notifier = true;
    Settings.boop_notifier = true;
    Settings.get_baker_cake = true;
    Settings.hide_lightning = true;
    Settings.hide_autopet_messages = true;
    Settings.hide_snow_cannon_messages = true;

    // fishing qol
    Settings.rekindleAlert = true;
    Settings.secondWindAlert = true;
    Settings.mushyTimer = true;
    Settings.hide_sc_msgs = true;
    Settings.full_bottle_ping = true;
    Settings.hide_blessing_messages = true;

    // fishing pings
    ChatLib.command('togglefishingpings', true);

    // misc
    Settings.golden_goblin_alert = true;
    Settings.scatha_pet_drop_ping = true;
    Settings.grandma_hider = true;
    Settings.jerry_ping = true;
    Settings.spooky_tot_ping = true;
    Settings.hide_royal_resident_messages = true;
    Settings.end_protector_ping = true;
    Settings.dye_pings = true;

    // dungeons
    Settings.wish_cmd = true;
    Settings.bonzo_cd_timer = true;
    Settings.alert_melody = true;

    // hp display
    Settings.master_displayHP = true
    Settings.vanq_hp = true;
    Settings.inq_hp = true;
    Settings.champ_hp = true;
    Settings.rein_hp = true;
    Settings.yeti_hp = true;
    Settings.jawbus_hp = true;
    Settings.thunder_hp = true;
    Settings.gwshark_hp = true;
    Settings.carrot_king_hp = true;
    Settings.waterhydra_hp = true;
    Settings.sea_emp_hp = true;
    Settings.reaper_hp = true;
    Settings.phantom_fisher_hp = true;

    // sound
    Settings.rng_sound_selected = 3;

    // debug
    Settings.toggle_debug = true;

    // mythos
    Settings.announce_inqs = true;
    Settings.hide_griffin_error = true;
    Settings.mythos_counter_general = true;
    Settings.mythos_counter_kills = true;
    Settings.mythos_counter_drops = true;
    Settings.mythos_counter_averages = true;
    Settings.mythos_counter_trackers = true;
}).setName('allbaosettings');

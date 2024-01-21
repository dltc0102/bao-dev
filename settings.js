import { @ButtonProperty, @CheckboxProperty, Color, @ColorProperty, @PercentSliderProperty, @SelectorProperty, @SwitchProperty, @TextProperty, @Vigilant} from 'Vigilance';

@Vigilant("bao-dev", "§3bao-dev", {
    getCategoryComparator: () => (a, b) => {
        const categories = ['General QOL', 'GUI', 'HP Display', 'Timers', 'Fishing QOL', 'Fishing Pings', 'Counter', 'Garden', 'Mythos', 'Misc', 'Dungeons', 'Sound', 'Debug']
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})

class Settings {
    // General QOL
    // commands
    // message qol
    // others

    // GUI
    // overlay toggles
    /// edit gui location

    // HP Display

    // Timers

    // Fishing QOL

    // Fishing Pings

    // Counter

    // Garden

    // Mythos

    // Misc

    // Dungeons

    // Sound

    // Debug
    //////////////////////////////////////////////////////////////////////////////
    /* Settings @ Mythos ---------------------------------------------------------
    * Purpose: Settings for Mythological Event
    ----------------------------------------------------------------------------*/
    //////////////////////////////////////////////////////////////////////////////
    // inq announce
    @SwitchProperty({
        name: "Announce Inqs",
        description: "Announces inqs in party chat. Announces in coop if not in party.",
        category: "Mythos",
        subcategory: "QOL",
    })
    announce_inqs = false;

    // hide 'leg griffin' errors
    @SwitchProperty({
        name: "Hide Leg Griffin Error",
        description: "Hides the specific message: 'You need to equip a LEGENDARY griffin pet to fight this!'.",
        category: "Mythos",
        subcategory: "QOL",
    })
    hide_griffin_error = false;

    // edit mythos counter location
    @ButtonProperty({
        name: "Edit Mythos Counter Location", 
        description: "Click the button to move the Mythos Counter on your screen.", 
        category: "Mythos", 
        subcategory: "Counter", 
    })
    openMythosCounterGUI() {
        ChatLib.command('movemythoscounter', true)
    }

    // mythos counter
    @SwitchProperty({
        name: "Mythos Counter",
        description: "Turns on/off the Mythological Counter",
        category: "Mythos",
        subcategory: "Counter",
    })
    mythos_main_toggle = false;

    // general mythos counter info
    @SwitchProperty({
        name: "General Mythos Info",
        description: "Shows Burrow Counter, Feather Counter and Money Dug Up Counter",
        category: "Mythos",
        subcategory: "Counter",
    })
    mythos_counter_general = false;

    // kills mythos counter info
    @SwitchProperty({
        name: "Mythos Mob Kills Info",
        description: "Shows Kills Info for Mythological Ritual Mobs",
        category: "Mythos",
        subcategory: "Counter",
    })
    mythos_counter_kills = false;

    // drops mythos counter info
    @SwitchProperty({
        name: "Mythos Mob Drops Info",
        description: "Shows info for Mob Drops for Mythological Ritual Mobs",
        category: "Mythos",
        subcategory: "Counter",
    })
    mythos_counter_drops = false;

    // average mythos counter info
    @SwitchProperty({
        name: "Mythos Mob Averages Info",
        description: "Shows info for Mob Averages/Rates for Mythological Ritual Mobs",
        category: "Mythos",
        subcategory: "Counter",
    })
    mythos_counter_averages = false;

    // tracker mythos counter info
    @SwitchProperty({
        name: "Mythos Mob Trackers Info",
        description: "Shows info for Mob Trackers for Mythological Ritual Mobs",
        category: "Mythos",
        subcategory: "Counter",
    })
    mythos_counter_trackers = false;



    ////////////////////////////////////////////////////////////////////////////
    // HP Display --------------------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////
    // Edit HP Display Location
    @ButtonProperty({
        name: "Edit HP Display Location", 
        description: "Click the button to move the HP Display on your screen.", 
        category: "HP Display", 
    })
    openHPDisplayGUI() {
        ChatLib.command('movehp', true)
    }

    // Toggle all boss bars
    @SwitchProperty({
        name: "Mob HP Display Master Toggle",
        description: "Toggles all mob hp displays.",
        category: "HP Display",
        subcategory: "Toggleables",
    })
    master_displayHP = false;

    // vanq hp
    @SwitchProperty({
        name: "Display HP: Vanquishers",
        description: "Toggles health display for Vanquishers",
        category: "HP Display",
        subcategory: "Toggleables",
    })
    vanq_hp = false;

    // inq hp
    @SwitchProperty({
        name: "Display HP: Inquisitors",
        description: "Toggles health display for Inquisitors",
        category: "HP Display",
        subcategory: "Toggleables",
    })
    inq_hp = false;

    @SwitchProperty({
        name: "Display HP: Mythos Mobs",
        description: "Toggles health display for Mythos Mobs (not including Inquisitors)",
        category: "HP Display",
        subcategory: "Toggleables",
    })
    mythosMobHP = false;
    
    // champs hp
    @SwitchProperty({
        name: "Display HP: Champions",
        description: "Toggles health display for Champions",
        category: "HP Display",
        subcategory: "Toggleables",
    })
    champ_hp = false;

    // rein hp
    @SwitchProperty({
        name: "Display HP: Reindrakes",
        description: "Toggles health display for Reindrakes",
        category: "HP Display",
        subcategory: "Toggleables",
    })
    rein_hp = false;

    // yeti hp
    @SwitchProperty({
        name: "Display HP: Yeti",
        description: "Toggles health display for Yeti",
        category: "HP Display",
        subcategory: "Toggleables",
    })
    yeti_hp = false;

    // jawbus hp
    @SwitchProperty({
        name: "Display HP: Jawbus",
        description: "Toggles health display for Jawbus",
        category: "HP Display",
        subcategory: "Toggleables",
    })
    jawbus_hp = false;

    // thunder hp
    @SwitchProperty({
        name: "Display HP: Thunder",
        description: "Toggles health display for Thunder",
        category: "HP Display",
        subcategory: "Toggleables",
    })
    thunder_hp = false;

    // gw hp
    @SwitchProperty({
        name: "Display HP: Great Whites",
        description: "Toggles health display for Great Whites",
        category: "HP Display",
        subcategory: "Toggleables",
    })
    gwshark_hp = false;

    // ck hp
    @SwitchProperty({
        name: "Display HP: Carrot Kings",
        description: "Toggles health display for Carrot Kings",
        category: "HP Display",
        subcategory: "Toggleables",
    })
    carrotking_hp = false;

    // waterhydra hp
    @SwitchProperty({
        name: "Display HP: Water Hydras",
        description: "Toggles health display for Water Hydras",
        category: "HP Display",
        subcategory: "Toggleables",
    })
    waterhydra_hp = false;

    // sea emp hp
    @SwitchProperty({
        name: "Display HP: Sea Emperors",
        description: "Toggles health display for Sea Emperors",
        category: "HP Display",
        subcategory: "Toggleables",
    })
    sea_emp_hp = false;

    // grim reaper hp
    @SwitchProperty({
        name: "Display HP: Grim Reapers",
        description: "Toggles health display for Grim Reapers",
        category: "HP Display",
        subcategory: "Toggleables",
    })
    reaper_hp = false;

    // phantom fisher hp
    @SwitchProperty({
        name: "Display HP: Phantom Fishers",
        description: "Toggles health display for Phantom Fisher",
        category: "HP Display",
        subcategory: "Toggleables",
    })
    phantom_fisher_hp = false;


    ////////////////////////////////////////////////////////////////////////////
    // GARDENS -----------------------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////
    // Plot Map
    @SwitchProperty({
        name: "Plot Map",
        description: "Shows the player's position on the map relative to the garden, shows the 5x5 plot Garden has.",
        category: "Garden",
        subcategory: "QOL", 
    })
    gardenPlotMap = false;

    // In Contest Overlay
    @SwitchProperty({
        name: "Display Contest Overlay",
        description: "Shows whether there is a Jacob's Contest or not. [&aYes&r/&cNo&r]",
        category: "Garden",
        subcategory: "Overlays", 
    })
    gardenContestOverlay = false;

    // Harvest Harbringer Potion Timer
    @SwitchProperty({
        name: "Harbringer Potion Timer",
        description: "Shows timer for Harbringer Potion.",
        category: "Garden",
        subcategory: "Overlays", 
    })
    harvPotionOverlay = false;

    // Sprayonator Display
    @SwitchProperty({
        name: "Sprayonator Display",
        description: "Shows display for selected material and possible pests for the Sprayonator.",
        category: "Garden",
        subcategory: "Overlays", 
    })
    sprayonatorDisplay = false;

    // Vinyl Display
    @SwitchProperty({
        name: "Vinyl Display",
        description: "Shows display for selected Vinyl.",
        category: "Garden",
        subcategory: "Overlays", 
    })
    vinylDisplay = false;

    // Pest Repellent Timer
    @SwitchProperty({
        name: "Pest Repellent Timer",
        description: "Shows timer for Pest Repellent.",
        category: "Garden",
        subcategory: "Overlays", 
    })
    pestRepellentDisplay = false;

    // Pest Exchange Timer
    @SwitchProperty({
        name: "Pest Exchange Timer",
        description: "Shows timer for Pest Exchange. Also shows # of pests exchanged and the bonus FF you were given.",
        category: "Garden",
        subcategory: "Overlays", 
    })
    pestExchangeDisplay = false;

    // Pest QOL
    @SwitchProperty({
        name: "Pest QOL",
        description: "QOL Features for Pest Hunting.",
        category: "Garden",
        subcategory: "QOL", 
    })
    pestQOL = false;

    // Pest Esp
    @SwitchProperty({
        name: "Pest ESP",
        description: "Highlights an outlined box around a pest. (not esp through walls)",
        category: "Garden",
        subcategory: "QOL", 
    })
    pestEsp = false;

    // Pest Autosethome
    @SwitchProperty({
        name: "Auto Set Home Pest",
        description: "Automatically sets home when a pest has spawned.\n&c This is a chat macro.",
        category: "Garden",
        subcategory: "QOL", 
    })
    autoSHPest = false;

    // Pest Autowarp
    @SwitchProperty({
        name: "Autowarp Pest",
        description: "Automatically warps you to plot where the pest has spawned.\n&c This is a chat macro.\n&cThis feature is automatically disabled when a Jacob's contest is active.",
        category: "Garden",
        subcategory: "QOL", 
    })
    autoWarpPest = false;

    // Show Pest Alert on Screen
    @SwitchProperty({
        name: "Screen Pest Alert",
        description: "Show Pest Alert on Screen",
        category: "Garden",
        subcategory: "QOL", 
    })
    titlePestAlert = false;

    // Sprayonator Message(s) Hider
    @SwitchProperty({
        name: "Hide Sprayonator Expiry Message",
        description: "&rHides the message '&cSPRAYONATOR! This will expire in 30m&r'.",
        category: "Garden",
        subcategory: "QOL", 
    })
    hideSprayonatorExpiryMsg = false;

    // Sprayonator No Mat Alert
    @SwitchProperty({
        name: "Sprayonator No Mat Alert",
        description: "Alerts the user that you don't have the required materials for Sprayonator.",
        category: "Garden",
        subcategory: "QOL", 
    })
    alertNoMatSprayonator = false;

    // Sprayonator Selected Mat Message Hider
    @SwitchProperty({
        name: "Sprayonator Selected Mat Message Hider",
        description: "&7Hides the message: '&cSPRAYONATOR! Your selected material is now &e${material}&c!'",
        category: "Garden",
        subcategory: "QOL", 
    })
    hideSelSprayMatMsg = false;

    // Better Garden Messages
    @SwitchProperty({
        name: "Better Garden Messages",
        description: "Hides/Changes the message into something simpler.\n&7'WARNING! Blocks that you break on this plot will not drop items while using a custom preset!' &bmessage is hidden.\n&7'Remember, you have to be on the island for the resources to be planted!'&b message is hidden.\n&7'Started pasting &e${presetName}&7 preset on Garden Plot - &e${plotName}&7!'&b has been converted to &7'PASTING: Using Preset [&e${presetName}&7] on Plot &e${plotName}&7!'&b.",
        category: "Garden",
        subcategory: "QOL", 
    })
    betterGardenMessages = false;


    // Rare Drop Pings
    @SwitchProperty({
        name: "Garden Rare Drop Pings",
        description: "Shows, announces and pings user when drops have been detected.\n&aDrops included for pings: Pesterminator Books, Atmospheric Filters, Burrowing Spores\n&c This is a chat macro.",
        category: "Garden",
    })
    gardenRareDropPings = false;

    // Pet Drop Pings
    @SwitchProperty({
        name: "Garden Pet Drop Pings",
        description: "Shows, announces and pings user when drops have been detected.\n&aDrops included for pings: Slug Pets, Rat Pets\n&c This is a chat macro.",
        category: "Garden",
    })
    gardenPetDropPings = false;

    // Yaw and Pitch
    @SwitchProperty({
        name: "Player Yaw and Pitch",
        description: "Shows the player's Yaw and Pitch to 4 decimal places.",
        category: "Garden",
        subcategory: "Overlays",
    })
    showPlayerYawPitch = false;

    ////////////////////////////////////////////////////////////////////////////
    // TIMERS ------------------------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////
    // Edit Times Location
    @ButtonProperty({
        name: "Edit Timers Location", 
        description: "Click the button to move the Timers on your screen.", 
        category: "Timers", 
        subcategory: "Edit Overlays", 
    })
    openTimerGUI() {
        ChatLib.command('movetimerdisplay', true)
    }
    
    // Flux Timer
    @SwitchProperty({
        name: "Flux Countdown Timer",
        description: "Shows flux timer top right",
        category: "Timers",
    })
    flux_timer = false;

    // King Scent Timer
    @SwitchProperty({
        name: "King's Scent Timer",
        description: "Countdown for King's Scent for Nucleus Runs",
        category: "Timers",
    })
    kingScentTimer = false;

    // Reheated Gummy Bear Timer
    @SwitchProperty({
        name: "Reheated Gummy Bear Timer",
        description: "Timer for reheated gummy bear. &7Note: this will be grouped with the timers for bonzo masks and spirit masks timers.",
        category: "Timers", 
    })
    gummyTimer = false;

    ////////////////////////////////////////////////////////////////////////////
    // FISHING COUNTER ---------------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////
    // category desc:
    // /resetwinter for resetting winter stats
    // /resetcrimson for resetting crimson stats
    // /resetgeneral for resetting general/hub stats
    // /baoresetfishing for resetting all fishing counter stats
    // \n&eNote that session is reset when the counter is reset.
    @SwitchProperty({
        name: "Fishing Counter",
        description: "Fishing Counter\n&bOnly works for hub, crimson isles, and jerry island.",
        category: "Counter", 
    })
    fishing_counter = false;

    @SwitchProperty({
        name: "Counter: Kills",
        description: "Shows kills for each category of sea creatures.\n&eDependent on loc/event.",
        category: "Counter", 
    })
    kills_fishingcounter = false;

    @SwitchProperty({
        name: "Counter: Mob Since [RNG]",
        description: "Shows mobs fished up since rng drop.",
        category: "Counter", 
    })
    mob_since_fishingcounter = false;

    @SwitchProperty({
        name: "Counter: Drops",
        description: "Shows drops for current session.",
        category: "Counter", 
    })
    drops_fishingcounter = false;

    @SwitchProperty({
        name: "Counter: Trackers",
        description: "Shows sea creatues fished since rare sea creature.",
        category: "Counter", 
    })
    tracker_fishingcounter = false;

    @SwitchProperty({
        name: "Counter: Averages",
        description: "Shows averages for sea creatues. For example: \n&e Average SC / Yeti: total winter kills / total yeti kills",
        category: "Counter", 
    })
    avgs_fishingcounter = false;

    @SwitchProperty({
        name: "Counter: Time Elapsed since [RNG]",
        description: "Shows time elapsed since last rng drop.",
        category: "Counter", 
    })
    elapsed_sincefishingcounter = false;

    @SwitchProperty({
        name: "Counter: Special Funny Counters",
        description: "For example: \n&bWinter: &rShows counter for ice rods and money earnt from selling to NPC.",
        category: "Counter", 
    })
    specials_fishingcounter = false;



    ////////////////////////////////////////////////////////////////////////////
    // GUI OVERLAYS ------------------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////
    // Edit Bobber Count Location
    @ButtonProperty({
        name: "Edit Bobber Count Location", 
        description: "Click the button to move the Bobber Counter on your screen.", 
        category: "GUI", 
        subcategory: "Edit Overlays", 
    })
    openBobberGUI() {
        ChatLib.command('movebobber', true)
    }

    // Edit Player Count Location
    @ButtonProperty({
        name: "Edit Player Count Location", 
        description: "Click the button to move the Player Counter on your screen.", 
        category: "GUI", 
        subcategory: "Edit Overlays", 
    })
    openPlayerGUI() {
        ChatLib.command('moveplayer', true)
    }

    // Edit Nearby Jawbus Location
    @ButtonProperty({
        name: "Edit Nearby Jawbus Location", 
        description: "Click the button to move the Nearby Jawbus Text on your screen.", 
        category: "GUI", 
        subcategory: "Edit Overlays", 
    })
    openJawbusGUI() {
        ChatLib.command('movejawbus', true)
    }

    // Edit Nearby Thunder Location
    @ButtonProperty({
        name: "Edit Nearby Thunder Location", 
        description: "Click the button to move the Nearby Thunder Text on your screen.", 
        category: "GUI", 
        subcategory: "Edit Overlays", 
    })
    openThunderGUI() {
        ChatLib.command('movethunder', true)
    }

    // Edit Nearby Thunder Location
    @ButtonProperty({
        name: "Edit Charge Counter Location", 
        description: "Click the button to move the Charge Counter Text on your screen.", 
        category: "GUI", 
        subcategory: "Edit Overlays", 
    })
    openChargeGUI() {
        ChatLib.command('movecharge', true)
    }

    
    ////////////////////////////////////////////////////////////////////////////
    // GUI TOGGLES ------------------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////   
    // Bobber Count
    @SwitchProperty({
        name: "Bobber Count",
        description: "Shows bobbers near you in a 30 block radius for Bobbin' Time.",
        category: "GUI", 
        subcategory: "Overlay Toggles",
    })
    bobberCount = false;

    // Players Nearby
    @SwitchProperty({
        name: "Players Nearby Count",
        description: "Shows players near you in a 30 block radius.",
        category: "GUI", 
        subcategory: "Overlay Toggles",
    })
    playersNearbyCount = false;

    // Detect nearby/unpinged/double Jawbus
    @SwitchProperty({
        name: "Detect Double Jawbus",
        description: "Detects nearby unpinged Jawbus and Doublehook Jawbus Entities.",
        category: "GUI", 
        subcategory: "Overlay Toggles",
    })
    detectDoubleJawbus = false;

    // Detect nearby/unpinged/double Thunder
    @SwitchProperty({
        name: "Detect Double Thunder",
        description: "Detects nearby unpinged Thunder and Doublehook Thunder Entities.",
        category: "GUI", 
        subcategory: "Overlay Toggles",
    })
    detectDoubleThunder = false;

    // Detect Charges Counter
    @SwitchProperty({
        name: "Detect Charge Counter",
        description: "Detects Charge Amount in your Thunder Bottles of your Inventory.",
        category: "GUI", 
        subcategory: "Overlay Toggles",
    })
    chargeCounter = false;
    


    ////////////////////////////////////////////////////////////////////////////
    // GENERAL QOL -------------------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////
    // Auto Warp Command (#warp)
    @SwitchProperty({
        name: "Auto Warp Command",
        description: "Use the command to get auto-warped by party leader.\nUsage: #warp (in party chat)",
        category: "General QOL",
        subcategory: "Commands", 
    })
    auto_warp_cmd = false;

    // Auto notify new party joiners to use the warp command when ready
    @SwitchProperty({
        name: "Auto notify new party joiners",
        description: "Notifies new party joiners to use #warp command when ready",
        category: "General QOL",
        subcategory: "Commands", 
    })
    auto_notify_warp_cmd = false;

    // Warpexc command (/warpexc)
    @SwitchProperty({
        name: "Warpexc Command",
        description: "Warp all except given names.\nUsage: /warpexc name1 name2 ...",
        category: "General QOL",
        subcategory: "Commands", 
    })
    warp_exc_cmd = false;

    // Party Allinvite Shortcut (#pai)
    @SwitchProperty({
        name: "Party Allinvite Shortcut",
        description: "Gets the party to become all-invite if Party Leader is busy.\nUsage: #pai",
        category: "General QOL",
        subcategory: "Commands", 
    })
    pai_cmd = false;

    // Party Allinvite Shortcut (#pai)
    @SwitchProperty({
        name: "Party Kickoffline Shortcut",
        description: "Kicks offline players in party.\nUsage: #pai",
        category: "General QOL",
        subcategory: "Commands", 
    })
    pk_cmd = false;

    // Kicked Notifier
    @SwitchProperty({
        name: "Kicked Notifier",
        description: "Tell your party that you're kicked and cooldown is 1 minute.",
        category: "General QOL",
        subcategory: "QOL", 
    })
    kicked_notifier = false;


    // Boop Notifier
    @SwitchProperty({
        name: "Boop Notifier",
        description: "Notifies you when you get booped.",
        category: "General QOL",
        subcategory: "QOL", 
    })
    boop_notifier = false;

    // auto command that opens baker gui to get cake when he arrives.
    @SwitchProperty({
        name: "Easy get Baker Cake",
        description: "Get Baker cake easily when he arrives.\n Runs &e/openbaker &r to open the baker's gui and let you get cake.",
        category: "General QOL", 
        subcategory: "QOL"
    })
    get_baker_cake = false;

    // hide lightning
    @SwitchProperty({
        name: "Hide Lightning",
        description: "Hides lightning visual effects.",
        category: "General QOL", 
        subcategory: "Messages QOL"
    })
    hide_lightning = false;

    // Hide Autopet Messages
    @SwitchProperty({
        name: "Hide Autopet Messages",
        description: "Hides autopet messages.",
        category: "General QOL",
        subcategory: "Messages QOL",
    })
    hide_autopet_messages = false;

    // Hide Snow Cannon messages
    @SwitchProperty({
        name: "Hide Snow Cannon Messages",
        description: "Hides snow cannon messages. [Jerry's Workshop]",
        category: "General QOL",
        subcategory: "Messages QOL"
    })
    hide_snow_cannon_messages = false;

    // Better Stash Messages
    @SwitchProperty({
        name: "Better Stash Messages",
        description: "&cHides/Simplifies Stash Messages.\n&7'From stash: &e${itemName}&f'&b has been hidden.\n&7'You picked up &e${numItems}&7 items from your material stash!'&b has been hidden.\n&7'You still have &e${matsRem}&7 materials totalling &e${numTypes}&7 types of materials in there!'&b has been hidden and simplified to be:\n&7'From Sacks: &e${pickupMat}&7 x&e${numMats}&7 || R: &e${remMats}&7 || Types: &e${sackTypes}&f'",
        category: "General QOL",
        subcategory: "Messages QOL"
    })
    betterStashMessages = false;

    // Hide Click Stash Messages
    @SwitchProperty({
        name: "Hide Click Stash Messages",
        description: "&cHides Click Stash Messages:\n&fOld Messages:\n&7'You have &e${numMatsRem}&7 materials stashed away!'&b -- hidden.\n&7'(This totals &e${numTypes}&7 type of material stashed!)'&b -- hidden.\n&7'(This totals &e${numTypes}&7 types of materials stashed!)'&b -- hidden.\n&7'>>> CLICK HERE to pick them up! <<<'&b -- hidden.\n\n&cThese messages will be condensed into one message:\n&f'REMINDER: You have &e${reminderMatsRem}&f materials of &e${numTypesRem}&f type(s) in your sacks!'",
        category: "General QOL",
        subcategory: "Messages QOL"
    })
    hideClickStashMessages = false;

    // Hide AOTE/AOTV Message
    @SwitchProperty({
        name: "Hide AOTE/AOTV Message",
        description: "Hides 'Blocks in the way' Message.'",
        category: "General QOL",
        subcategory: "Messages QOL"
    })
    aotvHider = false;

    // Hide Soopy Unknown Command Message
    @SwitchProperty({
        name: "Hide Soopy Unknown Command Message",
        description: "Hides Soopy gibberish command showing up on screen.",
        category: "General QOL",
        subcategory: "Messages QOL"
    })
    randomSoopyMessageHider = false;

    // grandma wolf hider
    @SwitchProperty({
        name: "Grandma Hider",
        description: "Hides message from Grandma Wolf Pet",
        category: "General QOL",
        subcategory: "Messages QOL",
    })
    grandma_hider = false; 

    // watchdog message hider
    @SwitchProperty({
        name: "Removed Watchdog Announcements",
        description: "Hides message from watchdog announcements.",
        category: "General QOL",
        subcategory: "Messages QOL",
    })
    betterWDA = false; 


    ////////////////////////////////////////////////////////////////////////////
    // FISHING QOL -------------------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////
    // Phoenix Rekindle CD Timer
    @SwitchProperty({
        name: "Phoenix Rekindle CD Timer",
        description: "Shows message when CD for Phoenix Rekindle Ability is available.",
        category: "Fishing QOL",
        subcategory: "Timers",
    })
    rekindleAlert = false;

    // Spirit Mask CD Timer
    @SwitchProperty({
        name: "Spirit Mask CD Timer",
        description: "Shows message when CD for Spirit Mask Second Wind is available.",
        category: "Fishing QOL",
        subcategory: "Timers",
    })
    secondWindAlert = false;

    // Mushy Timer
    @SwitchProperty({
        name: "Mushy Tonic Timer",
        description: "Shows Timer for Mushy Tonic.",
        category: "Fishing QOL",
        subcategory: "Timers",
    })
    mushyTimer = false;

    // Hide Double Hook Messages
    @SwitchProperty({
        name: "Hide Double Hook Messages",
        description: "Hides double hook messages.",
        category: "Fishing QOL",
        subcategory: "Message Hiders",
    })
    hideDHMessages = false;

    // Hide SC Messages
    @SwitchProperty({
        name: "Hide SC Messages",
        description: "Hides default catch messages for SC(s)",
        category: "Fishing QOL",
        subcategory: "Message Hiders"
    })
    hide_sc_msgs = false;
    
    // Hide Blessing double drop messages
    @SwitchProperty({
        name: "Hide Blessing Enchant Messages",
        description: "Hides the double drop message proc'ed by the Blessing enchant.",
        category: "Fishing QOL",
        subcategory: "Message Hiders",
    })
    hide_blessing_messages = false;
    
    // Full Thunder Bottle Ping
    @SwitchProperty({
        name: "Full Thunder Bottle Ping",
        description: "Shows Alert to Player when bottle of thunder is full.",
        category: "Fishing QOL",
    })
    full_bottle_ping = false;


    //////////////////////////////////////////////////////////////////////////////
    /* Settings @ Crimson Isle Fishing -------------------------------------------
    * Purpose: Settings for Crimson Isle Pings
    ----------------------------------------------------------------------------*/
    //////////////////////////////////////////////////////////////////////////////
    // all pings
    @ButtonProperty({
        name: "Toggle All Fishing Pings",
        description: "Turns on/off all fishing pings",
        category: "Fishing Pings",
    })
    toggle_master_fishing_pings() {
        ChatLib.command('togglefishingpings', true);
    }

    // Jawbus Ping
    @SwitchProperty({
        name: "Jawbus Ping",
        description: "Shows Jawbus Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Crimson Isles"
    })
    jawbus_ping = false;

    // Radioactive Vial Ping [Jawbus Ping]
    @SwitchProperty({
        name: "Radioactive Vial Ping",
        description: "Shows and Announces Radioactive Vial when dropped.",
        category: "Fishing Pings",
        subcategory: "Crimson Isles"
    })
    rvial_ping = false;

    // Thunder Ping
    @SwitchProperty({
        name: "Thunder Ping",
        description: "Shows Thunder Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Crimson Isles"
    })
    thunder_ping = false;
    
    // Vanquisher Ping
    @SwitchProperty({
        name: "Vanquisher Ping",
        description: "Shows Vanquisher Ping when spawned.",
        category: "Fishing Pings",
        subcategory: "Crimson Isles"
    })
    vanq_ping = false;
    
    // Phlegblast Ping
    @SwitchProperty({
        name: "Phlegblast Ping",
        description: "Shows Phlegblast Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Crimson Isles"
    })
    phleg_ping = false;
    

    //////////////////////////////////////////////////////////////////////////////
    /* Settings @ Winter Island Fishing ------------------------------------------
    * Purpose: Settings for Winter Island Pings
    ----------------------------------------------------------------------------*/
    //////////////////////////////////////////////////////////////////////////////
    // Yeti Ping
    @SwitchProperty({
        name: "Yeti Ping",
        description: "Shows Yeti Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Winter Island"
    })
    yeti_ping = false;
    
    // Baby Yeti Pet Drop Ping [Yeti Ping]
    @SwitchProperty({
        name: "Baby Yeti Pet Drop Ping",
        description: "Shows and Announces Leg/Epic Yeti Pet Drop Ping when dropped.",
        category: "Fishing Pings",
        subcategory: "Winter Island"
    })
    yeti_pet_drop_ping = false;
    
    // Nutcracker Ping
    @SwitchProperty({
        name: "Nutcracker Ping",
        description: "Shows Nutcracker Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Winter Island"
    })
    nutcracker_ping = false;
    
    // Reindrake Ping
    @SwitchProperty({
        name: "Reindrake Ping",
        description: "Shows Reindrake Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Winter Island"
    })
    rein_ping = false;


    //////////////////////////////////////////////////////////////////////////////
    /* Settings @ Hub - Shark Fishing --------------------------------------------
    * Purpose: Settings for Hub - Shark Pings
    ----------------------------------------------------------------------------*/
    //////////////////////////////////////////////////////////////////////////////
    // Great White Shark Ping
    @SwitchProperty({
        name: "Great White Shark Ping",
        description: "Shows Great White Shark Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Hub Shark"
    })
    gw_ping = false;

    // Megalodon Pet Drop Ping [GW Shark Ping]
    @SwitchProperty({
        name: "Meg Pet Drop Ping",
        description: "Shows and Announces Leg/Epic Meg Pet Drop message when dropped.",
        category: "Fishing Pings",
        subcategory: "Hub Shark"
    })
    meg_pet_drop_ping = false;


    //////////////////////////////////////////////////////////////////////////////
    /* Settings @ Hub - Spooky Fishing -------------------------------------------
    * Purpose: Settings for Hub - Spooky Pings
    ----------------------------------------------------------------------------*/
    //////////////////////////////////////////////////////////////////////////////
    // Phantom Fisher Ping
    @SwitchProperty({
        name: "Phantom Fisher Ping",
        description: "Shows Phantom Fisher Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Hub Spooky"
    })
    phantom_fisher_ping = false;

    // Grim Reaper Ping
    @SwitchProperty({
        name: "Grim Reaper Ping",
        description: "Shows Grim Reaper Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Hub Spooky"
    })
    grim_reaper_ping = false;
    
    // Deep Sea Orb Ping [Phantom Fisher / Grim Reaper Ping]
    @SwitchProperty({
        name: "Deep Sea Orb Ping",
        description: "Shows and Announces Deep Sea Orb drops.",
        category: "Fishing Pings",
        subcategory: "Hub Spooky"
    })
    dso_ping = false;

    // Phantom Rod [Phantom Fisher]
    @SwitchProperty({
        name: "Phantom Rod Ping",
        description: "Shows and Announces Phantom Rod drops.",
        category: "Fishing Pings",
        subcategory: "Hub Spooky"
    })
    phan_rod_ping = false;

    // Lucky Hoof [Nightmare]
    @SwitchProperty({
        name: "Lucky Hoof Ping",
        description: "Shows and Announces Lucky Hoof drops.",
        category: "Fishing Pings",
        subcategory: "Hub Spooky"
    })
    hoof_ping = false;


    //////////////////////////////////////////////////////////////////////////////
    /* Settings @ Hub Fishing --------------------------------------------
    * Purpose: Settings for Hub Pings
    ----------------------------------------------------------------------------*/
    //////////////////////////////////////////////////////////////////////////////
    // Sea Emperor Ping
    @SwitchProperty({
        name: "Sea Emperor Ping",
        description: "Shows Sea Emperor Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Hub"
    })
    sea_emp_ping = false;

    // Flying Fish Pet Drop Ping [Sea Emperor Ping]
    @SwitchProperty({
        name: "Flying Fish Pet Drop Ping",
        description: "Shows and Announces Flying Fish Pet Drops.",
        category: "Fishing Pings",
        subcategory: "Hub"
    })
    ff_pet_drop_ping = false;

    // Carrot King Ping
    @SwitchProperty({
        name: "Carrot King Ping",
        description: "Shows Carrot King Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Hub"
    })
    carrot_king_ping = false;
    
    // Lucky Clover Core Pings [Carrot King Ping]
    @SwitchProperty({
        name: "Lucky Clover Core Ping",
        description: "Shows Lucky Clover Core Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Hub"
    })
    lucky_core_ping = false;
    
    // Water Hydra Ping
    @SwitchProperty({
        name: "Water Hydra Ping",
        description: "Shows Water Hydra Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Hub"
    })
    hydra_ping = false;

    // Guardian Pet Drop Ping
    @SwitchProperty({
        name: "Guardian Pet Drop Ping",
        description: "Shows Guardian Pet Drop Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Hub"
    })
    guardian_pet_drop_ping = false;

    // Dolphin Milestone Pet Drop Ping
    @SwitchProperty({
        name: "Dolphin Milestone Pet Drop Ping",
        description: "Shows Dolphin Milestone Pet Drop Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Hub"
    })
    dolphin_ms_pet_drop_ping = false;

    // Squid Pet Drop Ping
    @SwitchProperty({
        name: "Squid Pet Drop Ping",
        description: "Shows Squid Pet Drop Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Hub"
    })
    squid_pet_drop_ping = false;
    

    //////////////////////////////////////////////////////////////////////////////
    /* Settings @ Others Crystal Hollows Fishing ---------------------------------
    * Purpose: Settings for Other Fishing Settings
    ----------------------------------------------------------------------------*/
    //////////////////////////////////////////////////////////////////////////////
    // Zombie Miner Ping
    @SwitchProperty({
        name: "Zombie Miner Ping",
        description: "Shows Jawbus Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "zOthers"
    })
    zb_miner_ping = false;

    // Fawe - v2.0.5
    @SwitchProperty({
        name: "Fawe Default Pings",
        description: "Shows Ping titles for fawe's default messages\nUp to date for v2.0.5",
        category: "Fishing Pings",
        subcategory: "zOthers"
    })
    fawe_pings = false;


    //////////////////////////////////////////////////////////////////////////////
    /* Settings @ Misc > Mining --------------------------------------------------
    * Purpose: Settings for Mining
    ----------------------------------------------------------------------------*/
    //////////////////////////////////////////////////////////////////////////////

    @SwitchProperty({
        name: "Lobby Day Counter",
        description: "Shows Lobby Day Counter.",
        category: "Misc",
        subcategory: "Mining"
    })
    lobbyDayCount = false;

    @ButtonProperty({
        name: "Edit Location of Lobby Day Counter", 
        description: "Click to edit gui location of the lobby day counter.", 
        category: "Misc", 
        subcategory: "Mining"
    })
    openLobbyDayCounterEditGUI() {
        ChatLib.command('movedaycount', true)
    }

    @SwitchProperty({
        name: "Golden Goblin Alert",
        description: "Notification for when Golden Goblin Spawns",
        category: "Misc",
        subcategory: "Mining"
    })
    golden_goblin_alert = false;

    @SwitchProperty({
        name: "Scatha Pet Drop Alert",
        description: "Notification for Scatha Pet Drops.",
        category: "Misc",
        subcategory: "Mining"
    })
    scatha_pet_drop_ping = false;


    //////////////////////////////////////////////////////////////////////////////
    /* Settings @ Misc > Jerry ---------------------------------------------------
    * Purpose: Settings for Jerry Pings
    ----------------------------------------------------------------------------*/
    //////////////////////////////////////////////////////////////////////////////
    // Jerry Pings
    @SwitchProperty({
        name: "Hidden Jerry Ping",
        description: "Shows Jerry Pings for Jerries that spawn when Jerry is mayor.",
        category: "Misc",
        subcategory: "Jerry"
    })
    jerry_ping = false;
    
    //////////////////////////////////////////////////////////////////////////////
    /* Settings @ Misc > Trick or Treat Mob --------------------------------------
    * Purpose: Settings for Trick or Treat Mob Pings
    ----------------------------------------------------------------------------*/
    //////////////////////////////////////////////////////////////////////////////
    // Trick or Treat Mob Pings
    @SwitchProperty({
        name: "Trick or Treat Mobs Ping",
        description: "Shows Mob Pings from Trick or Treat Chests.",
        category: "Misc",
        subcategory: "Spooky"
    })
    spooky_tot_ping = false;

    //////////////////////////////////////////////////////////////////////////////
    /* Settings @ Misc > Horseman ------------------------------------------------
    * Purpose: Settings for Horseman Pings
    ----------------------------------------------------------------------------*/
    //////////////////////////////////////////////////////////////////////////////
    // Headless Horseman
    @SwitchProperty({
        name: "Headless Horseman Ping",
        description: "Shows Summoned Headless Horseman at Wilderness/Graveyard Ping.",
        category: "Misc",
        subcategory: "Spooky"
    })
    horseman_ping = false;


    //////////////////////////////////////////////////////////////////////////////
    /* Settings @ Misc > Great Spook ---------------------------------------------
    * Purpose: Settings for Great Spook Pings
    ----------------------------------------------------------------------------*/
    //////////////////////////////////////////////////////////////////////////////
    // main toggle
    @SwitchProperty({
        name: "Primal Fear Main Toggle",
        description: "Main toggle for Primal Fear Event QOL Features.",
        category: "Misc",
        subcategory: "Spooky"
    })
    primal_fear_main_toggle = false;

    // Primal Fears
    @SwitchProperty({
        name: "Hide Fear Messages",
        description: "Hides Fear Messages from fears.",
        category: "Misc",
        subcategory: "Spooky"
    })
    hide_fear_messages = false;
    
    // Primal Fears
    @SwitchProperty({
        name: "Primal Fear Ping",
        description: "Shows ping when Primal Fear is spawning.",
        category: "Misc",
        subcategory: "Spooky"
    })
    primal_fear_spawn_ping = false;

    // auto solver for mathematician fear
    @SwitchProperty({
        name: "Solver for Mathematician Fear",
        description: "Answers Mathematician quick solves.",
        category: "Misc",
        subcategory: "Spooky"
    })
    fear_math_solver = false;

    // auto solver for karen fear
    @SwitchProperty({
        name: "Solver for Karen Fear",
        description: "Answers Public Speaking Demon's rants.",
        category: "Misc",
        subcategory: "Spooky"
    })
    fear_karen_solver = false;

    // Royal Resident
    @SwitchProperty({
        name: "Mute the Sheep",
        description: "Mutes messages from Royal Resident.",
        category: "Misc",
    })
    hide_royal_resident_messages = false;


    //////////////////////////////////////////////////////////////////////////////
    /* Settings @ Misc > End Protector -------------------------------------------
    * Purpose: Settings for End Protector Pings
    ----------------------------------------------------------------------------*/
    //////////////////////////////////////////////////////////////////////////////
    // End Protector Spawning Ping
    @SwitchProperty({
        name: "End Protector Ping",
        description: "Shows Ping when End Protector is about to spawn.",
        category: "Misc",
        subcategory: "End"
    })
    end_protector_ping = false;

    //////////////////////////////////////////////////////////////////////////////
    /* Settings @ Misc > Dye ----------------------------------------------------
    * Purpose: Settings for Dye Pings
    ----------------------------------------------------------------------------*/
    //////////////////////////////////////////////////////////////////////////////
    // Dye Pings
    @SwitchProperty({
        name: "Dye Pings", 
        description: "Shows Pings for all the dyes.",
        category: "Misc",
        subcategory: "Dyes"
    })
    dye_pings = false;

    // Announce Dye pings in guild
    @SwitchProperty({
        name: "Announce Dye Pings in Guild", 
        description: "Announces Dye pings in guild",
        category: "Misc",
        subcategory: "Dyes"
    })
    guild_announce_dye_pings = false;


    //////////////////////////////////////////////////////////////////////////////
    /* Settings @ Dungeons -------------------------------------------------------
    * Purpose: Settings for Dungeon Settings
    ----------------------------------------------------------------------------*/
    //////////////////////////////////////////////////////////////////////////////
    // Bonzo Mask 
    @SwitchProperty({
        name: "Bonzo Mask CD Timer", 
        description: "Shows message when CD for Bonzo Mask Clownin' Around is available.",
        category: "Dungeons"
    })
    bonzo_cd_timer = false;

    // Melody Terminal
    @SwitchProperty({
        name: "Melody Terminal Alert", 
        description: "Tells your party you have a melody terminal.",
        category: "Dungeons"
    })
    alert_melody = false;

    // Secrets Per Run
    @SwitchProperty({
        name: "Display Secrets per Run (per session)", 
        description: "Shows your secrets per run per session.",
        category: "Dungeons", 
        subcategory: "Secrets",
    })
    secretsPerSession = false;

    @ButtonProperty({
        name: "Edit Secret Counter Location", 
        description: "Click the button to move the Secret Counter on your screen.", 
        category: "Dungeons",
        subcategory: "Secrets",
    })
    openSecretCounterGUI() {
        ChatLib.command('movesecretcounter', true)
    }

    // Better Dungeon Messages
    @SwitchProperty({
        name: "Better Dungeon Messages", 
        description: "Master Toggle for all dungeon message changes/deletions etc when you are in a dungeon.",
        category: "Dungeons"
    })
    betterDungeonMsgs = false;

    @SwitchProperty({
        name: "Toggle: Player Actions", 
        description: "o abilities\no revivies\no obtained item messages\no decoy deployed messages\no essence messages\no creeper veil messages",
        category: "Dungeons"
    })
    dungeonPlayerActions = false;

    @SwitchProperty({
        name: "Toggle: QOL", 
        description: "o npc sold items\no friend join/left messages\no gexp/hypixel xp messages",
        category: "Dungeons"
    })
    dungeonMessageQOL = false;

    @SwitchProperty({
        name: "Toggle: System Notifications", 
        description: "o mort messages\no class stat change messages\no wish messages\no sacks messages",
        category: "Dungeons"
    })
    dungeonSysNotifications = false;

    @SwitchProperty({
        name: "Toggle: Interactive Elements", 
        description: "o milestones\no wither door messages\no blood door messages\no boss messages\no statue messages\no floor specific messages\no blessing messages\no puzzle messages\no mob damage messages\no witherborn damage messages",
        category: "Dungeons"
    })
    dungeonInteractiveElements = false;

    // party finder shortener
    @SwitchProperty({
        name: "Party Finder Message Shortener", 
        description: "Changed 'Party Finder > (message) to 'PF > (message)'",
        category: "Dungeons"
    })
    betterPFMessages = false;
    
    ////////////////////////////////////////////////////////////////////////////
    // SOUNDS ------------------------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////
    // Choosing RNG Sound
    @SelectorProperty({
        name: "RNG Sounds", 
        description: "Choose a sound to play when RNG Drops happen.", 
        category: "Sound", 
        options: ['Default', 'Disfigure - Blank', 'Persona4 - Specialist', 'TVB News Theme', 'Chipi Chipi Dubi Daba']
    })
    rng_sound_sel = 0;

    
    ////////////////////////////////////////////////////////////////////////////
    // DEBUG -------------------------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////
    // Toggle Debug Mode
    @SwitchProperty({
        name: "Debug Mode", 
        description: "Toggle Debug Mode", 
        category: "Debug"
    })
    toggle_debug = false;

    ////////////////////////////////////////////////////////////////////////////
    // DRAGONS -----------------------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////
    // Better Dungeon Messages
    @SwitchProperty({
        name: "Better End Messages", 
        description: "Master Toggle for all end message changes/deletions etc when you are in the end.",
        category: "Misc",
        subcategory: "End"
    })
    betterEndMessages = false;

    @SwitchProperty({
        name: "Alert Special Zealot", 
        description: "Sends a message to yourself/party that you got a special zealot.",
        category: "Misc",
        subcategory: "End"
    })
    sendZealotPing = false;

    // drag counter
    @SwitchProperty({
        name: "Dragon Counter", 
        description: "Master Toggle for Dragon Counter.",
        category: "Misc",
        subcategory: "End"
    })
    showDragonCounter = false;

    @SwitchProperty({
        name: "Drag Counter: Spawns", 
        description: "Toggles the area that shows # of spawns per dragon type.",
        category: "Misc",
        subcategory: "End"
    })
    dragCounterSpawns = false;

    @SwitchProperty({
        name: "Drag Counter: Trackers", 
        description: "Toggles the area that shows stats like Dragons Since Superior Dragon or # of Crystals Broken.",
        category: "Misc",
        subcategory: "End"
    })
    dragCounterTrackers = false;

    // constructor for category descriptions
    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General QOL", "General QOL Features and Commands")
        this.setCategoryDescription("Fishing Pings", "Fishing Pings for Mobs and Drops")
        this.setCategoryDescription("Misc", "Miscellaneous Pings for Event Mobs")
        this.setCategoryDescription("Dungeon", "Dungeon Features")
        
        // General QOL
        this.addDependency("Hide Click Stash Messages", "Better Stash Messages")

        // Mythos 
        this.addDependency("General Mythos Info", "Mythos Counter")
        this.addDependency("Mythos Mob Kills Info", "Mythos Counter")
        this.addDependency("Mythos Mob Drops Info", "Mythos Counter")
        this.addDependency("Mythos Mob Averages Info", "Mythos Counter")
        this.addDependency("Mythos Mob Trackers Info", "Mythos Counter")

        // Display HP
        this.addDependency("Display HP: Vanquishers", "Mob HP Display Master Toggle")
        this.addDependency("Display HP: Inquisitors", "Mob HP Display Master Toggle")
        this.addDependency("Display HP: Champions", "Mob HP Display Master Toggle")
        this.addDependency("Display HP: Reindrakes", "Mob HP Display Master Toggle")
        this.addDependency("Display HP: Yeti", "Mob HP Display Master Toggle")
        this.addDependency("Display HP: Jawbus", "Mob HP Display Master Toggle")
        this.addDependency("Display HP: Thunder", "Mob HP Display Master Toggle")
        this.addDependency("Display HP: Great Whites", "Mob HP Display Master Toggle")
        this.addDependency("Display HP: Carrot Kings", "Mob HP Display Master Toggle")
        this.addDependency("Display HP: Water Hydras", "Mob HP Display Master Toggle")
        this.addDependency("Display HP: Sea Emperors", "Mob HP Display Master Toggle")
        this.addDependency("Display HP: Grim Reapers", "Mob HP Display Master Toggle")
        this.addDependency("Display HP: Phantom Fishers", "Mob HP Display Master Toggle")
        
        // Fishing Counter
        this.addDependency("Counter: Kills", "Fishing Counter")
        this.addDependency("Counter: Mob Since [RNG]", "Fishing Counter")
        this.addDependency("Counter: Drops", "Fishing Counter")
        this.addDependency("Counter: Trackers", "Fishing Counter")
        this.addDependency("Counter: Averages", "Fishing Counter")
        this.addDependency("Counter: Time Elapsed since [RNG]", "Fishing Counter")
        this.addDependency("Counter: Special Funny Counters", "Fishing Counter")

        // Gardens
        this.addDependency("Pest ESP", "Pest QOL")
        this.addDependency("Auto Set Home Pest", "Pest QOL")
        this.addDependency("Autowarp Pest", "Pest QOL")
        this.addDependency("Screen Pest Alert", "Pest QOL")

        // this.addDependency(child name, parent name)
        // fishing.crimson_isles
        this.addDependency("Radioactive Vial Ping", "Jawbus Ping")

        // fishing.winter_island
        this.addDependency("Baby Yeti Pet Drop Ping", "Yeti Ping")

        // fishing.hub_shark
        this.addDependency("Meg Pet Drop Ping", "Great White Shark Ping")

        // fishing.hub
        this.addDependency("Flying Fish Pet Drop Ping", "Sea Emperor Ping")
        this.addDependency("Lucky Clover Core Ping", "Carrot King Ping")


        // misc - mining
        this.addDependency("Edit Location of Lobby Day Counter", "Lobby Day Counter")
        // misc - mythos
        this.addDependency("General Mythos Info", "Mythos Counter")
        this.addDependency("Mythos Mob Kills Info", "Mythos Counter")
        this.addDependency("Mythos Mob Drops Info", "Mythos Counter")
        this.addDependency("Mythos Mob Averages Info", "Mythos Counter")
        this.addDependency("Mythos Mob Trackers Info", "Mythos Counter")

        // misc - primal fears
        this.addDependency("Hide Fear Messages", "Primal Fear Main Toggle")
        this.addDependency("Primal Fear Ping", "Primal Fear Main Toggle")
        this.addDependency("Solver for Mathematician Fear", "Primal Fear Main Toggle")
        this.addDependency("Solver for Karen Fear", "Primal Fear Main Toggle")
        
        // dungeons
        this.addDependency("Toggle: QOL", "Better Dungeon Messages")
        this.addDependency("Toggle: Player Actions", "Better Dungeon Messages")
        this.addDependency("Toggle: System Notifications", "Better Dungeon Messages")
        this.addDependency("Toggle: Interactive Elements", "Better Dungeon Messages")

        // dragons
        this.addDependency("Drag Counter: Spawns", "Dragon Counter")
        this.addDependency("Drag Counter: Trackers", "Dragon Counter")
    }   
}

export default new Settings();
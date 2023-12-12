import {
    @ButtonProperty,
    @CheckboxProperty,
    Color,
    @ColorProperty,
    @PercentSliderProperty,
    @SelectorProperty,
    @SwitchProperty,
    @TextProperty,
    @Vigilant,
} from 'Vigilance';

@Vigilant("bao", "§3Bao", {
    getCategoryComparator: () => (a, b) => {
        const categories = ['Garden', 'GUI', 'General QOL', 'Fishing QOL', 'Fishing Pings', 'Misc', 'Slayer', 'Dungeons', 'HP Display', 'Sound', 'Debug']
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})

class Settings {
    ////////////////////////////////////////////////////////////////////////////
    // HP Display --------------------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////
    // Toggle all boss bars
    @SwitchProperty({
        name: "Mob HP Display Master Toggle",
        description: "Toggles all mob hp displays.",
        category: "HP Display",
    })
    master_displayHP = false;

    // vanq hp
    @SwitchProperty({
        name: "Display HP: Vanquishers",
        description: "Toggles health display for Vanquishers",
        category: "HP Display",
    })
    vanq_hp = false;

    // inq hp
    @SwitchProperty({
        name: "Display HP: Inquisitors",
        description: "Toggles health display for Inquisitors",
        category: "HP Display",
    })
    inq_hp = false;
    
    // champs hp
    @SwitchProperty({
        name: "Display HP: Champions",
        description: "Toggles health display for Champions",
        category: "HP Display",
    })
    champ_hp = false;

    // rein hp
    @SwitchProperty({
        name: "Display HP: Reindrakes",
        description: "Toggles health display for Reindrakes",
        category: "HP Display",
    })
    rein_hp = false;

    // yeti hp
    @SwitchProperty({
        name: "Display HP: Yeti",
        description: "Toggles health display for Yeti",
        category: "HP Display",
    })
    yeti_hp = false;

    // jawbus hp
    @SwitchProperty({
        name: "Display HP: Jawbus",
        description: "Toggles health display for Jawbus",
        category: "HP Display",
    })
    jawbus_hp = false;

    // thunder hp
    @SwitchProperty({
        name: "Display HP: Thunder",
        description: "Toggles health display for Thunder",
        category: "HP Display",
    })
    thunder_hp = false;

    // gw hp
    @SwitchProperty({
        name: "Display HP: Great Whites",
        description: "Toggles health display for Great Whites",
        category: "HP Display",
    })
    gwshark_hp = false;

    // ck hp
    @SwitchProperty({
        name: "Display HP: Carrot Kings",
        description: "Toggles health display for Carrot Kings",
        category: "HP Display",
    })
    carrotking_hp = false;

    // waterhydra hp
    @SwitchProperty({
        name: "Display HP: Water Hydras",
        description: "Toggles health display for Water Hydras",
        category: "HP Display",
    })
    waterhydra_hp = false;

    // sea emp hp
    @SwitchProperty({
        name: "Display HP: Sea Emperors",
        description: "Toggles health display for Sea Emperors",
        category: "HP Display",
    })
    sea_emp_hp = false;

    // grim reaper hp
    @SwitchProperty({
        name: "Display HP: Grim Reapers",
        description: "Toggles health display for Grim Reapers",
        category: "HP Display",
    })
    reaper_hp = false;

    // phantom fisher hp
    @SwitchProperty({
        name: "Display HP: Phantom Fisher",
        description: "Toggles health display for Phantom Fisher",
        category: "HP Display",
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
        ChatLib.command('movetimer', true)
    }
    
    // Flux Timer
    @SwitchProperty({
        name: "Flux Countdown Timer",
        description: "Shows flux timer top right",
        category: "Timers",
    })
    flux_timer = false;

    @SwitchProperty({
        name: "Kings Scent Timer",
        description: "Countdown for King's Scent for Nucleus Runs",
        category: "Timers",
    })
    kingScentTimer = false;

    // @SwitchProperty({
    //     name: "Caducous Feeder Timer",
    //     description: "Countdown for Caducous Feeder",
    //     category: "Timers",
    // })
    // feeder_timer = false;

    // @SwitchProperty({
    //     name: "Cake Timer",
    //     description: "Countdown for new Cake",
    //     category: "Timers",
    // })
    // cake_timer = false; 

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
        description: "Fishing Counter\n&cCurrently only works for crimson isle.",
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
        name: "Counter: Special funny Counters",
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

    // Not on SB Notifier
    @SwitchProperty({
        name: "Not on Skyblock Notifier",
        description: "Tell your party that you're not on skyblock and ask for auto warp.",
        category: "General QOL",
        subcategory: "QOL", 
    })
    not_on_sb_notifier = false;

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
        category: "Counter", 
    })
    get_baker_cake = false;


    ////////////////////////////////////////////////////////////////////////////
    // FISHING QOL -------------------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////
    // Phoenix Rekindle CD Timer
    @SwitchProperty({
        name: "Phoenix Rekindle CD Timer",
        description: "Shows message when CD for Phoenix Rekindle Ability is available.",
        category: "Fishing QOL",
    })
    rekindleAlert = false;

    // Spirit Mask CD Timer
    @SwitchProperty({
        name: "Spirit Mask CD Timer",
        description: "Shows message when CD for Spirit Mask Second Wind is available.",
        category: "Fishing QOL",
    })
    secondWindAlert = false;

    // Mushy Timer
    @SwitchProperty({
        name: "Mushy Tonic Timer",
        description: "Shows Timer for Mushy Tonic.",
        category: "Fishing QOL",
    })
    mushyTimer = false;

    // Hide Scc Messages
    @SwitchProperty({
        name: "Hide SC Messages",
        description: "Hides default catch messages for SC(s)",
        category: "Fishing QOL",
    })
    hide_sc_msgs = false;

    // Full Thunder Bottle Ping
    @SwitchProperty({
        name: "Full Thunder Bottle Ping",
        description: "Shows Alert to Player when bottle of thunder is full.",
        category: "Fishing QOL",
    })
    full_bottle_ping = false;

    // Hide Autopet Messages
    @SwitchProperty({
        name: "Hide Autopet Messages",
        description: "Hides autopet messages.",
        category: "Fishing QOL",
    })
    hide_autopet_messages = false;

    // Hide Snow Cannon messages
    @SwitchProperty({
        name: "Hide Snow Cannon Messages",
        description: "Hides snow cannon messages. [Jerry's Workshop]",
        category: "Fishing QOL",
    })
    hide_snow_cannon_messages = false;
    
    //////////////////////////////////////////////////////////////////////////////
    /* Settings @ Crimson Isle Fishing -------------------------------------------
    * Purpose: Settings for Crimson Isle Pings
    ----------------------------------------------------------------------------*/
    //////////////////////////////////////////////////////////////////////////////
    // all pings
    @SwitchProperty({
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
    
    // Flash 1 Ping [Thunder Ping]
    @SwitchProperty({
        name: "Flash I Ping",
        description: "Shows and Announces Flash I Ping when dropped.",
        category: "Fishing Pings",
        subcategory: "Crimson Isles"
    })
    flash1_ping = false;
    
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
    /* Settings @ Misc > Mythological Event -------------------------------------
    * Purpose: Settings for Mythological Event
    ----------------------------------------------------------------------------*/
    //////////////////////////////////////////////////////////////////////////////
    @SwitchProperty({
        name: "Mythos Counter",
        description: "Turns on/off the Mythological Counter",
        category: "Misc",
        subcategory: "Mythos"
    })
    mythos_main_toggle = false;

    // general mythos counter info
    @SwitchProperty({
        name: "General Mythos Info",
        description: "Shows Burrow Counter, Feather Counter and Money Dug Up Counter",
        category: "Misc",
        subcategory: "Mythos"
    })
    mythos_counter_general = false;

    // kills mythos counter info
    @SwitchProperty({
        name: "Mythos Mob Kills Info",
        description: "Shows Kills Info for Mythological Ritual Mobs",
        category: "Misc",
        subcategory: "Mythos"
    })
    mythos_counter_kills = false;

    // drops mythos counter info
    @SwitchProperty({
        name: "Mythos Mob Drops Info",
        description: "Shows info for Mob Drops for Mythological Ritual Mobs",
        category: "Misc",
        subcategory: "Mythos"
    })
    mythos_counter_drops = false;

    // average mythos counter info
    @SwitchProperty({
        name: "Mythos Mob Averages Info",
        description: "Shows info for Mob Averages/Rates for Mythological Ritual Mobs",
        category: "Misc",
        subcategory: "Mythos"
    })
    mythos_counter_averages = false;

    // tracker mythos counter info
    @SwitchProperty({
        name: "Mythos Mob Trackers Info",
        description: "Shows info for Mob Trackers for Mythological Ritual Mobs",
        category: "Misc",
        subcategory: "Mythos"
    })
    mythos_counter_trackers = false;


    //////////////////////////////////////////////////////////////////////////////
    /* Settings @ Misc > Mining --------------------------------------------------
    * Purpose: Settings for Mining
    ----------------------------------------------------------------------------*/
    //////////////////////////////////////////////////////////////////////////////
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
    /* Settings @ Misc > ---------------------------------------------------------
    * Purpose: Settings for Caducous Feeder and Cakes
    ----------------------------------------------------------------------------*/
    //////////////////////////////////////////////////////////////////////////////
    @SwitchProperty({
        name: "Grandma Hider",
        description: "Hides message from Grandma Wolf Pet",
        category: "Misc",
    })
    grandma_hider = false; 



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
    /* Settings @ Slayer QOL ----------------------------------------------------
    * Purpose: Settings for Slayer QOL Features
    ----------------------------------------------------------------------------*/
    //////////////////////////////////////////////////////////////////////////////
    // Shows info for slayer 
    @SwitchProperty({
        name: "Detects and Shows Info for Slayer", 
        description: "Slayer is auto-selected.\n&b - &rRevs: Boom Timer\n&b - &rEman: WIP",
        category: "Slayer",
    })
    slayerInfoToggle = false;

    // QOL for Eman Melee 1-Taps
    @SwitchProperty({
        name: "Eman Melee QOL",
        description: "&b- &rDisplays Pearl #.\n&b- &rAuto GFS for Pearls when you are running low.\n&b- &rDisplays TAP #\n&b- &rReminds you to restock on TAP when low.\n&b- &rShows Current Helmet.",
        category: "Slayer",
    })
    emanMeleeQOL = false;



    /////////////////////////////////////////////////////////////////////////////
    /* Settings @ Slayer > Rev ---------------------------------------------------
    * Purpose: Settings for Rev Slayer RNG Drops
    ----------------------------------------------------------------------------*/
    //////////////////////////////////////////////////////////////////////////////
    // Rev RNG Drops Main Toggle
    @SwitchProperty({
        name: "Rev Slayer RNG Drops", 
        description: "Shows RNG Drops for Rev Slayer",
        category: "Slayer",
        subcategory: "Rev Slayer"
    })
    revSlayerRNGToggle = false;

    // Scythe Blade Ping
    @SwitchProperty({
        name: "Scythe Blade Ping", 
        description: "Shows Scythe Blade Ping when dropped.",
        category: "Slayer",
        subcategory: "Rev Slayer"
    })
    scythe_blade_ping = false;
    
    // SotS Ping
    @SwitchProperty({
        name: "Shard of the Shredded Ping", 
        description: "Shows Shard of the Shredded Ping when dropped.",
        category: "Slayer",
        subcategory: "Rev Slayer"
    })
    sots_ping = false;
    
    // Warden Heart Ping
    @SwitchProperty({
        name: "Warden Heart Ping", 
        description: "Shows Warden Heart Ping when dropped.",
        category: "Slayer",
        subcategory: "Rev Slayer"
    })
    warden_heart_ping = false;


    /////////////////////////////////////////////////////////////////////////////
    /* Settings @ Slayer > Tara --------------------------------------------------
    * Purpose: Settings for Tara Slayer RNG Drops
    ----------------------------------------------------------------------------*/
    //////////////////////////////////////////////////////////////////////////////
    // Tara RNG Drops Main Toggle
    @SwitchProperty({
        name: "Tara Slayer RNG Drops", 
        description: "Shows RNG Drops for Tara Slayer",
        category: "Slayer",
        subcategory: "Tara Slayer"
    })
    taraSlayerRNGToggle = false;

    // Digested Mosquito Ping
    @SwitchProperty({
        name: "Digested Mosquito Ping", 
        description: "Shows Digested Mosquito Ping when dropped.",
        category: "Slayer",
        subcategory: "Tara Slayer"
    })
    dig_mos_ping = false;

    // Tara Talisman Ping
    @SwitchProperty({
        name: "Tarantula Talisman Ping", 
        description: "Shows Tarantula Talisman Ping when dropped.",
        category: "Slayer",
        subcategory: "Tara Slayer"
    })
    tara_tali_ping = false;

    // Fly Swatter Ping
    @SwitchProperty({
        name: "Fly Swatter Ping", 
        description: "Shows Fly Swatter Ping when dropped.",
        category: "Slayer",
        subcategory: "Tara Slayer"
    })
    fly_swatter_ping = false;



    /////////////////////////////////////////////////////////////////////////////
    /* Settings @ Slayer > Sven --------------------------------------------------
    * Purpose: Settings for Sven Slayer RNG Drops
    ----------------------------------------------------------------------------*/
    //////////////////////////////////////////////////////////////////////////////
    // Sven RNG Drops Main Toggle
    @SwitchProperty({
        name: "Sven Slayer RNG Drops", 
        description: "Shows RNG Drops for Sven Slayer",
        category: "Slayer",
        subcategory: "Sven Slayer"
    })
    svenSlayerRNGToggle = false;

    // Overflux Capacitor Ping
    @SwitchProperty({
        name: "Overcapacitor Ping",
        description: "Shows Overcapacitor Ping when dropped.",
        category: "Slayer",
        subcategory: "Sven Slayer"
    })
    overcap_ping = false;

    // Wolf Talisman Ping
    @SwitchProperty({
        name: "Wolf Talisman Ping",
        description: "Shows Wolf Talisman Ping when dropped.",
        category: "Slayer",
        subcategory: "Sven Slayer"
    })
    wolf_tali_ping = false;


    /////////////////////////////////////////////////////////////////////////////
    /* Settings @ Slayer > Eman --------------------------------------------------
    * Purpose: Settings for Eman Slayer RNG Drops
    ----------------------------------------------------------------------------*/
    //////////////////////////////////////////////////////////////////////////////
    // Eman RNG Drops Main Toggle
    @SwitchProperty({
        name: "Eman Slayer RNG Drops", 
        description: "Shows RNG Drops for Eman Slayer",
        category: "Slayer",
        subcategory: "Eman Slayer"
    })
    emanSlayerRNGToggle = false;

    // Judgement Core Ping
    @SwitchProperty({
        name: "Judgement Core Ping",
        description: "Shows ping when Judgement Core dropped.",
        category: "Slayer",
        subcategory: "Eman Slayer"
    })
    jcore_ping = false;
    
    // Ender Slayer 7 Book Ping
    @SwitchProperty({
        name: "Ender Slayer 7 Book Ping",
        description: "Shows ping when Enderslayer 7 Book dropped.",
        category: "Slayer",
        subcategory: "Eman Slayer"
    })
    es7_book_ping = false;
    
    // Enchant Rune Ping
    @SwitchProperty({
        name: "Enchant Rune I Ping",
        description: "Shows ping when Enchant Rune I dropped.",
        category: "Slayer",
        subcategory: "Eman Slayer"
    })
    enchant_rune_ping = false;



    /////////////////////////////////////////////////////////////////////////////
    /* Settings @ Slayer > Blaze -------------------------------------------------
    * Purpose: Settings for Blaze Slayer RNG Drops
    ----------------------------------------------------------------------------*/
    //////////////////////////////////////////////////////////////////////////////
    // Blaze RNG Drops Main Toggle
    @SwitchProperty({
        name: "Blaze Slayer RNG Drops", 
        description: "Shows RNG Drops for Blaze Slayer",
        category: "Slayer",
        subcategory: "Blaze Slayer"
    })
    blazeSlayerRNGToggle = false;
    
    // Duplex 1 Book Ping
    @SwitchProperty({
        name: "Duplex 1 Book Ping", 
        description: "Shows Duplex 1 Book Ping when dropped.",
        category: "Slayer",
        subcategory: "Blaze Slayer"
    })
    duplex1_book_ping = false;
    
    // High Class Archfiend Dice Ping
    @SwitchProperty({
        name: "High Class Archfiend Dice Ping", 
        description: "Shows High Class Dice Ping when dropped.",
        category: "Slayer",
        subcategory: "Blaze Slayer"
    })
    high_class_dice_ping = false;
    
    // Wilsons Plans Ping
    @SwitchProperty({
        name: "Wilsons Plans Ping", 
        description: "Shows Wilsons Plans Ping when dropped.",
        category: "Slayer",
        subcategory: "Blaze Slayer"
    })
    wilsons_plans_ping = false;
    
    // Subzero Inverter Ping
    @SwitchProperty({
        name: "Subzero Inverter Ping", 
        description: "Shows Subzero Inverter Ping when dropped.",
        category: "Slayer",
        subcategory: "Blaze Slayer"
    })
    subzero_inverter_ping = false;
    
    // Scorched Crystal Ping
    @SwitchProperty({
        name: "Scorched Crystal Ping", 
        description: "Shows Scorched Crystal Ping when dropped.",
        category: "Slayer",
        subcategory: "Blaze Slayer"
    })
    scorched_crystal_ping = false;
    
    // Fire Aspect 3 Book Ping
    @SwitchProperty({
        name: "Fire Aspect 3 Book Ping", 
        description: "Shows Fire Aspect 3 Book Ping when dropped.",
        category: "Slayer",
        subcategory: "Blaze Slayer"
    })
    fire_aspect3_book_ping = false;
    
    // Fiery Burst Rune Ping
    @SwitchProperty({
        name: "Fiery Burst Rune Ping", 
        description: "Shows Fiery Burst Rune Ping when dropped.",
        category: "Slayer",
        subcategory: "Blaze Slayer"
    })
    fiery_burst_rune_ping = false;
    
    // Lava Tears Rune Ping
    @SwitchProperty({
        name: "Lava Tears Rune Ping", 
        description: "Shows Lava Tears Rune Ping when dropped.",
        category: "Slayer",
        subcategory: "Blaze Slayer"
    })
    lava_tears_rune_ping = false;


    //////////////////////////////////////////////////////////////////////////////
    /* Settings @ Dungeons -------------------------------------------------------
    * Purpose: Settings for Dungeon Settings
    ----------------------------------------------------------------------------*/
    //////////////////////////////////////////////////////////////////////////////
    // Wish command (#wish)
    @SwitchProperty({
        name: "Wish Command", 
        description: "Use to ask healer in dungeon party for wish.\nUsage: #wish (in party chat)",
        category: "Dungeons"
    })
    wish_cmd = false;

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
        category: "Dungeons"
    })
    secretsPerSession = false;


    
    ////////////////////////////////////////////////////////////////////////////
    // SOUNDS ------------------------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////
    // Choosing RNG Sound
    @SelectorProperty({
        name: "RNG Sounds", 
        description: "Choose a sound to play when RNG Drops happen.", 
        category: "Sound", 
        options: ['Default', 'Disfigure - Blank', 'Persona4 - Specialist', 'TVB News Theme']
    })
    rng_sound_sel = 0;

    
    ////////////////////////////////////////////////////////////////////////////
    // DEBUG -------------=-----------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////
    // Toggle Debug Mode
    @SwitchProperty({
        name: "Debug Mode", 
        description: "Toggle Debug Mode", 
        category: "Debug"
    })
    toggle_debug = false;


    // constructor for category descriptions
    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General QOL", "General QOL Features and Commands")
        this.setCategoryDescription("Fishing Pings", "Fishing Pings for Mobs and Drops")
        this.setCategoryDescription("Misc", "Miscellaneous Pings for Event Mobs")
        this.setCategoryDescription("Dungeon", "Dungeon Features")

        // Gardens
        this.addDependency("Pest ESP", "Pest QOL")
        this.addDependency("Auto Set Home Pest", "Pest QOL")
        this.addDependency("Autowarp Pest", "Pest QOL")
        this.addDependency("Screen Pest Alert", "Pest QOL")


        // this.addDependency(child name, parent name)
        // fishing.crimson_isles
        this.addDependency("Radioactive Vial Ping", "Jawbus Ping")
        this.addDependency("Flash I Ping", "Thunder Ping")

        // fishing.winter_island
        this.addDependency("Baby Yeti Pet Drop Ping", "Yeti Ping")

        // fishing.hub_shark
        this.addDependency("Meg Pet Drop Ping", "Great White Shark Ping")

        // fishing.hub
        this.addDependency("Flying Fish Pet Drop Ping", "Sea Emperor Ping")
        this.addDependency("Lucky Clover Core Ping", "Carrot King Ping")


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
        
        // slayer
        this.addDependency("Scythe Blade Ping", "Rev Slayer RNG Drops")
        this.addDependency("Shard of the Shredded Ping", "Rev Slayer RNG Drops")
        this.addDependency("Warden Heart Ping", "Rev Slayer RNG Drops")

        this.addDependency("Digested Mosquito Ping", "Tara Slayer RNG Drops")
        this.addDependency("Tarantula Talisman Ping", "Tara Slayer RNG Drops")
        this.addDependency("Fly Swatter Ping", "Tara Slayer RNG Drops")
        
        this.addDependency("Overcapacitor Ping", "Sven Slayer RNG Drops")
        this.addDependency("Wolf Talisman Ping", "Sven Slayer RNG Drops")

        this.addDependency("Judgement Core Ping", "Eman Slayer RNG Drops")
        this.addDependency("Ender Slayer 7 Book Ping", "Eman Slayer RNG Drops")
        this.addDependency("Enchant Rune I Ping", "Eman Slayer RNG Drops")

        this.addDependency("Duplex 1 Book Ping", "Blaze Slayer RNG Drops")
        this.addDependency("High Class Archfiend Dice Ping", "Blaze Slayer RNG Drops")
        this.addDependency("Wilsons Plans Ping", "Blaze Slayer RNG Drops")
        this.addDependency("Subzero Inverter Ping", "Blaze Slayer RNG Drops")
        this.addDependency("Scorched Crystal Ping", "Blaze Slayer RNG Drops")
        this.addDependency("Fire Aspect 3 Book Ping", "Blaze Slayer RNG Drops")
        this.addDependency("Fiery Burst Rune Ping", "Blaze Slayer RNG Drops")
        this.addDependency("Lava Tears Rune Ping", "Blaze Slayer RNG Drops")


        // dungeons

    }   
}

export default new Settings();
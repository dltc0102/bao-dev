import { @ButtonProperty, @CheckboxProperty, Color, @ColorProperty, @PercentSliderProperty, @SelectorProperty, @SwitchProperty, @TextProperty, @SliderProperty, @Vigilant} from 'Vigilance';

@Vigilant("bao-dev/config1", "§3bao-dev", {
    getCategoryComparator: () => (a, b) => {
        const categories = ['Information', 'General QOL', 'GUI', 'HP Display', 'Timers', 'Detections', 'Fishing QOL', 'Fishing Pings', 'Counter', 'Garden', 'Dungeons', , 'Kuudra', 'Sounds/Dev']
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})

class Settings {
    // information
    @ButtonProperty({
        name: "Discord", 
        description: "Join the discord to suggest new features and ask questions!", 
        category: "Information", 
        placeholder: "Join Us!"
    })
    baoDiscordInvite() {
        Java.awt.Desktop.getDesktop().browse(new Java.net.URI("https://discord.gg/JdNQqzPb"));
    }
    
    // GENERAL QOL
    @SwitchProperty({
        name: "Auto Warp Command",
        description: "Use the command to get auto-warped by party leader.\nUsage: &b#warp&r or &b#w&r (in party chat)",
        category: "General QOL",
        subcategory: "Commands", 
    })
    autoWarp = false;

    @SwitchProperty({
        name: "Auto notify new party joiners",
        description: "Notifies new party joiners to use &b#warp&r or &b#w&r command when ready",
        category: "General QOL",
        subcategory: "Commands", 
    })
    autoNotifyWarp = false;

    @SwitchProperty({
        name: "Warpexc Command",
        description: "Warp all except given names.\nUsage: &b/warpexc&r &e[names ...]",
        category: "General QOL",
        subcategory: "Commands", 
    })
    warpExcept = false;

    @SwitchProperty({
        name: "Party Allinvite Shortcut",
        description: "Gets the party to become all-invite if Party Leader is busy.\nUsage: &b#pai",
        category: "General QOL",
        subcategory: "Commands", 
    })
    paiCommand = false;

    @SwitchProperty({
        name: "Party Kickoffline Shortcut",
        description: "Kicks offline players in party.\nUsage: &b#ko",
        category: "General QOL",
        subcategory: "Commands", 
    })
    koCommand = false;

    @SwitchProperty({
        name: "Party Transfer Randomly",
        description: "Transfers the party to a random person in the party.\nUsage: &b#pta",
        category: "General QOL",
        subcategory: "Commands", 
    })
    ptaCommand = false;

    @SwitchProperty({
        name: "Ping Command",
        description: "Gets the user's ping.\nIf in party, usage: &b#ping&r. -- Returns: &eParty > player: &f[Bao] Ping: XX.X\nIf not in party, usage: &b/ping&r. -- Returns: &6[&3Bao&6]&f Ping: &bXX.X",
        category: "General QOL",
        subcategory: "Commands", 
    })
    pingCommands = false;

    @SwitchProperty({
        name: "Tps Command",
        description: "Gets the TPS.\nIf in party, usage: &b#tps&r. -- Returns: &eParty > player: &f[Bao] TPS: XX.X\nIf not in party, usage: &b/tps&r. -- Returns: &6[&3Bao&6]&f TPS: &bXX.X",
        category: "General QOL",
        subcategory: "Commands", 
    })
    tpsCommands = false;

    @SwitchProperty({
        name: "Kicked Notifier",
        description: "Tell your party that you're kicked and cooldown is 1 minute.",
        category: "General QOL",
        subcategory: "QOL", 
    })
    notifyKicked = false;

    @SwitchProperty({
        name: "Easy get Baker Cake",
        description: "Get Baker cake easily when he arrives.\n Runs &e/openbaker &r to open the baker's gui and let you get cake.",
        category: "General QOL", 
        subcategory: "QOL"
    })
    getBakerCake = false;

    @SwitchProperty({
        name: "Hide Autopet Messages",
        description: "Hides autopet messages.",
        category: "General QOL",
        subcategory: "Messages QOL",
    })
    hideAutopetMessages = false;

    @SwitchProperty({
        name: "Hide Snow Cannon Messages",
        description: "Hides snow cannon messages.",
        category: "General QOL",
        subcategory: "Messages QOL"
    })
    hide_snow_cannon_messages = false;

    @SwitchProperty({
        name: "Hide Sack Messages",
        description: "Hides [Sack] Messages",
        category: "General QOL",
        subcategory: "Messages QOL", 
    })
    hideDefaultSackMessages = false;

    @SwitchProperty({
        name: "Better Stash Messages",
        description: "&cHides/Simplifies Stash Messages.\n&7'From stash: &e${itemName}&f'&b -- hidden.\n&7'You picked up &e${numItems}&7 items from your material stash!'&b -- hidden.\n\n&7'You still have &e${matsRem}&7 materials totalling &e${numTypes}&7 types of materials in there!'&b -- will be hidden and simplified... \n&bTO: &7'From Sacks: &e${pickupMat}&7 x&e${numMats}&7 || R: &e${remMats}&7 || Types: &e${sackTypes}&f'",
        category: "General QOL",
        subcategory: "Messages QOL"
    })
    betterStashMessages = false;

    @SwitchProperty({
        name: "Hide Click Stash Messages",
        description: "&cHides Click Stash Messages:\n&fOld Messages:\n&7'You have &e${numMatsRem}&7 materials stashed away!'&b -- hidden.\n&7'(This totals &e${numTypes}&7 type of material stashed!)'&b -- hidden.\n&7'(This totals &e${numTypes}&7 types of materials stashed!)'&b -- hidden.\n&7'>>> CLICK HERE to pick them up! <<<'&b -- hidden.\n\n&cThese messages will be condensed into one message:\n&f'REMINDER: You have &e${reminderMatsRem}&f materials of &e${numTypesRem}&f type(s) in your sacks!'\n\n&cRequires 'Better Stash Messages' to be turned on.",
        category: "General QOL",
        subcategory: "Messages QOL"
    })
    hideClickStashMessages = false;

    @SwitchProperty({
        name: "Hide AOTE/AOTV Message",
        description: "Hides '&cBlocks in the way&r' Message.",
        category: "General QOL",
        subcategory: "Messages QOL"
    })
    aotvHider = false;

    @SwitchProperty({
        name: "Grandma Hider",
        description: "Hides messages from Grandma Wolf Pet. &eExamples:\n&c+5 Kill Combo +3✯ Magic Find\n&c+10 Kill Combo +10 coins per kill\n&c+125 Kill Combo",
        category: "General QOL",
        subcategory: "Messages QOL",
    })
    grandma_hider = false; 

    @SwitchProperty({
        name: "Removed Watchdog Announcements",
        description: "Hides all messages from watchdog announcements.",
        category: "General QOL",
        subcategory: "Messages QOL",
    })
    betterWDA = false; 


    // GUI
    // bobbers
    @SwitchProperty({
        name: "Bobber Count",
        description: "Shows bobbers near you in a 30 block radius.\n&eThis is mainly for Bobbin' Time.",
        category: "GUI", 
    })
    bobberCount = false;

    @SwitchProperty({
        name: "Bobber Count Chroma",
        description: "Counter changes to chroma when a specified number of Bobbers are counted.\n\n&fExample:\nIf you &ahave&r Skyblock Addons (SBA): &f'&zBobbers: 10&r'\nIf you &cdon't have&r Skyblock Addons (SBA): &f'&f&lBobbers: &b&l10&r'",
        category: "GUI",
    })
    bobberChroma = false;

    @SliderProperty({
        name: "Number of Bobbers for Chroma",
        description: "Select the number of bobbers that can appear until it should turn chroma.\n&bBy default, this is set to 10 (max).",
        category: "GUI",
        min: "1",
        max: "10"
    })
    bobberChromaNum = 10;

    // players
    @SwitchProperty({
        name: "Players Nearby Count",
        description: "Shows players near you in a 30 block radius.\n&eThis is mainly for Legion.",
        category: "GUI", 
    })
    playersNearbyCount = false;

    @SwitchProperty({
        name: "Players Count Chroma",
        description: "Counter changes to chroma when a specified number of Players are counted.\n\n&fExample:\nIf you &ahave&r Skyblock Addons (SBA): &f'&zPlayers: 20&r'\nIf you &cdon't have&r Skyblock Addons (SBA): &f'&f&lPlayers: &b&l20&r'",
        category: "GUI",
    })
    playerChroma = false;

    @SliderProperty({
        name: "Number of Players for Chroma",
        description: "Select the number of players that can appear until it should turn chroma.\n&bBy default, this is set to 20 (max).",
        category: "GUI",
        min: "0",
        max: "20"
    })
    playerChromaNum = 20;

    @SwitchProperty({
        name: "Nearby Jawbus Count",
        description: "Detects nearby unpinged Jawbus and Doublehook Jawbus Entities.",
        category: "GUI", 
    })
    detectDoubleJawbus = false;

    @SwitchProperty({
        name: "Nearby Thunder Count",
        description: "Detects nearby unpinged Thunder and Doublehook Thunder Entities.",
        category: "GUI", 
    })
    detectDoubleThunder = false;

    @SwitchProperty({
        name: "Detect Charge Counter",
        description: "Detects Charge Amount in your Thunder Bottles of your Inventory.",
        category: "GUI", 
    })
    chargeCounter = false;

    @SwitchProperty({
        name: "Full Charge Chroma",
        description: "If bottle is full, displayed text for full charge bottle will be chroma.\n\n&fExample:\nIf you &ahave&r Skyblock Addons (SBA): &f'Thunder Bottle: &zFULL&r'\nIf you &cdon't have&r Skyblock Addons (SBA): &f'Thunder Bottle: &b&lFULL&r'",
        category: "GUI",
    })
    fullBottleChroma = false;

    @SwitchProperty({
        name: "Lobby Day Counter",
        description: "Shows Lobby Day Counter.",
        category: "GUI",
    })
    lobbyDayCount = false;

    @SwitchProperty({
        name: "Ping Display",
        description: "Shows Ping Display.",
        category: "GUI",
    })
    showPingDisplay = false;

    @SwitchProperty({
        name: "TPS Display",
        description: "Shows TPS Display.",
        category: "GUI",
    })
    showTpsDisplay = false;


    @ButtonProperty({
        name: "Edit Bobber Count Location", 
        description: "Click the button to move the Bobber Counter on your screen.", 
        category: "GUI", 
        subcategory: "Edit Overlays", 
    })
    openBobberGUI() {
        ChatLib.command('movebobber', true)
    }

    @ButtonProperty({
        name: "Edit Player Count Location", 
        description: "Click the button to move the Player Counter on your screen.", 
        category: "GUI", 
        subcategory: "Edit Overlays", 
    })
    openPlayerGUI() {
        ChatLib.command('moveplayer', true)
    }

    @ButtonProperty({
        name: "Edit Nearby Jawbus Location", 
        description: "Click the button to move the Nearby Jawbus Text on your screen.", 
        category: "GUI", 
        subcategory: "Edit Overlays", 
    })
    openJawbusGUI() {
        ChatLib.command('movejawbus', true)
    }

    @ButtonProperty({
        name: "Edit Nearby Thunder Location", 
        description: "Click the button to move the Nearby Thunder Text on your screen.", 
        category: "GUI", 
        subcategory: "Edit Overlays", 
    })
    openThunderGUI() {
        ChatLib.command('movethunder', true)
    }

    @ButtonProperty({
        name: "Edit Charge Counter Location", 
        description: "Click the button to move the Charge Counter Text on your screen.", 
        category: "GUI", 
        subcategory: "Edit Overlays", 
    })
    openChargeGUI() {
        ChatLib.command('movecharge', true)
    }

    @ButtonProperty({
        name: "Edit Location of Lobby Day Counter", 
        description: "Click to edit gui location of the lobby day counter.", 
        category: "GUI", 
        subcategory: "Edit Overlays"
    })
    openLobbyDayCounterEditGUI() {
        ChatLib.command('movedaycount', true)
    }

    @ButtonProperty({
        name: "Edit Ping Display Location", 
        description: "Click the button to move the Ping Display on your screen.", 
        category: "GUI", 
        subcategory: "Edit Overlays", 
    })
    openPingDisplay() {
        ChatLib.command('moveping', true)
    }

    @ButtonProperty({
        name: "Edit TPS Display Location", 
        description: "Click the button to move the TPS Display on your screen.", 
        category: "GUI", 
        subcategory: "Edit Overlays", 
    })
    openTpsGUI() {
        ChatLib.command('movetps', true)
    }
    
    // HP DISPLAY
    @ButtonProperty({
        name: "Edit HP Display Location", 
        description: "Click the button to move the HP Display on your screen.", 
        category: "HP Display", 
        subcategory: "Edit Overlays",
    })
    openHPDisplayGUI() {
        ChatLib.command('movehp', true);
    }

    @SwitchProperty({
        name: "Mob HP Display Master Toggle",
        description: "Toggles all mob hp displays.",
        category: "HP Display",
    })
    master_displayHP = false;

    @SwitchProperty({
        name: "Display HP: Vanquishers",
        description: "Toggles health display for Vanquishers",
        category: "HP Display",
    })
    vanq_hp = false;
    
    @SwitchProperty({
        name: "Display HP: Mythos Mobs",
        description: "Toggles health display for All Mythos Mobs",
        category: "HP Display",
    })
    mythosMobHP = false;

    @SwitchProperty({
        name: "Display HP: Reindrakes",
        description: "Toggles health display for Reindrakes",
        category: "HP Display",
    })
    rein_hp = false;

    @SwitchProperty({
        name: "Display HP: Yeti",
        description: "Toggles health display for Yeti",
        category: "HP Display",
    })
    yeti_hp = false;

    @SwitchProperty({
        name: "Display HP: Jawbus",
        description: "Toggles health display for Jawbus",
        category: "HP Display",
    })
    jawbus_hp = false;

    @SwitchProperty({
        name: "Display HP: Thunder",
        description: "Toggles health display for Thunder",
        category: "HP Display",
    })
    thunder_hp = false;

    @SwitchProperty({
        name: "Display HP: Great Whites",
        description: "Toggles health display for Great Whites",
        category: "HP Display",
    })
    gwshark_hp = false;

    @SwitchProperty({
        name: "Display HP: Carrot Kings",
        description: "Toggles health display for Carrot Kings",
        category: "HP Display",
    })
    carrotking_hp = false;

    @SwitchProperty({
        name: "Display HP: Water Hydras",
        description: "Toggles health display for Water Hydras",
        category: "HP Display",
    })
    waterhydra_hp = false;

    @SwitchProperty({
        name: "Display HP: Sea Emperors",
        description: "Toggles health display for Sea Emperors",
        category: "HP Display",
    })
    sea_emp_hp = false;

    @SwitchProperty({
        name: "Display HP: Grim Reapers",
        description: "Toggles health display for Grim Reapers",
        category: "HP Display",
    })
    reaper_hp = false;

    @SwitchProperty({
        name: "Display HP: Phantom Fishers",
        description: "Toggles health display for Phantom Fisher",
        category: "HP Display",
    })
    phantom_fisher_hp = false;


    // TIMERS
    @SwitchProperty({
        name: "Cake Timer", 
        description: "Shows Timer for nearby Cake.",
        category: "Timers",
        subcategory: "Cake",
    })
    cakeTimer = false;

    @ButtonProperty({
        name: "Edit Cake Timer Location", 
        description: "Click the button to move Cake Timer on your screen.", 
        category: "Timers",
        subcategory: "Cake",
    })
    openCakeGUI() {
        ChatLib.command('moveCakeDisplay', true);
    }

    // flares
    @SwitchProperty({
        name: "Flare Timer", 
        description: "Shows Timer for nearby Flare.",
        category: "Timers",
        subcategory: "Flare",
    })
    flareTimer = false;

    @ButtonProperty({
        name: "Edit Flare Timer Location", 
        description: "Click the button to move Flare Timer on your screen.", 
        category: "Timers",
        subcategory: "Flare",
    })
    openFlareGUI() {
        ChatLib.command('moveFlareDisplay', true);
    }

    @ButtonProperty({
        name: "Edit Timers Location", 
        description: "Click the button to move the Timers on your screen.", 
        category: "Timers", 
        subcategory: "Edit Overlays", 
    })
    openTimerGUI() {
        ChatLib.command('movetimerdisplay', true);
    }

    @SwitchProperty({
        name: "Bonzo Mask CD Timer", 
        description: "Shows message when CD for Bonzo Mask Clownin' Around is available.",
        category: "Timers"
    })
    bonzoMaskTimer = false;

    @SwitchProperty({
        name: "Phoenix Rekindle CD Timer",
        description: "Shows message when CD for Phoenix Rekindle Ability is available.",
        category: "Timers",
    })
    rekindleAlert = false;

    @SwitchProperty({
        name: "Spirit Mask CD Timer",
        description: "Shows message when CD for Spirit Mask Second Wind is available.",
        category: "Timers",
    })
    secondWindAlert = false;

    @SwitchProperty({
        name: "Mushy Tonic Timer",
        description: "Shows Timer for Mushy Tonic.",
        category: "Timers",
    })
    mushyTimer = false;

    @SwitchProperty({
        name: "Withercloak CD Timer", 
        description: "Shows Timer for Withercloak.",
        category: "Timers",
    })
    withercloakTimer = false;
    
    @SwitchProperty({
        name: "Cells Alignment CD Timer", 
        description: "Shows Timer for Cells Alignment.",
        category: "Timers",
    })
    cellsAlignTimer = false;
    
    @SwitchProperty({
        name: "Firestorm CD Timer", 
        description: "Shows Timer for Firestorm from the Fire Fury Staff.",
        category: "Timers",
    })
    firestormTimer = false;
    
    @SwitchProperty({
        name: "Tuba Howl CD Timer", 
        description: "Shows Timer for Howl from the Tuba/Weirder Tuba.",
        category: "Timers",
    })
    howlTimer = false;
    
    @SwitchProperty({
        name: "Ragnarock Axe CD Timer", 
        description: "Shows Timer for Ragnarock Axe Ability.",
        category: "Timers",
    })
    ragAxeTimer = false;
    
    @SwitchProperty({
        name: "Flux Countdown Timer",
        description: "Shows flux timer.",
        category: "Timers",
    })
    flux_timer = false;

    @SwitchProperty({
        name: "King's Scent Timer",
        description: "Countdown for King's Scent for Nucleus Runs",
        category: "Timers",
    })
    kingScentTimer = false;

    @SwitchProperty({
        name: "Reheated Gummy Bear Timer",
        description: "Timer for reheated gummy bear. &7Note: this will be grouped with the timers for bonzo masks and spirit masks timers.",
        category: "Timers", 
    })
    gummyTimer = false;

    @SwitchProperty({
        name: "Wisp-Flavored Potion Timer",
        description: "Timer for Wisp-Flavored Potion. &7Note: this will be grouped with the timers for bonzo masks and spirit masks timers.",
        category: "Timers", 
    })
    wispTimer = false;

    // DETECTIONS
    @SwitchProperty({
        name: "Detection: Jawbus",
        description: "Detects nearby and doublehook Jawbus-es.",
        category: "Detections",
        subcategory: "Jawbus"
    })
    detectJawbusEntities = false;

    @SwitchProperty({
        name: "Detection: Thunder",
        description: "Detects nearby and doublehook Thunders.",
        category: "Detections",
        subcategory: "Thunder"
    })
    detectThunderEntities = false;

    @SwitchProperty({
        name: "Detection: Vanquisher",
        description: "Detects nearby or multiple Vanquishers.",
        category: "Detections",
        subcategory: "Vanquisher"
    })
    detectVanqEntities = false;
    
    // FISHING QOL
    @SwitchProperty({
        name: "Hide SC Messages",
        description: "Hides default catch messages for SC(s)",
        category: "Fishing QOL",
        subcategory: "Message Hiders"
    })
    hide_sc_msgs = false;
    
    @SwitchProperty({
        name: "Better Fishing messages",
        description: `&7'Your Blessing enchant got you double drops!'&b -- hidden\n&7'GOOD CATCH! You found a &e(baitType)&7 Bait.'&b -- hidden\n&7'Your Blessing enchant got you double drops!'&b -- hidden\n&7"It's a Double Hook!"&b -- hidden\n&7`,
        category: "Fishing QOL",
        subcategory: "Message Hiders",
    })
    betterFishingMessages = false;
    
    @SwitchProperty({
        name: "Full Thunder Bottle Ping",
        description: "Shows Alert to Player when bottle of thunder is full.",
        category: "Fishing QOL",
    })
    full_bottle_ping = false;


    // FISHING PINGS
    @ButtonProperty({
        name: "Toggle All Fishing Pings",
        description: "Turns on/off all fishing pings",
        category: "Fishing Pings",
    })
    toggle_master_fishing_pings() {
        ChatLib.command('togglefishingpings', true);
    }

    @SwitchProperty({
        name: "Toggle Trophy Fish Messages",
        description: "Toggles all trophy fish messages except for Diamond. Plays RNG Sound for Diamonds.",
        category: "Fishing Pings",
    })
    toggleTrophyFishMsgs = false;

    @SwitchProperty({
        name: "Jawbus Ping",
        description: "Shows Jawbus Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Crimson Isles"
    })
    jawbusPing = false;

    @SwitchProperty({
        name: "Radioactive Vial Ping",
        description: "Shows and Announces Radioactive Vial when dropped.",
        category: "Fishing Pings",
        subcategory: "Crimson Isles"
    })
    rvialPing = false;

    @SwitchProperty({
        name: "Thunder Ping",
        description: "Shows Thunder Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Crimson Isles"
    })
    thunderPing = false;
    
    @SwitchProperty({
        name: "Vanquisher Ping",
        description: "Shows Vanquisher Ping when spawned.",
        category: "Fishing Pings",
        subcategory: "Crimson Isles"
    })
    vanqPing = false;
    
    @SwitchProperty({
        name: "Phlegblast Ping",
        description: "Shows Phlegblast Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Crimson Isles"
    })
    phlegPing = false;

    @SwitchProperty({
        name: "Yeti Ping",
        description: "Shows Yeti Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Winter Island"
    })
    yetiPing = false;
    
    @SwitchProperty({
        name: "Baby Yeti Pet Drop Ping",
        description: "Shows and Announces Leg/Epic Yeti Pet Drop Ping when dropped.",
        category: "Fishing Pings",
        subcategory: "Winter Island"
    })
    babyYetiPing = false;
    
    @SwitchProperty({
        name: "Nutcracker Ping",
        description: "Shows Nutcracker Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Winter Island"
    })
    nutcrackerPing = false;
    
    @SwitchProperty({
        name: "Reindrake Ping",
        description: "Shows Reindrake Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Winter Island"
    })
    reinPing = false;

    @SwitchProperty({
        name: "Great White Shark Ping",
        description: "Shows Great White Shark Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Hub Shark"
    })
    gwPing = false;

    @SwitchProperty({
        name: "Meg Pet Drop Ping",
        description: "Shows and Announces Leg/Epic Meg Pet Drop message when dropped.",
        category: "Fishing Pings",
        subcategory: "Hub Shark"
    })
    megPetPing = false;

    @SwitchProperty({
        name: "Phantom Fisher Ping",
        description: "Shows Phantom Fisher Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Hub Spooky"
    })
    phantomFisherPing = false;

    @SwitchProperty({
        name: "Grim Reaper Ping",
        description: "Shows Grim Reaper Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Hub Spooky"
    })
    grimReaperPing = false;
    
    @SwitchProperty({
        name: "Deep Sea Orb Ping",
        description: "Shows and Announces Deep Sea Orb drops.",
        category: "Fishing Pings",
        subcategory: "Hub Spooky"
    })
    deepSeaOrbPing = false;

    @SwitchProperty({
        name: "Phantom Rod Ping",
        description: "Shows and Announces Phantom Rod drops.",
        category: "Fishing Pings",
        subcategory: "Hub Spooky"
    })
    phantomRodPing = false;

    @SwitchProperty({
        name: "Lucky Hoof Ping",
        description: "Shows and Announces Lucky Hoof drops.",
        category: "Fishing Pings",
        subcategory: "Hub Spooky"
    })
    luckyHoofPing = false;

    @SwitchProperty({
        name: "Sea Emperor Ping",
        description: "Shows Sea Emperor Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Hub"
    })
    seaEmpPing = false;

    @SwitchProperty({
        name: "Flying Fish Pet Drop Ping",
        description: "Shows and Announces Flying Fish Pet Drops.",
        category: "Fishing Pings",
        subcategory: "Hub"
    })
    flyingFishPing = false;

    @SwitchProperty({
        name: "Carrot King Ping",
        description: "Shows Carrot King Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Hub"
    })
    carrotKingPing = false;
    
    @SwitchProperty({
        name: "Lucky Clover Core Ping",
        description: "Shows Lucky Clover Core Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Hub"
    })
    luckyCloverCorePing = false;
    
    @SwitchProperty({
        name: "Water Hydra Ping",
        description: "Shows Water Hydra Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Hub"
    })
    waterHydraPing = false;

    @SwitchProperty({
        name: "Guardian Pet Drop Ping",
        description: "Shows Guardian Pet Drop Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Hub"
    })
    guardianPetPing = false;

    @SwitchProperty({
        name: "Dolphin Milestone Pet Drop Ping",
        description: "Shows Dolphin Milestone Pet Drop Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Hub"
    })
    dolphinMSPetPing = false;

    @SwitchProperty({
        name: "Squid Pet Drop Ping",
        description: "Shows Squid Pet Drop Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "Hub"
    })
    squidPetPing = false;
    
    @SwitchProperty({
        name: "Zombie Miner Ping",
        description: "Shows Jawbus Ping when fished up.",
        category: "Fishing Pings",
        subcategory: "zOthers"
    })
    zombieMinerPing = false;

    // Fawe - v2.0.5
    @SwitchProperty({
        name: "Fawe Default Pings",
        description: "Shows Ping titles for fawe's default messages\nUp to date for v2.0.5",
        category: "Fishing Pings",
        subcategory: "zOthers"
    })
    fawePings = false;


    // COUNTER
    @ButtonProperty({
        name: "Edit Fishing Counter Location", 
        description: "Click the button to move the Fishing Counter on your screen.", 
        category: "Counter", 
    })
    openFishingCounterGUI() {
        ChatLib.command('movefishcounter', true)
    }

    @SwitchProperty({
        name: "Fishing Counter",
        description: "Fishing Counter\n&bOnly works for hub, crimson isles, and jerry island.",
        category: "Counter", 
        subcategory: "Overlay",
    })
    fishing_counter = false;

    @SwitchProperty({
        name: "Counter: Kills",
        description: "Shows kills for each category of sea creatures.\n&eDependent on loc/event.",
        category: "Counter", 
        subcategory: "Overlay",
    })
    kills_fishingcounter = false;

    @SwitchProperty({
        name: "Counter: Mob Since [RNG]",
        description: "Shows mobs fished up since rng drop.",
        category: "Counter", 
        subcategory: "Overlay",
    })
    mob_since_fishingcounter = false;

    @SwitchProperty({
        name: "Counter: Drops",
        description: "Shows drops for current session.",
        category: "Counter", 
        subcategory: "Overlay",
    })
    drops_fishingcounter = false;

    @SwitchProperty({
        name: "Counter: Trackers",
        description: "Shows sea creatues fished since rare sea creature.",
        category: "Counter", 
        subcategory: "Overlay",
    })
    tracker_fishingcounter = false;

    @SwitchProperty({
        name: "Counter: Averages",
        description: "Shows averages for sea creatues. For example: \n&e Average SC / Yeti: total winter kills / total yeti kills",
        category: "Counter", 
        subcategory: "Overlay",
    })
    avgs_fishingcounter = false;

    @SwitchProperty({
        name: "Counter: Time Elapsed since [RNG]",
        description: "Shows time elapsed since last rng drop.",
        category: "Counter", 
        subcategory: "Overlay",
    })
    elapsed_sincefishingcounter = false;

    @SwitchProperty({
        name: "Counter: Special Funny Counters",
        description: "For example: \n&bWinter: &rShows counter for ice rods and money earnt from selling to NPC.",
        category: "Counter", 
        subcategory: "Overlay",
    })
    specials_fishingcounter = false;


    // GARDEN
    @SwitchProperty({
        name: "Plot Map",
        description: "Shows the player's position on the map relative to the garden, shows the 5x5 plot Garden has.",
        category: "Garden",
        subcategory: "QOL", 
    })
    gardenPlotMap = false;

    @SwitchProperty({
        name: "Display Contest Overlay",
        description: "Shows whether there is a Jacob's Contest or not. [&aYes&r/&cNo&r]",
        category: "Garden",
        subcategory: "Overlays", 
    })
    gardenContestOverlay = false;

    @SwitchProperty({
        name: "Sprayonator Display",
        description: "Shows display for selected material and possible pests for the Sprayonator.",
        category: "Garden",
        subcategory: "Overlays", 
    })
    sprayonatorDisplay = false;

    @SwitchProperty({
        name: "Vinyl Display",
        description: "Shows display for selected Vinyl.",
        category: "Garden",
        subcategory: "Overlays", 
    })
    vinylDisplay = false;

    @SwitchProperty({
        name: "Harbringer Potion Timer",
        description: "Shows timer for Harbringer Potion.",
        category: "Garden",
        subcategory: "Timers", 
    })
    harvPotionOverlay = false;

    @SwitchProperty({
        name: "Pest Repellent Timer",
        description: "Shows timer for Pest Repellent.",
        category: "Garden",
        subcategory: "Timers", 
    })
    pestRepellentDisplay = false;

    @SwitchProperty({
        name: "Pest Exchange Timer",
        description: "Shows timer for Pest Exchange. Also shows # of pests exchanged and the bonus FF you were given.",
        category: "Garden",
        subcategory: "Timers", 
    })
    pestExchangeDisplay = false;

    @SwitchProperty({
        name: "Pest QOL",
        description: "QOL Features for Pest Hunting.",
        category: "Garden",
        subcategory: "Pest QOL", 
    })
    pestQOL = false;

    @SwitchProperty({
        name: "Pest QOL: ESP",
        description: "Highlights an outlined box around a pest. &c(not esp through walls)",
        category: "Garden",
        subcategory: "Pest QOL", 
    })
    pestEsp = false;

    @SwitchProperty({
        name: "Pest QOL: Auto Set Home Pest",
        description: "Automatically sets home when a pest has spawned.\n&c This is a chat macro.",
        category: "Garden",
        subcategory: "Pest QOL", 
    })
    autoSHPest = false;

    @SwitchProperty({
        name: "Pest QOL: Autowarp Pest",
        description: "Automatically warps you to plot where the pest has spawned.\n&cThis is a chat macro.\n&cThis feature is automatically disabled when a Jacob's contest is active.",
        category: "Garden",
        subcategory: "Pest QOL", 
    })
    autoWarpPest = false;

    @SwitchProperty({
        name: "Pest QOL: Screen Pest Alert",
        description: "Show Pest Alert on Screen",
        category: "Garden",
        subcategory: "Pest QOL", 
    })
    titlePestAlert = false;

    @SwitchProperty({
        name: "Hide Sprayonator Expiry Message",
        description: "&7'SPRAYONATOR! This will expire in 30m'&b -- hidden",
        category: "Garden",
        subcategory: "QOL", 
    })
    hideSprayonatorExpiryMsg = false;

    @SwitchProperty({
        name: "Sprayonator No Mat Alert",
        description: "Alerts the user that you don't have the required materials for Sprayonator.",
        category: "Garden",
        subcategory: "QOL", 
    })
    alertNoMatSprayonator = false;

    @SwitchProperty({
        name: "Sprayonator Selected Mat Message Hider",
        description: "&7'SPRAYONATOR! Your selected material is now &e${material}&7!'&b -- hidden",
        category: "Garden",
        subcategory: "QOL", 
    })
    hideSelSprayMatMsg = false;

    @SwitchProperty({
        name: "Better Garden Messages",
        description: "Hides/Changes the message into something simpler.\n&7[NPC] Jacob: &b messages about contest starting and anita accessory's stats will be hidden if player is not in &cGarden&b.\n&7'WARNING! Blocks that you break on this plot will not drop items while using a custom preset!'&b -- hidden\n&7'Remember, you have to be on the island for the resources to be planted!'&b -- hidden\n\n&7'Started pasting &e${presetName}&7 preset on Garden Plot - &e${plotName}&7!'\n&c.. converted to ..\n&7'PASTING: Using Preset [&e${presetName}&7] on Plot &e${plotName}&7!'",
        category: "Garden",
        subcategory: "QOL", 
    })
    betterGardenMessages = false;

    @SwitchProperty({
        name: "Garden Rare Drop Pings",
        description: "Shows, announces and pings user when drops have been detected.\n&aDrops included for pings: Pesterminator Books, Atmospheric Filters, Burrowing Spores\n&c This is a chat macro.",
        category: "Garden",
    })
    gardenRareDropPings = false;

    @SwitchProperty({
        name: "Garden Pet Drop Pings",
        description: "Shows, announces and pings user when drops have been detected.\n&aDrops included for pings: Slug Pets, Rat Pets\n&c This is a chat macro.",
        category: "Garden",
    })
    gardenPetDropPings = false;

    @SwitchProperty({
        name: "Player Yaw and Pitch",
        description: "Shows the player's Yaw and Pitch to 4 decimal places.",
        category: "Garden",
        subcategory: "Overlays",
    })
    showPlayerYawPitch = false;


    // DUNGEONS
    @SwitchProperty({
        name: "Melody Terminal Alert", 
        description: "Tells your party you have a melody terminal.",
        category: "Dungeons"
    })
    alert_melody = false;

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

    @SwitchProperty({
        name: "Display Dungeon Blessings", 
        description: "Shows blessings.",
        category: "Dungeons", 
    })
    showBlessingsDisplay = false;

    @SwitchProperty({
        name: "Better Dungeon Messages", 
        description: "Master Toggle for all dungeon message changes/deletions etc when you are in a dungeon.",
        category: "Dungeons"
    })
    betterDungeonMsgs = false;

    @SwitchProperty({
        name: "Toggle: Player Actions", 
        description: "o abilities\no revives and fairies\no obtained item messages &bincluding Ice Spray Wand Ping\no decoys\no essence messages\no creeper veil actions",
        category: "Dungeons"
    })
    dungeonPlayerActions = false;

    @SwitchProperty({
        name: "Toggle: QOL", 
        description: "o npc sold items\no friend join/leave messages\no gexp/hypixel xp messages\no ability/terminal/puzzle errors\no full inventory message",
        category: "Dungeons"
    })
    dungeonMessageQOL = false;

    @SwitchProperty({
        name: "Toggle: System Notifications", 
        description: "o mort messages\no class stat change messages\no wish/heal messages\no sack messages\no potion effects reminder message\no mute fire sales",
        category: "Dungeons"
    })
    dungeonSysNotifications = false;

    @SwitchProperty({
        name: "Toggle: Interactive Elements", 
        description: "o npc dialogue\no milestone messages\no wither door messages\no blood door messages\no boss messages\no statue messages\no floor specific messages\no blessings\no puzzle comps and fails\no mob damage messages\no witherborn damage messages\no bomb defusal messages\no mute autorecombs",
        category: "Dungeons"
    })
    dungeonInteractiveElements = false;

    @SwitchProperty({
        name: "Class Specific Pings", 
        description: "Show Pings for Ability Usages in dungeon &b(Mainly for Healer and Tank)",
        category: "Dungeons"
    })
    showClassSpecificPings = false;

    @SwitchProperty({
        name: "Join Dungeon Shortcuts", 
        description: "Join a dungeon when in party.\nUsage: &b#f5 &ror &b#m3",
        category: "Dungeons"
    })
    enableJoinDungeonShortcuts = false;

    @SwitchProperty({
        name: "Fire Freeze Timers", 
        description: "Alert and Pings for when to activate Fire Freeze in &eF/MM 2 and 3&r. &f-- &d[WIP] ",
        category: "Dungeons"
    })
    showFFTimers = false;

    @SwitchProperty({
        name: "Party Finder Message Shortener", 
        description: "Changed from '&dParty Finder &7> &a(message)&r' to '&dPF &7> &a(message)&r'",
        category: "Dungeons"
    })
    betterPFMessages = false;

    @SwitchProperty({
        name: "Full Inventory Alert", 
        description: "Checks if your inventory is full and alerts you (NOTE: QUITE ANNOYING)",
        category: "Dungeons"
    })
    fullInventoryAlert = false;

    @SwitchProperty({
        name: "Class/Cata Lvl Up Ping", 
        description: "Pings in chat when you level up a class/cata.",
        category: "Dungeons"
    })
    cataLevelUpPing = false;


    // KUUDRA
    @SwitchProperty({
        name: "Better Kuudra Messages", 
        description: "Better Kuudra Messages",
        category: "Kuudra"
    })
    betterKuudraMessages = false;

    // SOUND/DEV
    @SelectorProperty({
        name: "RNG Sounds", 
        description: "Choose a sound to play when RNG Drops happen.", 
        category: "Sounds/Dev", 
        subcategory: "Sounds", 
        options: ['Default', 'Disfigure - Blank', 'Persona4 - Specialist', 'TVB News Theme', 'Chipi Chipi Dubi Daba']
    })
    rng_sound_sel = 0;

    @ButtonProperty({
        name: "Test RNG Sound", 
        description: "click to test rng sound", 
        category: "Sounds/Dev", 
        subcategory: "Sounds", 
    })
    testRNGSound() {
        ChatLib.command('rngtest', true);
    }

    @SwitchProperty({
        name: "Debug Mode", 
        description: "Toggle Debug Mode", 
        category: "Sounds/Dev", 
        subcategory: "Debug"
    })
    toggle_debug = false;


    // CONSTRUCTOR
    constructor() {
        this.initialize(this);

        // descriptions
        this.setCategoryDescription("General QOL", "General QOL Features and Commands")
        this.setCategoryDescription("Fishing Pings", "Fishing Pings for Mobs and Drops\n&b/togglefishingpings&r to activate all fishing pings and pet drop pings")
        this.setCategoryDescription("Dungeon", "Dungeon Features")
        
        // General QOL
        this.addDependency("Hide Click Stash Messages", "Better Stash Messages")

        // gui
        this.addDependency("Bobber Count Chroma", "Bobber Count")
        this.addDependency("Number of Bobbers for Chroma", "Bobber Count Chroma")
        
        this.addDependency("Players Count Chroma", "Players Nearby Count")
        this.addDependency("Number of Players for Chroma", "Players Count Chroma")
        
        this.addDependency("Full Charge Chroma", "Detect Charge Counter")



        // Display HP
        this.addDependency("Display HP: Vanquishers", "Mob HP Display Master Toggle")
        this.addDependency("Display HP: Mythos Mobs", "Mob HP Display Master Toggle")
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
        this.addDependency("Pest QOL: ESP", "Pest QOL")
        this.addDependency("Pest QOL: Auto Set Home Pest", "Pest QOL")
        this.addDependency("Pest QOL: Autowarp Pest", "Pest QOL")
        this.addDependency("Pest QOL: Screen Pest Alert", "Pest QOL")

        // fishing.crimson_isles
        this.addDependency("Radioactive Vial Ping", "Jawbus Ping")

        // fishing.winter_island
        this.addDependency("Baby Yeti Pet Drop Ping", "Yeti Ping")

        // fishing.hub_shark
        this.addDependency("Meg Pet Drop Ping", "Great White Shark Ping")

        // fishing.hub
        this.addDependency("Flying Fish Pet Drop Ping", "Sea Emperor Ping")
        this.addDependency("Lucky Clover Core Ping", "Carrot King Ping")
        
        // dungeons
        this.addDependency("Toggle: QOL", "Better Dungeon Messages")
        this.addDependency("Toggle: Player Actions", "Better Dungeon Messages")
        this.addDependency("Toggle: System Notifications", "Better Dungeon Messages")
        this.addDependency("Toggle: Interactive Elements", "Better Dungeon Messages")
    }   
}

export default new Settings();
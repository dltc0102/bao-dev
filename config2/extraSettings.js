import { @ButtonProperty, @CheckboxProperty, Color, @ColorProperty, @PercentSliderProperty, @SelectorProperty, @SwitchProperty, @TextProperty, @Vigilant} from 'Vigilance';

@Vigilant("bao-dev/config1", "§3bao-extras", {
    getCategoryComparator: () => (a, b) => {
        const categories = ['Garden', 'Dragons/End', 'Mythos', 'Misc']
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})

class ExtraSettings {
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


    // MYTHOS
    @SwitchProperty({
        name: "Announce Inqs",
        description: "Announces inqs in party chat. Announces in coop if not in party.",
        category: "Mythos",
        subcategory: "QOL",
    })
    announce_inqs = false;

    @SwitchProperty({
        name: "Better Mythos Event Messages",
        description: "&7'You need to equip a LEGENDARY griffin pet to fight this!'&b -- hidden.",
        category: "Mythos",
        subcategory: "QOL",
    })
    betterMythosMessages = false;

    @ButtonProperty({
        name: "Edit Mythos Counter Location", 
        description: "Click the button to move the Mythos Counter on your screen.", 
        category: "Mythos", 
        subcategory: "Counter", 
    })
    openMythosCounterGUI() {
        ChatLib.command('movemythoscounter', true)
    }

    @SwitchProperty({
        name: "Mythos Counter",
        description: "Turns on/off the Mythological Counter",
        category: "Mythos",
        subcategory: "Counter",
    })
    mythosCounterMainToggle = false;

    @SwitchProperty({
        name: "General Mythos Info",
        description: "Shows Burrow Counter, Feather Counter and Money Dug Up Counter",
        category: "Mythos",
        subcategory: "Counter",
    })
    mythosCounterGeneral = false;

    @SwitchProperty({
        name: "Mythos Mob Kills Info",
        description: "Shows Kills Info for Mythological Ritual Mobs",
        category: "Mythos",
        subcategory: "Counter",
    })
    mythosCounterKills = false;

    @SwitchProperty({
        name: "Mythos Mob Drops Info",
        description: "Shows info for Mob Drops for Mythological Ritual Mobs",
        category: "Mythos",
        subcategory: "Counter",
    })
    mythosCounterDrops = false;

    @SwitchProperty({
        name: "Mythos Mob Averages Info",
        description: "Shows info for Mob Averages/Rates for Mythological Ritual Mobs",
        category: "Mythos",
        subcategory: "Counter",
    })
    mythosCounterAvgs = false;

    @SwitchProperty({
        name: "Mythos Mob Trackers Info",
        description: "Shows info for Mob Trackers for Mythological Ritual Mobs",
        category: "Mythos",
        subcategory: "Counter",
    })
    mythosCounterTrackers = false;



    // Dragons/End
    @ButtonProperty({ 
        name: 'Edit Dragon Counter Location', 
        description: 'Edits the location of the Dragon Counter Overlay.', 
        category: 'Dragons/End', 
        subcategory: 'Edit Overlays', 
    })
    openDragonCounterGUI() { 
        ChatLib.command('movedragoncounter', true); 
    } 
    
    @SwitchProperty({
        name: "Dragon Hitbox", 
        description: "Shows Dragon Hitbox",
        category: "Dragons/End",
    })
    showDragonHitbox = false;

    @SwitchProperty({
        name: "Dragon Counter", 
        description: "Master Toggle for Dragon Counter.",
        category: "Dragons/End",
        subcategory: "Counter", 
    })
    showDragonCounter = false;

    @SwitchProperty({
        name: "Drag Counter: Spawns", 
        description: "Toggles the area that shows # of spawns per dragon type.",
        category: "Dragons/End",
        subcategory: "Counter", 
    })
    dragCounterSpawns = false;

    @SwitchProperty({
        name: "Drag Counter: Trackers", 
        description: "Toggles the area that shows stats like Dragons Since Superior Dragon or # of Crystals Broken.",
        category: "Dragons/End",
        subcategory: "Counter", 
    })
    dragCounterTrackers = false;

    @SwitchProperty({
        name: "Better End Messages", 
        description: "Master Toggle for all end message changes/deletions etc when you are in the end.",
        category: "Dragons/End",
        subcategory: "QOL", 
    })
    betterEndMessages = false;

    @SwitchProperty({
        name: "Dragon Damage Display", 
        description: "Displays the top 3 damagers of the spawned dragon real-time.",
        category: "Dragons/End",
        subcategory: "Counter", 
    })
    showDragonDamageDisplay = false;

    @SwitchProperty({
        name: "End Protector Ping",
        description: "Shows Ping when End Protector is about to spawn.",
        category: "Dragons/End",
        subcategory: "QOL"
    })
    end_protector_ping = false;



    // MISC
    @SwitchProperty({
        name: "Broodmother Alert",
        description: "Notification for when Broodmother Spawns",
        category: "Misc",
        subcategory: "Broodmother"
    })
    broodmotherAlert = false;

    @SwitchProperty({
        name: "Golden Goblin Alert",
        description: "Notification for when Golden Goblin Spawns",
        category: "Misc",
        subcategory: "Mining"
    })
    goldenGoblinAlert = false;

    @SwitchProperty({
        name: "Scatha Pet Drop Alert",
        description: "Notification for Scatha Pet Drops.",
        category: "Misc",
        subcategory: "Mining"
    })
    scathaPetPing = false;

    @SwitchProperty({
        name: "Bal Pet Drop Alert",
        description: "Notification for Bal Pet Drops.",
        category: "Misc",
        subcategory: "Mining"
    })
    balPetPing = false;

    @SwitchProperty({
        name: "Hidden Jerry Ping",
        description: "Shows Jerry Pings for Jerries that spawn when Jerry is mayor.",
        category: "Misc",
        subcategory: "Jerry"
    })
    jerry_ping = false;

    @SwitchProperty({
        name: "Trick or Treat Mobs Ping",
        description: "Shows Mob Pings from Trick or Treat Chests.",
        category: "Misc",
        subcategory: "Spooky"
    })
    spooky_tot_ping = false;

    @SwitchProperty({
        name: "Headless Horseman Ping",
        description: "Shows Summoned Headless Horseman at Wilderness/Graveyard Ping.",
        category: "Misc",
        subcategory: "Spooky"
    })
    horseman_ping = false;

    @SwitchProperty({
        name: "Primal Fear QOL",
        description: "Main toggle for Primal Fear Event QOL Features.\nActivating this will hide Fear Messages as well.",
        category: "Misc",
        subcategory: "Spooky"
    })
    primalFearQOL = false;
    
    @SwitchProperty({
        name: "Primal Fear Spawning Ping",
        description: "Shows ping when Primal Fear is spawning.",
        category: "Misc",
        subcategory: "Spooky"
    })
    spawningFearPing = false;

    @SwitchProperty({
        name: "Solver for Mathematician Fear",
        description: "Answers Mathematician quick solves.",
        category: "Misc",
        subcategory: "Spooky"
    })
    mathFearSolver = false;

    @SwitchProperty({
        name: "Mute the Sheep",
        description: "Mutes messages from Royal Resident.",
        category: "Misc",
    })
    hideRoyalResident = false;

    @SwitchProperty({
        name: "Dye Pings", 
        description: "Shows Pings for all the dyes.",
        category: "Misc",
        subcategory: "Dyes"
    })
    dye_pings = false;

    constructor() {
        this.initialize(this);

        // descriptions
        this.setCategoryDescription("Misc", "Miscellaneous Pings for Event Mobs")
        this.setCategoryDescription("Mythos", "Mythological Counters and QOL Features\n&b/resetmythosbao&r to reset all mythos counter stats")

        // Gardens
        this.addDependency("Pest QOL: ESP", "Pest QOL")
        this.addDependency("Pest QOL: Auto Set Home Pest", "Pest QOL")
        this.addDependency("Pest QOL: Autowarp Pest", "Pest QOL")
        this.addDependency("Pest QOL: Screen Pest Alert", "Pest QOL")

        // Mythos 
        this.addDependency("General Mythos Info", "Mythos Counter")
        this.addDependency("Mythos Mob Kills Info", "Mythos Counter")
        this.addDependency("Mythos Mob Drops Info", "Mythos Counter")
        this.addDependency("Mythos Mob Averages Info", "Mythos Counter")
        this.addDependency("Mythos Mob Trackers Info", "Mythos Counter")

        // misc - mythos
        this.addDependency("General Mythos Info", "Mythos Counter")
        this.addDependency("Mythos Mob Kills Info", "Mythos Counter")
        this.addDependency("Mythos Mob Drops Info", "Mythos Counter")
        this.addDependency("Mythos Mob Averages Info", "Mythos Counter")
        this.addDependency("Mythos Mob Trackers Info", "Mythos Counter")

        // misc - primal fears
        this.addDependency("Primal Fear Spawning Ping", "Primal Fear QOL")
        this.addDependency("Solver for Mathematician Fear", "Primal Fear QOL")

        // Dragons/End
        this.addDependency("Drag Counter: Spawns", "Dragon Counter")
        this.addDependency("Drag Counter: Trackers", "Dragon Counter")
    }
}

export default new ExtraSettings();
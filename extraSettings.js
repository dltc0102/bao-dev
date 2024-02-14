import { @ButtonProperty, @CheckboxProperty, Color, @ColorProperty, @PercentSliderProperty, @SelectorProperty, @SwitchProperty, @TextProperty, @Vigilant} from 'Vigilance';

@Vigilant("bao-dev", "§3bao-dev", {
    getCategoryComparator: () => (a, b) => {
        const categories = ['Dragons/End', 'Mythos', 'Misc']
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})

class ExtraSettings {
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
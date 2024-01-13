import PogObject from 'PogData';
import Audio from '../utils/audio.js';

export let data = new PogObject("Bao", {
    "firstTime": true,
    "modPrefix": '&6[&3Bao&6]&r',

    ///////////////////////////////////////////////////////////////////////////////
    // IN SKYBLOCK, CURRAREA
    ///////////////////////////////////////////////////////////////////////////////
    "inSkyblock": false,
    "currArea": '',
    "baseTextH": 10,

    ///////////////////////////////////////////////////////////////////////////////
    // JAVA TYPES
    ///////////////////////////////////////////////////////////////////////////////
    "entities": {
        "entityFishHook": Java.type("net.minecraft.entity.projectile.EntityFishHook"), 
        "entityArmorStand": Java.type("net.minecraft.entity.item.EntityArmorStand"), 
        "entityArrow": Java.type("net.minecraft.entity.projectile.EntityArrow"), 
        "entityPlayer": Java.type("net.minecraft.entity.player.EntityPlayer"),
    },


    ///////////////////////////////////////////////////////////////////////////////
    // SCREEN HEIGHT AND WIDTH and others
    ///////////////////////////////////////////////////////////////////////////////
    "screenH": Renderer.screen.getHeight(), 
    "screenW": Renderer.screen.getWidth(), 
    "thickSep": '==================', 
    "thinSep": '------------------',

    ///////////////////////////////////////////////////////////////////////////////
    // HP DISPLAY
    ///////////////////////////////////////////////////////////////////////////////
    "hpDisplayInfo": {
        "specifiedMobs": [],
        "inLSRange": false,
        "displayText": '',
        "mobInfos": [],
        "movehp": null,
    }, 

    ///////////////////////////////////////////////////////////////////////////////
    // DUNGEONS
    ///////////////////////////////////////////////////////////////////////////////
    "dungeons": {
        "sentMelody": false, 
        "extraStatsFlag": false,
        "deathStats": 0, 
        "secretStats": 0, 
        "numRunStats": 0, 
        "secretOverviewText": '',
        "movesecretcounter": null,
        "secretCounter": {
            "x": 400, // arbituary random number, replaced by padding function 
            "y": 40,
        }
    }, 

    ///////////////////////////////////////////////////////////////////////////////
    // FISHING OVERLAYS
    ///////////////////////////////////////////////////////////////////////////////
    "fishingOverlays": {
        "movebobber": null,
        "bobberCount": 0, 
        "bobberCountText": '', 
        "bobberCounter": {
            "x": 200, 
            "y": 200
        }, 

        "moveplayers": null,
        "playerCount": 0, 
        "playerCountText": '',
        "playerCounter": { // Player Count
            "x": 200, 
            "y": 210
        }, 

        "movenearbyjawbus": null,
        "jawbusInfo": null, 
        "nbJawbusText": '', 
        "jawbusCounter": { // Jawbus Info
            "x": 200, 
            "y": 220
        }, 

        "movenearbythunder": null, 
        "thunderInfo": null, 
        "nbThunderText": '', 
        "thunderCounter": { // Thunder Info
            "x": 200, 
            "y": 230
        }, 
        
        "movecharges": null,
        "thunderBottleText": '',
        "chargeCounter": { // charge count
            "x": 200, 
            "y": 240
        }, 
        "fullBottleMsgSent": false,

        "filteredNames": [], 
    }, 

    ///////////////////////////////////////////////////////////////////////////////
    // FISHING STATS
    ///////////////////////////////////////////////////////////////////////////////
    "fishingStats": {
        "movefishcounter": null,
        "fishCounter": { // fish counter
            "x": 5, 
            "y": 100
        }, 
        "CIDisplay": '', 
        "WIDisplay": '', 
        "HUBDisplay": '', 
        "overallDisplayText": '',
    },

    ///////////////////////////////////////////////////////////////////////////////
    // GARDENS
    ///////////////////////////////////////////////////////////////////////////////
    "gardens": {
        // gameload reminder
        "sentDeskReminder": false,


        "playerArrowImage": null, 
        "plotArrow": {
            "x": 0, 
            "y": 0,
        }, 
        
        // yaw and pitch
        "playerInfo": {
            "yaw": 0, 
            "pitch": 0, 
            "lookingAtText": '',
            "x": 5, 
            "y": 12, 
        },

        // contest
        "contestInfo": {
            "isInContest": false,
            "text": '',
            "x": 600, // arbituary random number, replaced by padding function 
            "y": 10,

        }, 

        // sprayonator overlay
        "sprayonatorOverlay": {
            "x": 5, 
            "y": 32, 
            "displayText": '', 
            "possiblePests": '', 
            "materialText": '', 
            "selectedSprayMaterial": '',
            "matAttracts": {
                "Dung": ["Fly", "Beetle"], 
                "Honey Jar": ["Cricket", "Moth"], 
                "Plant Matter": ["Locust", "Slug"], 
                "Tasty Cheese": ["Rat", "Mite"], 
                "Compost": ["Mosquito", "Earthworm"]
            }, 
        }, 

        // vinyls
        "vinylInfo": {
            "names": ["Pretty Fly", "Cricket Choir", "Earthworm Ensemble", "Slow and Groovy", "Not Just a Pest", "Cicada Symphony", "DynaMITES", "Rodent Revolution", "Wings of Harmony", "Buzzin' Beats"], 
            "isPlaying": false, 
            "currentVinyl": '', 
            "displayText": '',
            "x": 5, 
            "y": 50, 
        }, 

        // plots
        "plots": [],
        "plotMapText": '',
        "gardenPlotMap": {
            "ox": 4, 
            "oy": 45,
            "x": 3, 
            "y": 30
        },  

        // plots - player
        "playerPlotInfo": {
            "names": [], 
            "configMsg": false, 
            "numLoads": 6,
            "rows": 5,
            "cols": 5,
        },

        // plots - default garden
        "gardenPlot": {
            "coords": [], 
            "rows": 5, 
            "cols": 5, 
            "plotW": 96,
        }, 

        // plots - sprayed
        "sprayPlotCoords": [],
        "plotSprayInfo": {
            "timers": [], 
            "offsetX": 5.5, 
            "offsetY": 35, 
            "dx": 18, 
            "dy": 18, 
            "cols": 5, 
            "rows": 5,
        },
        
        // plots - pest infected
        "pestPlotCoords": [], 


        // harbringer potion
        "harbringer": {
            "used": false, 
            "target": null, 
            "timeLeft": 0, 
            "text": '',
            "x": 600, // arbituary random number, replaced by padding function 
            "y": 60, 
        }, 

        // pest repellent
        "pestRepellent": {
            "cd": 60, 
            "used": false, 
            "is2x": false, 
            "is4x": false, 
            "type": '', 
            "target": null, 
            "timeLeft": 0, 
            "text": '',
            "x": 600, // arbituary random number, replaced by padding function 
            "y": 20, 
        }, 
    
        // pest exchange
        "pestExchange": {
            "used": false, 
            "target": null, 
            "timeLeft": 0,
            "text": '', 
            "bonusFF": 0, 
            "donatedPests": 0,
            "x": 600, // arbituary random number, replaced by padding function 
            "y": 40,
        }, 
    }, 

    ///////////////////////////////////////////////////////////////////////////////
    // GENERAL QOL
    ///////////////////////////////////////////////////////////////////////////////
    "generalQOL": {
        "stashes": {
            "numMats": 0, 
            "remMats": 0, 
            "sackTypes": 0, 
            "pickupMat": '',
        },
        "clickStash": {
            "numTillReminder": 0, 
            "reminderMatsRem": 0,
            "numTypesRem": 0, 
        }, 
    }, 

    ///////////////////////////////////////////////////////////////////////////////
    // MISC
    ///////////////////////////////////////////////////////////////////////////////
    "miscInfo": {
        "mining": {
            "movedaycounter": null,
            "displayText": '',
        }, 
        "dye": {
            "carmine": {
                "message": 'RARE DROP! Carmine Dye', 
                "title": '&3[&b&ka&3] &cCarmine Dye &3[&b&ka&3]', 
                "pattern": new RegExp(/&6&lRARE DROP! &5Carmine Dye/),
            }, 
            "necron": {
                "message": '', 
                "title": '', 
                "pattern": new RegExp(),
            },
            "holly": {
                "message": '', 
                "title": '', 
                "pattern": new RegExp(),
            },
            "aquamarine": {
                "message": '', 
                "title": '', 
                "pattern": new RegExp(),
            },
            "celeste": {
                "message": '', 
                "title": '', 
                "pattern": new RegExp(),
            },
        }, 
        "spooky": {
            "isFearAnnounced": false, 
        }, 
    }, 

    ///////////////////////////////////////////////////////////////////////////////
    // MYTHOS
    ///////////////////////////////////////////////////////////////////////////////
    "mythosInfo": {
        "counter": {
            "allLines": '',
            "movemythoscounter": null,
            "x": 5, 
            "y": 100,
        }, 
        "counterInfo": { // mythos player info
            "featherCount": 0, 
            "moneyCount": 0, 
            "burrowCount": 0, 
    
            "minosHunterKills": 0, 
            "siaLynxKills": 0, 
            "gaiaConsKills": 0, 
            "minotaurKills": 0, 
            "minosChampKills": 0, 
            "minosInqKills": 0, 
            "totalMythosKills": 0, 
    
            "DTS": 0, // check inventory pickup
            "AR": 0, // check inventory pickup
            "CTP": 0, // check inventory pickup
            "DS": 0, 
            "CoG": 0, 
            "WuS": 0, 
            "MR": 0, // check inventory pickup
            "CHIM": 0, // check inventory pickup and chat message
            
            "cachedMobsSinceInq": 0, 
            "cachedMinotaursSinceDae": 0, 
            "cachedBurrowsSinceCOG": 0, 
            "cachedBurrowsSinceWUS": 0, 
            "cachedChampionsSinceRelic": 0, 
    
            "mobsSinceInq": 0, 
            "minotaursSinceDae": 0, 
            "burrowsSinceCOG": 0, 
            "burrowsSinceWUS": 0, 
            "championsSinceRelic": 0, 
            // "inqsSinceChim": 0, 
        }, 
    }, 

    ///////////////////////////////////////////////////////////////////////////////
    // TIMERS
    ///////////////////////////////////////////////////////////////////////////////
    "timerInfos": {
        "gummy": {
            "cd": 60, 
            "timeLeft": 0, 
            "used": false, 
            "target": null,
        }, 
        "rekindle": {
            "cd": 60,
            "timeLeft": 0,
            "used": false, 
            "target": null,
        }, 
        "secondWind": {
            "cd": 30,
            "timeLeft": 0,
            "used": false, 
            "target": null,
        }, 
        "glowyTonic": {
            "timeLeft": 0,
            "used": false, 
            "target": null,
        }, 
        "bonzo": {
            "cd": 6,
            "timeLeft": 0,
            "used": false, 
            "target": null,
        }, 
        "kingsScent": {
            "cd": 6,
            "timeLeft": 0,
            "used": false, 
            "target": null,
        }, 
        "orb": {
            "registered": [], 
            "displayText": '', 
            "formattedText": '', 
            "type": 5, 
            "found": false,

        }
    }, 

    ///////////////////////////////////////////////////////////////////////////////
    // FISHING
    ///////////////////////////////////////////////////////////////////////////////
    "wasCounterOn": false,
    "diaAlready": [], 
    "testExp": 0, 
    "waterSC": { // water scc

        // WATER SEA CREATURES (REGULAR)
        "squidCatches": 0, 
        "seaWalkerCatches": 0, 
        "nightSquidCatches": 0, 
        "seaGuardianCatches": 0, 
        "seaWitchCatches": 0, 
        "seaArcherCatches": 0, 
        "rotdCatches": 0, 
        "catfishCatches": 0, 
        "carrotKingCatches": 0, 
        "seaLeechCatches": 0, 
        "guardianDefenderCatches": 0, 
        "deepSeaProtectorCatches": 0, 
        "waterHydraCatches": 0, 
        "seaEmperorCatches": 0, 
        "agarimooCatches": 0, 

        "clover": 0, 
        "commonFF": 0, 
        "uncommonFF": 0, 
        "rareFF": 0, 
        "epicFF": 0, 
        "legFF": 0,
        "commonGD": 0, 
        "uncommonGD": 0, 
        "rareGD": 0, 
        "epicGD": 0, 
        "legGD": 0,
        "hydraHead": 0,
        "shredder": 0, 

        // WATER SEA CREATURES (OASIS)
        "oasisRabbitCatches": 0, 
        "oasisSheepCatches": 0, 

        // WATER SEA CREATURES (CRYSTAL HOLLOWS)
        "waterWormCatches": 0, 
        "poisonedWaterWormCatches": 0, 
        "abyssalMinerCatches": 0, 

        // WATER SEA CREATURES (SPOOKY FESTIVAL)
        "scarecrowCatches": 0, 
        "nightmareCatches": 0, 
        "werewolfCatches": 0, 
        "phantomFisherCatches": 0, 
        "grimReaperCatches": 0, 
        "DSO": 0, 
        "phantomRod": 0, 
        "soulFragment": 0,

        // WATER SEA CREATURES (WINTER FESTIVAL)
        "frozenSteveCatches": 0, 
        "frostySnowmanCatches": 0, 
        "grinchCatches": 0, 
        "nutcrackerCatches": 0, 
        "yetiCatches": 0, 
        "reindrakeCatches": 0,

        // WATER SEA CREATURES (FISHING FESTIVAL)
        "nurseSharkCatches": 0, 
        "blueSharkCatches": 0, 
        "tigerSharkCatches": 0, 
        "gwSharkCatches": 0,
        "gwSharkToof": 0,

        // TOTAL WATER SEA CREATURE CATCHES
        "totalRegularWaterSCCatches": 0, 
        "totalOasisWaterSCCatches": 0, 
        "totalCHWaterSCCatches": 0, 
        "totalSpookyWaterSCCatches": 0, 
        "totalWinterWaterSCCatches": 0, 
        "totalSharkWaterSCCatches": 0, 


        // AVERAGE WATER SEA CATCHES SINCE ...
        // REGULAR AVGS
        "catchesSinceCarrotKing": 0, 
        "carrotKingSinceLastClover": 0,
        "catchesSinceWaterHydra": 0,
        "catchesSinceSeaEmperor": 0,

        // CRYSTAL HOLLOWS AVGS
        "catchesSinceAbyssalMiner": 0, 

        // SPOOKY FESTIVAL AVGS
        "catchesSincePhantomFisher": 0, 
        "catchesSinceGrimReaper": 0, 

        // WINTER FESTIVAL AVGS
        "catchesSinceYeti": 0, 
        "catchesSinceReindrake": 0, 

        "yetiSinceEpicPet": 0, 
        "yetiSinceLegPet": 0,

        "timeSinceEpicPet": 0,
        "timeSinceLegPet": 0,
        "timeSinceReindrake": 0,
        
        "epicBabyYeti": 0, 
        "legBabyYeti": 0,
        "prosperityBook": 0, 
        "iceRods": 0,

        // FISHING FESTIVAL AVGS
        "catchesSinceGWShark": 0,

    }, 

    "lavaSC": {
        
        // LAVA SEA CREATURES (CRIMSON ISLE)
        "phlegblastCatches": 0, 
        "magmaSlugCatches": 0, 
        "moogmaCatches": 0, 
        "lavaLeechCatches": 0, 
        "pyroclasticWormCatches": 0, 
        "lavaFlameCatches": 0, 
        "fireEelsCatches": 0, 
        "taurusCatches": 0,
        "thunderCatches": 0, 
        "lordJawbusCatches": 0,

        // crimson mob drops
        "flashBook": 0, 
        "magmaLordFragment": 0, 
        "radioactiveVial": 0,

        // LAVA SEA CREATURES (CRYSTAL HOLLOWS)
        "flamingWormCatches": 0, 
        "lavaBlazeCatches": 0, 
        "lavaPigmanCatches": 0,

        // TOTAL LAVA SEA CREATURE CATCHES
        "totalCrimsonSCCatches": 0, 
        "totalLavaCHSCCatches": 0, 

        // AVERAGE LAVA SEA CATCHES SINCE ...
        // CRIMSON ISLE AVGS
        "catchesSinceThunder": 0, 
        "catchesSinceJawbus": 0, 
        "jawbusSinceLastVial": 0,

        // CRYSTAL HOLLOWS AVGS
        "catchesSinceFlamingWorm": 0, 

    }, 

    ///////////////////////////////////////////////////////////////////////////////
    // Fishing COUNTERS
    ///////////////////////////////////////////////////////////////////////////////
    "DayCount": { // day counter
        "x": 300, 
        "y": 200
    }, 
    "HPCount": { // hp counter
        "x": 400, 
        "y": 40
    }, 
    "timerDis": { // timer display
        "x": 400, 
        "y": 240
    }, 
    "fluxTimer": { // fluxtimer display
        "x": 400, 
        "y": 250
    }, 
    "pupDis": { // powerup display
        "x": 400, 
        "y": 260
    }, 

    ///////////////////////////////////////////////////////////////////////////////
    // DISPLAY LOCATION FOR MOBS HP
    ///////////////////////////////////////////////////////////////////////////////
    "snapTop": {
        "x": 400, 
        "y": 40
    }, 


    ///////////////////////////////////////////////////////////////////////////////
    // DUNGEONS
    ///////////////////////////////////////////////////////////////////////////////
    "RCount": { // run counter for goals
        "x": 300, 
        "y": 300
    }, 
    "runCount": 0, 
    "runCountGoal": 0,
    "runFloor": '',

    ///////////////////////////////////////////////////////////////////////////////
    // TIMERS
    ///////////////////////////////////////////////////////////////////////////////
    // feeder timer -- WIP
    "targetFeeder": null, 
    "usedFeeder": false,
    "feederUses": 2, 
    "feederTimeRemaining": 0, 

    // bonzo mask timer
    "targetBonzo": null, 
    "usedBonzo": false, 

    // spirit mask timer
    "targetSecondWind": null, 
    "usedSecondWind": false, 

    // rekindle timer
    "targetRekindle": null, 
    "usedRekindle": false, 

    // mushy tonic timer
    "targetTonic": null, 
    "usedTonic": false, 

    // kings scent timer
    "targetScent": null, 
    "usedScent": false, 

    // cake timer
    "targetCake": null, 
    "usedCake": false, 

    // powerups
    // homing snowball timer
    "targetHoming": null, 
    "usedHoming": false,

    // strongarm timer
    "targetStrongarm": null, 
    "usedStrongarm": false, 

    // doubleup timer
    "targetDoubleUp": null, 
    "usedDoubleUp": false,
    ///////////////////////////////////////////////////////////////////////////////
    // GARDEN PLOT TIMERS
    ///////////////////////////////////////////////////////////////////////////////
    "targetSpray": null,
    "usedSpray": false,


    // Dragons
    // "dragons": {
    //     "protector": 0, 
    //     "old": 0, 
    //     "unstable": 0, 
    //     "young": 0, 
    //     "strong": 0, 
    //     "wise": 0, 
    //     "superior": 0,
    //     "dragsSinceSup": 0,
    //     "crystalFrags": 0,
    // }, 

    // experimental locals
    "audioInst": new Audio(),

}, "data.json");

register("gameLoad", () => {
    ChatLib.chat(`${data.modPrefix} &rUpdated!`)
    ChatLib.command('pl')
});

register("gameUnload", () => {
  data.save();
});

register("step", () => {
    if (ChatLib.removeFormatting(Scoreboard.getTitle()).includes("SKYBLOCK")) {
        data.inSkyblock = true
    } else {
        data.inSkyblock = false
    }
}).setFps(3)

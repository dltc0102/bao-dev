import Settings from "../settings.js"
import { data } from '../utils/data.js'
import { showAlert } from '../utils/utils.js'
import { playSound, drawSlayerInfo, getTabArea } from '../utils/functions.js'
import { sendMessage } from '../utils/party.js'

let currArea = '';
register('step', () => { if (!data.inSkyblock) return; currArea = getTabArea(); }).setFps(1);

////////////////////////////////////////////////////////////////////////////////
// TITLES ----------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
const scythe_title = '&c[&r&ka&c] &6Scythe Blade &c[&r&ka&c]'
const sots_title = '&c[&r&ka&c] &6Shard of the Shredded &c[&r&ka&c]'
const warden_heart_title = '&c[&r&ka&c] &6Warden Heart &c[&r&ka&c]'
const dig_mos_title = '&5[&b&ka&5] &6Digested Mosquito &5[&b&ka&5]'
const tara_tali_title = '&5[&b&ka&5] &5Tarantula Talisman &5[&b&ka&5]'
const swatter_title = '&5Fly Swatter'
const overcap_title = '&8[&b&ka&8] &5Overflux Capacitor &8[&b&ka&8]'
const jcore_title = '&6Judgement Core'
const es7_title = '&6Ender Slayer VII'
const enchant_rune_title = '&5End Rune I'
const duplex1_title = '&dDuplex I'
const high_class_dice_title = '&6High Class Archfiend Dice'
const wilsons_plans_title = "&6Wilson's Engineering Plans"
const subzero_title = '&6Subzero Invertor'
const scrystal_title = '&6Scorched Crystal'
const faspect3_title = '&rFire Aspect III'
const fburst_rune_title = '&4Fiery Burst Rune I'
const ltears_rune_title = '&cLava Tears Rune I'

////////////////////////////////////////////////////////////////////////////////
// SLAYERS ---------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
const slayerStands = Java.type("net.minecraft.entity.item.EntityArmorStand");
const specialData = {
    Rev: {
        isBoomPhase: false, 
        boomTimer: 40, 
        boomTitleShown: false, 
        outOfRangeTitleShown: false, 
        formattedBoomTimer: '0.0'
    },
    Eman: {
        laserTimer: 70,
        isLaserPhase: false, 
        isBeaconPlaced: false, 
        isHeadsNearby: false, 
        numHeads: 0, 
        formattedLaserTimer: '0.0'
    },
    Sven: {
        isProt: false, 
        isPup: false
    }, 
    Tara: {
        isRegen: false,
    }, 
    Blaze: {
        isAshen: false,
        isSpirit: false,
        isAuric: false,
        isCrystal: false, 
        foundQuaz: false,
        foundTyph: false,
        isFirePit: false, 
    }
};

let isEman = false;
let isRev = false;
let isSven = false;
let isTara = false;
let isBlaze = false;
let timerStandName = '';
let bossStandName = '';
let spawnerEntity = null;
let phaseText = '';

register('step', () => {
    if (data.inSkyblock === false) return;
    const slayerEntities = World.getAllEntitiesOfType(slayerStands)

    // spawner stand
    spawnerEntity = slayerEntities.find(spawnerEntity => {
        const entityName = spawnerEntity.getName().removeFormatting();
        const playerName = Player.getName();
        if (entityName.includes(playerName)) {
            return entityName
        }
    })

    if (spawnerEntity) {
        const spawnerX = spawnerEntity.getX();
        const spawnerZ = spawnerEntity.getZ();

        // timer stand
        const timerStand = slayerEntities.find(timerEntity => {
            const timerName = timerEntity.getName().removeFormatting();
            const timerRegex = /(.*)\d{2}:\d{2}/;
            if (timerRegex.test(timerName) && timerEntity.getX() === spawnerX && timerEntity.getZ() === spawnerZ) {
                timerStandName = timerEntity.getName();
                return true;
            }
            return false;
        });

        // boss stand
        if (timerStandName) {
            bossEntity = slayerEntities.find(bossEntity => {
                const bossX = bossEntity.getX();
                const bossZ = bossEntity.getZ();
                const bossRegexRev = /☠ (Atoned Horror|Revenant Horror) (\d+(?:\.\d+)?[kM])❤/;
                const bossRegexTara = /☠ Tarantula Broodfather (\d+(?:\.\d+)?[kM])❤/;
                const bossName = bossEntity.getName().removeFormatting();
                if (bossName.includes('Voidgloom Seraph') && bossX === spawnerX && bossZ === spawnerZ) {
                    isEman = true;
                    bossStandName = bossEntity.getName();
                    return true;
                } else if (bossRegexRev.test(bossName) && bossX === spawnerX && bossZ === spawnerZ) {
                    isRev = true;
                    bossStandName = bossEntity.getName();
                    return true;
                } else if (bossName.includes('Sven Packmaster') && bossX === spawnerX && bossZ === spawnerZ) {
                    isSven = true;
                    bossStandName = bossEntity.getName();
                    return true;
                } else if (bossRegexTara.test(bossName) && bossX === spawnerX && bossZ === spawnerZ) {
                    isTara = true;
                    bossStandName = bossEntity.getName();
                    return true;
                } else if (bossName.includes('Inferno Demonlord') && bossX === spawnerX && bossZ === spawnerZ) {
                    isBlaze = true;
                    bossStandName = bossEntity.getName();
                    return true;
                }
                isEman = false;
                isRev = false;
                isSven = false;
                isTara = false;
                isBlaze = false;
                return false;
            })
        }

        if (timerStand) {
            // rev boom phase check
            if (timerStandName.includes('Boom!')) {
                isRev = true;
                specialData.Rev.isBoomPhase = true;
                if (!specialData.Rev.boomTitleShown) {
                    showAlert('Charging up!');
                    specialData.Rev.boomTitleShown = true;
                }
            } else {
                specialData.Rev.isBoomPhase = false;
                specialData.Rev.boomTitleShown = false;
                specialData.Rev.boomTimer = 40;
            }
            
            // sven protected phase check
            if (timerStandName.includes('Protected')) {
                isSven = true;
                specialData.Sven.isProt = true;
            }
            // sven pup phase check
            if (timerStandName.includes('Calling the pups!')) {
                isSven = true;
                specialData.Sven.isPup = true;
            }

            // tara
            if (timerStandName.includes('Regenerating')) {
                isTara = true;
                specialData.Tara.isRegen = true;
            }

            // blaze

        }
    }

    // rev checks
    if (isRev) {
        if (specialData.Rev.isBoomPhase && specialData.Rev.boomTimer >= 0) {
            specialData.Rev.formattedBoomTimer = (specialData.Rev.boomTimer / 10).toFixed(1);
            specialData.Rev.boomTimer -= 1; 
        }
    
        if (specialData.Rev.isBoomPhase && specialData.Rev.boomTimer <= 0.7 && !specialData.Rev.outOfRangeTitleShown) {
            showAlert('&cGet Out of Range!');
            specialData.Rev.outOfRangeTitleShown = true;
        }
    }


    // rev
    if (isRev) {
        phaseText = specialData.Rev.isBoomPhase ? `&cBoom In: &r${specialData.Rev.formattedBoomTimer}` : '&7No Boom Yet';
    } else if (isSven) {
        phaseText = specialData.Sven.isPup ? '&bCalling the pups!' : specialData.Sven.isProt ? '&aProtected' : '';
    } else if (isTara) {
        phaseText = specialData.Tara.isRegen ? '&aRegenerating' : '';
    } 

}).setFps(10);

////////////////////////////////////////////////////////////////////////////////
// RENDER SLAYERS --------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
register('renderOverlay', () => {
    if (data.inSkyblock === false) return;
    if (!Settings.slayerInfoToggle || !spawnerEntity) return
    // else if (isBlaze) {
    //     pitPhaseText = specialData.Blaze.isFirePit ? '&cFIREPIT' : '';
    // show quazii and typheous health
    // }

    // else if (isEman) {
    //     laserPhaseText = specialData.Eman.isLaserPhase ? `&aLaser: &r${specialData.Eman.formattedLaserTimer}` : 'No Laser';
    //     beaconPhaseText = specialData.Eman.isBeaconPlaced ? '&aBeacon Placed' : '&cBeacon Not Placed'
    //     nearbyHeadsPhasetext = specialData.Eman.isHeadsNearby ? '&cYES' : '&aNO';
    //     headPhaseText = specialData.Eman.numHeads > 0 ? `&cNukebi Heads: &r${specialData.Eman.numHeads}` : '&cNukebi Heads: 0';
    // 
    // }

    // blaze/eman for now
    drawSlayerInfo(timerStandName, bossStandName, phaseText)
})


////////////////////////////////////////////////////////////////////////////////
// EMAN MELEE QOL --------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
if (Settings.emanMeleeQOL) {
    // .
}


////////////////////////////////////////////////////////////////////////////////
// REV RNG DROP PINGS ----------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
// scythe blade
register('chat', (mf, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.scythe_blade_ping) return
    showAlert(scythe_title);
    sendMessage(`CRAZY RARE DROP! (Scythe Blade) (+${mf}% ✯ Magic Find)`);
    playSound()
}).setCriteria('CRAZY RARE DROP! (Scythe Blade) (+${mf}% ✯ Magic Find)')

// shard of the shredded
register('chat', (mf, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.sots_ping) return
    showAlert(sots_title);
    sendMessage(`CRAZY RARE DROP! (Shard of the Shredded) (+${mf}% ✯ Magic Find)`);
    playSound()
}).setCriteria('CRAZY RARE DROP! (Shard of the Shredded) (+${mf}% ✯ Magic Find)')

// warden heart
register('chat', (mf, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.warden_heart_ping) return
    showAlert(warden_heart_title);
    sendMessage(`INSANE DROP! (Warden Heart) (+${mf}% ✯ Magic Find)`);
    playSound()
}).setCriteria('INSANE DROP! (Warden Heart) (+${mf}% ✯ Magic Find)')


////////////////////////////////////////////////////////////////////////////////
// TARA RNG DROP PINGS ---------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
// digested mosquito
register('chat', (mf, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.dig_mos_ping) return
    showAlert(dig_mos_title);
    sendMessage(`CRAZY RARE DROP! (Digested Mosquito) (+${mf}% ✯ Magic Find)`);
    playSound()
}).setCriteria('CRAZY RARE DROP! (Digested Mosquito) (+${mf}% ✯ Magic Find)')

// tarantula talisman
register('chat', (mf, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.tara_tali_ping) return
    showAlert(tara_tali_title);
    sendMessage(`CRAZY RARE DROP! (Tarantula Talisman) (+${mf}% ✯ Magic Find)`);
    playSound()
}).setCriteria('CRAZY RARE DROP! (Tarantula Talisman) (+${mf}% ✯ Magic Find)')

// fly swatter
register('chat', (mf, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.fly_swatter_ping) return
    showAlert(swatter_title);
    sendMessage(`CRAZY RARE DROP! (Fly Swatter) (+${mf}% ✯ Magic Find)`);
    playSound()
}).setCriteria('CRAZY RARE DROP! (Fly Swatter) (+${mf}% ✯ Magic Find)')


////////////////////////////////////////////////////////////////////////////////
// SVEN RNG DROP PINGS ----------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
// overflux capacitor
register('chat', (mf, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.overcap_ping) return
    showAlert(overcap_title);
    sendMessage(`CRAZY RARE DROP! (Overflux Capacitor) (+${mf}% ✯ Magic Find)`);
    playSound()
}).setCriteria('CRAZY RARE DROP! (Overflux Capacitor) (+${mf}% ✯ Magic Find)')

// wolf tali
register('chat', (mf, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.wolf_tali_ping) return
    showAlert('Wolf Talisman');
    sendMessage(`RARE DROP! Wolf Talisman (+${mf}% ✯ Magic Find)`);
    playSound()
}).setCriteria('RARE DROP! Wolf Talisman (+${mf}% ✯ Magic Find)')


////////////////////////////////////////////////////////////////////////////////
// EMAN RNG DROP PINGS ---------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
// judgement core
register('chat', (mf, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.jcore_ping) return
    showAlert(jcore_title);
    sendMessage(`CRAZY RARE DROP! (Judgement Core) (+${mf}% ✯ Magic Find)`);
    playSound()
}).setCriteria('CRAZY RARE DROP! (Judgement Core) (+${mf}% ✯ Magic Find)')

// ender slayer 7
register('chat', (mf, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.es7_book_ping) return
    showAlert(es7_title);
    sendMessage(`INSANE DROP! (Ender Slayer VII) (+${mf}% ✯ Magic Find)`);
    playSound()
}).setCriteria('INSANE DROP! (Ender Slayer VII) (+${mf}% ✯ Magic Find)')

// enchant rune 
register('chat', (mf, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.enchant_rune_ping) return
    showAlert(enchant_rune_title);
    sendMessage(`CRAZY RARE DROP! (◆ Enchant Rune I) (+${mf}% ✯ Magic Find)`);
    playSound()
}).setCriteria('CRAZY RARE DROP! (◆ Enchant Rune I) (+${mf}% ✯ Magic Find)')


////////////////////////////////////////////////////////////////////////////////
// BLAZE RNG DROP PINGS ----------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
// duplex 1
register('chat', (mf, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.duplex1_book_ping) return
    showAlert(duplex1_title);
    sendMessage(`VERY RARE DROP! (Duplex I) (+${mf}% ✯ Magic Find)`);
    playSound()
}).setCriteria('VERY RARE DROP! (Duplex I) (+${mf}% ✯ Magic Find)')

// high class archfiend dice
register('chat', (mf, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.high_class_dice_ping) return
    showAlert(high_class_dice_title);
    sendMessage(`CRAZY RARE DROP! (High Class Archfiend Dice) (+${mf}% ✯ Magic Find)`);
    playSound()
}).setCriteria('CRAZY RARE DROP! (High Class Archfiend Dice) (+${mf}% ✯ Magic Find)')

// wilson's engineering plans
register('chat', (mf, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.wilsons_plans_ping) return
    showAlert(wilsons_plans_title);
    sendMessage(`CRAZY RARE DROP! (Wilson's Engineering Plans) (+${mf}% ✯ Magic Find)`);
    playSound()
}).setCriteria("CRAZY RARE DROP! (Wilson's Engineering Plans) (+${mf}% ✯ Magic Find)")

// subzero inverter
register('chat', (mf, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.subzero_inverter_ping) return
    showAlert(subzero_title);
    sendMessage(`CRAZY RARE DROP! (Subzero Inverter) (+${mf}% ✯ Magic Find)`);
    playSound()
}).setCriteria('CRAZY RARE DROP! (Subzero Inverter) (+${mf}% ✯ Magic Find)')

// scorched crystal
register('chat', (mf, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.scorched_crystal_ping) return
    showAlert(scrystal_title);
    sendMessage(`VERY RARE DROP! (Scorched Power Crystal) (+${mf}% ✯ Magic Find)`);
    playSound()
}).setCriteria('VERY RARE DROP! (Scorched Power Crystal) (+${mf}% ✯ Magic Find)')

// fire aspect 3
register('chat', (mf, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.fire_aspect3_book_ping) return
    showAlert(faspect3_title);
    sendMessage(`VERY RARE DROP! (Fire Aspect III) (+${mf}% ✯ Magic Find)`);
    playSound()
}).setCriteria('VERY RARE DROP! (Fire Aspect III) (+${mf}% ✯ Magic Find)')

// fiery burst rune
register('chat', (mf, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.fiery_burst_rune_ping) return
    showAlert(fburst_rune_title);
    sendMessage(`CRAZY RARE DROP! (◆ Fiery Burst Rune I) (+${mf}% ✯ Magic Find)`);
    playSound()
}).setCriteria('CRAZY RARE DROP! (◆ Fiery Burst Rune I) (+${mf}% ✯ Magic Find)')

// lava tears rune
register('chat', (mf, event) => {
    if (!data.inSkyblock) return;
    if (!Settings.lava_tears_rune_ping) return
    showAlert();
    Client.showTitle(ltears_rune_title, '', 1, 30, 1);
    sendMessage(`VERY RARE DROP! (◆ Lavatears Rune I) (+${mf}% ✯ Magic Find)`);
    playSound()
}).setCriteria('VERY RARE DROP! (◆ Lavatears Rune I) (+${mf}% ✯ Magic Find)')

////////////////////////////////////////////////////////////////////////////////
// NEXT THING IG ---------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////

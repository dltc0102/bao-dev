// tracker for quiver bag
let quiver = 0;
let arrowType = '';
let isPlayerSneaking = false;
let infQuiver = 0;

// player is sneaking
register('step', () => {
    isPlayerSneaking = Player.isSneaking();
}).setFps(1);

// infinite quiver 1-10
// get held item
register('step', () => {
    heldItemLore = Player.getHeldItem().getLore().removeFormatting();
    heldItemName = heldItemLore[0]
}).setFps(1);
// 1 - saves arrows 3% of the time you are firing your bow, disabled while sneaking
// 10 - saves arrows 30% of the time you are firing your bow, disabled while sneaking

let arrowTypes = {
    "flintArrow": 0, 
    "reinforcedArrow": 0, 
    "goldTipArrow": 0, 
    "redstoneTipArrow": 0, 
    "emeraldTipArrow": 0, 
    "bouncyArrow": 0, 
    "icyArrow": 0, 
    "armorshredArrow": 0, 
    "explosiveArrow": 0, 
    "glueArrow": 0, 
    "nansorbArrow": 0, 
}
// arrow tracker
register('chat', (event) => {
    quiver = 0;
    for (const [type, amt] of Object.entries(arrowTypes)) {
        arrowTypes[type] = 0;
    }
}).setCriteria('Cleared your quiver!');

register('chat', (type, amt, event) => {
    arrowType = type;
    quiver = amt;
    if (arrowType === 'Flint') arrowTypes.flintArrow += amt;
    if (arrowType === 'Reinforced Iron') arrowTypes.reinforcedArrow += amt;
    if (arrowType === 'Gold-tipped') arrowTypes.goldTipArrow += amt;
    if (arrowType === 'Redstone-tipped') arrowTypes.redstoneTipArrow += amt;
    if (arrowType === 'Emerald-tipped') arrowTypes.emeraldTipArrow = amt; 
    if (arrowType === 'Bouncy') arrowTypes.bouncyArrow += amt;
    if (arrowType === 'Icy') arrowTypes.icyArrow += amt;
    if (arrowType === 'Armorshred') arrowTypes.armorshredArrow += amt;
    if (arrowType === 'Explosive') arrowTypes.explosiveArrow += amt;
    if (arrowType === 'Glue') arrowTypes.glueArrow += amt;
    if (arrowType === 'Nansorb') arrowTypes.nansorbArrow += amt;
}).setCriteria('Jax forged ${type} Arrow x${amt}').setContains();

// special arrows
// toxic arrow poison
// twilight arrow poison
// magma arrows

// get attack speed
let foundBow = false;
register('step', () => {
    const atkSpeed = TabList.getNames().filter(line => line.startsWith('Attack Speed'));
    console.log(atkSpeed);

    // held item
    const holding = Player.getHeldItem().getName().removeFormatting();
    const actionBar = Player.getInventory().slice(0, 9).forEach(item => {
        // find index of bow
        // get lore of stackinslot(indexOfBow) and get lore
        // find cooldown
        // 
    })

}).setFps(1);
// get lore data from bow for cooldown -- CDs areonly available in juju shortbow/ term bow/ artisanal shortbow
// 0 atk speed = 0.45s
// 100 atk speed = 0.2s



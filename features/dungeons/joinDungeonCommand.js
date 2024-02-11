// join dungeon commands
const wordToNumber = {
    '1': 'one', 
    '2': 'two', 
    '3': 'three', 
    '4': 'four', 
    '5': 'five', 
    '6': 'six', 
    '7': 'seven'
}
register('chat', (name, cataType, floorNum, event) => {
    let floorLevel = wordToNumber[floorNum];
    if (cataType.toLowerCase() === 'f') {
        ChatLib.command(`joininstance catacombs_floor_${floorLevel}`)
    }
    if (cataType.toLowerCase() === 'm') {
        ChatLib.command(`joininstance mastermode_floor_${floorLevel}`)
    }
}).setCriteria('Party > ${name}: #${cataType}${floorNum}');
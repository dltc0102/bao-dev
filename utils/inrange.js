let sample1 = { 
    "x": -40,
    "y": 89,
    "z": 78
}

let [x1, y1, z1] = [sample1.x, sample1.y, sample1.z];
let [x2, y2, z2] = [Player.getX().toFixed(2), Player.getY().toFixed(2), Player.getZ().toFixed(2)]
xDiff = Math.pow(x2 - x1, 2);
yDiff = Math.pow(y2 - y1, 2);
zDiff = Math.pow(z2 - z1, 2);
let dist = Math.sqrt(xDiff + yDiff + zDiff);

// console.log(sample1.x, sample1.y, sample1.z);
// console.log(Player.getX().toFixed(2), Player.getY().toFixed(2), Player.getZ().toFixed(2))
// console.log(dist)


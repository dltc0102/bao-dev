import { registerWhen, timeThis } from '../utils/utils.js';
import { getInSkyblock } from '../utils/functions.js';


class location {
    constructor(pos, label) {
        this.pos = pos;
        this.label = label;
    }
};

let coordArray = [];

registerWhen('chat', timeThis('registerChat get coordinates', (x, y, z, event) => {
    const message = ChatLib.getChatMessage(event, true);
    const messagePattern = /\[\d+] (.+): (.+)/;
    let match = message.match(messagePattern);

    if (match) {
        let userStr = match[1];
        let userMsg = match[2];
        let label = userMsg.replace(/x: .+, y: .+, z: .+/g, '');
        console.log(userStr);
        console.log(userMsg);
        console.log(label);
        coordArray.push(new location([x, y, z], label));
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria('x: ${x}, y: ${y}, z: ${z}').setContains();

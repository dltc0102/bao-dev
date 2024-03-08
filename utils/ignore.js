import Audio from "./audio";
import PogObject from "../../PogData";

import { getInSkyblock, updateInterval } from "./functions";
import { sendMessage } from "./party";
import { baoUtils, showAlert } from "./utils";
import { registerWhen, timeThis } from "./utils";

const biAudio = new Audio();

export const baoIgnoreList = new PogObject("bao-dev", {
    'list': []
}, '/data/baoIgnoreList.json');

function removeFromList(L, obj) {
    L2 = []
    L.forEach(([name, reason]) => {
        if (name !== obj) L2.append(name)
    })
    return L2;
}

function updateIgnoreList(list) {
    const sublists = [];
    for (let i = 0; i < list.length; i += 10) {
        sublists.push(list.slice(i, i + 10));
    }
    return sublists;
}

register('command', (...args) => {
    let [action, name, reason] = args;
    if (action === 'add') {
        baoIgnoreList.list.push([name, reason]);
        baoIgnoreList.list = updateIgnoreList(baoIgnoreList.list);
    };
    if (action === 'remove') {
        removeFromList(baoIgnoreList.list, name);
        baoIgnoreList.list = updateIgnoreList(baoIgnoreList.list);
    };
    if (action === 'list') {
        let numPages = Math.ceil(baoIgnoreList.list.length / 10);
        if (name > numPages) {
            ChatLib.chat(`&cPage number out of range.`);
            return;
        };

        ChatLib.chat(`${baoUtils.modPrefix} &3Page ${name}/${numPages}`);

        let pageInfo = baoIgnoreList.list[name];
        for (let idx = 0; idx < pageInfo.length; idx++) {
            let [name, reason] = pageInfo[idx];
            ChatLib.chat(`&b${idx}&r. &a${name} &r-- &e${reason}`)
        }
    }

    if (action === 'help' || action !== 'add' || action !== 'remove' || action !== 'list') {
        ChatLib.chat(`${baoUtils.modPrefix} &bIgnore Commands:`)
        ChatLib.chat(`&b/bi help &7-- &rPrints this message.`)
        ChatLib.chat(`&b/bi list (page) &7-- &rLists Bao Ignored Players`);
        ChatLib.chat(`&b/bi add (name) (reason) &7-- &rAdd a player for reason.`);
        ChatLib.chat(`&b/bi remove (name) &7-- &rUnignore a player.`);
        ChatLib.chat(`&b/bi removeall &7-- &rUnignore all players.`);
    }
}).setName('bi');
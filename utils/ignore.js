import Settings from '../settings.js'
import { data } from '../utils/data.js'

// ingore list
// ------ Ignored Users (Page 1 of 18) ------
// 1. (name)

let ignorePages = 0;
let ignoredNames = [];
register('chat', (currPg, totalPg, event) => {
    if (!data.inSkyblock) return;
    cancel(event);
    ignorePages = Number(totalPg);
}).setCriteria('------ Ignored Users (Page ${currPg} of ${totalPg}) ------');

register('chat', (idx, name, event) => {
    if (!data.inSkyblock) return;
    cancel(event);
    ignoredNames.push(name);
}).setCriteria('${idx}. ${name}');

register('command', () => {
    for (let pdx = 1; pdx < ignorePages.length; pdx++) {
        setTimeout(() => {
            ChatLib.chat(`/ignore list ${pds}`)
        }, 200)
    }
}).setName('showigcmds');

// added name to ignore list
register('chat', (name, event) => {
    ignoredNames.push(name);
}).setCriteria('Added ${name} to your ignore list.');

// removed name from ignore list
register('chat', (name, event) => {
    ignoreNames.filter(igName => igName !== name)
}).setCriteria('Removed ${name} from your ignore list.');






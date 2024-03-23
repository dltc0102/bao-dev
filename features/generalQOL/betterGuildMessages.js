import { registerWhen, timeThis } from "../../utils/utils";
import { getInSkyblock } from "../../utils/functions";
import { stripRank } from "../../utils/party";

const bridgeBot = 'Baltics'; //Settings.bridgeBotName

registerWhen('chat', timeThis('registerChat guild message shortener', (playerName, msg, event) => {
    if (playerName.includes(bridgeBot)) return;
    cancel(event);
    const message = ChatLib.getChatMessage(event, true);
    const shortenedMessage = message.substring(message.indexOf(">")+1);
    ChatLib.chat(`&2G >&r${shortenedMessage}`);
}), () => getInSkyblock() && World.isLoaded()).setCriteria('Guild > ${playerName}: ${msg}');

// bridge shortener
registerWhen('chat', timeThis('registerChat guild bridge message shortener', (bridgeName, bridgeRole, playerName, playerMessage, event) => {
    let strippedBot = stripRank(bridgeName);
    if (strippedBot !== bridgeBot) return;
    cancel(event);
    const bridgeLetter = strippedBot[0].toUpperCase();
    const bridgePrefix = `&2${bridgeLetter} >`;
    const fullText = `${playerName}: ${playerMessage}`;
    
    if (playerName.includes('Current mayor')) {
        // &2Guild > &a[VIP] Baltics &3[Admin]&r: Current mayor: Finnegan. Next mayor: Scorpius, in 2 days and 5 hours. Next special: Scorpius, in 2 days and 5 hours. <@Hqf2rtohlkc>
        let mayorSubLists = fullText.split('. ');
        mayorSubLists = mayorSubLists.map(sublist => sublist.replace(/<[^>]+>/g, '').trim());
        mayorSubLists = mayorSubLists.map(sublist => sublist.trim());
        mayorSubLists = mayorSubLists.map(sublist => `&a${sublist.replace(':', ':&r')}`)
        let mayorMessage = mayorSubLists.join(' ');
        ChatLib.chat(`${bridgePrefix} ${mayorMessage}`);


    } else if (playerName.includes('caught for')) {
        // /ct sim &2Guild > &a[VIP] Baltics &3[Admin]&r: Moldfin caught for bloosi (Banana): Total Moldfin: 515 | Bronze: 357 | Silver: 148 | Gold: 14 | Diamond: 0 <@u5au1x1ih4b>
        // &r&r&2Guild > &a[VIP] Baltics &3[Admin]&r: Moldfin caught for bloosi (Banana): Total Moldfin: 515 | Bronze: 357 | Silver: 148 | Gold: 14 | Diamond: 0 <@u5au1x1ih4b>&r
        const trophyPattern = /(.+) caught for (.+) ((.+)): Total (.+): (\d+) \| Bronze: (\d+) \| Silver: (\d+) \| Gold: (\d+) \| Diamond: (\d+) \| <.+>/;
        let trophyMatch = fullText.match(trophyPattern);
        if (trophyMatch) {
            let fishName = trophyMatch[1];
            let username = trophyMatch[2];
            let totals = trophyMatch[5];
            let bronzes = trophyMatch[6];
            let silvers = trophyMatch[7];
            let golds = trophyMatch[8];
            let diamonds = trophyMatch[9];
            ChatLib.chat(`${bridgePrefix} &a${username}'s ${fishName} Stats:&r Total: ${totals} | &cBRONZE: &r${bronzes} | &7SILVER: &r${silvers} | &6GOLD: &r${golds} | &bDIAMOND: &r${diamonds}`)
        }
    } else {
        ChatLib.chat(`${bridgePrefix} &a${playerName}&r: ${playerMessage}`);
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria("Guild > ${bridgeName} [${bridgeRole}]: ${playerName}: ${playerMessage}");

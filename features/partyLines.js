import { getInSkyblock } from "../utils/functions";
import { registerWhen, timeThis } from "../utils/utils";

function createChatBreak() {
    ChatLib.chat(ChatLib.getChatBreak(' ')); 
}

function createPartyJoinMessage(playerName) {
    return new Message(
        new TextComponent("&eYou have &c60&e seconds to accept. &6Click here to join!").setClick("run_command", `/p accept ${playerName}`)
    );
}

function getEmbeddedLine(event) {
    let message = ChatLib.getChatMessage(event, true);
    message.replace(/-/g, '');
    
    createChatBreak();
    ChatLib.chat(message);
    createChatBreak();
};

function nextPageMessage(curr) {
    return new Message(
        new TextComponent("&e&l>>").setClick("run_command", `/fl ${curr+1}`)
    )
}

function prevPageMessage(curr) {
    return new Message(
        new TextComponent("&e&l<<").setClick("run_command", `/fl ${curr-1}`)
    )
}

function createPageNavMessage(curr) {
    let prevPage = new TextComponent("&e&l>>").setClick("run_command", `/fl ${curr+1}`);
    let nextPage = new TextComponent("&e&l<<").setClick("run_command", `/fl ${curr-1}`);
    let filler = 'not clickable text';
    let messageContents = null;
    if (curr !== 1) {
        return new Message(
            prevPage, filler, nextPage
        ).chat()
    }
    if (curr === 1) {
        
    }
}

const entailsRegex = /&9&m-----------------------------------------------------&r([\s\S]*?)&9&m-----------------------------------------------------&r/;


// party lines
registerWhen('chat', timeThis('', (event) => {
    const message = ChatLib.getChatMessage(event, true);
    if (message.includes('&9') && /^[&9mr-]+$/.test(message)) {
        cancel(event);
        createChatBreak();
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria('-----------------------------------------------------');

// party warps
registerWhen('chat', timeThis('', (event) => {
    const message = ChatLib.getChatMessage(event, true);
    if (message.startsWith('&r&9')) {
        cancel(event);
        createChatBreak();
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria('-----------------------------');

// friend list
registerWhen('chat', timeThis('', (curr, total, event) => {
    let currentPage = parseInt(curr);
    const message = ChatLib.getChatMessage(event, true);
    const match = message.match(entailsRegex);
    if (match) {
        cancel(event);
        createChatBreak();
        let fullTextArray = match[1].split('\n');
        for (let idx = 1; idx < fullTextArray.length-1; idx++) {
            let textLine = fullTextArray[idx];
            let formatLine = '';
            if (textLine.startsWith('\n')) formatLine = textLine.slice(1);
            else if (textLine.endsWith('\n')) formatLine = textLine.slice(0, -1);
            else formatLine = textLine;
            
            if (idx === 1) ChatLib.chat(formatLine.replace(/>>/g, '').replace(/<</g, ''))
            if (idx !== 1) ChatLib.chat(formatLine);
        }
        if (message.includes('<<')) ChatLib.chat(prevPageMessage(currentPage));
        if (message.includes('>>')) ChatLib.chat(nextPageMessage(currentPage));
        createChatBreak();
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria('Friends (Page ${curr} of ${total})').setContains();

// best friend
registerWhen('chat', timeThis('', (event) => {
    const message = ChatLib.getChatMessage(event, true);
    const match = message.match(entailsRegex);
    if (match) {
        cancel(event);
        createChatBreak();
        ChatLib.chat(match[1]);
        createChatBreak();
    }
}), () => getInSkyblock() && World.isLoaded()).setCriteria('${playerName} is now a best friend!').setContains();

// guild/hypixel exp
// registerWhen('chat', timeThis('', (event) => {
//     const message = ChatLib.getChatMessage(event, true);
//     if (message.startsWith('&r&a') || message.startsWith('&r&3')) {
//         cancel(event);
//         createChatBreak();
//     }
// }), () => getInSkyblock() && World.isLoaded()).setCriteria('▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬');

// skyhanni skill level up ping
registerWhen('chat', timeThis('', (skillName, currLevel, newLevel, rewards, event) => {
    cancel(event);
    let message = ChatLib.getChatMessage(event, true);
    let newMsg = message.replace(/▬/g, '').trim();
    createChatBreak();
    ChatLib.chat(newMsg);
    createChatBreak();
}), () => getInSkyblock() && World.isLoaded()).setCriteria('▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  SKILL LEVEL UP ${skillName} ${currLevel}➜${newLevel}  REWARDS  ${rewards}▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬');

// guild message of the day
registerWhen('chat', timeThis('', (event) => {
    cancel(event);
    ChatLib.chat(ChatLib.getCenteredText('&aGuild: Message Of The Day'));
}), () => getInSkyblock() && World.isLoaded()).setCriteria('--------------  Guild: Message Of The Day  --------------');

// registerWhen('chat', timeThis('', (event) => {
//     const message = ChatLib.getChatMessage(event, true);
//     if (message.startsWith('&r&b')) {
//         cancel(event);
//         createChatBreak();
//     }
// }), () => getInSkyblock() && World.isLoaded()).setCriteria('-----------------------------------------------------');


// B > Trophy fish for icecatbb (Grapes): Total: 42567 | Bronze: 18/18 | Silver: 18/18 | Gold: 18/18 | Diamond: 18/18 <@6wmettfrutg>


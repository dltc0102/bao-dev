import Settings from "../../settings";
import Audio from "../../utils/audio";

import { registerWhen } from "../../utils/utils";
import { getInSkyblock } from "../../utils/functions";
import { baoUtils } from "../../utils/utils";

////////////////////////////////////////////////////////////////////////////////
// CONSTS
////////////////////////////////////////////////////////////////////////////////
const fearAudio = new Audio();


////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function solveFearMaths(problem) {
    const question = problem.replace(/x/g, '*');
    return eval(question).toFixed(0);
}


////////////////////////////////////////////////////////////////////////////////
// BETTER FEAR MESSAGES
////////////////////////////////////////////////////////////////////////////////
const fearMessages = [
    /FEAR. .+/, 
    /\[FEAR] .+/, 
]

fearMessages.forEach(msg => {
    registerWhen('chat', (event) => {
        cancel(event);
    }, () => Settings.primalFearQOL && getInSkyblock() && World.isLoaded()).setCriteria(msg);
})


////////////////////////////////////////////////////////////////////////////////
// PRIMAL FEAR SPAWNING PING
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (event) => {
    ChatLib.chat('[!] Primal Fear [!]');
    showAlert('&4PRIMAL FEAR');
    fearAudio.playDefaultSound();
}, () => Settings.primalFearQOL && Settings.spawningFearPing && getInSkyblock() && World.isLoaded()).setCriteria('FEAR. A Primal Fear has been summoned!');


////////////////////////////////////////////////////////////////////////////////
// MATH TEACHER FEAR SOLVER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', (problem, event) => {
    let result = solveFearMaths(problem);
    setTimeout(() => { ChatLib.chat(`${baoUtils.modPrefix} &fAnswer: &b${result}`) }, 100);
}, () => Settings.primalFearQOL && Settings.mathFearSolver && getInSkyblock() && World.isLoaded()).setCriteria('QUICK MATHS! Solve: ${problem}');



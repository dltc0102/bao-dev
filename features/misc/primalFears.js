import ExtraSettings from "../../config2/extraSettings.js";
import Audio from "../../utils/audio";

import { registerWhen, timeThis } from "../../utils/utils";
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
    registerWhen('chat', timeThis("registerChat cancel fearMessages", (event) => {
        cancel(event);
    }), () => ExtraSettings.primalFearQOL && getInSkyblock() && World.isLoaded()).setCriteria(msg);
})


////////////////////////////////////////////////////////////////////////////////
// PRIMAL FEAR SPAWNING PING
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat primal fear ping", (event) => {
    ChatLib.chat('[!] Primal Fear [!]');
    showAlert('&4PRIMAL FEAR');
    fearAudio.playDefaultSound();
}), () => ExtraSettings.primalFearQOL && ExtraSettings.spawningFearPing && getInSkyblock() && World.isLoaded()).setCriteria('FEAR. A Primal Fear has been summoned!');


////////////////////////////////////////////////////////////////////////////////
// MATH TEACHER FEAR SOLVER
////////////////////////////////////////////////////////////////////////////////
registerWhen('chat', timeThis("registerChat math fear solver", (problem, event) => {
    let result = solveFearMaths(problem);
    setTimeout(() => { ChatLib.chat(`${baoUtils.modPrefix} &fAnswer: &b${result}`) }, 100);
}), () => ExtraSettings.primalFearQOL && ExtraSettings.mathFearSolver && getInSkyblock() && World.isLoaded()).setCriteria('QUICK MATHS! Solve: ${problem}');



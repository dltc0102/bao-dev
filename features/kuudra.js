import Settings from "../config1/settings";
import Audio from "../utils/audio";

import { registerWhen, showAlert, timeThis } from "../utils/utils";
import { getInSkyblock, getInKuudra, getInCI } from "../utils/functions";

const kuudraAudio = new Audio()

const kuudraMessages = [

    // elle and misc
    /\[NPC] Elle:/,
    /.+ is now ready!/,
    /Elle has been eaten by Kuudra!/,

    // prec eye
    /Eye Beam Activated!/,
    /Eye Beam De-activated!/,
    
    // cannon
    /RIGHT-CLICK to shoot\. Move cursor to aim\./,
    
    // error
    /You can't use this command while in combat!/,
    
    // mob
    /The Kuudra Berserker spun and hit you for .+ damage!/,
    /.+ hit you for .+ true damage\./,
    /The blaze is unaffected by your attacks\./, 
    /The Wandering Blazes hit you .+ times, its strength increases!/,
    
    // supply
    /Your Fresh Tools Perk bonus doubles your building speed for the next 10 seconds!/,
    /You retrieved some of Elle's supplies from the Lava!/,
    /The supplies can't move any further in your direction!/,
    /You moved and the Chest slipped out of your hands!/,
    /Someone else is currently trying to pick up these supplies!/,
    /The Supply Chest is too heavy to use abilities while carrying it!/,
    /You are already currently picking up some supplies!/,
    
    // deaths
    /You need .+ more tokens to revive! Wait until your team generates some, or wait for your auto revive!/,
    /You died! You will be respawned in .+ seconds\./, 
    
    // shop
    /You do not have enough tokens to upgrade this perk!/, 

    // friend
    /Friend > .+ joined\./,
    /Friend > .+ left\./,

];

kuudraMessages.forEach(msg => {
    registerWhen('chat', timeThis('registerChat - cancel - kuudraMessages', (event) => {
        cancel(event);
    }), () => getInKuudra() && getInSkyblock() && World.isLoaded()).setCriteria(msg).setContains();
})

registerWhen('chat', timeThis('', (player, event) => {
    kuudraAudio.playDefaultSound();
    showAlert('&a&lKUUDRA STUNNED');
}), () => getInSkyblock() && World.isLoaded()).setCriteria("${player} destroyed one of Kuudra's pods!");



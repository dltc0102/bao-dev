import Settings from '../settings.js'
import { data } from '../utils/data.js'
import { getMobHP } from '../utils/functions.js'

let specifiedMobs = [];
// register('step', () => {
//     if (Settings.master_displayHP) {
//         if (Settings.vanq_hp) specifiedMobs += 'Vanquisher';
//         if (Settings.inq_hp) specifiedMobs += 'Exalted Minos Inquisitor';
//         if (Settings.champ_hp) specifiedMobs += 'Exalted Minos Champion';
//         if (Settings.rein_hp) specifiedMobs += 'Reindrake';
//         if (Settings.yeti_hp) specifiedMobs += 'Yeti';
//         if (Settings.gwshark_hp) gwStr = specifiedMobs += 'Great White Shark';
//         if (Settings.carrotking_hp) specifiedMobs += 'Carrot King';
//         if (Settings.waterhydra_hp) specifiedMobs += 'Water Hydra';
//         if (Settings.sea_emp_hp) specifiedMobs += 'Sea Emperor';
//         if (Settings.reaper_hp) specifiedMobs += 'Grim Reaper';
//         if (Settings.phantom_fisher_hp) specifiedMobs += 'Phantom Fisher';
//         specifiedMobs += 'Frozen Steve';
//         specifiedMobs += 'Frosty';
//         specifiedMobs += 'Squid';
//         specifiedMobs += 'Sea Walker';
//         specifiedMobs += 'Sea Archer';
//         specifiedMobs += 'Sea Guardian';
//         specifiedMobs += 'Sea Witch';
//         specifiedMobs += 'Rider of the Deep';
//     }
// }).setFps(5);

register('command', () => {
    if (Settings.master_displayHP) {
        if (Settings.vanq_hp) specifiedMobs += 'Vanquisher';
        if (Settings.inq_hp) specifiedMobs += 'Exalted Minos Inquisitor';
        if (Settings.champ_hp) specifiedMobs += 'Exalted Minos Champion';
        if (Settings.rein_hp) specifiedMobs += 'Reindrake';
        if (Settings.yeti_hp) specifiedMobs += 'Yeti';
        if (Settings.gwshark_hp) gwStr = specifiedMobs += 'Great White Shark';
        if (Settings.carrotking_hp) specifiedMobs += 'Carrot King';
        if (Settings.waterhydra_hp) specifiedMobs += 'Water Hydra';
        if (Settings.sea_emp_hp) specifiedMobs += 'Sea Emperor';
        if (Settings.reaper_hp) specifiedMobs += 'Grim Reaper';
        if (Settings.phantom_fisher_hp) specifiedMobs += 'Phantom Fisher';
        specifiedMobs += 'Frozen Steve';
        specifiedMobs += 'Frosty';
        specifiedMobs += 'Squid';
        specifiedMobs += 'Sea Walker';
        specifiedMobs += 'Sea Archer';
        specifiedMobs += 'Sea Guardian';
        specifiedMobs += 'Sea Witch';
        specifiedMobs += 'Rider of the Deep';
    }
    console.log(specificMobs.join(', '))
}).setName('listmobs');
    
    
    


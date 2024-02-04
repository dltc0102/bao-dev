check:
dev.js - done

displayHP.js - done

dungeon_cleaner.js - done
- check determineEss and determineMS funcs - done
- TODO: L135 - add Settings.iceSprayPing
- :204 - fixed 'ting' to 'thing'
- used getInDungeon() instead of getCurrArea()

toggle: player actions
- abilities
- revives and fairies
- obtained item messages
- decoys
- essence
- creeper veil actions

toggle: message qol
- npc sold items
- friend join/leave message
- gexp or hypixel exp messages
- ability/terminal/puzzle errors
- full inventory message

toggle: system notifications
- class stat change messages
- wish/heal messages
- orb pickups
- sack messages
- potion effects reminder message
- mute fire sales

toggle: interactive elements
- npc dialogue
- milestone messages
- wither door messages
- blood door messages
- boss messages
- statue messages
- floor specific messages
- blessings
- puzzle comps and fails
- mob damage messages
- witherborn damage messages
- bomb defusal messages
- mute auto recombs

dungeons.js
- TODO: fix melody detector
- TODO: add firefreeze toglge for scarf and professor
- TODO: add class level up toggle
- TODO: add cata level up toggle
- TODO: add show blessings toggle
- TODO: maybe make it so that showextrastats command only runs if gui is closed
- TODO: move overlay for showing blessings
- TODO: ff timers to be in 10 steps per second
- used getInDungeon() and getInDHub() instead of getCurrArea()

features:
o melody detector
o secrets per run (per session = 'resetsecretcounter' cmd)
o secrets and deaths count shown after every run for you
o m3 professor fire freeze timer
o m2 scarf fire freeze timer (wip)
o m2 scarf crypt timer (wip)
o class level up pings
o cata level up pings
o show blessings in dungeon
o dungeon routes saver (wip)
o dungeon run counter w/ goals (wip)
o accurate bc helper (wip)


end_cleaner.js
- fixed better namings
- used getInEnd() instead of getCurrArea()
- TODO: put sendZealotPing and endProtPing in betterEndMessages
- TODO: check baoDragons.displayText
- TODO: add weight calculation for chance of epic edrag, leg edrag, and reforge stones

- golem level checker and beacon:
-----
end protector
----
o FRONT: -644 5 -269 (lvl 1), lvl 2 y+1, lvl 3 y+2, lvl 4 y+3
o RIGHT: -678 5 -332 (lvl 1)

features:
o dragon counter
o dragon fight message qol
o special zealot ping

fishing_overlays.js - done
- used getInCI() and getInGarden() instead of getCurrArea()

fishing_pings.js - done
- added things for the 'togglefishingpings' command

garden.js - 
- TODO: make moveable overlays for arrow and plot map to sync at the same time
- TODO: make moveable overlays for yaw and pitch
- TODO: make moveabel overlays for vinyl info
- TODO: make moveable overlays for garden timers
- TODO: make moveable overlays for sprayonator info
- TODO: color picker for plotmap color and arrow color and center plot color

utils/utils.js
- skyblock time
- event tracker
- counter for spooky
- counter for shark fest
- counter for oasis stuff










locals
- try to make audio instance a data item
- margin constraints (number selector)
- when in the gui of moving an overlay, stop rendering the overlay if its on, and after the moving of the overlay is set, turn the render of the overlay on if it was off.
- inv log: 
    - flash 1
    
dev.js -- fine
displayHP.js -- fine
- verified name of gw shark

dungeons.js -- (+)
- removed #wish cuz useless
- removed dungeons m6 run counter (later i cba to work on dungeons atm)
- removed party full alert for dungeons
+ load ignore list for first time and if the ignore list is empty 'WIP'

fishing_overlay.js -- (+)
+ constrain coords for reg dragged on overlays

fishing_pings.js -- fine
*optimized pet drop ping function for &f pet names 

fishing_stats.js -- 
- removed # of total DH(s)
- added 'double hook message hider' under fishing QOL
+ constrain coords for reg dragged on fishing counter overlay







Do:
- pets fix
- current pet display
- party lock list
- turn on all settings button -- under dev
- preset saver
- alignment selector (top left, top right, bot left, bot right, custom)
- deal with jawbus hp and thunder hp
- verify name of great white shark
- add better 'watchdog messages'
- autokick ignored from party
- cake timer
- caducous feeder timer


experimental:
- rightclick copy (like sbe)
- alt rightclick on links (replaces . with '')
- /embed links (adds random 123 in the link before posting)



Doing: 
- season of jerry event -- powerup timers (constrain coords doesnt work for alignright/alignbot)
- generate calcSkillXp data (tooo arbitrary so not doing)

- pets fix and debug (need wifi)
- check 'better sacks message' feature



Done:
- added hp bar for inquis/runic inquis
- added 'edit locations' feature for displaying hp
- made gummy bear timer (use wifi to check that it works)
- added feature 'moveable fishing counter' (use wifi to check that it works)
- added 'toggle all settings' button for dev-ing (use wifi to check that it works)
- added 'better garden messages'
- added 'better stash messages'
- thunder and jawbus hp displays are toggleable
- removed renderlibv2: unused lib
- converted each file's currArea to one data.currArea
- moved some features over to better positioned categories (easy baker and grandma wolf hider are now in general qol)
- flux timer is now moveable

misc.js
- optimized some pings

pet.js
- removed 'show current pet' for now

winter.js
- powerup timer being weird and not showing





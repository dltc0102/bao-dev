bao 1.0.4 release:






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





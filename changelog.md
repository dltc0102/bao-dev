Flight:


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
- season of jerry event -- powerup timers (testing constrainCoords and multi-timer creation functions)
- check createChatTimer func
- check crossLoadTimer func
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

dungeons.js
- removed dungeons m6 run counter (later i cba to work on dungeons atm)
- removed party full alert for dungeons

misc.js
- optimized some pings

pet.js
- removed 'show current pet' for now

winter.js
- powerup timer being weird and not showing





v1.0.1 (Nov 9-10, 2023)
- fixed spooky import being commented
- fixed winter island counter having some problems with tracking
- fixed detection being inconsistent for jawbus/thunder
- fixed mushy tonic timer showing negative seconds on load
- sorted timers for timer displays (longest cd to shortest cd)
- added display hp for vanquishers
- fixed mushy tonic timer showing static countdown after glowy tonic expired
- added `thunder extra pings` back (idk why they were removed)
- fixed mushy tonic timer adding double or triple the time when mutiple pots were drunk

too many versions later:
TLDR: added a bunch of timers and changed things to be more optimised. still have a lot of work to do and a lot of features i want to implement.

If you want to look at specifics:
- timers: 
    - added 'flux countdown timer' [NOT FLARES]
    - added `kings scent timer` 

- counter:
    - fishing counter: atm only for crimson ([WIP] -- for other counters in other islands.)
    - changed 'fishing counter' to include for 'hub fishing' and 'jerry fishing'

- gui: 
    - bobber count gui overlay and location editor
    - player count gui overlay and location editor
    - nearby jawbus: detects nearby and doublehook jawbuses
    - nearby thunder: detects nearby and doublehook thunders
    - chargest counter: detects your thunder bottle and displays the charges, also alerts you if the held thunder bottle is full of thunder

- general qol: 
    - party kick offline is now #ko instead of #pk, reason: "cuz it sounds cooler" - alifarce
    - not on sb notifier 
    - kicked notifier [WIP] -- making 1 minute countdown until player can ask for warp back into sb
    - boop notifier: tells you who booped you in title

- fishing qol:
    - added 'phoenix rekindle timer'
    - added 'spirit mask cd timer'
    - added 'mushy tonic timer'
    - added `toggle for hiding scc messages`

- fishing pings:
    - flash ping [WIP] since i dont have inventory logger yet
    - added `pet drop pings` -- are all added: Guardian, Yeti, Dolphin Milestones, Squids, Megalodons
    - added `announced rarities for pet drop pings`

- misc:
    - caducous feeder timer [WIP]
    - cake timer [WIP] so that it checks the last recorded cake message to reset timer for 48 hours
    - added `mute the sheep` for royal resident to not spam your chat
    - added `announce dye pings` in gc toggle option
    - changed `hidden jerry pings` to send to self/coop only
    - added `golden goblin alert`
    - added `scatha pet drop ping`
    - added `mythos counter` that only works for hub: features general/kills/drops/averages/trackers info
    - changed `headless horseman ping` 
    - added `primal fear spawning ping`
    - added `asian/mathematician fear solver`
    - added `karen/public speaking demon fear solver`

- slayer:
    - added `boom timer` to `detect slayer info` --- also [WIP] i didnt work on the slayer qol features much
    - added `TAP counter, epearl counter and helmet display` to eman melee qol --- still very much a [WIP]

- dungeons:
    - added `bonzo cd timer`
    - added `melody terminal ping`
    - added `secrets per sesion` upon request by alifarce.


- sounds tab: rng sounds that player can add their own sounds or use
    - added `TVB News Theme` - biscuit's rng sound

- dev tab: for debugging

Things that are WIP:
- edit all gui locations 
- party lock implementation
- auto padding for all sides of the screen for gui overlays
- check whether you're in range of ls
- inventory logging for non-chat drops (ex. Flash, Chimera, Dwarf Turtle Shelmet etc.)








v0.0.4
General Changes:
- converted to a gui to make commands for visual simplicity
- added slayer qol and rng drops as features
- added spooky mob pings
- added jerry pings for when jerry is mayor

Command Changes:
- fixed /warpexc command
- fixed /swap command to be able to swap lobbies with any warp name
- when someone joins party, auto remind to use ?warp command when ready
- added ?pai command, lets party users set the settings of the party for all-invite

[WIP]:
- eman display

v0.0.3
Changes:
- added Fawe v2.0.5 pings
- fixed carrot king ping not consistent

v0.0.2
Changes: 
- /bao command -- help/show all commands
- ?wish command -- type in dungeons for healer to wish you
- ?swap command now has options:
    - ?swap ci -- swap lobbies for crimson isles
    - ?swap ch -- swap lobbies for crystal hollows 
    - ?swap void -- swap lobbies for void sepulture
    - ?swap tomb -- swap lobbies for smoldering tomb
    - ?swap jerry -- swap lobbies for jerry
- added jerry pings
- 'not on skyblock' bug will auto leave to lobby and ask for warp

[WIP]:
- auto gfs if inventory doesnt have any epearls [?eman on/off]
- ?warpexc (name) cmd to warp all except name(s)
- ?swap (any) -- to handle all warp names


v0.0.1
- basic fishing pings (crimson isles, normal fishing, event fishing)
- ?warp command
- ?swap command

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Configuration for the Gui, and its settings
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

import PogObject from "../../../PogData/index"

// Create Settings PogObject
export const GuiSettings = new PogObject("WoolWarsExtras", {
    "categories" : {
        "stats" : {
            "x" : 15,
            "y" : 15
        },
        "chat" : {
            "x": 60,
            "y": 20
        },
        "mapblacklist" : {
            "x": 40,
            "y": 15
        }
    },
    "config" : {
        "stats" : {
            "killlog" : false,
            "deathlog" : false, 
            "kdlog" : false
        },
        "chat": {
            "blocklog": false
        },
        "mapblacklist" : {
            "kingspass" : false,
		    "fracture" : false,
	    	"histoire" : false,
	    	"temple" : false,
	    	"arches" : false,
	    	"underworld" : false,
	    	"sun_shrine" : false,
	    	"plummet" : false,
	    	"stoneguard" : false,
		    "belle" : false,
	    	"courtyard" : false,
	    	"patio" : false,
	    	"factory" : false,
	    	"ruin" : false,
	    	"retro" : false,
	    	"lava" : false,
	    	"aztec" : false,
	    	"blocks" : false,
	    	"shipment" : false,
	    	"district" : false,
	    	"tumble" : false,
	    	"steel_works" : false,
		    "dust" : false,
	    	"hilltop" : false,
		    "galactic" : false,
	    	"anubis" : false,
        }
    },
}, "utils/gui/settings.json")

GuiSettings.save()
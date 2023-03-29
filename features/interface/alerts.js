/// <reference types="../../../CTAutocomplete" />

import config from "../../config"
import utils from "../../Utils/utils"
import { colorCodes } from "../../Utils/utils"
sentTitleLast = false;
sentTitleEnemy = false;
enemyColor = "";
teamColor = "";
foundTeam = false;
foundMid = false;
blockStates = [];
prevState = ""
midCoords = [
	[-1, -1, "Unclaimed"],
	[-1, 0, "Unclaimed"],
	[-1, 1, "Unclaimed"],
	[0, -1, "Unclaimed"],
	[0, 0, "Unclaimed"],
	[0, 1, "Unclaimed"],
	[1, -1, "Unclaimed"],
	[1, 0, "Unclaimed"],
	[1, 1, "Unclaimed"]
]; 

/**
 * Updates block status for custom alerts and chat messages.
 * @param {*} value current status of the block
 * @param {*} pos position of the block
 */
function setCoordValue(value, pos) {
	if(value === midCoords[parseInt(pos)][2]) {
		return
	}
	if (value == teamColor && midCoords[parseInt(pos)][2] == enemyColor) {
		if (config.all_updates) {
			ChatLib.chat(`${config.prefix} &7One of the enemies ${enemyprefix}${enemyColor} &7blocks was broken.`)
		}
	}
	if (value == enemyColor && midCoords[parseInt(pos)][2] == teamColor) {
		if (config.all_updates) {
			ChatLib.chat(`${config.prefix} &7One of your ${teamprefix}${teamColor} &7blocks was broken.`)
		}
	}
	if (value === "Air" && midCoords[parseInt(pos)][2] == teamColor) { 
		if (config.break_alert) {
			Client.showTitle(colorCodes[config.break_alert_color] + "&lTeam block broken!", "", 0, 45, 0)
		}
		if (config.all_updates) {
			ChatLib.chat(`${config.prefix} &7One of your ${teamprefix}${teamColor} &7blocks was broken.`)
		}
	}
	if (value == "Air" && midCoords[parseInt(pos)][2] == enemyColor) {
		if (config.all_updates) {
			ChatLib.chat(`${config.prefix} &7One of the enemies ${enemyprefix}${enemyColor} &7blocks was broken.`)
		}
	}
	if (value == "Air" && midCoords[parseInt(pos)][2] == "Unclaimed") {
		if (config.all_updates) {
			ChatLib.chat(`${config.prefix} &7An &aUnclaimed &7block was broken.`)
		}
	}
	if (value == enemyColor && midCoords[parseInt(pos)][2] == "Air") {
		if (config.place_alert) {
			Client.showTitle(colorCodes[config.place_alert_color] + "&lEnemy block placed!", "", 0, 45, 0)
		}
		if (config.all_updates) {
			ChatLib.chat(`${config.prefix} &7One of the enemies ${enemyprefix}${enemyColor} &7blocks was placed.`)
		}
	}
	if (value == teamColor && midCoords[parseInt(pos)][2] == "Air") {
		if (config.all_updates) {
			ChatLib.chat(`${config.prefix} &7One of your ${teamprefix}${teamColor} &7blocks was placed.`)
		}
	}
	midCoords[parseInt(pos)][2] = value
}


// LAST PLAYER ALERT
register("tick", () => {
	if (utils.inWoolWars && config.last_player) {
		for(let i = 0; i < Scoreboard.getLines().length; i++) {
			let line = Scoreboard.getLines()[i]
			if(line.getName().removeFormatting().toString().includes('(You)')) {
                if(line.getName().removeFormatting().toString().includes("1") && !sentTitleLast) {
                    Client.showTitle(colorCodes[config.last_player_color] + "&lLast Player Alive!", "", 0, 45, 0)
					sentTitleLast = true;
                }
			} 
		}
		for(let i = 0; i < Scoreboard.getLines().length; i++) {
			let line = Scoreboard.getLines()[i]
			if(line.getName().removeFormatting().toString().includes('State: ')) {
				splitState = line.getName().split(" ") 
				stateName = (splitState[splitState.length - 2]).removeFormatting()
				stateName = stateName.replace(/[^\x00-\x80]/g, "")
			} 
		}
		if (stateName == "Round" && utils.roundActive) {
			sentTitleLast = false;
		}
	}
})

// ONE ENEMY ALERT
register("tick", () => {
	if (utils.inWoolWars && config.last_enemy) {
		for(let i = 0; i < Scoreboard.getLines().length; i++) {
			let line = Scoreboard.getLines()[i]
			if(!line.getName().removeFormatting().toString().includes('(You)') && line.getName().removeFormatting().toString().includes('Players: ') && line.getName().removeFormatting().toString().includes(enemyColor)) {
                if(line.getName().removeFormatting().toString().includes("1") && !sentTitleEnemy && utils.roundActive) {
                    Client.showTitle(colorCodes[config.last_enemy_color] + "&l1 Enemy Remaining!", "", 0, 45, 0)
					sentTitleEnemy = true;
                }
			} 
		}
		for(let i = 0; i < Scoreboard.getLines().length; i++) {
			let line = Scoreboard.getLines()[i]
			if(line.getName().removeFormatting().toString().includes('State: ')) {
				splitState = line.getName().split(" ") 
				stateName = (splitState[splitState.length - 2]).removeFormatting()
				stateName = stateName.replace(/[^\x00-\x80]/g, "")
			} 
		}
		if (stateName == "Round" && utils.roundActive) {
			sentTitleEnemy = false;
		}
	}
})

// GET ENEMY COLOR
register("tick", () => {
	if (utils.inWoolWars && !foundTeam) {
		for(let i = 0; i < Scoreboard.getLines().length; i++) {
			let line = Scoreboard.getLines()[i]
			if(line.getName().removeFormatting().toString().includes('(You)') && !foundTeam) {
				teamLine = line.toString().removeFormatting()[0]
				if (teamLine == "B") enemyColor = "Red", teamColor = "Blue", teamprefix = "&b", enemyprefix = "&c"
				else enemyColor = "Blue", teamColor = "Red", teamprefix = "&c", enemyprefix = "&b"
				foundTeam = true;
			} 
		}
	}
})
register("WorldLoad", () => {
	foundTeam = false;
	foundMid = false;
	blockStates = [];
	midY = 0;
	midCoords = [
	[-1, -1, "Unclaimed"],
	[-1, 0, "Unclaimed"],
	[-1, 1, "Unclaimed"],
	[0, -1, "Unclaimed"],
	[0, 0, "Unclaimed"],
	[0, 1, "Unclaimed"],
	[1, -1, "Unclaimed"],
	[1, 0, "Unclaimed"],
	[1, 1, "Unclaimed"]
    ];
})

// DETECT MID
register("step", () => {
    if (utils.inWoolWars && !foundMid && utils.roundActive) {
        midCoords.forEach(e => {
            for (y=50;y < 90; y++) {
                if (World.getBlockAt(e[0], y, e[1]).getType().getName().toString().includes("Wool") && World.getBlockAt(e[0], (y + 1), e[1]).getType().getName().toString().includes("air")) {
                    blockSplit = (World.getBlockAt(e[0], y, e[1]).getState()).toString()
                    midY = y
                    foundMid = true
                } 
            }
        })
    } 
	if (foundMid && utils.roundActive) {
		midCoords.forEach(a => {
			if (World.getBlockAt(a[0], midY, a[1]).getType().getName().toString().includes("Quartz") || World.getBlockAt(a[0], midY, a[1]).getType().getName().toString().includes("Snow")) {
				setCoordValue("Unclaimed", parseInt(midCoords.indexOf(a)))
			}
			if (World.getBlockAt(a[0], midY, a[1]).getType().getName().toString().includes("air")) {
				setCoordValue("Air", parseInt(midCoords.indexOf(a)))
			}
			if (World.getBlockAt(a[0], midY, a[1]).getType().getName().toString().includes("Wool")) {
				if(((World.getBlockAt(a[0], midY, a[1]).getState()).toString()).charAt(21) == "w") {
					setCoordValue("Unclaimed", parseInt(midCoords.indexOf(a)))
				}
				if(((World.getBlockAt(a[0], midY, a[1]).getState()).toString()).charAt(21) == "b") {
					setCoordValue("Blue", parseInt(midCoords.indexOf(a)))
				}
				if(((World.getBlockAt(a[0], midY, a[1]).getState()).toString()).charAt(21) == "r") {
					setCoordValue("Red", parseInt(midCoords.indexOf(a)))
				}
			}
		})
	}
	if (foundMid && !utils.roundActive) {
		midCoords.forEach(i => setCoordValue("Unclaimed", midCoords.indexOf(i)))
	}
}).setDelay(1)
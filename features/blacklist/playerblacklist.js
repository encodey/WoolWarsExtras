import config from "../../config"
import utils from "../../Utils/utils"

// DETECT BLACKLISTED PLAYER FROM TAB
register("step", (steps) => {
	splitList = config.blacklistedPlayers.split(" ")
	if (!utils.inWoolWars && config.playerblacklist) {
		for(let x = 0; x < TabList.getUnformattedNames().length; x++) {
			let tabLine = TabList.getUnformattedNames()[x]
			splitList.forEach(e => { 
				if (e.includes(",")) {
					unformattedx = e.substr(0, (e.length - 1));
				} else {
					unformattedx = e
				}
				if (tabLine == unformattedx) {
					if (!utils.blacklistedInLobby.includes(unformattedx.toString())) {
						new Message(
							msg = new TextComponent(`${config.prefix} &r&cDetected a blacklisted player &b${unformattedx} &r&c in your lobby.`),
							clickmsg = new TextComponent("&6 [CLICK TO LEAVE]").setClick(
								"run_command",
								"/l"
							).setHoverValue("&r&7Click to warp to the lobby")
						).chat()
						utils.blacklistedInLobby.push(unformattedx)
						utils.playerWarning = true
					}
				} 
			})
		}
	}
}).setDelay(1)

// DETECT BLACKLISTED PLAYER FROM CHAT MSG
register("chat", (message) =>{
	if (message.includes("has joined.")) {
		splitJoined = message.split(" ")
		splitJoined.forEach(e =>{
			if (splitJoined.includes(unformattedx)) {
				utils.playerWarning = false;
			}
		})
	}
}).setChatCriteria("${message}")
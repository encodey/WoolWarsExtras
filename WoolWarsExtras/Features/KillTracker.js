import utils from "../Utils/utils"
import config from "../config"

// LOG KILLS AND DEATHS
register("chat", (message, event) => {  
	const splitMsg = message.split(" ");
	utils.deathMessages.forEach(x => {
		if (message.toString().includes(x)) {   
			if (message.toString().includes("banana peel off a cliff")) { // first unique varient
				splitMsg.forEach(y => {
					if (y.toString().includes("'s")) {
						unformattedName = y.substr(0, (y.length - 2)); 
						player_killer = unformattedName;
						utils.gameKills.set((player_killer), (utils.gameKills.get(player_killer) + 1));
					};
				});
			} else if (message.toString().includes("tried to sunbathe in")) {	 // second unique varient
				splitMsg.forEach(a => {
					if (a.toString().includes("'s")) {
						unformattedName2 = a.substr(0, (a.length - 2)); 
						player_killer = unformattedName2;
						utils.gameKills.set((player_killer), (utils.gameKills.get(player_killer) + 1));
					};
				});
			} else {                                                                                                                          
				splitMsg.forEach(element => {
					if(element.toString().includes(".")) {
						unformattedElement = element.substr(0, (element.length - 1));  
						player_killer = unformattedElement
						utils.gameKills.set((player_killer), (utils.gameKills.get(player_killer) + 1));
					};
				}); 
			};
			player_killed = splitMsg[0];  
			utils.gameDeaths.set((player_killed), (utils.gameDeaths.get(player_killed) + 1));
			player_killer = "" 
		};    
	});             
}).setChatCriteria("${message}");

// SEND STATS AT END OF GAME
register("chat", (message, event) => {
	if (message.includes("Final Game Stats") && utils.inWoolWars == true)  {
		setTimeout(() => {
			utils.userNames.forEach(b => {
				player_kd = (utils.gameKills.get(b) / utils.gameDeaths.get(b)).toFixed(2)
				if (config.killLog && config.deathLog && config.kdLog) { // if all true
					new Message(
						nonHover = new TextComponent("&d[&bExtras&d] &c" + b + " &r&7got &c" + utils.gameKills.get(b) + " &7kills. "),
						hover = new TextComponent("&d[&bView More&d]").setHoverValue("&r&7Deaths: &c" + utils.gameDeaths.get(b) + "&7 | &r &7K/D: &c" + player_kd)
					).chat()
				} else if (config.killLog && config.deathLog && !config.kdLog) { // no kd log
					new Message(
						nonHover = new TextComponent("&d[&bExtras&d] &c" + b + " &r&7got &c" + utils.gameKills.get(b) + " &7kills. "),
						hover = new TextComponent("&d[&bView More&d]").setHoverValue("&r&7Deaths: &c" + utils.gameDeaths.get(b))
						).chat()
				} else if (config.killLog && !config.deathLog && config.kdLog) { // no death log
					new Message(
						nonHover = new TextComponent("&d[&bExtras&d] &c" + b + " &r&7got &c" + utils.gameKills.get(b) + " &7kills. "),
						hover = new TextComponent("&d[&bView More&d]").setHoverValue("&7K/D: &c" + player_kd)
						).chat()
				} else if (config.killLog && !config.deathLog && !config.kdLog) { // only kill log
					hoverComponent = new TextComponent("&d[&bExtras&d] &c" + b + " &r&7got &c" + utils.gameKills.get(b) + " &7kills. ")
					ChatLib.chat(hoverComponent)
				}
			})
		}, 500);
		setTimeout(() => {
			utils.gameEnded = true;
			utils.setDataToZero = false;
			utils.gameKills.clear();
			utils.gameDeaths.clear();
		}, 2000);
	}
}).setChatCriteria("${message}");
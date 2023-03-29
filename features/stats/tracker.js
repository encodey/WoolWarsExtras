import utils, { data, getHypixelPlayer, getMojangInfo } from "../../Utils/utils"
import config from "../../config"
import Promise from "../../../PromiseV2"
scanned = false
placed = new Map
broken = new Map
statsStr = [""]
chatStr = new Message

register("chat", (message) => {  // LOG KILLS AND DEATHS
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

register("chat", (message, event) => {  // SEND STATS AT END OF GAME
	if (message.includes("Final Game Stats") && utils.inWoolWars == true)  {
		new Promise(() => {
			utils.userNames.forEach(elem => {
				getMojangInfo(elem).then(mojangInfo => {
					getHypixelPlayer(mojangInfo.id, data.apiKey).then(hypixelData => {
						placed.set(elem, (hypixelData.player.stats.WoolGames.wool_wars.stats.wool_placed - placed.get(elem)))
						broken.set(elem, (hypixelData.player.stats.WoolGames.wool_wars.stats.blocks_broken - broken.get(elem)))
					}).then(() => {
							player_kd = (utils.gameKills.get(elem) / utils.gameDeaths.get(elem)).toFixed(2)
							if (config.killLog) chatStr.addTextComponent(new TextComponent(`\n${config.prefix} &c${elem} &r&7got &c${utils.gameKills.get(elem)} &7kills. `))
							if (config.deathLog && !config.kdLog && !config.blockLog) chatStr.addTextComponent(new TextComponent(`&d[&bView More&d]`).setHoverValue(`&6${elem}\n&r&7Deaths: &c${utils.gameDeaths.get(elem)}`))
							else if (config.deathLog && config.kdLog && !config.blockLog) chatStr.addTextComponent(new TextComponent(`&d[&bView More&d]`).setHoverValue(`&6${elem}\n&r&7Deaths: &c${utils.gameDeaths.get(elem)}\n&7K/D: &c${player_kd}`))
							else if (!config.deathLog && config.kdLog && !config.blockLog) chatStr.addTextComponent(new TextComponent(`&d[&bView More&d]`).setHoverValue(`&6${elem}\n&7K/D: &c${player_kd}`))
							else if (!config.deathLog && config.kdLog && config.blockLog) chatStr.addTextComponent(new TextComponent(`&d[&bView More&d]`).setHoverValue(`&6${elem}\n&7K/D: &c${player_kd}\n&7Placed: &c${placed.get(elem)}\n&7Broken: &c${broken.get(elem)}`))
							else if (config.deathLog && config.kdLog && config.blockLog) chatStr.addTextComponent(new TextComponent(`&d[&bView More&d]`).setHoverValue(`&6${elem}\n&r&7Deaths: &c${utils.gameDeaths.get(elem)}\n&7K/D: &c${player_kd}\n&7Placed: &c${placed.get(elem)}\n&7Broken: &c${broken.get(elem)}`))
							else if (config.deathLog && !config.kdLog && config.blockLog) chatStr.addTextComponent(new TextComponent(`&d[&bView More&d]`).setHoverValue(`&6${elem}\n&r&7Deaths: &c${utils.gameDeaths.get(elem)}\n&7Placed: &c${placed.get(elem)}\n&7Broken: &c${broken.get(elem)}`))
							if(utils.userNames.indexOf(elem) == (utils.userNames.length - 1)) {
								chatStr.chat()
								chatStr = new Message
								return
							}
					})
				})
			})
		})
	}
}).setChatCriteria("${message}");

register("worldLoad", () => { //clear variables on world load
    scanned = false
    broken.clear()
    placed.clear()
    statsStr[0] = ""
	chatStr = new Message
	utils.gameEnded = true;
	utils.setDataToZero = false;
	utils.gameKills.clear();
	utils.gameDeaths.clear();
})

register("step", () => { // scans at the start of a game
	if (utils.inWoolWars && config.blockLog && !scanned) {
        utils.userNames.forEach(elem => {
            getMojangInfo(elem).then(mojangInfo => {
                try {var uuid = mojangInfo.id}
                catch (error) {if (error == `TypeError: Cannot read property "id" from null`) {
					ChatLib.chat(new TextComponent(`${config.prefix} &4Failed to fetch player data for &a${elem}`).setHover("show_text", `&7This could be due to an invalid username, or that you are being rate limited.`)) 
					placed.set(elem, 0)
					broken.set(elem, 0)
				}
				}
                getHypixelPlayer(uuid, data.apiKey).then(hypixelData => {
                    try {placed.set(elem, hypixelData.player.stats.WoolGames.wool_wars.stats.wool_placed)}
                    catch(error) {if(error == `TypeError: Cannot read property "stats" from undefined`) placed.set(elem, 0)}
                    try {broken.set(elem, hypixelData.player.stats.WoolGames.wool_wars.stats.blocks_broken)}
                    catch(error) {if(error == `TypeError: Cannot read property "stats" from undefined`) broken.set(elem, 0)}
                })
            })
        })
		scanned = true
	}
}).setDelay(1)
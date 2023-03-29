import config from "../../config"
import "../../utils/mapData"
import utils from "../../utils/utils"

register("step", () =>{
	if (!utils.foundMap) {
		let location = Scoreboard.getTitle().removeFormatting();
		if (location.includes("WOOL WARS")) {
			for(let i = 0; i < Scoreboard.getLines().length; i++) {
					let line = Scoreboard.getLines()[i]
					if(line.getName().includes('Players: ')) {
						for(let i = 0; i < Scoreboard.getLines().length; i++) {
							let line = Scoreboard.getLines()[i]
							if(line.getName().removeFormatting().includes('Map: ')) {
								splitMap = line.getName().split(" ")
								mapName = (splitMap[splitMap.length - 1]).removeFormatting()
								mapName = mapName.replace(/[^\x00-\x80]/g, "")
								utils.foundMap = true;
								return
							};
						};
				};
			};
		}
	} else if(utils.foundMap && config.mapblacklist) {
		for (x=0;x < config.blacklistedMaps.length;x++) {
			if ((config.blacklistedMaps[x]).toString() == mapName.toString().removeFormatting()) {
				if (!utils.currentMapBlacklisted) {
					new Message(
						msg = new TextComponent(`${config.prefix} &r&cDetected a blacklisted map &b ${(config.blacklistedMaps[x].toString())}`),
						clickmsg = new TextComponent("&6 [CLICK TO LEAVE]").setClick(
							"run_command",
							"/l"
						).setHoverValue("&r&7Click to warp to the lobby")
					).chat()
					utils.currentMapBlacklisted = true;
				}
			}
		}
		
	}
}).setDelay(0.5)
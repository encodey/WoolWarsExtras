import utils from "../Utils/utils"

register("step", (steps) => {
	let location = Scoreboard.getTitle().removeFormatting();
	if (location.includes("WOOL WARS")) {
		for(let i = 0; i < Scoreboard.getLines().length; i++) {
				let line = Scoreboard.getLines()[i]
				if(line.getName().includes('Round')) {
					utils.inWoolWars = true;
			};
		};
	} else {
		utils.inWoolWars = false;
	};
	if (utils.inWoolWars == true && utils.usersCreated == false) {	
		utils.pushedNames = false;                          
		utils.userNames = [];
		for(let x = 0; x < TabList.getUnformattedNames().length; x++) {
			let tabLine = TabList.getUnformattedNames()[x]
			if (TabList.getNames()[x].includes("B ") || TabList.getNames()[x].includes("R ")) {   
				if (!utils.userNames.includes(tabLine)) {
					utils.userNames.push(tabLine);
					if (!utils.setDataToZero) {
						utils.gameKills.set((tabLine), 0);
						utils.gameDeaths.set((tabLine), 0);
					};
				};	
			};
		};
		if (utils.userNames.length > 0) {
			utils.pushedNames = true;
		};
		utils.setDataToZero = true;
		if (utils.pushedNames == true) {
			utils.usersCreated = true;
		};
	};
}).setDelay(1);
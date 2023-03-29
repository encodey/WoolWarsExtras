import utils from "../../Utils/utils";
import { data } from "../../Utils/utils";
import config from "../../config";
stateName = ""
round = 0
sentData = false;
gotStart = false;
times = new Map();
displayed1 = false
displayed2 = false
displayed3 = false
displayed4 = false
displayed5 = false

// CLEAR DATA
register("WorldLoad", () => {
	round = 0;
	stateName = "";
	times.clear()
	sentData = false;
	gotStart = false;
	displayed1 = false
	displayed2 = false
	displayed3 = false
	displayed4 = false
	displayed5 = false
});

// RENDER GUI
register("renderOverlay", () => {
    if (config.timer_gui && round > 0) {
    	Renderer.translate(data.timer_location.x, data.timer_location.y)
    	Renderer.scale(config.timer_scale / 40)
		if (stateName == "Active") {
			if (!gotStart) {
				startTracker = new Date().getTime()
				gotStart = true
			}
			times.set(round.toString(), (((Math.floor((((new Date().getTime()) - startTracker) /10)).toFixed(2)) / 100) + "\n").toString())
		}
		Renderer.drawStringWithShadow("&d[&bRound Times&d]\n\n", 0, 0)
		if (round == 7) {
			Renderer.drawStringWithShadow("\n\n\n\n\n\n\n\n&c&lRound " + 7 + "&c : &b" + times.get("7"), data.timer_location.x, data.timer_location.y)
			displayed5 = true
		} 
		if (round == 6) {
			Renderer.drawStringWithShadow("\n\n\n\n\n\n\n&cRound " + 6 + "&c: &b" + times.get("6"), data.timer_location.x, data.timer_location.y)
			displayed5 = true
		} 
		if (round == 5) {
			Renderer.drawStringWithShadow("\n\n\n\n\n\n&cRound " + 5 + "&c: &b" + times.get("5"), data.timer_location.x, data.timer_location.y)
			displayed5 = true
		} 
		if (round == 4 || displayed4) {
			Renderer.drawStringWithShadow("\n\n\n\n\n&cRound " + 4 + "&c: &b" + times.get("4"), data.timer_location.x, data.timer_location.y)
			displayed4 = true
		} 
		if (round == 3 || displayed3) {
			Renderer.drawStringWithShadow("\n\n\n\n&cRound " + 3 + "&c: &b" + times.get("3"), data.timer_location.x, data.timer_location.y)
			displayed3 = true
		} 
		if (round == 2 || displayed2) {
			Renderer.drawStringWithShadow("\n\n\n&cRound " + 2 + "&c: &b" + times.get("2"), data.timer_location.x, data.timer_location.y)
			displayed2 = true
		} 
		if (round == 1 || displayed1) {
			Renderer.drawStringWithShadow("\n\n&cRound " + 1 + "&c: &b" + times.get("1"), data.timer_location.x, data.timer_location.y)
			displayed1 = true
		}
    }
})

// MOVE GUI
register("dragged", (dx, dy, x, y) => {
    if (!config.moveTimer.isOpen()) return
    data.timer_location.x = x 
    data.timer_location.y = y 
    data.save()    
})

// SEND END OF GAME MESSAGE
register("chat", (message, event) => {
	if (message.includes("Final Game Stats") && utils.inWoolWars == true)  {
        setTimeout(() => { 
            if (config.timer && config.timer_type == 1) {
                x = 1
                utils.roundTimes.forEach(e => {
                    ChatLib.chat(`${config.prefix} &7Round ${x} Took &b ${e} &r&7 seconds.`)
                    x = x + 1
                })
            }
        }, 1000);
    }
	//utils.roundTimes.clear()
}).setChatCriteria("${message}");

// GET STATE AND ROUND
register("tick", () => {
	if (config.timer && utils.inWoolWars) {
		for(let i = 0; i < Scoreboard.getLines().length; i++) {
			let line = Scoreboard.getLines()[i]
			if(line.getName().removeFormatting().toString().includes('State: ')) {
				splitState = line.getName().split(" ") 
				stateName = (splitState[splitState.length - 2]).removeFormatting()
				stateName = stateName.replace(/[^\x00-\x80]/g, "")
			} 
		}
		for(let i = 0; i < Scoreboard.getLines().length; i++) {
			let line = Scoreboard.getLines()[i]
			if (line.getName().removeFormatting().toString().includes("Round: ")) {
				splitround = line.getName().split(" ") 
				round = (splitround[splitround.length - 1]).removeFormatting()
				round = round.replace(/[^\x00-\x80]/g, "")
			}
		}
	}
})

// ROUND TRACKING
register("tick", () => {
	if (config.timer && utils.inWoolWars) {
		if (stateName == "Active" && !utils.roundActive) {
			startTime = new Date().getTime()
			utils.roundActive = true;
		} else if (stateName == "Round" && utils.roundActive) {
			endTime = new Date().getTime()
			utils.roundActive = false;
			gotStart = false;
			utils.roundTimes.set((round).toString(), (Math.floor((endTime - startTime)/10)/100).toFixed(2))
			if (config.timer_type == 0) {
				ChatLib.chat(`${config.prefix} &7Round ${round} Took &b ${(Math.floor((endTime - startTime)/10)/100).toFixed(2)} &r&7 seconds.`)
			}
		}
	}
})

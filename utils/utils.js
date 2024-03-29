import PogObject from "../../PogData/index"
import request from "../../requestV2"
import config from "../config"
export const data = new PogObject("WoolWarsExtras", {
    "timer_location" : {
        "x" : 0,
        "y" : 0
    },
    "firstTime" : true,
    "apiKey": null
}, "utils/data.json")
export const colorCodes = ["&4", "&c", "&6", "&e", "&2", "&a", "&b", "&3", "&1", "&9", "&d", "&5", "&f", "&7", "&8", "&0"]

// EXPORTS
class utils {
    constructor(gameDeaths, gameKills, setDataToZero, inWoolWars, gameEnded, usersCreated, pushedNames, blacklistedInLobby, playerWarning, foundMap, currentMapBlacklisted, roundActive, roundTimes, deathMessages) {
        var gameKills = new Map;
        var gameDeaths = new Map;
        var setDataToZero = false;
        var inWoolWars = false;
        var gameEnded = false;
        var usersCreated = false;
        var pushedNames = false;
        var playerWarning = false;
        var blacklistedInLobby = []
        var foundMap = false;
        var currentMapBlacklisted = false;
        var roundActive = false;
        var roundTimes = new Map;
        const deathMessages = ["was struck down by", "was turned to dust by", "was melted by", "was turned to ash by", "was filled full of lead by", "met their end by", "was killed with dynamite by", "lost a drinking contest with", "was turned into space dust by", "was sent into orbit by", "was hit by an asteroid from", "was retrograded by", "was deleted by", "was ALT+F4'd by", "was rm -rf by", "was crashed by", "was given the cold shoulder by", "was hit off by a love bomb from", "was struck with Cupid's arrow by", "was out of the league of", "was mushed by", "was peeled by", "got banana pistol'd by", "banana peel off a cliff", "was oinked by", "slipped into void for", "got attacked by a carrot from", "was distracted by a piglet from", "was trampled by", "was back kicked into the void by", "was impaled from a distance by", "was headbutted off a cliff by", "be sent to Davy Jones' locker by", "be cannonballed to death by", "be shot and killed by", "be killed with magic by", "got rekt by", "took the L to", "got smacked by", "got roasted by", "was crusaded by the knight", "was jousted by", "was shot to the knee by", "was catapulted by", "tried to sunbathe in", "couldn't handle the heat from", "was shot into the sun by", "slipped on some sunblock from", "was killed by", "was knocked into the void by", "was knocked off a cliff by", "was shot by", "died.", "fell in the void.", "was thrown into fire by"]
        this.gameDeaths = gameDeaths
        this.gameKills = gameKills
        this.setDataToZero = setDataToZero
        this.inWoolWars = inWoolWars
        this.gameEnded = gameEnded
        this.usersCreated = usersCreated
        this.pushedNames = pushedNames
        this.blacklistedInLobby = blacklistedInLobby
        this.playerWarning = playerWarning
        this.foundMap = foundMap
        this.currentMapBlacklisted = currentMapBlacklisted
        this.roundActive = roundActive
        this.roundTimes = roundTimes
        this.deathMessages = deathMessages
        this.inLobby = false
    }
}
export default new utils;

// API STUFF

register("chat", (key) => { // save new api key
    data.apiKey = key
    data.save()
    ChatLib.chat(`&d[&bExtras&d] &cSet API key!`)
}).setCriteria(/Your new API key is (.+)/)
/**
 * 
 * @param {*} uuid uuid of a player
 * @param {*} apiKey api key from hypixel, accessible through /api new
 * @returns hypixel api for a player in the form of a json object
 */
export const getHypixelPlayer = (uuid, apiKey) => request(`https://api.hypixel.net/player?key=${apiKey}&uuid=${uuid}`).then(a => JSON.parse(a)).catch(e => null)


/**
 * 
 * @param {*} player username of player
 * @returns uuid of that username
 */
export const getMojangInfo = (player) => {
    if (player.length > 16) return request(`https://sessionserver.mojang.com/session/minecraft/profile/${player}`).then(a => JSON.parse(a)).catch(e => null)
    return request(`https://api.mojang.com/users/profiles/minecraft/${player}`).then(a => JSON.parse(a)).catch(e => null)
}
/**
 * 
 * @param experience Value of experience as an integer 
 * @returns Wool Wars level/star
 */
function getWoolWarsStar(exp) {
    if(exp < 1000 ) return 1;
    else if(exp >= 1000 && exp < 3000) return 2; 
    else if(exp >= 3000 && exp < 6000) return 3;
    else if(exp >= 6000 && exp < 10000) return 4;
    else if(exp >= 10000 && exp < 15000) return 5;
    else {
      let alreadyStars = 6;
      let fullStar = Math.floor((exp - 15000) / 5000) + alreadyStars;
      return fullStar;
    }
}
register("command", (...args) => {
    if (!data.apiKey) {
		ChatLib.chat(`${config.prefix} &7No API Key set. Set one with &c/api new`)
		return
	}
    new Message(`${config.prefix} &7Getting stats for ${args[0]}&7...`).setChatLineId(3453457).chat()
    try {
        getMojangInfo(args[0]).then(mojangInfo => {
            try {
              var uuid = mojangInfo.id
            } catch (error) {
              if (error == `TypeError: Cannot read property "id" from null`)
              ChatLib.editChat(3453457, new Message(new TextComponent(`${config.prefix} &4Failed to fetch player data`).setHover("show_text", `&7This could be due to an invalid username, or that you are being rate limited.`)))
            }     
            getHypixelPlayer(uuid, data.apiKey).then(x => {
                let assists = x.player.stats.WoolGames.wool_wars.stats.assists
                let kills = x.player.stats.WoolGames.wool_wars.stats.kills
                let deaths = x.player.stats.WoolGames.wool_wars.stats.deaths
                let broken = x.player.stats.WoolGames.wool_wars.stats.blocks_broken
                let placed = x.player.stats.WoolGames.wool_wars.stats.wool_placed
                let games = x.player.stats.WoolGames.wool_wars.stats.games_played
                let wins = x.player.stats.WoolGames.wool_wars.stats.wins
                let selected = x.player.stats.WoolGames.wool_wars.selected_class
                let star = getWoolWarsStar(x.player.stats.WoolGames.progression.experience)
                let kd = (kills / deaths).toFixed(2)
                let wl = (wins / (games - wins)).toFixed(2)
                ChatLib.editChat(3453457, new Message(new TextComponent(`${config.prefix} &7Showing stats for ${args[0]} `), new TextComponent(`&d[&bView&d]`).setHover("show_text", `&6&nStats for ${args[0]} [${star}]&r\n\n&7Kills: &b${kills}\n&7Assists: &b${assists}\n&7Deaths: &b${deaths}\n&7K/D Ratio: &b${kd}\n\n&7Blocks Placed: &b${placed}\n&7Blocks Broken: &b${broken}\n\n&7Games Played: &b${games}\n&7Wins: &b${wins}\n&7W/L Ratio: &b${wl}\n\n&7Selected Class: &a${selected}`)))
            })
        })
    } catch (error) {
        ChatLib.chat(`${config.prefix} &7Something went wrong and failed to get player data! Error :&7${error}`)
    }
}).setCommandName("wwstats")

/**
 * 
 * @returns Name of map you are playing on as a string
 */
export const getMap = () => {
    for(let i = 0; i < Scoreboard.getLines().length; i++) {
        let line = Scoreboard.getLines()[i]
        if(line.getName().removeFormatting().includes('Map: ')) {
            splitMap = line.getName().split(" ")
            mapName = (splitMap[splitMap.length - 1]).removeFormatting()
            mapName = mapName.replace(/[^\x00-\x80]/g, "")
            return mapName.toString().removeFormatting()
        };
    };
}

/**
 * @param message Message containing the player and the stat, found at the end of the game.
 * @returns Player who got the most of a desired stat in a game.
 */
export const getMostPlayer = (m) => {
    splitm = m.split(" ")
    p = splitm[splitm.length - 3]
    return p
}

/**
 * @param message Message containing the player and the stat, found at the end of the game.
 * @returns Stat of the player with the most of a certain stat, as a value.
 */
 export const getMostStat = (s) => {
    splits = s.split(" ")
    st = splits[splits.length - 1]
    return st
}

/**
 * @param message Message containing the player and the stat
 * @returns Stat, as a value.
 */
 export const getStat = (s) => {
    splits = s.split(" ")
    st = splits[splits.length - 1]
    return st
}

export const emsg = [
    "&r&r&r                             &r&6Blocks broken &r&7- &r&r&r${a}&r",
    "&r&r&r                             &r&6Blocks placed &r&7- &r&r&r${b}&r",
    "&r&r&r                                 &r&6Damage &r&7- &r&r&r${c}&r"
]
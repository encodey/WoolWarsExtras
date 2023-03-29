import { data } from "./utils"
import config from "../config"
register("step", () => {
    if (!data.firstTime) return
    data.firstTime = false
    data.save()
    ChatLib.chat(`${config.prefix} &7Thanks for installing &dWool Wars Extras&7.`)
    ChatLib.chat("\n &a> &7This module contains many features for Hypixel Wool Wars.")
    ChatLib.chat(" &a> &7To get started, run &c/ww&7.")
    ChatLib.chat(" &a> &7If you want to quickly join a game, try &c/ww play&7.")
    ChatLib.chat(" &a> &7To check a players stats, try &c/wwstats &d{user}&7.")
    ChatLib.chat(" &a> &7If you have any issues or suggestions...")
    ChatLib.chat(" &a> &7dm &bencodey#0050 &7on discord!")
    ChatLib.chat(" &a> &7To get this message again, do &c/ww help")
}).setFps(5)
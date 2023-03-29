import config from "../../config"
import utils, { getMostPlayer, getMostStat, getStat, emsg } from "../../Utils/utils"
const centre = (text) => ChatLib.getCenteredText(text)
prevMsg = ""
mostbroken_player = ""
mostbroken_stat = ""
mostkills_player = ""
mostkills_stat = ""
mostplaced_player = ""
mostplaced_stat = ""

register("chat", (msg, event) => {
    let location = Scoreboard.getTitle().removeFormatting();
    let fmsg = (new Message(msg).getFormattedText()).toString();
    if (config.keystone_toggle && msg.includes(`You used your keystone ability:`)) { // keystone message
        cancel(event)
        ChatLib.chat((config.keystone_prefix ? `${config.prefix} ${config.keystone}` : config.keystone))
    }

    if (config.custom_startmsg && location.includes("WOOL WARS") && !utils.inWoolWars) { //custom start msg
        if (msg.includes(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)) {
            cancel(event)
            ChatLib.chat(ChatLib.getChatBreak("&b▬"))
        }
        if (msg.includes(`Welcome to WOOL WARS.`)) {
            cancel(event)
            ChatLib.chat(centre(`&7Welcome to &9Wool Wars`))
        }
        if (msg.includes(`Matches are best of 5.`)) {
            cancel(event)
        }
        if (msg.includes(`Place your team's color wool in the center to win the round!`)) {
            cancel(event)
            new Message(new TextComponent(centre(`&7Waiting for players...`))).chat()
        }
    }

    if (config.custom_endmsg && location.includes("WOOL WARS") && utils.inWoolWars) { //custom end message
        if (msg.includes(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)) cancel(event)
        if (msg.includes(`WOOL WARS`)) cancel(event)
        if (fmsg == "§r                                        §r") cancel(event)
        if (msg.includes("Wool Layer")) cancel(event)
        if (msg.includes("Wool Games Experience")) cancel(event)
        if (msg.includes(`Your team lost!`)) {
            cancel(event)
            ChatLib.chat(ChatLib.getChatBreak("&b▬"))
            ChatLib.chat(centre(`&dWool Wars &7- &cDefeat!`))
        }
        if (msg.includes(`Your team won!`)) {
            cancel(event)
            ChatLib.chat(ChatLib.getChatBreak("&b▬"))
            ChatLib.chat(centre(`&dWool Wars &7- &6Victory!`))
        }
        if (msg.includes("Most Kills")) {
            mostkills_player = getMostPlayer(msg)
            mostkills_stat = getMostStat(msg)
            cancel(event)
        }
        if (msg.includes("Most Wool Placed")) {
            mostplaced_player = getMostPlayer(msg)
            mostplaced_stat = getMostStat(msg)
            cancel(event)
        }
        if (msg.includes("Most Blocks Broken")) {
            mostbroken_player = getMostPlayer(msg)
            mostbroken_stat = getMostStat(msg)
            endMsg = new Message(new TextComponent("                 "), new TextComponent("&a&lMost Kills").setHover("show_text", `&a${mostkills_player}: &7${mostkills_stat}`), new TextComponent("     "), new TextComponent("&b&lMost Placed").setHover("show_text", `&b${mostplaced_player}: &7${mostplaced_stat}`), new TextComponent("     "), new TextComponent("&c&lMost Broken").setHover("show_text", `&c${mostbroken_player}: &7${mostbroken_stat}`)).chat()
            ChatLib.chat(ChatLib.getChatBreak("&b▬"))
            cancel(event)
        }
    }
    prevMsg = fmsg
}).setChatCriteria("${message}")
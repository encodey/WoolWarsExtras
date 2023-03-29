import config from "../../config";
import { colorCodes } from "../../Utils/utils"
register("command", (...args) => {
	switch(args[0]) {
		case "discord":
			discordMsg = new TextComponent(`${config.prefix} &7Click to join the discord!`).setClick(
				"open_url",
				"https://discord.gg/TU2Prz8N8U"
			).setHover(
				"show_text",
				"&aClick to open\n&7https://discord.gg/TU2Prz8N8U"
			)
			ChatLib.chat(discordMsg);
			break;
		case "play":
			ChatLib.chat(`${config.prefix} &7Joining a Wool Wars game!`);
			ChatLib.command("play wool_wool_wars_two_four")
			break;
		case "help": 
			ChatLib.chat(`${config.prefix} &dWool Wars Extras:`)
			ChatLib.chat("\n &a> &7This module contains many features for Hypixel Wool Wars.")
			ChatLib.chat(" &a> &7To get started, run &c/ww&7.")
			ChatLib.chat(" &a> &7If you want to quickly join a game, try &c/ww play&7.")
			ChatLib.chat(" &a> &7To check a players stats, try &c/wwstats &d{user}&7.")
			ChatLib.chat(" &a> &7If you have any issues or suggestions...")
			ChatLib.chat(" &a> &7dm &bencodey#0050 &7on discord!")
			ChatLib.chat(new TextComponent(" &a> &7Hover to view a list of commands.").setHover("show_text", `&6&nCommands: \n&r&6/ww &7- Opens the GUI\n&6/ww discord &7- Sends a link to the discord\n&6/ww help &7- Shows this help message\n&6/ww play &7- Puts you in a wool wars game\n&6/ww resetprefix &7- Resets the custom prefix\n&6/ww resetkeystone &7- Resets custom keystone message`))
			break;
		case "resetprefix":
			config.prefix = "&d[&bExtras&d]"
			ChatLib.chat(`${config.prefix} &7Reset Custom Prefix.`)
			break;
		case "resetkeystone":
			config.keystone = "&6You used your &cKEYSTONE"
			ChatLib.chat(`${config.prefix} &7Reset Custom Keystone Message.`)
			break;
		default:
			config.openGUI()
			break;
	}
}).setCommandName("ww")
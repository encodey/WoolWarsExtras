import config from "../config";
import { colorCodes } from "../Utils/utils"
register("command", (...args) => {
	switch(args[0]) {
		case "discord":
			discordMsg = new TextComponent(`&d[&bExtras&d] &7Click to join the discord!`).setClick(
				"open_url",
				"https://discord.gg/TU2Prz8N8U"
			).setHover(
				"show_text",
				"&aClick to open\n&7https://discord.gg/TU2Prz8N8U"
			)
			ChatLib.chat(discordMsg);
			break;
		case "play":
			ChatLib.chat("&d[&bExtras&d] &7Joining a Wool Wars game!");
			ChatLib.command("play wool_wool_wars_two_four")
			break;
		default:
			config.openGUI()
			break;
	}
}).setCommandName("ww")
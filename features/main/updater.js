import config from "../../config"
import request from "../../../requestV2"
checked = false;
changelogStr = ""
register("step", () => {
    if (!config.updater) return
    if (checked) return
    request("https://raw.githubusercontent.com/encodey/WoolWarsExtras/main/api.json").then(x => {
        x = JSON.parse(x.replace(new RegExp("    ", "g"), ""))
        let metadata = JSON.parse(FileLib.read("WoolWarsExtras", "metadata.json"))
        for(i in x.changelog) {
            if (x.changelog[i] == "undefined") return
            changelogStr += `\n- &a${x.changelog[i]}`
        }
        if (x.latestVersion !== metadata.version) {
            new Message(new TextComponent(`${config.prefix} &7An update for &dWool Wars Extras &7(&c${x.latestVersion}&7) &7is avaliable on github. Click to download.`).setClick("open_url", "https://github.com/encodey/WoolWarsExtras/releases").setHover("show_text", `&7Click to go to Github.`),
            new TextComponent(" &d[&8Changelog&r&d]").setHover("show_text", `&7Changelog for version &c${x.latestVersion}&7: ${changelogStr}`)
            ).chat()
        }
    })
    checked = true
}).setDelay(1)
import config from "../../config"
import utils from "../../utils/utils"

const DiscordRPC = Java.type("net.arikia.dev.drpc.DiscordRPC")
const DiscordEventHandlers = Java.type("net.arikia.dev.drpc.DiscordEventHandlers")
const DiscordRichPresence = Java.type("net.arikia.dev.drpc.DiscordRichPresence")
gotRound = false;
playing = false;
foundTeam = false;
enemyColor = "";
currentstate = "";
prestate = false;
b = 0;
score = "0-0"

// DISCORD RPC, THANKS TO BLOOM FOR LOTS OF THIS
class Discord {
    constructor() {
        this.initialize()
        this.reset()

        register("gameUnload", () => { DiscordRPC.discordShutdown() })
        register("WorldLoad", () => {
            gotRound = false;
            playing = false;
            foundTeam = false;
            enemyColor = "";
            currentstate = "";
            prestate = false;
            this.state = null
            this.details = null
        })

        register("tick", () => {
            if (utils.inWoolWars) {
                prestate = false;
                for(let i = 0; i < Scoreboard.getLines().length; i++) {
                    let line = Scoreboard.getLines()[i]
                    if(line.getName().removeFormatting().toString().includes('(You)')) {
                        team = line.toString().removeFormatting()[0]
                        if (team == "B") enemyColor = "Red"
                        else enemyColor = "Blue"
                    } 
                }
                // get score
                tabtitle = TabList.getHeader()
                score = (tabtitle.charAt(42) + "-" + tabtitle.charAt(54))
            }
            if (!utils.inWoolWars) {
                for(let i = 0; i < Scoreboard.getLines().length; i++) {
                    let line = Scoreboard.getLines()[i]
                    if(line.getName().removeFormatting().toString().includes("Players: ")) {
                        prestate = true;
                        splitplayers = line.getName().removeFormatting().replace(/[^\x00-\x80]/g, "")
                        players = (splitplayers[splitplayers.length - 3])
                    } 
                    if(line.getName().removeFormatting().toString().includes("Starting In")) {
                        players = "8"
                    }
                }
            }
        })
        register("tick", () => {
            if (utils.inWoolWars) { 
                for(let i = 0; i < Scoreboard.getLines().length; i++) {
                    let line = Scoreboard.getLines()[i]
                    if (line.getName().removeFormatting().toString().includes("Round: ")) {
                        splitround = line.getName().split(" ") 
                        round = (splitround[splitround.length - 1]).removeFormatting()
                        round = round.replace(/[^\x00-\x80]/g, "")
                        gotRound = true
                    }
                    if(line.getName().removeFormatting().toString().includes('State: ')) {
                        splitState = line.getName().split(" ") 
                        roundstate = (splitState[splitState.length - 2]).removeFormatting()
                        roundstate = roundstate.replace(/[^\x00-\x80]/g, "")
                        if (roundstate == "Pre") currentstate = "Pre-Round", playing = false
                        if (roundstate == "Active") playing = true
                        if (roundstate == "Round") currentstate = "Post-Round", playing = false
                    } 
                    if(!line.getName().removeFormatting().toString().includes('(You)') && line.getName().removeFormatting().toString().includes('Players: ') && line.getName().removeFormatting().toString().includes(enemyColor)) {
                        splitenemies = line.getName().removeFormatting().split(" ") 
                        b = (splitenemies[splitenemies.length - 2])
                        b = b.replace(/[^\x00-\x80]/g, "")
                    }
                }
            }
        })



        register("tick", () => {
            let metadata = JSON.parse(FileLib.read("WoolWarsExtras", "metadata.json"))
            if (!config.discord) return this.reset()
            if (!utils.inWoolWars && config.idlemsg == "") this.details = `Busy on Hypixel...`
            if (!utils.inWoolWars && config.idlemsg !== "") this.details = `${config.idlemsg}`
            if (utils.inWoolWars && !prestate) this.details = `In A Wool Wars Game | ${score}`
            if (!utils.inWoolWars && prestate) this.details = `Waiting For Players... (${players}/8)`
            this.state = gotRound ? `Round ${round} - ${currentstate}` : this.state 
            this.state = playing ? `Round ${round} | ${b} enemies remaining.` : this.state 
            this.bigImage = "logo"
            if (config.discord_version) this.bigImageText = `Wool Wars Extras ${metadata.version}`
            else this.bigImageText = `Wool Wars Extras`
            this.update()
        })
    }
    reset() {
        DiscordRPC.discordClearPresence()
        this.state = null
        this.details = null
        this.bigImage = null
        this.bigImageText = null
    }
    initialize() {
        const handler = new DiscordEventHandlers.Builder().build()
        DiscordRPC.discordInitialize("1035580225767096341", handler, true)
    }
    update() {
        let presence = new DiscordRichPresence.Builder(this.state)
        if (this.details) presence.setDetails(this.details)
        //if (this.state) presence.setDetails(this.state)
        if (this.bigImage) presence.setBigImage(this.bigImage, this.bigImageText)
        DiscordRPC.discordUpdatePresence(presence.build())
    }

    shutDown() {
        DiscordRPC.discordShutdown()
    }

    setState(state) { this.state = state }
    setDetails(details) { this.details = details }
    setBigImage(image) { this.bigImage = image }
    setBigImageText(text) { this.bigImageText = text }
}
export default new Discord()
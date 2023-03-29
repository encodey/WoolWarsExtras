// ================================================================
// Custom Config GUI
// ================================================================

import { guiCategory } from "./guiutils"
import { GuiSettings } from "./guisettings"

// create instance of Gui to be used, and a command to open it.
const extrasgui = new Gui()
register("command", () => {extrasgui.open()}).setCommandName("wwtestgui")

// Constants for coloring
const elementColor = Renderer.color(41, 41, 41)

// Create our GuiCategories
const stats = new guiCategory("Stats", extrasgui, GuiSettings)
const chat = new guiCategory("Chat", extrasgui, GuiSettings)
const mapblacklist = new guiCategory("Map Blacklist", extrasgui, GuiSettings)

// Create elements for the guiCategory
stats.addToggle(elementColor, 1, "Kill Log", "displays log of killed users")
stats.addToggle(elementColor, 2, "Death Log", "&cnull")
stats.addToggle(elementColor, 3, "K/D Log", "&cnull")

// chat
chat.addToggle(elementColor, 1, "Block Chat Log", "null")


ChatLib.chat(Object.keys(GuiSettings.config.mapblacklist)[0])

for (i=1;i<28;i++) {
    mapblacklist.addToggle(elementColor, i, Object.keys(GuiSettings.config.mapblacklist)[i-1], `Blacklists this map.`)
}
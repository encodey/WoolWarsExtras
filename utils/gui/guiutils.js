// ================================================================
// Utils file for GUI, including constructors for all GUI elements
// ================================================================

// Import PogObject, so it can be used for referencing
import PogObject from "../../../PogData"


// Utility functions 
const isWithin = (mx, my, x, y, width, height) => {if (my >= y && my <= y + height && mx >= x && mx <= x + width) {return true} else {return false}}
const filtered = (str) => {return str.toLowerCase().replace(" ", "")}


export class guiCategory {
    
    /**
     * Creates a new Gui Category from which other Gui objects can be implemented.
     * @param {String} name Name of the category.
     * @param {Gui} gui Gui to add the category to.
     * @param {PogObject} settings The settings PogObject where all data is stored.
     */

    constructor(name, gui, settings) {

        settings.save()
        // Set the position of the category

        this.y = settings.categories[name.toLowerCase().replace(" ", "")].y
        this.x = settings.categories[name.toLowerCase().replace(" ", "")].x

        // Declare the instance of a gui used by the category, as well as the settings object.
        this.gui = gui
        this.settings = settings

        // Setup some configuration values for the category
        this.showElements = true
        this.lastClickTime = 0
        this.beingMoved = false
        this.name = name

        // Create the children for this category, to ensure they all keep their position correctly.
        this.childObjects = []


        register("renderOverlay", () => {
            if (!gui.isOpen()) return
            let renderString = `${this.beingMoved ? "&bDragging..." : "&f" + name}`
            let centeredX = this.x + (Math.abs(90 - Renderer.getStringWidth(renderString)) / 2)
            Renderer.drawRect(Renderer.color(27, 27, 27), this.x, this.y, 90, 15)
            Renderer.drawStringWithShadow(renderString, centeredX, this.y + 3)
        })

        // Register when a guiCategory is clicked, and toggle its showElements property accordingly.
        register("guiMouseClick", (mx, my, mb, g, e) => {

            // If the middle mouse button is pressed, and within category boundries, move it
            if (mb == 2 && isWithin(mx, my, this.x, this.y, 90, 15)) { 
                this.beingMoved = !this.beingMoved
            }

            // Otherwise, if click is not right, return
            if (mb !== 1) return

            // If the specified gui is not currently open, return
            if (g.toString() !== gui.toString()) return

            // If the mouse is not within the boundry of the category, return
            if (!isWithin(mx, my, this.x, this.y, 90, 15)) return

            // If it has not been at least 0.2 seconds since last click, return (This is due to a bug that happens if you click too fast)
            if (Date.now() - this.lastClickTime < 200) return

            // Update last click time, and whether or not to show elements
            this.lastClickTime = Date.now()
            this.showElements = !this.showElements
        })


        // Register when a category is being dragged, and update its position
        register("dragged", (dx, dy, x, y) => {

            // Do not run if Gui closed
            if(!gui.isOpen()) return

            // Only run if this object is being moved
            if (!this.beingMoved) return

            // Update settings variables
            settings.categories[filtered(name)].x = x
            settings.categories[filtered(name)].y = y
            settings.save() 

            // Update internal variables
            this.x = x
            this.y = y   

            // Update Children
            this.childObjects.forEach(child => {
                child.setX(this.x)
                child.setY(this.y)
            })
        })
    }

    /**
     * Adds a guiToggle Element to the guiCategory
     */
    addToggle(color, pos, name, desc) {
        toggle = new guiToggle(color, this.x, this.y, pos, name, desc, this.gui, this)
        toggle.setPath([["config"], [`${this.name.toLowerCase().replace(" ", "")}`], [`${filtered(name)}`]])
        this.childObjects.push(toggle)
    }
}


/**
 * A togglable gui element that holds a boolean state of a variable used to enable/disable features.
 */
class guiToggle {
    /**
     * @param {{}} color  
     * @param {Float} x
     * @param {Float} y
     * @param {Int} pos
     * @param {Float} width
     * @param {Float} height
     * @param {String} name
     * @param {String} desc
     * @param {Gui} gui
     * @param {guiCategory} parentCategory
    */
    constructor (color, x, y, pos, name, desc, gui, parentCategory) {


        // declare vars
        let lastclicktime = 0
        let renderwidth = 90
        let renderheight = 12
        this.isShowingDesc = false

        // Set the offset in the Y direction based on position
        this.offset = 15 + (pos == 1 ? 0 : 12 * (pos - 1))

        // Declare the toggle's position (unoffset)
        this.x = x
        this.y = y 

        // Set Default variable path
        this.path = null

        register("renderOverlay", () => {
            if (!gui.isOpen()) return

            // Show Description, if enabled
            if (this.isShowingDesc) {
                Renderer.drawRect(color, this.x + renderwidth + 5, this.y + this.getOffext(), Renderer.getStringWidth(desc) + 10, renderheight)
                Renderer.drawStringWithShadow(desc, this.x + 7 + renderwidth, this.y + this.getOffext() + 2) 
                ChatLib.chat(`${this.getOffext()} offset - pos ${pos} : y value ${this.y}`)
            }

            let rendertext = `${parentCategory.settings[this.path[0]][this.path[1]][this.path[2]] ? "&a" : "&c"}${name}`
            if (!parentCategory.showElements) return
            Renderer.drawRect(color, this.x, this.y + this.getOffext(), renderwidth, renderheight)
            Renderer.drawStringWithShadow(rendertext, this.x + 2, this.y + this.getOffext() + 2)
        })

        // on mouse click register
        register("guiMouseClick", (mx, my, mb, g, e) => {
            if (!parentCategory.showElements) return

            if (mb == 1 && isWithin(mx, my, this.x, this.y + this.getOffext(), renderwidth, renderheight)) {
                this.isShowingDesc = !this.isShowingDesc
            }

            if (mb !== 0) return
            if (g.toString() !== gui.toString()) return
            if (!isWithin(mx, my, this.x, this.y + this.getOffext(), renderwidth, renderheight)) return
            if (Date.now() - lastclicktime < 200) return
            lastclicktime = Date.now()
            parentCategory.settings[this.path[0]][this.path[1]][this.path[2]] = !parentCategory.settings[this.path[0]][this.path[1]][this.path[2]]
            parentCategory.settings.save()
        })
        
    }

    getOffext() {
        return this.offset
    }

    setX(x) {
        this.x = x
    }

    setY(y) {
        this.y = y
    }

    /** @param {Array} path */ 
    setPath(path) {
        this.path = path
    }
}
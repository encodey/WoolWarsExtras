import {
    @ButtonProperty,
    @CheckboxProperty,
    Color,
    @ColorProperty,
    @PercentSliderProperty,
    @SelectorProperty,
    @SwitchProperty,
    @TextProperty,
    @Vigilant,
    @SliderProperty
} from '../Vigilance/index';

let blacklistedMaps = [];

@Vigilant("WoolWarsExtras", "WoolWarsExtras", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General", "Stats", "Map Blacklist", "Player Blacklist", "Round Timer", "Alerts", "Discord RPC", "Chat"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    },
    //getSubcategoryComparator: () => (x, y) => {
    //    const subcategories = ["Timer" , "GUI"];
    //    return subcategories.indexOf(x.getValue()[0].attributesExt.subcategory) - subcategories.indexOf(y.getValue()[0].attributesExt.subcategory);
    //},
    //getPropertyComparator: () => (c, d) => {
    //    const names = ["Enable Round Timer", "Select Round Timer", "Enable On Screen Timer", "Timer GUI Scale", "&4Move Timer GUI"];
    //    return names.indexOf(c.attributesExt.name) - names.indexOf(d.attributesExt.name);
    //},
})
class config {
    moveTimer = new Gui()

    // GENERAL

    @ButtonProperty({
        name: "&4Discord Link",
        description: "Send a link in chat to join the discord.",
        category: "General",
        placeholder: "Click To Join!",
    })
    getDiscord() {
        discordMsg = new TextComponent(`&d&l[EXTRAS] &r&c&lClick to join the discord!`).setClick(
            "open_url",
            "https://discord.gg/TU2Prz8N8U"
        ).setHover(
            "show_text",
            "&aClick to open\n&7https://discord.gg/TU2Prz8N8U"
        )
        ChatLib.chat(discordMsg);
    }

    // STATS

    @SwitchProperty({
        name: "Enable Kill Log",
        description: "Toggle the kill log at the end of a game.",
        category: "Stats",
    })
    killLog = false;

    @SwitchProperty({
        name: "Enable Death Log",
        description: "Toggle the death log at the end of a game.",
        category: "Stats",
    })
    deathLog = false;

    @SwitchProperty({
        name: "Enable KD Log",
        description: "Toggle the KD log at the end of a game.",
        category: "Stats",
    })
    kdLog = false;

    // BLACKLIST

    @SwitchProperty({
        name: "Enable Blacklist Maps",
        description: "General toggle to allow for blacklisting certain maps",
        category: "Map Blacklist",
        subcategory: "Map Blacklist", 
    })
    mapblacklist = false;
    blacklistedMaps = [];

    @ButtonProperty({
        name: "&4View Maps",
        description: "Send a link in chat to preview all the maps.",
        category: "Map Blacklist",
        placeholder: "Click To View!",
        subcategory: "Map Preview",
    })
    getMaps() {
        mapsMsg = new TextComponent(`&d&l[EXTRAS] &r&c&lClick to view maps!`).setClick(
            "open_url",
            "https://imgur.com/gallery/2yuozTe"
        ).setHover(
            "show_text",
            "&aClick to open\n&7https://imgur.com/gallery/2yuozTe"
        )
        ChatLib.chat(mapsMsg);
    }

    @CheckboxProperty({
        name: "Blacklist Belle",
        description: "Blacklist playing on this map.",
        category: "Map Blacklist",
        triggerActionOnInitialization: true,
        subcategory: "Map Blacklist",
    })
    belle = false;

    @CheckboxProperty({
        name: "Blacklist District",
        description: "Blacklist playing on this map.",
        category: "Map Blacklist",
        subcategory: "Map Blacklist",
    })
    district = false;

    @CheckboxProperty({
        name: "Blacklist Blocks",
        description: "Blacklist playing on this map.",
        category: "Map Blacklist",
        subcategory: "Map Blacklist",
    })
    blocks = false;

    @CheckboxProperty({
        name: "Blacklist Fracture",
        description: "Blacklist playing on this map.",
        category: "Map Blacklist",
        subcategory: "Map Blacklist",
    })
    fracture = false;

    @CheckboxProperty({
        name: "Blacklist Histoire",
        description: "Blacklist playing on this map.",
        category: "Map Blacklist",
        subcategory: "Map Blacklist",
    })
    histoire = false;

    @CheckboxProperty({
        name: "Blacklist Lava",
        description: "Blacklist playing on this map.",
        category: "Map Blacklist",
        subcategory: "Map Blacklist",
    })
    lava = false;

    @CheckboxProperty({
        name: "Blacklist Patio",
        description: "Blacklist playing on this map.",
        category: "Map Blacklist",
        subcategory: "Map Blacklist",
    })
    patio = false;

    @CheckboxProperty({
        name: "Blacklist Plummet",
        description: "Blacklist playing on this map.",
        category: "Map Blacklist",
        subcategory: "Map Blacklist",
    })
    plummet = false;

    @CheckboxProperty({
        name: "Blacklist Steel Works",
        description: "Blacklist playing on this map.",
        category: "Map Blacklist",
        subcategory: "Map Blacklist",
    })
    steel_works = false;

    @CheckboxProperty({
        name: "Blacklist Sun Shrine",
        description: "Blacklist playing on this map.",
        category: "Map Blacklist",
        subcategory: "Map Blacklist",
    })
    shrine = false;

    @CheckboxProperty({
        name: "Blacklist Anubis",
        description: "Blacklist playing on this map.",
        category: "Map Blacklist",
        subcategory: "Map Blacklist",
    })
    anubis = false;

    @CheckboxProperty({
        name: "Blacklist Arches",
        description: "Blacklist playing on this map.",
        category: "Map Blacklist",
        subcategory: "Map Blacklist",
    })
    arches = false;

    @CheckboxProperty({
        name: "Blacklist Aztec",
        description: "Blacklist playing on this map.",
        category: "Map Blacklist",
        subcategory: "Map Blacklist",
    })
    aztec = false;

    @CheckboxProperty({
        name: "Blacklist Courtyard",
        description: "Blacklist playing on this map.",
        category: "Map Blacklist",
        subcategory: "Map Blacklist",
    })
    courtyard = false;

    @CheckboxProperty({
        name: "Blacklist Dust",
        description: "Blacklist playing on this map.",
        category: "Map Blacklist",
        subcategory: "Map Blacklist",
    })
    dust = false;

    @CheckboxProperty({
        name: "Blacklist Factory",
        description: "Blacklist playing on this map.",
        category: "Map Blacklist",
        subcategory: "Map Blacklist",
    })
    factory = false;

    @CheckboxProperty({
        name: "Blacklist Galactic",
        description: "Blacklist playing on this map.",
        category: "Map Blacklist",
        subcategory: "Map Blacklist",
    })
    galactic = false;

    @CheckboxProperty({
        name: "Blacklist Hilltop",
        description: "Blacklist playing on this map.",
        category: "Map Blacklist",
        subcategory: "Map Blacklist",
    })
    hilltop = false;

    @CheckboxProperty({
        name: "Blacklist Kingspass",
        description: "Blacklist playing on this map.",
        category: "Map Blacklist",
        subcategory: "Map Blacklist",
    })
    kingspass = false;

    @CheckboxProperty({
        name: "Blacklist Retro",
        description: "Blacklist playing on this map.",
        category: "Map Blacklist",
        subcategory: "Map Blacklist",
    })
    retro = false;

    @CheckboxProperty({
        name: "Blacklist Ruin",
        description: "Blacklist playing on this map.",
        category: "Map Blacklist",
        subcategory: "Map Blacklist",
    })
    ruin = false;

    @CheckboxProperty({
        name: "Blacklist Shipment",
        description: "Blacklist playing on this map.",
        category: "Map Blacklist",
        subcategory: "Map Blacklist",
    })
    shipment = false;

    @CheckboxProperty({
        name: "Blacklist Stoneguard",
        description: "Blacklist playing on this map.",
        category: "Map Blacklist",
        subcategory: "Map Blacklist",
    })
    stoneguard = false;

    @CheckboxProperty({
        name: "Blacklist Temple",
        description: "Blacklist playing on this map.",
        category: "Map Blacklist",
        subcategory: "Map Blacklist",
    })
    temple = false;

    @CheckboxProperty({
        name: "Blacklist Tumble",
        description: "Blacklist playing on this map.",
        category: "Map Blacklist",
        subcategory: "Map Blacklist",
    })
    tumble = false;

    @CheckboxProperty({
        name: "Blacklist Underworld",
        description: "Blacklist playing on this map.",
        category: "Map Blacklist",
        subcategory: "Map Blacklist",
    })
    underworld = false;

    // PLAYER BLACKLIST

    @SwitchProperty({
        name: "Enable Blacklist Players",
        description: "General toggle to allow for blacklisting certain players.",
        category: "Player Blacklist",
    })
    playerblacklist = false;

    @TextProperty({
        name: 'Blacklisted Player Names',
        description: 'Enter the names of players you would like to blacklist. Seperate Names with a comma.',
        category: 'Player Blacklist',
        placeholder: 'No Blacklisted Players',
        triggerActionOnInitialization: false,
    })
    blacklistedPlayers = "";


    // TIMER

    @SwitchProperty({
        name: "Enable Round Timer",
        description: "Toggles the round timer",
        category: "Round Timer",
        subcategory: "Timer",
    })
    timer = false;

    @SelectorProperty({
        name: "Select Round Timer",
        description: "Select when to send the round times",
        category: "Round Timer",
        subcategory: "Timer",
        options: ["After Round", "After Game"],
    })
    timer_type = 0;

    @SwitchProperty({
        name: "Enable On Screen Timer",
        description: "Shows the round timer on screen. Requires round timer to be enabled",
        category: "Round Timer",
        subcategory: "GUI",
    })
    timer_gui = false;

    @ButtonProperty({
        name: "&4Move Timer GUI",
        description: "Change the location of the round timer",
        category: "Round Timer",
        subcategory: "GUI",
        placeholder: "Click Here!",
    })
    timerguiMove() {
        this.moveTimer.open()
    };

    @SliderProperty({
        name: "Timer GUI Scale",
        description: "Scale of the timer",
        category: "Round Timer",
        subcategory: "GUI",
        min: 10,
        max: 100,
    })
    timer_scale = 50;

    // ALERTS

    @SwitchProperty({
        name: "Last Player Alive Alert",
        description: "Shows an alert on screen when you are the last player alive on your team",
        category: "Alerts",
        subcategory: "Last Player",
    })
    last_player = false;

    @SelectorProperty({
        name: "Last Player Alive Alert Color",
        description: 'Pick a color for the Last Player Alive alert',
        category: "Alerts",
        subcategory: 'Last Player',
        options: ["§4Dark Red", "§cRed", "§6Gold", "§eYellow", "§2Dark Green", "§aGreen", "§bAqua", "§3Dark Aqua", "§1Dark Blue", "§9Blue", "§dLight Purple", "§5Dark Purple", "§fWhite", "§7Gray", "§8Dark Grey", "§0Black"],
    })
    last_player_color = 1;

    @SwitchProperty({
        name: "One Enemy Remaining Alert",
        description: "Shows an alert on screen when there is 1 enemy left",
        category: "Alerts",
        subcategory: "One Enemy Remaining",
    })
    last_enemy = false;

    @SelectorProperty({
        name: "One Enemy Remaining Alert Color",
        description: 'Pick a color for the One Enemy Remaining alert',
        category: "Alerts",
        subcategory: 'One Enemy Remaining',
        options: ["§4Dark Red", "§cRed", "§6Gold", "§eYellow", "§2Dark Green", "§aGreen", "§bAqua", "§3Dark Aqua", "§1Dark Blue", "§9Blue", "§dLight Purple", "§5Dark Purple", "§fWhite", "§7Gray", "§8Dark Grey", "§0Black"],
    })
    last_enemy_color = 9;

    @SelectorProperty({
        name: "Team Block Broken Alert Color",
        description: 'Pick a color for the Enemy Breaking Mid alert',
        category: "Alerts",
        subcategory: 'Team Broken',
        options: ["§4Dark Red", "§cRed", "§6Gold", "§eYellow", "§2Dark Green", "§aGreen", "§bAqua", "§3Dark Aqua", "§1Dark Blue", "§9Blue", "§dLight Purple", "§5Dark Purple", "§fWhite", "§7Gray", "§8Dark Grey", "§0Black"],
    })
    break_alert_color = 2;

    @SwitchProperty({
        name: "Alert When Team Block is Broken",
        description: "Shows an alert on screen when one of your team blocks is broken",
        category: "Alerts",
        subcategory: "Team Broken",
    })
    break_alert = false;

    @SwitchProperty({
        name: "Alert When Enemy Block is Placed",
        description: "Shows an alert on screen when an enemy blocks is placed",
        category: "Alerts",
        subcategory: "Enemy Placing",
    })
    place_alert = false;

    @SelectorProperty({
        name: "Enemy Placing Alert Color",
        description: 'Pick a color for the enemy placing alert',
        category: "Alerts",
        subcategory: 'Enemy Placing',
        options: ["§4Dark Red", "§cRed", "§6Gold", "§eYellow", "§2Dark Green", "§aGreen", "§bAqua", "§3Dark Aqua", "§1Dark Blue", "§9Blue", "§dLight Purple", "§5Dark Purple", "§fWhite", "§7Gray", "§8Dark Grey", "§0Black"],
    })
    place_alert_color = 2;

    // chat

    @SwitchProperty({
        name: "All Mid Updates Chat Messages",
        description: "Sends a chat message for every time a block at mid is changed",
        category: "Chat",
        subcategory: "Extras",
    })
    all_updates = false;

    // rpc

    @SwitchProperty({
        name: "Enable Discord RPC",
        description: "Toggles Discord RPC",
        category: "Discord RPC"
    })
    discord = true;

    @TextProperty({
        name: 'Idle Status Message',
        description: 'Enter what you would like to display on the Discord RPC when you are not in a game',
        category: 'Discord RPC',
    })
    idlemsg = "";

    constructor() {
        this.initialize(this)
        this.setCategoryDescription("General", 
        "&d&l&nWool Wars Extras\n" + 
        "\n&aThis module contains many feafures including:\n" +
        "&7- Stats Logger for games\n" +
        "&7- Blacklist certain players and maps\n" +
        "&7- Round Timers\n" +
        "&7- Last player/1 enemy remaining alerts\n" +
        "&7- Discord RPC\n" +
        "&7- Middle block tracking\n" +
        "&7 With more coming soon...\n" +
        "\n&a /wwstats &7{username} &ato check a players stats.\n" +
        "\n&c&lMade by encodey#0050")
        this.addDependency("Enable Death Log", "Enable Kill Log")
        this.addDependency("Enable KD Log", "Enable Kill Log")
        this.addDependency("Blacklist Belle", "Enable Blacklist Maps")
        this.addDependency("Blacklist Blocks", "Enable Blacklist Maps")
        this.addDependency("Blacklist District", "Enable Blacklist Maps")
        this.addDependency("Blacklist Fracture", "Enable Blacklist Maps")
        this.addDependency("Blacklist Histoire", "Enable Blacklist Maps")
        this.addDependency("Blacklist Lava", "Enable Blacklist Maps")
        this.addDependency("Blacklist Patio", "Enable Blacklist Maps")
        this.addDependency("Blacklist Plummet", "Enable Blacklist Maps")
        this.addDependency("Blacklist Steel Works", "Enable Blacklist Maps")
        this.addDependency("Blacklist Sun Shrine", "Enable Blacklist Maps")
        this.addDependency("Blacklist Anubis", "Enable Blacklist Maps")
        this.addDependency("Blacklist Arches", "Enable Blacklist Maps")
        this.addDependency("Blacklist Aztec", "Enable Blacklist Maps")
        this.addDependency("Blacklist Courtyard", "Enable Blacklist Maps")
        this.addDependency("Blacklist Dust", "Enable Blacklist Maps")
        this.addDependency("Blacklist Factory", "Enable Blacklist Maps")
        this.addDependency("Blacklist Galactic", "Enable Blacklist Maps")
        this.addDependency("Blacklist Hilltop", "Enable Blacklist Maps")
        this.addDependency("Blacklist Kingspass", "Enable Blacklist Maps")
        this.addDependency("Blacklist Retro", "Enable Blacklist Maps")
        this.addDependency("Blacklist Ruin", "Enable Blacklist Maps")
        this.addDependency("Blacklist Shipment", "Enable Blacklist Maps")
        this.addDependency("Blacklist Stoneguard", "Enable Blacklist Maps")
        this.addDependency("Blacklist Temple", "Enable Blacklist Maps")
        this.addDependency("Blacklist Tumble", "Enable Blacklist Maps")
        this.addDependency("Blacklist Underworld", "Enable Blacklist Maps")
        this.addDependency("Blacklisted Player Names", "Enable Blacklist Players")
        this.addDependency("Select Round Timer" , "Enable Round Timer")
        this.addDependency("&4Move Timer GUI", "Enable On Screen Timer")
        this.addDependency("Timer GUI Scale", "Enable On Screen Timer")
        this.addDependency("Last Player Alive Alert Color", "Last Player Alive Alert")
        this.addDependency("One Enemy Remaining Alert Color", "One Enemy Remaining Alert")
        this.addDependency("Idle Status Message", "Enable Discord RPC")
        this.addDependency("Enemy Placing Alert Color", "Alert When Enemy Block is Placed")
        this.addDependency("Team Block Broken Alert Color", "Alert When Team Block is Broken")
    }
}
export default new config()
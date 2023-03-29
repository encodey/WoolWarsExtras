// push/pull maps from array
import config from "../config";

register("step", () =>{
	if (config.belle && !config.blacklistedMaps.includes("Belle")) {
        config.blacklistedMaps.push("Belle")
    } else if (!config.belle && config.blacklistedMaps.includes("Belle")) {
		index = config.blacklistedMaps.indexOf("Belle")
		if (index > -1) {
			config.blacklistedMaps.splice(index, 1)
		}
	}
    if (config.district && !config.blacklistedMaps.includes("District")) {
        config.blacklistedMaps.push("District")
    } else if (!config.district && config.blacklistedMaps.includes("District")) {
		index = config.blacklistedMaps.indexOf("District")
		if (index > -1) {
			config.blacklistedMaps.splice(index, 1)
		}
	}
    if (config.blocks && !config.blacklistedMaps.includes("Blocks")) {
        config.blacklistedMaps.push("Blocks")
    } else if (!config.blocks && config.blacklistedMaps.includes("Blocks")) {
		index = config.blacklistedMaps.indexOf("Blocks")
		if (index > -1) {
			config.blacklistedMaps.splice(index, 1)
		}
	}
	if (config.shrine && !config.blacklistedMaps.includes("Shrine")) {
        config.blacklistedMaps.push("Shrine")
    } else if (!config.shrine && config.blacklistedMaps.includes("Shrine")) {
		index = config.blacklistedMaps.indexOf("Shrine")
		if (index > -1) {
			config.blacklistedMaps.splice(index, 1)
		}
	}
	if (config.fracture && !config.blacklistedMaps.includes("Fracture")) {
        config.blacklistedMaps.push("Fracture")
    } else if (!config.fracture && config.blacklistedMaps.includes("Fracture")) {
		index = config.blacklistedMaps.indexOf("Fracture")
		if (index > -1) {
			config.blacklistedMaps.splice(index, 1)
		}
	}
	if (config.histoire && !config.blacklistedMaps.includes("Histoire")) {
        config.blacklistedMaps.push("Histoire")
    } else if (!config.histoire && config.blacklistedMaps.includes("Histoire")) {
		index = config.blacklistedMaps.indexOf("Histoire")
		if (index > -1) {
			config.blacklistedMaps.splice(index, 1)
		}
	}
	if (config.lava && !config.blacklistedMaps.includes("Lava")) {
        config.blacklistedMaps.push("Lava")
    } else if (!config.lava && config.blacklistedMaps.includes("Lava")) {
		index = config.blacklistedMaps.indexOf("Lava")
		if (index > -1) {
			config.blacklistedMaps.splice(index, 1)
		}
	}
	if (config.patio && !config.blacklistedMaps.includes("Patio")) {
        config.blacklistedMaps.push("Patio")
    } else if (!config.patio && config.blacklistedMaps.includes("Patio")) {
		index = config.blacklistedMaps.indexOf("Patio")
		if (index > -1) {
			config.blacklistedMaps.splice(index, 1)
		}
	}
	if (config.plummet && !config.blacklistedMaps.includes("Plummet")) {
        config.blacklistedMaps.push("Plummet")
    } else if (!config.plummet && config.blacklistedMaps.includes("Plummet")) {
		index = config.blacklistedMaps.indexOf("Plummet")
		if (index > -1) {
			config.blacklistedMaps.splice(index, 1)
		}
	}
	if (config.steel_works && !config.blacklistedMaps.includes("Works")) {
        config.blacklistedMaps.push("Works")
    } else if (!config.steel_works && config.blacklistedMaps.includes("Works")) {
		index = config.blacklistedMaps.indexOf("Works")
		if (index > -1) {
			config.blacklistedMaps.splice(index, 1)
		}
	}
	if (config.anubis && !config.blacklistedMaps.includes("Anubis")) {
        config.blacklistedMaps.push("Anubis")
    } else if (!config.anubis && config.blacklistedMaps.includes("Anubis")) {
		index = config.blacklistedMaps.indexOf("Anubis")
		if (index > -1) {
			config.blacklistedMaps.splice(index, 1)
		}
	}
	if (config.arches && !config.blacklistedMaps.includes("Arches")) {
        config.blacklistedMaps.push("Arches")
    } else if (!config.arches && config.blacklistedMaps.includes("Arches")) {
		index = config.blacklistedMaps.indexOf("Arches")
		if (index > -1) {
			config.blacklistedMaps.splice(index, 1)
		}
	}
	if (config.aztec && !config.blacklistedMaps.includes("Aztec")) {
        config.blacklistedMaps.push("Aztec")
    } else if (!config.aztec && config.blacklistedMaps.includes("Aztec")) {
		index = config.blacklistedMaps.indexOf("Aztec")
		if (index > -1) {
			config.blacklistedMaps.splice(index, 1)
		}
	}
	if (config.courtyard && !config.blacklistedMaps.includes("Courtyard")) {
        config.blacklistedMaps.push("Courtyard")
    } else if (!config.courtyard && config.blacklistedMaps.includes("Courtyard")) {
		index = config.blacklistedMaps.indexOf("Courtyard")
		if (index > -1) {
			config.blacklistedMaps.splice(index, 1)
		}
	}
	if (config.dust && !config.blacklistedMaps.includes("Dust")) {
        config.blacklistedMaps.push("Dust")
    } else if (!config.dust && config.blacklistedMaps.includes("Dust")) {
		index = config.blacklistedMaps.indexOf("Dust")
		if (index > -1) {
			config.blacklistedMaps.splice(index, 1)
		}
	}
	if (config.kingspass && !config.blacklistedMaps.includes("Pass")) {
        config.blacklistedMaps.push("Pass")
    } else if (!config.kingspass && config.blacklistedMaps.includes("Pass")) {
		index = config.blacklistedMaps.indexOf("Pass")
		if (index > -1) {
			config.blacklistedMaps.splice(index, 1)
		}
	}
	if (config.factory && !config.blacklistedMaps.includes("Factory")) {
        config.blacklistedMaps.push("Factory")
    } else if (!config.factory && config.blacklistedMaps.includes("Factory")) {
		index = config.blacklistedMaps.indexOf("Factory")
		if (index > -1) {
			config.blacklistedMaps.splice(index, 1)
		}
	}
	if (config.galactic && !config.blacklistedMaps.includes("Galactic")) {
        config.blacklistedMaps.push("Galactic")
    } else if (!config.galactic && config.blacklistedMaps.includes("Galactic")) {
		index = config.blacklistedMaps.indexOf("Galactic")
		if (index > -1) {
			config.blacklistedMaps.splice(index, 1)
		}
	}
	if (config.hilltop && !config.blacklistedMaps.includes("Hilltop")) {
        config.blacklistedMaps.push("Hilltop")
    } else if (!config.hilltop && config.blacklistedMaps.includes("Hilltop")) {
		index = config.blacklistedMaps.indexOf("Hilltop")
		if (index > -1) {
			config.blacklistedMaps.splice(index, 1)
		}
	}
	if (config.retro && !config.blacklistedMaps.includes("Retro")) {
        config.blacklistedMaps.push("Retro")
    } else if (!config.retro && config.blacklistedMaps.includes("Retro")) {
		index = config.blacklistedMaps.indexOf("Retro")
		if (index > -1) {
			config.blacklistedMaps.splice(index, 1)
		}
	}
	if (config.ruin && !config.blacklistedMaps.includes("Ruin")) {
        config.blacklistedMaps.push("Ruin")
    } else if (!config.ruin && config.blacklistedMaps.includes("Ruin")) {
		index = config.blacklistedMaps.indexOf("Ruin")
		if (index > -1) {
			config.blacklistedMaps.splice(index, 1)
		}
	}
	if (config.shipment && !config.blacklistedMaps.includes("Shipment")) {
        config.blacklistedMaps.push("Shipment")
    } else if (!config.shipment && config.blacklistedMaps.includes("Shipment")) {
		index = config.blacklistedMaps.indexOf("Shipment")
		if (index > -1) {
			config.blacklistedMaps.splice(index, 1)
		}
	}
	if (config.stoneguard && !config.blacklistedMaps.includes("Stoneguard")) {
        config.blacklistedMaps.push("Stoneguard")
    } else if (!config.stoneguard && config.blacklistedMaps.includes("Stoneguard")) {
		index = config.blacklistedMaps.indexOf("Stoneguard")
		if (index > -1) {
			config.blacklistedMaps.splice(index, 1)
		}
	}
	if (config.temple && !config.blacklistedMaps.includes("Temple")) {
        config.blacklistedMaps.push("Temple")
    } else if (!config.temple && config.blacklistedMaps.includes("Temple")) {
		index = config.blacklistedMaps.indexOf("Temple")
		if (index > -1) {
			config.blacklistedMaps.splice(index, 1)
		}
	}
	if (config.tumble && !config.blacklistedMaps.includes("Tumble")) {
        config.blacklistedMaps.push("Tumble")
    } else if (!config.tumble && config.blacklistedMaps.includes("Tumble")) {
		index = config.blacklistedMaps.indexOf("Tumble")
		if (index > -1) {
			config.blacklistedMaps.splice(index, 1)
		}
	}
	if (config.underworld && !config.blacklistedMaps.includes("Underworld")) {
        config.blacklistedMaps.push("Underworld")
    } else if (!config.underworld && config.blacklistedMaps.includes("Underworld")) {
		index = config.blacklistedMaps.indexOf("Underworld")
		if (index > -1) {
			config.blacklistedMaps.splice(index, 1)
		}
	}
}).setDelay(1)
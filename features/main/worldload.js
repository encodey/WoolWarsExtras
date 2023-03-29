import utils from "../../Utils/utils";

register("WorldLoad", () => {
	utils.usersCreated = false;
	utils.inWoolWars = false;
	utils.playerWarning = false;
	utils.blacklistedInLobby = []
	utils.foundMap = false;
	utils.currentMapBlacklisted = false;
	utils.roundTimes.clear();
	utils.inLobby = false;
});
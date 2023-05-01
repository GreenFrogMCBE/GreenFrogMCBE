module.exports = /** @type {const} */ ({
	/** Displays no kick message, sending this means that the login data is validated and correct */
	PLAYER_SUCCESS: "login_success",
	/** Displays no kick message, spawns the player */
	PLAYER_SPAWN: "player_spawn",
	/** Displays "Could not connect: Outdated client!" */
	FAILED_CLIENT: "failed_client",
	/** Displays "Could not connect: Outdated server!" */
	FAILED_SERVER: "failed_server",
	/** EDU only, but supported in GreenFrog, displays "Unable to connect to world. Your school does not have access to this server." */
	FAILED_SCHOOL_ACCESS_DENIED: "failed_invalid_tenant",
	/** EDU only, but supported in GreenFrog, displays "The server is not running Minecraft: Education Edition. Failed to connect." */
	FAILED_EDUCATION_EDITION_REQUIRED: "failed_edu_vanilla",
	/** Displays "The server is running an incompatible edition of Minecraft. Failed to connect."*/
	FAILED_VANILLA_BEDROCK_REQUIRED: "failed_edu_vanilla",
	/** Displays "Wow this server is popular! Check back later to see if space opens up." */
	FAILED_SERVER_FULL: "failed_server_full",
});

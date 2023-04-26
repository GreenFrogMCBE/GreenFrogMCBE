/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 *
 * Copyright 2023 andriycraft
 * Github: https://github.com/andriycraft/GreenFrogMCBE
 */
module.exports = /** @type {const} */ ({
	/** Displays no kick message, sending this means that the login data is validated and correct */
	LOGINSUCCESS: "login_success",
	/** Displays no kick message, spawns the player */
	PLAYERSPAWN: "player_spawn",
	/** Displays "Could not connect: Outdated client!" */
	FAILEDCLIENT: "failed_client",
	/** Displays "Could not connect: Outdated server!" */
	FAILEDSERVER: "failed_server",
	/** EDU only, but supported in GreenFrog, displays "The server is not running Minecraft: Education Edition. Failed to connect." */
	FAILEDNOSCHOOLACCESS: "failed_invalid_tenant",
	/** EDU only, but supported in GreenFrog, displays "The server is running an incompatible edition of Minecraft. Failed to connect." */	
	FAILEDEDUREQUIRED: "failed_edu_vanilla",
	/** Displays "The server is running an incompatible edition of Minecraft. Failed to connect."*/	
	FAILEDVANILLAREQUIRED: "failed_edu_vanilla",
	/** Displays "Wow this server is popular! Check back later to see if space opens up." */
	FAILEDSERVERFULL: "failed_server_full"
});

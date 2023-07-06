/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 * The content of this file is licensed using the CC-BY-4.0 license
 * which requires you to agree to its terms if you wish to use or make any changes to it.
 *
 * @license CC-BY-4.0
 * @link Github - https://github.com/andriycraft/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
export = PlayerJoinHandler;
declare class PlayerJoinHandler {
	/**
	 * Executes when a player joins the server.
	 *
	 * @param {Client} client - The client joining the server.
	 */
	onPlayerJoin(client: Client): Promise<void>;
	/**
	 * Validates the username of the client
	 *
	 * @param {Client} client
	 */
	validateUsername(client: Client): void;
	/**
	 * Setups events for the client
	 *
	 * @param {Client} client
	 */
	setupEvents(client: Client): Promise<void>;
	/**
	 * Initialises the player.
	 *
	 * @param {Client} client - The client to initialize.
	 * @returns {Promise<void>}
	 */
	initPlayer(client: Client): Promise<void>;
	/**
	 * Sets up the client properties.
	 *
	 * @param {Client} client - The client to set up properties for.
	 */
	setupClientProperties(client: Client): void;
	/**
	 * Sets up client intervals.
	 *
	 * @param {Client} client - The client to set up intervals for.
	 */
	setupClientIntervals(client: Client): void;
	/**
	 * Adds the player to the player list.
	 *
	 * @param {Client} client - The client to add to the player list.
	 */
	addPlayer(client: Client): void;
	/**
	 * Handles the case when the maximum number of players is reached.
	 *
	 * @param {Client} client - The client to check against the maximum player count.
	 */
	handleMaxPlayers(client: Client): void;
	/**
	 * Handles the version mismatch between the client and server.
	 *
	 * @param {Client} client - The client to check the version for.
	 */
	handleVersionMismatch(client: Client): void;
	/**
	 * Sends the response pack info to the client.
	 *
	 * @param {Client} client - The client to send the response pack info to.
	 */
	sendResponsePackInfo(client: Client): void;
	/**
	 * Emits the player join event.
	 *
	 * @param {Client} client - The client that joined the server.
	 */
	emitPlayerJoinEvent(client: Client): void;
}

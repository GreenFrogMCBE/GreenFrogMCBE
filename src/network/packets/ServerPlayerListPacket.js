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
const PlayerListTypes = require("./types/PlayerList");

let username;
let uuid;
let id = 0;
let type = PlayerListTypes.ADD;
let xboxid;

const PacketConstructor = require("./PacketConstructor");

class ServerPlayerListPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {string}
	 */
	getPacketName() {
		return "player_list";
	}

	/**
	 * Returns if the packet is critical?
	 * @returns {boolean}
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Returns the player username
	 * @returns {string} The player username
	 */
	getUsername() {
		return username;
	}

	/**
	 * Sets the player username
	 * @param {string} new_username The player username
	 */
	setUsername(new_username) {
		username = new_username;
	}

	/**
	 * Returns the ID of the player
	 * @returns {number} The ID of the player
	 */
	getID() {
		return id;
	}

	/**
	 * Sets the ID of the player
	 * @param new_id
	 */
	setID(new_id) {
		id = new_id;
	}

	/**
	 * Returns the type of the packet
	 * @returns {PlayerListTypes} The type
	 */
	getType() {
		return type;
	}

	/**
	 * Returns the UUID of the player
	 * @returns {UUID} The UUID of the player
	 */
	getUUID() {
		return uuid;
	}

	/**
	 * Sets the UUID of the player
	 * @param {UUID} new_uuid The UUID to set for the player
	 */
	setUUID(new_uuid) {
		uuid = new_uuid;
	}

	/**
	 * Sets the type
	 * @param {PlayerListTypes} new_type The type. Valid types are ADD or REMOVE
	 */
	setType(new_type) {
		type = new_type;
	}

	/**
	 * Sets the xbox id of user
	 * @param {string} id
	 */
	setXboxID(new_id) {
		xboxid = new_id;
	}

	/**
	 * Returns the xbox id of user
	 * @returns {string}
	 */
	getXboxID() {
		return xboxid;
	}

	/**
	 * Sends the packet to the client
	 * @param {Client} client
	 */
	writePacket(client) {
		let data = null;

		if (this.getType() === PlayerListTypes.REMOVE) {
			data = {
				records: {
					type: PlayerListTypes.REMOVE,
					records_count: 1,
					records: [
						{
							uuid: this.getUUID(),
						},
					],
				},
			};
		} else {
			data = {
				records: {
					type: PlayerListTypes.ADD,
					records_count: 1,
					records: [
						{
							uuid: this.getUUID(),
							entity_unique_id: "-" + this.getID(),
							username: this.getUsername(),
							xbox_user_id: this.getXboxID(),
							platform_chat_id: "",
							build_platform: 7,
							skin_data: require("../../internalResources/skinData.json"),
							is_teacher: false,
							is_host: false,
						},
					],
					verified: [true],
				},
			};
		}

		client.queue(this.getPacketName(), data);
	}
}

module.exports = ServerPlayerListPacket;

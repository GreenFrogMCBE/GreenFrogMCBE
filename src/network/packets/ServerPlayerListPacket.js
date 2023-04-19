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
	 * Returns if the packet is critical??
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
	getId() {
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
	getUuid() {
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
				recoordinates: {
					type: PlayerListTypes.REMOVE,
					recoordinates_count: 1,
					recoordinates: [
						{
							uuid: this.getUuid(),
						},
					],
				},
			};
		} else {
			data = {
				recoordinates: {
					type: PlayerListTypes.ADD,
					recoordinates_count: 1,
					recoordinates: [
						{
							uuid: this.getUuid(),
							entity_unique_id: "-" + this.getId(),
							username: this.getUsername(),
							xbox_user_id: this.getXboxID(),
							platform_chat_id: "",
							build_platform: 7,
							skin_data: require("./res/skinData.json"),
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

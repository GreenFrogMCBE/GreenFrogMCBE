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
const PlayerInfo = require("../../api/PlayerInfo");
const PlayerListTypes = require("./types/PlayerList");

let username = "unknown";
let uuid = "";
let id = 0;
let type = PlayerListTypes.ADD;

const PacketConstructor = require("./PacketConstructor");

class ServerPlayerListPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns {String} The name of the packet
	 */
	getPacketName() {
		return "player_list";
	}

	/**
	 * Returns if is the packet critical?
	 * @returns {Boolean} Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false;
	}

	/**
	 * Returns the player username
	 * @returns {String} The player username
	 */
	getUsername() {
		return username;
	}

	/**
	 * Sets the player username
	 * @param {String} new_username The player username
	 */
	setUsername(new_username) {
		username = new_username;
	}

	/**
	 * Returns the ID of the player
	 * @returns {Number} The ID of the player
	 */
	getId() {
		return id;
	}

	/**
	 * Sets the ID of the player
	 * @param new_id
	 */
	setId(new_id) {
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
	setUuid(new_uuid) {
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
	 * Sends the packet to the client
	 * @param {any} client
	 */
	writePacket(client) {
		let data = null;
		if (this.getType() === PlayerListTypes.REMOVE) {
			data = {
				records: {
					type: PlayerListTypes.REMOVE,
					records_count: PlayerInfo.players.length,
					records: [
						{
							uuid: this.getUuid(),
						},
					],
				},
			};
		} else {
			data = {
				records: {
					type: PlayerListTypes.REMOVE,
					records_count: PlayerInfo.players.length,
					records: [
						{
							uuid: this.getUuid(),
							entity_unique_id: "-" + this.getId(),
							username: this.getUsername(),
							xbox_user_id: "0",
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

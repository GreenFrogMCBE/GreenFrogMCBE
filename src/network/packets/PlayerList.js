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
const ServerInfo = require("../../server/ServerInfo");
const PlayerListTypes = require("../packets/types/PlayerList");

let username = "unknown";
let uuid = "";
let id = 0;
let type = PlayerListTypes.ADD;

class PlayerList extends require("./Packet") {
	/**
	 * @returns The name of the packet.
	 */
	name() {
		return "player_list";
	}

	/**
	 * It returns the player's name
	 * @returns The player's username
	 */
	getUsername() {
		return username;
	}

	/**
	 * It sets the player's name
	 * @param username The player's username
	 */
	setUsername(username1) {
		username = username1;
	}

	/**
	 * Get the id of the player
	 * @returns The id of the player
	 */
	getId() {
		return id;
	}

	/**
	 * Set the id of the player
	 * @param id The id to set for the player
	 */
	setId(id1) {
		id = id1;
	}

	/**
	 * Returns the type of the packet
	 * @returns The type
	 */
	getType() {
		return type;
	}

	/**
	 * Get the uuid of the player
	 * @returns The uuid of the player
	 */
	getUuid() {
		return uuid;
	}

	/**
	 * Sets the uuid of the player
	 * @param uuid The uuid to set for the player
	 */
	setUuid(uuid1) {
		uuid = uuid1;
	}

	/**
	 * Sets the type for player list managment packet
	 * @param type1 The type. Valid types are ADD or REMOVE
	 */
	setType(type1) {
		type = type1;
	}

	send(client) {
		let data = null;
		if (this.getType() === PlayerListTypes.REMOVE) {
			data = {
				records: {
					type: PlayerListTypes.REMOVE,
					records_count: ServerInfo.players.length,
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
					records_count: ServerInfo.players.length,
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
		client.queue("player_list", data);
	}
}

module.exports = PlayerList;

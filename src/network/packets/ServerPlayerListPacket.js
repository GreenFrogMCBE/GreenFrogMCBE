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
 * @link Github - https://github.com/aboxofrats/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const PlayerList = require("./types/PlayerListAction");

const PacketConstructor = require("./PacketConstructor");

class ServerPlayerListPacket extends PacketConstructor {
	name = "player_list";
	/** @type {string} */
	username;
	/** @type {string} */
	uuid;
	/** @type {number} */
	id;
	/** @type {PlayerList} */
	type;
	/** @type {number} */
	xbox_id;

	writePacket(client) {
		let data = null;

		if (this.type === PlayerList.REMOVE) {
			data = {
				records: {
					type: PlayerList.REMOVE,
					records_count: 1,
					records: [
						{
							uuid: this.uuid,
						},
					],
				},
			};
		} else {
			data = {
				records: {
					type: PlayerList.ADD,
					records_count: 1,
					records: [
						{
							uuid: this.uuid,
							entity_unique_id: "-" + this.id,
							username: this.username,
							xbox_user_id: this.xbox_id,
							platform_chat_id: "",
							build_platform: 7,
							skin_data: require("../../resources/skinData.json"),
							is_teacher: false,
							is_host: false,
						},
					],
					verified: [true],
				},
			};
		}

		client.queue(this.name, data);
	}
}

module.exports = ServerPlayerListPacket;

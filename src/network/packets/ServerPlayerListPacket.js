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
const PlayerListType = require("./types/PlayerListType");

const PacketConstructor = require("./PacketConstructor");

class ServerPlayerListPacket extends PacketConstructor {
	name = 'player_list'
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

		if (this.getType() === PlayerListType.REMOVE) {
			data = {
				records: {
					type: PlayerListType.REMOVE,
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
					type: PlayerListType.ADD,
					records_count: 1,
					records: [
						{
							uuid: this.getUUID(),
							entity_unique_id: "-" + this.getId(),
							username: this.getUsername(),
							xbox_user_id: this.getXboxId(),
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

		client.queue(this.getPacketName(), data);
	}
}

module.exports = ServerPlayerListPacket;

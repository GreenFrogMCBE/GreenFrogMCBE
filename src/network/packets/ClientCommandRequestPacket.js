const PlayerCommandExecuteEvent = require("../../events/PlayerCommandExecuteEvent");
const { config } = require("../../api/ServerInfo");
const assert = require("assert")

const PacketConstructor = require("./PacketConstructor");

class ClientCommandRequestPacket extends PacketConstructor {
	/**
	 * Returns the packet name
	 * @returns The name of the packet
	 */
	getPacketName() {
		return "command_request"
	}

	/**
	 * Returns if is the packet critical?
	 * @returns Returns if the packet is critical
	 */
	isCriticalPacket() {
		return false
	}

	/**
	 * Validates the packet
	 * @param {any} player
	 * @param {JSON} packet
	 */
	async validatePacket(player, command) {
		assert(player, null)
		assert(command, null)
	}

	/**
	 * Reads the packet from client
	 * @param {any} player
	 * @param {JSON} packet
	 */
	async readPacket(player, packet, server) {
		const command = packet.data.params.command;
		
		await this.validatePacket(player, command)

		if (!config.commandsDisabled) {
			const CommandExecutionEvent = new PlayerCommandExecuteEvent()
			CommandExecutionEvent.execute(
				server,
				player,
				command
			)
		}
	}
}

module.exports = ClientCommandRequestPacket;

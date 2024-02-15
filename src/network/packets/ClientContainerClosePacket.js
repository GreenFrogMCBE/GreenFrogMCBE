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
 * @link Github - https://github.com/GreenFrogMCBE/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const ServerContainerClosePacket = require("./ServerContainerClosePacket")

const Packet = require("./Packet")

const {
	EventEmitter,
	Event
} = require("@kotinash/better-events")

const {
	WindowId,
	Air
} = require("@greenfrog/mc-enums")

class ClientContainerClosePacket extends Packet {
	name = "container_close"

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("Frog").Packet} packet
	 */
	async read_packet(player, packet) {
		EventEmitter.emit(
			new Event(
				"playerContainerClose",
				{
					player,
					window_id: WindowId.Creative,
					sent_by_server: false,
					packet
				},
				(() => {
					if (player.inventory.container.isOpen) {
						EventEmitter.emit(
							new Event(
								"inventoryContainerChestRemove",
								{
									player
								},
								(() => {
									const { x, y, z } = player.inventory.container.block_position

									player.world.place_block(x, y, z, new Air())

									player.inventory.container.isOpen = false
									player.inventory.container.block_position = { x: undefined, y: undefined, z: undefined }
									player.inventory.container.window = { id: undefined, type: undefined }

									const container_close = new ServerContainerClosePacket()
									container_close.server = false
									container_close.window_id = WindowId.Creative
									container_close.write_packet(player)
								})
							),
						)
					}
				})
			),
			false
		)
	}
}

module.exports = ClientContainerClosePacket

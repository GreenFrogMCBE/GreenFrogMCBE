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
/* eslint-disable no-case-declarations */
const ServerContainerOpenPacket = require("./ServerContainerOpenPacket")

const Packet = require("./Packet")

const {
	WindowType,
	WindowId,
	Interact
} = require("@greenfrog/mc-enums")

const { Event } = require("@kotinash/better-events")

const { get_key } = require("../../utils/Language")

const Logger = require("../../utils/Logger")
const Frog = require("../../Frog")

class ClientInteractPacket extends Packet {
	name = "interact"

	/**
	 * @param {import("Frog").Player} player
	 * @param {import("Frog").Packet} packet
	 */
	async read_packet(player, packet) {
		const action_id = packet.data.params.action_id

		Frog.event_emitter.emit(
			new Event(
				"playerInteract",
				{
					player,
					action_id,
				},
			),
			false
		)

		switch (action_id) {
			case Interact.OpenInventory:
				/** @type {import("Frog").Vec3} */
				const container_coordinates = {
					x: 0,
					y: 0,
					z: 0,
				}

				Frog.event_emitter.emit(
					new Event(
						"playerContainerOpen",
						{
							player,
							window_id: WindowId.CREATIVE,
							window_type: WindowType.CREATIVE_INVENTORY,
							sent_by_server: false,
							runtime_id: 1,
						},
						(() => {
							const container_open = new ServerContainerOpenPacket()
							container_open.window_id = WindowId.Creative
							container_open.window_type = WindowType.CreativeInventory
							container_open.runtime_entity_id = 1
							container_open.coordinates = container_coordinates
							container_open.write_packet(player)
						})
					)
				)

				break
			default:
				Logger.debug(get_key("debug.player.unsupportedAction.id", [action_id, player.username]))
		}
	}
}

module.exports = ClientInteractPacket

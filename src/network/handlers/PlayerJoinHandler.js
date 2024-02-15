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
const Frog = require("../../Frog")

const PlayerInfo = require("../../player/PlayerInfo")

const { get_key } = require("../../utils/Language")

const ServerResourcePackInfo = require("../packets/ServerResourcePackInfoPacket")

const { PlayStatus } = require("@greenfrog/mc-enums")

const VersionToProtocol = require("../../utils/VersionToProtocol")

const PacketHandler = require("./PacketHandler")

const { EventEmitter, Event } = require("@kotinash/better-events")

const PlayerInit = require("../../player/PlayerInit")

const config = Frog.config

class PlayerJoinHandler {
	/**
	 * Executes when a player joins the server.
	 *
	 * @param {import("Frog").Player} player - The player joining the server.
	 */
	async on_player_join(player) {
		await PlayerInit.initPlayer(player)

		this.setup_intervals(player)

		if (!player.is_username_valid()) {
			player.kick(get_key("kickMessages.invalidUsername"))
		}

		PlayerInfo.add_player(player)

		this.handle_max_players(player)
		this.handle_version_mismatch(player)
		this.send_response_pack_info(player)
		this.emit_player_join_event(player)

		await this.setup_events(player)
	}

	/**
	 * Setups events for the player
	 *
	 * @param {import("Frog").Player} player
	 */
	async setup_events(player) {
		EventEmitter.emit(
			new Event(
				"playerPreConnect",
				{
					player,
				}
			),
			false
		)

		player._queue = player.queue
		player.queue = (name, params) => {
			EventEmitter.emit(
				new Event(
					"packetQueue",
					{
						player,
						packet: {
							data: {
								name,
								params,
							},
						},
					},
					(() => {
						player._queue(name, params)
					})
				)
			)
		}

		player.on("packet", (packet) => {
			new PacketHandler()
				.handle_packet(player, packet)
		})
	}

	/**
	 * Sets up player intervals.
	 *
	 * @param {import("Frog").Player} player - The player to set up intervals for.
	 */
	setup_intervals(player) {
		setInterval(() => {
			player.network.packet_count = 0
		}, 1000)
	}

	/**
	 * Handles the case when the maximum number of players_online.is reached.
	 *
	 * @param {import("Frog").Player} player - The player to check against the maximum player count.
	 */
	handle_max_players(player) {
		if (PlayerInfo.players_online.length > config.server_info.max_players) {
			player.kick(config.dev.use_legacy_server_full_kick_message ? get_key("kickMessages.serverFull") : PlayStatus.FailedServerFull)
		}
	}

	/**
	 * Handles the version mismatch between the player and server.
	 *
	 * @param {import("Frog").Player} player - The player to check the version for.
	 */
	handle_version_mismatch(player) {
		const server_protocol = VersionToProtocol.get_protocol(config.server_info.version)

		if (config.dev.multi_protocol) {
			if (config.dev.use_legacy_version_mismatch_kick_message && player.network.protocol_version !== server_protocol) {
				return player.kick(get_key("kickMessages.versionMismatch", [config.server_info.version]))
			}

			if (player.network.protocol_version > server_protocol) {
				return player.send_play_status(PlayStatus.FailedServer, true)
			}

			player.send_play_status(PlayStatus.FailedClient, true)
		}
	}

	/**
	 * Sends the response pack info to the player.
	 *
	 * @param {import("Frog").Player} player - The player to send the response pack info to.
	 */
	send_response_pack_info(player) {
		const response_pack_info = new ServerResourcePackInfo()
		response_pack_info.must_accept = false
		response_pack_info.has_scripts = false
		response_pack_info.behavior_packs = []
		response_pack_info.texture_packs = []
		response_pack_info.resource_pack_links = []
		response_pack_info.write_packet(player)
	}

	/**
	 * Emits the player join event.
	 *
	 * @param {import("Frog").Player} player - The player that joined the server.
	 */
	emit_player_join_event(player) {
		EventEmitter.emit(
			new Event(
				"playerJoin",
				{
					player,
				}
			),
			false
		)
	}
}

module.exports = PlayerJoinHandler

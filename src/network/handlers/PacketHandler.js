/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░��█║██║░░╚██╗
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
const fs = require("fs")
const path = require("path")

const Frog = require("../../Frog")

const Logger = require("../../utils/Logger")

const { get_key } = require("../../utils/Language")

const { EventEmitter, Event } = require("@kotinash/better-events")

const PacketHandlingException = require("../../utils/exceptions/PacketHandlingException")

const Player = require("../../player/Player")

class PacketHandler {
	/**
	 * @param {Player} player
	 * @param {Packet} packet
	 * @throws {PacketHandlingException} - If the player is rate-limited.
	 */
	handle_packet(player, packet) {
		try {
			const packets_dir = this.get_packets_directory()
			const exists = this.check_for_matching_packets(player, packet, packets_dir)

			if (!exists && this.should_log_unhandled_packets()) {
				this.handle_unhandled_packet(packet)
			}
		} catch (error) {
			this.handle_packet_error(player, error)
		}
	}

	/**
	 * Returns the directory path for packets.
	 *
	 * @returns {string}
	 */
	get_packets_directory() {
		return path.join(__dirname, "..", "packets")
	}

	/**
	 * Checks for matching packets in the directory.
	 *
	 * @param {Player} player
	 * @param {Packet} packet
	 * @param {string} packets_dir
	 * @returns {boolean}
	 */
	check_for_matching_packets(player, packet, packets_dir) {
		let exists = false

		this.iterate_packet_files(packets_dir, (/** @type {string} */ filename) => {
			if (this.is_client_packet(filename)) {
				const packet_path = this.get_packet_path(packets_dir, filename)

				if (this.exceeds_packet_count_limit(player) && Frog.config.packet_rate_limiting.enabled) {
					this.handle_packet_ratelimit(player)

					throw this.create_rate_limit_exception(player)
				}

				const packet_instance = this.create_packet_instance(packet_path)

				if (this.is_matching_packet(packet_instance, packet)) {
					this.process_matching_packet(player, packet_instance, packet)

					exists = true
				}
			}
		})

		return exists
	}

	/**
	 * Iterates over the files in a directory.
	 *
	 * @param {string} directory
	 * @param {any} callback
	 */
	iterate_packet_files(directory, callback) {
		fs
			.readdirSync(directory)
			.forEach(callback)
	}

	/**
	 * Checks if a file represents a player packet.
	 *
	 * @param {string} filename
	 * @returns {boolean}
	 */
	is_client_packet(filename) {
		return filename.startsWith("Client") && filename.endsWith(".js")
	}

	/**
	 * Gets the full path of a packet file.
	 *
	 * @param {string} directory
	 * @param {string} filename
	 * @returns {string}
	 */
	get_packet_path(directory, filename) {
		return path.join(directory, "..", "packets", filename)
	}

	/**
	 * Checks if the packet count exceeds the limit.
	 *
	 * @param {Player} player
	 * @returns {boolean}
	 */
	exceeds_packet_count_limit(player) {
		return ++player.network_data.pps > 2500
	}

	/**
	 * Handles the packet ratelimit event.
	 *
	 * @param {Player} player
	 */
	handle_packet_ratelimit(player) {
		EventEmitter.emit(
			new Event(
				"packetRateLimit",
				{
					player
				}
			)
		)
	}

	/**
	 * Creates a packet handling exception for rate limiting.
	 *
	 * @param {Player} player
	 * @returns {PacketHandlingException} - The rate limit exception.
	 */
	create_rate_limit_exception(player) {
		player.network_data.pps = 0

		return new PacketHandlingException(
			get_key("exceptions.network.rateLimited",
				[
					player.username, 
					player.network_data.pps
				]
			)
		)
	}

	/**
	 * Creates an instance of a packet.
	 *
	 * @param {string} packetPath
	 * @returns {import("../packets/Packet")}
	 */
	create_packet_instance(packetPath) {
		const packet_сlass = require(packetPath)

		return new packet_сlass()
	}

	/**
	 * Checks if the packet matches the packet parameters.
	 *
	 * @param {import("../packets/Packet")} packet_class
	 * @param {Packet} packet
	 * @returns {boolean}
	 */
	is_matching_packet(packet_class, packet) {
		return packet_class.name === packet.data.name
	}

	/**
	 * Processes a matching packet.
	 *
	 * @param {Player} player
	 * @param {import("../packets/Packet")} packet_instance
	 * @param {PacketParams} packet_params
	 */
	process_matching_packet(player, packet_instance, packet_params) {
		EventEmitter.emit(
			new Event(
				"packetRead",
				{
					player,
					packet: {
						packet: packet_params,
						instance: packet_instance,
					},
				},
				(() => {
					this.read_packet(packet_instance, player, Frog.server, packet_params)
				})
			)
		)
	}

	/**
	 * Reads the packet.
	 *
	 * @param {import("../packets/Packet")} packet
	 * @param {Player} player
	 * @param {import("frog-protocol").Server} server
	 * @param {PacketParams} packetParams
	 */
	read_packet(packet, player, server, packetParams) {
		packet.read_packet(player, packetParams, server)
	}

	/**
	 * Checks if unhandled packets should be logged.
	 *
	 * @returns {boolean}
	 */
	should_log_unhandled_packets() {
		return Frog.config.dev.log_unhandled_packets
	}

	/**
	 * Handles an unhandled packet.
	 *
	 * @param {Packet} packet
	 */
	handle_unhandled_packet(packet) {
		Logger.warning(get_key("network.packet.unhandledPacket"))

		console.warn("%o", packet)
	}

	/**
	 * Handles an error that occurred during packet handling.
	 *
	 * @param {Player} player
	 * @param {Error} error
	 */
	handle_packet_error(player, error) {
		Logger.error(
			get_key("exceptions.network.packetHandlingError",
				[
					player.username,
					error.stack
				]
			)
		)

		player.kick(get_key("kickMessages.invalidPacket")) || player.disconnect(get_key("kickMessages.invalidPacket"))

		Frog.event_emitter.emit("packetReadError", {
			player,
			error,
		})
	}
}

module.exports = PacketHandler

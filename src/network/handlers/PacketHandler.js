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
const fs = require("fs");
const path = require("path");

const Frog = require("../../Frog");

const Logger = require("../../utils/Logger");

const { getKey } = require("../../utils/Language");

const PacketHandlingException = require("../../utils/exceptions/PacketHandlingException");

class PacketHandler {
	/**
	 * @param {import("Frog").Player} player
	 * @param {import("Frog").Packet} packet
	 * @throws {PacketHandlingException} - If the player is rate-limited.
	 */
	handlePacket(player, packet) {
		try {
			const packetsDir = this.getPacketsDirectory();
			const exists = this.checkForMatchingPackets(player, packet, packetsDir);

			if (!exists && this.shouldLogUnhandledPackets()) {
				this.handleUnhandledPacket(packet);
			}
		} catch (error) {
			this.handlePacketError(player, error);
		}
	}

	/**
	 * Returns the directory path for packets.
	 *
	 * @returns {string}
	 */
	getPacketsDirectory() {
		return path.join(__dirname, "..", "packets");
	}

	/**
	 * Checks for matching packets in the directory.
	 *
	 * @param {import("Frog").Player} player
	 * @param {import("Frog").Packet} packet
	 * @param {string} packetsDir
	 * @returns {boolean}
	 */
	checkForMatchingPackets(player, packet, packetsDir) {
		let exists = false;

		this.iteratePacketFiles(packetsDir, (/** @type {string} */ filename) => {
			if (this.isClientPacket(filename)) {
				const packetPath = this.getPacketPath(packetsDir, filename);

				if (this.exceedsPacketCountLimit(player) && Frog.config) {
					this.handlePacketRatelimit(player);
					throw this.createRateLimitException(player);
				}

				const packetInstance = this.createPacketInstance(packetPath);

				if (this.isMatchingPacket(packetInstance, packet)) {
					this.processMatchingPacket(player, packetInstance, packet);
					exists = true;
				}
			}
		});

		return exists;
	}

	/**
	 * Iterates over the files in a directory.
	 *
	 * @param {string} directory 
	 * @param {any} callback
	 */
	iteratePacketFiles(directory, callback) {
		fs.readdirSync(directory).forEach(callback);
	}

	/**
	 * Checks if a file represents a player packet.
	 *
	 * @param {string} filename
	 * @returns {boolean} 
	 */
	isClientPacket(filename) {
		return filename.startsWith("Client") && filename.endsWith(".js");
	}

	/**
	 * Gets the full path of a packet file.
	 *
	 * @param {string} directory 
	 * @param {string} filename
	 * @returns {string}
	 */
	getPacketPath(directory, filename) {
		return path.join(directory, "..", "packets", filename);
	}

	/**
	 * Checks if the packet count exceeds the limit.
	 *
	 * @param {import("Frog").Player} player
	 * @returns {boolean} 
	 */
	exceedsPacketCountLimit(player) {
		return ++player.network.packetCount > 2500;
	}

	/**
	 * Handles the packet ratelimit event.
	 *
	 * @param {import("Frog").Player} player
	 */
	handlePacketRatelimit(player) {
		Frog.eventEmitter.emit("packetRateLimitReached", { player });
	}

	/**
	 * Creates a packet handling exception for rate limiting.
	 *
	 * @param {import("Frog").Player} player
	 * @returns {PacketHandlingException} - The rate limit exception.
	 */
	createRateLimitException(player) {
		const exceptionMessage = getKey("exceptions.network.rateLimited").replace("%s", player.username).replace("%d", player.network.packetCount.toString());

		return new PacketHandlingException(exceptionMessage);
	}

	/**
	 * Creates an instance of a packet.
	 *
	 * @param {string} packetPath 
	 * @returns {import("../packets/Packet")}
	 */
	createPacketInstance(packetPath) {
		const PacketClass = require(packetPath);
		return new PacketClass();
	}

	/**
	 * Checks if the packet matches the packet parameters.
	 *
	 * @param {import("../packets/Packet")} packetClass
	 * @param {import("Frog").Packet} packet
	 * @returns {boolean} 
	 */
	isMatchingPacket(packetClass, packet) {
		return packetClass.name === packet.data.name;
	}

	/**
	 * Processes a matching packet.
	 *
	 * @param {import("Frog").Player} player
	 * @param {import("../packets/Packet")} packetInstance
	 * @param {import("Frog").PacketParams} packetParams
	 */
	processMatchingPacket(player, packetInstance, packetParams) {
		let shouldReadPacket = true;

		Frog.eventEmitter.emit("packetRead", {
			player,
			packet: {
				packet: packetParams,
				instance: packetInstance
			},
			cancel: () => { shouldReadPacket = false }
		});

		if (shouldReadPacket) {
			this.readPacket(packetInstance, player, Frog.server, packetParams);
		}
	}

	/**
	 * Reads the packet.
	 *
	 * @param {import("../packets/Packet")} packet
	 * @param {import("Frog").Player} player
	 * @param {import("frog-protocol").Server} server
	 * @param {import("Frog").PacketParams} packetParams
	 */
	readPacket(packet, player, server, packetParams) {
		packet.readPacket(player, packetParams, server);
	}

	/**
	 * Checks if unhandled packets should be logged.
	 *
	 * @returns {boolean}
	 */
	shouldLogUnhandledPackets() {
		return Frog.config.dev.logUnhandledPackets;
	}

	/**
	 * Handles an unhandled packet.
	 *
	 * @param {import("Frog").Packet} packet
	 */
	handleUnhandledPacket(packet) {
		Logger.warning(getKey("network.packet.unhandledPacket"));
		console.warn("%o", packet);
	}

	/**
	 * Handles an error that occurred during packet handling.
	 *
	 * @param {import("Frog").Player} player
	 * @param {Error} error
	 */
	handlePacketError(player, error) {
		Logger.error(
			getKey("exceptions.network.packetHandlingError")
				.replace("%s", player.username)
				.replace("%d", error.stack)
		);

		try {
			player.kick(getKey("kickMessages.invalidPacket"));
		} catch {
			player.disconnect(getKey("kickMessages.invalidPacket"));
		}

		Frog.eventEmitter.emit("packetReadError", {
			player,
			error,
		});
	}
}

module.exports = PacketHandler;

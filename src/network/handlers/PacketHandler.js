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
const fs = require("fs");
const path = require("path");

const Frog = require("../../Frog");

const Logger = require("../../server/Logger");

const { getKey } = require("../../utils/Language");

const PacketHandlingException = require("../../utils/exceptions/PacketHandlingException");

class PacketHandler {
	/**
	 * Handles packets.
	 *
	 * @param {Client} client - The client object.
	 * @param {JSON} packetData - The packet parameters.
	 * @throws {PacketHandlingException} - If the client is rate-limited.
	 */
	handlePacket(client, packetData) {
		try {
			const packetsDir = this.getPacketsDirectory();
			const exists = this.checkForMatchingPackets(client, packetData, packetsDir);

			if (!exists && this.shouldLogUnhandledPackets()) {
				this.handleUnhandledPacket(packetData);
			}
		} catch (error) {
			this.handlePacketError(client, error);
		}
	}

	/**
	 * Returns the directory path for packets.
	 *
	 * @returns {string} - The packets directory path.
	 */
	getPacketsDirectory() {
		return path.join(__dirname, "..", "packets");
	}

	/**
	 * Checks for matching packets in the directory.
	 *
	 * @param {Client} client - The client object.
	 * @param {JSON} packetData - The packet parameters.
	 * @param {string} packetsDir - The directory path for packets.
	 * @returns {boolean} - Indicates if a matching packet was found.
	 */
	checkForMatchingPackets(client, packetData, packetsDir) {
		let exists = false;

		this.iteratePacketFiles(packetsDir, (filename) => {
			if (this.isClientPacket(filename)) {
				const packetPath = this.getPacketPath(packetsDir, filename);

				if (this.exceedsPacketCountLimit(client)) {
					this.handlePacketRatelimit(client);
					throw this.createRateLimitException(client);
				}

				const packet = this.createPacketInstance(packetPath);

				if (this.isMatchingPacket(packet, packetData)) {
					this.processMatchingPacket(client, packet, packetData);
					exists = true;
				}
			}
		});

		return exists;
	}

	/**
	 * Iterates over the files in a directory.
	 *
	 * @param {string} directory - The directory path.
	 * @param {function} callback - The callback function to execute for each file.
	 */
	iteratePacketFiles(directory, callback) {
		fs.readdirSync(directory).forEach(callback);
	}

	/**
	 * Checks if a file represents a client packet.
	 *
	 * @param {string} filename - The file name.
	 * @returns {boolean} - Indicates if the file is a client packet.
	 */
	isClientPacket(filename) {
		return filename.startsWith("Client") && filename.endsWith(".js");
	}

	/**
	 * Gets the full path of a packet file.
	 *
	 * @param {string} directory - The directory path.
	 * @param {string} filename - The file name.
	 * @returns {string} - The packet file path.
	 */
	getPacketPath(directory, filename) {
		return path.join(directory, "..", "packets", filename);
	}

	/**
	 * Checks if the packet count exceeds the limit.
	 *
	 * @param {Client} client - The client object.
	 * @returns {boolean} - Indicates if the packet count exceeds the limit.
	 */
	exceedsPacketCountLimit(client) {
		return ++client.packetCount > 2500;
	}

	/**
	 * Handles the packet ratelimit event.
	 *
	 * @param {Client} client - The client object.
	 */
	handlePacketRatelimit(client) {
		Frog.eventEmitter.emit("packetRatelimit", {
			client,
			server: Frog.getServer(),
		});
	}

	/**
	 * Creates a packet handling exception for rate limiting.
	 *
	 * @param {Client} client - The client object.
	 * @returns {PacketHandlingException} - The rate limit exception.
	 */
	createRateLimitException(client) {
		const exceptionMessage = getKey("exceptions.network.rateLimited").replace("%s%", client.username).replace("%d%", client.packetCount);

		return new PacketHandlingException(exceptionMessage);
	}

	/**
	 * Creates an instance of a packet.
	 *
	 * @param {string} packetPath - The path of the packet file.
	 * @returns {*} - The instance of the packet.
	 */
	createPacketInstance(packetPath) {
		const PacketClass = require(packetPath);
		return new PacketClass();
	}

	/**
	 * Checks if the packet matches the packet parameters.
	 *
	 * @param {*} packet - The packet object.
	 * @param {JSON} packetData - The packet parameters.
	 * @returns {boolean} - Indicates if the packet matches the parameters.
	 */
	isMatchingPacket(packet, packetData) {
		return packet.getPacketName() === packetData.data.name;
	}

	/**
	 * Processes a matching packet.
	 *
	 * @param {Client} client - The client object.
	 * @param {*} packet - The matching packet object.
	 * @param {JSON} packetData - The packet parameters.
	 */
	processMatchingPacket(client, packet, packetData) {
		let shouldReadPacket = true;
		this.emitPacketReadEvent(client, packetInstance, packetData);

		if (shouldReadPacket) {
			this.readPacket(packet, client, packetData);
		}
	}

	/**
	 * Emits the packet read event.
	 *
	 * @param {Client} client - The client object.
	 * @param {*} packet - The packet object.
	 */
	emitPacketReadEvent(client, packetInstance, packetData) {
		Frog.eventEmitter.emit("packetRead", {
			client,
			packetInstance,
			packetData,
			server: Frog.getServer(),
		});
	}

	/**
	 * Reads the packet.
	 *
	 * @param {*} packet - The packet object.
	 * @param {Client} client - The client object.
	 * @param {JSON} packetData - The packet parameters.
	 */
	readPacket(packet, client, packetData) {
		packet.readPacket(client, packetData, this);
	}

	/**
	 * Checks if unhandled packets should be logged.
	 *
	 * @returns {boolean} - Indicates if unhandled packets should be logged.
	 */
	shouldLogUnhandledPackets() {
		const configFiles = Frog.serverConfigurationFiles;
		const config = configFiles.config;

		return config.dev.logUnhandledPackets;
	}

	/**
	 * Handles an unhandled packet.
	 *
	 * @param {JSON} packetData - The packet parameters.
	 */
	handleUnhandledPacket(packetData) {
		Logger.warning(getKey("network.packet.unhandledPacket"));
		console.warn("%o", packetData);
	}

	/**
	 * Handles an error that occurred during packet handling.
	 *
	 * @param {Client} client - The client object.
	 * @param {Error} error - The error object.
	 */
	handlePacketError(client, error) {
		if (Frog.isTest) {
			throw error;
		} else {
			Logger.error(getKey("exceptions.network.packetHandlingError").replace("%s%", client.username).replace("%d%", error.stack));
		}

		client.kick(getKey("kickMessages.invalidPacket"));

		Frog.eventEmitter.emit("packetReadError", {
			client,
			error,
			server: Frog.getServer(),
		});
	}
}

module.exports = PacketHandler;

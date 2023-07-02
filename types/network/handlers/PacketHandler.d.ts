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
export = PacketHandler;
declare class PacketHandler {
	/**
	 * Handles packets.
	 *
	 * @param {Client} client - The client object.
	 * @param {JSON} packetData - The packet parameters.
	 * @throws {PacketHandlingException} - If the client is rate-limited.
	 */
	handlePacket(client: Client, packetData: JSON): void;
	/**
	 * Returns the directory path for packets.
	 *
	 * @returns {string} - The packets directory path.
	 */
	getPacketsDirectory(): string;
	/**
	 * Checks for matching packets in the directory.
	 *
	 * @param {Client} client - The client object.
	 * @param {JSON} packetData - The packet parameters.
	 * @param {string} packetsDir - The directory path for packets.
	 * @returns {boolean} - Indicates if a matching packet was found.
	 */
	checkForMatchingPackets(client: Client, packetData: JSON, packetsDir: string): boolean;
	/**
	 * Iterates over the files in a directory.
	 *
	 * @param {string} directory - The directory path.
	 * @param {function} callback - The callback function to execute for each file.
	 */
	iteratePacketFiles(directory: string, callback: Function): void;
	/**
	 * Checks if a file represents a client packet.
	 *
	 * @param {string} filename - The file name.
	 * @returns {boolean} - Indicates if the file is a client packet.
	 */
	isClientPacket(filename: string): boolean;
	/**
	 * Gets the full path of a packet file.
	 *
	 * @param {string} directory - The directory path.
	 * @param {string} filename - The file name.
	 * @returns {string} - The packet file path.
	 */
	getPacketPath(directory: string, filename: string): string;
	/**
	 * Checks if the packet count exceeds the limit.
	 *
	 * @param {Client} client - The client object.
	 * @returns {boolean} - Indicates if the packet count exceeds the limit.
	 */
	exceedsPacketCountLimit(client: Client): boolean;
	/**
	 * Handles the packet ratelimit event.
	 *
	 * @param {Client} client - The client object.
	 */
	handlePacketRatelimit(client: Client): void;
	/**
	 * Creates a packet handling exception for rate limiting.
	 *
	 * @param {Client} client - The client object.
	 * @returns {PacketHandlingException} - The rate limit exception.
	 */
	createRateLimitException(client: Client): PacketHandlingException;
	/**
	 * Creates an instance of a packet.
	 *
	 * @param {string} packetPath - The path of the packet file.
	 * @returns {*} - The instance of the packet.
	 */
	createPacketInstance(packetPath: string): any;
	/**
	 * Checks if the packet matches the packet parameters.
	 *
	 * @param {*} packet - The packet object.
	 * @param {JSON} packetData - The packet parameters.
	 * @returns {boolean} - Indicates if the packet matches the parameters.
	 */
	isMatchingPacket(packet: any, packetData: JSON): boolean;
	/**
	 * Processes a matching packet.
	 *
	 * @param {Client} client - The client object.
	 * @param {PacketConstructor} packetInstance - The matching packet object.
	 * @param {JSON} packetData - The packet parameters.
	 */
	processMatchingPacket(client: Client, packetInstance: PacketConstructor, packetData: JSON): void;
	/**
	 * Emits the packet read event.
	 *
	 * @param {Client} client - The client object.
	 * @param {*} packet - The packet object.
	 */
	emitPacketReadEvent(client: Client, packetInstance: any, packetData: any): void;
	/**
	 * Reads the packet.
	 *
	 * @param {*} packet - The packet object.
	 * @param {Client} client - The client object.
	 * @param {JSON} packetData - The packet parameters.
	 */
	readPacket(packet: any, client: Client, packetData: JSON): void;
	/**
	 * Checks if unhandled packets should be logged.
	 *
	 * @returns {boolean} - Indicates if unhandled packets should be logged.
	 */
	shouldLogUnhandledPackets(): boolean;
	/**
	 * Handles an unhandled packet.
	 *
	 * @param {JSON} packetData - The packet parameters.
	 */
	handleUnhandledPacket(packetData: JSON): void;
	/**
	 * Handles an error that occurred during packet handling.
	 *
	 * @param {Client} client - The client object.
	 * @param {Error} error - The error object.
	 */
	handlePacketError(client: Client, error: Error): void;
}
import PacketHandlingException = require("../../utils/exceptions/PacketHandlingException");
import PacketConstructor = require("../packets/PacketConstructor");

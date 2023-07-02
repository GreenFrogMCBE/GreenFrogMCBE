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
export = Query;
declare class Query {
	clientTokens: any;
	socket: any;
	info: {};
	start(info: any): void;
	/**
	 * Generates a token
	 *
	 * @returns {number}
	 */
	_generateToken(): number;
	/**
	 * Handles query packets
	 *
	 * @param {Buffer} msg
	 * @param {dgram.RemoteInfo} remoteInfo
	 */
	_handle(msg: Buffer, remoteInfo: dgram.RemoteInfo): void;
	/**
	 * Sends the handshake packet
	 *
	 * @param {Buffer} remoteInfo
	 * @param {dgram.RemoteInfo} msg
	 */
	_sendHandshake(remoteInfo: Buffer, msg: dgram.RemoteInfo): void;
	/**
	 * Sends the basic info packet
	 *
	 * @param {dgram.RemoteInfo} remoteInfo
	 * @param {Buffer} message
	 */
	_sendBasicInfo(remoteInfo: dgram.RemoteInfo, message: Buffer): void;
	/**
	 * Sends the full info packet
	 *
	 * @param {dgram.RemoteInfo} remoteInfo
	 * @param {Buffer} message
	 */
	_sendFullInfo(remoteInfo: dgram.RemoteInfo, message: Buffer): void;
}

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
const Frog = require("../Frog");

const Logger = require("../server/Logger");

const { getKey } = require("../utils/Language");

const { SmartBuffer } = require("@harmonytf/smart-buffer");
const dgram = require("dgram");

/**
 * Will only work if `config.query.logPackets` is enabled
 * 
 * @param {string} string
 */
function _logPacket(string) {
	if (Frog.serverConfigurationFiles.config.query.logPackets || Frog.isTest || Frog.isDebug) Logger.info(string)
}

/**
 * Will only work if `config.query.logConnections` is enabled
 * 
 * @param {string} string
 */
function _logConnection(string) {
	if (Frog.serverConfigurationFiles.config.query.logConnections || Frog.isTest || Frog.isDebug) Logger.info(string)
}

/**
 * @returns {number}
 */
function _generateToken() {
	Frog.eventEmitter.emit("queryTokenGeneration", {});

	const min = Math.ceil(1000000);
	return Math.floor(Math.random() * (Math.floor(9999999) - min + 1) + min);
}

/**
 * @param {Buffer} msg
 * @param {dgram.RemoteInfo} remoteInfo
 * @param {JSON} clientTokens
 * @param {dgram.Socket} socket
 * @param {JSON} info
 */
function _handle(msg, remoteInfo, clientTokens, socket, info) {
	const magic = msg.readUInt16BE(0);
	const type = msg.readUInt8(2);

	if (magic !== 0xfefd) {
		Frog.eventEmitter.emit("queryInvalidPacket", { query: { info: info, socket: socket }, type, magic, msg, remoteInfo });

		if (config.query.logConnections) Logger.warning(getKey("query.server.network.invalidPacket").replace("%s%", `${remoteInfo.address}`));
		return;
	}

	if ((clientTokens.has(remoteInfo.address) && clientTokens.get(remoteInfo.address).expiresAt < Date.now()) || !clientTokens.has(remoteInfo.address)) {
		_logConnection(getKey("query.server.network.generatingToken").replace("%s%", `${remoteInfo.address}`));

		clientTokens.set(remoteInfo.address, {
			token: _generateToken(),
			expiresAt: Date.now() + 30 * 1000,
		});
	}

	if (type === 0x09) {
		Frog.eventEmitter.emit("queryHandshakePacket", { query: { info: info, socket: socket }, type, magic, msg, remoteInfo });

		_logPacket(getKey("query.server.network.packets.handshake").replace("%s%", `${remoteInfo.address}`));
		_sendHandshake(remoteInfo, msg, clientTokens, socket, info);
	} else if (type === 0x00 && msg.length == 15) {
		Frog.eventEmitter.emit("queryFullInfoPacket", { query: { info: info, socket: socket }, type, magic, msg, remoteInfo });

		_logPacket(getKey("query.server.network.packets.fullInfo").replace("%s%", `${remoteInfo.address}`));
		_sendFullInfo(remoteInfo, msg, clientTokens, socket, info);
	} else if (type === 0x00 && msg.length == 11) {
		Frog.eventEmitter.emit("queryBasicInfoPacket", { query: { info: info, socket: socket }, type, magic, msg, remoteInfo });

		_logPacket(getKey("query.server.network.packets.basicInfo").replace("%s%", `${remoteInfo.address}`));
		_sendBasicInfo(remoteInfo, msg, clientTokens, socket, info);
	}
}

/**
 * @param {Buffer} remoteInfo
 * @param {dgram.RemoteInfo} msg
 * @param {JSON} clientTokens
 * @param {dgram.Socket} socket
 * @param {JSON} info
 */
function _sendHandshake(remoteInfo, msg, clientTokens, socket, info) {
	const sessionID = msg.readInt32BE(3);
	const clientToken = clientTokens.get(remoteInfo.address).token;

	if (!clientTokens.has(remoteInfo.address) || clientTokens.get(remoteInfo.address).expiresAt < Date.now()) {
		return;
	}

	const buffer = new SmartBuffer();
	buffer.writeUInt8(0x09);
	buffer.writeInt32BE(sessionID);
	buffer.writeStringNT(clientToken.toString());

	const data = buffer.toBuffer();

	socket.send(data, 0, data.length, remoteInfo.port, remoteInfo.address, (err) => {
		if (err) {
			Frog.eventEmitter.emit.emit("queryError", { query: { info: info, socket: socket }, error: err });

			Logger.error(getKey("query.server.error").replace("%s%", err.stack));
		}
	});
}

/**
 * @param {dgram.RemoteInfo} remoteInfo
 * @param {Buffer} message
 * @param {JSON} clientTokens
 * @param {dgram.Socket} socket
 * @param {JSON} info
 */
function _sendBasicInfo(remoteInfo, message, clientTokens, socket, info) {
	const sessionID = message.readInt32BE(3);
	const clientToken = clientTokens.get(remoteInfo.address).token;

	if (!clientTokens.has(remoteInfo.address) || clientTokens.get(remoteInfo.address).expiresAt < Date.now() || clientToken !== clientTokens.get(remoteInfo.address).token) {
		return;
	}

	const buffer = new SmartBuffer();

	buffer.writeUInt8(0x00);
	buffer.writeInt32BE(sessionID);
	buffer.writeStringNT(info.motd);
	buffer.writeStringNT("MINECRAFTBE");
	buffer.writeStringNT(info.levelName);
	buffer.writeStringNT(String(info.players.length));
	buffer.writeStringNT(String(info.maxPlayers));
	buffer.writeUInt16LE(info.port);
	buffer.writeStringNT(info.host);

	const data = buffer.toBuffer();

	socket.send(data, 0, data.length, remoteInfo.port, remoteInfo.address, (err) => {
		if (err) {
			Frog.eventEmitter.emit.emit("queryError", { query: { info: info, socket: socket }, error: err });

			Logger.error(getKey("query.server.error").replace("%s%", err.stack));
		}
	});
}

/**
 * @param {dgram.RemoteInfo} remoteInfo
 * @param {Buffer} message
 * @param {JSON} clientTokens
 * @param {dgram.Socket} socket
 * @param {JSON} info
 */
function _sendFullInfo(remoteInfo, message, clientTokens, socket, info) {
	const sessionID = message.readInt32BE(3);
	const clientToken = clientTokens.get(remoteInfo.address).token;

	if (!clientTokens.has(remoteInfo.address) || clientTokens.get(remoteInfo.address).expiresAt < Date.now() || clientToken !== clientTokens.get(remoteInfo.address).token) {
		return;
	}

	const kvData = [
		{ key: "hostname", value: info.motd },
		{ key: "gametype", value: info.gamemode },
		{ key: "game_id", value: "MINECRAFTBE" },
		{ key: "version", value: info.version },
		{ key: "server_engine", value: "GreenFrogMCBE" },
		{ key: "plugins", value: `GreenFrogMCBE: ${info.plugins.join("; ")}` },
		{ key: "map", value: info.levelName },
		{ key: "numplayers", value: info.players.length },
		{ key: "maxplayers", value: info.maxPlayers },
		{ key: "whitelist", value: info.wl },
		{ key: "hostip", value: info.host },
		{ key: "hostport", value: info.port },
	];

	const buffer = new SmartBuffer();

	buffer.writeUInt8(0x00);
	buffer.writeInt32BE(sessionID);
	buffer.writeStringNT("splitnum");
	buffer.writeUInt8(0x80);
	buffer.writeUInt8(0x00);

	kvData.forEach(({ key, value }) => {
		buffer.writeStringNT(String(key));
		buffer.writeStringNT(String(value));
	});

	buffer.writeUInt8(0x00).writeUInt8(0x01).writeStringNT("player_").writeUInt8(0x00);

	info.players.forEach((playerName) => {
		buffer.writeStringNT(playerName);
	});

	buffer.writeUInt8(0x00);

	const data = buffer.toBuffer();
	socket.send(data, 0, data.length, remoteInfo.port, remoteInfo.address, (err) => {
		if (err) {
			Frog.eventEmitter.emit.emit("queryError", { query: { info: info, socket: socket }, error: err });

			Logger.error(getKey("query.server.error").replace("%s%", err.stack));
		}
	});
}

class Query {
	constructor() {
		/** @type {dgram.Socket} */
		this.socket = dgram.createSocket("udp4");
		/** @type {JSON} */
		this.info = {};
		/** @type {Map} */
		this.clientTokens = new Map();
	}

	/**
	 * @param {JSON} info
	 */
	start(info) {
		Frog.eventEmitter.emit("queryStart", { query: { info: this.info, socket: this.socket } });

		this.info = info;
		this.socket.bind(this.info.port);

		Frog.eventEmitter.emit("queryListen", { query: { info: this.info, socket: this.socket } });

		this.socket.on("listening", () => {
			const address = this.socket.address();

			Logger.info(getKey("query.server.listening").replace("%s%", `/${address.address}:${address.port}`));
		});

		this.socket.on("message", (msg, remoteInfo) => {
			_handle(msg, remoteInfo, this.clientTokens, this.socket, this.info);
		});
	}
}

module.exports = Query;

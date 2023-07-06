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
 */
function _handle(msg, remoteInfo) {
	const magic = msg.readUInt16BE(0);
	const type = msg.readUInt8(2);

	if (magic !== 0xfefd) {
		Frog.eventEmitter.emit("queryInvalidPacket", { query: { info: this.info, socket: this.socket }, type, magic, msg, remoteInfo });

		if (config.query.logConnections) Logger.warning(getKey("query.server.network.invalidPacket").replace("%s%", `${remoteInfo.address}`));
		return;
	}

	if ((this.clientTokens.has(remoteInfo.address) && this.clientTokens.get(remoteInfo.address).expiresAt < Date.now()) || !this.clientTokens.has(remoteInfo.address)) {
		Logger.info(getKey("query.server.network.generatingToken").replace("%s%", `${remoteInfo.address}`));

		this.clientTokens.set(remoteInfo.address, {
			token: this._generateToken(),
			expiresAt: Date.now() + 30 * 1000,
		});
	}

	if (type === 0x09) {
		Frog.eventEmitter.emit("queryHandshakePacket", { query: { info: this.info, socket: this.socket }, type, magic, msg, remoteInfo });

		Logger.info(getKey("query.server.network.packets.handshake").replace("%s%", `${remoteInfo.address}`));
		this._sendHandshake(remoteInfo, msg);
	} else if (type === 0x00 && msg.length == 15) {
		Frog.eventEmitter.emit("queryFullInfoPacket", { query: { info: this.info, socket: this.socket }, type, magic, msg, remoteInfo });

		Logger.info(getKey("query.server.network.packets.fullInfo").replace("%s%", `${remoteInfo.address}`));
		this._sendFullInfo(remoteInfo, msg);
	} else if (type === 0x00 && msg.length == 11) {
		Frog.eventEmitter.emit("queryBasicInfoPacket", { query: { info: this.info, socket: this.socket }, type, magic, msg, remoteInfo });

		Logger.info(getKey("query.server.network.packets.basicInfo").replace("%s%", `${remoteInfo.address}`));
		this._sendBasicInfo(remoteInfo, msg);
	}
}

/**
 * @param {Buffer} remoteInfo
 * @param {dgram.RemoteInfo} msg
 */
function _sendHandshake(remoteInfo, msg) {
	const sessionID = msg.readInt32BE(3);
	const clientToken = this.clientTokens.get(remoteInfo.address).token;

	if (!this.clientTokens.has(remoteInfo.address) || this.clientTokens.get(remoteInfo.address).expiresAt < Date.now()) {
		return;
	}

	const buffer = new SmartBuffer();
	buffer.writeUInt8(0x09).writeInt32BE(sessionID).writeStringNT(clientToken.toString());

	const data = buffer.toBuffer();

	this.socket.send(data, 0, data.length, remoteInfo.port, remoteInfo.address, (err) => {
		if (err) {
			Frog.eventEmitter.emit.emit("queryError", { query: { info: this.info, socket: this.socket }, error: err });
			Logger.error(getKey("query.server.error").replace("%s%", err.stack));
		}
	});
}

/**
 * @param {dgram.RemoteInfo} remoteInfo
 * @param {Buffer} message
 */
function _sendBasicInfo(remoteInfo, message) {
	const sessionID = message.readInt32BE(3);
	const clientToken = this.clientTokens.get(remoteInfo.address).token;

	if (!this.clientTokens.has(remoteInfo.address) || this.clientTokens.get(remoteInfo.address).expiresAt < Date.now() || clientToken !== this.clientTokens.get(remoteInfo.address).token) {
		return;
	}

	const buffer = new SmartBuffer();

	buffer.writeUInt8(0x00).writeInt32BE(sessionID).writeStringNT(this.info.motd).writeStringNT("MINECRAFTBE").writeStringNT(this.info.levelName).writeStringNT(String(this.info.players.length)).writeStringNT(String(this.info.maxPlayers)).writeUInt16LE(this.info.port).writeStringNT(this.info.host);

	const data = buffer.toBuffer();

	this.socket.send(data, 0, data.length, remoteInfo.port, remoteInfo.address, (err) => {
		if (err) {
			Frog.eventEmitter.emit.emit("queryError", { query: { info: this.info, socket: this.socket }, error: err });
			Logger.error(getKey("query.server.error").replace("%s%", err.stack));
		}
	});
}

/**
 * @param {dgram.RemoteInfo} remoteInfo
 * @param {Buffer} message
 */
function _sendFullInfo(remoteInfo, message) {
	const sessionID = message.readInt32BE(3);
	const clientToken = this.clientTokens.get(remoteInfo.address).token;

	if (!this.clientTokens.has(remoteInfo.address) || this.clientTokens.get(remoteInfo.address).expiresAt < Date.now() || clientToken !== this.clientTokens.get(remoteInfo.address).token) {
		return;
	}

	const kvData = [
		{ key: "hostname", value: this.info.motd },
		{ key: "gametype", value: this.info.gamemode },
		{ key: "game_id", value: "MINECRAFTBE" },
		{ key: "version", value: this.info.version },
		{ key: "server_engine", value: "GreenFrogMCBE" },
		{ key: "plugins", value: `GreenFrogMCBE: ${this.info.plugins.join("; ")}` },
		{ key: "map", value: this.info.levelName },
		{ key: "numplayers", value: this.info.players.length },
		{ key: "maxplayers", value: this.info.maxPlayers },
		{ key: "whitelist", value: this.info.wl },
		{ key: "hostip", value: this.info.host },
		{ key: "hostport", value: this.info.port },
	];

	const buffer = new SmartBuffer();

	buffer.writeUInt8(0x00).writeInt32BE(sessionID).writeStringNT("splitnum").writeUInt8(0x80).writeUInt8(0x00);

	kvData.forEach(({ key, value }) => {
		buffer.writeStringNT(String(key));
		buffer.writeStringNT(String(value));
	});

	buffer.writeUInt8(0x00).writeUInt8(0x01).writeStringNT("player_").writeUInt8(0x00);

	this.info.players.forEach((playerName) => {
		buffer.writeStringNT(playerName);
	});

	buffer.writeUInt8(0x00);

	const data = buffer.toBuffer();
	this.socket.send(data, 0, data.length, remoteInfo.port, remoteInfo.address, (err) => {
		if (err) {
			Frog.eventEmitter.emit.emit("queryError", { query: { info: this.info, socket: this.socket }, error: err });
			Logger.error(getKey("query.server.error").replace("%s%", err.stack));
		}
	});
}

class Query {
	/** @type {Map} */
	clientTokens = new Map();

	constructor() {
		/** @type {dgram.Socket} */
		this.socket = dgram.createSocket("udp4");
		/** @type {JSON} */
		this.info = {};
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
			_handle(msg, remoteInfo);
		});
	}
}

module.exports = Query;

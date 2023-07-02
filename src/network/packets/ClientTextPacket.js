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
const Frog = require("../../Frog");

const PlayerInfo = require("../../api/player/PlayerInfo");
const Logger = require("../../server/Logger");

const PacketConstructor = require("./PacketConstructor");

const { getKey } = require("../../utils/Language");
const { serverConfigurationFiles } = Frog;
const { config } = serverConfigurationFiles;

class ClientTextPacket extends PacketConstructor {
	name = "text";

	async readPacket(player, packet, server) {
		const message = packet.data.params.message;

		if (shouldDisableChat() || isEmptyMessage(message)) {
			return;
		}

		if (!shouldChat(server, player, message)) {
			return;
		}

		if (shouldBlockInvalidMessages()) {
			const cleanMessage = cleanInvalidCharacters(message);

			if (isMessageTooLong(cleanMessage)) {
				handleMalformattedChatMessage(server, player, cleanMessage);
				return;
			}
		}

		const formattedMessage = formatMessage(player.username, message);

		logMessage(formattedMessage);
		sendMessageToPlayers(formattedMessage);
	}
}

function shouldDisableChat() {
	return config.chat.disable;
}

function isEmptyMessage(message) {
	return !message.trim();
}

function shouldChat(server, player, message) {
	let shouldChat = true;

	Frog.eventEmitter.emit("playerChat", {
		server,
		player,
		message,
		cancel: () => {
			shouldChat = false;
		},
	});

	return shouldChat;
}

function shouldBlockInvalidMessages() {
	return config.chat.blockInvalidMessages;
}

function cleanInvalidCharacters(message) {
	return message.replace(/§/g, "");
}

function isMessageTooLong(message) {
	return message.length > 256;
}

function handleMalformattedChatMessage(server, player, message) {
	Frog.eventEmitter.emit("playerMalformattedChatMessage", {
		server,
		player,
		message,
	});
}

function formatMessage(username, message) {
	return getKey("chat.format").replace("%s%", username).replace("%d%", message.replace(/§/g, ""));
}

function logMessage(message) {
	Logger.info(message);
}

function sendMessageToPlayers(message) {
	for (const recipient of PlayerInfo.players) {
		recipient.sendMessage(message);
	}
}

module.exports = ClientTextPacket;

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
const Frog = require("../../Frog");

const PlayerInfo = require("../../api/player/PlayerInfo");
const Logger = require("../../server/Logger");

const PacketConstructor = require("./PacketConstructor");

const { getKey } = require("../../utils/Language");

class ClientTextPacket extends PacketConstructor {
	name = "text";

	async readPacket(player, packet) {
		const message = packet.data.params.message;

		if (shouldDisableChat() || isEmptyMessage(message)) {
			return;
		}

		if (!shouldChat(player, message)) {
			return;
		}

		if (shouldBlockInvalidMessages()) {
			const cleanMessage = cleanInvalidCharacters(message);

			if (isMessageTooLong(cleanMessage)) {
				handleMalformattedChatMessage(player, cleanMessage);
				return;
			}
		}

		const formattedMessage = formatMessage(player.username, message);

		logMessage(formattedMessage);
		sendMessageToPlayers(formattedMessage);
	}
}

function shouldDisableChat() {
	return require("../../Frog").config.chat.disable;
}

function isEmptyMessage(message) {
	return !message.trim();
}

function shouldChat(player, message) {
	let shouldChat = true;

	Frog.eventEmitter.emit("playerChat", {
		player,
		message,
		cancel: () => {
			shouldChat = false;
		},
	});

	return shouldChat;
}

function shouldBlockInvalidMessages() {
	return require("../../Frog").config.chat.blockInvalidMessages;
}

function cleanInvalidCharacters(message) {
	return message.replace(/§/g, "");
}

function isMessageTooLong(message) {
	return message.length > 256;
}

function handleMalformattedChatMessage(player, message) {
	Frog.eventEmitter.emit("playerMalformattedChatMessage", {
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

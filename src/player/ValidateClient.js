/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 *
 * Copyright 2023 andriycraft
 * Github: https://github.com/andriycraft/GreenFrogMCBE
 */
const Logger = require("../server/Logger");
const { lang, config } = require("../api/ServerInfo");

module.exports = {
	_initAndValidateClient(client) {
		client.ip = client.connection.address.split("/")[0];
		client.port = client.connection.address.split("/")[1];
		client.fullip = client.connection.address;
		client.username = client.getUserData().displayName;
		client.offline = false;
		client.items = [];
		client.gamemode = config.gamemode;
		client.op = false;

		if (client.username.includes(" ")) {
			Logger.warning(lang.errors.invalidUsernameWarning.replace("%player%", client.username));

			client.usernameold = client.username;
			client.username = client.username.replace(" ", "_");
		}

		if (client.username.length > 16 || client.username.length < 3) {
			client.kick(lang.errors.invalidUsername);
		}

		Logger.info(lang.playerstatuses.playerConnected.replace("%player%", client.username).replace("%ip%", client.fullip));
	},
};

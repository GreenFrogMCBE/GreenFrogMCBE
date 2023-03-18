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
/* eslint-disable no-unused-vars */
const Event = require("./Event");
const FailedToHandleEvent = require("./exceptions/FailedToHandleEvent");

const fs = require("fs");
const { readdir } = require("fs/promises");

class PlayerCommandExecuteEvent extends Event {
	constructor() {
		super();
		this.cancelled = false;
		this.name = "PlayerCommandExecuteEvent";
	}

	cancel() {
		this.cancelled = true;
	}

	execute(server, client, command) {
		fs.readdir("./plugins", (err, plugins) => {
			plugins.forEach((plugin) => {
				try {
					require(`${__dirname}/../../../plugins/${plugin}`).PlayerCommandExecuteEvent(server, client, command, this);
				} catch (e) {
					FailedToHandleEvent.handleEventError(e, plugin, this.name);
				}
			});
		});
		this.postExecute(client, command);
	}

	isCancelled() {
		return this.cancelled;
	}

	async postExecute(client, message) {
		const cmds = await readdir("./src/server/commands");
		const { lang } = require("../../server/ServerInfo");

		let exists = false;
		const name = message.replace("/", "").split(" ")[0];
		const args = message.split(" ").slice(1);
		for (const camd of cmds) {
			/**
			 * @type {import('../../base/Command').Command}
			 */
			const command = require(`../../server/commands/${camd}`);

			if (command.data.name === name) {
				if (command.data.minArg && command.data.minArg > args.length) {
					client.sendMessage(lang.commands.minArg.replace("%m", command.data.minArg).replace("%r", args.length));
					exists = true;
					return;
				}

				if (command.data.maxArg && command.data.maxArg < args.length) {
					client.sendMessage(lang.commands.maxArg.replace("%m", command.data.maxArg).replace("%r", args.length));
					exists = true;
					return;
				}

				const server = require("../../Server");
				command.run(server, client, args);
				exists = true;
			}
		}

		if (!exists) {
			client.sendMessage(lang.commands.unknownCommand);
		}
	}
}

module.exports = PlayerCommandExecuteEvent;

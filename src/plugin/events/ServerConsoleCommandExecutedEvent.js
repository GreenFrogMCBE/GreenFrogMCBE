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
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
const FailedToHandleEvent = require("./exceptions/FailedToHandleEvent");
const Event = require("./Event");
const server = require("../../Server");

const fs = require("fs");
const { lang } = require("../../server/ServerInfo");
const { readdir } = require("fs/promises");
const Logger = require("../../server/Logger");

class ServerConsoleCommandExecutedEvent extends Event {
	constructor() {
		super();
		this.cancelled = false;
		this.name = "ServerConsoleCommandExecutedEvent";
	}

	cancel() {
		this.cancelled = true;
	}

	execute(server, command) {
		fs.readdir("./plugins", (err, plugins) => {
			plugins.forEach((plugin) => {
				try {
					require(`${__dirname}/../../../plugins/${plugin}`).ServerConsoleCommandExecutedEvent(server, command, this);
				} catch (e) {
					FailedToHandleEvent.handleEventError(e, plugin, this.name);
				}
			});
		});
		this.postExecute(command);
	}

	isCancelled() {
		return this.cancelled;
	}

	async postExecute(cmd) {
		const cmds = await readdir("./src/server/commands");

		let exists = false;
		const name = cmd.split(" ")[0];
		const args = cmd.split(" ").slice(1);
		for (const camd of cmds) {
			/**
			 * @type {import('../../base/Command').Command}
			 */
			const command = require(`../../server/commands/${camd}`);

			if (command.data.name === name) {
				if (command.data.minArg && command.data.minArg > args.length) {
					Logger.log(lang.commands.minArg.replace("%m", command.data.minArg).replace("%r", args.length));
					exists = true;
					return;
				}

				if (command.data.maxArg && command.data.maxArg < args.length) {
					Logger.log(lang.commands.maxArg.replace("%m", command.data.minArg).replace("%r", args.length));
					exists = true;
					return;
				}

				command.runAsConsole(server);
				exists = true;
			}
		}

		if (!exists) {
			Logger.log(lang.commands.unknownCommand);
		}
	}
}

module.exports = ServerConsoleCommandExecutedEvent;

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
const Event = require("./Event");
const { readdir } = require("fs/promises")
const Logger = require("../../server/Logger");
const { lang } = require("../../server/ServerInfo");

class ServerConsoleCommandExecutedEvent extends Event {
	constructor() {
		super();
		this.cancelled = false;
		this.name = "ServerConsoleExecutedEvent";
		this.server = null;
		this.command = null;
	}

	cancel() {
		this.cancelled = true;
	}

	async execute() {
		await this._execute(this);

		if (!this.cancelled) {
			const cmds = await readdir("./src/commands");

			let exists = false;
			const name = this.command.split(" ")[0];
			const args = this.command.split(" ").slice(1);

			for (const camd of cmds) {
				/**
				 * @type {import('../../base/Command').Command}
				 */
				const command = require(`../../server/commands/${camd}`);

				if (command.data.name === name || command.data.aliases && command.data.aliases.includes(name)) {
					if (command.data.minArg && command.data.minArg > args.length) {
						Logger.info(lang.commands.minArg.replace("%m%", command.data.minArg).replace("%r%", args.length));
						exists = true;
						return;
					}

					if (command.data.maxArg && command.data.maxArg < args.length) {
						Logger.info(lang.commands.maxArg.replace("%m%", command.data.maxArg).replace("%r%", args.length));
						exists = true;
						return;
					}

					command.runAsConsole(this.server, args);
					exists = true;
				}
			}

			if (!exists && this.command) {
				Logger.info(lang.errors.unknownCommandOrNoPermission.replace('%commandname%', this.command));
			}
		}
	}
}

module.exports = ServerConsoleCommandExecutedEvent;

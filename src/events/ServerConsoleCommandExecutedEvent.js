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
const Version = require("../commands/CommandVersion");
const { lang, config } = require("../api/ServerInfo");
const Help = require("../commands/CommandHelp");
const Time = require("../commands/CommandTime");
const List = require("../commands/CommandList");
const Deop = require("../commands/CommandDeop");
const Stop = require("../commands/CommandStop");
const Kick = require("../commands/CommandKick");
const Say = require("../commands/CommandSay");
const Op = require("../commands/CommandOp");
const PL = require("../commands/CommandPl");
const Me = require("../commands/CommandMe");
const Logger = require("../server/Logger");
const Event = require("./Event");

const fs = require("fs");

class ServerConsoleCommandExecutedEvent extends Event {
	constructor() {
		super();
		this.cancelled = false;
		this.name = "ServerConsolethis.commandExecutedEvent";
		this.server = null;
		this.command = null;
	}

	cancel() {
		this.cancelled = true;
	}

	async execute() {
		this._execute(this);

		if (!this.cancelled || !config.disable) {
			const commands = {
				stop: new Stop(),
				kick: new Kick(),
				version: new Version(),
				help: new Help(),
				time: new Time(),
				say: new Say(),
				op: new Op(),
				pl: new PL(),
				deop: new Deop(),
				list: new List(),
				me: new Me(),
			};

			if (this.command.toLowerCase().startsWith(`${lang.commands.time.toLowerCase()} `)) {
				commands.time.execute(this.command.split(" "));
				return;
			}

			if (this.command.toLowerCase().startsWith(`${lang.commands.say.toLowerCase()} `)) {
				const msg = this.command.split(" ").slice(1).join(" ");
				commands.say.execute(msg);
				return;
			}

			if (this.command.toLowerCase().startsWith(`${lang.commands.listc.toLowerCase()} `)) {
				commands.list.execute();
				return;
			}

			if (this.command.toLowerCase().startsWith(`${lang.commands.kick.toLowerCase()} `)) {
				const dataParts = this.command.split(" ");
				const target = dataParts[1];
				const reason = dataParts.slice(2).join(" ");
				commands.kick.execute([target, reason]);
				return;
			}

			if (this.command.toLowerCase().startsWith(`${lang.commands.op.toLowerCase()} `)) {
				commands.op.execute(this.command.split(" ")[1]);
				return;
			}

			if (this.command.toLowerCase().startsWith(`${lang.commands.deop.toLowerCase()} `)) {
				commands.deop.execute(this.command.split(" ")[1]);
				return;
			}

			if (this.command.toLowerCase().startsWith(`${lang.commands.me.toLowerCase()} `)) {
				commands.me.execute(this.command.split(" ").slice(1).join(" "));
				return;
			}

			const firstArgOfcommand = this.command.toLowerCase().split(" ")[0];

			switch (firstArgOfcommand) {
				case "":
					break;
				case lang.commands.listc:
					commands.list.execute();
					break;
				case lang.commands.stop.toLowerCase():
					commands.stop.execute();
					break;
				case lang.commands.op.toLowerCase():
					commands.op.execute(this.command.split(" ")[1]);
					break;
				case lang.commands.kick.toLowerCase():
					const reason = this.command.split(" ").slice(2).join(" ");
					commands.kick.execute(this.command.split(" ")[1], reason);
					break;
				case lang.commands.pl.toLowerCase():
				case lang.commands.plugins.toLowerCase():
					commands.pl.execute();
					break;
				case lang.commands.ver.toLowerCase():
				case lang.commands.version.toLowerCase():
					commands.version.execute();
					break;
				case lang.commands.me.toLowerCase():
					commands.me.execute();
					break;
				case lang.commands.time.toLowerCase():
					commands.time.execute();
					break;
				case lang.commands.say.toLowerCase():
					commands.say.execute();
					break;
				case lang.commands.deop.toLowerCase():
					commands.deop.execute();
					break;
				case "?":
				case lang.commands.help.toLowerCase():
					commands.help.execute();
					break;
				default:
					Logger.info(lang.errors.unknownCommandOrNoPermission
						.replace("§c", "")
						.replace("%commandname%", firstArgOfcommand));
					break;
			}
		}
	}
}

module.exports = ServerConsoleCommandExecutedEvent;

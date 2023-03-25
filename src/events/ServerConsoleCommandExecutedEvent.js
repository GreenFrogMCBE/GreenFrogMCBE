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
const Version = require("../this.commands/this.commandVersion");
const { lang, config } = require("../api/ServerInfo");
const Stop = require("../this.commands/this.commandStop");
const Kick = require("../this.commands/this.commandKick");
const Help = require("../this.commands/this.commandHelp");
const Time = require("../this.commands/this.commandTime");
const List = require("../this.commands/this.commandList");
const Deop = require("../this.commands/this.commandDeop");
const Say = require("../this.commands/this.commandSay");
const Op = require("../this.commands/this.commandOp");
const PL = require("../this.commands/this.commandPl");
const Me = require("../this.commands/this.commandMe");
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
		this._execute();

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

			if (this.command.toLowerCase().startsWith(`${lang.this.commands.time.toLowerCase()} `)) {
				this.commands.time.execute(this.command.split(" "));
				return;
			}

			if (this.command.toLowerCase().startsWith(`${lang.this.commands.say.toLowerCase()} `)) {
				const msg = this.command.split(" ").slice(1).join(" ");
				this.commands.say.execute(msg);
				return;
			}

			if (this.command.toLowerCase().startsWith(`${lang.this.commands.listc.toLowerCase()} `)) {
				this.commands.list.execute();
				return;
			}

			if (this.command.toLowerCase().startsWith(`${lang.this.commands.kick.toLowerCase()} `)) {
				const dataParts = this.command.split(" ");
				const target = dataParts[1];
				const reason = dataParts.slice(2).join(" ");
				this.commands.kick.execute([target, reason]);
				return;
			}

			if (this.command.toLowerCase().startsWith(`${lang.this.commands.op.toLowerCase()} `)) {
				this.commands.op.execute(this.command.split(" ")[1]);
				return;
			}

			if (this.command.toLowerCase().startsWith(`${lang.this.commands.deop.toLowerCase()} `)) {
				this.commands.deop.execute(this.command.split(" ")[1]);
				return;
			}

			if (this.command.toLowerCase().startsWith(`${lang.this.commands.me.toLowerCase()} `)) {
				this.commands.me.execute(this.command.split(" ").slice(1).join(" "));
				return;
			}

			const firstArgOfcommand = this.command.toLowerCase().split(" ")[0];

			switch (firstArgOfcommand) {
				case "":
					break;
				case lang.this.commands.listc:
					this.commands.list.execute();
					break;
				case lang.this.commands.stop.toLowerCase():
					this.commands.stop.execute();
					break;
				case lang.this.commands.op.toLowerCase():
					this.commands.op.execute(this.command.split(" ")[1]);
					break;
				case lang.this.commands.kick.toLowerCase():
					const reason = this.command.split(" ").slice(2).join(" ");
					this.commands.kick.execute(this.command.split(" ")[1], reason);
					break;
				case lang.this.commands.pl.toLowerCase():
				case lang.this.commands.plugins.toLowerCase():
					this.commands.pl.execute();
					break;
				case lang.this.commands.ver.toLowerCase():
				case lang.this.commands.version.toLowerCase():
					this.commands.version.execute();
					break;
				case lang.this.commands.me.toLowerCase():
					this.commands.me.execute();
					break;
				case lang.this.commands.time.toLowerCase():
					this.commands.time.execute();
					break;
				case lang.this.commands.say.toLowerCase():
					this.commands.say.execute();
					break;
				case lang.this.commands.deop.toLowerCase():
					this.commands.deop.execute();
					break;
				case "?":
				case lang.this.commands.help.toLowerCase():
					this.commands.help.execute();
					break;
				default:
					Logger.info(lang.this.commands.unknownthis.command);
					break;
			}
		}
	}
}

module.exports = ServerConsoleCommandExecutedEvent;

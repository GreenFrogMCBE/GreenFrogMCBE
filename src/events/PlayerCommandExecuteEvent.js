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
const fs = require("fs");
const Event = require("./Event");
const Logger = require("../server/Logger");
const { config, lang } = require("../api/ServerInfo");
const FailedToHandleEvent = require("./exceptions/FailedToHandleEvent");
const CommandHelp = require("../commands/CommandHelp");
const CommandShutdown = require("../commands/CommandStop");
const CommandKick = require("../commands/CommandKick");
const CommandVersion = require("../commands/CommandVersion");
const CommandTime = require("../commands/CommandTime");
const CommandSay = require("../commands/CommandSay");
const CommandOp = require("../commands/CommandOp");
const CommandPl = require("../commands/CommandPl");
const CommandDeop = require("../commands/CommandDeop");
const CommandList = require("../commands/CommandList");
const CommandMe = require("../commands/CommandMe");
const CommandManager = require("../player/CommandManager");
const CommandGamemode = require("../commands/CommandGamemode");

class PlayerCommandExecuteEvent extends Event {
	constructor() {
		super();
		this.cancelled = false;
		this.name = "PlayerCommandExecuteEvent";
	}

	cancel() {
		this.cancelled = true;
	}

	async execute(server, client, command) {
		await new Promise((resolve) => {
			fs.readdir("./plugins", (err, plugins) => {
				plugins.forEach((plugin) => {
					try {
						require(`${__dirname}/../../plugins/${plugin}`).PlayerCommandExecuteEvent(
							server,
							client,
							command,
							this
						);
					} catch (e) {
						FailedToHandleEvent.handleEventError(e, plugin, this.name);
					}
				});
				resolve();
			});
		});

		if (!this.cancelled || config.commandsDisabled) {
			Logger.info(lang.commands.executedCommand.replace("%player%", client.username).replace("%cmd%", command));

			const cmdGamemode = new CommandGamemode();
			const cmdManager = new CommandManager();
			const cmdVer = new CommandVersion();
			const cmdPl = new CommandPl();
			const cmdStop = new CommandShutdown();
			const cmdSay = new CommandSay();
			const cmdOp = new CommandOp();
			const cmdKick = new CommandKick();
			const cmdTime = new CommandTime();
			const cmdDeop = new CommandDeop();
			const cmdList = new CommandList();
			const cmdMe = new CommandMe();

			let exists = false;
			for (let i = 0; i < cmdManager.getCommands().length; i++) {
				if (`${cmdManager.getCommands()[i].name.toLowerCase()}`.startsWith(command.replace("/", "").split(" ")[0].replace(" ", ""))) {
					exists = true;
					break;
				}
			}

			if (!exists || command === "/") {
				client.sendMessage(lang.errors.playerUnknownCommandOrNoPermission.replace("%commandname%", command));
			} else {
				const commands = {
					ver: `/${lang.commands.ver.toLowerCase()}`,
					version: `/${lang.commands.version.toLowerCase()}`,
					pl: `/${lang.commands.pl.toLowerCase()}`,
					plugins: `/${lang.commands.plugins.toLowerCase()}`,
					stop: `/${lang.commands.stop.toLowerCase()}`,
					say: `/${lang.commands.say.toLowerCase()}`,
					op: `/${lang.commands.op.toLowerCase()}`,
					kick: `/${lang.commands.kick.toLowerCase()}`,
					time: `/${lang.commands.time.toLowerCase()}`,
					deop: `/${lang.commands.deop.toLowerCase()}`,
					list: `/${lang.commands.listc.toLowerCase()}`,
					me: `/${lang.commands.me.toLowerCase()}`,
					gamemode: `/gamemode`,
				};

				const commandsToExecute = {
					[commands.ver]: cmdVer,
					[commands.version]: cmdVer,
					[commands.pl]: cmdPl,
					[commands.plugins]: cmdPl,
					[commands.stop]: cmdStop,
					[commands.say]: cmdSay,
					[commands.op]: cmdOp,
					[commands.kick]: cmdKick,
					[commands.time]: cmdTime,
					[commands.deop]: cmdDeop,
					[commands.list]: cmdList,
					[commands.me]: cmdMe,
					[commands.gamemode]: cmdGamemode,
				};

				const commandFound = Object.keys(commandsToExecute).find((foundCommand) => command.startsWith(foundCommand));

				if (commandFound) {
					commandsToExecute[commandFound].executePlayer(client, command);
				}
			}
		}
	}
}

module.exports = PlayerCommandExecuteEvent;
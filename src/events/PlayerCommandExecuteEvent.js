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
const Event = require("./Event");
// const Logger = require("../server/Logger");
// const { lang, config } = require("../api/ServerInfo");
// const CommandOp = require("../commands/CommandOp");
// const CommandPl = require("../commands/CommandPl");
// const CommandMe = require("../commands/CommandMe");
// const CommandSay = require("../commands/CommandSay");
// const CommandDeop = require("../commands/CommandDeop");
// const CommandList = require("../commands/CommandList");
// const CommandHelp = require("../commands/CommandHelp");
// const CommandStop = require("../commands/CommandStop");
// const CommandKick = require("../commands/CommandKick");
// const CommandTime = require("../commands/CommandTime");
// const CommandManager = require("../player/CommandManager");
// const CommandVersion = require("../commands/CommandVersion");
// const CommandGamemode = require("../commands/CommandGamemode");

class PlayerCommandExecuteEvent extends Event {
	constructor() {
		super();
		this.cancelled = false;
		this.name = "PlayerCommandExecuteEvent";
		this.server = null;
		this.player = null;
		this.command = null;
	}

	cancel() {
		this.cancelled = true;
	}

	async execute() {
		await this._execute(this);

		// if (!this.cancelled || config.commandsDisabled) {
		// 	Logger.info(lang.commands.executedCommand.replace("%player%", this.player.username).replace("%cmd%", this.command));

		// 	let exists = false;

		// 	const cmdManager = new CommandManager();

		// 	const commandName = this.command.replace("/", "").split(" ")[0].replace(" ", "").toLowerCase();
		// 	const commandlist = cmdManager.getCommands();

		// 	for (let i = 0; i < commandlist.length; i++) {
		// 		if (commandlist[i].name.toLowerCase().startsWith(commandName)) {
		// 			exists = true;
		// 			break;
		// 		}
		// 	}

		// 	if (!exists || this.command === "/") {
		// 		const errorMsg = lang.errors.unknownCommandOrNoPermission.replace("%commandname%", this.command);
		// 		this.player.sendMessage(errorMsg);
		// 		return;
		// 	}

		// 	const commands = {
		// 		ver: `/${lang.commands.ver.toLowerCase()}`,
		// 		version: `/${lang.commands.version.toLowerCase()}`,
		// 		pl: `/${lang.commands.pl.toLowerCase()}`,
		// 		plugins: `/${lang.commands.plugins.toLowerCase()}`,
		// 		stop: `/${lang.commands.stop.toLowerCase()}`,
		// 		say: `/${lang.commands.say.toLowerCase()}`,
		// 		op: `/${lang.commands.op.toLowerCase()}`,
		// 		kick: `/${lang.commands.kick.toLowerCase()}`,
		// 		time: `/${lang.commands.time.toLowerCase()}`,
		// 		deop: `/${lang.commands.deop.toLowerCase()}`,
		// 		list: `/${lang.commands.listc.toLowerCase()}`,
		// 		me: `/${lang.commands.me.toLowerCase()}`,
		// 		gamemode: `/gamemode`,
		// 	};

		// 	const commandsToExecute = {
		// 		[commands.ver]: new CommandVersion(),
		// 		[commands.version]: new CommandVersion(),
		// 		[commands.pl]: new CommandPl(),
		// 		[commands.plugins]: new CommandPl(),
		// 		[commands.stop]: new CommandStop(),
		// 		[commands.say]: new CommandSay(),
		// 		[commands.op]: new CommandOp(),
		// 		[commands.kick]: new CommandKick(),
		// 		[commands.time]: new CommandTime(),
		// 		[commands.deop]: new CommandDeop(),
		// 		[commands.list]: new CommandList(),
		// 		[commands.me]: new CommandMe(),
		// 		[commands.gamemode]: new CommandGamemode(),
		// 	};

		// 	const commandFound = Object.keys(commandsToExecute).find((foundCommand) => this.command.startsWith(foundCommand));

		// 	if (commandFound) commandsToExecute[commandFound].executePlayer(this.player, this.command);
		// }
	}
}

module.exports = PlayerCommandExecuteEvent;

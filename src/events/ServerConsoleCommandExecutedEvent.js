const Event = require("./Event");
const Logger = require("../server/Logger");
const { readdir } = require("fs/promises");
const { lang } = require("../api/ServerInfo");

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

		if (this.cancelled) return;

		try {
			const cmds = await readdir("./src/commands");
			const name = this.command.split(" ")[0];
			const args = this.command.split(" ").slice(1);

			if (!name.replace(" ", "")) return

			let exists = false;

			for (const camd of cmds) {
				if (camd.includes(".js")) {
					const command = require(`../commands/${camd}`);

					if (command.data.name === name || (command.data.aliases && command.data.aliases.includes(name))) {
						if (command.data.minArg && command.data.minArg > args.length) {
							Logger.info(lang.commands.minArg.replace("%m%", command.data.minArg).replace("%r%", args.length));
							return;
						}

						if (command.data.maxArg && command.data.maxArg < args.length) {
							Logger.info(lang.commands.maxArg.replace("%m%", command.data.maxArg).replace("%r%", args.length));
							return;
						}

						command.execute(this.server, {
							sendMessage: (message) => {
								Logger.info(message)
							},
							op: true,
							username: "Server",
							ip: "127.0.0.1",
							isConsole: true
						}, args);

						exists = true
					}
				}
			}

			if (!exists) Logger.info(lang.errors.unknownCommandOrNoPermission.replace('%commandname%', this.command));
		} catch (e) {
			Logger.error("Failed to execute command! " + e.stack)
		}
	}
}

module.exports = ServerConsoleCommandExecutedEvent;
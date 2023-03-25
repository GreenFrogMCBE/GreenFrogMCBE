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
const rl = require("readline");
const ConsoleCommandExecutedEvent = require("../events/ServerConsoleCommandExecutedEvent");

let isclosed = false;

module.exports = {
	closed: isclosed,

	close() {
		isclosed = true;
	},

	async start() {
		const r = rl.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		r.setPrompt("> ");
		r.prompt(true);

		r.on("line", (data) => {
			const commandExecutedEvent = new ConsoleCommandExecutedEvent();
			commandExecutedEvent.server = require("../Server");
			commandExecutedEvent.command = data;
			commandExecutedEvent.execute();

			if (!isclosed) r.prompt(true);
		});
	},
};

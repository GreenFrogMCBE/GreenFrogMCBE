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
const Frog = require("../Frog");

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

		r.setPrompt("");
		r.prompt(true);

		r.on("line", (command) => {
			Frog.eventEmitter.emit('command', {
				server: this,
				command,
				packetData: data,
				cancel() {
					shouldQueue = false
				},
			});

			if (!isclosed) r.prompt(true);
		});
	},
};

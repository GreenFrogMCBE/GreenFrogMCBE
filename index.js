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

const ConsoleColors = require('./src/api/colors/ConsoleColors');

const Frog = require('./src/Frog');

const fs = require("fs");
const center = require("center-align");

console.info(center(`${ConsoleColors.GREEN} 
██████  ██████  ███████ ███████ ███    ██ ███████ ██████   ██████   ██████  
██       ██   ██ ██      ██      ████   ██ ██      ██   ██ ██    ██ ██       
██   ███ ██████  █████   █████   ██ ██  ██ █████   ██████  ██    ██ ██   ███ 
██    ██ ██   ██ ██      ██      ██  ██ ██ ██      ██   ██ ██    ██ ██    ██ 
██████  ██   ██ ███████ ███████ ██   ████ ██      ██   ██  ██████   ██████  
${ConsoleColors.RESET}`, process.stdout.columns))

const crashFileName = './crash-reports/server-crash-' + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + '.txt'

try {
	if (!fs.existsSync("config.yml")) {
		const config = fs.readFileSync('./src/internalResources/defaultConfig.yml')

		fs.writeFileSync('config.yml', config, () => { })
	}

	if (Frog.isDebug) process.env.DEBUG = 'minecraft-protocol'

	const Server = require("./src/Server.js");
	Server.start();

	process.once("SIGINT", async () => {
		require("./src/Frog").shutdownServer();
	});
} catch (e) {
	console.clear()

	console.error(`${ConsoleColors.RED}Failed to start server
${e}

Make sure that you have the required libraries. Run "npm i" to install them
If you are sure that this is a bug please report it here: https://github.com/andriycraft/GreenFrogMCBE
${ConsoleColors.RESET}
`);

	fs.mkdir('crash-reports', { recursive: true }, () => { })
	fs.writeFileSync(crashFileName, `Error: ${e.stack}`, () => { })

	process.exit(-1);
}
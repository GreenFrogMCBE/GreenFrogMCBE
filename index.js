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
const FrogJS = require('./src/Frog')

const fs = require("fs");
const center = require("center-align")

console.info(center(`\x1b[32m  
██████  ██████  ███████ ███████ ███    ██ ███████ ██████   ██████   ██████  
██       ██   ██ ██      ██      ████   ██ ██      ██   ██ ██    ██ ██       
██   ███ ██████  █████   █████   ██ ██  ██ █████   ██████  ██    ██ ██   ███ 
██    ██ ██   ██ ██      ██      ██  ██ ██ ██      ██   ██ ██    ██ ██    ██ 
██████  ██   ██ ███████ ███████ ██   ████ ██      ██   ██  ██████   ██████  
\x1b[0m`, process.stdout.columns))

try {
	if (!fs.existsSync("config.yml")) {
		const config = fs.readFileSync('./src/internalResources/defaultConfig.yml')

		fs.writeFileSync('config.yml', config, () => {})
	}

	const Server = require("./src/Server.js");
	Server.start();
} catch (e) {
	console.clear()

	console.error(`\x1b[31mFailed to start server
${e}

Make sure that you have the required libraries. Run "npm i" to install them
If you are sure that this is a bug please report it here: https://github.com/andriycraft/GreenFrogMCBE
\x1b[0m
`);
	process.exit(-1);
}

process.once("SIGINT", async () => {
	FrogJS.shutdownServer();
});

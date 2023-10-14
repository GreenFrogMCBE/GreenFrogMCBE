/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 * The content of this file is licensed using the CC-BY-4.0 license
 * which requires you to agree to its terms if you wish to use or make any changes to it.
 *
 * @license CC-BY-4.0
 * @link Github - https://github.com/GreenFrogMCBE/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const fs = require("fs");
const path = require("path");

// These variables are initialized within the `initializeServer()` function.
//
// This is necessary because both of them rely on the `config.yml` file,
// which is generated by the initializeServer() function.
// Failing to initialize them in this way would result in the 
// "ENOENT: no such file or directory, open 'config.yml'" error
let Frog;
let Server;

const Colors = require("./src/utils/types/Colors");

const { convertConsoleColor } = require("./src/utils/ConsoleColorConvertor");

/**
 * @type {string}
 */
const crashFile = `./crash-reports/server-crash-${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}.txt`;

/**
 * Creates configuration files and sets up debugging if necessary.
 * @async
 */
async function initializeServer() {
	if (!fs.existsSync("config.yml")) {
		const configPath = path.join(__dirname, ".", "src", "resources", "yml", "defaultConfig.yml");
		const config = fs.readFileSync(configPath);

		fs.writeFileSync("config.yml", config);
	}

	Frog = require("./src/Frog");

	if (Frog.isDebug) {
		process.env.DEBUG = "minecraft-protocol";
	}

	Server = require("./src/Server");
}

/**
 * Starts the server.
 * @async
 */
async function start() {
	try {
		await initializeServer();

		Server.start();
	} catch (error) {
		console.clear();

		console.error(
			convertConsoleColor(
				`${Colors.RED}Failed to start server
${error.stack}

Make sure that you have the required libraries. Run "npm i" to install them
If you are sure that this is a bug please report it here: https://github.com/GreenFrogMCBE/GreenFrogMCBE
${Colors.RESET}`,
			),
		);

		fs.mkdirSync(Frog.directories.crashReportsFolder, { recursive: true });
		fs.writeFileSync(crashFile, `Error: ${error.stack}`);

		process.exit(Frog.config.dev.exitCodes.crash);
	}
}

start();

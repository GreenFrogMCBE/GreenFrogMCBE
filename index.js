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

const Frog = require("./src/Frog");

const Server = require("./src/Server");

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
async function createConfigFilesAndDebug() {
	if (!fs.existsSync("config.yml")) {
		const configPath = path.join(__dirname, ".", "src", "resources", "defaultConfig.yml");
		const config = fs.readFileSync(configPath);

		fs.writeFileSync("config.yml", config);
	}

	if (Frog.isDebug) {
		process.env.DEBUG = "minecraft-protocol";
	}
}

/**
 * Starts the server.
 * @async
 */
async function start() {
	try {
		await createConfigFilesAndDebug();

		Server.start();

		process.once("SIGINT", async () => {
			Frog.shutdownServer();
		});
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

		fs.mkdirSync("crash-reports", { recursive: true });
		fs.writeFileSync(crashFile, `Error: ${error.stack}`);

		process.exit(-1);
	}
}

start();

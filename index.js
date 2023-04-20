const fs = require("fs");
const center = require("center-align");
const Colors = require('./src/api/colors/Colors');
const { convertConsoleColor } = require('./src/utils/ConsoleColorConvertor');

console.info(convertConsoleColor(center(`${Colors.GREEN} 
██████  ██████  ███████ ███████ ███    ██ ███████ ██████   ██████   ██████  
██       ██   ██ ██      ██      ████   ██ ██      ██   ██ ██    ██ ██       
██   ███ ██████  █████   █████   ██ ██  ██ █████   ██████  ██    ██ ██   ███ 
██    ██ ██   ██ ██      ██      ██  ██ ██ ██      ██   ██ ██    ██ ██    ██ 
██████  ██   ██ ███████ ███████ ██   ████ ██      ██   ██  ██████   ██████  
${Colors.RESET}`, process.stdout.columns)));

const crashFileName = `./crash-reports/server-crash-${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}.txt`;

async function createConfigFilesAndDebug() {
	if (!fs.existsSync("config.yml")) {
		let config = null

		if (process.argv.includes('--test')) {
			config = fs.readFileSync('../src/internalResources/defaultConfig.yml');
		} else {
			config = fs.readFileSync('./src/internalResources/defaultConfig.yml');
		}

		fs.writeFileSync('config.yml', config, () => { });
	}

	if (require('./src/Frog').isDebug) {
		process.env.DEBUG = 'minecraft-protocol';
	}
}

async function start() {
	try {
		await createConfigFilesAndDebug();

		const Server = require("./src/Server.js");
		Server.start();

		process.once("SIGINT", async () => {
			require("./src/Frog").shutdownServer();
		});
	} catch (error) {
		console.clear();

		console.error(convertConsoleColor(`${Colors.RED}Failed to start server
${error}
	
Make sure that you have the required libraries. Run "npm i" to install them
If you are sure that this is a bug please report it here: https://github.com/andriycraft/GreenFrogMCBE
${Colors.RESET}`));

		fs.mkdir('crash-reports', { recursive: true }, () => { });
		fs.writeFileSync(crashFileName, `Error: ${error.stack}`, () => { });

		process.exit(-1);
	}
}

start();
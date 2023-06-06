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
 * @link Github - https://github.com/andriycraft/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const fs = require("fs");
const readline = require("readline");

const pluginPath = `${__dirname}/../plugins`;

setTimeout(() => {
	console.clear();

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	rl.question("\x1b[34mPlease enter the name of your plugin...\n", (pluginName) => {
		console.clear();

		const pluginDir = `${pluginPath}/${pluginName}`;

		try {
			fs.mkdirSync(pluginDir);
		} catch (e) {
			console.error("\x1b[31mPlugin already exists!");
			rl.close();
			return;
		}

		const packageJson = {
			name: pluginName.toLowerCase(),
			main: `${pluginName.toLowerCase()}.js`,
			version: "1.0.0",
			displayName: pluginName,
		};

		const pluginJs = `module.exports = {
  onLoad() {
    // ...
  },

  onShutdown() {
    // ...
  },
};`;

		fs.writeFileSync(`${pluginDir}/package.json`, JSON.stringify(packageJson, null, 2));
		fs.writeFileSync(`${pluginDir}/${pluginName.toLowerCase()}.js`, pluginJs);

		setTimeout(() => {
			console.info("\x1b[32mPlugin created!");

			console.info("\x1b[0m");
			rl.close();
			process.exit(0);
		}, 100);
	});
}, 500);

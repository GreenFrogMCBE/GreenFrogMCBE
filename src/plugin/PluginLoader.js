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
const fs = require("fs");
const Logger = require("../server/Logger");
const { lang, config } = require("../server/ServerInfo");
const PluginManager = require("./PluginManager");
const CCH = require("../server/ConsoleCommandSender");
const LogTypes = require("../server/LogTypes");

module.exports = {
	loadPlugins() {
		try {
			fs.mkdirSync("./plugins/");
		} catch (ignored) {
			// Do nothing if directory already exists
		}
		try {
			fs.mkdirSync("./plugins_configs/");
		} catch (ignored) {
			// Do nothing if directory already exists
		}

		setTimeout(() => {
			CCH.start();
		}, 1000);

		fs.readdir("./plugins", (err, files) => {
			files.forEach((file) => {
				fs.stat(`${__dirname}/../../plugins/${file}`, (err, stats) => {
					if (err) {
						Logger.log(lang.errors.failedToGetStats.replace("%plugin%", file), LogTypes.ERROR);
						return;
					}
					if (stats.isDirectory()) {
						let name,
							version,
							main = null;
						try {
							const packageJson = require(`${__dirname}/../../plugins/${file}/package.json`);
							name = packageJson.displayName;
							version = packageJson.version;
							main = packageJson.main;
						} catch (ignored) {
							Logger.log(lang.errors.packageJSONError.replace("%plugin%", file), LogTypes.WARNING);
							return;
						}
						try {
							require(`${__dirname}/../../plugins/${file}/${main}`).onLoad();
							Logger.log(lang.server.loadedPlugin.replace("%name%", name).replace("%version%", version));
							PluginManager.addPlugin(name, version);
						} catch (e) {
							Logger.log(lang.errors.failedToExecFunction.replace("%plugin%", file).replace("%e%", e.stack), LogTypes.ERROR);
						}
					}
				});
			});
		});
	},

	async checkIfEmpty(dir) {
		const files = await fs.promises.readdir(dir);
		return files.length === 0;
	},

	async killServer() {
		process.exit(config.exitCode);
	},

	async unloadPlugins() {
		let count = 0;
		fs.readdir("./plugins", (err, files) => {
			files.forEach((file) => {
				fs.stat(`${__dirname}/../../plugins/${file}`, (err, stats) => {
					if (err) {
						Logger.log(lang.errors.failedToGetStats.replace("%plugin%", file), LogTypes.ERROR);
						return;
					}
					if (stats.isDirectory()) {
						count++;
						let name,
							main = null;
						try {
							const packageJson = require(`${__dirname}/../../plugins/${file}/package.json`);
							name = packageJson.displayName;
							main = packageJson.main;
						} catch (ignored) {
							Logger.log(lang.errors.packageJSONError.replace("%plugin%", file), LogTypes.WARNING);
							return;
						}
						try {
							Logger.log(lang.server.unloadingPlugin.replace("%plugin%", name));
							require(`${__dirname}/../../plugins/${file}/${main}`).onShutdown();
							Logger.log(lang.server.unloadedPlugin.replace("%plugin%", name));
							count--;
							if (count <= 0) {
								this.killServer();
							}
						} catch (e) {
							Logger.log(lang.errors.failedToExecFunction.replace("%plugin%", file).replace("%e%", e.stack), LogTypes.ERROR);
						}
					}
				});
			});
		});
	},
};

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
const PluginManager = require("./PluginManager");
const CCH = require("../server/ConsoleCommandSender");
const { lang, config } = require("../api/ServerInfo");

let count = null;

module.exports = {
	loadPlugins() {
		try {
			fs.mkdirSync("./plugins/");
		} catch (ignored) {
			/* ignored */
		}

		try {
			fs.mkdirSync("./pluginData/");
		} catch (ignored) {
			/* ignored */
		}

		setTimeout(() => {
			CCH.start();
		}, 1500);

		fs.readdir("./plugins", (err, files) => {
			files.forEach((file) => {
				fs.stat(`${__dirname}/../../plugins/${file}`, (err, stats) => {
					if (err) {
						Logger.error(lang.errors.failedToLoadPlugin.replace("%name%", file).replace("%errorstack%", err.stack));
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
						} catch (error) {
							Logger.warning(lang.errors.packageJSONError.replace("%plugin%", file));
							return;
						}
						try {
							require(`${__dirname}/../../plugins/${file}/${main}`).onLoad();
							Logger.info(lang.server.loadedPlugin.replace("%name%", name).replace("%version%", version));
							PluginManager.addPlugin(name, version);
						} catch (err) {
							Logger.error(lang.errors.failedToExecFunction.replace("%plugin%", file).replace("%e%", err.stack));
						}
					}
				});
			});
		});
	},

	async killServer() {
		process.exit(config.exitCode);
	},

	initPluginShutdown() {
		count--;
		if (count <= 0) this.killServer();
	},

	async unloadPlugins() {
		fs.readdir("./plugins", (err, files) => {
			if (files.length === 0) this.killServer();
			files.forEach((file) => {
				fs.stat(`${__dirname}/../../plugins/${file}`, (err, stats) => {
					if (err) {
						Logger.error(lang.errors.failedToLoadPlugin.replace("%name%", file).replace("%errorstack%", err.stack));
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

							Logger.info(lang.server.unloadingPlugin.replace("%plugin%", name));
						} catch (error) {
							this.initPluginShutdown();
							return;
						}

						try {
							require(`${__dirname}/../../plugins/${file}/${main}`).onShutdown();
							Logger.info(lang.server.unloadedPlugin.replace("%plugin%", name));
							this.initPluginShutdown();
						} catch (e) {
							Logger.error(lang.errors.failedToExecFunction.replace("%plugin%", file).replace("%e%", e.stack));
							this.initPluginShutdown();
						}
					}
				});
			});
		});
	},
};

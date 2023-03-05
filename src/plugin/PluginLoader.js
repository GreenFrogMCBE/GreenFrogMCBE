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

let plugins = [];
let count = 0;

module.exports = {
	loadPlugins() {
		try {
			fs.mkdirSync("./plugins/");
		} catch (ignored) {
			/* ignored */
		}
		try {
			fs.mkdirSync("./plugins_configs/");
		} catch (ignored) {
			/* ignored */
		}
		setTimeout(() => {
			CCH.start();
		}, 1000);

		fs.readdir("./plugins", (err, files) => {
			files.forEach((file) => {
				fs.stat(`${__dirname}/../../plugins/${file}`, (err, stats) => {
					if (stats.isDirectory()) {
						Logger.log(lang.server.loadingPlugin.replace("%plugin%", file));
						let name,
							version,
							main = null;
						try {
							name = require(`${__dirname}/../../plugins/${file}/package.json`).displayName;
							version = require(`${__dirname}/../../plugins/${file}/package.json`).version;
							main = require(`${__dirname}/../../plugins/${file}/package.json`).main;
						} catch (ignored) {
							Logger.log(lang.errors.packageJSONError.replace("%plugin%", file), LogTypes.WARNING);
						}
						try {
							require(`${__dirname}/../../plugins/${file}/${main}`).onLoad();
							Logger.log(lang.server.loadedPlugin.replace("%name%", name).replace("%version%", version));
							PluginManager.addPlugin(name);
							count++;
						} catch (e) {
							Logger.log(
								lang.errors.failedToExecFunction.replace("%plugin%", file).replace("%e%", e.stack),
								LogTypes.ERROR
							);
						}
						plugins.push(file);
					}
				});
			});
		});
	},

	async unloadPlugins() {
		Logger.log(lang.server.shuttingDownPlugins);
		fs.readdir("./plugins", (err, files) => {
			files.forEach((file) => {
				fs.stat(`${__dirname}/../../plugins/${file}`, (err, stats) => {
					if (stats.isDirectory()) {
						count--;
						let name,
							main = null;
						try {
							main = require(`${__dirname}/../../plugins/${file}/package.json`).main;
							name = require(`${__dirname}/../../plugins/${file}/package.json`).displayName;
						} catch (ignored) {
							Logger.log(lang.errors.packageJSONError.replace("%plugin%", file), LogTypes.WARNING);
						}
						try {
							Logger.log(lang.server.unloadingPlugin.replace("%plugin%", name));
							try {
								require(`${__dirname}/../../plugins/${file}/${main}`).onShutdown();
							} finally {
								Logger.log(lang.server.unloadedPlugin.replace("%plugin%", name));
								if (count <= 0) {
									Logger.log(lang.server.doneShuttingDownPlugins);
									Logger.log(lang.server.doneShuttingDown);
									process.exit(config.exitCode);
								}
							}
						} catch (e) {
							Logger.log(
								lang.errors.failedToExecFunction.replace("%plugin%", file).replace("%e%", e.stack),
								LogTypes.ERROR
							);
						}
					}
				});
			});
		});
	},
};

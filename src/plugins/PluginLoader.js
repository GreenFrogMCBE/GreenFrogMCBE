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

/** @private */
let pluginCount = 0;
/** @private */
let lang;
/** @private */
let config;

module.exports = {
	/**
	 * Returns plugin count
	 * 
	 * @returns {Number}
	 */
	pluginCount,

	/**
	 * Loads all plugins
	 */
	loadPlugins() {
		lang = require("../Frog").serverConfigurationFiles.lang;

		fs.mkdirSync('./plugins/', { recursive: true });
		fs.mkdirSync('./pluginData/', { recursive: true });

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
						let name, version, main;

						try {
							const packageJson = require(`${__dirname}/../../plugins/${file}/package.json`);

							name = packageJson.displayName;
							version = packageJson.version;
							main = packageJson.main;

							PluginManager.addPlugin(name, version)
							Logger.info(`Loading plugin ${name} v${version}...`)
						} catch (error) {
							Logger.warning(lang.errors.packageJSONError.replace("%plugin%", file));
							return;
						}

						try {
							require(`${__dirname}/../../plugins/${file}/${main}`).onLoad();

							PluginManager.addPlugin(name, version);

							Logger.info(`Plugin ${name} v${version} loaded`);
						} catch (error) {
							if (error.toString().includes("onLoad is not a function")) {
								Logger.error(`Failed to load ${name}: Plugin does not contain onLoad() function!`)
								return;
							}

							Logger.error(`Failed to load ${name}: ${error.stack}`);
						}
					}
				});
			});
		});
	},

	async killServer() {
		config = require("../Frog").serverConfigurationFiles.config;

		process.exit(config.exitCode);
	},

	initPluginShutdown() {
		pluginCount--;

		if (pluginCount <= 0) this.killServer();
	},

	async unloadPlugins() {
		fs.readdir("./plugins", (_err, files) => {
			if (files.length === 0) this.killServer();

			files.forEach((file) => {
				fs.stat(`${__dirname}/../../plugins/${file}`, (err, stats) => {
					if (err) {
						Logger.error(lang.errors.failedToLoadPlugin.replace("%name%", file).replace("%errorstack%", err.stack));
						return;
					}

					if (stats.isDirectory()) {
						pluginCount++;
						let name, main;

						try {
							const packageJson = require(`${__dirname}/../../plugins/${file}/package.json`);
							name = packageJson.displayName;
							main = packageJson.main;

							Logger.info(lang.server.unloadingPlugin.replace("%plugin%", name));
						} catch (error) {
							return;
						}

						try {
							require(`${__dirname}/../../plugins/${file}/${main}`).onShutdown();
							Logger.info(lang.server.unloadedPlugin.replace("%plugin%", name));
						} catch (error) {
							if (error.toString().includes("onShutdown is not a function")) {
								Logger.error(`Failed to load ${name}: Plugin does not contain onShutdown() function!`)
								return;
							}

							Logger.error(`Failed to load ${name}: ${error.stack}`);
						}

						this.initPluginShutdown();
					}
				});
			});
		});
	},
};

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
const { getKey } = require("../utils/Language");

/** @private */
let pluginCount = 0;
/** @private */
let config;

module.exports = {
	/**
	 * Returns plugin count
	 *
	 * @returns {number}
	 */
	pluginCount,

	/**
	 * Loads all plugins
	 */
	loadPlugins() {
		fs.mkdirSync("./plugins/", { recursive: true });
		fs.mkdirSync("./pluginData/", { recursive: true });

		setTimeout(() => {
			CCH.start();
		}, 1500);

		fs.readdir("./plugins", (_err, files) => {
			files.forEach((file) => {
				fs.stat(`${__dirname}/../../plugins/${file}`, (error, stats) => {
					if (error) {
						Logger.error(getKey("plugin.loading.failed").replace("%s%", file).replace("%d%", error.stack));
						return;
					}

					if (stats.isDirectory()) {
						let name, version, main;

						try {
							const packageJson = require(`${__dirname}/../../plugins/${file}/package.json`);

							name = packageJson.displayName;
							version = packageJson.version;
							main = packageJson.main;

							PluginManager.addPlugin(name, version);
							Logger.info(getKey("plugin.loading.loading").replace("%s%", name).replace("%d%", version));
						} catch (error) {
							Logger.warning(getKey("plugin.loading.warning.invalidJson").replace("%s%", file).replace("%d%", error.stack));
							return;
						}

						try {
							require(`${__dirname}/../../plugins/${file}/${main}`).onLoad();

							PluginManager.addPlugin(name, version);
							Logger.info(getKey("plugin.loading.loaded").replace("%s%", name).replace("%d%", version));
						} catch (error) {
							Logger.error(getKey("plugin.loading.failed").replace("%s%", name).replace("%d%", error.stack));
						}
					}
				});
			});
		});
	},

	/**
	 * Kills the server
	 */
	async killServer() {
		config = require("../Frog").serverConfigurationFiles.config;

		process.exit(config.dev.exitCode);
	},

	/**
	 * Prepares plugins for shutdown
	 */
	initPluginShutdown() {
		pluginCount--;

		if (pluginCount <= 0) this.killServer();
	},

	/**
	 * Unloads plugins
	 */
	async unloadPlugins() {
		try {
			const files = await fs.promises.readdir("./plugins");

			if (files.length === 0) {
				this.killServer();
				return;
			}

			for (const file of files) {
				const stats = await fs.promises.stat(`${__dirname}/../../plugins/${file}`);

				if (stats.isDirectory()) {
					pluginCount++;
					let name, main;

					try {
						const packageJson = require(`${__dirname}/../../plugins/${file}/package.json`);
						name = packageJson.displayName;
						main = packageJson.main;

						Logger.info(getKey("plugin.unloading.unloading").replace("%s%", name));
					} catch (error) {
						continue;
					}

					this.initPluginShutdown();

					try {
						const plugin = require(`${__dirname}/../../plugins/${file}/${main}`);

						if (typeof plugin.onShutdown === 'function') {
							await plugin.onShutdown();
							Logger.info(getKey("plugin.unloading.success").replace("%s%", name));
						}
					} catch (error) {
						Logger.error(getKey("plugin.unloading.failed").replace("%s%", name).replace("%d%", error.stack));
					}
				}
			}
		} catch (error) {
			Logger.error(getKey("plugin.unloading.error").replace("%d%", error.stack));
		}
	}
};

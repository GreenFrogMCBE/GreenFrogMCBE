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
 * @link Github - https://github.com/kotinash/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const fs = require("fs");

const Logger = require("../server/Logger");
const PluginManager = require("./PluginManager");

const CCH = require("../server/ConsoleCommandSender");
const { getKey } = require("../utils/Language");
const path = require("path");

/** @private @type {number} */
let pluginCount = 0;
/** @private @type {JSON} */
let config;

/** @private @type {JSON} */
const directories = {
	/** @type {string} */
	plugins: "./plugins",

	/** @type {string} */
	pluginData: "./pluginData",

	/** @type {string} */
	fullPluginPath: path.join(__dirname, "..", "..", "./plugins"),

	/**
	 * @type {function}
	 * @param {string} file
	 */
	getFile: (file) => path.join(path.join(__dirname, "..", "..", "./plugins"), file),
};

module.exports = {
	/**
	 * Returns plugin count
	 *
	 * @returns {number}
	 */
	pluginCount,

	/**
	 * Basic directory info
	 *
	 * @type {{
	 *   plugins: string,
	 *   pluginData: string,
	 *   fullPluginPath: string,
	 *   getFile: (file: string) => string
	 * }}
	 */
	directories,

	/**
	 * Loads all plugins
	 */
	async loadPlugins() {
		fs.mkdirSync(directories.plugins, { recursive: true });
		fs.mkdirSync(directories.pluginData, { recursive: true });

		CCH.start();

		const files = await fs.readdirSync(directories.plugins);

		for (const file of files) {
			const stats = await fs.statSync(directories.getFile(file));
			if (stats.isDirectory()) {
				let name, version, main;

				try {
					const packageJson = require(directories.getFile(`${file}/package.json`));

					name = packageJson.displayName;
					version = packageJson.version;
					main = packageJson.main;

					PluginManager.addPlugin(name, version);
					Logger.info(getKey("plugin.loading.loading").replace("%s%", name).replace("%d%", version));
				} catch (error) {
					Logger.warning(getKey("plugin.loading.warning.invalidJson").replace("%s%", file).replace("%d%", error.stack));
					continue;
				}

				try {
					const plugin = require(directories.getFile(`${file}/${main}`));

					await plugin.onLoad();

					PluginManager.addPlugin(name, version);
					Logger.info(getKey("plugin.loading.loaded").replace("%s%", name).replace("%d%", version));
				} catch (error) {
					Logger.error(getKey("plugin.loading.failed").replace("%s%", name).replace("%d%", error.stack));
				}
			}
		}
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

					try {
						const plugin = require(`${__dirname}/../../plugins/${file}/${main}`);

						if (typeof plugin.onShutdown === "function") {
							await plugin.onShutdown();
							Logger.info(getKey("plugin.unloading.success").replace("%s%", name));
						}
					} catch (error) {
						Logger.error(getKey("plugin.unloading.failed").replace("%s%", name).replace("%d%", error.stack));
					}

					this.initPluginShutdown();
				}
			}
		} catch (error) {
			Logger.error(getKey("plugin.unloading.error").replace("%d%", error.stack));
		}
	},
};

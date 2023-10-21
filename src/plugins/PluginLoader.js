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

const Logger = require("../utils/Logger");

const { getKey } = require("../utils/Language");

const PluginManager = require("./PluginManager");

/**
 * @type {number}
 */
let pluginCount = 0;

/**
 * @param {string} file
 */
function getFile(file) {
	return path.join(path.join(__dirname, "..", "..", "./plugins"), file)
}

module.exports = {
	/**
	 * @returns {number}
	 */
	pluginCount,

	/**
	 * Loads all the plugins.
	 * @async
	 */
	async loadPlugins() {
		const Frog = require("../Frog");

		const files = fs.readdirSync(Frog.directories.pluginsFolder);

		for (const file of files) {
			const stats = fs.statSync(getFile(file));

			if (stats.isDirectory()) {
				let name, version, main;

				try {
					const packageJson = require(getFile(`${file}/package.json`));

					name = packageJson.displayName;
					version = packageJson.version;
					main = packageJson.main;

					Logger.info(
						getKey("plugin.loading.loading")
							.replace("%s", name)
							.replace("%d", version)
					);
				} catch (error) {
					Logger.warning(
						getKey("plugin.loading.warning.invalidJson")
							.replace("%s", file)
							.replace("%d", error.stack)
					);

					continue;
				}

				try {
					const plugin = require(getFile(`${file}/${main}`));

					await plugin.onLoad();

					PluginManager.addPlugin(name, version);

					Logger.info(
						getKey("plugin.loading.loaded")
							.replace("%s", name)
							.replace("%d", version)
					);
				} catch (error) {
					Logger.error(
						getKey("plugin.loading.failed")
							.replace("%s", name)
							.replace("%d", error.stack)
					);
				}
			}
		}
	},

	/**
	 * Kills the server.
	 * @async
	 */
	async killServer() {
		process.exit(require("../Frog").config.dev.exitCodes.crash);
	},

	/**
	 * Decrements the plugin count.
	 */
	decrementPluginCount() {
		pluginCount--;

		if (pluginCount <= 0) this.killServer();
	},

	/**
	 * Unloads the plugins.
	 * @async
	 */
	async unloadPlugins() {
		const Frog = require("../Frog");

		try {
			const files = await fs.promises.readdir(Frog.directories.pluginsDirectory);

			if (!files) {
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

						Logger.info(
							getKey("plugin.unloading.unloading")
								.replace("%s", name)
						);
					} catch {
						continue;
					}

					try {
						const plugin = require(`${__dirname}/../../plugins/${file}/${main}`);

						if (typeof plugin.onShutdown === "function") {
							await plugin.onShutdown();

							Logger.info(
								getKey("plugin.unloading.success")
									.replace("%s", name)
							);
						}
					} catch (error) {
						Logger.error(
							getKey("plugin.unloading.failed")
								.replace("%s", name)
								.replace("%d", error.stack)
						);
					}

					this.decrementPluginCount();
				}
			}
		} catch (error) {
			Logger.error(
				getKey("plugin.unloading.error")
					.replace("%d", error.stack)
			);
		}
	},
};

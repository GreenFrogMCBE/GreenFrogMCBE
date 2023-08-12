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
const { getKey } = require("../utils/Language");

const PluginSetupException = require("../utils/exceptions/PluginSetupException");

/** @private */
const plugins = [];

module.exports = {
	/**
	 * Returns plugins and their versions as array
	 * Example: ["ExamplePlugin v1.0.0"]
	 *
	 * @returns {Array<string>}
	 */
	plugins,

	/**
	 * @throws {PluginSetupException} - If there is no plugin name
	 * @throws {PluginSetupException} - If there is no plugin version
	 *
	 * @param {string} name
	 * @param {string} version
	 */
	addPlugin: (name, version) => {
		let pluginString = `${name} v${version}`;

		if (!name) {
			throw new PluginSetupException(pluginString, getKey("exceptions.plugin.noName"));
		}

		if (!version) {
			throw new PluginSetupException(pluginString, getKey("exceptions.plugin.noVersion"));
		}

		plugins.push(pluginString);
	},
};

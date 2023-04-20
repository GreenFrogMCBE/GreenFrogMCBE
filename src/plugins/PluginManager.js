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
const { getKey } = require("../utils/Language");

const PluginSetupException = require("../utils/exceptions/PluginSetupException");

/** @private */
const plugins = [];

module.exports = {
	/**
	 * Returns plugins and their versions as array
	 * Example: ["ExamplePlugin v1.0.0"]
	 *
	 * @returns {Array<String>}
	 */
	plugins,

	/**
	 * Adds plugin to the plugin list
	 *
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

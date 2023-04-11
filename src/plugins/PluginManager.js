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
	 * @param {String} name 
	 * @param {String} version 
	 */
	addPlugin: (name, version) => {
		let pluginString = `${name} v${version}`

		if (!name) {
			throw new PluginSetupException(pluginString, "No plugin name!")
		}

		if (!version) {
			throw new PluginSetupException(pluginString, "No plugin version!")
		}

		plugins.push(pluginString)
	}
};

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
const { get_key } = require("../utils/Language")

const PluginSetupException = require("../utils/exceptions/PluginSetupException")

/** @type {import("Frog").Plugin[]} */
const plugins = []

module.exports = {
	/**
	 * Returns plugins and their versions as an array
	 *
	 * @type {import("Frog").Plugin[]}
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
		/** @type {import("Frog").Plugin} */
		const pluginObject = {
			name,
			version,
		}

		if (!name) {
			throw new PluginSetupException(pluginObject, get_key("exceptions.plugin.noName"))
		}

		if (!version) {
			throw new PluginSetupException(pluginObject, get_key("exceptions.plugin.noVersion"))
		}

		plugins.push(pluginObject)
	},
}

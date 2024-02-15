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
const fs = require("fs")
const path = require("path")

const Logger = require("../utils/Logger")

const { get_key } = require("../utils/Language")

const PluginManager = require("./PluginManager")

/**
 * @param {string} file
 * @returns {string}
 */
function get_file(file) {
	return path.join(path.join(__dirname, "..", "..", "./plugins"), file)
}

module.exports = {
	/**
	 * @returns {number}
	 */
	plugin_count: 0,

	/**
	 * Loads all the plugins.
	 * @async
	 */
	async load_plugins() {
		const Frog = require("../Frog")

		const files = fs.readdirSync(Frog.directories.plugins_folder)

		for (const file of files) {
			const stats = fs.statSync(get_file(file))

			if (stats.isDirectory()) {
				let name, version, main

				try {
					const package_json = require(get_file(`${file}/package.json`))

					name = package_json.display_name
					version = package_json.version
					main = package_json.main

					Logger.info(
						get_key("plugin.loading.loading",
							[
								name,
								version
							]
						)
					)
				} catch (error) {
					Logger.warning(
						get_key("plugin.loading.warning.invalidJson",
							[
								file, error.stack
							]
						)
					)

					continue
				}

				try {
					const plugin = require(get_file(`${file}/${main}`))

					await plugin.on_load()

					PluginManager.add_plugin(name, version)

					Logger.info(
						get_key("plugin.loading.loaded",
							[
								name,
								version
							]
						)
					)
				} catch (error) {
					Logger.error(
						get_key("plugin.loading.failed",
							[
								name,
								error.stack
							]
						)
					)
				}
			}
		}
	},

	/**
	 * Kills the server.
	 * @async
	 */
	async kill_server() {
		process.exit(require("../Frog").config.dev.exit_codes.crash)
	},

	/**
	 * Decrements the plugin count.
	 */
	decrement_plugin_count() {
		this.plugin_count--

		if (this.plugin_count <= 0) this.kill_server()
	},

	/**
	 * Unloads the plugins.
	 * @async
	 */
	async unload_plugins() {
		const Frog = require("../Frog")

		try {
			const files = await fs.promises.readdir(Frog.directories.plugins_directory)

			if (!files) {
				return this.kill_server()
			}

			for (const file of files) {
				const stats = await fs.promises.stat(`${__dirname}/../../plugins/${file}`)

				if (stats.isDirectory()) {
					this.plugin_count++

					let name, main

					try {
						const package_json = require(`${__dirname}/../../plugins/${file}/package.json`)

						name = package_json.display_name
						main = package_json.main

						Logger.info(
							get_key("plugin.unloading.unloading", [name])
						)
					} catch {
						continue
					}

					try {
						const plugin = require(`${__dirname}/../../plugins/${file}/${main}`)

						if (typeof plugin.on_shutdown === "function") {
							await plugin.on_shutdown()

							Logger.info(
								get_key("plugin.unloading.success", [name])
							)
						}
					} catch (error) {
						Logger.error(
							get_key("plugin.unloading.failed",
								[
									name,
									error.stack
								]
							)
						)
					}

					this.decrement_plugin_count()
				}
			}
		} catch (error) {
			Logger.error(
				get_key("plugin.unloading.failed",
					[
						error.stack
					]
				)
			)
		}
	},
}

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
const LanguageException = require("./exceptions/LanguageException")

const { LanguageParser } = require("@greenfrog/lang-parser")
const path = require("path")
const fs = require("fs")

module.exports = {
	/**
	 * Returns the content of a language file.
	 *
	 * @param {string} lang - The language code
	 * @returns {import("Frog").Language} - The content of the language file
	 * @throws {LanguageException} - If the language file is not found or is not valid JSON
	 */
	get_language(lang) {
		const lang_path = path.resolve(__dirname, "../lang")
		const lang_file = path.join(lang_path, `${lang}.lang`)

		if (!fs.existsSync(lang_file)) {
			throw new LanguageException("Language file doesn't exist")
		}

		const lang_content = fs.readFileSync(lang_file, "utf8")

		return lang_content
	},

	/**
	 * Returns a specific key from the current language file
	 *
	 * @param {string} key - The key to retrieve
	 * @param {string[]} placeholders - The placeholders
	 * @returns {string} The value of the key
	 */
	get_key(key, placeholders = []) {
		const Frog = require("../Frog")

		const lang_config = Frog.config.chat.lang
		const lang_content = module.exports.get_language(lang_config)
		const lang_parsed = LanguageParser.parse_raw(lang_content)
		const lang_key = LanguageParser.get_key(key, lang_parsed, placeholders)

		return lang_key
	}
}

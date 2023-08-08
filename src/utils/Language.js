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
const LanguageException = require("./exceptions/LanguageException");

const langParser = require("@kotinash/lang-parser");
const path = require("path");
const fs = require("fs");

/**
 * Returns the content of a language file.
 *
 * @param {string} lang - The language code.
 * @returns {import("Frog").Language | string}  The content of the language file.
 * @throws {LanguageException} If the language file is not found or is not valid JSON.
 */
function getLanguage(lang) {
	const langPath = path.resolve(__dirname, "../lang");
	const langFile = path.join(langPath, `${lang}.lang`);

	if (!fs.existsSync(langFile)) {
		throw new LanguageException("Language file does not exist");
	}

	const langContent = fs.readFileSync(langFile, 'utf8');

	return langContent;
}

/**
 * Returns a specific key from the current language file.
 *
 * @param {string} key - The key to retrieve.
 * @returns {string} The value associated with the key.
 */
function getKey(key) {
	const langConfig = require("../Frog").config.chat.lang;
	const langContent = getLanguage(langConfig);
	const langParsed = langParser.parseRaw(langContent.toString());
	const langKey = langParser.getKey(key, langParsed);

	return langKey.toString();
}

module.exports = {
	getLanguage,
	getKey,
};

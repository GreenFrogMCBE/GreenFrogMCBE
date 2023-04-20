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
export type LanguageContent = {
	[x: string]: string;
};
/**
 * @typedef {Object.<string, string>} LanguageContent
 */
/**
 * Returns the content of a language file.
 *
 *
 * @param {string} lang - The language code.
 * @returns {LanguageContent} The content of the language file.
 * @throws {LanguageException} If the language file is not found or is not valid JSON.
 */
export function getLanguage(lang: string): LanguageContent;
/**
 * Returns a specific key from the current language file.
 *
 * @param {string} key - The key to retrieve.
 * @returns {string} The value associated with the key.
 */
export function getKey(key: string): string;

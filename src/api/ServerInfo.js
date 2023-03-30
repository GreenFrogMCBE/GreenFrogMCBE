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
const yaml = require("js-yaml");
const fs = require("fs");

module.exports = {
	/**
	 * Returns the major server version (e.g 3.0)
	 */
	majorServerVersion: "3.0",
	/**
	 * Returns the minor server version (e.g 2.8.1)
	 */
	minorServerVersion: "3.0 (development version 2)",
	/**
	 * Returns the lang as JSON
	 */
	lang: require(`../lang/${yaml.load(fs.readFileSync("config.yml", "utf8")).lang}.json`),
	/**
	 * Returns the config as JSON
	 */
	config: yaml.load(fs.readFileSync("config.yml", "utf8")),
	/** @private */
	__playercount: 0,
	/** @private */
	__addPlayer() {
		this.__playercount++;
	},
	/** @private */
	__deletePlayer() {
		this.__playercount--;
	},
};

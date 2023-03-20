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

/**
 * @type {import('../types/base/Plugin').default}
 */

module.exports = {
	test() {
		const files = [
			"/../../src/lang/en_US.json",
			//"/../src/lang/lt_LT.json",
			//"/../src/lang/uk_UA.json",
			//"/../src/lang/vi_VN.json",
			//"/../src/lang/fr_FR.json",
			"/../../src/network/packets/res/biomes.json",
			"/../../src/network/packets/res/creativeContent.json",
			"/../../src/network/packets/res/skinData.json",
			"/../../src/network/packets/res/entities.json",
			"/../../world/chunks.json",
			"/../../world/chunks_flat.json",
			"/../../world/world_settings.json",
			"/../../world/custom_items.json",
			"/../../world/gamerules.json",
			"/../../package.json",
			"/../../package-lock.json",
		];

		for (const file of files) {
			console.log(`[config files] Parsing: ${file}`);
			JSON.parse(JSON.stringify(require(__dirname + file)));
		}
	},
};

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

module.exports = {
	test() {
		// prettier-ignore
		const files = [
			"/../src/lang/en_US.json",
			"/../src/internalResources/biomes.json", 
			"/../src/internalResources/creativeContent.json", 
			"/../src/internalResources/skinData.json", 
			"/../src/internalResources/entities.json", 
			"/../world/world_settings.json", 
			"/../world/custom_items.json", 
			"/../world/gamerules.json", 
			"/../package.json",
			"/../package-lock.json"
		];

		for (const file of files) {
			console.info(`[config files] Parsing: ${file}`);
			JSON.parse(JSON.stringify(require(__dirname + file)));
		}
	},
};

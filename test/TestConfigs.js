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
 * @link Github - https://github.com/kotinash/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */

module.exports = {
	async test() {
		// prettier-ignore
		const files = [
			"/../src/lang/en_US.json",
			"/../src/lang/uk_UA.json",
			"/../src/resources/skinData.json", 
			"/../src/resources/trimData.json", 
			"/../src/resources/itemStates.json", 
			"/../src/resources/featureRegistry.json", 
			"/../src/resources/biomeDefinitions.json", 
			"/../src/resources/availableEntities.json", 
			"/../src/resources/defaultEntityData.json", 
			"/../src/resources/creativeContent.json", 
			"/../world/custom_items.json", 
			"/../world/gamerules.json", 
			"/../package.json",
			"/../package-lock.json"
		];

		for (const file of files) {
			console.info(`.files] Parsing: ${file}`);
			await JSON.parse(await JSON.stringify(require(__dirname + file)));
		}
	},
};

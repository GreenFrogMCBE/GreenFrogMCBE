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
const fs = require("fs");
const path = require("path");

if (process.argv.length < 4) {
	console.error("Usage: node refactor.js [old code] [new code]");

	process.exit(-1);
}

const rootDir = path.join(__dirname, "..");

console.info("Started refactoring");
console.time("Finished refactoring in");

async function replaceInFile(filePath, replacements) {
	if (filePath.includes("node_modules")) {
		return;
	}

	let fileContent = fs.readFileSync(filePath, "utf8");

	for (const [searchValue, replaceValue] of replacements) {
		fileContent = fileContent.replace(new RegExp(searchValue, "g"), replaceValue);
	}

	fs.writeFile(filePath, fileContent, {}, () => {});
}

async function traverseDirectory(dirPath, replacements) {
	const entries = fs.readdirSync(dirPath, { withFileTypes: true });

	for (const entry of entries) {
		const entryPath = path.join(dirPath, entry.name);

		if (entry.isDirectory()) {
			traverseDirectory(entryPath, replacements);
		} else if (entry.isFile()) {
			replaceInFile(entryPath, replacements);
		}
	}
}

const replacements = [[process.argv[2], process.argv[3]]];

traverseDirectory(rootDir, replacements);

console.timeEnd("Finished refactoring in");

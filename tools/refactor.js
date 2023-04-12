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
const fs = require("fs");
const path = require("path");

const rootDir = __dirname + "/../";

console.info("Started refactoring");
console.time("Finished refactoring in");

async function replaceInFile(filePath, replacements) {
	let fileContent = fs.readFileSync(filePath, "utf8");

	for (const [searchValue, replaceValue] of replacements) {
		fileContent = fileContent.replace(new RegExp(searchValue, "g"), replaceValue);
	}

	fs.writeFile(filePath, fileContent);
}

async function traverseDirectory(dirPath, replacements) {
	const entries = fs.readdirSync(dirPath, { withFileTypes: true });

	for (const entry of entries) {
		const entryPath = path.join(dirPath, entry.name);

		if (entry.isDirectory()) {
			traverseDirectory(entryPath, replacements);
		} else if (entry.isFile() && entry.name.endsWith(".js")) {
			replaceInFile(entryPath, replacements);
		}
	}
}

const replacements = [
	// Put your replacements here
	// example:
	["Something1", "Something2"]
];

traverseDirectory(rootDir, replacements);

console.timeEnd("Finished refactoring in");

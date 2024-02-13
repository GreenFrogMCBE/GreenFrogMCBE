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
const fs = require("fs").promises
const path = require("path")

if (process.argv.length < 4) {
	console.error("Usage: node refactor.js [old code] [new code]")

	process.exit(-1)
}

const rootDir = path.join(__dirname, "..")

console.info("Started refactoring")
console.time("Finished refactoring in")

/**
 * Replace specified strings in a file
 *
 * @param {string} filePath
 * @param {string[][]} replacements
 */
async function replaceInFile(filePath, replacements) {
	if (filePath.includes("node_modules")) {
		return
	}

	let fileContent = await fs.readFile(filePath, "utf8")

	await Promise.all(replacements.map(([searchValue, replaceValue]) => {
		fileContent = fileContent.replace(new RegExp(searchValue, "g"), replaceValue)
	}))

	await fs.writeFile(filePath, fileContent)
}

/**
 * Walks through the directory
 *
 * @param {string} dirPath
 * @param {string[][]} replacements
 */
async function traverseDirectory(dirPath, replacements) {
	const entries = await fs.readdir(dirPath, { withFileTypes: true })

	await Promise.all(entries.map(async (entry) => {
		const entryPath = path.join(dirPath, entry.name)

		if (entry.isDirectory()) {
			await traverseDirectory(entryPath, replacements)
		} else if (
			entry.isFile() &&
			(
				entry.name.includes(".js") ||
				entry.name.includes(".ts") ||
				entry.name.includes(".json") ||
				entry.name.includes(".yml")
			)
		) {
			await replaceInFile(entryPath, replacements)
		}
	}))
}

const replacements = [
	[
		process.argv[2], process.argv[3]
	]
]

traverseDirectory(rootDir, replacements)

console.timeEnd("Finished refactoring in")

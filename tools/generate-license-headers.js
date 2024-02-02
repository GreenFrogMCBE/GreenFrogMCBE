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
const fs = require("fs").promises;
const path = require("path");

const LICENSE_HEADER = `
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
`;

const srcPath = path.join(__dirname, "..");

/**
 * Adds a header to the file
 * 
 * @param {string} filePath 
 */
async function addHeader(filePath) {
	if (filePath.includes("node_modules")) {
		return;
	}

	try {
		const data = await fs.readFile(filePath);

		let contents = data.toString();

		if (!contents.includes("@link Github - https://github.com/GreenFrogMCBE/GreenFrogMCBE")) {
			contents = LICENSE_HEADER + contents;
			await fs.writeFile(filePath, contents);

			console.info(`Added license header to file ${filePath}`);
		}
	} catch (error) {
		console.error(`Error adding license header to file ${filePath}: ${error.stack}`);
	}
}

/**
 * Walks through the directory
 * 
 * @param {string} dir 
 */
async function walk(dir) {
	try {
		const files = await fs.readdir(dir);

		for (const file of files) {
			const filePath = path.join(dir, file);
			const stats = await fs.stat(filePath);

			if (stats.isDirectory()) {
				await walk(filePath);
			} else if (
				path.extname(filePath) === ".js" || 
				path.extname(filePath) === ".ts" || 
				path.extname(filePath) === ".cpp"
			) {
				await addHeader(filePath);
			}
		}
	} catch (err) {
		console.error(`Error reading directory ${dir}:`, err);
	}
}

walk(srcPath);

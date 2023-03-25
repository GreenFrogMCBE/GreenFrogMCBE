const fs = require("fs").promises;
const path = require("path");

const LICENSE_HEADER = `/**
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
`;

const srcPath = path.join(__dirname, "..");

const addHeader = async (filePath) => {
	if (filePath.includes("node_modules")) return;
	try {
		const data = await fs.readFile(filePath);
		let contents = data.toString();
		if (!contents.includes("Copyright 2023 andriycraft")) {
			contents = LICENSE_HEADER + contents;
			await fs.writeFile(filePath, contents);
			console.log(`Added license header to file ${filePath}`);
		}
	} catch (err) {
		console.error(`Error adding license header to file ${filePath}:`, err);
	}
};

const walk = async (dir) => {
	try {
		const files = await fs.readdir(dir);
		for (const file of files) {
			const filePath = path.join(dir, file);
			const stats = await fs.stat(filePath);
			if (stats.isDirectory()) {
				await walk(filePath);
			} else if (path.extname(filePath) === ".js" || path.extname(filePath) === ".ts") {
				await addHeader(filePath);
			}
		}
	} catch (err) {
		console.error(`Error reading directory ${dir}:`, err);
	}
};

walk(srcPath);

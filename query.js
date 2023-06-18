const util = require("minecraft-server-util");

async function main() {
	console.info("Asking basic:");
	console.log(await util.queryBasic("0.0.0.0", 19133, { timeout: 1000 * 10 }));

	console.info("Asking full:");
	console.log(await util.queryFull("0.0.0.0", 19133, { timeout: 1000 * 10 }));
}

main();

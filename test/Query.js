const util = require("minecraft-server-util");

module.exports = {
	async test() {
		console.info("Basic data:", await util.queryBasic("0.0.0.0", 19133, { timeout: 1000 * 10 }));
		console.info("Full data:", await util.queryFull("0.0.0.0", 19133, { timeout: 1000 * 10 }));
	}
}
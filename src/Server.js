/** @author KinashServerMCBE */
/** @author andriycraft */

const { RakNetServer, InternetAddress } = require("bbmc-raknet");
const Data = require('./Utils/Data')
const Logger = require('./Utils/Logger')
const Config = require('../../config.json')


const raknet = new RakNetServer(new InternetAddress(config.host, config.port, Data.bind_version), Data.magicnumber);
console.log('ha')

function handle() {
	console.log('handle')
	setInterval(() => {
		if (raknet.isRunning) {
			raknet.message = `${config.edition};${config.motd};${Data.protocol};${Data.version};0;${Data.maxplayers};${raknet.serverGUID.toString()};`;
		}
	});
	raknet.on('connect', (connection) => {
		console.log('connect')
	});
}

handle()
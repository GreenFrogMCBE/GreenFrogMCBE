/** @author KinashServerMCBE */
/** @author andriycraft */

const { RakNetServer, InternetAddress } = require("bbmc-raknet");
const Data = require('./Utils/Data')
const Logger = require('./Utils/Logger')

Logger.info('Loading server...')
Logger.info('Loading config.json')
try {
	const Config = require('../../config.json')
} catch (e) {
	Logger.info('Failed to load config.json')
	process.exit(-1)
}
const Config = require('../../config.json')
Logger.info('Creating raknet server...')
const raknet = new RakNetServer(new InternetAddress(Config.host, Config.port, Data.bind_version), Data.magicnumber);


function handle() {
	Logger.info('Raknet handler started')
	setInterval(() => {
		if (raknet.isRunning) {
			raknet.message = `MCPE;${Config.motd};${Data.protocol};${Data.version};0;${Data.maxplayers};${raknet.serverGUID.toString()};`;
		}
	});
	raknet.on('connect', (connection) => {
		console.log('connect')
	});
}

handle()
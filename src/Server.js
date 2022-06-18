/** @author KinashServerMCBE */
/** @author andriycraft */

const { RakNetServer, InternetAddress } = require("bbmc-raknet");
const Data = require('./Utils/Data')
const Logger = require('./Utils/Logger')

Logger.prototype.info('Loading server...')
Logger.prototype.info('Loading config.json')
try {
	const Config1 = require('../config.json')
} catch (e) {
	Logger.prototype.error('Failed to load config.json')
	process.exit(-1)
}
const Config = require('../config.json')
Logger.prototype.info('Creating raknet server...')
const raknet = new RakNetServer(new InternetAddress(Config.host, Config.port, Data.bind_version), Data.magicnumber);


function handle() {
	Logger.prototype.info('Raknet handler started')
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
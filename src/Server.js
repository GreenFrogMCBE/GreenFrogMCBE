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
	        raknet.message = `MCPE;${Config.motd};${Data.protocol};${Data.version};0;${Data.maxplayers};${raknet.serverGUID.toString()};`;
	}, 1)
}

raknet.socket.on('message', (msg, rinfo) => {
	if(rinfo.size == 33) {
		Logger.prototype.info(`Your server got pinged by ${rinfo.address}:${rinfo.port}`)
		return;
	}
	Logger.prototype.info(`Got a packet from ${rinfo.address}:${rinfo.port}, with size ${rinfo.size}, and version ${rinfo.family}`)
})

raknet.socket.on('open', (msg, rinfo) => {
	Logger.prototype.info(`Connection opened by someone`)
})
raknet.on('packet', (connection) => {
	console.log('connect')
});

handle()
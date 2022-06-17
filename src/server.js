/** @author KinashServerMCBE */
/** @author andriycraft */

const { RakNetServer, InternetAddress } = require("bbmc-raknet");
const Data = require('./data')
const config = require('../../config.json')
//const Logger = require('')


const raknet = new RakNetServer(
	new InternetAddress(config.host, config.port, Data.bind_version), Data.magicnumber
);
console.log('ha')

function handle() {
	console.log('handle')
        setInterval(() => {
            if (raknet.isRunning === true) {
		let ver = "1.19.0"
		let protocol = 527
                raknet.message = `MCPE;idk modd;${protocol};${ver};0;5;${raknet.serverGUID.toString()};`;
            } 
        });
	raknet.on('connect', (connection) => {
			console.log('connect')
		});
}

handle()
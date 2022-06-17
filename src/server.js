/** @author KinashServerMCBE */
/** @author andriycraft */

const { RakNetServer, InternetAddress, Frame, ReliabilityTool } = require("bbmc-raknet");
const Data = require('./data')

class server {
    constructor() {
        this.raknet = new RakNetServer(
            new InternetAddress(config.host, config.port, Data.bind_version), Data.magicnumber
        );
        this.handle()
    }

    handle() {
        let interval = setInterval(() => {
            if (this.raknet.isRunning === true) {
                this.raknet.message = `MCPE;MOTD;555;1.19.0;69;420;${raknet.serverGUID.toString()};`;
            } 
        });
    }
}
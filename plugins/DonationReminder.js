class DonationReminder {
    constructor() {}

    getName() {
        return "DonationReminder"
    }

    onLoad() {
        console.log(`\x1b[34mINFO\x1b[0m | [DonationReminder] Hi there! If you want to support GreenFrogMCBE you can donate at: https://www.paypal.com/donate/?hosted_button_id=EMT6MHNNL3KBQ`)
        console.log(`\x1b[34mINFO\x1b[0m | [DonationReminder] You will also be listed in our Discord server!`)
        console.log(`\x1b[34mINFO\x1b[0m | [DonationReminder] If you do not want to support us just delete the DonationPlugin.js from plugins folder`)
    }

    onJoin(server, client) { }
    onResourcePackInfoSent(server, client) { }
    onPlayerHasNoResourcePacksInstalled(server, client) { }
    onResourcePacksRefused(server, client) { }
    onPlayerHaveAllPacks(server, client) { }
    onResourcePacksCompleted(server, client) { }
    onKick(server, client, msg) { }
    onPlayerSpawn(server, client) { }
    onChat(server, client, msg, fullmsg) { }
    onCommand(server, client, command) { }
    onInternalServerError(server, client, error) { }
}

module.exports = DonationReminder;

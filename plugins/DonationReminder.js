class DonationReminder {
    constructor() {}

    getName() {
        return "DonationReminder"
    }
    
    getServerVersion() {
        return "1.2"
    }
    
    getVersion() {
        return "1.0"
    }
    
    onLoad() {
        console.log(`\x1b[34mINFO\x1b[0m | [DonationReminder] Hi there! If you want to support GreenFrogMCBE you can donate at: https://www.paypal.com/donate/?hosted_button_id=EMT6MHNNL3KBQ`)
        console.log(`\x1b[34mINFO\x1b[0m | [DonationReminder] You will also be listed in our Discord server!`)
        console.log(`\x1b[34mINFO\x1b[0m | [DonationReminder] If you do not want to support us just delete the DonationPlugin.js from plugins folder`)
    }

    onJoin() { }
    onResourcePackInfoSent() { }
    onPlayerHasNoResourcePacksInstalled() { }
    onResourcePacksRefused() { }
    onPlayerHaveAllPacks() { }
    onResourcePacksCompleted() { }
    onKick() { }
    onPlayerSpawn() { }
    onChat() { }
    onCommand() { }
    onConsoleCommand() { }
    onInternalServerError() { }
}

module.exports = DonationReminder;

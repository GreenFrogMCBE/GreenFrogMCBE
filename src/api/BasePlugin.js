class BasePlugin {
  constructor() {}
  getName() {}
  getServerVersion() {}
  getVersion() {}
  onLoad() {}
  onJoin() {}
  onResourcePackInfoSent() {}
  onPlayerHasNoResourcePacksInstalled() {}
  onResourcePacksRefused() {}
  onPlayerHaveAllPacks() {}
  onResourcePacksCompleted() {}
  onKick() {}
  onPlayerSpawn() {}
  onChat() {}
  onCommand() {}
  onConsoleCommand() {}
  onInternalServerError() {}
}

module.exports = BasePlugin;

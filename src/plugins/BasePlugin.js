class BasePlugin {
  constructor() { }
  onLoad() { }
  onShutdown() { }
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

module.exports = BasePlugin;

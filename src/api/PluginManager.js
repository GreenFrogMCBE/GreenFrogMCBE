let plugins = [];

class PluginManager {
  constructor() {}

  getPlugins() {
    return plugins;
  }

  addPlugin(name) {
    plugins.push(name);
  }
}

module.exports = PluginManager;

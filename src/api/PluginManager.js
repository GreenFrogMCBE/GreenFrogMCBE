class PluginManager {
    constructor() {
        this.plugins = []
    }

    getPlugins() {
        return this.plugins
    }

    addPlugin(name) {
        this.plugins.push(name)
    }
}

module.exports = PluginManager
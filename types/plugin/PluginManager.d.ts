declare type Plugin = string;

interface PluginManager {
  getPlugins: () => Plugin[];
  addPlugin: (name: Plugin) => void;
}

declare const pluginManager: PluginManager;

export default pluginManager;
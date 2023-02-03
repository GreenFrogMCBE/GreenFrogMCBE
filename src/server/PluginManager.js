const plugins = [];

module.exports = {
  getPlugins: () => plugins,
  addPlugin: name => plugins.push(name)
};
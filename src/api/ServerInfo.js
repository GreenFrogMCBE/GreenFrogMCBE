class ServerInfo {}

module.exports = {
  lang: require(`../lang/${require("../../config.json").lang}.json`),
  config: require("../../config.json"),
  majorserverversion: "1.5",
  serverversion: "1.5",
  commands: require(`../../commands.json`),
};

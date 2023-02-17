/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 *
 * Copyright 2023 andriycraft
 * Github: https://github.com/andriycraft/GreenFrogMCBE
 */
module.exports = {
  test() {
    const files = [
      "/../src/lang/en_US.json",
      "/../src/lang/lt_LT.json",
      "/../src/lang/uk_UA.json",
      "/../src/lang/vi_VN.json",
      "/../src/lang/fr_FR.json",
      "/../src/network/packets/res/biomes.json",
      "/../src/network/packets/res/creativecontent.json",
      "/../src/network/packets/res/entities.json",
      "/../package.json",
      "/../package-lock.json",
    ];

    for (const file of files) {
      console.log(`[langs] Parsing: ${file}`);
      JSON.parse(JSON.stringify(require(__dirname + file)));
    }
  },
};

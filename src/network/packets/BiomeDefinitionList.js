
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
class BiomeDefinitionList extends require("./Packet") {
  name() {
    return "biome_definition_list";
  }

  validate(client) {
    if (!client) throw new Error("Packet processing error. Client is null");
  }

  writePacket(client) {
    this.validate(client);
    client.write(this.name(), {
      nbt: {
        type: "compound",
        name: "",
        value: {
          idlist: {
            type: "list",
            value: {
              type: "compound",
              value: [
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:villager_v2",
                  },
                  rid: {
                    type: "int",
                    value: 115,
                  },
                  summonable: {
                    type: "byte",
                    value: 0,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:cat",
                  },
                  rid: {
                    type: "int",
                    value: 75,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:turtle",
                  },
                  rid: {
                    type: "int",
                    value: 74,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:chicken",
                  },
                  rid: {
                    type: "int",
                    value: 10,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:pig",
                  },
                  rid: {
                    type: "int",
                    value: 12,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:sheep",
                  },
                  rid: {
                    type: "int",
                    value: 13,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:wolf",
                  },
                  rid: {
                    type: "int",
                    value: 14,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:villager",
                  },
                  rid: {
                    type: "int",
                    value: 15,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:mooshroom",
                  },
                  rid: {
                    type: "int",
                    value: 16,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:squid",
                  },
                  rid: {
                    type: "int",
                    value: 17,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:rabbit",
                  },
                  rid: {
                    type: "int",
                    value: 18,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:bat",
                  },
                  rid: {
                    type: "int",
                    value: 19,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:minecart",
                  },
                  rid: {
                    type: "int",
                    value: 84,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:iron_golem",
                  },
                  rid: {
                    type: "int",
                    value: 20,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:ocelot",
                  },
                  rid: {
                    type: "int",
                    value: 22,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:horse",
                  },
                  rid: {
                    type: "int",
                    value: 23,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:llama",
                  },
                  rid: {
                    type: "int",
                    value: 29,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:polar_bear",
                  },
                  rid: {
                    type: "int",
                    value: 28,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:guardian",
                  },
                  rid: {
                    type: "int",
                    value: 49,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:panda",
                  },
                  rid: {
                    type: "int",
                    value: 113,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:parrot",
                  },
                  rid: {
                    type: "int",
                    value: 30,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:husk",
                  },
                  rid: {
                    type: "int",
                    value: 47,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:tropicalfish",
                  },
                  rid: {
                    type: "int",
                    value: 111,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:wither_skeleton",
                  },
                  rid: {
                    type: "int",
                    value: 48,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:cod",
                  },
                  rid: {
                    type: "int",
                    value: 112,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:zombie_villager",
                  },
                  rid: {
                    type: "int",
                    value: 44,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:pufferfish",
                  },
                  rid: {
                    type: "int",
                    value: 108,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:witch",
                  },
                  rid: {
                    type: "int",
                    value: 45,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:salmon",
                  },
                  rid: {
                    type: "int",
                    value: 109,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:dolphin",
                  },
                  rid: {
                    type: "int",
                    value: 31,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:donkey",
                  },
                  rid: {
                    type: "int",
                    value: 24,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:mule",
                  },
                  rid: {
                    type: "int",
                    value: 25,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:skeleton_horse",
                  },
                  rid: {
                    type: "int",
                    value: 26,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:zombie_horse",
                  },
                  rid: {
                    type: "int",
                    value: 27,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:hopper_minecart",
                  },
                  rid: {
                    type: "int",
                    value: 96,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:zombie",
                  },
                  rid: {
                    type: "int",
                    value: 32,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:tnt_minecart",
                  },
                  rid: {
                    type: "int",
                    value: 97,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:creeper",
                  },
                  rid: {
                    type: "int",
                    value: 33,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:chest_minecart",
                  },
                  rid: {
                    type: "int",
                    value: 98,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:skeleton",
                  },
                  rid: {
                    type: "int",
                    value: 34,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:spider",
                  },
                  rid: {
                    type: "int",
                    value: 35,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:command_block_minecart",
                  },
                  rid: {
                    type: "int",
                    value: 100,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:zombie_pigman",
                  },
                  rid: {
                    type: "int",
                    value: 36,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:slime",
                  },
                  rid: {
                    type: "int",
                    value: 37,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:enderman",
                  },
                  rid: {
                    type: "int",
                    value: 38,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:silverfish",
                  },
                  rid: {
                    type: "int",
                    value: 39,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:cave_spider",
                  },
                  rid: {
                    type: "int",
                    value: 40,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:ghast",
                  },
                  rid: {
                    type: "int",
                    value: 41,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:magma_cube",
                  },
                  rid: {
                    type: "int",
                    value: 42,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:blaze",
                  },
                  rid: {
                    type: "int",
                    value: 43,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:wither",
                  },
                  rid: {
                    type: "int",
                    value: 52,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:zombie_villager_v2",
                  },
                  rid: {
                    type: "int",
                    value: 116,
                  },
                  summonable: {
                    type: "byte",
                    value: 0,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:drowned",
                  },
                  rid: {
                    type: "int",
                    value: 110,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:stray",
                  },
                  rid: {
                    type: "int",
                    value: 46,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:elder_guardian",
                  },
                  rid: {
                    type: "int",
                    value: 50,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:elder_guardian_ghost",
                  },
                  rid: {
                    type: "int",
                    value: 120,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:vindicator",
                  },
                  rid: {
                    type: "int",
                    value: 57,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:phantom",
                  },
                  rid: {
                    type: "int",
                    value: 58,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:ravager",
                  },
                  rid: {
                    type: "int",
                    value: 59,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:ender_dragon",
                  },
                  rid: {
                    type: "int",
                    value: 53,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:shulker",
                  },
                  rid: {
                    type: "int",
                    value: 54,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:endermite",
                  },
                  rid: {
                    type: "int",
                    value: 55,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:armor_stand",
                  },
                  rid: {
                    type: "int",
                    value: 61,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:item",
                  },
                  rid: {
                    type: "int",
                    value: 64,
                  },
                  summonable: {
                    type: "byte",
                    value: 0,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:tnt",
                  },
                  rid: {
                    type: "int",
                    value: 65,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:falling_block",
                  },
                  rid: {
                    type: "int",
                    value: 66,
                  },
                  summonable: {
                    type: "byte",
                    value: 0,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:xp_bottle",
                  },
                  rid: {
                    type: "int",
                    value: 68,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:xp_orb",
                  },
                  rid: {
                    type: "int",
                    value: 69,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:eye_of_ender_signal",
                  },
                  rid: {
                    type: "int",
                    value: 70,
                  },
                  summonable: {
                    type: "byte",
                    value: 0,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:ender_crystal",
                  },
                  rid: {
                    type: "int",
                    value: 71,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:shulker_bullet",
                  },
                  rid: {
                    type: "int",
                    value: 76,
                  },
                  summonable: {
                    type: "byte",
                    value: 0,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:fishing_hook",
                  },
                  rid: {
                    type: "int",
                    value: 77,
                  },
                  summonable: {
                    type: "byte",
                    value: 0,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:dragon_fireball",
                  },
                  rid: {
                    type: "int",
                    value: 79,
                  },
                  summonable: {
                    type: "byte",
                    value: 0,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:arrow",
                  },
                  rid: {
                    type: "int",
                    value: 80,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:snowball",
                  },
                  rid: {
                    type: "int",
                    value: 81,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:egg",
                  },
                  rid: {
                    type: "int",
                    value: 82,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:painting",
                  },
                  rid: {
                    type: "int",
                    value: 83,
                  },
                  summonable: {
                    type: "byte",
                    value: 0,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:thrown_trident",
                  },
                  rid: {
                    type: "int",
                    value: 73,
                  },
                  summonable: {
                    type: "byte",
                    value: 0,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:fireball",
                  },
                  rid: {
                    type: "int",
                    value: 85,
                  },
                  summonable: {
                    type: "byte",
                    value: 0,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:splash_potion",
                  },
                  rid: {
                    type: "int",
                    value: 86,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:ender_pearl",
                  },
                  rid: {
                    type: "int",
                    value: 87,
                  },
                  summonable: {
                    type: "byte",
                    value: 0,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:leash_knot",
                  },
                  rid: {
                    type: "int",
                    value: 88,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:wither_skull",
                  },
                  rid: {
                    type: "int",
                    value: 89,
                  },
                  summonable: {
                    type: "byte",
                    value: 0,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:wither_skull_dangerous",
                  },
                  rid: {
                    type: "int",
                    value: 91,
                  },
                  summonable: {
                    type: "byte",
                    value: 0,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:boat",
                  },
                  rid: {
                    type: "int",
                    value: 90,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:lightning_bolt",
                  },
                  rid: {
                    type: "int",
                    value: 93,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:small_fireball",
                  },
                  rid: {
                    type: "int",
                    value: 94,
                  },
                  summonable: {
                    type: "byte",
                    value: 0,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:llama_spit",
                  },
                  rid: {
                    type: "int",
                    value: 102,
                  },
                  summonable: {
                    type: "byte",
                    value: 0,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:area_effect_cloud",
                  },
                  rid: {
                    type: "int",
                    value: 95,
                  },
                  summonable: {
                    type: "byte",
                    value: 0,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:lingering_potion",
                  },
                  rid: {
                    type: "int",
                    value: 101,
                  },
                  summonable: {
                    type: "byte",
                    value: 0,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:fireworks_rocket",
                  },
                  rid: {
                    type: "int",
                    value: 72,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:evocation_fang",
                  },
                  rid: {
                    type: "int",
                    value: 103,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:evocation_illager",
                  },
                  rid: {
                    type: "int",
                    value: 104,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:vex",
                  },
                  rid: {
                    type: "int",
                    value: 105,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:pillager",
                  },
                  rid: {
                    type: "int",
                    value: 114,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:goat",
                  },
                  rid: {
                    type: "int",
                    value: 128,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:glow_squid",
                  },
                  rid: {
                    type: "int",
                    value: 129,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:chest_boat",
                  },
                  rid: {
                    type: "int",
                    value: 218,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:agent",
                  },
                  rid: {
                    type: "int",
                    value: 56,
                  },
                  summonable: {
                    type: "byte",
                    value: 0,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:ice_bomb",
                  },
                  rid: {
                    type: "int",
                    value: 106,
                  },
                  summonable: {
                    type: "byte",
                    value: 0,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:balloon",
                  },
                  rid: {
                    type: "int",
                    value: 107,
                  },
                  summonable: {
                    type: "byte",
                    value: 0,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:npc",
                  },
                  rid: {
                    type: "int",
                    value: 51,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:tripod_camera",
                  },
                  rid: {
                    type: "int",
                    value: 62,
                  },
                  summonable: {
                    type: "byte",
                    value: 0,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:cow",
                  },
                  rid: {
                    type: "int",
                    value: 11,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:zoglin",
                  },
                  rid: {
                    type: "int",
                    value: 126,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:piglin_brute",
                  },
                  rid: {
                    type: "int",
                    value: 127,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:bee",
                  },
                  rid: {
                    type: "int",
                    value: 122,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:wandering_trader",
                  },
                  rid: {
                    type: "int",
                    value: 118,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:snow_golem",
                  },
                  rid: {
                    type: "int",
                    value: 21,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:fox",
                  },
                  rid: {
                    type: "int",
                    value: 121,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:hoglin",
                  },
                  rid: {
                    type: "int",
                    value: 124,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:piglin",
                  },
                  rid: {
                    type: "int",
                    value: 123,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:warden",
                  },
                  rid: {
                    type: "int",
                    value: 131,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:strider",
                  },
                  rid: {
                    type: "int",
                    value: 125,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:axolotl",
                  },
                  rid: {
                    type: "int",
                    value: 130,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:frog",
                  },
                  rid: {
                    type: "int",
                    value: 132,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:tadpole",
                  },
                  rid: {
                    type: "int",
                    value: 133,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 1,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:allay",
                  },
                  rid: {
                    type: "int",
                    value: 134,
                  },
                  summonable: {
                    type: "byte",
                    value: 1,
                  },
                },
                {
                  bid: {
                    type: "string",
                    value: "minecraft:",
                  },
                  hasspawnegg: {
                    type: "byte",
                    value: 0,
                  },
                  id: {
                    type: "string",
                    value: "minecraft:player",
                  },
                  rid: {
                    type: "int",
                    value: 257,
                  },
                  summonable: {
                    type: "byte",
                    value: 0,
                  },
                },
              ],
            },
          },
        },
      },
    });
  }
}

module.exports = BiomeDefinitionList;

<img src="https://cdn.discordapp.com/attachments/1039284824977981471/1083443286636765285/newlogo.jpg" align="right">

## GreenFrog

Server software for Minecraft: Bedrock edition, written in NodeJS

#### Development status > Under active development

[Discord](https://discord.gg/UFqrnAbqjP) <br>
[Help to translate](https://poeditor.com/join/project/fwIZCyBjPw) <br>
[Example plugin](https://github.com/greenfrogmc/ExamplePlugin) <br>

## How to install

1. Download this repo (use the Download > Download as zip button)
2. Do `npm i`
3. Run `npm run start`

## Developing

> Debugging plugins | Run `npm run debug`

> Building project | Run `npm run build`

> Testing | If you want to test the project manually run `node tools/tests-manual.js`

## Can't join locally?

1. Open PowerShell as an admin
2. Run: `CheckNetIsolation LoopbackExempt -a -n="Microsoft.MinecraftUWP_8wekyb3d8bbwe"`
3. Join via `127.0.0.1` if it doesn't work, join with your local IP from router settings

## Plugins

If you have one, feel free to open an issue (https://github.com/andriycraft/GreenFrogMCBE/issues/new/choose)

- Example plugin: https://github.com/greenfrogmc/ExamplePlugin | Description: This is a plugin is used just to test our API. You can use this a scaffolding for your plugin. | Author: GreenFrogMCBE

- Donations: https://github.com/greenfrogmc/DonationsPlugin | Description: A plugin that adds that annoying donation message. | Author: GreenFrogMCBE

## Features

> Chat <br>
> Player commands <br>
> Console commands <br>
> Join/leave messages <br>
> Configuration <br>
> Language system <br>
> Support of new versions <br>
> Basic moderation commands + API <br>
> Plugin support <br>
> Many events for plugin API <br>
> Form support <br>
> Toast support <br>
> Inventory support <br>
> Transferserver support <br>
> Packet API

## Configuration files list

1. config.yml - A file where all main settings are stored
2. package.json - (Do not edit if you don't know what are you doing) Config for some dependency related things
3. src/lang/<server language>.json - A place, where all the translation string are stored.
4. world/chunks.json - A save file for world
5. world/world_settings.json - Here you can change the world name and other settings
6. world/custom_items.json - Allows for you to create custom items on your server
7. src/network/packets/biomes.json - Allows for you to configure biomes
8. src/network/packets/creativeContent.json - Allows for you to customize the creative menu. Useful to remove some items, and add custom
9. src/network/packets/skinData.json - Allows to customize the skin data for the player list
10. src/network/packets/entities.json - Allows to disable/enable entities
11. plugins folder - A folder for plugins
12. plugins_configs - A folder for configs and data for plugins

## Credits

> If the name starts with "@" this means that the user has Github account credited <br>
> If the name does not start with "@" and contains "#" this means that the user has Discord account credited

1. @andriycraft

> For creating this software

2. @AnyBananaGAME

> For creating multilang (https://github.com/andriycraft/GreenFrogMCBE/pull/9)  <br>
> For improving tests and /list  <br>
> Making better tests (https://github.com/andriycraft/GreenFrogMCBE/pull/70)

3. @hvlxh

> For creating BasePlugin.js (https://github.com/andriycraft/GreenFrogMCBE/pull/20) <br>
> Fixing langs (https://github.com/andriycraft/GreenFrogMCBE/pull/19) <br>
> Making logger better <br>
> Also for disabling workflows for .MD files, also https://github.com/andriycraft/GreenFrogMCBE/pull/81 <br>
> For rewriting command system <br>
> For making the README.md file look better

4. @NhanAZ

> For improving code (https://github.com/andriycraft/GreenFrogMCBE/pull/4) <br>
> For sorting lang strings (https://github.com/andriycraft/GreenFrogMCBE/pull/22, https://github.com/andriycraft/GreenFrogMCBE/pull/23, https://github.com/andriycraft/GreenFrogMCBE/pull/24) <br>
> For reporting /help bug <br>
> For adding yarn, many changes to tests <br>
> For fixing paths <br>
> For reporting a bug that server cannot be stopped when plugins are null <br>
> For making /pl code better <br>
> For making /list code better <br>
> For making /deop code better <br>
> For making /help code better <br>
> For making /time code better <br>
> For making /say code better <br>
> For making /me code better <br>
> For making /op code better <br>
> For improving listen() in Server.js <br>
> For improving generatelicenseheaders.js

5. @ATXLtheAxolotl

> For adding nodemon script for faster development <br>
> For tiny cleaning of the code <br>
> Also for fixing weird usage of .prototype (https://github.com/andriycraft/GreenFrogMCBE/pull/44)

6. @bufferfishq

> For adding support for custom_form and new plugin system (https://github.com/andriycraft/GreenFrogMCBE/pull/47)

7. @andriycraftbot

> For fixing the code style (https://github.com/andriycraft/GreenFrogMCBE/pull/37, https://github.com/andriycraft/GreenFrogMCBE/pull/38, https://github.com/andriycraft/GreenFrogMCBE/pull/40, https://github.com/andriycraft/GreenFrogMCBE/pull/45, https://github.com/andriycraft/GreenFrogMCBE/pull/46, https://github.com/andriycraft/GreenFrogMCBE/pull/48, https://github.com/andriycraft/GreenFrogMCBE/pull/50, https://github.com/andriycraft/GreenFrogMCBE/pull/52, https://github.com/andriycraft/GreenFrogMCBE/pull/58, https://github.com/andriycraft/GreenFrogMCBE/pull/61, https://github.com/andriycraft/GreenFrogMCBE/pull/73, https://github.com/andriycraft/GreenFrogMCBE/pull/90)

8. @Zwuiix-cmd

> Suggested custom_form support (https://github.com/andriycraft/GreenFrogMCBE/issues/35) <br>

9. @CreeperG16 (Tom16#4672)

> For a better way to handle player disconnection <br>
> For adding 1.19.60 support <br>
> For adding 1.19.62 support  <br>
> For helping me with chunk support <br>
> For suggesting modal form support

10. Bedrock-protocol

> Packet handler and raknet

11. Wiki.VG (https://wiki.vg/Bedrock_Protocol)

> For packet documentation

12. js-yaml (https://github.com/nodeca/js-yaml)

> Used to parse config and other files

13. EasyProxy (https://github.com/Zwuiix-cmd/EasyProxy) (@Zwuiix-cmd)

> Used as an example for custom_form support (i had permission from repo owner)

14. 🌓Enzø ツ#6666

> Helping me with chunk support <br>

15. \<\/hakaN#0746

> For translating this software into Turkish <br>
  
16. @BasToTheMax

> For translating this software into Dutch (still in progress)  <br>
> Was the first person who starred this repo

17. @faaxz

> For reporting form bugs  <br>
> For helping me to add the chunk support <br>
> For rewriting logger <br>
> For rewriting 20% of the network code 

## Language system

Our language system currently supports those languages: English, Lithuanian, Ukrainian, Vietnamese, Turkish, Dutch (in progress)

#### English > set language in config.yml to "en_US"

#### Lithuanian > set language in config.yml to "lt_LT"

#### Ukrainian > set language in config.yml to "uk_UA"

#### Vietnamese > set language in config.yml to "vi_VN"

#### French > set language in config.yml to "fr_FR"

## Servers (https://github.com/andriycraft/GreenFrogMCBE/issues/new/choose)

Contact me us in our discord server, if you have one, or open an issue in this repo

> Currently none

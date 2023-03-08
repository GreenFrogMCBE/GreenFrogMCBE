<img src="https://greenfrog.f1470348511.workers.dev/favicon.ico">

<a href="https://github.com/andriycraft/GreenFrogMCBE/blob/master/LICENSE">
  <img alt="License" src="https://img.shields.io/github/license/andriycraft/GreenFrogMCBE">
</a>
<a href="https://github.com/andriycraft/GreenFrogMCBE/commits/main">
  <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/andriycraft/GreenFrogMCBE?color=%2387F4BC&style=flat-square">
</a>

## GreenFrogMCBE

Server software for Minecraft: Bedrock edition, written in NodeJS

Our discord: https://discord.gg/UFqrnAbqjP

#### Warning: This software is still in beta!

#### Our goal is to make the software support as much features, as possible

#### Development status > Under active development

#### Help to translate > https://poeditor.com/join/project/fwIZCyBjPw

#### Example plugin > https://github.com/greenfrogmc/ExamplePlugin

#### If you use our code, please credit us

## How to install

1. Clone this repo
2. Do `npm i`
3. Run `npm run start`

## Debugging

Run `npm run debug`

## Building

Run `npm run build`

This formats the code and enables debug mode

## Can't join locally?

Step 1. Open PowerShell as an admin

Step 2. Run: `CheckNetIsolation LoopbackExempt -a -n="Microsoft.MinecraftUWP_8wekyb3d8bbwe"`

Step 3. Join via `127.0.0.1` if it does not work, join with your local IP from router settings

## Plugins

If you have one, feel free to open an issue (https://github.com/andriycraft/GreenFrogMCBE/issues/new/choose)

- Example plugin: https://github.com/greenfrogmc/ExamplePlugin | Description: This is a plugin is used just to test our API. You can use this a scaffolding for your plugin. | Author: GreenFrogMCBE

- Donations: https://github.com/greenfrogmc/DonationsPlugin | Description: A plugin that adds that annoying donation message. | Author: GreenFrogMCBE

## Features

1. Chat
2. Player commands
3. Console commands
4. Join/leave messages
5. Configuration
6. Language system
7. Support of new versions
8. Basic moderation (/kick)
9. Open source
10. Plugin support
11. Many events for plugin API
12. Form support
13. Toast support
14. Inventory support
15. Transfer packet support
16. Packet API

## Testing

1. If you want to test the project manually run `node tools/tests-manual.js`
2. If you are Github workflow or something run `node tools/tests-auto.js`

## Configuration files list

1. config.yml - A file where all main settings are stored
2. package.json - (Do not edit if you don't know what are you doing) Config for some dependency related things
3. src\lang\<server language>.json - A place, where all the translation string are stored.
4. world\chunks.json - A save file for world
5. world\world_settings.json - Here you can change the world name and other settings
6. world\custom_items.json - Allows for you to create custom items on your server
7. src\network\packets\biomes.json - Allows for you to configure biomes
8. src\network\packets\creativeContent.json - Allows for you to customize the creative menu. Useful to remove some items, and add custom
9. src\network\packets\skinData.json - Allows to customize the skin data for the player list
10. src\network\packets\entities.json - Allows to disable/enable entities
11. plugins folder - A folder for plugins
12. plugins_configs - A folder for configs and data for plugins

## Credits

> If the name starts with "@" this means that the user has Github account credited
> If the name does not start with "@" and contains "#" this means that the user has Discord account credited

1. @andriycraft

   > For creating this software

2. @AnyBananaGAME

   > For creating multilang (#9)
   > For improving tests and /list
   > Making better tests (#70)

3. @hvlxh

   > For creating BasePlugin.js (#20)
   > Fixing langs (#19)
   > Making logger better
   > Also for disabling workflows for .MD files, also #81
   > For making better commands system
   > For making the README.md file look better

4. @NhanAZ

   > For improving code (#4)
   > For sorting lang strings (#22, #23, #24)
   > For reporting /help bug,
   > For adding yarn, many changes to tests
   > For making a workflow that automatically builds the project,
   > For fixing paths
   > For reporting a bug that server cannot be stopped when plugins is null
   > For making /pl code better
   > For making /list code better
   > For making /deop code better
   > For making /help code better
   > For making /time code better
   > For making /say code better
   > For making /me code better
   > For making /op code better
   > For improving _listen() in Server.js
   > For improving generatelicenseheaders.js
   

5. @ATXLtheAxolotl

   > For adding nodemon script for faster development
   > For tiny cleaning
   > Also for fixing weird usage of .prototype (#44)

6. @bufferfishq

   > For adding support for custom_form and new plugin system (#47)

7. @andriycraftbot

   > For fixing the code style (#37, #38, #40, #45, #46, #48, #50, #52, #58, #61, #73, #90)

8. @Zwuiix-cmd

   > Suggested custom_form support (https://github.com/andriycraft/GreenFrogMCBE/issues/35)

9. @CreeperG16 (Tom16#4672)

   > For a better way to handle player disconnection (https://github.com/andriycraft/GreenFrogMCBE/pull/55/commits/7376c60e73d9e98c4791f89f4c7c54b644e006a4#diff-f187ec8efe95aba91b86e895736549fccc085f2e0d364e35c17cbd8a1206b744L105-R105) 
   > For adding 1.19.60 support
   > For adding 1.19.62 support 
   > For helping me with chunk support
   > For suggesting modal form support

10. Bedrock-protocol (https://github.com/PrismarineJS/bedrock-protocol)
  
   > Packet handler and raknet

11. Wiki.VG (https://wiki.vg/Bedrock_Protocol)
  
   > For packet documentation

11. js-yaml (https://github.com/nodeca/js-yaml)
  
   > Used to parse config and other files

12. EasyProxy (https://github.com/Zwuiix-cmd/EasyProxy) (@Zwuiix-cmd)

   > Used as an example for custom_form support (i had permission from repo owner)

13. 🌓Enzø ツ#6666

   > Helping me with chunk support

14. \<\/hakaN#0746

   > For translating this software into Turkish
  
15. @BasToTheMax

   > For translating this software into Dutch (still in progress) 
   > Was the first person who starred this repo

16 . @faaxz

   > For reporting form bugs 
   > For helping me to add the chunk support

## Language system

Our language system currently supports those languages: English, Lithuanian, Ukrainian, Vietnamese, Turkish, Dutch (in progress)

# English > set language in config.yml to "en_US"

# Lithuanian > set language in config.yml to "lt_LT"

# Ukrainian > set language in config.yml to "uk_UA"

# Vietnamese > set language in config.yml to "vi_VN"

# French > set language in config.yml to "fr_FR"

## Donations

If you want to support this project, you can donate at: https://www.paypal.com/donate/?hosted_button_id=EMT6MHNNL3KBQ

## Servers that run this software

If you have one, fell free to open an issue! (https://github.com/andriycraft/GreenFrogMCBE/issues/new/choose)

(server must be hosted on this software)

- Currently none

```

```

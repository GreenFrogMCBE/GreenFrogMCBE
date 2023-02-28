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

1. If you want to test the project manually run `tests-manually.js`
2. If you are Github workflow or something run `test-auto.js`

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

## Credits

```@andriycraft - For creating this software
@AnyBananaGAME - For creating multilang (#9) also for improving tests and /list, making better tests (#70)
@hvlxh - For creating BasePlugin.js (#20) and fixing langs (#19) and also making logger better (#33) also for disabling workflows for .MD files
@NhanAZ - For improving code (#4) and sorting lang strings (#22, #23, #24)
@ATXLtheAxolotl - For adding nodemon script for faster development, tiny cleaning, & fixed weird usage of .prototype  (#44)
@bufferfishq - For adding support for custom_form and new plugin system (#47)
@andriycraftbot - For fixing the code style (#37, #38, #40, #45, #46, #48, #50, #52, #58, #61)
@Zwuiix-cmd - Suggested custom_form support (https://github.com/andriycraft/GreenFrogMCBE/issues/35)
@CreeperG16 (Tom16#4672) - For a better way to handle player disconnection (https://github.com/andriycraft/GreenFrogMCBE/pull/55/commits/7376c60e73d9e98c4791f89f4c7c54b644e006a4#diff-f187ec8efe95aba91b86e895736549fccc085f2e0d364e35c17cbd8a1206b744L105-R105) and for adding 1.19.60 and 1.19.62 support to bedrock-protocol and helping me with chunk support
Bedrock-protocol (https://github.com/PrismarineJS/bedrock-protocol) - Packet sender and raknet
Wiki.vg (https://wiki.vg/Bedrock_Protocol) - For packet docs
js-yaml (https://github.com/nodeca/js-yaml) - Used to parse config and other files
EasyProxy (https://github.com/Zwuiix-cmd/EasyProxy) (@Zwuiix-cmd) - Used as an example for custom_form support (i had permission from repo owner)
🌓Enzøツ#6666 - Helping me with chunk support
@</hakaN#0746 - For translating this software into Turkish
@BasToTheMax - For translating this software into Dutch (still in progress) and was the first person who starred this repo
@faaxz - for reporting form bugs & helping me to add the chunk support
```

## Language system

Our language system currently supports those languages: English, Lithuanian, Ukrainian, Vietnamese, Turkish, Dutch (in progress)

For English language, set "language" to "en_US"

For Lithuanian language, set "language" to "lt_LT"

For Ukrainian language, set "language" to "uk_UA"

For Vietnamese language, set "language" to "vi_VN"

For French language, set "language" to "fr_FR"

## Donations

If you want to support this project, you can donate at: https://www.paypal.com/donate/?hosted_button_id=EMT6MHNNL3KBQ

## Servers that run this software

If you have one, fell free to open an issue! (https://github.com/andriycraft/GreenFrogMCBE/issues/new/choose)

(server must be hosted on this software)

- Currently none

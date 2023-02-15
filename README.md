<img src="https://greenfrog.f1470348511.workers.dev/favicon.ico">

<a href="https://github.com/andriycraft/GreenFrogMCBE/blob/master/LICENSE">
  <img alt="License" src="https://img.shields.io/github/license/andriycraft/GreenFrogMCBE">
</a>
<a href="https://github.com/andriycraft/GreenFrogMCBE/commits/main">
  <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/andriycraft/GreenFrogMCBE?color=%2387F4BC&style=flat-square">
</a>

## GreenFrogMCBE

Server software for Minecraft bedrock, written in NodeJS

Our Discord: https://discord.gg/UFqrnAbqjP

#### development status > under active development

#### site > https://greenfrog.f1470348511.workers.dev/

#### help to translate > https://poeditor.com/join/project/fwIZCyBjPw

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

Step 1. Open powershell as an admin

Step 2. Run: `CheckNetIsolation LoopbackExempt -a -n="Microsoft.MinecraftUWP_8wekyb3d8bbwe"`

Step 3. Join via `127.0.0.1` if it does not work join with your local IP from router settings

## Plugins

If you have one feel free to open an issue

- Example plugin: https://github.com/andriycraft/GreenFrogMCBE/tree/main/docs/plugins/exampleplugin | Description: This is a plugin is used just to test our API. You can use this an scaffolding for your plugin | Author: GreenFrogMCBE
- Donations: https://github.com/andriycraft/GreenFrogMCBEdonations/ | Description: A plugin that adds that annoying donation message. | Author: GreenFrogMCBE

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

## Credits

```@andriycraft - For creating this software
@AnyBananaGAME - For creating multilang (#9)
@hvlxh - For creating BasePlugin.js (#20) and fixing langs (#19) and also making logger better (#33)
@NhanAZ - For improving code (#4) and sorting lang strings (#22, #23, #24)
@ATXLtheAxolotl - For adding nodemon script for faster development, tiny cleaning, & fixed weird usage of .prototype  (#44)
@bufferfishq - For adding support for custom_form and new plugin system (#47)
@andriycraftbot - For fixing the code style
@Zwuiix-cmd - Suggested custom_form support
@CreeperG16 - For a better way to handle player disconnection (https://github.com/andriycraft/GreenFrogMCBE/pull/55/commits/7376c60e73d9e98c4791f89f4c7c54b644e006a4#diff-f187ec8efe95aba91b86e895736549fccc085f2e0d364e35c17cbd8a1206b744L105-R105)
EasyProxy (https://github.com/Zwuiix-cmd/EasyProxy) (@Zwuiix-cmd) - Used as an example for custom_form support (i had permission from repo owner)
```

## Language system

Our language system currently supports those languages: English, Lithuanian, Ukrainian, Vietnamese

For English language select "language": "en_US"

For Lithuanian language select "language": "lt_LT"

For Ukrainian language select "language": "uk_UA"

For Vietnamese language select "language": "vi_VN"

For French language select "language": "fr_FR"

## Donations

If you want to support this project, you can donate at: https://www.paypal.com/donate/?hosted_button_id=EMT6MHNNL3KBQ

## Servers that run this software

If you have one fell free to open an issue!

- Currently none

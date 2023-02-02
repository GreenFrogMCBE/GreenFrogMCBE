<img src="https://cdn.discordapp.com/attachments/1027321168576925799/1053767928849383514/logo.png">

<a href="https://github.com/andriycraft/GreenFrogMCBE/blob/master/LICENSE">
  <img alt="License" src="https://img.shields.io/github/license/andriycraft/GreenFrogMCBE">
</a>
<a href="https://github.com/andriycraft/GreenFrogMCBE/commits/main">
  <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/andriycraft/GreenFrogMCBE?color=%2387F4BC&style=flat-square">
</a>

## GreenFrogMCBE

Server software for Minecraft Bedrock, written in Node js

Our Discord: https://discord.gg/UFqrnAbqjP

#### development status > maintained

## How to install

1. Clone this repo
2. Do 'npm i'
3. Run 'npm run'

## Debugging

Run npm run debug

## "Building"

Run npm run build

This formats the code and enables debug mode

## Can't join locally?

Step 1. Open powershell as an admin

Step 2. Run: `CheckNetIsolation LoopbackExempt -a -n="Microsoft.MinecraftUWP_8wekyb3d8bbwe"`

Step 3. Join via 172.0.0.1 if it does not work join with your local IP from router settings

## Plugins available for public usage

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
9. Admin commands
10. Plugin support
11. Support of new versions
12. Many events for plugin API
13. Toast support
14. Inventory support
15. Transfer packet support
16. Packet API
17. Form support

## Language system

Our language system currently supports those languages: English, Lithuanian, Ukrainian, Vietnamese

For English language select "language": "en_US"

For Lithuanian language select "language": "lt_LT"

For Ukrainian language select "language": "uk_UA"

For Vietnamese language select "language": "vi_VN"

For French language select "language": "fr_FR"

## Configuration tutorial

- You can edit your config in config.json
- You can edit your server language in /src/lang/(server language).json
- You can disable or enable commands in commands.json. "true" means enabled. "false" means disabled.
- ops.yml contains list of OPs

## Donations

If you want to support this project, you can donate at: https://www.paypal.com/donate/?hosted_button_id=EMT6MHNNL3KBQ

## Servers that run this software

If you have one fell free to open an issue!

- Currently none

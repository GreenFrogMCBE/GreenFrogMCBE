<img src="https://cdn.discordapp.com/attachments/1027321168576925799/1053767928849383514/logo.png">

<a href="https://github.com/andriycraft/GreenFrogMCBE/blob/master/LICENSE">
  <img alt="License" src="https://img.shields.io/github/license/andriycraft/GreenFrogMCBE?style=flat-square">
</a>
<a href="https://github.com/andriycraft/GreenFrogMCBE/commits/main">
  <img alt="GitHub commit activity (main)" src="https://img.shields.io/github/commit-activity/m/andriycraft/GreenFrogMCBE?color=%2387F4BC&style=flat-square">
</a>
<a href="https://github.com/andriycraft/GreenFrogMCBE/search?q=todo">
  <img alt="TODO counter" src="https://img.shields.io/github/search/andriycraft/GreenFrogMCBE/todo?style=flat-square">
</a>

## GreenFrogMCBE 

Server software for Minecraft Bedrock, written in Node js

Our Discord: https://discord.gg/UFqrnAbqjP


## How to install

1. Clone this repo
2. Do 'npm i'
3. Then do 'node index.js'
4. Done

## Can't join locally

Run powershell as an admin

Run: `CheckNetIsolation LoopbackExempt -a -n="Microsoft.MinecraftUWP_8wekyb3d8bbwe"`

Join via 172.0.0.1

## Plugins available for public usage

If you have one feel free to open an issue

* Example plugin: https://github.com/andriycraft/GreenFrogMCBE/tree/main/docs/plugins/exampleplugin | Description: This is a plugin is used just to test our API. You can use this an scaffolding for your plugin | Author: GreenFrogMCBE
* DonationReminder: https://github.com/andriycraft/GreenFrogMCBEdonations/ | Description: A plugin that adds that annoying donation message. | Author: GreenFrogMCBE

## Plugin listing rules

If you want for your plugin to be listed on the 'Plugins available for public usage' section, you must follow this rules:

* Your plugin must contain .gfmcp file in the root directory. Example here: https://github.com/andriycraft/GreenFrogMCBE/tree/plugins/docs/exampleplugin/.gfmcp

## Features

1. Chat
2. Player commands
3. Console commands
4. Join/leave messages
5. Configuration
6. Language system
7. Support of new versions
8. Basic moderation (/kick)
9. Basic admin commands
10. Plugin support
11. Support of new versions
12. Many events for plugin API

## Language system
Our language system currently supports those languages: English, Lithuanian, Ukrainian, Vietnamese, French (in progress)
For English language select "language": "en_US"

For Lithuanian language select "language": "lt_LT"

For Ukrainian language select "language": "uk_UA"

For Vietnamese language select "language": "vi_VN"

For French language select "language": "fr_FR". Note: French language is not implemented yet. It will be implemented soon


## Configuration tutorial

- You can edit your config in config.json
- You can edit your server language in /src/lang/(server language).json
- You can disable or enable commands in commands.json. "true" means enabled. "false" means disabled.

## Forking rules

1. You are not allowed to change your fork license
2. Credit me and GreenFrogMCBE somewhere

## Donations

If you want to support this project, you can donate at: https://www.paypal.com/donate/?hosted_button_id=EMT6MHNNL3KBQ

## Servers that run this software

If you have one fell free to open an issue!

- 159.65.55.27 | Testing server for GreenFrog
- 67.207.68.250 | Second testing server for GreenFrog

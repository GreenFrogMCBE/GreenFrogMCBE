@echo off
@echo Running: title GreenFrogMCBE Server
title GreenFrogMCBE Server
@echo Running: powershell /c CheckNetIsolation LoopbackExempt -a -n="Microsoft.MinecraftUWP_8wekyb3d8bbwe"
start powershell /c CheckNetIsolation LoopbackExempt -a -n="Microsoft.MinecraftUWP_8wekyb3d8bbwe"
@echo Running: node index.js
node index.js
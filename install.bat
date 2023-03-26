@echo off
@echo Trying to install. Please note that this requires Git cli, and NodeJS to be installed
cd plugins
git clone https://github.com/greenfrogmc/Donations.git
cd ..
npm i
npm run start
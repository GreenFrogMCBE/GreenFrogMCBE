/** @author KinashServerMCBE */
/** @author andriycraft */

const Color = require('./ConsoleColors')

class Logger {
   constructor() { }

   info (message) {
   	console.log(`${Color.cyan} Info ${Color.white} - ${message}`)
   }

   warn (message) {
   	console.log(`${Color.yellow} Warning ${Color.white} - ${message}`)
   }

   error (message) {
   	console.log(`${Color.red} Error ${Color.white} - ${message}`)
   }
}
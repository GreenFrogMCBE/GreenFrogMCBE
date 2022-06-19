/** @author KinashServerMCBE */
/** @author andriycraft */

const Color = require('./ConsoleColors')

class Logger {

   constructor() { }

   getDate() {
      let d = new Date()
      return `${Color.blue}${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
   }

   info(message) {
      console.log(`${this.getDate()}${Color.cyan} Info${Color.white} - ${message}`)
   }

   warn(message) {
      console.log(`${this.getDate()}${Color.yellow} Warning${Color.white} - ${message}`)
   }

   error(message) {
      console.log(`${this.getDate()}${Color.red} Error${Color.white} - ${message}`)
   }

}

module.exports = Logger;
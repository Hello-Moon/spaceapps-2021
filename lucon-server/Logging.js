/**
 * creating a logger in idex.js was causing problems,
 * so a simple hack... (create anoother file,
 * just for logging)
*/

const fs = require('fs');

// for storing logs
const LOG_FILE = 'lucon.log';
const logger = fs.createWriteStream(LOG_FILE);

console.log(`[INFO] see the "${LOG_FILE}" file for logs`)

module.exports.logger = logger;
module.exports.LOG_FILE = LOG_FILE;
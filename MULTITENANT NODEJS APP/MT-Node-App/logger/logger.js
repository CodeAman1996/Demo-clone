const winston = require('winston')
const consoleTransport = new winston.transports.Console()
const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)


function logError(err, req, res, next) {
    logger.error(err)
    next()
}

module.exports = logError;
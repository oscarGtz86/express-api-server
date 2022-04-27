/**
 * Winston logger implementation. For custom config please refer to:
 * https://github.com/winstonjs/winston#readme
 * @author Oscar Escamilla
 * @date 02.02.2022
 */
const { createLogger, format, transports } = require('winston'); // Winston logger
require('winston-daily-rotate-file');
const fs = require('fs');

const node_env = process.env.NODE_ENV || 'development';
const level = node_env === 'development' ? 'debug' : 'info';
const logDir = process.env.LOG_PATH || 'logs';
const logName = process.env.LOG_NAME || 'server'

// create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// define the custom settings for each transport (file, console)
const options = {
    file: {
        level: level,
        format: format.combine(
            format.colorize(),
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            format.printf(info => `${info.timestamp} ${info.level}: ${JSON.stringify(info.message)}`)
        ),
        filename: `${logDir}/${logName}-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        // maxSize: '20m',
        maxFiles: '5d'
    },
    console: {
        level: level,
        format: format.combine(
            format.colorize(),
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            format.printf(info => `${info.timestamp} ${info.level}: ${JSON.stringify(info.message)}`)
        )
    },
};

// instantiate a new Winston Logger with the settings defined above
const logger = createLogger({
    transports: [
        new transports.DailyRotateFile(options.file),
        new transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: function(message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message);
    },
};

module.exports = logger;

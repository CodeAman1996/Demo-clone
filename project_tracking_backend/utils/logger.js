const { format, createLogger, transports } = require("winston");
const WinstonCloudWatch = require('winston-aws-cloudwatch');
const { combine, timestamp, label, printf, prettyPrint } = format;
const CATEGORY = "winston custom format";
//Using the printf format.
const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });

const logger = createLogger({
    level: "debug",
    format: combine(
        label({ label: CATEGORY }),
        timestamp({
            format: "MMM-DD-YYYY HH:mm:ss",
        }),
        printf((info) => {
            if (typeof info.message === 'object') {
              info.message = JSON.stringify(info.message, null, 3)
       }
      return info.message
      }),
       // customFormat
        prettyPrint()
    ),
    transports: [
        // new transports.File({
        //     filename: "logs/example.log",
        // }),
        // new transports.File({
        //     level: "error",
        //     filename: "logs/error.log",
        // }),
        new transports.Console(),
    ],
});


const cloudwatchConfig = {

    logGroupName: 'test-group',
    logStreamName: `test-group`,
     awsAccessKeyId:'AKIAUQC4YRHF43CQ6VIZ',
    awsSecretKey: '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',
    awsRegion: 'us-east-2',
     messageFormatter: ({ level, message, additionalInfo }) =>`[${level}] : ${message} \nAdditional Info: ${JSON.stringify(additionalInfo)}}`
}
    logger.add(new WinstonCloudWatch(cloudwatchConfig))


module.exports = logger;

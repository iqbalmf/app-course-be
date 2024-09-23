const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')
const { combine, timestamp, printf, colorize, align } = winston.format;
const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD', // Rotate daily
      zippedArchive: true, // Compress logs
      maxSize: '10m', // Max file size before rotation
      maxFiles: '14d' // Keep logs for the last 14 days
    })
  ],
})

module.exports = logger
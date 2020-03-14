import morgan from 'morgan';
import winston from 'winston';

export const standardLog = (logger: morgan.Morgan) => {
  return logger(':date[clf] :method :url :status | :res[content-length] bytes - :response-time ms');
};

const { colorize, combine, printf, timestamp } = winston.format;
const { Console } = winston.transports;

const formatInfo = (info: any) => {
  return `${info.timestamp} [${info.level}] ${info.message}`;
};

const logger = winston.createLogger({
  format: timestamp({ format: 'DD/MMM/YYYY:HH:mm:ss ZZ' }),
  transports: [
    new Console({
      level: 'debug',
      format: combine(colorize(), printf(formatInfo)),
    }),
  ],
});

export default logger;

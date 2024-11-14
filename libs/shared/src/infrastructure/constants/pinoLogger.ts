import { Params } from 'nestjs-pino';

export const pinoLoggerConfig: Params = {
  pinoHttp: {
    level: process.env.LOG_LEVEL || 'debug',
    redact: {
      paths: ['req.headers.authorization', 'req.headers.cookie'],
      censor: '******',
    },
  },
};

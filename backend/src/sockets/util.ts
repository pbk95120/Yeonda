import logger from '@src/logger';

const logError = (message: string, error?: Error) => {
  if (error) {
    logger.error(message.concat(' ', error.message, ' ', error.stack));
  } else {
    logger.error(message);
  }
};

export default logError;

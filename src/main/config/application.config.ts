import dotenv from 'dotenv';
import logger from '../utils/logging.utils';

export interface ApplicationConfig {
  port: number;
  environment: string;
}

export let config: ApplicationConfig;

export const load = async () => {
  logger.info('Loading configuration...');

  dotenv.config();

  config = {
    port: process.env.APP_PORT ? Number(process.env.APP_PORT) : 4000,
    environment: process.env.APP_ENV || 'development',
  };

  logger.info('Configuration loaded');

  return config;
};

export default { load };

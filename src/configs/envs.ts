import { LogDriver } from '../common/enum/logDriver';

export const PORT = process.env.PORT || 3000;

export const MONGODB_URI = process.env.MONGODB_URI || '';

export const LOG_DRIVER = process.env.LOG_DRIVER || LogDriver.DEFAULT;
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

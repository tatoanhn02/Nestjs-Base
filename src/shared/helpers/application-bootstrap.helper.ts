import * as config from 'config';
import { INestApplication } from '@nestjs/common';
import { CONFIG_SERVICE_BASE_URL } from '../constants/config.constant';

const BASE_URL: string = config.get<string>(CONFIG_SERVICE_BASE_URL);

export const setupApplication = async (
  app: INestApplication,
): Promise<void> => {
  app.setGlobalPrefix(BASE_URL);
};

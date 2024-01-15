import * as config from 'config';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {INestApplication, Logger} from '@nestjs/common';
import {initializeSwagger} from './shared/helpers/swagger.helper';
import {
  CONFIG_SERVER_HOSTNAME,
  CONFIG_SERVER_PORT,
  CONFIG_SERVICE_BASE_URL,
  CONFIG_SERVICE_DOCS_BASE_URL,
  CONFIG_SERVICE_NAME,
} from './shared/constants/config.constant';
import {setupApplication} from './shared/helpers/application-bootstrap.helper';
import {HttpExceptionFilter} from './shared/filters/http-exception.filter';

const SERVER_PORT: number = +config.get<number>(CONFIG_SERVER_PORT);
const SERVICE_NAME: string = config.get<string>(CONFIG_SERVICE_NAME);
const HOST_NAME: string = config.get<string>(CONFIG_SERVER_HOSTNAME);
const SERVICE_BASE_URL: string = config.get<string>(CONFIG_SERVICE_BASE_URL);
const SERVICE_DOCS_BASE_URL: string = config.get<string>(CONFIG_SERVICE_DOCS_BASE_URL);

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  await setupApplication(app);
  app.useGlobalFilters(new HttpExceptionFilter());
  await initializeSwagger(app);
  await app.listen(SERVER_PORT);
}
bootstrap().then(() => {
  Logger.log(`${SERVICE_NAME} API service started`);
  Logger.log(`Started on http(s)://${HOST_NAME}${SERVICE_BASE_URL}`);
  Logger.log(`Docs available on http(s)://${HOST_NAME}${SERVICE_DOCS_BASE_URL}`);
});

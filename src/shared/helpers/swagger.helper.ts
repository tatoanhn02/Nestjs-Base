import * as config from 'config';
import {INestApplication} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {
  CONFIG_SERVER_HOSTNAME,
  CONFIG_SERVER_SWAGGER_SCHEMA,
  CONFIG_SERVICE_API_VERSION,
  CONFIG_SERVICE_DESC,
  CONFIG_SERVICE_DOCS_BASE_URL,
  CONFIG_SERVICE_NAME,
} from '../constants/config.constant';

const SERVICE_NAME: string = config.get<string>(CONFIG_SERVICE_NAME);
const SERVICE_DESCRIPTION: string = config.get<string>(CONFIG_SERVICE_DESC);
const API_VERSION: string = config.get<string>(CONFIG_SERVICE_API_VERSION);
const SERVER_BASE_URL = `${config.get<string>(CONFIG_SERVER_SWAGGER_SCHEMA)}://${config.get<string>(
  CONFIG_SERVER_HOSTNAME,
)}`;
const SWAGGER_BASE_URL: string = config.get<string>(CONFIG_SERVICE_DOCS_BASE_URL);

export const initializeSwagger = async (app: INestApplication): Promise<void> => {
  const server = app.getHttpAdapter();

  const config = new DocumentBuilder()
    .setTitle(`${SERVICE_NAME} API spec`)
    .setDescription(`${SERVICE_DESCRIPTION} | | [swagger.json](swagger.json)`)
    .setVersion(API_VERSION)
    .addServer(SERVER_BASE_URL)
    .addBearerAuth({type: 'apiKey', name: 'access-token', in: 'header'})
    .build();

  const document = SwaggerModule.createDocument(app, config);

  server.get(`${SWAGGER_BASE_URL}/swagger.json`, (_, res) => {
    res.json(document);
  });

  SwaggerModule.setup(SWAGGER_BASE_URL, app, document, {
    swaggerOptions: {
      displayOperationId: true,
    },
  });
};

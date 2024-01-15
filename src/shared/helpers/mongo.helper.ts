import * as config from 'config';
import {MongooseModuleOptions} from '@nestjs/mongoose';
import {CONFIG_MONGODB_URI} from '../constants/config.constant';

export const getMongooseConfig = (): MongooseModuleOptions => ({
  uri: config.get<string>(CONFIG_MONGODB_URI),
});

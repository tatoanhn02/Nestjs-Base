import {Module} from '@nestjs/common';
import {HealthModule} from './modules/health/health.module';
import {EmployeeModule} from './modules/employee/employee.module';
import {MongooseModule} from '@nestjs/mongoose';
import {getMongooseConfig} from './shared/helpers/mongo.helper';

@Module({
  imports: [
    HealthModule,
    EmployeeModule,
    MongooseModule.forRootAsync({useFactory: () => getMongooseConfig()}),
  ],
})
export class AppModule {}

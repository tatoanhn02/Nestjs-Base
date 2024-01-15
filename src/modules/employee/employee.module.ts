import {Module} from '@nestjs/common';
import {EmployeeController} from './employee.controller';
import {EmployeeService} from './employee.service';
import {MongooseModule} from '@nestjs/mongoose';
import {Employee, EmployeeSchema} from './employee.schema';
import {PaginationHeaderHelper} from '../../shared/adapters/pagination/pagination.helper';

@Module({
  imports: [MongooseModule.forFeature([{name: Employee.name, schema: EmployeeSchema}])],
  controllers: [EmployeeController],
  providers: [EmployeeService, PaginationHeaderHelper],
})
export class EmployeeModule {}

import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {Employee} from './employee.schema';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {
  CreateEmployeePayloadDto,
  IndexEmployeePayloadDto,
  UpdateEmployeePayloadDto,
} from './employee.dto';
import {db2api} from '../../shared/helpers/data.helper';
import {PaginationHeaderHelper} from '../../shared/adapters/pagination/pagination.helper';
import {IPagination} from '../../shared/adapters/pagination/pagination.interface';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private employeeModel: Model<Employee>,
    private readonly paginationHeaderHelper: PaginationHeaderHelper,
  ) {}

  async indexEmployee(filters: IndexEmployeePayloadDto, pagination: IPagination) {
    const res = await this.employeeModel.find(filters).sort({_id: -1});

    const count = await this.employeeModel.countDocuments(filters);

    return {
      data: db2api(res),
      metadata: this.paginationHeaderHelper.getMetadata(pagination, count),
    };
  }

  async createEmployee(employeeInput: CreateEmployeePayloadDto) {
    const existEmployee = await this.employeeModel.findOne({
      name: employeeInput.name,
      age: employeeInput.age,
    });
    if (existEmployee) {
      throw new BadRequestException('This employee is exist!');
    }
    const newEmployee = await this.employeeModel.create(employeeInput);
    return newEmployee;
  }

  async updateEmployee(employeeId: string, data: UpdateEmployeePayloadDto) {
    const employee = await this.employeeModel.findById(employeeId);
    if (!employee) {
      throw new NotFoundException(`Employee ${employeeId} doesn't exist!`);
    }

    const employeeUpdated = await this.employeeModel.findOneAndUpdate({_id: employeeId}, {...data});
    return employeeUpdated;
  }

  async readEmployee(employeeId: string) {
    if (!employeeId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException(`EmployeeId ${employeeId} doesn't not valid`);
    }
    const employee = await this.employeeModel.findById(employeeId);
    if (!employee) {
      throw new NotFoundException(`EmployeeId ${employeeId} doesn't exist!`);
    }

    return employee;
  }
}

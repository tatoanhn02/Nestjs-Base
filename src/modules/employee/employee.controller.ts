import {Body, Controller, Get, HttpStatus, Param, Post, Put, Query} from '@nestjs/common';
import {EmployeeService} from './employee.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {EApiTags} from '../../shared/enum';
import {
  CreateEmployeePayloadDto,
  IndexEmployeePayloadDto,
  UpdateEmployeeParamsDto,
  UpdateEmployeePayloadDto,
} from './employee.dto';
import {Pagination} from '../../shared/adapters/pagination/pagination.decorator';
import {IPagination} from '../../shared/adapters/pagination/pagination.interface';

@ApiTags(EApiTags.EMPLOYEE)
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  @ApiOperation({
    operationId: 'indexEmployee',
    description: 'Index employee',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  async indexEmployee(
    @Query() indexEmployeePayloadDto: IndexEmployeePayloadDto,
    @Pagination() pagination: IPagination,
  ) {
    return this.employeeService.indexEmployee(indexEmployeePayloadDto, pagination);
  }

  @Post()
  @ApiOperation({
    operationId: 'createEmployee',
    description: 'Create employee',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful',
  })
  async createEmployee(@Body() employeeInput: CreateEmployeePayloadDto) {
    return this.employeeService.createEmployee(employeeInput);
  }

  @Put(':employeeId')
  @ApiOperation({
    operationId: 'updateEmployee',
    description: 'Update employee',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  async updateEmployee(
    @Param() params: UpdateEmployeeParamsDto,
    @Body() data: UpdateEmployeePayloadDto,
  ) {
    return this.employeeService.updateEmployee(params.employeeId, data);
  }

  @Get(':employeeId')
  @ApiOperation({
    operationId: 'readEmployee',
    description: 'Read employee',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  async readEmployee(@Param() params: UpdateEmployeeParamsDto) {
    return this.employeeService.readEmployee(params.employeeId);
  }
}

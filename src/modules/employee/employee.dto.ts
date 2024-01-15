import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class IndexEmployeePayloadDto {
  @ApiPropertyOptional({
    type: 'string',
    description: ' name',
  })
  name?: string;

  @ApiPropertyOptional({
    type: 'number',
    description: 'age',
  })
  age?: number;

  @ApiPropertyOptional({
    type: 'string',
    description: ' employee code',
  })
  employeeCode?: string;
}

export class CreateEmployeePayloadDto {
  @ApiProperty({
    type: 'string',
    description: 'name',
  })
  name: string;

  @ApiProperty({
    type: 'number',
    description: 'age',
  })
  age: number;

  @ApiProperty({
    type: 'string',
    description: 'employee code',
  })
  employeeCode: string;
}

export class UpdateEmployeeParamsDto {
  @ApiProperty({
    type: 'string',
    description: 'employee id',
  })
  employeeId: string;
}

export class UpdateEmployeePayloadDto {
  @ApiPropertyOptional({
    type: 'string',
    description: 'name',
  })
  name?: string;

  @ApiPropertyOptional({
    type: 'number',
    description: 'age',
  })
  age?: number;
}

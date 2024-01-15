import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema({timestamps: true})
export class Employee {
  @Prop({
    required: true,
    trim: true,
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    type: Number,
  })
  age: number;

  @Prop({
    required: true,
    type: String,
  })
  employeeCode: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

EmployeeSchema.index(
  {
    name: 1,
  },
  {background: true},
);
EmployeeSchema.index(
  {
    age: 1,
  },
  {background: true},
);
EmployeeSchema.index(
  {
    employeeCode: 1,
  },
  {background: true},
);

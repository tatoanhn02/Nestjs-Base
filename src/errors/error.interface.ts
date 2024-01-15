import {HttpStatus} from '@nestjs/common';

export interface IGeneralErrorShape {
  name?: string;
  message: string;
  errorCode?: string;
  description?: string;
  statusCode?: HttpStatus;
  stackTrace?: any;
  logData?: any;
  data?: any;
}

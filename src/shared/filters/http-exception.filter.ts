import {ArgumentsHost, ExceptionFilter} from '@nestjs/common';

import {createGeneralExceptionError} from 'src/errors/errors';

export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const responseError = createGeneralExceptionError(exception);

    response.status(responseError.statusCode).json(responseError);
  }
}

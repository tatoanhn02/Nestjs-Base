import {HttpException} from '@nestjs/common';
import {IGeneralErrorShape} from './error.interface';
import {BaseError} from './base.error';

export function createGeneralExceptionError(error: any): IGeneralErrorShape {
  if (error instanceof HttpException) {
    const errRes = error.getResponse() as Record<string, any>;
    return {
      message: errRes.message || error.message,
      statusCode: error.getStatus(),
      ...(errRes.description && {description: errRes.description}),
      ...(errRes.tackTrace && {stackTrace: errRes.stackTrace}),
      ...(errRes.data && {data: errRes.data}),
      ...(errRes.errors && {errors: errRes.errors}),
    };
  }

  if (error instanceof BaseError) {
    return {
      message: error.message,
      description: error.message,
      statusCode: error.getStatusCode(),
      ...(error.customStack && {stackTrace: error.customStack}),
      ...(error.data && {data: error.data}),
    };
  }

  return {
    statusCode: 500,
    message: error.message,
  };
}

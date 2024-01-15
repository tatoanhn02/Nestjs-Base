import {createPagination} from './pagination.helper';
import {ArgumentsHost, createParamDecorator} from '@nestjs/common';

export const Pagination = createParamDecorator((_, host: ArgumentsHost) => {
  const {
    query: {nextPageToken, page, perPage},
  } = host.switchToHttp().getRequest();
  return createPagination(nextPageToken, page, perPage);
});

import {IPagination, IPaginationHeader, IPaginationMetadata} from './pagination.interface';

export class PaginationHeaderHelper {
  public getHeaders(pagination: IPagination, totalCount: number): IPaginationHeader {
    if (!pagination) {
      return;
    }

    const page = +pagination.page;
    const perPage = +pagination.perPage;
    const pagesCount = Math.ceil(totalCount / perPage);

    return {
      'x-page': page,
      'x-total-count': totalCount,
      'x-pages-count': pagesCount,
      'x-per-page': perPage,
      'x-next-page': page === pagesCount ? page : page + 1,
    };
  }

  public getMetadata(pagination: IPagination, totalCount: number): IPaginationMetadata {
    if (!pagination) {
      return;
    }

    const page = +pagination.page;
    const perPage = +pagination.perPage;
    const pagesCount = Math.ceil(totalCount / perPage);

    return {
      currentPage: page,
      totalCount: totalCount,
      pageCount: pagesCount,
      pageSize: perPage,
      nextPage: page === pagesCount ? page : page + 1,
    };
  }
}

export const createPagination = (
  nextPageToken?: string,
  page?: number,
  perPage?: number,
): IPagination => {
  page = +page || 1;
  perPage = +perPage || 20;

  return {
    nextPageToken,
    page,
    perPage,
  };
};

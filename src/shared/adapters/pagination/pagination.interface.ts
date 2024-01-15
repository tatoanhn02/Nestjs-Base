export interface IPaginationHeader {
  'x-page': number;
  'x-total-count': number;
  'x-pages-count': number;
  'x-per-page': number;
  'x-next-page': number;
}

export interface IPagination {
  nextPageToken?: string;
  page?: number;
  perPage?: number;
}

export interface IPaginationMetadata {
  currentPage: number;
  totalCount: number;
  pageCount: number;
  pageSize: number;
  nextPage: number;
}

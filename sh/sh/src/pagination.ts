export class Pagination {
  total_page: number;
  total_count: number;
  page: number;
  unit: number;

  static of(total: number, page: number, unit: number) {
    return {
      total_page: Math.ceil(total / unit),
      total_count: total,
      page: page,
      unit: unit,
    } as Pagination;
  }
}

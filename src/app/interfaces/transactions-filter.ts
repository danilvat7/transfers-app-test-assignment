export interface ITransactionsFilter {
  search: string;
  sortBy: ISortByItem[];
}

export interface ISortByItem {
  prop: string;
  direction: number;
}

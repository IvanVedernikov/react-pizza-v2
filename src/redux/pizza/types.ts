export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export type PizzaItems = {
  items: Pizza[];
  count: number;
};

export interface PizzaSliceState {
  items: Array<Pizza>;
  status: Status;
  count: number;
  pageCount: number;
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

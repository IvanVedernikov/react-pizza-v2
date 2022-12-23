import { SortItem } from "../../components/Sort";

export interface FilterState {
  searchValue: string;
  categoryId: number;
  sort: SortItem;
  currentPage: number;
}

export enum SortPropertyEnum {
  RATING = "rating",
  PRICE = "price",
  TITLE = "title",
}

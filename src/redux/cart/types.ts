export type CartItem = {
  id: string;
  title: string;
  price: number;
  count: number;
  imageUrl: string;
  type: string;
  size: number;
};
export interface CartSliceState {
  totalPrice: number;
  totalCount: number;
  items: Array<CartItem>;
}

import { CartItem } from "../redux/cart/types";
export const calcTotalCount = (items: CartItem[]) => {
  return items.reduce((summ, item) => {
    return summ + item.count;
  }, 0);
};

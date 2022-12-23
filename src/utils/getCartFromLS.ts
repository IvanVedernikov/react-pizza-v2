import { calcTotalCount } from "./calcTotalCount";
import { calcTotalPrice } from "./calcTotalPrice";
export const getCartFromLS = () => {
  const data = localStorage.getItem("cartItems");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);
  const totalCount = calcTotalCount(items);

  if (items.length) {
    return {
      items,
      totalPrice,
      totalCount,
    };
  } else {
    return {
      items: [],
      totalPrice: 0,
      totalCount: 0,
    };
  }
};

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategoryId } from "../redux/slices/cartSlice";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";

const Categories: React.FC = () => {
  const value = useSelector(selectCategoryId);
  const dispatch = useDispatch();
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => {
          return (
            <li
              key={i}
              className={value === i ? "active" : ""}
              onClick={() => {
                dispatch(setCategoryId(i));
                dispatch(setCurrentPage(1));
              }}
            >
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;

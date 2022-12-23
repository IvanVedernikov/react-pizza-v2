import React from "react";

interface CategoriesProps {
  value: number;
  onChangeCategory: (i: number) => void;
}

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onChangeCategory }) => {
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
                  onChangeCategory(i);
                }}
              >
                {categoryName}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);

export default Categories;

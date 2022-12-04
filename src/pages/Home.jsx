import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
    order: "desc",
  });
  useEffect(() => {
    setIsLoading(true);
    const sortBy = sortType.sortProperty;
    const order = sortType.order;
    const category = categoryId > 0 ? `category=${categoryId}` : "";

    fetch(
      `https://638bb8ec7220b45d2295a761.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            value={categoryId}
            onChangeCategory={(id) => setCategoryId(id)}
          />
          <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(6)].map((_, index) => (
                <PizzaBlockSkeleton key={index} />
              ))
            : items.map((object) =>
                isLoading ? (
                  <PizzaBlockSkeleton />
                ) : (
                  <PizzaBlock key={object.id} {...object} />
                )
              )}
        </div>
      </div>
    </>
  );
};

export default Home;

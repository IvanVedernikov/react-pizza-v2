import React, { useContext, useEffect, useRef, useState } from "react";
import qs from "qs";
import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
import Pagination from "../components/Pagination/Pagination";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setFilters, setPageCount } from "../redux/slices/filterSlice";

const Home = () => {
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filters
  );

  // если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.slice(1));

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  const fetchPizza = () => {
    setIsLoading(true);
    const sortBy = sort.sortProperty;
    const order = sort.order;
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    // получаем данные через axios
    axios
      .get(
        `https://638bb8ec7220b45d2295a761.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data.items);
        dispatch(setPageCount(Math.ceil(res.data.count / 4)));
        setIsLoading(false);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizza();
    }

    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  // если изменили параметры и был первый рендер, то
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        order: sort.order,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, sort.order, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => (
    <PizzaBlockSkeleton key={index} />
  ));

  const pizzas = items.map((object) =>
    isLoading ? (
      <PizzaBlockSkeleton />
    ) : (
      <PizzaBlock key={object.id} {...object} />
    )
  );
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
        <Pagination />
      </div>
    </>
  );
};

export default Home;

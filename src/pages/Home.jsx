import React, { useEffect, useRef } from "react";
import qs from "qs";
import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
import Pagination from "../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { selectFilters, selectPizza } from "../redux/slices/cartSlice";

const Home = () => {
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilters);

  const { items, status } = useSelector(selectPizza);

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
  });

  const getPizzas = async () => {
    const sortBy = sort.sortProperty;
    const order = sort.order;
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
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
  const pizzas = items.map((object) => (
    <Link key={object.id} to={`/pizza/${object.id}`}>
      {" "}
      <PizzaBlock {...object} />
    </Link>
  ));
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === "error" ? (
          <div className="content__error-info">
            <h2>
              Произошла ошибка <icon>😕</icon>
            </h2>
            <p>
              К сожелению, не удалось получить питцы. Попробуйте повторить
              попытку позже.
            </p>
          </div>
        ) : (
          <div className="content__items">
            {status === "loading" ? skeletons : pizzas}
          </div>
        )}
        <Pagination />
      </div>
    </>
  );
};

export default Home;

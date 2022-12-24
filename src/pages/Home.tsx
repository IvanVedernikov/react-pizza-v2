import React, { useEffect, useRef } from "react";
import qs from "qs";
import {
  Categories,
  PizzaBlockSkeleton,
  PizzaBlock,
  Sort,
  Pagination,
} from "../components";
import { sortList } from "../components/Sort";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/filter/slice";
import { Pizza, SearchPizzaParams } from "../redux/pizza/types";
import { selectFilters } from "../redux/filter/selectors";
import { useAppDispatch } from "../redux/store";
import { selectPizza } from "../redux/pizza/selectors";
import { fetchPizzas } from "../redux/pizza/asyncActions";

const Home: React.FC = () => {
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilters);

  const { items, status } = useSelector(selectPizza);

  const onChangeCategory = React.useCallback((i: number) => {
    dispatch(setCategoryId(i));
    dispatch(setCurrentPage(1));
    // eslint-disable-next-line
  }, []);

  // import("../utils/math").then((math) => {
  //   console.log(math.add(16, 26));
  // });

  // если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.slice(1)
      ) as unknown as SearchPizzaParams;

      const sort = sortList.find(
        (sortitem) => sortitem.sortProperty === params.sortBy
      );
      if (sort) {
        params.sortBy = sort.sortProperty;
        dispatch(
          setFilters({
            searchValue: params.search,
            categoryId: Number(params.category),
            currentPage: Number(params.currentPage),
            sort: sort,
          })
        );
        isSearch.current = true;
      }
    }
  });

  const getPizzas = async () => {
    const sortBy = sort.sortProperty;
    const order = sort.order;
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      //@ts-ignore
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      } as SearchPizzaParams)
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sort, currentPage, searchValue]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sort.sortProperty, sort.order, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => (
    <PizzaBlockSkeleton key={index} />
  ));

  const pizzas = items.map((item: Pizza) => (
    <Link key={item.id} to={`/pizza/${item.id}`}>
      <PizzaBlock {...item} />
    </Link>
  ));

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <Sort value={sort} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === "error" ? (
          <div className="content__error-info">
            <h2>
              Произошла ошибка <span>😕</span>
            </h2>
            <p>
              К сожалению, не удалось получить данные. Попробуйте повторить
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

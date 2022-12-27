import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loadable from "react-loadable";
import "./App.css";
import "./scss/app.scss";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";

// const Cart = React.lazy(
//   () => import(/*webpackChunkName: "Cart" */ "./pages/Cart")
// );

const Cart = Loadable({
  loader: () => import(/*webpackChunkName: "Cart" */ "./pages/Cart"),
  loading: () => <div>Идет загрузка корзины...</div>,
});

const Order = Loadable({
  loader: () => import(/*webpackChunkName: "Order" */ "./pages/Order"),
  loading: () => <div>Идет загрузка корзины...</div>,
});

const FullPizza = React.lazy(
  () => import(/*webpackChunkName: "FullPizza" */ "./pages/FullPizza")
);

const NotFound = React.lazy(
  () =>
    import(
      /*webpackChunkName: "NotFoundBlock" */ "./components/NotFoundBlock/NotFoundBlock"
    )
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<div>Идет загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/Order"
          element={
            <Suspense fallback={<div>Идет загрузка заказа...</div>}>
              <Order />
            </Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense
              fallback={<div>Идет загрузка подробной страницы товара...</div>}
            >
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Идет загрузка страницы...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { selectFilters, selectPizza } from "../../redux/slices/cartSlice";
import { setCurrentPage } from "../../redux/slices/filterSlice";
import styles from "./Pagination.module.scss";
const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector(selectFilters);
  const { pageCount } = useSelector(selectPizza);
  return (
    pageCount > 1 && (
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        forcePage={currentPage - 1}
      />
    )
  );
};

export default Pagination;

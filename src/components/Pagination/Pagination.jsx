import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/slices/filterSlice";
import styles from "./Pagination.module.scss";
const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage, pageCount } = useSelector((state) => state.filters);
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

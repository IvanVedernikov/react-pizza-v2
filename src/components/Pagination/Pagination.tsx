import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { selectFilters } from "../../redux/filter/selectors";
import { setCurrentPage } from "../../redux/filter/slice";
import { selectPizza } from "../../redux/pizza/selectors";
import styles from "./Pagination.module.scss";
const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector(selectFilters);
  const { pageCount } = useSelector(selectPizza);
  return pageCount > 1 ? (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={pageCount}
      previousLabel="<"
      forcePage={currentPage - 1}
    />
  ) : null;
};

export default Pagination;

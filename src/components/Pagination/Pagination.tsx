import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      previousLabel="← Previous"
      nextLabel="Next →"
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName={css.pagination}
      previousLinkClassName={css.pageLink}
      nextLinkClassName={css.pageLink}
      disabledClassName={css.disabled}
      activeClassName={css.active}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
    />
  );
};

export default Pagination;

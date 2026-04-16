import { type ComponentType } from "react";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import css from "./Pagination.module.css";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      previousLabel="← Previous"
      nextLabel="Next →"
      pageCount={pageCount}
      forcePage={currentPage - 1}
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

import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {
  const handlePageClick = (page: number) => {
    onPageChange({ selected: page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pages = Array.from({ length: pageCount }, (_, i) => i);

  return (
    <div className={css.pagination}>
      <button
        className={css.pageLink}
        onClick={() => handlePageClick(0)}
        disabled={false}
      >
        «
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={css.pageLink}
          onClick={() => handlePageClick(page)}
        >
          {page + 1}
        </button>
      ))}

      <button
        className={css.pageLink}
        onClick={() => handlePageClick(pageCount - 1)}
        disabled={false}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;

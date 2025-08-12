import PropTypes from 'prop-types';
import './pageControl.css'; 

const PaginationControls = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage + 1 >= totalPages;

  return (
    <div className="page-controls">
      <button
        onClick={() => onPageChange('prev')}
        className="page-btn"
        disabled={isFirstPage}
        aria-label="Previous page"
      >
        Previous Page
      </button>

      <span className="page-indicator">
        Page {currentPage + 1} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange('next')}
        className="page-btn"
        disabled={isLastPage}
        aria-label="Next page"
      >
        Next Page
      </button>
    </div>
  );
};

PaginationControls.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default PaginationControls;
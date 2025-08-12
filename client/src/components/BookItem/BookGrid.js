import PropTypes from 'prop-types';
import BookDetail from './BookDetail';
import './BookGridEdit.css'; 

const BookGrid = ({ books, onBookSelect }) => {
  if (!books || books.length === 0) {
    return (
      <p className="no-results">
        No books found. Try a different search.
      </p>
    );
  }

  return (
    <div className="books-container">
      {books.map((book) => (
        <div className="book-card">
          <BookDetail book={book} />
          <div className="book-actions">
            <button 
              onClick={() => onBookSelect(book)} 
              className="toggle-details-btn"
            >
              Show Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

BookGrid.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBookSelect: PropTypes.func.isRequired
};

export default BookGrid;
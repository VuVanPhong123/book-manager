import PropTypes from 'prop-types';
import BookDetail from './BookDetail';
import './BookGrid.css'; 

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
        <div key={book.asin || book.id} className="book-card">
          <BookDetail book={book} />
          <button 
            onClick={() => onBookSelect(book)} 
            className="toggle-details-btn"
            aria-label={`Show details for ${book.title}`}
          >
            Show Details
          </button>
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
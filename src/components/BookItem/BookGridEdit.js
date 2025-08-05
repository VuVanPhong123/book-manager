import PropTypes from 'prop-types';
import BookDetail from './BookDetail';
import './BookGridEdit.css';

const BookGrid = ({ books, onBookSelect, onDeleteBook, onEditBook }) => {
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
          <div className="book-actions">
            <button 
              onClick={() => onBookSelect(book)} 
              className="toggle-details-btn"
              aria-label={`Show details for ${book.title}`}
            >
              Show Details
            </button>
            <button 
                onClick={() => onEditBook(book)}
                className="edit-btn"
                aria-label={`Edit ${book.title}`}
              >
                Edit
              </button>
              <button 
                onClick={() => onDeleteBook(book)}
                className="delete-btn"
                aria-label={`Delete ${book.title}`}
              >
                Delete
              </button>
          </div>
        </div>
      ))}
    </div>
  );
};

BookGrid.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBookSelect: PropTypes.func.isRequired,
  onDeleteBook: PropTypes.func.isRequired,
  onEditBook: PropTypes.func.isRequired
};

export default BookGrid;
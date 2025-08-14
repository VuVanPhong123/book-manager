import PropTypes from 'prop-types';
import BookSpecificDetail from './BookSpecificDetail'; 
import './BookPopUp.css'; 

const BookPopup = ({ book, onClose}) => {
  if (!book) return null;

  return (
    <div className="book-popup-overlay">
      <div className="book-popup">
        <div className="popup-header">
          <h3>Book Details</h3>
          <button 
            onClick={onClose} 
            className="close-popup-btn"
          >
            x
          </button>
        </div>
        <div className="popup-content">
          <BookSpecificDetail book={book} />
        </div>

      </div>
    </div>
  );
};

BookPopup.propTypes = {
  book: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default BookPopup;

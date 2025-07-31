import { useState, useEffect } from 'react';
import BookDetail from '../../components/BookItem/BookDetail';
import BookSpecificDetail from '../../components/BookItem/BookSpecificDetail';
import books from '../../data/Amazon_popular_books_dataset.json';
import './BookList.css';

const BookList = () => {
  const [pageNum, setPageNum] = useState(0);
  const booksPerPage = 12;
  const currentBooks = books.slice(pageNum, pageNum + booksPerPage);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pageNum]);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setShowPopup(true);
    document.body.style.overflow = 'hidden'; 
  };

  const closePopup = () => {
    setShowPopup(false);
    document.body.style.overflow = 'auto'; 
  };

  const handlePageChange = (direction) => {
    const newPageNum = direction === 'next' ? pageNum + booksPerPage : pageNum - booksPerPage;
    setPageNum(newPageNum);
  };

  return (
    <div className="book-list-page">
      <h1 className="page-title">Most Popular Books</h1>
      
      <div className="books-container">
        {currentBooks.map((book, index) => (
          <div key={`${book.id || index}-${pageNum}`} className="book-card">
            <BookDetail className='book-detail' book={book} />
            <button 
              onClick={() => handleBookSelect(book)}
              className="toggle-details-btn"
            >
              Show Details
            </button>
          </div>
        ))}
      </div>

      {/* Popup for book details */}
      {showPopup && (
        <div className="book-popup-overlay">
          <div className="book-popup">
            <div className="popup-header">
              <h3>Book Details</h3>
              <button onClick={closePopup} className="close-popup-btn">
                x
              </button>
            </div>
            <div className="popup-content">
              {selectedBook && <BookSpecificDetail book={selectedBook} />}
            </div>
          </div>
        </div>
      )}

      <div className="pagination-controls">
        <button onClick={() => handlePageChange('prev')}  className="pagination-btn" disabled={pageNum === 0}>
          previous page
        </button>
        
        <span className="page-indicator">
          Page {Math.floor(pageNum/booksPerPage)+1} of {Math.ceil(books.length/booksPerPage)}
        </span>
        
        <button onClick={() => handlePageChange('next')} className="pagination-btn" disabled={pageNum + booksPerPage >= books.length}>
          Next page
        </button>
      </div>
    </div>
  );
};

export default BookList;
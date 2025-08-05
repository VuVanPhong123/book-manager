import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookPopUp from '../../components/BookItem/BookPopUp';
import PaginationControls from '../../components/BookItem/pageControl';
import BookGrid from '../../components/BookItem/BookGrid'; // Import the BookGrid component
import books from '../../data/Amazon_popular_books_dataset.json';
import './BookFinding.css';

const BookFinding = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  
  const pageNum = parseInt(searchParams.get('page')) || 0;
  const booksPerPage = 12;
  const currentBooks = filteredBooks.slice(
    pageNum * booksPerPage,
    (pageNum + 1) * booksPerPage
  );

  useEffect(() => {
    const results = books.filter(book => {
      const title = book.title ? book.title.toLowerCase() : '';
      const author = book.brand ? book.brand.toLowerCase() : '';
      const search = inputValue.toLowerCase().trim();
      return title.includes(search) || author.includes(search);
    });
    setFilteredBooks(results);
  }, [inputValue, setSearchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search?.value || inputValue;
    setInputValue(searchValue);
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setShowPopup(true);
  };

  const closePopup = () => setShowPopup(false);

  const handlePageChange = (direction) => {
    const newPage = direction === 'next' ? pageNum + 1 : pageNum - 1;
    setSearchParams({ page: newPage });
    window.scrollTo({ top: 0 });
  };

  const emptyMessage = inputValue 
    ? `No books found for "${inputValue}"`
    : 'Enter a search term to find books';

  return (
    <div className="book-finding-page">
      <h1 className="page-title">Finding Book</h1>
      
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          name="search"
          placeholder="Search by title or author..."
          className="search-input"
          defaultValue={inputValue} 
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
      <BookGrid
        books={currentBooks}
        onBookSelect={handleBookSelect}
      />
      {currentBooks.length === 0 && (
        <p>{emptyMessage}</p>
      )}

      {filteredBooks.length > booksPerPage && (
        <PaginationControls
          currentPage={pageNum}
          totalItems={filteredBooks.length}
          itemsPerPage={booksPerPage}
          onPageChange={handlePageChange}
        />
      )}

      {showPopup && (
        <BookPopUp 
          book={selectedBook} 
          onClose={closePopup} 
        />
      )}
    </div>
  );
};

export default BookFinding;
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookGrid from '../../components/BookItem/BookGrid';
import BookPopUp from '../../components/BookItem/BookPopUp';
import PaginationControls from '../../components/BookItem/pageControl';
import './BookList.css';
import { API_URL } from  '../../config';
const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNum = parseInt(searchParams.get('page')) || 0;
  const booksPerPage = 12;
  const currentBooks = books.slice(pageNum * booksPerPage, (pageNum + 1) * booksPerPage);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/books`)
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error(err));
  }, []);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handlePageChange = (direction) => {
    if (direction === 'next')
      setSearchParams({ page: pageNum + 1 })
    else
      setSearchParams({ page: pageNum - 1 })
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="book-list-page">
      <h1 className="page-title">Most Popular Books</h1>

      <BookGrid
        books={currentBooks}
        onBookSelect={handleBookSelect}
      />

      {showPopup && (
        <BookPopUp
          book={selectedBook}
          onClose={closePopup}
        />
      )}

      <PaginationControls
        currentPage={pageNum}
        totalItems={books.length}
        itemsPerPage={booksPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BookList;

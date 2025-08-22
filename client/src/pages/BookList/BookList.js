import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookGrid from '../../components/BookItem/BookGrid';
import BookPopUp from '../../components/BookItem/BookPopUp';
import PaginationControls from '../../components/BookItem/pageControl';
import './BookList.css';
import { API_URL } from '../../config';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageNum = parseInt(searchParams.get('page')) || 1; // page tính từ 1
  const booksPerPage = 12;
  const [totalBooks, setTotalBooks] = useState(0);

  const [selectedBook, setSelectedBook] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let ignore = false;

    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/books?page=${pageNum}&limit=${booksPerPage}`);
        if (!res.ok) throw new Error('Failed to fetch books');
        const data = await res.json();

        if (!ignore) {
          setBooks(data.books || []);
          setTotalBooks(data.total || 0);
          setError(null);
        }
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchBooks();
    return () => { ignore = true; };
  }, [pageNum]);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setShowPopup(true);
  };

  const closePopup = () => setShowPopup(false);

  const handlePageChange = (direction) => {
    const nextPage = direction === 'next' ? pageNum + 1 : pageNum - 1;
    setSearchParams({ page: nextPage });
    window.scrollTo({ top: 0 });
  };

   return (
    <div className="book-list-page">
      <h1 className="page-title">Most Popular Books</h1>
      {error && <p className="error">Lỗi: {error}</p>}

      {!loading && !error && (
        <>
          <BookGrid books={books} onBookSelect={handleBookSelect} />

          {showPopup && <BookPopUp book={selectedBook} onClose={closePopup} />}

          <PaginationControls
            currentPage={pageNum}
            totalItems={totalBooks}
            itemsPerPage={booksPerPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default BookList;

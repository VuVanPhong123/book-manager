import { useState} from 'react';
import { useSearchParams } from 'react-router-dom';
import BookGrid from '../../components/BookItem/BookGrid';
import BookPopUp from '../../components/BookItem/BookPopUp';
import PaginationControls from '../../components/BookItem/pageControl';
import books from '../../data/Amazon_popular_books_dataset.json';
import './BookList.css';

const BookList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNum = parseInt(searchParams.get('page')) || 0;
  const booksPerPage = 12;
  const currentBooks = books.slice(pageNum * booksPerPage, (pageNum + 1)*booksPerPage);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handlePageChange = (direction) => {
    if(direction === 'next')
      setSearchParams({ page: pageNum+1 })
    else setSearchParams({ page: pageNum-1})
    window.scrollTo({ top: 0});
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
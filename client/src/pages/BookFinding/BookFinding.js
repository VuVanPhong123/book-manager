import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookPopUp from '../../components/BookItem/BookPopUp';
import PaginationControls from '../../components/BookItem/pageControl';
import BookGrid from '../../components/BookItem/BookGrid'; 
import categories from '../../data/Category.json';
import CategoryFilter from '../../components/BookItem/CategoryFilter';
import './BookFinding.css';
import { API_URL } from  '../../config';

const BookFinding = () => {
  const [books, setBooks] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [click, setClick] = useState(false);

  const pageNum = parseInt(searchParams.get('page')) || 0;
  const booksPerPage = 12;
  const currentBooks = filteredBooks.slice(
    pageNum * booksPerPage,
    (pageNum + 1) * booksPerPage
  );

  const selectedCategoriesRef = useRef(selectedCategories);

  useEffect(() => {
    selectedCategoriesRef.current = selectedCategories;
  }, [selectedCategories]);

  useEffect(() => {
    fetch(`${API_URL}/books`)
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const results = books.filter(book => {
      const searchTerm = inputValue.toLowerCase().trim();
      const titleMatch = book.title?.toLowerCase().includes(searchTerm) ?? false;
      const authorMatch = book.brand?.toLowerCase().includes(searchTerm) ?? false;
      
      let categoryMatch = selectedCategoriesRef.current.length === 0;
      
      if (!categoryMatch && book.categories) {
        const categoryPaths = Array.isArray(book.categories) ? book.categories : [];
        
        categoryMatch = categoryPaths.some(cat => {
          try {
            const path = Array.isArray(cat) 
              ? cat.join(' / ') 
              : String(cat || '');
            return selectedCategoriesRef.current.some(selectedCat => 
              path.toLowerCase().includes(selectedCat.toLowerCase())
            );
          } catch {
            return false;
          }
        });
      }

      return (titleMatch || authorMatch) && categoryMatch;
    });

    setFilteredBooks(results);
  }, [inputValue, click, books]); 

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search?.value || '';
    setInputValue(searchValue);
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setShowPopup(true);
  };

  const clickCheck = () => setClick(prev => !prev);

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
          placeholder="Search by author's name or title"
          className="search-input"
          defaultValue={inputValue} 
        />
        <button onClick={clickCheck} type="submit" className="search-btn">
          Search
        </button>
      </form>

      {books.length > 0 && (
        <CategoryFilter 
          categories={categories}
          selectedCategories={selectedCategories}
          onToggleCategory={toggleCategory}
          books={books}
        />
      )}

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

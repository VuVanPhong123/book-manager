import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookPopUp from '../../components/BookItem/BookPopUp';
import PaginationControls from '../../components/BookItem/pageControl';
import BookGrid from '../../components/BookItem/BookGrid'; 
import categories from '../../data/Category.json';
import CategoryFilter from '../../components/BookItem/CategoryFilter';
import './BookFinding.css';
import { API_URL } from '../../config';

const BookFinding = () => {
  const [books, setBooks] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  // State dùng để thực sự tìm kiếm
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategories, setSearchCategories] = useState([]);

  const [selectedBook, setSelectedBook] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const pageNum = parseInt(searchParams.get('page')) || 1;
  const booksPerPage = 12;

  // Fetch khi searchQuery / searchCategories / pageNum thay đổi
  useEffect(() => {
    const fetchBooks = () => {
      const params = new URLSearchParams();
      params.append('page', pageNum);
      params.append('limit', booksPerPage);
      if (searchQuery) params.append('search', searchQuery);
      searchCategories.forEach(cat => params.append('categories', cat));

      fetch(`${API_URL}/books/search?${params.toString()}`)
        .then(res => res.json())
        .then(data => {
          setBooks(Array.isArray(data.books) ? data.books : []);
          setTotalPages(data.totalPages || 1);
        })
        .catch(err => console.error(err));
    };

    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, searchCategories, pageNum]);

  // Khi bấm nút Search
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
    setSearchCategories(selectedCategories);
    setSearchParams({ page: 1 }); // reset page về 1
  };

  // Toggle category nhưng không tự tìm, chỉ cập nhật state tạm
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

  const closePopup = () => setShowPopup(false);

  const handlePageChange = (direction) => {
    let newPage = pageNum;
    if (direction === 'next' && pageNum < totalPages) newPage++;
    else if (direction === 'prev' && pageNum > 1) newPage--;
    setSearchParams({ page: newPage });
    window.scrollTo({ top: 0 });
  };

  const emptyMessage = searchQuery || searchCategories.length > 0
    ? 'No books found for your search/filter'
    : 'Enter a search term to find books';

  return (
    <div className="book-finding-page">
      <h1 className="page-title">Finding Book</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          name="search"
          placeholder="Search by author's name or title"
          className="search-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="search-btn">Search</button>
      </form>

      {/* Category Filter */}
      <CategoryFilter 
        categories={categories}
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
      />

      {/* Book Grid */}
      <BookGrid
        books={books}
        onBookSelect={handleBookSelect}
      />

      {/* Empty message */}
      {books.length === 0 && <p>{emptyMessage}</p>}

      {/* Pagination */}
      {totalPages > 1 && (
        <PaginationControls
          currentPage={pageNum}
          totalItems={totalPages * booksPerPage}
          itemsPerPage={booksPerPage}
          onPageChange={handlePageChange}
        />
      )}

      {/* Book Popup */}
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

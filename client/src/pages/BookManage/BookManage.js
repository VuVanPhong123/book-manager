import { useState, useEffect, useCallback } from 'react'; // <-- Thêm useCallback
import { useSearchParams, useNavigate } from 'react-router-dom';
import BookPopUp from '../../components/BookItem/BookPopUp';
import PaginationControls from '../../components/BookItem/pageControl';
import BookGridEdit from '../../components/BookItem/BookGridEdit'; 
import categories from '../../data/Category.json';
import CategoryFilter from '../../components/BookItem/CategoryFilter';
import EditBookPopup from '../../components/BookItem/EditBookPopUp';
import './BookManage.css';
import { API_URL } from '../../config';

const BookManage = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategories, setSearchCategories] = useState([]);

  const [selectedBook, setSelectedBook] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const [editingBook, setEditingBook] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  const [totalPages, setTotalPages] = useState(1);
  const [currentBooks, setCurrentBooks] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const pageNum = parseInt(searchParams.get('page')) || 1;
  const booksPerPage = 12;

  const getAuthHeaders = () => {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  };

  // Sử dụng useCallback để memoize fetchBooks
  const fetchBooks = useCallback(async () => {
    const params = new URLSearchParams();
    params.append('page', pageNum);
    params.append('limit', booksPerPage);
    if (searchQuery) params.append('search', searchQuery);
    searchCategories.forEach(cat => params.append('categories', cat));

    try {
      const res = await fetch(`${API_URL}/books/search?${params.toString()}`);
      const data = await res.json();
      const booksArray = Array.isArray(data.books) ? data.books : [];
      setCurrentBooks(booksArray);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
    }
  }, [pageNum, searchQuery, searchCategories]); // <-- Thêm dependencies

  useEffect(() => {
    if (localStorage.getItem('check') === 'true') {
      fetchBooks();
    }
  }, [fetchBooks, searchQuery, searchCategories, pageNum]); // <-- Thêm fetchBooks vào dependencies

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
    setSearchCategories(selectedCategories);
    setSearchParams({ page: 1 });
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleAddBook = () => {
    setEditingBook({});
    setShowEdit(true);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setShowEdit(true);
  };

  const handleSaveEdit = async (bookData) => {
    const isNew = !bookData.asin;
    if (!isNew && editingBook && JSON.stringify(editingBook) === JSON.stringify(bookData)) {
      setShowEdit(false);
      return;
    }

    const url = `${API_URL}/books${isNew ? '' : '/' + encodeURIComponent(bookData.asin)}`;

    try {
      const res = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(bookData)
      });

      if (!res.ok) throw new Error(isNew ? 'Failed to add book' : 'Failed to update book');
      await res.json();

      alert(`Book ${isNew ? 'added' : 'updated'} successfully!`);
      setShowEdit(false);
      fetchBooks(); // <-- Sử dụng fetchBooks đã được memoized
    } catch (err) {
      console.error(err);
      alert(err.message);
      if (err.message.includes('Unauthorized')) handleLogout();
    }
  };

  const handleDeleteBook = async (book) => {
    if (!window.confirm(`Are you sure you want to delete "${book.title}"?`)) return;

    try {
      const res = await fetch(`${API_URL}/books/${encodeURIComponent(book.asin)}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (!res.ok) throw new Error('Failed to delete book');
      await res.json();

      alert('Book deleted successfully!');
      fetchBooks(); // <-- Sử dụng fetchBooks đã được memoized
    } catch (err) {
      console.error(err);
      alert(err.message);
      if (err.message.includes('Unauthorized')) handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
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

  if (localStorage.getItem('check') !== 'true') {
    return (
      <div className='notification'>
        <div className='notification-message'>
          You're not allowed to access this page
        </div>
        <button onClick={() => navigate('/logIn')}>
          Please login to continue
        </button>
      </div>
    );
  }

  return (
    <div className="book-manage-page">
      <h1 className="page-title">Book Managing</h1>

      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          name="search"
          placeholder="Search by author's name or title"
          className="search-input"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button type="submit" className="search-btn">Search</button>
        <button type="button" className="search-btn" onClick={handleAddBook}>Add Book</button>
      </form>

      <CategoryFilter
        categories={categories}
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
      />

      <BookGridEdit
        books={currentBooks}
        onBookSelect={handleBookSelect}
        onEditBook={handleEditBook}
        onDeleteBook={handleDeleteBook}
      />

      {showEdit && (
        <EditBookPopup
          book={editingBook}
          onClose={() => setShowEdit(false)}
          onSave={handleSaveEdit}
        />
      )}

      {currentBooks.length === 0 && <p>{emptyMessage}</p>}

      {totalPages > 1 && (
        <PaginationControls
          currentPage={pageNum}
          totalItems={totalPages * booksPerPage}
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

export default BookManage;
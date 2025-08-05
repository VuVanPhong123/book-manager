import { useState, useEffect} from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import BookPopUp from '../../components/BookItem/BookPopUp';
import PaginationControls from '../../components/BookItem/pageControl';
import BookGridEdit from '../../components/BookItem/BookGridEdit'; 
import books from '../../data/Amazon_popular_books_dataset.json';
import categories from '../../data/Category.json';
import CategoryFilter from '../../components/BookItem/CategoryFilter';
import EditBookPopup from '../../components/BookItem/EditBookPopUp';
import './BookManage.css';

const BookManage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([])
  const [click, setClick] = useState(false)
  const navigate = useNavigate();
  const [editingBook, setEditingBook] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  const pageNum = parseInt(searchParams.get('page')) || 0;
  const booksPerPage = 12;
  const currentBooks = filteredBooks.slice(
    pageNum * booksPerPage,
    (pageNum + 1) * booksPerPage
  );

  useEffect(() => {
  const results = books.filter(book => {

    const searchTerm = inputValue.toLowerCase().trim();
    const titleMatch = book.title?.toLowerCase().includes(searchTerm) ?? false;
    const authorMatch = book.brand?.toLowerCase().includes(searchTerm) ?? false;
    
    let categoryMatch = selectedCategories.length === 0;
    
    if (!categoryMatch && book.categories) {
      const categoryPaths = Array.isArray(book.categories) ? book.categories : [];
      
      categoryMatch = categoryPaths.some(cat => {
        try {
          const path = Array.isArray(cat) 
            ? cat.join(' / ') 
            : String(cat || '');
          return selectedCategories.some(selectedCat => 
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
}, [inputValue,click, setSearchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search?.value || '';
    setInputValue(searchValue);
  };
  
  const noti = () => {
    navigate('/logIn');
  }
  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleDeleteBook = (bookToDelete) => {
    if (window.confirm(`Are you sure you want to delete "${bookToDelete.title}"?`)) {
      setFilteredBooks(prevBooks => 
        prevBooks.filter(book => book.asin !== bookToDelete.asin)
      );
    }
  };

  const handleEditBook = (bookToEdit) => {
    setEditingBook(bookToEdit);
    setShowEdit(true);
  };

  const handleSaveEdit = (updatedBook) => {
    setFilteredBooks(prevBooks =>
      prevBooks.map(book =>
        book.asin === updatedBook.asin ? updatedBook : book
      )
    );
    setShowEdit(false);
  };


  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setShowPopup(true);
  };
  const clickCheck =()=>{
    if (click===false)
      setClick(true);
    else setClick(false);
  }
  const closePopup = () => setShowPopup(false);

  const handlePageChange = (direction) => {
    const newPage = direction === 'next' ? pageNum + 1 : pageNum - 1;
    setSearchParams({ page: newPage });
    window.scrollTo({ top: 0 });
  };

  const emptyMessage = inputValue 
    ? `No books found for "${inputValue}"`
    : 'Enter a search term to find books';
  if (localStorage.getItem('check')==='true')
    return (
        <div className="book-finding-page">
        <h1 className="page-title">Book managing</h1>
        
        <form onSubmit={handleSearch} className="search-bar">
            <input
            type="text"
            name="search"
            placeholder = "Search by author's name or title"
            className="search-input"
            defaultValue={inputValue} 
            />
            <button onClick={clickCheck} type="submit" className="search-btn">
            Search
            </button>
        </form>
        <CategoryFilter 
            categories={categories} 
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            books={books}  
        />
        <BookGridEdit
            books={currentBooks}
            onBookSelect={handleBookSelect}
            onDeleteBook={handleDeleteBook}
            onEditBook={handleEditBook}
        />

        {showEdit && (
            <EditBookPopup
                book={editingBook}
                onClose={() => setShowEdit(false)}
                onSave={handleSaveEdit}
            />
            )}
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
    )
    else return(
        <div className='notification'>
            <div className='notification-message'>
                You're not allowed to access this page
            </div>
            <button onClick={noti}>
                Please login to continue
            </button>
        </div>
    )
};

export default BookManage;
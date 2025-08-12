import PropTypes from 'prop-types';
import './CategoryFilter.css';

const CategoryFilter = ({ 
  categories = [], 
  selectedCategories = [], 
  onToggleCategory = () => {},
  books = [] 
}) => {
  const getCategoryCount = (category) => {
    return books.filter(book => {
      try {
        const bookCategories = Array.isArray(book?.categories) ? book.categories : [];
        return bookCategories.some(cat => {
          const path = Array.isArray(cat) 
            ? cat.join(' / ') 
            : String(cat || '');
          return path.toLowerCase().includes(category.toLowerCase());
        });
      } catch {
        return false;
      }
    }).length;
  };

  const availableCategories = categories.filter(cat => 
    getCategoryCount(cat) > 0
  );

  return (
    <div className="category-filter">
      <h3>Filter by Category ({selectedCategories.length} selected)</h3>
      <div className="category-grid">
        {availableCategories.map(category => {
          const count = getCategoryCount(category);
          return (
            <button
              key={category}
              type="button"
              className={`category-box ${selectedCategories.includes(category) ? 'selected' : ''}`}
              onClick={() => onToggleCategory(category)}
              title={`${count} books`}
            >
              {category} ({count})
            </button>
          );
        })}
      </div>
    </div>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  selectedCategories: PropTypes.arrayOf(PropTypes.string),
  onToggleCategory: PropTypes.func,
  books: PropTypes.array
};

CategoryFilter.defaultProps = {
  categories: [],
  selectedCategories: [],
  onToggleCategory: () => {},
  books: []
};

export default CategoryFilter;
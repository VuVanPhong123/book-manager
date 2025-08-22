import PropTypes from 'prop-types';
import './CategoryFilter.css';

const CategoryFilter = ({ 
  categories = [], 
  selectedCategories = [], 
  onToggleCategory = () => {}
}) => {
  return (
    <div className="category-filter">
      <h3>Filter by Category ({selectedCategories.length} selected)</h3>
      <div className="category-grid">
        {categories.map(category => (
          <button
            key={category}
            type="button"
            className={`category-box ${selectedCategories.includes(category) ? 'selected' : ''}`}
            onClick={() => onToggleCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  selectedCategories: PropTypes.arrayOf(PropTypes.string),
  onToggleCategory: PropTypes.func
};

CategoryFilter.defaultProps = {
  categories: [],
  selectedCategories: [],
  onToggleCategory: () => {}
};

export default CategoryFilter;

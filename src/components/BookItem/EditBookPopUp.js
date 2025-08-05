import './BookPopUp.css';
import { useState } from 'react';

const EditBookPopup = ({ book, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: book.title,
    brand: book.brand,
    description: book.description || '',
    categories: Array.isArray(book.categories) ? [...book.categories] : [book.categories || '']
  });

  const [newCategory, setNewCategory] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (index, value) => {
    const updatedCategories = [...formData.categories];
    updatedCategories[index] = value;
    setFormData(prev => ({
      ...prev,
      categories: updatedCategories
    }));
  };

  const addCategory = () => {
    if (newCategory.trim()) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory.trim()]
      }));
      setNewCategory('');
    }
  };

  const removeCategory = (index) => {
    const updatedCategories = formData.categories.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      categories: updatedCategories
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...book,
      ...formData,
      // Ensure categories is always an array
      categories: formData.categories.filter(cat => cat && cat.trim() !== '')
    });
    onClose();
  };

  return (
    <div className="book-popup-overlay">
      <div className="book-popup">
        <div className="popup-header">
          <h3>Edit Book</h3>
          <button className="close-popup-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="popup-content">
          <form onSubmit={handleSubmit}>
            <div className="book-specific-details">
              <h3>Book Details</h3>
              <ul>
                <li>
                  <label>
                    Title:
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </label>
                </li>
                <li>
                  <label>
                    Author:
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                    />
                  </label>
                </li>
                <li>
                  <label>
                    Description:
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                    />
                  </label>
                </li>
                <li>
                  <label>Categories:</label>
                  <div className="categories-list">
                    {formData.categories.map((category, index) => (
                      <div key={index} className="category-item">
                        <input
                          type="text"
                          value={category}
                          onChange={(e) => handleCategoryChange(index, e.target.value)}
                        />
                        <button
                          type="button"
                          className="remove-category-btn"
                          onClick={() => removeCategory(index)}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="add-category">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Add new category"
                    />
                    <button
                      type="button"
                      className="add-category-btn"
                      onClick={addCategory}
                    >
                      Add
                    </button>
                  </div>
                </li>
              </ul>
            </div>
            <div className="popup-actions">
              <button type="submit" className="save-btn">
                Save Changes
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBookPopup;
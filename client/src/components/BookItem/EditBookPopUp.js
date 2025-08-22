import './BookPopUp.css';
import { useState } from 'react';

const EditBookPopup = ({ book, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    image_url: book.image_url || '',
    title: book.title || '',
    brand: book.brand || '',
    description: book.description || '',
    categories: Array.isArray(book.categories) ? [...book.categories] : [book.categories || ''],
    delivery: Array.isArray(book.delivery) ? [...book.delivery] : [book.delivery || ''],
    best_sellers_rank: book.best_sellers_rank || [],
    format: book.format || [{ name: "", url: "", price: "" }],
    rating: book.rating || '',
    reviews_count: book.reviews_count || '',
    availability: book.availability || '',
    final_price: book.final_price || '',
    item_weight: book.item_weight || '',
    product_dimensions: book.product_dimensions || ''
  });

  const [newCategory, setNewCategory] = useState('');
  const [newDelivery, setNewDelivery] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData(prev => ({
      ...prev,
      [field]: updated
    }));
  };

  const addArrayItem = (field, newValueSetter, value) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
      newValueSetter('');
    }
  };

  const removeArrayItem = (field, index) => {
    const updated = formData[field].filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      [field]: updated
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...book,
      ...formData,
      categories: formData.categories.filter(cat => cat && cat.trim() !== ''),
      delivery: formData.delivery.filter(opt => opt && opt.trim() !== '')
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
                    Image Link:
                    <input
                      type="url"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleChange}
                    />
                  </label>
                </li>
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
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </label>
                </li>
                <li>
                  <label>
                    Rating:
                    <input
                      type="text"
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                    />
                  </label>
                </li>
                <li>
                  <label>
                    Reviews Count:
                    <input
                      type="number"
                      name="reviews_count"
                      value={formData.reviews_count}
                      onChange={handleChange}
                    />
                  </label>
                </li>
                <li>
                  <label>
                    Availability:
                    <input
                      type="text"
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                    />
                  </label>
                </li>
                <li>
                  <label>
                    Price (final_price):
                    <input
                      type="number"
                      name="final_price"
                      value={formData.final_price}
                      onChange={handleChange}
                    />
                  </label>
                </li>
                <li>
                  <label>
                    Item Weight:
                    <input
                      type="text"
                      name="item_weight"
                      value={formData.item_weight}
                      onChange={handleChange}
                    />
                  </label>
                </li>
                <li>
                  <label>
                    Product Dimensions:
                    <input
                      type="text"
                      name="product_dimensions"
                      value={formData.product_dimensions}
                      onChange={handleChange}
                    />
                  </label>
                </li>
                <li>
                  <label>Delivery Options:</label>
                  <div className="categories-list">
                    {formData.delivery.map((option, index) => (
                      <div key={index} className="category-item">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleArrayChange('delivery', index, e.target.value)}
                        />
                        <button
                          type="button"
                          className='remove-category-btn'
                          onClick={() => removeArrayItem('delivery', index)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="add-category">
                    <input
                      type="text"
                      value={newDelivery}
                      onChange={(e) => setNewDelivery(e.target.value)}
                      placeholder="Add new delivery option"
                    />
                    <button
                      type="button"
                      className='add-category-btn'
                      onClick={() => addArrayItem('delivery', setNewDelivery, newDelivery)}
                    >
                      Add
                    </button>
                  </div>
                </li>
                <li>
                  <label>Categories:</label>
                  <div className="categories-list">
                    {formData.categories.map((category, index) => (
                      <div key={index} className="category-item">
                        <input
                          type="text"
                          value={category}
                          onChange={(e) => handleArrayChange('categories', index, e.target.value)}
                        />
                        <button
                          type="button"
                          className='remove-category-btn'
                          onClick={() => removeArrayItem('categories', index)}
                        >
                          X
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
                      className='add-category-btn'
                      onClick={() => addArrayItem('categories', setNewCategory, newCategory)}
                    >
                      Add
                    </button>
                  </div>
                </li>
                <li>
                  <label>Formats:</label>
                  <div className="categories-list">
                    {formData.format.map((fmt, index) => (
                      <div key={index} className="category-item">
                        <input
                          type="text"
                          placeholder="Format Name"
                          value={fmt.name || ""}
                          onChange={(e) => {
                            const updated = [...formData.format];
                            updated[index] = { ...updated[index], name: e.target.value };
                            setFormData(prev => ({ ...prev, format: updated }));
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Format URL"
                          value={fmt.url || ""}
                          onChange={(e) => {
                            const updated = [...formData.format];
                            updated[index] = { ...updated[index], url: e.target.value };
                            setFormData(prev => ({ ...prev, format: updated }));
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Format Price"
                          value={fmt.price || ""}
                          onChange={(e) => {
                            const updated = [...formData.format];
                            updated[index] = { ...updated[index], price: e.target.value };
                            setFormData(prev => ({ ...prev, format: updated }));
                          }}
                        />
                        <button
                          type="button"
                          className="remove-category-btn"
                          onClick={() => removeArrayItem("format", index)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="add-category">
                    <button
                      type="button"
                      className="add-category-btn"
                      onClick={() =>
                        setFormData(prev => ({
                          ...prev,
                          format: [...prev.format, { name: "", url: "", price: "" }]
                        }))
                      }
                    >
                      Add Format
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

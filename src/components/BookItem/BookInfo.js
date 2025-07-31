const BookInfo = ({ book }) => (
  <div className="book-info">
    <p><strong>Author:</strong> {book.brand}</p>
    <p><strong>Rating:</strong> {book.rating}</p>
    <p><strong>Reviews:</strong> {book.reviews_count}</p>
    <p><strong>Availability:</strong> {book.availability}</p>
    <p><strong>Price:</strong> ${book.final_price}</p>
    <p><strong>Item Weight:</strong> {book.item_weight}</p>
    <p><strong>Dimensions:</strong> {book.product_dimensions}</p>
  </div>
);

export default BookInfo;

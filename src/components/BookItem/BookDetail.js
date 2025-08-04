const BookDetail = ({ book }) => {
  return (
    <div>
      <BookHeader title={book.title} image={book.image_url} />
      <BookInfo book={book} />
    </div>
  );
};

const BookHeader = ({ title, image }) => (
  <div className="book-header">
    <img src={image} alt={title} />
    <p>{title}</p>
  </div>
);

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

export default BookDetail;

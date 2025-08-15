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
    {image ? (
      <img src={image} alt={title || "No title"} />
    ) : (
      <div className="no-image">No image available</div>
    )}
    <p>{title || "Untitled"}</p>
  </div>
);

const BookInfo = ({ book }) => (
  <div className="book-info">
    <p><strong>Author:</strong> {book.brand || "N/A"}</p>
    <p><strong>Rating:</strong> {book.rating ?? "N/A"}</p>
    <p><strong>Reviews:</strong> {book.reviews_count ?? "N/A"}</p>
    <p><strong>Availability:</strong> {book.availability || "N/A"}</p>
    <p><strong>Price:</strong> {book.final_price ? `$${book.final_price}` : "N/A"}</p>
    <p><strong>Item Weight:</strong> {book.item_weight || "N/A"}</p>
    <p><strong>Dimensions:</strong> {book.product_dimensions || "N/A"}</p>
  </div>
);

export default BookDetail;

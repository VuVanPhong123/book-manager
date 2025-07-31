const BookHeader = ({ title, image }) => (
  <div className="book-header">
    <img src={image} alt={title} />
    <p>{title}</p>
  </div>
);

export default BookHeader;

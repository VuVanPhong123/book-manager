import BookHeader from './BookHeader';
import BookInfo from './BookInfo';


const BookDetail = ({ book }) => {
  return (
    <div>
      <BookHeader title={book.title} image={book.image_url} />
      <BookInfo book={book} />
    </div>
  );
};

export default BookDetail;

import FormatList from './FormatList';
import DeliveryInfo from './DeliveryInfo';
import BestSellerRank from './BestSellerRank';
const BookSpecificDetail = ({ book }) => {
  return (
    <div className='book-specific-details'>
      <FormatList formats={book.format} />
      <DeliveryInfo delivery={book.delivery} />
      <BestSellerRank ranks={book.best_sellers_rank} />
    </div>
  );
};

export default BookSpecificDetail;

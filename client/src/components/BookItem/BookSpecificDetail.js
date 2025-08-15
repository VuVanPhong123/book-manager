const BookSpecificDetail = ({ book }) => {
  return (
    <div className='book-specific-details'>
      <BookDescription description={book.description} />
      <BookCategories categories={book.categories} />
      <FormatList formats={book.format} />
      <DeliveryInfo delivery={book.delivery} />
      <BestSellerRank ranks={book.best_sellers_rank} />
    </div>
  );
};

const BookDescription = ({ description }) => (
  <div>
    <h3>Description:</h3>
    <p>No description</p>
  </div>
);

const BookCategories = ({ categories }) => {
  const categoryList = Array.isArray(categories) 
    ? categories 
    : categories ? [categories] : [];

  return (
    <div>
      <h3>Categories:</h3>
      <ul>
        {categoryList.length > 0 ? (
          categoryList.map((category, idx) => (
            <li key={idx}>
              {typeof category === 'string' ? category : 
               Array.isArray(category) ? category.join(' / ') : 
               JSON.stringify(category)}
            </li>
          ))
        ) : (
          <li>No categories listed</li>
        )}
      </ul>
    </div>
  );
};

const FormatList = ({ formats }) => {
  const formatList = Array.isArray(formats) ? formats : [];
  
  return (
    <div>
      <h3>Available Formats:</h3>
      <ul>
        {formatList.length > 0 ? (
          formatList.map((format, idx) => (
            <li key={idx}>
              <a href={`https://www.amazon.com${format.url}`}>
                {format.name} - {format.price}
              </a>
            </li>
          ))
        ) : (
          <li>No formats available</li>
        )}
      </ul>
    </div>
  );
};


const DeliveryInfo = ({ delivery }) => {
  const deliveryList = Array.isArray(delivery) ? delivery : [];

  return (
    <div>
      <h3>Delivery Options:</h3>
      <ul>
        {deliveryList.length > 0 ? (
          deliveryList.map((option, idx) => <li key={idx}>{option}</li>)
        ) : (
          <li>No delivery options available</li>
        )}
      </ul>
    </div>
  );
};


const BestSellerRank = ({ ranks }) => {
  const rankList = Array.isArray(ranks) ? ranks : [];

  return (
    <div>
      <h3>Best Seller Ranks:</h3>
      <ul>
        {rankList.length > 0 ? (
          rankList.map((item, idx) => (
            <li key={idx}>
              {item.category} - Rank #{item.rank}
            </li>
          ))
        ) : (
          <li>No best seller rank</li>
        )}
      </ul>
    </div>
  );
};

export default BookSpecificDetail;
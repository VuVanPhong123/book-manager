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

const FormatList = ({ formats }) => (
  <div>
    <h3>Available Formats:</h3>
    <ul>
      {formats.map((format, idx) => (
        <li key={idx}>
          <a href={`https://www.amazon.com${format.url}`} >
            {format.name} - {format.price}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const DeliveryInfo = ({ delivery }) => (
  <div>
    <h3>Delivery Options:</h3>
    <ul>
      {delivery.map((option, idx) => <li key={idx}>{option}</li>)}
    </ul>
  </div>
);

const BestSellerRank = ({ ranks }) => (
  <div>
    <h3>Best Seller Ranks:</h3>
    <ul>
      {ranks.map((item, idx) => (
        <li key={idx}>{item.category} - Rank #{item.rank}</li>
      ))}
    </ul>
  </div>
);

export default BookSpecificDetail;
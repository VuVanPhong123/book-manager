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

export default BestSellerRank;

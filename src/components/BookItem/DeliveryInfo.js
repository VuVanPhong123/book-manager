const DeliveryInfo = ({ delivery }) => (
  <div>
    <h3>Delivery Options:</h3>
    <ul>
      {delivery.map((option, idx) => <li key={idx}>{option}</li>)}
    </ul>
  </div>
);

export default DeliveryInfo;

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

export default FormatList;

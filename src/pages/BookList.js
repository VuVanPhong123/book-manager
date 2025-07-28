// src/pages/BookList.jsx
const BookList = () => {
  const books = [
    { id: 1, title: "React for Beginners", author: "John Doe" },
    { id: 2, title: "Node.js Basics", author: "Jane Smith" }
  ];

  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
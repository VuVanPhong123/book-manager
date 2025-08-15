const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/Amazon_popular_books_dataset.json");

function readBooks() {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeBooks(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

exports.getBooks = (res) => {
  const books = readBooks();
  res.json(books);
};

exports.addBook = (req, res) => {
  const books = readBooks();
  const newBook = req.body;

  if (!newBook.asin) {
    newBook.asin = Math.random().toString(36).substr(2, 9).toUpperCase();
  }
  if (books.some(book => book.asin === newBook.asin)) {
    return res.status(400).json({ message: "Book with this ASIN already exists" });
  }

  books.push(newBook);
  writeBooks(books);

  res.status(201).json(newBook);
};

exports.updateBook = (req, res) => {
  const books = readBooks();
  const { asin } = req.params;
  const index = books.findIndex(book => book.asin === asin);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  books[index] = { ...books[index], ...req.body };
  writeBooks(books);

  res.json(books[index]);
};

exports.deleteBook = (req, res) => {
  const books = readBooks();
  const { asin } = req.params;
  const newBooks = books.filter(book => book.asin !== asin);

  if (newBooks.length === books.length) {
    return res.status(404).json({ message: "Book not found" });
  }

  writeBooks(newBooks);
  res.json({ message: "Book deleted successfully" });
};

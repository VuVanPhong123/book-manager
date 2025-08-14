const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/Amazon_popular_books_dataset.json");

// Đọc file JSON
function readBooks() {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

// Ghi file JSON
function writeBooks(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

// GET /books - Lấy toàn bộ sách
exports.getBooks = (req, res) => {
  const books = readBooks();
  res.json(books);
};

// POST /books - Thêm sách mới
exports.addBook = (req, res) => {
  const books = readBooks();
  const newBook = req.body;

  if (!newBook.asin) {
    // Tạo asin ngẫu nhiên nếu chưa có
    newBook.asin = Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  // Kiểm tra trùng asin
  if (books.some(book => book.asin === newBook.asin)) {
    return res.status(400).json({ message: "Book with this ASIN already exists" });
  }

  books.push(newBook);
  writeBooks(books);

  res.status(201).json(newBook);
};

// PUT /books/:asin - Cập nhật thông tin sách
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

// DELETE /books/:asin - Xóa sách
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

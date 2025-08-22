const Book = require('../models/Book');

function generateASIN() {
  return Math.random().toString(36).substring(2, 12).toUpperCase();
}

exports.getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const books = await Book.find()
      .skip(skip)
      .limit(limit);

    const total = await Book.countDocuments();

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      books
    });

  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ message: 'Server error while fetching books', error: error.message });
  }
};


// search sách
exports.searchBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || '';
    const categories = req.query.categories
      ? Array.isArray(req.query.categories) ? req.query.categories : [req.query.categories]
      : [];

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }

    if (categories.length > 0) {
      query.categories = { $in: categories };
    }

    const books = await Book.find(query)
      .skip(skip)
      .limit(limit);

    const total = await Book.countDocuments(query);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      books
    });

  } catch (error) {
    console.error('Search books error:', error);
    res.status(500).json({ message: 'Server error while searching books', error: error.message });
  }
};

// add sách
exports.addBook = async (req, res) => {
  try {
    const { asin, title, brand, image_url, rating, reviews_count, availability,
      final_price, item_weight, product_dimensions, description,
      categories, format, delivery, best_sellers_rank } = req.body;

    const existingBook = await Book.findOne({ $or: [{ asin }, { title }] });
    if (existingBook) return res.status(400).json({ message: 'Book with this ASIN or title already exists' });

    const book = new Book({
      asin: asin || generateASIN(),
      title,
      description,
      brand,
      image_url,
      rating,
      reviews_count: reviews_count || 0,
      availability,
      final_price,
      item_weight,
      product_dimensions,
      description,
      categories: Array.isArray(categories) ? categories : [categories],
      format: Array.isArray(format) ? format : [],
      delivery: Array.isArray(delivery) ? delivery : [],
      best_sellers_rank: Array.isArray(best_sellers_rank) ? best_sellers_rank : []
    });

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error('Add book error:', error);
    res.status(500).json({ message: 'Server error while adding book', error: error.message });
  }
};

// update sách
exports.updateBook = async (req, res) => {
  try {
    const { asin } = req.params;
    const book = await Book.findOne({ asin });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    const updatableFields = [
      'title','description','brand','image_url','rating','reviews_count','availability',
      'final_price','item_weight','product_dimensions','description',
      'categories','format','delivery','best_sellers_rank'
    ];

    updatableFields.forEach(field => {
      if (req.body[field] !== undefined) book[field] = req.body[field];
    });

    await book.save();
    res.json(book);
  } catch (error) {
    console.error('Update book error:', error);
    res.status(500).json({ message: 'Server error while updating book', error: error.message });
  }
};

// del sách
exports.deleteBook = async (req, res) => {
  try {
    const { asin } = req.params;
    const book = await Book.findOne({ asin });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    await Book.findByIdAndDelete(book._id);
    res.json({ message: 'Book deleted successfully', deletedBook: { asin: book.asin, title: book.title } });
  } catch (error) {
    console.error('Delete book error:', error);
    res.status(500).json({ message: 'Server error while deleting book', error: error.message });
  }
};

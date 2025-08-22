const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  asin: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: "N/A"
  },
  brand: {
    type: String,
    default: "N/A"
  },
  image_url: String,
  rating: {
    type: String,
    default: "NA"
  },
  reviews_count: {
    type: Number,
    default: 0
  },
  availability: String,
  final_price: Number,
  item_weight: String,
  product_dimensions: String,
  description: String,
  categories: [{
    type: String
  }],
  format: [{
    name: String,
    price: String,
    url: String
  }],
  delivery: [String],
  best_sellers_rank: [{
    category: String,
    rank: Number
  }]
}, {
  timestamps: true
});

bookSchema.index({ title: 'text' });

module.exports = mongoose.model('Book', bookSchema);

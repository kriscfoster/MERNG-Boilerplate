const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    required: true
  }
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;

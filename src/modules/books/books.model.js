import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  author: {
    type: String,
    required: [true, "A book must have an author"],
  },
  title: {
    type: String,
    required: [true, "A book must have a title"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
    min: [1, "Book rating cannot be less than 1"],
  },
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
});

const Book = model("book", bookSchema);

export default Book;

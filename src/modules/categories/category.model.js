import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "A category must have a name"],
    unique: [true, "Category with same name already exists"],
  },
});

const Category = model("category", categorySchema);

export default Category;

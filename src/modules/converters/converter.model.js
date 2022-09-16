import { Schema, model } from "mongoose";

const converterSchema = new Schema({
  name: {
    type: String,
    required: [true, "A converter must have a name"],
  },
  partNumber: {
    type: String,
    required: [true, "A converter must have a part number"],
    unique: true,
  },
  images: {
    type: [String],
  },
  price: {
    type: Number,
    required: [true, "A converter must have a price"],
  },
  alternateIds: {
    type: [String],
  },
  categoryId: {
    type: String,
  },
  commodities: {
    titanium: { type: Number, required: true },
    iron: { type: Number, required: true },
    rhodium: { type: Number, required: true },
  },
});

const Converter = model("converter", converterSchema);

export default Converter;

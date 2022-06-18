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
  description: {
    type: String,
    required: [true, "A converter must have a description"],
  },
  image: {
    type: [String],
    required: [true, "A converter must have image(s)"],
  },
  price: {
    type: String,
    required: [true, "A converter must have a price"],
  },
  alternateIds: {
    type: [String],
    required: [true, "A converter must have alternate identifier"],
  },
  cId: {
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

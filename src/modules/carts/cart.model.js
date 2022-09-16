import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  converters: [
    {
      converter: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
    },
  ],
  markup: {
    type: Number,
    default: 0,
  },
});

const Cart = model("cart", cartSchema);

export default Cart;

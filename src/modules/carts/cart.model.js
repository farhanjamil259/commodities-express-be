import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  converterIds: {
    type: [String],
    required: [true, "A cart must have converter id's"],
  },
});

const Cart = model("cart", cartSchema);

export default Cart;

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      qty: Number
    }
  ],
  totalAmount: Number
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderItemsSchema = new Schema({
    quantity: {
        type: Number,
        require: true,
      },
      orderId: [
        {
          type: Schema.Types.ObjectId,
          ref: "Order",
          required: true,
        },
      ],
      productId: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      ],
      title: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      ],
      price: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      ],
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('OrderItems', orderItemsSchema);
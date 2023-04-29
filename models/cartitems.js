const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartitemsSchema = new Schema({
    quantity: {
        type: Number,
        require: true,
      },
      cartId: [
        {
          type: Schema.Types.ObjectId,
          ref: "Cart",
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
      prod_name: {
        type: String,
      },
      color: {
        type: String,
        require: true,
      },
      price: {
        type: Number,
        require: true,
      },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CartItems', cartitemsSchema);
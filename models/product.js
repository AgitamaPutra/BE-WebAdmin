const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    // validate: {
    //   validator: function (v) {
    //     return /^\S*$/.test(v);
    //   },
    //   message: (props) => `${props.value} is not a valid phone number!`,
    // },
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  stars: {
    type: Number,
  },
  stock: {
    type: String,
  },
  reviews: {
    type: String,
  },
  company: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  category: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);

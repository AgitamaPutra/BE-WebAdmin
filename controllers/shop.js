const Product = require("../models/product");

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const stock = req.body.stock;
  const stars = req.body.stars;
  const reviews = req.body.reviews;
  const company = req.body.company;
  if (!req.file) {
    const error = new Error("No image provided");
    error.statusCode = 422;
    throw error;
  }
  const product = new Product({
    title: title,
    price: price,
    description: description,
    stock: stock,
    stars: stars,
    reviews: reviews,
    company: company,
    userId: req.user, //relation user
  });
  product
    .save()
    .then((result) => {
      // console.log(result);
      console.log("Created Product");
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products);
      res.json({ products });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.json({ data: products });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.json(result);
    });
};

exports.postOrder = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToOrder(product);
    })
    .then((result) => {
      console.log(result);
      res.json(result);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((products) => {
      res.json(products);
    })
    .catch((err) => console.log(err));
};

exports.clearCart = (req, res, next) => {
  const cart = req.user.clearCart();
  res.json(cart);
};

exports.removeItems = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId).then((product) => {
    const items = req.user.removeItems(product);
    console.log("Item Has Removed");
    res.json(items);
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById({ _id: prodId }).then((product) => {
    res.json(product);
  });
};

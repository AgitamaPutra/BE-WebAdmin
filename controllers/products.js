const Product = require("../models/product");

exports.postAddProduct = (req, res, next) => {
  console.log(req.userId, "INI DIA");
  // if (!req.file) {
  //   const error = new Error("No image provided");
  //   error.statusCode = 422;
  //   throw error;
  // }
  // const imageUrl = req.file.path.replace("\\", "/");
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const stock = req.body.stock;
  const stars = req.body.stars;
  const reviews = req.body.reviews;
  const company = req.body.company;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    // imageUrl: imageUrl,
    userId: req.userId, //relation user
    stock: stock,
    stars: stars,
    reviews: reviews,
    company: company,
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

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body._id;
  Product.deleteOne({ _id: prodId })
    .then((product) => {
      console.log(product);
      Product.find()
        .then((products) => {
          console.log(products);
          res.json({ products });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err)); //array split
};

exports.postUpdateProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const title = req.body.title;
  const price = req.body.price;
  const stock = req.body.stock;
  console.log(title);
  Product.findById(prodId).then((product) => {
    console.log(product);
    product.title = title;
    product.price = price;
    product.stock = stock;
    product.save();
  });
  Product.find()
    .then((products) => {
      console.log(products);
      res.json({ products });
    })
    .catch((err) => console.log(err));
};

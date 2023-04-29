const express = require("express");
const productsController = require("../controllers/products");
const usersController = require("../controllers/user");
const authController = require("../controllers/auth");
const router = express.Router();
const isAuth = require("../middleware/is-auth");

// router.get('/products', productsController.getAddProducts)
router.post("/add-product", isAuth, productsController.postAddProduct);
router.post("/delete-product", productsController.postDeleteProduct);
router.post("/update-product", productsController.postUpdateProduct);
router.get("/users", isAuth, usersController.getUsers);
router.post("/signup", authController.signup);
router.post("/delete-user", usersController.postDeleteUser);
router.post("/user", isAuth, usersController.getUser);
router.post("/update-user", usersController.postUpdateUser);

// router.get('/edit-product/:productId', productsController.postEditProduct)

module.exports = router;

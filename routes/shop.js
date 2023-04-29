const express = require("express");
// const productsController = require('../controllers/products');
const router = express.Router();
const shopController = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");

router.get("/", shopController.getIndex);
router.post("/add-product", isAuth, shopController.postAddProduct);
router.get("/products", isAuth, shopController.getProducts);
router.post("/cart", shopController.postCart);
router.get("/carts", shopController.getCart);
router.get("/clear", shopController.clearCart);
router.delete("/remove", shopController.removeItems);
// router.get('/', shopController.getIndex);
router.post("/product", isAuth, shopController.getProduct);
router.post("/order", shopController.postOrder);
// router.get('/product/:id/delete', productsController.postDeleteProduct )
// router.post('/addtocart' , shopController.postAddCart)
// router.post('/cartitems/delete', shopController.postCartDeleteProduct)
// router.post('/create-order', shopController.postOrder)
// console.log(shopController)

module.exports = router;

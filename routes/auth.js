const express = require("express");
const { body } = require("express-validator");

const User = require("../models/users");
const authController = require("../controllers/auth");

const shopController = require("../controllers/shop");
const router = express.Router();

router.post('/login', authController.login)
router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          console.log(userDoc)
          if (userDoc) {
            
            return Promise.reject("E-mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  authController.signup
);

module.exports = router;

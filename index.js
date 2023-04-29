const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const indexRoutes = require("./routes/index");
const shopRoutes = require("./routes/shop");
const mongoose = require("mongoose");
const User = require("./models/users");
const path = require("path");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

// app.use((req, res, next) => {
//   User.findById("644bdf3c239f582189d4124b")
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => console.log(err));
// });

app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);
app.use("/", indexRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb+srv://agitamaputr:12345@cluster0.9jlrzsr.mongodb.net/test")
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "adi",
          email: "adi@kodingakademi.com",
          cart: {
            items: [],
          },
          order: {
            items: [],
          },
        });
        user.save();
      }
    });

    app.listen(8000, () => {
      console.log(`"Connected" listening at http://localhost:8000`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

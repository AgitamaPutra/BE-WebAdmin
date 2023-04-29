const User = require("../models/users");

exports.getUsers = (req, res, next) => {
  User.find()
    .then((user) => {
      res.json({ data: user });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteUser = (req, res, next) => {
  const userId = req.body._id;
  User.deleteOne({ _id: userId })
    .then((user) => {
      console.log(user);
      User.find()
        .then((users) => {
          console.log(users);
          res.json({ users });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.getUser = (req, res, next) => {
  const uId = req.body.userId;
  User.findById({ _id: uId }).then((user) => {
    res.json(user);
  });
};

exports.postUpdateUser = (req, res, next) => {
  const usId = req.body.userId;
  const name = req.body.name;
  User.findById(usId).then((user) => {
    console.log(user);
    user.name = name;
    user.save();
  });
  User.find()
    .then((users) => {
      console.log(users);
      res.json({ users });
    })
    .catch((err) => console.log(err));
};

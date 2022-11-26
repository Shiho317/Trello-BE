const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const randomColor = require("randomcolor");

//signup

router.post("/signup", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      color: randomColor()
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user._id);
  } catch (error) {
    console.log(error);
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    //find user
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      res.status(400).json("Wrong username or password.");
    }

    //validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).json("Wrong username or password.");
    }

    //send response
    res.status(200).json({
      name: user.name,
      email: user.email,
      color: user.color,
      id: user._id,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

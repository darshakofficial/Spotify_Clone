const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { getToken } = require("../utils/helpers");
const passport = require("passport");

router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName, username } = req.body;

  const user = await User.findOne({ email: email });
  if (user) {
    return res
      .status(403)
      .json({ error: "A user with this email address already exists." });
  }

  const hasedPassword = await bcrypt.hash(password, 10);

  const newUserData = {
    email,
    password: hasedPassword,
    firstName,
    lastName,
    username,
  };

  const newUser = await User.create(newUserData);

  const token = await getToken(email, newUser);

  const userToRetrun = { ...newUser.toJSON(), token };
  delete userToRetrun.password;
  return res.status(200).json(userToRetrun);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(403).json({ err: "Invalid credentials." });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(403).json({ err: "Invalid credentials." });
  }

  const token = await getToken(user.email, user);
  const userToRetrun = { ...user.toJSON(), token };
  delete userToRetrun.password;
  return res.status(200).json(userToRetrun);
});

router.get(
  "/get/userData",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    currentUser = req.user;

    const user = await User.findOne({ _id: currentUser._id });

    if (!user) {
      return res.status(301).json({ err: "User not found" });
    }

    return res.status(200).json({ data: user });
  }
);

router.put(
  "/update/userData",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { firstName, lastName, email } = req.body;

    const user = await User.findOne(req.user._id);
    if (!user) {
      return res.status(301).json({ err: "User not found" });
    }

    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (email) {
      user.email = email;
    }

    await user.save();
    res.status(200).json({data : user})
  }
);

module.exports = router;

const express = require("express");
const passport = require("passport");

const Song = require("../models/Song");
const User = require("../models/User");

const router = express.Router();

// add song into the liked songd list

router.post(
  "/add/likedSong",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;

    const { songId } = req.body;

    // get the user if valid

    const user = await User.findOne({ _id: currentUser._id });
    if (!user) {
      return res.status(304).json({ err: "User does not exist." });
    }

    // check if song is valid

    const song = await Song.findOne({ _id: songId });
    if (!song) {
      return res.status(304).json({ err: "Song does not exist." });
    }

    if (!user.likedSongs.includes(songId)) {
      user.likedSongs.push(songId);
      await user.save();
      return res.status(200).json(user);
    } else {
      return res.status(200).json({ message: "Song already liked by you!!" });
    }
  }
);

// remove song into the liked songd list

router.post(
  "/remove/likedSong",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;

    const { songId } = req.body;

    // get the user if valid

    const user = await User.findOne({ _id: currentUser._id });
    if (!user) {
      return res.status(304).json({ err: "User does not exist." });
    }

    // check if song is valid

    const song = await Song.findOne({ _id: songId });
    if (!song) {
      return res.status(304).json({ err: "Song does not exist." });
    }

    user.likedSongs.pull(songId);
    await user.save();

    return res.status(200).json(user);
  }
);

// get song liked by user

router.get(
  "/get/likedSongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const likedSongs = await User.find({ _id: req.user._id }).populate({
      path: "likedSongs",
      populate: {
        path: "artist",
        model: "User",
      },
    });

    //const songData = (likedSongs.likedSongs);
    return res.status(200).json({ data: likedSongs });
  }
);

// get the user profile

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

module.exports = router;

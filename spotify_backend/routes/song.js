const express = require("express");
const passport = require("passport");

const Song = require("../models/Song");
const User = require("../models/User");

const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { name, thumbnail, track } = req.body;
    if (!name || !thumbnail || !track) {
      return res
        .status(301)
        .json({ err: "Insufficient details to create a song." });
    }

    const artist = req.user._id;

    console.log(req, artist);

    const songDetails = { name, thumbnail, track, artist };
    const createdSong = await Song.create(songDetails);
    return res.status(200).json(createdSong);
  }
);

//find our own upload song

router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const songs = await Song.find({ artist: req.user._id }).populate("artist");
    return res.status(200).json({ data: songs });
  }
);

//find song by artist

router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { artistId } = req.params;

    const artist = await User.findOne({ _id: artistId });
    if (!artist) {	
      return res.status(301).json({ err: "Artist does not exist." });
    }

    const songs = await Song.find({ artist: artistId });
    return res.status(200).json({ data: songs });
  }
);

//get song by song name

router.get(
  "/get/songname/:songName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const {songName} = req.params;

    // try to find song name pattern matching
    const songs = await Song.find({name: songName}).populate("artist");
    return res.status(200).json({data : songs});
  }
);


// add song into the liked songd list

// router.post(
//   "/add/likedSong",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     const currentUser = req.user;

//     const { userId, songId } = req.body;

//     // get the playlist if valid

//     const user = await User.findOne({ _id: userId });
//     if (!user) {
//       return res.status(304).json({ err: "User does not exist." });
//     }    

//     // check if song is valid

//     const song = await Song.findOne({ _id: songId });
//     if (!song) {
//       return res.status(304).json({ err: "Song does not exist." });
//     }

//     user.likedSongs.push(songId);
//     await user.save();

//     return res.status(200).json(playlist);
//   }
// );

// // remove song into the liked songd list

// router.post(
//   "/remove/likedSong",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     const currentUser = req.user;

//     const { userId, songId } = req.body;

//     // get the playlist if valid

//     const user = await User.findOne({ _id: userId });
//     if (!user) {
//       return res.status(304).json({ err: "User does not exist." });
//     }    

//     // check if song is valid

//     const song = await Song.findOne({ _id: songId });
//     if (!song) {
//       return res.status(304).json({ err: "Song does not exist." });
//     }

//     user.likedSongs.pop(songId);
//     await user.save();

//     return res.status(200).json(playlist);
//   }
// );

module.exports = router;

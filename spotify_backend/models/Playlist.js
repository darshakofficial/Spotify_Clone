const mongoose = require('mongoose');

const Playlist = mongoose.Schema({
    name:{
        type: String,
        requried: true,
    },
    thumbnail: {
        type: String,
        requried: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    }, 
    songs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Song",
        }
    ],
    collobrators: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        }
    ],   
});

const PlaylistModel = mongoose.model("Playlist", Playlist);

module.exports = PlaylistModel;
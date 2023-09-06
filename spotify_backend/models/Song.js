const mongoose = require('mongoose');

const Song = mongoose.Schema({
    name:{
        type: String,
        requried: true,
    },
    thumbnail: {
        type: String,
        requried: true,
    },
    track: {
        type : String,
        required: true,
    },
    artist: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },    
});

const SongModel = mongoose.model("Song", Song);

module.exports = SongModel;
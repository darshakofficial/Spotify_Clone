const mongoose = require('mongoose');

const User = mongoose.Schema({
    firstName : {
        type: String,
        required : true,
    },
    lastName : {
        type: String,
        required : false,
    },
    password : {
        type: String,
        required : true,
        private : true
    },
    email : {
        type: String,
        required : true,
    },
    username : {
        type: String,
        required : true,
    },
    likedSongs : [
        {
            type: mongoose.Types.ObjectId,
            ref: "Song",
        }
    ],
    likedPlaylists : {
        type: String,
        default : "",
    },
    subscribedArtists : {
        type : String,
        default : "",
    }
});

const UserModel = mongoose.model("User", User);

module.exports = UserModel;
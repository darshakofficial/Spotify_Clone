const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;


const User = require('./models/User');
const authRoutes = require('./routes/auth');
const songRoutes = require('./routes/song');
const playlistRoutes = require('./routes/playlist');
const likedSongRoutes = require('./routes/like');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

mongoose.connect
(
    //replace your MongoDB connection URL with <MongoDB URL>
    "mongodb+srv://darshak1330:" + process.env.MONGO_PASSWORD + "@cluster0.n6zdvq2.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
.then((x) => {
    console.log("Connected to MongoDB.");
})
.catch((err) => {
    console.log("Error while connecting to MongoDB." + err.message);
});


let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret'; // <-- your passport(jwt) secret key in ' '

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload.identifier}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));



app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);
app.use("/like", likedSongRoutes);

app.listen(port, () => {
    console.log("App is listening on port " + port);
})

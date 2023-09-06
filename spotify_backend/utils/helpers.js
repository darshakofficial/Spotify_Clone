const jwt = require('jsonwebtoken');

exports = {};

exports.getToken = async (email, user) => {
    
    const token = jwt.sign({identifier: user._id}, "secret"); // <-- Add a your passport(jwt) key in " "
    return token;
}

module.exports = exports;
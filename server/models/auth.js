const mongoose = require('mongoose');

const auth = new mongoose.Schema({
    user:String,
    email:String,
    password:String
});

module.exports = mongoose.model('auth', auth)
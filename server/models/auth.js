const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        require: true
    },
    password:{
        type: String,
        require: true
    },
});

const user = mongoose.model('register', authSchema);
module.exports = user
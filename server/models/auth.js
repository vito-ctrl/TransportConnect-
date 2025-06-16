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
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

const user = mongoose.model('User', authSchema);
module.exports = user
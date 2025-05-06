const User = require('../models/auth')
const jwt = require('jsonwebtoken');
const bcrybt = require('bcryptjs')

exports.signup = async(req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(user){
            res.error('user already exists');
        }
        const hashedPassword = await bcrybt.hash(req.body.password, 12);
        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
        });
        const token = jwt.sign({_id: newUser._id}, 'scretkey123', {
            expiresIn: '10d',
        });
        res.status(201).json({
            status: 'success',
            message: 'user registerd successfully',
            token
        })
    } catch(error){
        console.error('you have an error')
    }
}
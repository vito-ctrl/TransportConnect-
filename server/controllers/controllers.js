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

exports.signin = async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user) return console.log('user not found')

        const isPasswordValid = await bcrybt.compare(password, user.password);

        if(!isPasswordValid){
            return console.log('invalid password')
        }

        const token = jwt.sign({_id: user._id}, 'scretkey123', {
            expiresIn: '10d',
        });
        res.status(200).json({
            status: 'success',
            token,
            message: 'loged in successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })
    } catch (error) {
        console.error('loged in insuccess fully')
    }
}
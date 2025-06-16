const User = require('../models/auth')
const jwt = require('jsonwebtoken');
const bcrybt = require('bcryptjs')
const { validationResult } = require('express-validator');

exports.register = async(req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(401).json({
                status: 'fail',
                errors: errors.array()
            });
        }

        const user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({
                status: 'fails',
                massage: 'user already exists'
            });
        }
        const hashedPassword = await bcrybt.hash(req.body.password, 12);
        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
        });
        const token = jwt.sign({_id: newUser._id}, process.env.JWT_SECRET, {
            expiresIn: '10d',
        });
        res.status(201).json({
            status: 'success',
            message: 'user registerd successfully',
            token
        })
    } catch(error){
        res.status(500).json({
            status: 'error',
            message: 'registration failed',
            error: error.message
        })
    }
}

exports.login = async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        
        if(!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        const isPasswordValid = await bcrybt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(403).json({
                status: 'fail',
                message: 'invalid password'
            })
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
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
        res.status(500).json({
            status: 'error',
            message: 'Login failed',
            error: error.message
        });
    }
}

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch profile',
      error: error.message
    });
  }
};
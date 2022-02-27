const express = require('express');
const argon2 = require('argon2');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyToken = require('../middleware/auth');

// Get api/auth
// Kiem tra xem dang nhap nhap chua
router.get('/', verifyToken, async (req, res)=> {
    try {
        const user = await User.findById(req.userId).select('-password')

        if(!user)
            return res.json({
                success: false,
                message: 'User not found'
            })
        res.json({
            success: true,
            user
        })
    } catch(error) {
        console.log(error)
        res.json({
            success: false,
            message: 'Internal server error'
        })        
    }
})

// Register
// route api/auth/register
router.post('/register', async (req, res)=> {
    const {username, password} = req.body

    if(!username || !password) {
        return res.json({
            success: false,
            message: 'Missing username or password'
        })
    }
    
    try {
        //  Kiem tra xem trung usernamne ko
        const user = await User.findOne({username})
        if(user){
            return res.json({
                success: false,
                message: 'Username already taken'
            })
        }
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({username, password: hashedPassword})
        await newUser.save()

        // Return Token
        const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)

        res.json({
            success: true,
            message: 'User created successfully !!!',
            accessToken
        })
    } catch(error) {
        console.log(error)
        res.json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// Login
// Route api/auth/login
router.post('/login',  async (req, res)=> {
    const { username, password} = req.body

    if(!username || !password){
        return res.json({
            success: false,
            message: 'Missing username or password'
        })
    }

    try{
        const user = await User.findOne({username})

        // Kiem tra co tai khoan khong
        if(!user){
            return res.json({
                success: false,
                message: 'Incorrect username or password'
            })
        }

        // If username correct
        const passwordValid = await argon2.verify(user.password, password)
        if(!passwordValid) {
            return res.json({
                success: false,
                message: 'Incorrect username or password'
            })
        }
        //  All good
        const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)
        res.json({
            success: true,
            message: 'User logged successfully',
            accessToken
        })

    } catch(error) {
        console.log(err)
        res.json({
            success: false,
            message: 'Internal server error'
        })
    }

})

module.exports = router

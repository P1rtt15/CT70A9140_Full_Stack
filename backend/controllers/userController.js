const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

// @desc   Registers new user
// @route  POST /api/users
// @access Private
// @Data   _id, String = Given by MongoDB when creating new entry
//         name, String = Name of the new user
//         email, String = Email address of the new user
//         password, String = Password user uses to sign in

const registerUser = asyncHandler( async (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')       
    }

    const emailInUse = await User.findOne({email})
    const userNameInUse = await User.findOne({name})

    if(emailInUse){
        res.status(400)
        throw new Error('Useranme already in use') 
    }

    if(userNameInUse){
        res.status(400)
        throw new Error('Email already in use') 
    }
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    //const test = await bcrypt.compare(password, hashedPassword)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data') 
    }
})

// @desc   Authenticate a user
// @route  POST /api/users/login
// @access Public

const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({ email })

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials') 
    }
})

// @desc   Get user data
// @route  GET /api/users/me
// @access Private
const getMe = asyncHandler( async (req, res) => {
    const{_id, name, email} = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name: name,
        email: email
    })
})

module.exports = {
    registerUser,
    loginUser,
    getMe
} 
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const userModel = ('../models/userModel')

const protect = asyncHandler(async(req, res, next) => {
    let _token

    if(req.headers.authorization && req.authorization.startsWith('Bearer')){
        try{
            _token = req.headers.authorization.split('')[1]
            const decoded = jwt.verify(_token, process.env.JWT_SECRET)
            req._user = await userModel.findById(decoded.id).select('-password')
            next()
        } catch(error) {
            console.log(error)
            res.status(401)
            throw new error('Not authorized')
        }
    }

    if(!_token){
        res.status(401)
        throw new error('Not authorized, no token') 
    }
})

module.exports = {protect}
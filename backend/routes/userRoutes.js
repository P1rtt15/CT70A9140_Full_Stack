const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe, updateMe, deleteMe} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').post(registerUser)
router.route('/login').post(loginUser)
router.route('/me').get(protect, getMe)
//router.route('/me').get(protect, getMe).put(protect, updateMe).delete(protect, deleteMe)

module.exports = router
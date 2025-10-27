const express = require('express')
const router = express.Router()
const {getNutrients, addNutrient, deleteNutrient} = require('../controllers/nutrientController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getNutrients).post(protect, addNutrient)
router.route('/:id').delete(protect, deleteNutrient)

module.exports = router
const express = require('express')
const router = express.Router()
const {getNutrients, setNutrient, updateNutrient, deleteNutrient} = require('../controllers/nutrientController')

router.route('/').get(getNutrients).post(setNutrient)
router.route('/:id').put(updateNutrient).delete(deleteNutrient)

module.exports = router
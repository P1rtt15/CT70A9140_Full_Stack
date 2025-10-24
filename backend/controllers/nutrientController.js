const asyncHandler = require('express-async-handler')
const nutrientModel = ('../schemas/nutrientModel')

// @desc   Get nutrients
// @route  GET /api/nutrients
// @access Private
const getNutrients = asyncHandler( async (req, res) => {
    const nutrients = await nutrientModel.find()
    res.status(200).json(nutrients)
})

// @desc   Set nutrient
// @route  POST /api/nutrients
// @access Private
// @Data   _id, String = Given by MongoDB when creating new entry
//         _name, String = Name of the specific nutrient
//         _measurementUnit, String = Unit used in the measurement nutrient
//         _userDefined, [bool, String] = Includes user ID who defined the nutrient

const setNutrient = asyncHandler( async (req, res) => {
//    if(!req.body.){
//       res.status(400).json({message: 'Set nutrients'})
//        throw new Error('')
//    } 

    res.status(200).json({message: 'Set nutrients'})
})

// @desc   Update nutrient
// @route  PUT /api/nutrients/:id
// @access Private
const updateNutrient = asyncHandler( async (req, res) => {
    res.status(200).json({message: `Update nutrient ${req.prams.id}`})
})

// @desc   Delete nutrient
// @route  DELETE /api/nutrients/:id
// @access Private
const deleteNutrient = asyncHandler( async (req, res) => {
    res.status(200).json({message: `Delete nutrient ${req.prams.id}`})
})


module.exports = {
    getNutrients,
    setNutrient,
    updateNutrient,
    deleteNutrient
} 
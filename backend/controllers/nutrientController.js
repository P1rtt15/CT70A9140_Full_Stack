const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Nutrient = require('../models/nutrientModel')
const unitEnum = require('../../enums/unitEnum')
const typeEnum = require('../../enums/nutrientTypeEnum')

// @desc   Get available nutrients for user
// @route  GET /api/nutrients
// @access Private
const getNutrients = asyncHandler( async (req, res) => {
    const user = await User.findById( req.user.id )
    if(user){    
        const nutrients = await Nutrient.find({$or:[{userID: req.user.id},{userID: null}]})
        res.status(200).json(nutrients)
    }
    else{
        res.status(400)
        throw new Error('Invalid credentials') 
    }
})

// @desc   Set nutrient
// @route  POST /api/nutrients
// @access Private
// @Data   userID, mongoose.Schema.Types.ObjectId = Includes user ID who defined the nutrient
//         name, String = Name of the specific nutrient
//         type, String = Category for the nutrient for example Vitamins
//         unit, String = Unit used in measuring the nutrient

const addNutrient = asyncHandler( async (req, res) => {
    const user = await User.findById( req.user.id )
    if(user){     
        const {name, type, unit} = req.body   
        const nutrientExists = await Nutrient.findOne({name})

        if(nutrientExists){
            res.status(400)
            throw new Error('Nutrient already in use') 
        }
        
        const tempUnit = Object.values(unitEnum.unit).includes(unit) ? unit : unitEnum.unit.undefined 
        const tempType = Object.values(typeEnum.type).includes(type) ? type : typeEnum.type.undefined 
        const nutrient = await nutrient.create({
            userID: req.user.id,
            name,
            type: tempType,
            unit: tempUnit
        })

        if(nutrient){
            res.status(200).json({
                id: nutrient._id,
                userID: nutrient.userID,
                name: nutrient.name,
                type: nutrient.type,
                unit: nutrient.unit,
            })
        } else {
            res.status(400)
            throw new Error('Invalid nutrient data') 
        }
    }
    else{
        res.status(400)
        throw new Error('User not authorized') 
    }

    res.status(200).json({message: 'Set nutrients'})
})

// @desc   Delete nutrient
// @route  DELETE /api/nutrients/:id
// @access Private
const deleteNutrient = asyncHandler( async (req, res) => {
  const nutrient = await Nutrient.findById(req.params.id)
  if (!nutrient) {
    res.status(400)
    throw new Error('Nutrient not found')
  }

  const user = await User.findById(nutrient.userID.toString())
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (nutrient.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await nutrient.remove()

  res.status(200).json({ id: req.params.id })
})


module.exports = {
    getNutrients,
    addNutrient,
    deleteNutrient
} 
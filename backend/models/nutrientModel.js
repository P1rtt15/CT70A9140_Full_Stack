const mongoose = require('mongoose')
const unitEnum = require('../../enums/unitEnum')
const nutrientTypeEnum = require('../../enums/nutrientTypeEnum')

const nutrientModel = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'},
  name: {
    type: String,
    required:[true, '']
  },
  type: {
    type: String,
    enum: Object.values(nutrientTypeEnum),
    default: nutrientTypeEnum.nutrientType.undefined,
    required:[true, '']
  },
  unit: {
    type: String,
    enum: Object.values(unitEnum),
    default: unitEnum.unit.undefined,
    required:[true, '']
  }
},
{
  timestamps: true
})

module.exports = mongoose.model('Nutrient',nutrientModel)
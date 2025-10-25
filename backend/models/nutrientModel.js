const mongoose = require('mongoose')

const nutrientModel = mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  name: {type: String, required:[true, '']},
  type: {type: String, required:[true, '']},
  measurement: {type: String, required:[true, '']}
},
{
  timestamps: true
})

module.exports = mongoose.model('Nutrient',nutrientModel)
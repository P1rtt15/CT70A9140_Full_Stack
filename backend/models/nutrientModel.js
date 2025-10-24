const mongoose = require('mongoose')

const nutrientModel = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  name: {type: String, required:[true, '']},
  type: {type: String, required:[true, '']},
  measurement: {type: String, required:[true, '']}
},
{
  timestamps: true
})

module.export = mongoose.model('Nutrient',nutrientModel)
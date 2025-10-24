const mongoose = require('mongoose')

const userModel = mongoose.Schema({
  name: {type: String, required:[true, 'Please add a name'], unique: true},
  email: {type: String, required:[true, 'Please add an email'], unique: true},
  password: {type: String, required:[true, '']}
},
{
  timestamps: true
})

module.export = mongoose.model('User',userModel)
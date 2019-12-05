require('dotenv').config()

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    required: true
  },
  author: {
    type: String,
    minlength: 2,
    required: true
  },
  url: {
    type: String,
    minlength: 8,
    required: true,
    unique: true
  },
  likes: {
    type: Number,
    minlength: 1,
    required: true
  }
})

blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)

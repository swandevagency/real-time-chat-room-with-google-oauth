const mongoose = require('mongoose')

const userSchema = require('./User/index')
const messageSchema = require('./Message/index')


mongoose.model('User',userSchema)
mongoose.model('Message', messageSchema)
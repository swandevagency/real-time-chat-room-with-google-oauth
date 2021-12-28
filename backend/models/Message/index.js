const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const messageSchema = new mongoose.Schema({
    text : {
        type : 'string'
    },
    createdAt :{
        type : Date,
        default : Date.now
    },
    sentBy : {
        type :  Schema.Types.ObjectId,
        ref : 'User'
    },
    sender:{
        type : 'string',
        ref : 'User'   
    }
})

module.exports = messageSchema
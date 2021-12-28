const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: 'string'
    },
    lastname: {
        type : 'string'
    },
    username: {
        type : 'string'
    },
    password : {
        type : 'string'
    },
    email : {
        type : 'string',
        required : true
    },
    phoneNumber : 'string'
})

module.exports = userSchema
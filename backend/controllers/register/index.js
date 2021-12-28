const mongoose = require('mongoose')
require('../../models/index')

const bcrypt = require('bcrypt')


module.exports = async (req, res) =>{
    const {firstname, lastname, username, password, email, number} = req.body
    if(!username || !password || !email){
        res.status(400).send({
            msg : 'please provide required fields'
        })
        return
    }
    const userAlreadyExist = await mongoose.model('User').findOne({username})
    if(userAlreadyExist){
        res.status(400).send({
            msg : 'this username has been taken'
        })
        return
    }
    const emailAlreadyExist = await mongoose.model('User').findOne({email})
    if(emailAlreadyExist){
        res.status(400).send({
            msg : 'this email has been taken'
        })
        return
    }
    const numberAlreadyExist = await mongoose.model('User').findOne({phoneNumber : number})
    if(numberAlreadyExist){
        res.status(400).send({
            msg : 'this phone number already exist'
        })
        return
    }
    try {
        const user = new mongoose.model('User')({
            firstname,
            lastname,
            username,
            email,
        })
        const salt =  await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        user.save()
        res.status(200).send({
            msg : 'successfully done'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg : 'sorry something went wrong'
        })
    }
}
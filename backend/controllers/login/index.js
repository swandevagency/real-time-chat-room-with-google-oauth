const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jwt_user_key = 'secret-key-for-making-jwt-for-users'


module.exports = async (req, res) =>{
    const {email, password} = req.body
    if(!email || !password){
        res.status(400).send({
            msg : 'please provide valid credentials'
        })
        return
    }
    const userExist = await mongoose.model('User').findOne({email})
    if(!userExist){
        res.status(400).send({
            msg : 'invalid credentials'
        })
        return
    }
    const passwordIsValid = await bcrypt.compare(password, userExist.password)
    if(!passwordIsValid){
        res.status(400).send({
            msg : 'invalid credentilas'
        })
        return
    }
    const id = userExist._id
    const token = await jwt.sign({id}, jwt_user_key,{});
    res.status(200).send({
        token,
    })
}
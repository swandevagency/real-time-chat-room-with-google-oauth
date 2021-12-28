const mongoose = require('mongoose')

module.exports = async (req, res) =>{
    try {
        const user = await mongoose.model('User').findOne({_id : req.session.userID})
        //const messages = await mongoose.model('Message').find().skip(2).limit(2)
        // const messages = await mongoose.model('Message').find().sort({$natural:-1}).limit(1)
        const messages = await mongoose.model('Message').find().sort({_id : -1}).limit(15)
        res.status(200).send({
            msg : 'there you go , the information that you need',
            user : user.username,
            messages
        })
    } catch (error) {
        console.log(error)
    }
}
const mongoose = require('mongoose')

module.exports = async (req, res, next) =>{
    try {
        const user = await mongoose.model('User').findOne({_id : req.session.userID})
        console.log(user.username)
        const sender = user.username
        const msg = new mongoose.model('Message')({
            text : req.body.message,
            sentBy : req.session.userID,
            sender
        })
        await msg.save()
        next()
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg : 'something went wrong'
        })
    }
}
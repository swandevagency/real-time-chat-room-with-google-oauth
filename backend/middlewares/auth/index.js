const mongoose = require('mongoose')

module.exports = async (req, res, next) =>{
    if(req.session.isAuthenticated){
        next()
    }
    else{
        res.status(403).send({
            msg : 'request is not authenticated and user must be redirect'
        })
        return
    }
}  

// try to parse those fucking cookies

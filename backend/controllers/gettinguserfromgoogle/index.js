const session = require('express-session');
const { google } = require('googleapis');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')






module.exports = async (req, res)=>{
    if(!req.query.code){
        res.status(400).send({
            msg : 'something went wrong with your authemtivation with google'
        })
        return
    }
    //console.log(req.query.code)
    const code = req.query.code
    const oauth2Client = new google.auth.OAuth2(
        client_id = '413448124975-oaobge2n9ti3qsa13b618k14euhk69u9.apps.googleusercontent.com',
        client_secret = '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',
        redirect_url = 'http://localhost:5000/auth/google',
        //redirect_uri = 'http://localhost:3000/chatroom'
    );   
    const {tokens} = await oauth2Client.getToken(code)
    if(!tokens){
        res.status(400).send({
            msg : 'some thing went wrong with your authentication with google'
        })
        return
    }
    const id_token = tokens.id_token
    //console.log(tokens)
    const userInfo = await jwt.decode(id_token)

    //console.log(userInfo)
    const userEmail = userInfo.email;
    const userAlreadyExist = await mongoose.model('User').findOne({email : userEmail})
    if(userAlreadyExist){
        const id = userAlreadyExist._id.toString()
        //console.log(id, 'this is what you looking for')
        //res.cookie('token',id)
        //console.log('we are here')// here we have to find a way for sending a token (access token or id token or some thing like that while we are reirectiong them to /chatroom and i guess here is the way that cookies and sessions will be bring in)
        req.session.isAuthenticated = true
        req.session.userID = id
        // await req.session.save()
        //res.cookie('session-id',`${req.session.id}`)
        res.redirect('http://localhost:3000/chatroom')
        return
    }
    const user = new mongoose.model('User')({
        firstname : userInfo.given_name,
        lastname : userInfo.family_name,
        username : userInfo.given_name,
        email : userInfo.email
    })
    await user.save()
    oauth2Client.setCredentials(tokens)
    const id = user._id.toString()
    //res.cookie('token',id)
    //console.log(id, 'this is what you looking for')
    req.session.isAuthenticated = true
    req.session.userID = user._id
    // await req.session.save()
    //res.cookie('session-id',`${req.session.id}`)
    res.redirect('http://localhost:3000/chatroom')
}


// ok the last results : problem : cannot access session id from a request 
// solution 1 : the cookie shouldnt be sent seperate from the session 
// solution 2 : some how parse that moder fucker cookie



const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  client_id = '413448124975-oaobge2n9ti3qsa13b618k14euhk69u9.apps.googleusercontent.com',
  client_secret = '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',
  redirect_url = 'http://localhost:5000/auth/google'
);

function getGoogleAuthURL (){
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
    ].join(" ")
    const googleurl =  oauth2Client.generateAuthUrl({
        access_type : 'offline',
        prompt : 'consent',
        scope : scopes
    })
    return (googleurl)
}


module.exports = async (req, res) =>{
    res.send(getGoogleAuthURL())
}
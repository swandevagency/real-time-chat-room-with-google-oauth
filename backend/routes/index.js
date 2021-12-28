const router = require('express').Router()

const register = require('../controllers/register/index')

const fetchGoogleURl = require('../controllers/googleOauth2/index')

const googleAuthHandeler = require('../controllers/gettinguserfromgoogle/index')

const login = require('../controllers/login/index')

const providingData = require('../controllers/providingData/index')

const storeMessage = require('../controllers/storeMessage/index')

const authMiddleware = require('../middlewares/auth/index')


router.post('/register', register)

router.get('/google',fetchGoogleURl)

router.get('/auth/google', googleAuthHandeler) 

router.post('/login',login)

router.get('/chatroom',authMiddleware,providingData)

router.post('/chatroom',authMiddleware,storeMessage,providingData)













module.exports = router
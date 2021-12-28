const express = require('express');
const http = require('http')
const mongoose = require('mongoose')
const app = express();
const cors = require('cors')
const corsOptions = {
    origin:'http://localhost:3000',
    credentials : true,
    optionSuccessStatus:200
}
const port = 5000;
const server = http.createServer(app);
const session = require('express-session')
const mongodbSession = require('connect-mongodb-session')(session)
//const cookieParser = require('cookie-parser')
//const MongoStore = require('connect-mongo')
const socketio = require('socket.io')
//const dotenv = require('dotenv');
const io = socketio(server,{
    cors: {origin: "http://localhost:3000",methods: ["GET", "POST"]}
})





mongoose.connect('mongodb://localhost:27017/chatroom')
.then(() => {console.log('database is connected')},
err => {console.log('can not connect to database')})

app.use(cors(corsOptions));


app.use(express.urlencoded({ extended : true}));

app.use(express.json());
//app.use(cookieParser())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge : 12000000 },
    store : new mongodbSession({uri:'mongodb://localhost:27017/chatroom'})
}))



app.use('/',require('./routes/index'))

const formatMessage = (message)=>{
    return {user:'admin',message}
}


io.on('connection', (socket) =>{
    console.log('new WS connection' )
    
    socket.emit('message',formatMessage('welcome to chatroom'))
    socket.broadcast.emit('message',formatMessage('a user has joined the chat'))
    socket.on('disconnect',()=>{
        io.emit('message', formatMessage('a user has left the chat'))
    })
    socket.on('chatMessage',(pmObject) =>{
        io.emit('message',pmObject)
    })
})




server.listen(port,() =>{
    console.log('server is running')
})
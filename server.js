const express = require('express');
const serverController = require('./controllers/serverController')
require('dotenv').config()

const app = express()
app.use(express.json())

app.get('/posts',authenticateToken, serverController.posts);
app.post('/login', serverController.login);

function authenticateToken(req,res,next){
    const authHeader =  req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null ) return res.sendStatus(401)
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        if(err) return res.sendStatus(403)
        req.user =  user;
        next()
    })
}

app.listen(7777, ()=>{
    console.log(`server starting at 7777.....`);
})
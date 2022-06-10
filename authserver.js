const express = require('express');
const authserverController =  require('./controllers/authserverController')
require('dotenv').config()

const app = express()

app.use(express.json())

//routes
app.post('/token',authserverController.token )
app.delete('/logout', authserverController.logout)
app.post('/login',authserverController.login)

   
app.listen(3000, ()=>{
    console.log(`server starting at port 3000.....`);
})

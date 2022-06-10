const express = require('express')
const jwt  = require('jsonwebtoken')

const posts = [
    {
    username: "anc",
    title : 'heee'
},
    {
    username: "andgsag",
    title : 'hegaggee'
}]

 
exports.posts = (req,res)=>{
    res.json(posts.filter(post => post.username === req.user.name))
    console.log(posts);
}

exports.login = (req,res)=>{
    // Authenticate user
     const username = req.body.username
     const user = { name: username}
     
     // creating web token
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    console.log(accessToken);
    res.json({accessToken: accessToken});
  
}



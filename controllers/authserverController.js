const express = require('express');
const jwt  = require('jsonwebtoken')

let refreshTokens = []
exports.token = (req,res)=>{
    const refreshToken =  req.body.token;
    if (refreshToken == null) return res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name})
        console.log(accessToken);
        res.json({accessToken: accessToken})
    })
}

exports.logout = (req,res)=>{
    refreshTokens = refreshTokens.filter(token=> token !== req.body.token)
    res.sendStatus(204)
}


exports.login = (req,res)=>{
    // Authenticate user
     const username = req.body.username
     const user = { name: username}
     
     // creating web token
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    // console.log(accessToken)
    res.json({accessToken: accessToken, refreshToken: refreshToken});
  
}

function generateAccessToken (user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '500s'})
}
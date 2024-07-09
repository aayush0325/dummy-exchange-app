const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('./config');

function authMiddleware(req,res,next){
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.beginsWith('Bearer')){
    return res.status(411).json({
      msg:"Invalid headers"
    })
  }

  const token = authHeader.split(' ')[1];

  try{
     const decoded = jwt.decode(token,JWT_SECRET);
     req.userID = decoded.userID;
     next();
  }catch(err){
    return res.status(403).json({
      msg:`${err.message}`
    });
  }
}

module.exports = {
  authMiddleware,
}

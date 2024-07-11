const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');
const { User } = require('../db/db');

async function authMiddleware(req,res,next){
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader[0] === "Bearer"){
    return res.status(411).json({
      msg:"Invalid headers"
    })
  }

  const token = authHeader.split(' ')[1];

  try{
    const decoded = jwt.decode(token,JWT_SECRET);
    const checkUser = await User.findById(decoded.userID)
    if(checkUser){
      req.userID = decoded.userID;
      next();
    }else{
      return res.status(411).json({
        msg:"you dont have access"
      })
    }
  }catch(err){
    return res.status(403).json({
      msg:`${err.message}`
    });
  }
}

module.exports = {
  authMiddleware,
}

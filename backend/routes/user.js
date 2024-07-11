const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const router = express.Router();
const { User } = require('../db/db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middlewares/middlewares');
const { signinSchema,signupSchema,updateBodySchema } = require('./zod/user');
const { Accounts } = require('../db/db')

router.post('/signup',async (req,res) => {
  const success = signupSchema.safeParse(req.body).success;
  if(!success){
    return res.status(411).json({
      msg:"Invalid inputs",
    })
  }

  const existingUser = await User.findOne({
    username:req.body.username,
  });

  if(existingUser){
    return res.status(411).json({
      msg:"Username Already Exists"
    }) 
  }

  const user = await User.create({
    username:req.body.username,
    password:req.body.password,
    firstname:req.body.firstname,
    lastname:req.body.lastname,
  })

  const userID = user._id;

  const token = jwt.sign({
    userID,
  },JWT_SECRET);
  
  await Accounts.create({
    userID,
    balance: 10000 + Math.random()*10000,
  })

  return res.status(200).json({
    msg:"User Created Successfully",
    token:token,
  })

})

router.post('/signin',async (req,res) => {
    const success = signinSchema.safeParse(req.body).success;
  if(!success){
    return res.status(411).json({
      msg: "Invalid inputs"
    })
  }

  const existingUser = await User.findOne({
    username:req.body.username,
    password:req.body.password,
  })

  if(!existingUser){
    return res.status(411).json({
      msg:"User not found"
    })
  }

  const token = jwt.sign({
    userID: existingUser._id,
  },JWT_SECRET);

  return res.status(200).json({
    token,
  })
})

router.get('/info',authMiddleware,async(req,res) => {
  const account = await User.findById(req.userID)
  return res.json({
    firstname: account.firstname,
    lastname: account.lastname,
  })
})

router.get('/bulk',authMiddleware,async(req,res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
      $or: [{
          firstname: {
              "$regex": filter
          }
      }, {
          lastname: {
              "$regex": filter
          }
      }]
  })

  res.status(200).json({
    user: users.map(user => ({
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        _id: user._id
    }))
  })
  
})

module.exports = router;




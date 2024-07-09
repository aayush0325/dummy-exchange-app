const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const router = express.Router();
const zod = require('zod');
const mongoose = require('mongoose');
const { User } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const signupSchema = zod.object({
  firstname:zod.string().min(3).max(50),
  lastname: zod.string().min(3).max(50),
  username: zod.string().min(3).max(50),
  password: zod.string().min(3).max(50),
})

const signinSchema = zod.object({
  firstname:zod.string().min(3).max(50),
  lastname: zod.string().min(3).max(50),
})

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

  const existingUser = User.findOne({
    username:req.body.username,
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
module.exports = router;




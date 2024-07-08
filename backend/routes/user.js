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

router.post('/signup',(req,res) => {

})


module.exports = router;




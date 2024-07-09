const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { number } = require('zod');
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI).then(
  console.log('db connected')
).catch(
  err => console.log(err.message)
)

const userSchema = new mongoose.Schema({
  firstname:{
    type:String,
    required:true,
    minLength:3,
    maxLength:50,
  },
  lastname:{
    type:String,
    required:true,
    minLength:3,
    maxLength:50,
  },
  username:{
    type:String,
    required:true,
    minLength:3,
    maxLength:50,
  },
  password:{ 
    type:String,
    required:true,
    minLength:3,
    maxLength:50,
  }
});

const accountsSchema = new mongoose.Schema({
  userID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
  },
  balance:{
    type:number,
    required:true,
  }
})

const User = mongoose.model('User',userSchema);
const Accounts = mongoose.model('Accounts',accountsSchema)

module.exports = {
  User,
  Accounts,
};

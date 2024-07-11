const express = require('express');
const mongoose = require('mongoose');
const {Accounts} = require('../db/db');
const {User} = require('../db/db');
const {authMiddleware} = require('../middlewares/middlewares')
const {transferSchema} = require('./zod/accounts')


const router = express.Router();



router.get('/balance',authMiddleware,async(req,res) => {
  const account = await Accounts.findOne({
    userID:req.userID,
  });
  res.json({
    balance:account.balance,
  });
})

router.post('/transfer',authMiddleware,async(req,res) => {
  const success =  transferSchema.safeParse(req.body).success;
  if(!success){
    return res.status(411).json({
      msg: "Invalid inputs"
    });
  };
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;
  const account = await Accounts.findOne({ userID: req.userID }).session(session);

  if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
          message: "Insufficient balance"
      });
  }

  const toAccount = await Accounts.findOne({ userID: to }).session(session);

  if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
          message: "Invalid account"
      });
  }

  // Perform the transfer
  await Accounts.updateOne({ userId: req.userID }, { $inc: { balance: -amount } }).session(session);
  await Accounts.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

  // Commit the transaction
  await session.commitTransaction();
  res.json({
      message: "Transfer successful"
  });
})



module.exports = router

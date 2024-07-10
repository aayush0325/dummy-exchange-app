const express = require('express');
const mongoose = require('mongoose');
const {Accounts} = require('../db/db');
const {User} = require('../db/db');
const {authMiddleware} = require('../middlewares/middlewares')
const {transfersSchema} = require('./zod/accounts')


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
  const {success} =  transfersSchema.safeParse(req.body);
  if(!success){
    return res.status(411).json({
      msg: "Invalid inputs"
    });
  };

  transferFunds(req.userID,req.body.to,req.body.amount);
})

transferFunds = async (senderID,receiverID,amount) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try{
    const sender = await Accounts.findOne({
      userID: senderID,
    });

    const receiver = await Accounts.findOne({
      userID: receiverID,
    });

    if(!sender || !receiver){
      return res.status(403).json({
        msg:'Account not found',
      });
    };

    if(amount > sender.balance){
      return res.json({
        msg:"Insufficient Funds",
      });
    }
    
    sender.balance-=amount;
    receiver.balance+=amount;

    await sender.save({session});
    await receiver.save({session});

    await session.commitTransaction();
    await session.endSession();

    return res.json({
      msg:"Transfer successful!!!"
    })

  }catch(err){
    return res.json({
      msg:"Some error in the database",
    })
  }
}



module.exports = router

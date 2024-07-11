const express = require('express');
const cors = require('cors')

const router = express.Router();
const userRouter = require('./user');
const accountsRouter = require('./accounts');
router.use(cors());
router.use('/user',userRouter);
router.use('/account',accountsRouter);
module.exports = router;


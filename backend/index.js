const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3000;

const cors = require('cors');

const rootRouter = require('./routes/index');

app.use(cors()); 
app.use(express.json());

app.use('/api/v1',rootRouter);










app.listen(port,() => {
  console.log(`listening to port ${port}`)
})

const mongoose = require('mongoose');

const dotenv = require("dotenv");
dotenv.config();

const express= require('express');
const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch(err => console.log(err));

const userRoute = require('./userSchema/route');
const providerRoute = require('./providers/route');

app.use('/extranet',userRoute);

app.listen({ port: 4000 }, () =>
  console.log(`🚀  Server ready at http://localhost:4000/extranet`)
);
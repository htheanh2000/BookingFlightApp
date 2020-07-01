const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,({useNewUrlParser:true,useCreateIndex:true}));

const connection = mongoose.connection;
connection.once('open',() => {
    console.log("MongoDB database connection established successfully")
});

const flightRouter = require('./routes/flight');
const userRouter = require('./routes/user');
const billRouter = require('./routes/bill');
const detailsRouter= require('./routes/details');

app.use('/flights', flightRouter);
app.use('/users',userRouter);
app.use('/bills',billRouter);
app.use('/details',detailsRouter);

app.listen(port,()=> {
    console.log(`Server is runnning on port: ${port}`);
});
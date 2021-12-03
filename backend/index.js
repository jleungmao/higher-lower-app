const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');

const app = express();

//app.use(express.urlencoded({ extended: false })); is for FORMS
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //is for JSON

app.use('/admin', adminRouter);
app.use(userRouter);



mongoose.connect(process.env.MONGODB_KEY)
    .then((result) => {
        app.listen(8080);
    })
    .catch(err => {
        console.log(err);
    });


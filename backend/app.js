const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./routes/user');
const Book = require('./routes/book');


//routes
app.use('/api/v1/users', User);
app.use('/api/v1/books', Book);

//connect to mongodb
mongoose.connect(process.env.MongoDB_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });



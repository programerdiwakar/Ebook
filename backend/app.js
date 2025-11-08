const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = 3000;
const mongoose = require('mongoose');

const User = require('./routes/user');
const Book = require('./routes/book');
const Favourite = require('./routes/favourite');
const Cart = require('./routes/cart');
const Order = require('./routes/order');

app.use(cors());
app.use(express.json());

//routes
app.use('/api/v1/users', User);
app.use('/api/v1/books', Book);
app.use('/api/v1/favourites', Favourite);
app.use('/api/v1/cart', Cart);
app.use('/api/v1/orders', Order)
//connect to mongodb
mongoose.connect(process.env.MongoDB_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        });
        console.log("backend");
    })
    .catch((err) => {
        console.log(err);
    });



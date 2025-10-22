const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.json());

async () => {
    try {
        await mongoose.connect(process.env.MongoDB_URI)
        console.log('MongoDB connected');
    }
    catch (err) {

    }
}
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

// Health check / root
app.get('/', (req, res) => {
    res.send('Hello world');
});




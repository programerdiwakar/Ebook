const mongoose = require('mongoose');
const booksSchema = new mongoose.Schema({

    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required:true,
    },
    language: {
        type: String,
        required:true,
    }

    
}, { timestamps: true }); // here timestamps will use to sort the orders based on time

module.exports = mongoose.model('books', booksSchema);
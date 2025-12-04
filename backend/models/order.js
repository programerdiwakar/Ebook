const mongoose = require('mongoose');
const ordersSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    book: {
        type: mongoose.Types.ObjectId,
        ref: 'book',
    },
    status: {
        type: String,
        default: 'Order placed',
        enum: ['Order placed', 'Out for delivery', 'Delivered', 'Cancelled']
        
    },
    
}, { timestamps: true }); // here timestamps will use to sort the orders based on time

module.exports = mongoose.model('order', ordersSchema);
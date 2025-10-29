const router = require('express').Router();
const User = require('../models/user');
const authenticateToken = require('./userAuth');


// add book to cart
router.put('/add-to-cart', authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.includes(bookid);
        if (isBookInCart) {
            return res.status(400).json({ message: 'Book is already in cart' });
        }
        await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
        return res.status(200).json({ message: 'Book added to cart successfully' });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// remove book from cart
router.delete('/remove-from-cart', authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.includes(bookid);
        if (isBookInCart) {
            await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
        }
        return res.status(200).json({message:'Book removed from cart successfully'})
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});



//get all books in cart of user
router.get('/get-cart-books', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate('cart');
        const cartBooks = userData.cart;
        return res.status(200).json({ status: 'success', data: cartBooks });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
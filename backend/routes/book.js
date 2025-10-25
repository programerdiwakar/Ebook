const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./userAuth');
const Book = require('../models/book');


//Add a new book
router.post('/add-book', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'you are not having access to perform admin work' })
        }
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        await book.save();
        res.status(200).json({ message: 'Book added successfully', book: book });
        
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//update a book
router.put('/update-book', authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });

        return res.status(200).json({ message: 'Book updated successfully' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = router;


const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./userAuth');

//Sign up
router.post('/signup', async (req, res) => {
    const { username, email, password, address } = req.body;
    try {

        //check username Length is more than 3
        if (username.length < 3) {
            return res.status(400).json({ message: 'Username must be at least 3 characters Long' });
        }

        //check username already exists
        const existsUsername = await User.findOne({ username: username });
        if (existsUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        //check email already exists
        const existsEmail = await User.findOne({ email: email });
        if (existsEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        //check password length
        if (password.length < 6) {
            return res.status(400).json({ message: 'password must be at least 6 characters Long' });
        }
        //hash password
        const hashPass = await bcrypt.hash(password, 10);


        //create new user
        const newUser = new User({
            username: username,
            email: email,
            password: hashPass,
            address: address
        });
        await newUser.save();
        res.status(200).json({ message: 'User registered successfully' });

        
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' });
        console.log(err);
    }
});

//Sign in 
router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username: username });

        //if user not found
        if (!existingUser) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // auth claims

        const authClaims = [{ name: existingUser.username }, { role: existingUser.role }];

        //generate jwt token
        const token = jwt.sign({ authClaims }, "bookStore123", { expiresIn: '30d' });
        res.status(200).json({ message: 'User signed in successfully', id: existingUser._id, role: existingUser.role, token: token })
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

//get user info
router.get('/get-user-info', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const data = await User.findById(id).select('-password');
        res.status(200).json(data);
        
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
})

//update address
router.put('/update-address', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { address } = req.body;
        await User.findByIdAndUpdate(id, { address: address });
        res.status(200).json({ message: 'Address updated successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = router;
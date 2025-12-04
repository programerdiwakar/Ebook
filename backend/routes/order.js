const router = require('express').Router();
const User = require('../models/user');
const authenticateToken = require('./userAuth');
const Order = require('../models/order');

//place order
router.post('/place-order', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        for (const orderData of order) {
            const newOrder = new Order({
                user: id,
                book: orderData._id
            });
            const orderDataFromDb = await newOrder.save();

            //saving Order in user model
            await User.findByIdAndUpdate(id, { $push: { orders: orderDataFromDb._id } });

            //clearing cart
            await User.findByIdAndUpdate(id, { $pull: { cart: orderData._id } });
        }
        return res.json({ status: 'success', message: 'Order placed successfully' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'An error occurred while placing the order' });
    }
});

//get order history of particular user
router.get('/get-order-history', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: 'orders',
            populate: { path: 'book' },
        });
        const ordersData = userData.orders.reverse();
        return res.json({ status: 'success', data: ordersData });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'An error occurred while fetching order history' });
    }
});

//get all orders (admin)
router.get('/get-all-orders', authenticateToken, async (req, res) => {
    try {
        const userData = await Order.find()
            .populate({ path: 'book' })
            .populate({ path: 'user' })
            .sort({ createdAt: -1 });
        return res.json({ status: 'success', data: userData });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'An error occurred while fetching all orders' });
    }
});

//update order (admin)
router.put('/update-status/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id,{status:req.body.status})
        return res.json({ status: 'success', message: 'Status Updated Successfully' });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'An error occurred while updating the order status' });
    }
});

module.exports = router;
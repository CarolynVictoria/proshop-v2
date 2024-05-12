import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

// @desc    create new order
// @route   GET /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
res.send('add order items');
});

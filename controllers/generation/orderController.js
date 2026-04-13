const asynchandler=require("express-async-handler");
const order=require("../../models/order")
const addOrderItems = async (req, res) => {
    const { 
        // orderItems, 
        productName,shippingAddress, paymentMethod, totalPrice } = req.body;

    if (order.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    } else {
        
        const createdOrder = await order.create({
            // orderItems,    
            productName,        
            shippingAddress,
            paymentMethod,
            totalPrice});
        res.status(201).json(createdOrder);
    }
};


const getOrderById = async (req, res) => {
    const order = await order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

// @desc    Update order to delivered (Admin)
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
    const order = await order.findById(req.params.id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    const orders = await order.find({ user: req.user._id });
    res.json(orders);
};

module.exports = {addOrderItems,getOrderById,updateOrderToDelivered,getMyOrders};
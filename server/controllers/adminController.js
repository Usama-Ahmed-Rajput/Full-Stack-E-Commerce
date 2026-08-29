const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

// @desc    Get all users list
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password').sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    data: users
  });
});

// @desc    Get all orders list
// @route   GET /api/admin/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate('user', 'id name email')
    .sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    data: orders
  });
});

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = status || order.status;
    const updatedOrder = await order.save();
    res.status(200).json({
      success: true,
      data: updatedOrder,
      message: `Order status updated to ${order.status}`
    });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get store statistics overview
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = asyncHandler(async (req, res) => {
  const totalProducts = await Product.countDocuments();
  const totalUsers = await User.countDocuments();
  const totalOrders = await Order.countDocuments();
  const pendingOrders = await Order.countDocuments({ status: 'Pending' });

  const orders = await Order.find({ status: { $ne: 'Cancelled' } });
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

  res.status(200).json({
    success: true,
    data: {
      totalProducts,
      totalUsers,
      totalOrders,
      pendingOrders,
      totalRevenue
    }
  });
});

module.exports = {
  getUsers,
  getAllOrders,
  updateOrderStatus,
  getStats
};

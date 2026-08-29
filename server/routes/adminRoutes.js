const express = require('express');
const router = express.Router();
const {
  getUsers,
  getAllOrders,
  updateOrderStatus,
  getStats
} = require('../controllers/adminController');
const { protect, requireAdmin } = require('../middleware/authMiddleware');

// All routes require login + admin role
router.use(protect, requireAdmin);

router.get('/users', getUsers);
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);
router.get('/stats', getStats);

module.exports = router;

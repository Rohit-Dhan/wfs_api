const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authenticate } = require('../middlewares/auth');

router.get('/quick-stats', authenticate, dashboardController.getQuickStats);
router.get('/attendance-trend', authenticate, dashboardController.getAttendanceTrend);
router.get('/payroll-cost', authenticate, dashboardController.getPayrollCost);
router.get('/attrition-rate', authenticate, dashboardController.getAttritionRate);

module.exports = router;

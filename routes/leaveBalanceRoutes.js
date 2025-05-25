const router = require('express').Router();
const { authenticate } = require('../middlewares/auth');
const controller = require('../controllers/leaveBalanceController');

router.use(authenticate);
router.get('/', controller.getMyLeaveBalance);

module.exports = router;

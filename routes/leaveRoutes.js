const router = require('express').Router();
const { authenticate, authorizeRoles } = require('../middlewares/auth');
const controller = require('../controllers/leaveController');

router.use(authenticate);
router.post('/', controller.applyLeave);
router.get('/', controller.getLeaveRequests);
router.put('/:id/status', authorizeRoles('HR', 'Admin'), controller.manageLeaveStatus);

module.exports = router;

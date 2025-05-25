const router = require('express').Router();
const { authenticate } = require('../middlewares/auth');
const controller = require('../controllers/attendanceController');

router.use(authenticate);
router.post('/', controller.markAttendance);
router.get('/', controller.getEmployeeAttendance);

module.exports = router;

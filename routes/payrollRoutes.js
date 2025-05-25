const router = require('express').Router();
const { authenticate, authorizeRoles } = require('../middlewares/auth');
const controller = require('../controllers/payrollController');

router.use(authenticate);

router.get('/mine', controller.getEmployeeSalarySlips);
router.get('/all', authorizeRoles('HR', 'Admin'), controller.getAllSalarySlips);
router.post('/generate', authorizeRoles('HR', 'Admin'), controller.generateSalarySlip);

module.exports = router;

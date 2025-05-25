const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { authenticate, authorizeRoles } = require('../middlewares/auth');

router.use(authenticate);

router.post('/', authorizeRoles('Admin', 'HR'), employeeController.createEmployee);
router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.put('/:id', authorizeRoles('Admin', 'HR'), employeeController.updateEmployee);
router.delete('/:id', authorizeRoles('Admin', 'HR'), employeeController.deleteEmployee);

module.exports = router;

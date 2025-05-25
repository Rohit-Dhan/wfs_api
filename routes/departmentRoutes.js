const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");
const { authenticate, authorizeRoles } = require("../middlewares/auth");

router.use(authenticate);

router.get("/", departmentController.getAllDepartments);
router.get("/:id", departmentController.getDepartmentById);
router.post("/", authorizeRoles("Admin", "HR"), departmentController.createDepartment);
router.put("/:id", authorizeRoles("Admin", "HR"), departmentController.updateDepartment);
router.delete("/:id", authorizeRoles("Admin", "HR"), departmentController.deleteDepartment);

module.exports = router;
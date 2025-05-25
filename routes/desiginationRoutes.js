const express = require("express");
const router = express.Router();
const designationController = require("../controllers/desiginationsController");
const { authenticate, authorizeRoles } = require("../middlewares/auth");

router.use(authenticate);

router.get("/", designationController.getAllDesignations);
router.get("/:id", designationController.getDesignationById);
router.post("/", authorizeRoles("Admin", "HR"), designationController.createDesignation);
router.put("/:id", authorizeRoles("Admin", "HR"), designationController.updateDesignation);
router.delete("/:id", authorizeRoles("Admin", "HR"), designationController.deleteDesignation);  

module.exports = router;
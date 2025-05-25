const Department = require("../models/Department");

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch departments", error: err.message });
  }
};

exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department)
      return res.status(404).json({ message: "Department not found" });
    res.json(department);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch department", error: err.message });
  }
};

exports.createDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json({ message: "Department created", department });
  } catch (err) {
    res.status(500).json({ message: "Failed to create department", error: err.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const department = await Department.update(req.body, {
      where: { id: req.params.id },
    });
    if (!department)
      return res.status(404).json({ message: "Department not found" });
    res.json({ message: "Department updated", department });
  } catch (err) {
    res.status(500).json({ message: "Failed to update department", error: err.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.destroy({
      where: { id: req.params.id },
    });
    if (!department)
      return res.status(404).json({ message: "Department not found" });
    res.json({ message: "Department deleted", department });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete department", error: err.message });
  }
};
const Designation = require("../models/Designation");

exports.getAllDesignations = async (req, res) => {
  try {
    const designations = await Designation.findAll();
    res.json(designations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch designations", error: err.message });
  }
};

exports.getDesignationById = async (req, res) => {
  try {
    const designation = await Designation.findByPk(req.params.id);
    if (!designation)
      return res.status(404).json({ message: "Designation not found" });
    res.json(designation);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch designation", error: err.message });
  }
};

exports.createDesignation = async (req, res) => {
  try {
    const designation = await Designation.create(req.body);
    res.status(201).json({ message: "Designation created", designation });
  } catch (err) {
    res.status(500).json({ message: "Failed to create designation", error: err.message });
  }
};

exports.updateDesignation = async (req, res) => {
  try {
    const designation = await Designation.update(req.body, {
      where: { id: req.params.id },
    });
    if (!designation)
      return res.status(404).json({ message: "Designation not found" });
    res.json({ message: "Designation updated", designation });
  } catch (err) {
    res.status(500).json({ message: "Failed to update designation", error: err.message });
  }
};

exports.deleteDesignation = async (req, res) => {
  try {
    const designation = await Designation.destroy({
      where: { id: req.params.id },
    });
    if (!designation)
      return res.status(404).json({ message: "Designation not found" });
    res.json({ message: "Designation deleted", designation });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete designation", error: err.message });
  }
};

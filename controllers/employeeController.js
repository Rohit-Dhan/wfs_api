const Employee = require('../models/Employee');
const Designation = require('../models/Designation');
const Department = require('../models/Department');
const LeaveBalance = require('../models/LeaveBalance');
exports.createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    await LeaveBalance.create({ employee_id: employee.id });
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      include: [
        {
          model: Department,
          attributes: ['name']
        },
        {
          model: Designation,
          attributes: ['name']
        }
      ]
    });;
    const formattedEmployees = employees.map(emp => ({
      id: emp.id,
      name: emp.name,
      email: emp.email,
      phone: emp.phone,
      dob: emp.dob,
      doj: emp.doj,
      salary: emp.salary,
      status: emp.status,
      department: emp.Department ? emp.Department.name : null,
      designation: emp.Designation ? emp.Designation.name : null,
      createdAt: emp.createdAt,
      updatedAt: emp.updatedAt
    }));

    res.status(200).json(formattedEmployees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    await employee.update(req.body);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    await employee.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

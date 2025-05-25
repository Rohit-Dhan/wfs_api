const SalaryDetail = require('../models/SalaryDetail');
const Employee = require('../models/Employee');
const calculateTax = require('../utils/taxCalculator');
const generateSalarySlip = require('../utils/pdfGenerator');
const transporter = require('../config/mailer');
const path = require('path');

exports.generateSalarySlip = async (req, res) => {
    try {
      const { employee_id, base_salary, bonuses = 0, deductions = 0, month, year } = req.body;
  
      // Prevent duplicate salary slip for same employee/month/year
      const existing = await SalaryDetail.findOne({ where: { employee_id, month, year } });
      if (existing) {
        return res.status(400).json({ message: "Salary already generated for this employee in the given month/year." });
      }
  
      // Auto tax calculation
      const tax = calculateTax(base_salary);
      const final_salary = base_salary + bonuses - deductions - tax;
  
      // Create salary record
      const salaryRecord = await SalaryDetail.create({
        employee_id, base_salary, bonuses, deductions, tax, final_salary, month, year
      });
  
      // Fetch employee details
      const employee = await Employee.findByPk(employee_id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found." });
      }
  
      // Generate PDF
      const pdfPath = generateSalarySlip(salaryRecord, employee);
      const pdfFileName = path.basename(pdfPath);
  
      // Send email with PDF attachment
      await transporter.sendMail({
        from: `"HR Payroll" <${process.env.SMTP_USER}>`,
        to: employee.email,
        subject: `Salary Slip for ${month}/${year}`,
        text: `Dear ${employee.name},\n\nPlease find attached your salary slip for ${month}/${year}.\n\nRegards,\nHR Department`,
        attachments: [
          {
            filename: pdfFileName,
            path: pdfPath
          }
        ]
      });
  
      res.status(201).json({
        message: "Salary slip generated and emailed.",
        pdf: `/salary_slips/${pdfFileName}`
      });
  
    } catch (error) {
      console.error("Payroll Error:", error);
      res.status(500).json({ error: error.message });
    }
  };

exports.getEmployeeSalarySlips = async (req, res) => {
  try {
    const salaryRecords = await SalaryDetail.findAll({ where: { employee_id: req.user.id } });
    res.status(200).json(salaryRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllSalarySlips = async (req, res) => {
  try {
    const all = await SalaryDetail.findAll();
    res.status(200).json(all);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

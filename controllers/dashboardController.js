// const { Employee, Department, Leave, Attendance, SalaryDetail } 
const Employee = require('../models/Employee');
const Department = require('../models/Department');
const Leave = require('../models/Leave');
const Attendance = require('../models/Attendance');
const SalaryDetail = require('../models/SalaryDetail');
const { Op, fn, col, literal } = require('sequelize');

exports.getQuickStats = async (req, res) => {
  try {
    const totalEmployees = await Employee.count();
    const totalDepartments = await Department.count();
    const totalLeaves = await Leave.count({ where: { status: 'Approved' } });

    res.json({ totalEmployees, totalDepartments, totalLeaves });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching quick stats', error: err.message });
  }
};

exports.getAttendanceTrend = async (req, res) => {
  try {
    const year = req.query.year || new Date().getFullYear();
    const data = await Attendance.findAll({
      attributes: [
        [fn('EXTRACT', literal('MONTH from date')), 'month'],
        [fn('COUNT', col('id')), 'daysPresent']
      ],
      where: {
        status: 'Present',
        date: {
          [Op.between]: [`${year}-01-01`, `${year}-12-31`]
        }
      },
      group: [literal('EXTRACT(MONTH from date)')],
      order: [literal('EXTRACT(MONTH from date)')]
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching attendance trend', error: err.message });
  }
};

exports.getPayrollCost = async (req, res) => {
  try {
    const year = req.query.year || new Date().getFullYear();
    const data = await SalaryDetail.findAll({
      attributes: [
        'month',
        [fn('SUM', col('final_salary')), 'totalSalary']
      ],
      where: {
        year
      },
      group: ['month'],
      order: [['month', 'ASC']]
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching payroll cost', error: err.message });
  }
};

exports.getAttritionRate = async (req, res) => {
  try {
    const year = req.query.year || new Date().getFullYear();

    const joined = await Employee.count({
      where: {
        doj: {
          [Op.between]: [`${year}-01-01`, `${year}-12-31`]
        }
      }
    });

    const left = await Employee.count({
      where: {
        status: 'Inactive',
        updatedAt: {
          [Op.between]: [`${year}-01-01`, `${year}-12-31`]
        }
      }
    });

    const attritionRate = joined > 0 ? (left / joined) * 100 : 0;
    res.json({ attritionRate });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching attrition rate', error: err.message });
  }
};

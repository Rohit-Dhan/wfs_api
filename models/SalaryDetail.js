const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Employee = require('./Employee');

const SalaryDetail = sequelize.define('SalaryDetail', {
  base_salary: { type: DataTypes.FLOAT, allowNull: false },
  bonuses: { type: DataTypes.FLOAT, defaultValue: 0 },
  deductions: { type: DataTypes.FLOAT, defaultValue: 0 },
  tax: { type: DataTypes.FLOAT, defaultValue: 0 },
  final_salary: { type: DataTypes.FLOAT, allowNull: false },
  month: { type: DataTypes.INTEGER, allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false }
});

SalaryDetail.belongsTo(Employee, { foreignKey: 'employee_id' });

module.exports = SalaryDetail;

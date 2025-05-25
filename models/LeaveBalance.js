const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Employee = require('./Employee');

const LeaveBalance = sequelize.define('LeaveBalance', {
  casual: { type: DataTypes.INTEGER, defaultValue: 6 },
  sick: { type: DataTypes.INTEGER, defaultValue: 6 },
  earned: { type: DataTypes.INTEGER, defaultValue: 0 },
  unpaid: { type: DataTypes.INTEGER, defaultValue: 0 }
});

LeaveBalance.belongsTo(Employee, { foreignKey: 'employee_id', unique: true });

module.exports = LeaveBalance;

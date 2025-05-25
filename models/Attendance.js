const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Employee = require('./Employee');

const Attendance = sequelize.define('Attendance', {
  date: { type: DataTypes.DATEONLY, allowNull: false },
  check_in: { type: DataTypes.TIME },
  check_out: { type: DataTypes.TIME },
  status: {
    type: DataTypes.ENUM('Present', 'Absent', 'Leave', 'Half-Day'),
    defaultValue: 'Present'
  }
});

Attendance.belongsTo(Employee, { foreignKey: 'employee_id' });

module.exports = Attendance;

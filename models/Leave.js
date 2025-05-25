const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Employee = require('./Employee');

const Leave = sequelize.define('Leave', {
  type: {
    type: DataTypes.ENUM('Sick', 'Casual', 'Earned', 'Unpaid'),
    allowNull: false
  },
  start_date: { type: DataTypes.DATEONLY, allowNull: false },
  end_date: { type: DataTypes.DATEONLY, allowNull: false },
  reason: { type: DataTypes.STRING },
  status: {
    type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
    defaultValue: 'Pending'
  }
});

Leave.belongsTo(Employee, { foreignKey: 'employee_id' });

module.exports = Leave;

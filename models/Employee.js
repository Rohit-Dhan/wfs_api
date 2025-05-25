const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Department = require('./Department');
const Designation = require('./Designation');

const Employee = sequelize.define('Employee', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  phone: { type: DataTypes.STRING },
  dob: { type: DataTypes.DATEONLY },
  doj: { type: DataTypes.DATEONLY, allowNull: false },
  salary: { type: DataTypes.FLOAT, allowNull: false },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    defaultValue: 'Active'
  }
});

Employee.belongsTo(Department, { foreignKey: 'department_id' });
Employee.belongsTo(Designation, { foreignKey: 'designation_id' });

module.exports = Employee;

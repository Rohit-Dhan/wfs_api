const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Designation = sequelize.define('Designation', {
  name: { type: DataTypes.STRING, allowNull: false, unique: true }
});

module.exports = Designation;

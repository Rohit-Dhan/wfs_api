const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Department = sequelize.define("Department", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
     unique: true
  },
});

module.exports = Department;

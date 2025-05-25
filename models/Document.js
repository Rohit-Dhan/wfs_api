const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');

const Document = sequelize.define('Document', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  employee_id: { type: DataTypes.INTEGER, allowNull: false },
  doc_type: {
    type: DataTypes.ENUM(
      'contract',
      'offer_letter',
      'policy',
      'termination',
      'feedback',
      'performance_review',
      'resignation',
      'personal_docs'
    ),
    allowNull: false
  },
  file_url: { type: DataTypes.TEXT, allowNull: false },
  uploaded_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'documents',
  timestamps: false
});

module.exports = Document;
// doc_type: {
//     type: DataTypes.ENUM(
//       'contract',
//       'offer_letter',
//       'policy',
//       'termination',
//       'feedback',
//       'performance_review',
//       'resignation',
//       'personal_docs'
//     ),
//     allowNull: false
//   },
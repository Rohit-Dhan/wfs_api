const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

const employeeRoutes = require('./routes/employeeRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const leaveBalanceRoutes = require('./routes/leaveBalanceRoutes');
const payrollRoutes = require('./routes/payrollRoutes');
const authRoutes = require('./routes/authRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const designationRoutes = require('./routes/desiginationRoutes');  
const dashboardRoutes = require('./routes/dashboardRoutes');


app.get('/', (_, res) => res.send('HRMS API Running'));
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/leave-balance', leaveBalanceRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/salary_slips', express.static('public/salary_slips'));
app.use('/api/documents', require('./routes/documentRoutes'));
app.use('/uploads/documents', express.static('public/uploads/documents'));
app.use('/api/departments', departmentRoutes);
app.use('/api/designations', designationRoutes);
app.use('/api/dashboard', dashboardRoutes);


module.exports = app;

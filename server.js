const app = require('./app');
const { connectDB, sequelize } = require('./config/db');
const User = require('./models/User');

const Employee = require('./models/Employee'); // Add this line with User import
const Attendance = require('./models/Attendance');
const Leave = require('./models/Leave');
const LeaveBalance = require('./models/LeaveBalance');



const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  // await sequelize.sync({ alter: true });
 await  sequelize.sync({ alter: true }) // Only apply changes without dropping data
  .then(() => console.log('Database synced with ENUMs'))
  .catch((err) => console.error('Error syncing DB', err));
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();

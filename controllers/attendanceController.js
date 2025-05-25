const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

exports.markAttendance = async (req, res) => {
  try {
    const { date, check_in, check_out, status } = req.body;
    const employee_id = req.user.id;

    // Format check-in time
    const formattedCheckIn = new Date().toISOString().split('T')[1].slice(0, -3);

    const [attendance, created] = await Attendance.findOrCreate({
      where: { employee_id, date },
      defaults: { 
        check_in: formattedCheckIn, 
        check_out, 
        status 
      }
    });

    if (!created) {
      attendance.check_out = check_out || attendance.check_out;
      attendance.status = status || attendance.status;
      await attendance.save();
    }

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployeeAttendance = async (req, res) => {
  try {
    const records = await Attendance.findAll({
      where: { employee_id: req.user.id },
      include: [{
        model: Employee,
        attributes: ['name']
      }]
    });

    // Format the response to include employee name and readable check-in time
    const formattedRecords = records.map(record => ({
      ...record.toJSON(),
      employee_name: record.Employee.name,
      check_in: record.check_in ? new Date(`2000-01-01T${record.check_in}`).toLocaleTimeString() : null
    }));

    res.status(200).json(formattedRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

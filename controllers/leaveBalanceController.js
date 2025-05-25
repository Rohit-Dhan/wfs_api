const LeaveBalance = require('../models/LeaveBalance');

exports.getMyLeaveBalance = async (req, res) => {
  try {
    const balance = await LeaveBalance.findOne({ where: { employee_id: req.user.id } });
    res.status(200).json(balance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

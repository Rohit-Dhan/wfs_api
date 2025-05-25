const Leave = require('../models/Leave');
const LeaveBalance = require('../models/LeaveBalance');
// const sendMail = require('../utils/mailer');
const User = require('../models/User');

exports.applyLeave = async (req, res) => {
    try {
      const { type, start_date, end_date, reason } = req.body;
      const employee_id = req.user.id;
  
      const start = new Date(start_date);
      const end = new Date(end_date);
      const leaveDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  
      const balance = await LeaveBalance.findOne({ where: { employee_id } });
  
      if (!balance) {
        return res.status(400).json({ message: "Leave balance not initialized." });
      }
  
      if (type !== 'Unpaid' && balance[type.toLowerCase()] < leaveDays) {
        return res.status(400).json({ message: `Not enough ${type} leave balance.` });
      }
  
      const leave = await Leave.create({ type, start_date, end_date, reason, employee_id });
  
      // Deduct balance only after approval — OR if you want immediate deduction, do it here.
      res.status(201).json(leave);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.getLeaveRequests = async (req, res) => {
  try {
    const leaves = await Leave.findAll({
      where: { employee_id: req.user.id }
    });
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.manageLeaveStatus = async (req, res) => {
    try {
      const leave = await Leave.findByPk(req.params.id);
      if (!leave) return res.status(404).json({ message: "Leave not found" });
  
      const { status } = req.body;
  
      // Deduct balance only if approving
      if (status === 'Approved') {
        const start = new Date(leave.start_date);
        const end = new Date(leave.end_date);
        const leaveDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  
        const balance = await LeaveBalance.findOne({ where: { employee_id: leave.employee_id } });
  
        if (leave.type !== 'Unpaid') {
          const key = leave.type.toLowerCase();
          if (balance[key] < leaveDays) {
            return res.status(400).json({ message: `Insufficient ${leave.type} leave.` });
          }
          balance[key] -= leaveDays;
          await balance.save();
        }
      }
  
      leave.status = status;
      await leave.save();
  
      res.status(200).json(leave);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // const employee = await User.findByPk(leave.employee_id);

  // await sendMail(
  //   employee.email,
  //   `Leave ${leave.status}`,
  //   `<p>Hi ${employee.name},<br>Your leave request from <b>${leave.start_date}</b> to <b>${leave.end_date}</b> has been <b>${leave.status}</b>.</p>`
  // );
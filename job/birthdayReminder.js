const cron = require('node-cron');
const { Op } = require('sequelize');
const Employee = require('../models/Employee');
const sendMail = require('../utils/mailer');

cron.schedule('0 8 * * *', async () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const birthdayEmployees = await Employee.findAll({
    where: {
      [Op.and]: [
        sequelize.where(sequelize.fn('MONTH', sequelize.col('dob')), month),
        sequelize.where(sequelize.fn('DAY', sequelize.col('dob')), day)
      ]
    }
  });

  for (const emp of birthdayEmployees) {
    await sendMail(
      emp.email,
      '🎉 Happy Birthday!',
      `<p>Dear ${emp.name},<br>Wishing you a fantastic birthday from the HRMS team! 🎂</p>`
    );
  }
});

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateSalarySlip = (salaryDetail, employee) => {
  const doc = new PDFDocument();
  const filePath = path.join(__dirname, `../public/salary_slips/slip_${employee.id}_${salaryDetail.month}_${salaryDetail.year}.pdf`);
  const stream = fs.createWriteStream(filePath);

  doc.pipe(stream);

  doc.fontSize(20).text('Salary Slip', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Employee: ${employee.name}`);
  doc.text(`Email: ${employee.email}`);
  doc.text(`Month: ${salaryDetail.month}, Year: ${salaryDetail.year}`);
  doc.moveDown();

  doc.text(`Base Salary: ₹${salaryDetail.base_salary}`);
  doc.text(`Bonuses: ₹${salaryDetail.bonuses}`);
  doc.text(`Deductions: ₹${salaryDetail.deductions}`);
  doc.text(`Tax: ₹${salaryDetail.tax}`);
  doc.text(`Final Salary: ₹${salaryDetail.final_salary}`);

  doc.end();

  return filePath;
};

module.exports = generateSalarySlip;

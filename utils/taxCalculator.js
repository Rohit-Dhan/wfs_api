function calculateTax(salary) {
    if (salary <= 250000) return 0;
    if (salary <= 500000) return salary * 0.05;
    if (salary <= 1000000) return salary * 0.20;
    return salary * 0.30;
  }
  
  module.exports = calculateTax;
  
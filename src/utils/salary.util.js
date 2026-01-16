const calculateDailySalary = (monthlySalary, workingDays = 30) => {
  return monthlySalary / workingDays;
};

const calculateDeduction = (unpaidDays, dailySalary) => {
  return unpaidDays * dailySalary;
};

module.exports = {
  calculateDailySalary,
  calculateDeduction,
};

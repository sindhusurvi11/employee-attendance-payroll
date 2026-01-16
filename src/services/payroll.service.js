const Employee = require("../models/Employee.model");
const Leave = require("../models/Leave.model");

const WORKING_DAYS = 30;
const PAID_LIMITS = {
  sick: 2,
  casual: 2,
};

const calculatePayroll = async (employeeId, month, year) => {
  const employee = await Employee.findById(employeeId);
  if (!employee) throw new Error("Employee not found");

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59);

  const leaves = await Leave.find({
    employee: employeeId,
    status: "approved",
    fromDate: { $lte: end },
    toDate: { $gte: start },
  });

  let used = { sick: 0, casual: 0, unpaid: 0 };

  leaves.forEach((l) => {
    let days = l.isHalfDay ? 0.5 : 1;
    if (!PAID_LIMITS[l.type]) {
      used.unpaid += days;
    } else {
      used[l.type] += days;
    }
  });

  let unpaidDays = used.unpaid;

  for (let type of ["sick", "casual"]) {
    if (used[type] > PAID_LIMITS[type]) {
      unpaidDays += used[type] - PAID_LIMITS[type];
    }
  }

  const dailySalary = employee.baseSalary / WORKING_DAYS;
  const deduction = unpaidDays * dailySalary;
  const netSalary = employee.baseSalary - deduction;

  return {
    employee: employee.name,
    month,
    year,
    baseSalary: employee.baseSalary,
    unpaidDays,
    deduction: Number(deduction.toFixed(2)),
    netSalary: Number(netSalary.toFixed(2)),
  };
};

module.exports = {
  calculatePayroll,
};

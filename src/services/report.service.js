const Employee = require("../models/Employee.model");
const Attendance = require("../models/Attendance.model");
const Leave = require("../models/Leave.model");

const getSummaryReport = async () => {
  const totalEmployees = await Employee.countDocuments({ status: "active" });
  const totalAttendanceRecords = await Attendance.countDocuments();
  const totalApprovedLeaves = await Leave.countDocuments({
    status: "approved",
  });

  return {
    totalEmployees,
    totalAttendanceRecords,
    totalApprovedLeaves,
  };
};

const getMonthlyAttendanceReport = async (month, year) => {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59);

  const records = await Attendance.aggregate([
    {
      $match: {
        date: { $gte: start, $lte: end },
      },
    },
    {
      $group: {
        _id: "$employee",
        totalDaysPresent: { $sum: 1 },
        totalHours: { $sum: "$totalHours" },
      },
    },
  ]);

  return records;
};

module.exports = {
  getSummaryReport,
  getMonthlyAttendanceReport,
};

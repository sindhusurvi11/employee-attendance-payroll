const Attendance = require("../models/Attendance.model");

const punchIn = async (employeeId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existing = await Attendance.findOne({
    employee: employeeId,
    date: today,
  });

  if (existing) {
    throw new Error("Already punched in today");
  }

  return Attendance.create({
    employee: employeeId,
    date: today,
    punchInTime: new Date(),
  });
};

const punchOut = async (employeeId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const attendance = await Attendance.findOne({
    employee: employeeId,
    date: today,
  });

  if (!attendance) {
    throw new Error("Punch in first");
  }

  if (attendance.punchOutTime) {
    throw new Error("Already punched out");
  }

  const punchOutTime = new Date();
  const totalHours =
    (punchOutTime - attendance.punchInTime) / (1000 * 60 * 60);

  attendance.punchOutTime = punchOutTime;
  attendance.totalHours = Number(totalHours.toFixed(2));

  await attendance.save();
  return attendance;
};

const getAttendanceByEmployee = async (employeeId) => {
  return Attendance.find({ employee: employeeId }).sort({ date: -1 });
};

module.exports = {
  punchIn,
  punchOut,
  getAttendanceByEmployee,
};

const service = require("../services/attendance.service");
const response = require("../utils/response.util");

const punchIn = async (req, res, next) => {
  try {
    const record = await service.punchIn(req.user.employee);
    response.success(res, "Punch in successful", record);
  } catch (err) {
    next(err);
  }
};

const punchOut = async (req, res, next) => {
  try {
    const record = await service.punchOut(req.user.employee);
    response.success(res, "Punch out successful", record);
  } catch (err) {
    next(err);
  }
};

const getAttendanceByEmployee = async (req, res, next) => {
  try {
    const records = await service.getAttendanceByEmployee(req.params.employeeId);
    response.success(res, "Attendance fetched", records);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  punchIn,
  punchOut,
  getAttendanceByEmployee,
};

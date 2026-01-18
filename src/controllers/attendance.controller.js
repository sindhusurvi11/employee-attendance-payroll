/*
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
*/

const service = require("../services/attendance.service");
const response = require("../utils/response.util");
const User = require("../models/User.model");

const punchIn = async (req, res, next) => {
  try {

    const user = await User.findById(req.user._id).populate("employee");


    if (!user.employee) {
      return res.status(400).json({
        success: false,
        message: "Employee not linked to this user",
      });
    }


    const record = await service.punchIn(user.employee._id);

    response.success(res, "Punch in successful", record);
  } catch (err) {
    next(err);
  }
};

const punchOut = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("employee");

    if (!user.employee) {
      return res.status(400).json({
        success: false,
        message: "Employee not linked to this user",
      });
    }

    const record = await service.punchOut(user.employee._id);

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

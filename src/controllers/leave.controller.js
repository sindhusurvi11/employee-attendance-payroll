const service = require("../services/leave.service");
const response = require("../utils/response.util");

const applyLeave = async (req, res, next) => {
  try {
    const leave = await service.applyLeave(req.user.employee, req.body);
    response.success(res, "Leave applied", leave);
  } catch (err) {
    next(err);
  }
};

const getMyLeaves = async (req, res, next) => {
  try {
    const leaves = await service.getMyLeaves(req.user.employee);
    response.success(res, "My leaves fetched", leaves);
  } catch (err) {
    next(err);
  }
};

const approveLeave = async (req, res, next) => {
  try {
    const leave = await service.approveLeave(req.params.id);
    response.success(res, "Leave approved", leave);
  } catch (err) {
    next(err);
  }
};

const rejectLeave = async (req, res, next) => {
  try {
    const leave = await service.rejectLeave(req.params.id);
    response.success(res, "Leave rejected", leave);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  applyLeave,
  getMyLeaves,
  approveLeave,
  rejectLeave,
};

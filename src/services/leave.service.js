const Leave = require("../models/Leave.model");

const applyLeave = async (employeeId, data) => {
  return Leave.create({
    employee: employeeId,
    ...data,
  });
};

const getMyLeaves = async (employeeId) => {
  return Leave.find({ employee: employeeId }).sort({ createdAt: -1 });
};

const approveLeave = async (id) => {
  const leave = await Leave.findById(id);
  if (!leave) throw new Error("Leave not found");

  leave.status = "approved";
  await leave.save();
  return leave;
};

const rejectLeave = async (id) => {
  const leave = await Leave.findById(id);
  if (!leave) throw new Error("Leave not found");

  leave.status = "rejected";
  await leave.save();
  return leave;
};

module.exports = {
  applyLeave,
  getMyLeaves,
  approveLeave,
  rejectLeave,
};

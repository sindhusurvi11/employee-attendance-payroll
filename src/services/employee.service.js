const Employee = require("../models/Employee.model");

const createEmployee = async (data) => {
  return Employee.create(data);
};

const getEmployees = async (page = 1, limit = 10, sortBy = "employeeCode", order = "asc") => {
  const skip = (page - 1) * limit;

  const sortOrder = order === "desc" ? -1 : 1;

  const getEmployees = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const employees = await Employee.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Employee.countDocuments();

  return { employees, total };
};

};


const getEmployeeById = async (id) => {
  const employee = await Employee.findById(id);
  if (!employee) throw new Error("Employee not found");
  return employee;
};

const updateEmployee = async (id, data) => {
  const employee = await Employee.findByIdAndUpdate(id, data, { new: true });
  if (!employee) throw new Error("Employee not found");
  return employee;
};

const deleteEmployee = async (id) => {
  const employee = await Employee.findByIdAndDelete(id);
  if (!employee) throw new Error("Employee not found");
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};

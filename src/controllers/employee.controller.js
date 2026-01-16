
const service = require("../services/employee.service");
const response = require("../utils/response.util");

const createEmployee = async (req, res, next) => {
  try {
    const employee = await service.createEmployee(req.body);
    response.success(res, "Employee created", employee);
  } catch (err) {
    next(err);
  }
};

const getEmployees = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await service.getEmployees(page, limit);
    response.success(res, "Employees fetched", result);
  } catch (err) {
    next(err);
  }
};

const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await service.getEmployeeById(req.params.id);
    response.success(res, "Employee fetched", employee);
  } catch (err) {
    next(err);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const employee = await service.updateEmployee(req.params.id, req.body);
    response.success(res, "Employee updated", employee);
  } catch (err) {
    next(err);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    await service.deleteEmployee(req.params.id);
    response.success(res, "Employee deleted");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
/*
const Employee = require("../models/Employee.model");
const User = require("../models/User.model");

const createEmployee = async (req, res, next) => {
  try {
    const { name, email, department, baseSalary } = req.body;

    // 1. Check if user already exists
    let user = await User.findOne({ email });

    // 2. Create Employee
    const employee = await Employee.create({
      name,
      department,
      baseSalary,
      joiningDate: new Date(),
    });

    // 3. If user exists → link employee
    if (user) {
      user.employee = employee._id;
      user.role = "employee";
      await user.save();
    } 
    // 4. Else create new user
    else {
      user = await User.create({
        email,
        password: "employee@123", // temporary
        role: "employee",
        employee: employee._id,
      });
    }

    res.status(201).json({
      success: true,
      message: "Employee created and linked to user",
      data: {
        employeeId: employee._id,
        userEmail: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createEmployee };*/

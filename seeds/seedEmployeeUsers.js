require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../src/models/User.model");
const Employee = require("../src/models/Employee.model");

const seedEmployeeUsers = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const employees = await Employee.find();

  await User.deleteMany({ role: "employee" });

  for (let emp of employees) {
    await User.create({
      email: `${emp.employeeCode.toLowerCase()}@company.com`,
      password: await bcrypt.hash("password123", 10),
      role: "employee",
      employee: emp._id,
    });
  }

  console.log("Employee users created");
  process.exit();
};

seedEmployeeUsers();

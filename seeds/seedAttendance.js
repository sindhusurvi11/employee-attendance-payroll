require("dotenv").config();
const mongoose = require("mongoose");
const Attendance = require("../src/models/Attendance.model");
const Employee = require("../src/models/Employee.model");

const seedAttendance = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const employee = await Employee.findOne();
  if (!employee) {
    console.log("No employee found");
    process.exit();
  }

  await Attendance.create({
    employee: employee._id,
    date: new Date(),
    punchInTime: new Date(),
    punchOutTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    totalHours: 2,
  });

  console.log("Attendance seeded");
  process.exit();
};

seedAttendance();

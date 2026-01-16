const express = require("express");

const app = express();

// Middleware to parse JSON
app.use(express.json());

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const employeeRoutes = require("./routes/employee.routes");
app.use("/api/employees", employeeRoutes);

const attendanceRoutes = require("./routes/attendance.routes");
app.use("/api/attendance", attendanceRoutes);

const leaveRoutes = require("./routes/leave.routes");
app.use("/api/leaves", leaveRoutes);

const payrollRoutes = require("./routes/payroll.routes");
app.use("/api/payroll", payrollRoutes);


const errorHandler = require("./middlewares/error.middleware");
app.use(errorHandler);

const reportRoutes = require("./routes/report.routes");
app.use("/api/reports", reportRoutes);

const uploadRoutes = require("./routes/upload.routes");
app.use("/api/upload", uploadRoutes);


// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

module.exports = app;

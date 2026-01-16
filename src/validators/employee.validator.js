const validateEmployee = (req, res, next) => {
  const { name, employeeCode, department, baseSalary } = req.body;

  if (!name || !employeeCode || !department || baseSalary == null) {
    return res.status(400).json({
      success: false,
      message: "All employee fields are required",
    });
  }

  if (baseSalary < 0) {
    return res.status(400).json({
      success: false,
      message: "Base salary must be positive",
    });
  }

  next();
};

module.exports = {
  validateEmployee,
};

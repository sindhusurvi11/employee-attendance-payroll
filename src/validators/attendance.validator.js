const validateEmployeeIdParam = (req, res, next) => {
  if (!req.params.employeeId) {
    return res.status(400).json({
      success: false,
      message: "Employee ID is required",
    });
  }
  next();
};

module.exports = {
  validateEmployeeIdParam,
};

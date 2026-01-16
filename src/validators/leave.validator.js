const validateLeave = (req, res, next) => {
  const { type, fromDate, toDate } = req.body;

  if (!type || !fromDate || !toDate) {
    return res.status(400).json({
      success: false,
      message: "Leave type and dates are required",
    });
  }

  if (!["sick", "casual", "unpaid"].includes(type)) {
    return res.status(400).json({
      success: false,
      message: "Invalid leave type",
    });
  }

  if (new Date(fromDate) > new Date(toDate)) {
    return res.status(400).json({
      success: false,
      message: "Invalid date range",
    });
  }

  next();
};

module.exports = {
  validateLeave,
};

const service = require("../services/payroll.service");
const response = require("../utils/response.util");

const getPayroll = async (req, res, next) => {
  try {
    const { month, year } = req.query;
    const data = await service.calculatePayroll(
      req.params.employeeId,
      Number(month),
      Number(year)
    );
    response.success(res, "Payroll generated", data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPayroll,
};

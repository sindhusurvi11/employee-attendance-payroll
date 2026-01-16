const service = require("../services/report.service");
const response = require("../utils/response.util");

const getSummary = async (req, res, next) => {
  try {
    const data = await service.getSummaryReport();
    response.success(res, "Summary report generated", data);
  } catch (err) {
    next(err);
  }
};

const getMonthly = async (req, res, next) => {
  try {
    const { month, year } = req.query;
    const data = await service.getMonthlyAttendanceReport(
      Number(month),
      Number(year)
    );
    response.success(res, "Monthly report generated", data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getSummary,
  getMonthly,
};

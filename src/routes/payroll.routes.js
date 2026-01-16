const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");
const controller = require("../controllers/payroll.controller");

router.get(
  "/:employeeId",
  auth,
  allowRoles("admin"),
  controller.getPayroll
);

module.exports = router;

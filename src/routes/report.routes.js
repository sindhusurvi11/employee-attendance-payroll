const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");
const controller = require("../controllers/report.controller");

router.get("/summary", auth, allowRoles("admin"), controller.getSummary);

router.get("/monthly", auth, allowRoles("admin"), controller.getMonthly);

module.exports = router;

const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/attendance.controller");

router.post("/punch-in", auth, controller.punchIn);
router.post("/punch-out", auth, controller.punchOut);
router.get("/:employeeId", auth, controller.getAttendanceByEmployee);

module.exports = router;

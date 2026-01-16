const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");
const controller = require("../controllers/leave.controller");

// employee
router.post("/", auth, allowRoles("employee"), controller.applyLeave);
router.get("/my", auth, allowRoles("employee"), controller.getMyLeaves);

// admin
router.put("/:id/approve", auth, allowRoles("admin"), controller.approveLeave);
router.put("/:id/reject", auth, allowRoles("admin"), controller.rejectLeave);

module.exports = router;

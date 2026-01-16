const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");
const controller = require("../controllers/employee.controller");

router.post("/", auth, allowRoles("admin"), controller.createEmployee);
router.get("/", auth, allowRoles("admin"), controller.getEmployees);
router.get("/:id", auth, allowRoles("admin"), controller.getEmployeeById);
router.put("/:id", auth, allowRoles("admin"), controller.updateEmployee);
router.delete("/:id", auth, allowRoles("admin"), controller.deleteEmployee);

module.exports = router;

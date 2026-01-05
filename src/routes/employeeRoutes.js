const express = require("express");
const router = express.Router();

const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} = require("../controllers/employeeController");

// CREATE
router.post("/", createEmployee);

// READ
router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);

// UPDATE
router.put("/:id", updateEmployee);

// DELETE
router.delete("/:id", deleteEmployee);

module.exports = router;

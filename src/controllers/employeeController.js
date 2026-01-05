const db = require("../db");

// CREATE employee
exports.createEmployee = (req, res) => {
  const { name, email, salary, joining_date, department, age } = req.body;

  if (!name || !email || !salary || !joining_date || !department || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const HRA = salary * 0.30;

  const sql = `
    INSERT INTO employees
    (name, email, salary, HRA, joining_date, department, age)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, email, salary, HRA, joining_date, department, age],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error", err });
      }

      res.status(201).json({
        message: "Employee created successfully",
        employee_id: result.insertId
      });
    }
  );
};

// GET all employees
exports.getAllEmployees = (req, res) => {
  const sql = "SELECT * FROM employees";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
};

// GET employee by ID
exports.getEmployeeById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM employees WHERE e_id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(results[0]);
  });
};

// UPDATE employee
exports.updateEmployee = (req, res) => {
  const { id } = req.params;
  const { name, email, salary, joining_date, department, age } = req.body;

  if (!name || !email || !salary || !joining_date || !department || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Recalculate HRA
  const HRA = salary * 0.30;

  const sql = `
    UPDATE employees
    SET name = ?, email = ?, salary = ?, HRA = ?, joining_date = ?, department = ?, age = ?
    WHERE e_id = ?
  `;

  db.query(
    sql,
    [name, email, salary, HRA, joining_date, department, age, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error", err });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Employee not found" });
      }

      res.json({ message: "Employee updated successfully" });
    }
  );
};


// DELETE employee
exports.deleteEmployee = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM employees WHERE e_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  });
};


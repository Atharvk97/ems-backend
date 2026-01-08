const db = require("../db");

// ================= CREATE =================
exports.createEmployee = async (req, res) => {
  try {
    let { name, email, salary, department, age, joining_date } = req.body;

    salary = Number(salary);
    age = Number(age);

    const HRA = salary * 0.30;

    const sql = `
      INSERT INTO employees
      (name, email, salary, HRA, department, age, joining_date)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      name,
      email,
      salary,
      HRA,
      department,
      age,
      joining_date
    ]);

    res.status(201).json({
      message: "Employee created successfully",
      employee_id: result.insertId
    });
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ================= GET ALL =================
exports.getAllEmployees = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM employees");
    res.json(rows);
  } catch (err) {
    console.error("GET ALL ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ================= GET BY ID =================
exports.getEmployeeById = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM employees WHERE e_id = ?",
      [req.params.id]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error("GET BY ID ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ================= UPDATE =================
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    let { name, email, salary, department, age, joining_date } = req.body;

    salary = Number(salary);
    age = Number(age);

    const HRA = salary * 0.30;

    const sql = `
      UPDATE employees
      SET name=?, email=?, salary=?, HRA=?, department=?, age=?, joining_date=?
      WHERE e_id=?
    `;

    await db.execute(sql, [
      name,
      email,
      salary,
      HRA,
      department,
      age,
      joining_date,
      id
    ]);

    res.json({ message: "Employee updated successfully" });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ================= DELETE =================
exports.deleteEmployee = async (req, res) => {
  try {
    await db.execute(
      "DELETE FROM employees WHERE e_id = ?",
      [req.params.id]
    );
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

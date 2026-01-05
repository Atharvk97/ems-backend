const express = require("express");
const cors = require("cors");
require("./db");

const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.send("EMS Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

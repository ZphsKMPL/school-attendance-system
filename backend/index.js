const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const attendanceRoutes = require("./routes/attendanceRoutes");

require("dotenv").config();  // Load .env variables

// Middlewares
app.use(cors());
app.use(bodyParser.json());  // To parse JSON requests

// Routes
app.use("/api/attendance", attendanceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

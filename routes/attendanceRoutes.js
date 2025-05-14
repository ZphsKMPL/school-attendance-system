const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

router.post("/mark-attendance", attendanceController.markAttendance);

module.exports = router;

const db = require("../config/db");

exports.markAttendance = (req, res) => {
  const { studentId, status } = req.body;
  const query = "UPDATE students SET attendance = ? WHERE id = ?";

  db.query(query, [status, studentId], (err, result) => {
    if (err) {
      console.error("Error updating attendance:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json({ message: "Attendance marked successfully!" });
  });
};

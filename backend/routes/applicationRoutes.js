const express = require("express");
const {
  createApplication,
  getApplications,
  updateApplicationStatus,
  getSummary,
} = require("../controllers/applicationController");

const router = express.Router();

router.post("/applications", createApplication);
router.get("/applications", getApplications);
router.patch("/applications/:id/status", updateApplicationStatus);
router.get("/summary", getSummary);

module.exports = router;
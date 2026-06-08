const pool = require("../db/db");

const validLanguages = ["Hindi", "Tamil", "Telugu", "Marathi", "English"];
const validStatuses = ["pending", "approved", "rejected"];

const createApplication = async (req, res) => {
  try {
    const { name, mobile, amount, purpose, language } = req.body;

    if (!name || !mobile || !amount || !purpose || !language) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      return res.status(400).json({ error: "Mobile number must be 10 digits" });
    }

    if (Number(amount) <= 0) {
      return res.status(400).json({ error: "Loan amount must be greater than 0" });
    }

    if (!validLanguages.includes(language)) {
      return res.status(400).json({ error: "Invalid preferred language" });
    }

    const result = await pool.query(
      `INSERT INTO applications (name, mobile, amount, purpose, language)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, mobile, amount, purpose, language]
    );

    res.status(201).json({
      message: "Application submitted successfully",
      application: result.rows[0],
      referenceNumber: result.rows[0].id,
    });
  } catch (error) {
    console.error("Create Application Error:", error);
    res.status(500).json({ error: "Server error while creating application" });
  }
};

const getApplications = async (req, res) => {
  try {
    const { status } = req.query;

    let query = "SELECT * FROM applications";
    const values = [];

    if (status) {
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status filter" });
      }
      query += " WHERE status = $1";
      values.push(status);
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Get Applications Error:", error);
    res.status(500).json({ error: "Server error while fetching applications" });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    if (status === "pending") {
      return res.status(400).json({ error: "Status can only be updated to approved or rejected" });
    }

    const result = await pool.query(
      `UPDATE applications
       SET status = $1
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.status(200).json({
      message: "Status updated successfully",
      application: result.rows[0],
    });
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ error: "Server error while updating status" });
  }
};

const getSummary = async (req, res) => {
  try {
    const totalResult = await pool.query(`
      SELECT 
        COUNT(*)::int AS total_applications,
        COALESCE(SUM(amount), 0)::numeric AS total_loan_amount
      FROM applications
    `);

    const statusResult = await pool.query(`
      SELECT status, COUNT(*)::int AS count
      FROM applications
      GROUP BY status
    `);

    const summary = {
      totalApplications: totalResult.rows[0].total_applications,
      totalLoanAmount: totalResult.rows[0].total_loan_amount,
      statusCounts: {
        pending: 0,
        approved: 0,
        rejected: 0,
      },
    };

    statusResult.rows.forEach((row) => {
      summary.statusCounts[row.status] = row.count;
    });

    res.status(200).json(summary);
  } catch (error) {
    console.error("Summary Error:", error);
    res.status(500).json({ error: "Server error while fetching summary" });
  }
};

module.exports = {
  createApplication,
  getApplications,
  updateApplicationStatus,
  getSummary,
};
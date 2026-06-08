import { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [summary, setSummary] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");

  const fetchApplications = async () => {
    const url = statusFilter ? `/applications?status=${statusFilter}` : "/applications";
    const res = await API.get(url);
    setApplications(res.data);
  };

  const fetchSummary = async () => {
    const res = await API.get("/summary");
    setSummary(res.data);
  };

  useEffect(() => {
    fetchApplications();
    fetchSummary();
  }, [statusFilter]);

  const updateStatus = async (id, status) => {
    await API.patch(`/applications/${id}/status`, { status });
    fetchApplications();
    fetchSummary();
  };

  const filteredApps = applications.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase()) ||
    app.mobile.includes(search)
  );

  return (
    <main className="page">
      <section className="dashboard-header">
        <h1>Applications Dashboard</h1>
        <p>Track borrower applications and update status.</p>
      </section>

      {summary && (
        <div className="stats-grid">
          <div className="stat-card">Total<br /><strong>{summary.totalApplications}</strong></div>
          <div className="stat-card">Amount<br /><strong>₹{summary.totalLoanAmount}</strong></div>
          <div className="stat-card">Pending<br /><strong>{summary.statusCounts.pending}</strong></div>
          <div className="stat-card">Approved<br /><strong>{summary.statusCounts.approved}</strong></div>
          <div className="stat-card">Rejected<br /><strong>{summary.statusCounts.rejected}</strong></div>
        </div>
      )}

      <div className="filters">
        <input
          placeholder="Search by name or mobile"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Amount</th>
              <th>Purpose</th>
              <th>Language</th>
              <th>Status</th>
              <th>Date</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {filteredApps.map((app) => (
              <tr key={app.id}>
                <td>{app.name}</td>
                <td>{app.mobile}</td>
                <td>₹{app.amount}</td>
                <td>{app.purpose}</td>
                <td>
                  <span className={`language-badge ${app.language.toLowerCase()}`}>
                    {app.language}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${app.status}`}>
                    {app.status}
                  </span>
                </td>
                <td>{new Date(app.created_at).toLocaleDateString()}</td>
                <td>
                  {app.status === "pending" ? (
                    <div className="action-buttons">
                      <button onClick={() => updateStatus(app.id, "approved")}>Approve</button>
                      <button onClick={() => updateStatus(app.id, "rejected")}>Reject</button>
                    </div>
                  ) : (
                    "Updated"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Dashboard;
import { useState } from "react";
import API from "../api";

function ApplyPage() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    amount: "",
    purpose: "",
    language: "",
  });

  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.name || !form.mobile || !form.amount || !form.purpose || !form.language) {
      return "All fields are required";
    }

    if (!/^[0-9]{10}$/.test(form.mobile)) {
      return "Mobile number must be 10 digits";
    }

    if (Number(form.amount) <= 0) {
      return "Loan amount must be greater than 0";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setReference("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/applications", form);
      setReference(res.data.referenceNumber);

      setForm({
        name: "",
        mobile: "",
        amount: "",
        purpose: "",
        language: "",
      });
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <section className="card form-card">
        <h1>Loan Application</h1>
        <p>Submit borrower loan details securely.</p>

        {error && <div className="alert error">{error}</div>}
        {reference && (
          <div className="alert success">
            Application submitted successfully! <br />
            Reference No: <strong>{reference}</strong>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>Applicant Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter applicant name"
          />

          <label>Mobile Number</label>
          <input
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="10 digit mobile number"
          />

          <label>Loan Amount ₹</label>
          <input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            placeholder="Enter loan amount"
          />

          <label>Loan Purpose</label>
          <textarea
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
            placeholder="Education, business, medical..."
          />

          <label>Preferred Language</label>
          <select name="language" value={form.language} onChange={handleChange}>
            <option value="">Select language</option>
            <option value="Hindi">Hindi</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
            <option value="Marathi">Marathi</option>
            <option value="English">English</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default ApplyPage;
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ApplyPage from "./pages/ApplyPage";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <h2>Vitto Loan Portal</h2>
        <div>
          <Link to="/">Apply</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ApplyPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
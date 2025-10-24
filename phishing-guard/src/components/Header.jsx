// Header.jsx
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={{ padding: "1rem", background: "#f5f5f5" }}>
      <nav>
        <Link to="/" style={{ marginRight: "1rem" }}>Login</Link>
        <Link to="/employee-dashboard" style={{ marginRight: "1rem" }}>Employee Dashboard</Link>
        <Link to="/system-admin-dashboard" style={{ marginRight: "1rem" }}>Admin Dashboard</Link>
        <Link to="/incident-log-details" style={{ marginRight: "1rem" }}>Incident Log</Link>
        <Link to="/suspicious-email-reporter">Suspicious Emails</Link>
      </nav>
    </header>
  );
}

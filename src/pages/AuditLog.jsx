// src/pages/AuditLog.jsx
import React, { useEffect, useState } from "react";

export default function AuditLog() {
  const [logs, setLogs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function load() {
      const res = await fetch("http://localhost:5000/api/audit?limit=200", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
      } else {
        console.error("Failed to load audit logs");
      }
    }
    load();
  }, [token]);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Audit Logs</h2>
        <div className="overflow-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr>
                <th className="p-2">Time</th>
                <th className="p-2">Email</th>
                <th className="p-2">IP</th>
                <th className="p-2">Action</th>
                <th className="p-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l) => (
                <tr key={l._id} className="border-t">
                  <td className="p-2">{new Date(l.createdAt).toLocaleString()}</td>
                  <td className="p-2">{l.email || "-"}</td>
                  <td className="p-2">{l.ip}</td>
                  <td className="p-2">{l.action}</td>
                  <td className="p-2"><pre className="whitespace-pre-wrap">{JSON.stringify(l.details)}</pre></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

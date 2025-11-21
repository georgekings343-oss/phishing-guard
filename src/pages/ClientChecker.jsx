// src/pages/ClientChecker.jsx
import React, { useState } from "react";

export default function ClientChecker() {
  const [url, setUrl] = useState("");
  const [emailText, setEmailText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleCheck = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("http://localhost:5000/api/client-checker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ url, emailText })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Server error" });
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Client Safety Checker</h1>
          <div>
            <button onClick={handleLogout} className="text-sm text-red-600">Sign out</button>
          </div>
        </div>

        <label className="block mb-1">URL</label>
        <input value={url} onChange={(e)=>setUrl(e.target.value)} className="w-full p-2 border rounded mb-3 text-black" placeholder="https://example.com" />

        <label className="block mb-1">Email message (optional)</label>
        <textarea value={emailText} onChange={(e)=>setEmailText(e.target.value)} className="w-full p-2 border rounded mb-3 text-black" rows="6" />

        <button onClick={handleCheck} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
          {loading ? "Analyzing..." : "Check"}
        </button>

        {result && (
          <div className="mt-6 p-3 border rounded bg-gray-100 text-black">
            <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

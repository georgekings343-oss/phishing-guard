// src/pages/Analytics.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Analytics = () => {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get("/api/analytics"); // backend route
        setMetrics(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  if (loading) return <div className="p-8">Loading analytics...</div>;

  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="p-4 bg-card rounded-md shadow-md">
            <h2 className="text-xl font-semibold">{metric.name}</h2>
            <p className="text-secondary mt-1">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;

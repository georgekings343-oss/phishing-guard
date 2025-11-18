// src/pages/TrainingModules.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const TrainingModules = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await axios.get("/api/training-modules"); // backend route
        setModules(res.data);
      } catch (err) {
        setError("Failed to load training modules");
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">Training Modules</h1>
      {loading && <p>Loading modules...</p>}
      {error && <p className="text-error">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <div key={module.id} className="p-4 bg-card rounded-md shadow-md">
            <h2 className="text-xl font-semibold">{module.title}</h2>
            <p className="mt-2 text-secondary">Status: {module.status}</p>
            <p className="mt-1 text-sm text-secondary">Deadline: {module.deadline}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingModules;

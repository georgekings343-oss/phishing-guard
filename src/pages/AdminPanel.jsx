// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/users"); // backend route
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handlePromote = async (userId) => {
    try {
      await axios.post(`/api/users/${userId}/promote`);
      alert("User promoted successfully!");
    } catch (err) {
      alert("Failed to promote user");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user.id} className="p-4 bg-card rounded-md shadow-md">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-secondary mt-1">Role: {user.role}</p>
              <button
                onClick={() => handlePromote(user.id)}
                className="mt-3 px-4 py-2 bg-primary text-foreground rounded-md hover:bg-primary/80 transition"
              >
                Promote
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

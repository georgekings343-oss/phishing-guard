import React, { useState } from "react";
import Input from "../../../components/ui/Input.jsx";
import { Button } from "../../../components/ui/Button.jsx";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "employee",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.firstName + ' ' + formData.lastName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          role: formData.role
        })
      });
      // Parse JSON safely (server may return empty/non-JSON on error)
      let data = null;
      try {
        // Attempt to parse JSON
        data = await res.json();
      } catch (parseErr) {
        // If parsing fails, try to read text and show it as message
        const text = await res.text().catch(() => null);
        const msg = text || (res.status ? `HTTP ${res.status}` : 'Empty response');
        alert(msg);
        setLoading(false);
        return;
      }

      if (!res.ok) {
        alert((data && data.message) || "Signup failed");
        setLoading(false);
        return;
      }
      alert("Signup successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      alert("Signup failed. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50 p-6">
      <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Sign Up</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <Input
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Telephone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <Button type="submit" loading={loading} fullWidth>
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;

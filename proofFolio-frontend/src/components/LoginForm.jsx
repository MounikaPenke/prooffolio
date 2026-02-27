// src/components/LoginForm.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      const { role, onboarded, token } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userEmail", formData.email);

      // 🔥 ROLE-BASED REDIRECT
      if (role === "Student") {
        if (!onboarded) {
          navigate("/onboarding");
        } else {
          navigate("/portfolio");
        }
      } else if (role === "Recruiter") {
        navigate("/recruiter-dashboard");
      }

    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email address
        </label>
        <input
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-teal-accent focus:ring-1 focus:ring-teal-accent transition"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Password
        </label>
        <input
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-teal-accent focus:ring-1 focus:ring-teal-accent transition"
        />
      </div>

      {/* Remember Me */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="w-4 h-4 accent-teal-accent"
          />
          <span className="text-gray-300 text-sm">Remember me</span>
        </label>

        <span className="text-gray-500 text-sm cursor-not-allowed">
          Forgot password?
        </span>
      </div>

      {/* Error */}
      {error && (
        <div className="text-red-500 text-sm text-center">
          {error}
        </div>
      )}

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 rounded-full font-semibold text-lg transition ${loading
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-teal-accent hover:bg-teal-dark text-dark-bg"
          }`}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
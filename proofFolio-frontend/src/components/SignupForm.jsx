// src/components/SignupForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Student', // must match backend enum
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (!formData.fullName.trim()) {
      setError('Full name is required');
      return;
    }

    try {
      setLoading(true);

      // 🔥 REAL BACKEND CALL
      await axios.post('http://localhost:5000/api/auth/signup', {
        username: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role, // send role properly
      });

      setSuccess('Login success...');

      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white"
          placeholder="Enter Name"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white"
          placeholder="Enter Email"
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white"
          placeholder="••••••••"
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white"
          placeholder="••••••••"
        />
      </div>

      {/* Role Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          I am a...
        </label>

        <div className="flex flex-col sm:flex-row gap-6">

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="Student"
              checked={formData.role === 'Student'}
              onChange={handleChange}
              className="w-5 h-5 accent-teal-accent"
            />
            <span className="text-gray-300">Student / Job Seeker</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="Recruiter"
              checked={formData.role === 'Recruiter'}
              onChange={handleChange}
              className="w-5 h-5 accent-teal-accent"
            />
            <span className="text-gray-300">Recruiter</span>
          </label>

        </div>
      </div>

      {/* Messages */}
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      {success && <div className="text-green-500 text-sm text-center">{success}</div>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 rounded-full font-semibold text-lg transition ${
          loading
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-teal-accent hover:bg-teal-dark text-dark-bg'
        }`}
      >
        {loading ? 'Creating your account...' : 'Create Account'}
      </button>

    </form>
  );
}
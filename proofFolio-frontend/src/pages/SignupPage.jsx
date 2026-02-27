// src/pages/SignupPage.jsx
import React from 'react';
import SignupForm from '../components/SignupForm';
import { Link } from 'react-router-dom';
import { BadgeCheck } from 'lucide-react';   // ✅ ADD THIS

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-dark-card rounded-2xl border border-dark-border shadow-2xl p-10">
        
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <BadgeCheck size={32} className="text-teal-accent" />
            <h1 className="text-3xl font-bold text-white">ProofFolio</h1>
          </div>
          <p className="text-gray-text text-lg">
            Prove your skills. Get noticed.
          </p>
        </div>

        {/* Form */}
        <SignupForm />

        {/* Login link */}
        <p className="text-center mt-8 text-gray-text text-sm">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-teal-accent hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
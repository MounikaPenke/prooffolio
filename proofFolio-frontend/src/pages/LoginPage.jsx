import React from "react";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-dark-card rounded-2xl border border-dark-border shadow-2xl p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            ProofFolio
          </h1>
          <p className="text-gray-text">
            Welcome back — sign in to continue
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
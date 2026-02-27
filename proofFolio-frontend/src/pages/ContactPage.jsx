import React from "react";
import { Mail, MessageSquare, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-16">
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <Link
          to="/portfolio"
          className="flex items-center gap-2 text-teal-400 hover:text-teal-300 mb-10"
        >
          <ArrowLeft size={18} />
          Back to Portfolio
        </Link>

        <h1 className="text-4xl font-semibold mb-6">
          Contact Support
        </h1>

        <p className="text-gray-400 mb-12">
          Need help with your ProofFolio profile? Reach out and we’ll get back to you.
        </p>

        <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-8 space-y-8">

          <div className="flex items-start gap-4">
            <Mail className="text-teal-400 mt-1" />
            <div>
              <h3 className="font-medium mb-1">Email Support</h3>
              <p className="text-gray-400">
                support@prooffolio.com
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MessageSquare className="text-teal-400 mt-1" />
            <div>
              <h3 className="font-medium mb-1">Response Time</h3>
              <p className="text-gray-400">
                We typically respond within 24 hours.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
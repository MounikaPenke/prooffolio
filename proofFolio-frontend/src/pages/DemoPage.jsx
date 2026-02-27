import React from "react";
import { Github, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-16">

      <div className="max-w-4xl mx-auto">

        <Link
          to="/"
          className="text-teal-400 hover:text-teal-300 mb-10 inline-block"
        >
          ← Back to Portfolio
        </Link>

        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-14">
          <div className="w-20 h-20 rounded-2xl bg-teal-600 flex items-center justify-center text-3xl font-bold">
            A
          </div>

          <div>
            <h1 className="text-3xl font-semibold">
              Alex Johnson
            </h1>

            <div className="flex items-center gap-4 text-gray-400 mt-2">
              <span className="flex items-center gap-2">
                <MapPin size={16} />
                Bangalore, India
              </span>

              <span className="flex items-center gap-2">
                <Github size={16} />
                github.com/alexjohnson
              </span>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <h2 className="text-2xl font-semibold mb-8">
          Skills & Evidence
        </h2>

        <div className="space-y-6">

          {/* Skill Card */}
          <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-6">

            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium">
                  React.js
                </h3>
                <p className="text-gray-400 text-sm">
                  Frontend Development
                </p>
              </div>

              <div className="flex items-center gap-2 text-teal-400">
                <Star size={16} />
                85
              </div>
            </div>

            <div className="w-full bg-gray-800 h-2 rounded-full">
              <div
                className="bg-teal-500 h-2 rounded-full"
                style={{ width: "85%" }}
              />
            </div>

            <p className="text-gray-400 mt-4 text-sm">
              12 production projects • 5 live deployments • 2 large-scale apps
            </p>

          </div>

          {/* Second Skill */}
          <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-6">

            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium">
                  Node.js
                </h3>
                <p className="text-gray-400 text-sm">
                  Backend Development
                </p>
              </div>

              <div className="flex items-center gap-2 text-teal-400">
                <Star size={16} />
                78
              </div>
            </div>

            <div className="w-full bg-gray-800 h-2 rounded-full">
              <div
                className="bg-teal-500 h-2 rounded-full"
                style={{ width: "78%" }}
              />
            </div>

            <p className="text-gray-400 mt-4 text-sm">
              8 REST APIs • 3 authentication systems • 1 scalable microservice
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}
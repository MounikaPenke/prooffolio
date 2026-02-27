// src/components/PortfolioHeader.jsx
import React from "react";

export default function PortfolioHeader({ user }) {
  return (
    <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] border border-slate-700 rounded-3xl p-10 mb-12 shadow-xl">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        <div>
          <h1 className="text-4xl font-bold text-white mb-3">
            {user.username}
          </h1>

          <p className="text-slate-400 mb-4 text-lg">
            {user.headline || "Building skills with verified proof"}
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-1 rounded-full text-sm bg-teal-500/20 text-teal-400 border border-teal-500/30">
              {user.role}
            </span>

            {user.status && (
              <span className="px-4 py-1 rounded-full text-sm bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                {user.status}
              </span>
            )}
          </div>
        </div>

        {user.githubUsername && (
          <a
            href={`https://github.com/${user.githubUsername}`}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-teal-500 hover:bg-teal-600 transition rounded-full text-black font-semibold"
          >
            View GitHub
          </a>
        )}

      </div>
    </div>
  );
}
import React, { useState } from "react";

export default function SkillCard({ skill }) {

  const [open, setOpen] = useState(false);

  return (
    <div className="group bg-slate-900/60 backdrop-blur-md border border-teal-500/20 rounded-2xl p-8 transition-all duration-300 hover:border-teal-400/40 hover:shadow-lg hover:shadow-teal-500/10">

      <div className="flex justify-between items-start">

        <div>
          <div className="flex items-center gap-3">

            <h3 className="text-xl font-semibold">
              {skill.name}
            </h3>

            <span className="px-3 py-1 text-xs rounded-full bg-teal-500/20 text-teal-400">
              {skill.level}
            </span>

          </div>
        </div>

        <div className="text-teal-400 font-semibold text-lg">
          {skill.totalScore}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6 h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-2 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full transition-all duration-700"
          style={{ width: `${skill.totalScore}%` }}
        />
      </div>

      {/* Toggle */}
      <div className="mt-6 text-right">
        <button
          onClick={() => setOpen(!open)}
          className="text-sm text-slate-400 hover:text-white transition"
        >
          {open ? "Hide Proof" : "View Proof"}
        </button>
      </div>

      {open && (
        <div className="mt-6 space-y-4">

          {skill.proofs.map((proof, index) => (
            <div
              key={index}
              className="bg-slate-800/60 border border-slate-700 rounded-xl p-5"
            >
              <p className="text-slate-300 text-sm truncate">
                {proof.repoUrl}
              </p>
              <p className="text-sm text-slate-400 mt-2">
                Score: {proof.evidenceScore}
              </p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}
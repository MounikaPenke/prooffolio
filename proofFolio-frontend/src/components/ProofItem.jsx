import React from "react"

export default function ProofItem({ proof }) {

  return (
    <div className="bg-dark-bg border border-dark-border rounded-lg p-4">

      <a
        href={proof.repoUrl}
        target="_blank"
        rel="noreferrer"
        className="text-teal-accent hover:underline block mb-2 truncate"
      >
        {proof.repoUrl}
      </a>

      <p className="text-gray-400 text-sm">
        Score: {proof.evidenceScore}
      </p>

      {!proof.match && (
        <p className="text-yellow-400 text-xs mt-1">
          ⚠ Language mismatch detected
        </p>
      )}

    </div>
  )
}
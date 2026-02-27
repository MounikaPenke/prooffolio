import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Github, MapPin, Star, Mail } from "lucide-react";

export default function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/api/recruiter/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then(data => setUser(data))
      .catch(err => setError(err.message));
  }, [id]);

  const handleContact = () => {
    if (!user?.email) return;

    const subject = encodeURIComponent(`Opportunity for ${user.username} — ProofFolio`);
    const body = encodeURIComponent(
`Hi ${user.fullName || user.username},

I came across your profile on ProofFolio and was impressed by your skills and verified GitHub work.

I'd love to connect and discuss a potential opportunity that might be a great fit for you.

Looking forward to hearing from you!

Best regards`
    );

    window.open(`mailto:${user.email}?subject=${subject}&body=${body}`, "_self");

    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  };

  if (error) return <p className="text-red-500 p-10">{error}</p>;
  if (!user) return <p className="text-white p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">

        <Link
          to="/recruiter-dashboard"
          className="text-teal-400 hover:text-teal-300 mb-10 inline-block"
        >
          ← Back to Dashboard
        </Link>

        {/* Profile Header */}
        <div className="flex items-start gap-6 mb-14">
          <div className="w-20 h-20 rounded-2xl bg-teal-600 flex items-center justify-center text-3xl font-bold flex-shrink-0">
            {user.username?.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-semibold">
              {user.username}
            </h1>

            <p className="text-gray-400 mt-2">
              {user.headline || "No headline provided"}
            </p>

            <div className="flex items-center gap-4 text-gray-400 mt-2">
              {user.location && (
                <span className="flex items-center gap-2">
                  <MapPin size={16} />
                  {user.location}
                </span>
              )}

              {user.github && (
                <a
                  href={user.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-teal-400 transition-colors"
                >
                  <Github size={16} />
                  {user.github.replace("https://github.com/", "@")}
                </a>
              )}
            </div>

            {/* Contact Button */}
            <div className="flex items-center gap-4 mt-5 flex-wrap">
              <button
                onClick={handleContact}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all"
                style={{
                  background: "linear-gradient(135deg,#0f766e,#2dd4bf)",
                  color: "#020617",
                  boxShadow: "0 4px 18px rgba(45,212,191,0.25)",
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                <Mail size={15} />
                {emailSent ? "Opening mail app…" : `Contact ${user.fullName?.split(" ")[0] || user.username}`}
              </button>

              {user.email && (
                <span className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Mail size={11} />
                  {user.email}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Experience */}
        <p className="text-gray-400 mb-12">
          Experience: {user.experienceYears || 0} years
        </p>

        {/* Skills Section */}
        <h2 className="text-2xl font-semibold mb-8">
          Skills & Evidence
        </h2>

        <div className="space-y-6">
          {Array.isArray(user.skills) && user.skills.length > 0 ? (
            user.skills.map(skill => (
              <div
                key={skill._id}
                className="bg-[#0f172a] border border-gray-800 rounded-2xl p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium">
                      {skill.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Skill Evidence
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-teal-400">
                    <Star size={16} />
                    {skill.totalScore}
                  </div>
                </div>

                <div className="w-full bg-gray-800 h-2 rounded-full">
                  <div
                    className="bg-teal-500 h-2 rounded-full"
                    style={{ width: `${skill.totalScore}%` }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No skills added</p>
          )}
        </div>

      </div>
    </div>
  );
}
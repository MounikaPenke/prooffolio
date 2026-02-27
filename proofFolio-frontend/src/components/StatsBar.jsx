export default function StatsBar({ user }) {

  const totalSkills = user.skills.length;

  const totalProofs = user.skills.reduce(
    (acc, skill) => acc + skill.proofs.length,
    0
  );

  const overallScore =
    totalSkills > 0
      ? Math.round(
          user.skills.reduce((acc, s) => acc + s.totalScore, 0) /
          totalSkills
        )
      : 0;

  return (
    <div className="mt-12 bg-gradient-to-r from-slate-900/60 to-slate-800/60 backdrop-blur-md border border-slate-700 rounded-2xl overflow-hidden">

      <div className="grid grid-cols-3 text-center">

        <div className="py-8">
          <h3 className="text-3xl font-semibold">{totalSkills}</h3>
          <p className="text-slate-400 text-sm mt-2">Skills</p>
        </div>

        <div className="py-8 border-x border-slate-700">
          <h3 className="text-3xl font-semibold">{totalProofs}</h3>
          <p className="text-slate-400 text-sm mt-2">Proofs Attached</p>
        </div>

        <div className="py-8">
          <h3 className="text-3xl font-semibold text-teal-400">
            {overallScore}%
          </h3>
          <p className="text-slate-400 text-sm mt-2">Overall Score</p>
        </div>

      </div>

    </div>
  );
}
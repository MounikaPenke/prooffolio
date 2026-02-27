function computeSkills(repos) {
  const skillMap = {};

  repos.forEach(repo => {
    const language = repo.language;
    if (!language) return;

    if (!skillMap[language]) {
      skillMap[language] = {
        name: language,
        repoCount: 0,
        totalStars: 0,
        totalForks: 0,
        totalSize: 0,
        recentActivity: 0,
        evidenceBreakdown: {},
        evidenceScore: 0
      };
    }

    const skill = skillMap[language];

    skill.repoCount += 1;
    skill.totalStars += repo.stargazers_count || 0;
    skill.totalForks += repo.forks_count || 0;
    skill.totalSize += repo.size || 0;

    if (repo.pushed_at) {
      const lastPush = new Date(repo.pushed_at);
      const now = new Date();
      const diffDays = (now - lastPush) / (1000 * 60 * 60 * 24);

      if (diffDays < 60) skill.recentActivity += 1;
    }
  });

  Object.values(skillMap).forEach(skill => {

    const volumeScore = Math.min(skill.repoCount * 4, 20);

    const cappedSize = Math.min(skill.totalSize || 0, 20000);
    const sizeScore = Math.min(cappedSize / 1500, 15);

    const starScore = Math.min((skill.totalStars || 0) * 1.5, 10);
    const forkScore = Math.min((skill.totalForks || 0) * 1.5, 5);
    const communityScore = starScore + forkScore;

    const activityScore = Math.min(skill.recentActivity * 5, 20);

    const depthFromRepos = Math.min(skill.repoCount * 3, 15);
    const depthFromSize = Math.min((skill.totalSize || 0) / 3000, 15);
    const depthScore = depthFromRepos + depthFromSize;

    const finalScore =
      volumeScore +
      sizeScore +
      communityScore +
      activityScore +
      depthScore;

    skill.evidenceBreakdown = {
      volumeScore: Math.round(volumeScore),
      sizeScore: Math.round(sizeScore),
      communityScore: Math.round(communityScore),
      activityScore: Math.round(activityScore),
      depthScore: Math.round(depthScore)
    };

    skill.evidenceScore = isNaN(finalScore)
      ? 0
      : Math.min(Math.round(finalScore), 100);
  });

  return Object.values(skillMap);
}


function computeSingleSkill(repoData, languages, skillName) {

  if (
    !repoData ||
    !skillName ||
    !languages ||
    typeof languages !== "object"
  ) {
    return {
      evidenceScore: 0,
      evidenceBreakdown: {
        reason: "Invalid repository data or skill input"
      },
      detectedLanguage: "",
      match: false
    };
  }

  const normalizedSkill = skillName.toLowerCase().trim();
  const languageKeys = Object.keys(languages || {});

  // ✅ Strict language match
  const exactMatchKey = languageKeys.find(
    lang => lang.toLowerCase() === normalizedSkill
  );

  if (!exactMatchKey) {
    return {
      evidenceScore: 0,
      evidenceBreakdown: {
        reason: "Claimed skill not found in repository languages"
      },
      detectedLanguage: languageKeys.join(", "),
      match: false
    };
  }

  /* ========================= */
  /* 1️⃣ Language Dominance     */
  /* ========================= */

  const totalBytes = Object.values(languages)
    .reduce((sum, val) => sum + val, 0);

  const skillBytes = languages[exactMatchKey] || 0;

  const dominanceRatio =
    totalBytes > 0 ? skillBytes / totalBytes : 0;

  const dominanceScore = Math.min(
    Math.round(dominanceRatio * 25),
    25
  );

  /* ========================= */
  /* 2️⃣ Project Size Depth    */
  /* ========================= */

  const size = Number(repoData.size) || 0;
  const sizeScore = Math.min(size / 1000, 20);

  /* ========================= */
  /* 3️⃣ Stars + Forks         */
  /* ========================= */

  const stars = Number(repoData.stargazers_count) || 0;
  const forks = Number(repoData.forks_count) || 0;

  const starScore = Math.min(stars * 2, 10);
  const forkScore = Math.min(forks * 1.5, 5);

  /* ========================= */
  /* 4️⃣ Activity Score        */
  /* ========================= */

  let activityScore = 0;

  if (repoData.pushed_at) {
    const lastPush = new Date(repoData.pushed_at);
    const diffDays =
      (new Date() - lastPush) / (1000 * 60 * 60 * 24);

    if (diffDays < 30) activityScore = 15;
    else if (diffDays < 90) activityScore = 12;
    else if (diffDays < 180) activityScore = 8;
    else activityScore = 4;
  }

  /* ========================= */
  /* 5️⃣ Commit Strength       */
  /* ========================= */

  // If you later fetch commit count, replace this
  const commitScore = 0; 
  // Placeholder (since commit count not yet fetched)

  /* ========================= */
  /* 6️⃣ Originality Bonus     */
  /* ========================= */

  const originalityScore = repoData.fork ? 0 : 10;

  /* ========================= */
  /* Final Score Calculation   */
  /* ========================= */

  let evidenceScore =
    dominanceScore +
    sizeScore +
    starScore +
    forkScore +
    activityScore +
    commitScore +
    originalityScore;

  evidenceScore = Math.min(
    Math.round(evidenceScore),
    100
  );

  return {
    evidenceScore,
    evidenceBreakdown: {
      dominanceScore,
      sizeScore: Math.round(sizeScore),
      starScore,
      forkScore,
      activityScore,
      commitScore,
      originalityScore
    },
    detectedLanguage: languageKeys.join(", "),
    match: true
  };
}
module.exports = { computeSkills, computeSingleSkill };
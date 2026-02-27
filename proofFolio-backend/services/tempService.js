const axios = require("axios");

function extractRepoDetails(repoUrl) {
  const parts = repoUrl.replace("https://github.com/", "").split("/");
  return {
    owner: parts[0],
    repo: parts[1]
  };
}

async function fetchRepoWithLanguages(repoUrl) {
  const { owner, repo } = extractRepoDetails(repoUrl);

  const repoRes = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
      }
    }
  );

  const langRes = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/languages`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
      }
    }
  );

  return {
    repoData: repoRes.data,
    languages: langRes.data
  };
}

module.exports = { fetchRepoWithLanguages };
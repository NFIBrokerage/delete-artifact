const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');

async function run() {
  try {
    const github = new GitHub(process.env.GITHUB_TOKEN);

    const { owner, repo } = context.repo;

    const artifactId = core.getInput('name', { required: true });

    await github.actions.deleteArtifact({
      owner,
      repo,
      artifact_id: artifactId
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = run;

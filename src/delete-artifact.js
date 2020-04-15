const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');

async function deleteArtifact(github, owner, repo, artifactId) {
  try {
    await github.actions.deleteArtifact({
      owner,
      repo,
      artifact_id: artifactId
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function run() {
  try {
    const { owner, repo } = context.repo;

    const runId = parseInt(core.getInput('run_id', { required: true }));
    const accessToken = core.getInput('access_token', { required: true });
    const artifactName = core.gitInput('name', { required: true });

    const github = new GitHub(accessToken);

    const response = await github.actions.listWorkflowRunArtifacts({
      owner,
      repo,
      run_id: runId
    });

    response.data.artifacts
      .filter(artifact => artifact.name == artifactName)
      .map(artifact => artifact.id)
      .forEach(artifactId => deleteArtifact(github, owner, repo, artifactId));
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = run;

const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');

async function run() {
  try {
    const github = new GitHub(process.env.GITHUB_TOKEN);

    console.log('context', context);

    const { owner, repo } = context.repo;

    const artifactId = core.getInput('name', { required: true });

    const response = await github.actions.deleteArtifact({
      owner,
      repo,
      artifact_id: artifactId
    });

    console.log('response', response);
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = run;

const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');

async function run() {
  try {
    const github = new GitHub(process.env.GITHUB_TOKEN);

    console.log('context', context);

    const { owner, repo } = context.repo;

    const runId = core.getInput('run_id', { required: true });

    const response = await github.actions.listWorkflowRunArtifacts({
      owner,
      repo,
      run_id: runId
    });

    console.log('response', response);
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = run;

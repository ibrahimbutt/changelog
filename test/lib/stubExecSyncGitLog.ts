const child_process = require("child_process");

export default class StubExecSyncGitLog {
  static stubCommits(commits) {
    commits = this.prepareCommitsForBuffer(commits);

    const buffer = Buffer.from(commits);
    child_process.execSync = jest.fn(() => buffer);
  }

  private static prepareCommitsForBuffer(commits) {
    commits = this.objectToArray(commits);
    return this.formatToMatchGitLog(commits);
  }
  private static objectToArray(object) {
    return Object.values(object);
  }

  private static formatToMatchGitLog(commits) {
    return commits.toString().replace(",", "\n");
  }
}

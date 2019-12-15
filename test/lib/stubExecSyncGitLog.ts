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

  private static formatToMatchGitLog(commits): string {
    return commits.reduce((content, commit, index) => {
      if (index !== commits.length - 1) {
        return (content += commit + "\n");
      } else {
        return (content += commit);
      }
    }, "");
  }
}

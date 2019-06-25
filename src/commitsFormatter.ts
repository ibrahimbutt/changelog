import Commit from "./commit";

export default class CommitsFormatter {
  static format(commits: Array<Commit>): string {
    return this.formatCommits(commits);
  }

  private static formatCommits(commits: Array<Commit>) {
    return commits.map(commit => this.formatCommit(commit)).join();
  }

  private static formatCommit(commit: Commit) {
    return `- ${this.removeType(commit.getDetails())}\n`;
  }

  private static removeType(commit: string): string {
    return commit.replace(/^feat:\s|^fix:\s/, "");
  }
}
